import type { ProgressSource } from "@ki-lernportal-nim/domain";

export const LOCAL_PROGRESS_IMPORT_CONTRACT_VERSION =
  "S51C_B1B_LOCAL_PROGRESS_IMPORT_V1" as const;

export interface LocalProgressImportRequestV1 {
  readonly idempotency_key: string;
  readonly client_snapshot_hash: string;
  readonly lesson_ids: readonly string[];
}

export interface LocalProgressImportImportedResponseV1 {
  readonly status: "imported";
  readonly import_id: string;
  readonly client_snapshot_hash: string;
  readonly imported_lesson_ids: readonly string[];
  readonly already_present_lesson_ids: readonly string[];
  readonly imported_lesson_count: number;
  readonly already_present_lesson_count: number;
}

export interface LocalProgressImportRejectedResponseV1 {
  readonly status: "rejected";
  readonly error_code: "LOCAL_PROGRESS_IMPORT_REJECTED";
  readonly rejected_lesson_ids: readonly string[];
}

export type LocalProgressImportResponseV1 =
  | LocalProgressImportImportedResponseV1
  | LocalProgressImportRejectedResponseV1;

export type ContractParseResult<T> =
  | Readonly<{ ok: true; value: T }>
  | Readonly<{ ok: false }>;

const LOCAL_IMPORT_PROGRESS_SOURCE: Extract<
  ProgressSource,
  "local_import"
> = "local_import";

void LOCAL_IMPORT_PROGRESS_SOURCE;

const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

const SHA256_PATTERN = /^[0-9a-f]{64}$/;

const LESSON_ID_PATTERN =
  /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;

const MAX_LESSON_COUNT = 512;

const PARSE_FAILURE: Readonly<{ ok: false }> =
  Object.freeze({ ok: false });

const REQUEST_FIELDS = [
  "idempotency_key",
  "client_snapshot_hash",
  "lesson_ids",
] as const;

const IMPORTED_RESPONSE_FIELDS = [
  "status",
  "import_id",
  "client_snapshot_hash",
  "imported_lesson_ids",
  "already_present_lesson_ids",
  "imported_lesson_count",
  "already_present_lesson_count",
] as const;

const REJECTED_RESPONSE_FIELDS = [
  "status",
  "error_code",
  "rejected_lesson_ids",
] as const;

type ExactRecordSnapshot =
  Readonly<Record<string, unknown>>;

type RequestSnapshot = Readonly<{
  idempotency_key: string;
  client_snapshot_hash: string;
  lesson_ids: readonly string[];
}>;

type ImportedResponseSnapshot = Readonly<{
  status: "imported";
  import_id: string;
  client_snapshot_hash: string;
  imported_lesson_ids: readonly string[];
  already_present_lesson_ids: readonly string[];
  imported_lesson_count: number;
  already_present_lesson_count: number;
}>;

type RejectedResponseSnapshot = Readonly<{
  status: "rejected";
  error_code: "LOCAL_PROGRESS_IMPORT_REJECTED";
  rejected_lesson_ids: readonly string[];
}>;

function safely<T>(
  operation: () => T,
  fallback: T,
): T {
  try {
    return operation();
  } catch {
    return fallback;
  }
}

function inspectExactRecord(
  candidate: unknown,
  expectedFields: readonly string[],
): ExactRecordSnapshot | null {
  if (
    typeof candidate !== "object" ||
    candidate === null ||
    Array.isArray(candidate)
  ) {
    return null;
  }

  const prototype = Object.getPrototypeOf(candidate);

  if (
    prototype !== Object.prototype &&
    prototype !== null
  ) {
    return null;
  }

  const ownKeys = Reflect.ownKeys(candidate);

  if (ownKeys.length !== expectedFields.length) {
    return null;
  }

  const expectedSet =
    new Set<string>(expectedFields);

  for (const key of ownKeys) {
    if (
      typeof key !== "string" ||
      !expectedSet.has(key)
    ) {
      return null;
    }
  }

  const snapshot: Record<string, unknown> =
    Object.create(null);

  for (const field of expectedFields) {
    const descriptor =
      Object.getOwnPropertyDescriptor(
        candidate,
        field,
      );

    if (
      descriptor === undefined ||
      !("value" in descriptor)
    ) {
      return null;
    }

    snapshot[field] = descriptor.value;
  }

  return snapshot;
}

function inspectLessonIdList(
  candidate: unknown,
  minimumLength: number,
): readonly string[] | null {
  if (!Array.isArray(candidate)) {
    return null;
  }

  if (
    Object.getPrototypeOf(candidate) !==
    Array.prototype
  ) {
    return null;
  }

  const lengthDescriptor =
    Object.getOwnPropertyDescriptor(
      candidate,
      "length",
    );

  if (
    lengthDescriptor === undefined ||
    !("value" in lengthDescriptor)
  ) {
    return null;
  }

  const length = lengthDescriptor.value;

  if (
    typeof length !== "number" ||
    !Number.isSafeInteger(length) ||
    length < minimumLength ||
    length > MAX_LESSON_COUNT
  ) {
    return null;
  }

  const ownKeys = Reflect.ownKeys(candidate);

  if (ownKeys.length !== length + 1) {
    return null;
  }

  const ownStringKeys = new Set<string>();

  for (const key of ownKeys) {
    if (typeof key !== "string") {
      return null;
    }

    ownStringKeys.add(key);
  }

  if (!ownStringKeys.has("length")) {
    return null;
  }

  const values: string[] = [];
  const seen = new Set<string>();

  for (
    let index = 0;
    index < length;
    index += 1
  ) {
    const key = String(index);

    if (!ownStringKeys.has(key)) {
      return null;
    }

    const descriptor =
      Object.getOwnPropertyDescriptor(
        candidate,
        key,
      );

    if (
      descriptor === undefined ||
      !("value" in descriptor)
    ) {
      return null;
    }

    const value = descriptor.value;

    if (
      typeof value !== "string" ||
      !LESSON_ID_PATTERN.test(value)
    ) {
      return null;
    }

    if (seen.has(value)) {
      return null;
    }

    seen.add(value);
    values.push(value);
  }

  return values;
}

function isUuidV4(
  candidate: unknown,
): candidate is string {
  return (
    typeof candidate === "string" &&
    UUID_V4_PATTERN.test(candidate)
  );
}

function isSha256(
  candidate: unknown,
): candidate is string {
  return (
    typeof candidate === "string" &&
    SHA256_PATTERN.test(candidate)
  );
}

function isSafeCount(
  candidate: unknown,
): candidate is number {
  return (
    typeof candidate === "number" &&
    Number.isSafeInteger(candidate) &&
    candidate >= 0 &&
    candidate <= MAX_LESSON_COUNT
  );
}

function inspectRequest(
  candidate: unknown,
): RequestSnapshot | null {
  const record = inspectExactRecord(
    candidate,
    REQUEST_FIELDS,
  );

  if (record === null) {
    return null;
  }

  const lessonIds = inspectLessonIdList(
    record.lesson_ids,
    1,
  );

  if (
    !isUuidV4(record.idempotency_key) ||
    !isSha256(record.client_snapshot_hash) ||
    lessonIds === null
  ) {
    return null;
  }

  return {
    idempotency_key:
      record.idempotency_key,
    client_snapshot_hash:
      record.client_snapshot_hash,
    lesson_ids: lessonIds,
  };
}

function inspectImportedResponse(
  candidate: unknown,
): ImportedResponseSnapshot | null {
  const record = inspectExactRecord(
    candidate,
    IMPORTED_RESPONSE_FIELDS,
  );

  if (
    record === null ||
    record.status !== "imported"
  ) {
    return null;
  }

  const importedLessonIds =
    inspectLessonIdList(
      record.imported_lesson_ids,
      0,
    );

  const alreadyPresentLessonIds =
    inspectLessonIdList(
      record.already_present_lesson_ids,
      0,
    );

  if (
    !isUuidV4(record.import_id) ||
    !isSha256(
      record.client_snapshot_hash,
    ) ||
    importedLessonIds === null ||
    alreadyPresentLessonIds === null ||
    !isSafeCount(
      record.imported_lesson_count,
    ) ||
    !isSafeCount(
      record.already_present_lesson_count,
    )
  ) {
    return null;
  }

  if (
    record.imported_lesson_count !==
      importedLessonIds.length ||
    record.already_present_lesson_count !==
      alreadyPresentLessonIds.length
  ) {
    return null;
  }

  const totalCount =
    importedLessonIds.length +
    alreadyPresentLessonIds.length;

  if (
    totalCount < 1 ||
    totalCount > MAX_LESSON_COUNT
  ) {
    return null;
  }

  const importedSet =
    new Set(importedLessonIds);

  for (
    const lessonId of
    alreadyPresentLessonIds
  ) {
    if (importedSet.has(lessonId)) {
      return null;
    }
  }

  return {
    status: "imported",
    import_id: record.import_id,
    client_snapshot_hash:
      record.client_snapshot_hash,
    imported_lesson_ids:
      importedLessonIds,
    already_present_lesson_ids:
      alreadyPresentLessonIds,
    imported_lesson_count:
      record.imported_lesson_count,
    already_present_lesson_count:
      record.already_present_lesson_count,
  };
}

function inspectRejectedResponse(
  candidate: unknown,
): RejectedResponseSnapshot | null {
  const record = inspectExactRecord(
    candidate,
    REJECTED_RESPONSE_FIELDS,
  );

  if (
    record === null ||
    record.status !== "rejected" ||
    record.error_code !==
      "LOCAL_PROGRESS_IMPORT_REJECTED"
  ) {
    return null;
  }

  const rejectedLessonIds =
    inspectLessonIdList(
      record.rejected_lesson_ids,
      1,
    );

  if (rejectedLessonIds === null) {
    return null;
  }

  return {
    status: "rejected",
    error_code:
      "LOCAL_PROGRESS_IMPORT_REJECTED",
    rejected_lesson_ids:
      rejectedLessonIds,
  };
}

function isOrderedSubsequence(
  source: readonly string[],
  candidate: readonly string[],
): boolean {
  let candidateIndex = 0;

  for (const sourceValue of source) {
    if (
      sourceValue ===
      candidate[candidateIndex]
    ) {
      candidateIndex += 1;
    }
  }

  return (
    candidateIndex === candidate.length
  );
}

function isExactOrderedPartition(
  requestLessonIds: readonly string[],
  importedLessonIds: readonly string[],
  alreadyPresentLessonIds:
    readonly string[],
): boolean {
  if (
    importedLessonIds.length +
      alreadyPresentLessonIds.length !==
    requestLessonIds.length
  ) {
    return false;
  }

  const importedSet =
    new Set(importedLessonIds);

  const alreadyPresentSet =
    new Set(alreadyPresentLessonIds);

  for (
    const requestLessonId of
    requestLessonIds
  ) {
    const membershipCount =
      Number(
        importedSet.has(requestLessonId),
      ) +
      Number(
        alreadyPresentSet.has(
          requestLessonId,
        ),
      );

    if (membershipCount !== 1) {
      return false;
    }
  }

  return (
    isOrderedSubsequence(
      requestLessonIds,
      importedLessonIds,
    ) &&
    isOrderedSubsequence(
      requestLessonIds,
      alreadyPresentLessonIds,
    )
  );
}

export function isLocalProgressImportRequestV1(
  candidate: unknown,
): candidate is LocalProgressImportRequestV1 {
  return safely(
    () => inspectRequest(candidate) !== null,
    false,
  );
}

export function parseLocalProgressImportRequestV1(
  candidate: unknown,
): ContractParseResult<
  LocalProgressImportRequestV1
> {
  return safely(() => {
    if (inspectRequest(candidate) === null) {
      return PARSE_FAILURE;
    }

    return {
      ok: true,
      value:
        candidate as LocalProgressImportRequestV1,
    } as const;
  }, PARSE_FAILURE);
}

export function isLocalProgressImportImportedResponseV1(
  candidate: unknown,
): candidate is LocalProgressImportImportedResponseV1 {
  return safely(
    () =>
      inspectImportedResponse(candidate) !==
      null,
    false,
  );
}

export function parseLocalProgressImportImportedResponseV1(
  candidate: unknown,
): ContractParseResult<
  LocalProgressImportImportedResponseV1
> {
  return safely(() => {
    if (
      inspectImportedResponse(candidate) ===
      null
    ) {
      return PARSE_FAILURE;
    }

    return {
      ok: true,
      value:
        candidate as LocalProgressImportImportedResponseV1,
    } as const;
  }, PARSE_FAILURE);
}

export function isLocalProgressImportRejectedResponseV1(
  candidate: unknown,
): candidate is LocalProgressImportRejectedResponseV1 {
  return safely(
    () =>
      inspectRejectedResponse(candidate) !==
      null,
    false,
  );
}

export function parseLocalProgressImportRejectedResponseV1(
  candidate: unknown,
): ContractParseResult<
  LocalProgressImportRejectedResponseV1
> {
  return safely(() => {
    if (
      inspectRejectedResponse(candidate) ===
      null
    ) {
      return PARSE_FAILURE;
    }

    return {
      ok: true,
      value:
        candidate as LocalProgressImportRejectedResponseV1,
    } as const;
  }, PARSE_FAILURE);
}

export function isLocalProgressImportResponseV1(
  candidate: unknown,
): candidate is LocalProgressImportResponseV1 {
  return safely(
    () =>
      inspectImportedResponse(candidate) !==
        null ||
      inspectRejectedResponse(candidate) !==
        null,
    false,
  );
}

export function parseLocalProgressImportResponseV1(
  candidate: unknown,
): ContractParseResult<
  LocalProgressImportResponseV1
> {
  return safely(() => {
    if (
      inspectImportedResponse(candidate) ===
        null &&
      inspectRejectedResponse(candidate) ===
        null
    ) {
      return PARSE_FAILURE;
    }

    return {
      ok: true,
      value:
        candidate as LocalProgressImportResponseV1,
    } as const;
  }, PARSE_FAILURE);
}

export function isLocalProgressImportResponseConsistentWithRequestV1(
  requestCandidate: unknown,
  responseCandidate: unknown,
): boolean {
  return safely(() => {
    const request =
      inspectRequest(requestCandidate);

    if (request === null) {
      return false;
    }

    const importedResponse =
      inspectImportedResponse(
        responseCandidate,
      );

    if (importedResponse !== null) {
      return (
        importedResponse
          .client_snapshot_hash ===
          request.client_snapshot_hash &&
        isExactOrderedPartition(
          request.lesson_ids,
          importedResponse
            .imported_lesson_ids,
          importedResponse
            .already_present_lesson_ids,
        )
      );
    }

    const rejectedResponse =
      inspectRejectedResponse(
        responseCandidate,
      );

    if (rejectedResponse === null) {
      return false;
    }

    return isOrderedSubsequence(
      request.lesson_ids,
      rejectedResponse
        .rejected_lesson_ids,
    );
  }, false);
}
