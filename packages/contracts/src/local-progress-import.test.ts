import {
  LOCAL_PROGRESS_IMPORT_CONTRACT_VERSION,
  isLocalProgressImportImportedResponseV1,
  isLocalProgressImportRejectedResponseV1,
  isLocalProgressImportRequestV1,
  isLocalProgressImportResponseConsistentWithRequestV1,
  isLocalProgressImportResponseV1,
  parseLocalProgressImportImportedResponseV1,
  parseLocalProgressImportRejectedResponseV1,
  parseLocalProgressImportRequestV1,
  parseLocalProgressImportResponseV1,
} from "./local-progress-import.ts";

const UUID_A =
  "123e4567-e89b-42d3-a456-426614174000";

const UUID_B =
  "123e4567-e89b-42d3-b456-426614174001";

const HASH_A = "a".repeat(64);
const HASH_B = "b".repeat(64);

function fail(message: string): never {
  throw new Error(message);
}

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    fail(message);
  }
}

function equal(
  actual: unknown,
  expected: unknown,
  message: string,
): void {
  if (!Object.is(actual, expected)) {
    fail(
      `${message}: expected ${String(
        expected,
      )}, received ${String(actual)}`,
    );
  }
}

function test(
  _name: string,
  body: () => void,
): void {
  body();
}

function request(
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    idempotency_key: UUID_A,
    client_snapshot_hash: HASH_A,
    lesson_ids: [
      "lesson-1",
      "lesson-2",
      "lesson-3",
    ],
    ...overrides,
  };
}

function imported(
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    status: "imported",
    import_id: UUID_B,
    client_snapshot_hash: HASH_A,
    imported_lesson_ids: [
      "lesson-1",
      "lesson-3",
    ],
    already_present_lesson_ids: [
      "lesson-2",
    ],
    imported_lesson_count: 2,
    already_present_lesson_count: 1,
    ...overrides,
  };
}

function rejected(
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    status: "rejected",
    error_code:
      "LOCAL_PROGRESS_IMPORT_REJECTED",
    rejected_lesson_ids: [
      "lesson-1",
      "lesson-3",
    ],
    ...overrides,
  };
}

test("version is exact", () => {
  equal(
    LOCAL_PROGRESS_IMPORT_CONTRACT_VERSION,
    "S51C_B1B_LOCAL_PROGRESS_IMPORT_V1",
    "contract version",
  );
});

test(
  "valid request parses without copying",
  () => {
    const value = request();

    assert(
      isLocalProgressImportRequestV1(
        value,
      ),
      "request guard",
    );

    const parsed =
      parseLocalProgressImportRequestV1(
        value,
      );

    assert(parsed.ok, "request parser");

    equal(
      parsed.value,
      value,
      "parser preserves original value",
    );
  },
);

test(
  "null-prototype request is accepted",
  () => {
    const value = Object.assign(
      Object.create(null),
      request(),
    );

    assert(
      isLocalProgressImportRequestV1(
        value,
      ),
      "null prototype request",
    );
  },
);

test(
  "request rejects invalid object shapes",
  () => {
    const values = [
      null,
      undefined,
      true,
      1,
      "x",
      [],
      new Date(),
      Object.create({}),
      () => undefined,
    ];

    for (const value of values) {
      equal(
        isLocalProgressImportRequestV1(
          value,
        ),
        false,
        "invalid record shape",
      );
    }
  },
);

test(
  "request rejects missing, unknown and symbol fields",
  () => {
    const missing = request();
    delete missing.lesson_ids;

    equal(
      isLocalProgressImportRequestV1(
        missing,
      ),
      false,
      "missing field",
    );

    equal(
      isLocalProgressImportRequestV1({
        ...request(),
        extra: true,
      }),
      false,
      "unknown field",
    );

    const symbolValue = request();

    Object.defineProperty(
      symbolValue,
      Symbol("extra"),
      { value: true },
    );

    equal(
      isLocalProgressImportRequestV1(
        symbolValue,
      ),
      false,
      "symbol field",
    );
  },
);

test(
  "request rejects inherited and accessor fields without reading getter",
  () => {
    const inherited = Object.create({
      idempotency_key: UUID_A,
    });

    Object.defineProperties(inherited, {
      client_snapshot_hash: {
        value: HASH_A,
        enumerable: true,
      },
      lesson_ids: {
        value: ["lesson-1"],
        enumerable: true,
      },
    });

    equal(
      isLocalProgressImportRequestV1(
        inherited,
      ),
      false,
      "inherited field",
    );

    let reads = 0;
    const accessor = request();

    Object.defineProperty(
      accessor,
      "lesson_ids",
      {
        enumerable: true,
        get() {
          reads += 1;
          return ["lesson-1"];
        },
      },
    );

    equal(
      isLocalProgressImportRequestV1(
        accessor,
      ),
      false,
      "accessor field",
    );

    equal(
      reads,
      0,
      "getter was not invoked",
    );

    let writes = 0;
    const setterOnly = request();

    Object.defineProperty(
      setterOnly,
      "lesson_ids",
      {
        enumerable: true,
        set(_value: unknown) {
          writes += 1;
        },
      },
    );

    equal(
      isLocalProgressImportRequestV1(
        setterOnly,
      ),
      false,
      "setter-only field",
    );

    equal(
      writes,
      0,
      "setter was not invoked",
    );
  },
);

test(
  "request enforces canonical UUID v4",
  () => {
    const invalid = [
      UUID_A.toUpperCase(),
      "123e4567-e89b-12d3-a456-426614174000",
      "123e4567-e89b-42d3-7456-426614174000",
      "123e4567e89b42d3a456426614174000",
    ];

    for (
      const idempotency_key of invalid
    ) {
      equal(
        isLocalProgressImportRequestV1(
          request({
            idempotency_key,
          }),
        ),
        false,
        "invalid UUID",
      );
    }
  },
);

test(
  "request enforces lowercase SHA-256",
  () => {
    const invalid = [
      HASH_A.toUpperCase(),
      "a".repeat(63),
      "g".repeat(64),
    ];

    for (
      const client_snapshot_hash of
      invalid
    ) {
      equal(
        isLocalProgressImportRequestV1(
          request({
            client_snapshot_hash,
          }),
        ),
        false,
        "invalid hash",
      );
    }
  },
);

test(
  "request enforces lesson id syntax and boundaries",
  () => {
    assert(
      isLocalProgressImportRequestV1(
        request({
          lesson_ids: [
            "a",
            "a".repeat(128),
          ],
        }),
      ),
      "valid lesson boundaries",
    );

    const invalid = [
      "",
      "-starts-with-dash",
      "a".repeat(129),
      "has space",
      "has/slash",
      "has\\slash",
      "%2F",
      "ä",
    ];

    for (const lessonId of invalid) {
      equal(
        isLocalProgressImportRequestV1(
          request({
            lesson_ids: [lessonId],
          }),
        ),
        false,
        "invalid lesson id",
      );
    }
  },
);

test(
  "request enforces list size, density and uniqueness",
  () => {
    equal(
      isLocalProgressImportRequestV1(
        request({
          lesson_ids: [],
        }),
      ),
      false,
      "empty list",
    );

    assert(
      isLocalProgressImportRequestV1(
        request({
          lesson_ids: Array.from(
            { length: 512 },
            (_, index) => `l${index}`,
          ),
        }),
      ),
      "512 entries",
    );

    equal(
      isLocalProgressImportRequestV1(
        request({
          lesson_ids: Array.from(
            { length: 513 },
            (_, index) => `l${index}`,
          ),
        }),
      ),
      false,
      "513 entries",
    );

    equal(
      isLocalProgressImportRequestV1(
        request({
          lesson_ids: ["l1", "l1"],
        }),
      ),
      false,
      "duplicate",
    );

    const sparse =
      new Array<string>(1);

    equal(
      isLocalProgressImportRequestV1(
        request({
          lesson_ids: sparse,
        }),
      ),
      false,
      "sparse array",
    );

    const withExtra = ["l1"] as
      string[] & { extra?: boolean };

    withExtra.extra = true;

    equal(
      isLocalProgressImportRequestV1(
        request({
          lesson_ids: withExtra,
        }),
      ),
      false,
      "extra array property",
    );

    let reads = 0;
    const accessorArray = ["l1"];

    Object.defineProperty(
      accessorArray,
      "0",
      {
        get() {
          reads += 1;
          return "l1";
        },
      },
    );

    equal(
      isLocalProgressImportRequestV1(
        request({
          lesson_ids:
            accessorArray,
        }),
      ),
      false,
      "array accessor",
    );

    equal(
      reads,
      0,
      "array getter was not invoked",
    );

    class FancyArray
      extends Array<string> {}

    equal(
      isLocalProgressImportRequestV1(
        request({
          lesson_ids:
            new FancyArray("l1"),
        }),
      ),
      false,
      "array subclass",
    );
  },
);

test(
  "valid imported response parses",
  () => {
    const value = imported();

    assert(
      isLocalProgressImportImportedResponseV1(
        value,
      ),
      "imported guard",
    );

    assert(
      isLocalProgressImportResponseV1(
        value,
      ),
      "union guard",
    );

    assert(
      parseLocalProgressImportImportedResponseV1(
        value,
      ).ok,
      "specific parser",
    );

    assert(
      parseLocalProgressImportResponseV1(
        value,
      ).ok,
      "union parser",
    );
  },
);

test(
  "imported response accepts all-present idempotent result",
  () => {
    assert(
      isLocalProgressImportImportedResponseV1(
        imported({
          imported_lesson_ids: [],
          already_present_lesson_ids: [
            "lesson-1",
            "lesson-2",
            "lesson-3",
          ],
          imported_lesson_count: 0,
          already_present_lesson_count:
            3,
        }),
      ),
      "all present",
    );
  },
);

test(
  "imported response enforces exact fields and status",
  () => {
    const missing = imported();
    delete missing.import_id;

    equal(
      isLocalProgressImportImportedResponseV1(
        missing,
      ),
      false,
      "missing field",
    );

    equal(
      isLocalProgressImportImportedResponseV1({
        ...imported(),
        extra: true,
      }),
      false,
      "unknown field",
    );

    equal(
      isLocalProgressImportImportedResponseV1(
        imported({
          status: "rejected",
        }),
      ),
      false,
      "wrong status",
    );
  },
);

test(
  "imported response enforces counters and disjoint lists",
  () => {
    equal(
      isLocalProgressImportImportedResponseV1(
        imported({
          imported_lesson_count: 1,
        }),
      ),
      false,
      "counter mismatch",
    );

    equal(
      isLocalProgressImportImportedResponseV1(
        imported({
          imported_lesson_ids: [],
          already_present_lesson_ids:
            [],
          imported_lesson_count: 0,
          already_present_lesson_count:
            0,
        }),
      ),
      false,
      "empty total",
    );

    equal(
      isLocalProgressImportImportedResponseV1(
        imported({
          already_present_lesson_ids:
            ["lesson-1"],
        }),
      ),
      false,
      "overlap",
    );

    equal(
      isLocalProgressImportImportedResponseV1(
        imported({
          imported_lesson_count:
            Number.NaN,
        }),
      ),
      false,
      "unsafe counter",
    );
  },
);

test(
  "valid rejected response parses",
  () => {
    const value = rejected();

    assert(
      isLocalProgressImportRejectedResponseV1(
        value,
      ),
      "rejected guard",
    );

    assert(
      isLocalProgressImportResponseV1(
        value,
      ),
      "union guard",
    );

    assert(
      parseLocalProgressImportRejectedResponseV1(
        value,
      ).ok,
      "specific parser",
    );

    assert(
      parseLocalProgressImportResponseV1(
        value,
      ).ok,
      "union parser",
    );
  },
);

test(
  "rejected response enforces error code and non-empty unique list",
  () => {
    equal(
      isLocalProgressImportRejectedResponseV1(
        rejected({
          error_code: "OTHER",
        }),
      ),
      false,
      "wrong error code",
    );

    equal(
      isLocalProgressImportRejectedResponseV1(
        rejected({
          rejected_lesson_ids: [],
        }),
      ),
      false,
      "empty reject list",
    );

    equal(
      isLocalProgressImportRejectedResponseV1(
        rejected({
          rejected_lesson_ids: [
            "lesson-1",
            "lesson-1",
          ],
        }),
      ),
      false,
      "duplicate reject list",
    );
  },
);

test(
  "union rejects unknown status",
  () => {
    equal(
      isLocalProgressImportResponseV1({
        ...imported(),
        status: "partial",
      }),
      false,
      "unknown status",
    );

    equal(
      parseLocalProgressImportResponseV1(
        {},
      ).ok,
      false,
      "invalid union parse",
    );
  },
);

test(
  "imported response matches exact ordered partition",
  () => {
    assert(
      isLocalProgressImportResponseConsistentWithRequestV1(
        request(),
        imported(),
      ),
      "valid partition",
    );

    equal(
      isLocalProgressImportResponseConsistentWithRequestV1(
        request(),
        imported({
          client_snapshot_hash:
            HASH_B,
        }),
      ),
      false,
      "hash mismatch",
    );

    equal(
      isLocalProgressImportResponseConsistentWithRequestV1(
        request(),
        imported({
          imported_lesson_ids: [
            "lesson-3",
            "lesson-1",
          ],
          imported_lesson_count: 2,
        }),
      ),
      false,
      "relative order mismatch",
    );

    equal(
      isLocalProgressImportResponseConsistentWithRequestV1(
        request(),
        imported({
          imported_lesson_ids: [
            "lesson-1",
          ],
          imported_lesson_count: 1,
        }),
      ),
      false,
      "missing request lesson",
    );

    equal(
      isLocalProgressImportResponseConsistentWithRequestV1(
        request(),
        imported({
          imported_lesson_ids: [
            "lesson-1",
            "lesson-3",
            "lesson-4",
          ],
          imported_lesson_count: 3,
        }),
      ),
      false,
      "extra response lesson",
    );
  },
);

test(
  "rejected response is ordered request subset",
  () => {
    assert(
      isLocalProgressImportResponseConsistentWithRequestV1(
        request(),
        rejected(),
      ),
      "valid reject subset",
    );

    equal(
      isLocalProgressImportResponseConsistentWithRequestV1(
        request(),
        rejected({
          rejected_lesson_ids: [
            "lesson-3",
            "lesson-1",
          ],
        }),
      ),
      false,
      "reject order mismatch",
    );

    equal(
      isLocalProgressImportResponseConsistentWithRequestV1(
        request(),
        rejected({
          rejected_lesson_ids: [
            "lesson-4",
          ],
        }),
      ),
      false,
      "reject lesson outside request",
    );
  },
);

test(
  "parsers do not mutate inputs",
  () => {
    const requestValue =
      Object.freeze({
        idempotency_key: UUID_A,
        client_snapshot_hash:
          HASH_A,
        lesson_ids: Object.freeze([
          "lesson-1",
          "lesson-2",
          "lesson-3",
        ]),
      });

    const responseValue =
      Object.freeze({
        status: "imported",
        import_id: UUID_B,
        client_snapshot_hash:
          HASH_A,
        imported_lesson_ids:
          Object.freeze([
            "lesson-1",
            "lesson-3",
          ]),
        already_present_lesson_ids:
          Object.freeze([
            "lesson-2",
          ]),
        imported_lesson_count: 2,
        already_present_lesson_count:
          1,
      });

    const beforeRequest =
      JSON.stringify(requestValue);

    const beforeResponse =
      JSON.stringify(responseValue);

    assert(
      parseLocalProgressImportRequestV1(
        requestValue,
      ).ok,
      "request parse",
    );

    assert(
      parseLocalProgressImportResponseV1(
        responseValue,
      ).ok,
      "response parse",
    );

    assert(
      isLocalProgressImportResponseConsistentWithRequestV1(
        requestValue,
        responseValue,
      ),
      "consistency",
    );

    equal(
      JSON.stringify(requestValue),
      beforeRequest,
      "request unchanged",
    );

    equal(
      JSON.stringify(responseValue),
      beforeResponse,
      "response unchanged",
    );
  },
);

test(
  "fail-closed behavior handles throwing proxies",
  () => {
    const throwingProxy = new Proxy(
      {},
      {
        ownKeys() {
          throw new Error("trap");
        },
      },
    );

    equal(
      isLocalProgressImportRequestV1(
        throwingProxy,
      ),
      false,
      "request proxy",
    );

    equal(
      isLocalProgressImportResponseV1(
        throwingProxy,
      ),
      false,
      "response proxy",
    );

    equal(
      parseLocalProgressImportRequestV1(
        throwingProxy,
      ).ok,
      false,
      "parser proxy",
    );
  },
);
