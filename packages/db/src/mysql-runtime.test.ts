import {
  DatabaseRuntimeError,
  createMySqlRuntime,
  type DatabaseRuntimeErrorCode,
} from "./mysql-runtime.ts";

import {
  DatabaseRuntimeConfigError,
  type DatabaseRuntimeConfigErrorCode,
} from "./runtime-config.ts";

function equal(
  actual: unknown,
  expected: unknown,
  label: string,
): void {
  if (!Object.is(actual, expected)) {
    throw new Error(
      `${label}: expected ${String(expected)}, ` +
      `received ${String(actual)}`,
    );
  }
}

async function expectRuntimeCode(
  action: () => Promise<unknown>,
  expectedCode: DatabaseRuntimeErrorCode,
  forbiddenText?: string,
): Promise<void> {
  try {
    await action();
  } catch (error: unknown) {
    if (!(error instanceof DatabaseRuntimeError)) {
      throw error;
    }

    equal(error.code, expectedCode, "runtime error code");

    if (forbiddenText !== undefined) {
      equal(
        error.message.includes(forbiddenText),
        false,
        "secret-safe runtime error",
      );
    }

    return;
  }

  throw new Error(`Expected runtime error ${expectedCode}.`);
}

async function expectConfigCode(
  action: () => Promise<unknown>,
  expectedCode: DatabaseRuntimeConfigErrorCode,
): Promise<void> {
  try {
    await action();
  } catch (error: unknown) {
    if (!(error instanceof DatabaseRuntimeConfigError)) {
      throw error;
    }

    equal(error.code, expectedCode, "config error code");
    return;
  }

  throw new Error(`Expected configuration error ${expectedCode}.`);
}

let environmentReads = 0;
let driverLoads = 0;
let poolCreations = 0;
let drizzleCreations = 0;
let poolCloses = 0;

const fakeAdapter = Object.freeze({
  kind: "fake-drizzle-adapter",
});

const runtime = createMySqlRuntime({
  readEnvironment() {
    environmentReads += 1;

    return {
      DATABASE_URL:
        "mysql://fake-user:fake-secret@localhost:3306/fake_db",
      DB_CONNECT_TIMEOUT_MS: "5000",
      DB_POOL_LIMIT: "3",
      DB_QUEUE_LIMIT: "10",
    };
  },

  async loadDriver() {
    driverLoads += 1;

    return {
      createPool(config) {
        poolCreations += 1;

        equal(config.connectTimeoutMs, 5_000, "timeout");
        equal(config.poolLimit, 3, "pool limit");
        equal(config.queueLimit, 10, "queue limit");

        return {
          async end() {
            poolCloses += 1;
          },
        };
      },

      createDrizzle() {
        drizzleCreations += 1;
        return fakeAdapter;
      },
    };
  },
});

equal(environmentReads, 0, "environment reads before initialize");
equal(driverLoads, 0, "driver loads before initialize");
equal(poolCreations, 0, "pool creations before initialize");
equal(drizzleCreations, 0, "drizzle creations before initialize");
equal(runtime.isClosed(), false, "initial closed state");

const [firstAdapter, secondAdapter] = await Promise.all([
  runtime.initialize(),
  runtime.initialize(),
]);

equal(firstAdapter, fakeAdapter, "first fake adapter");
equal(secondAdapter, fakeAdapter, "second fake adapter");
equal(firstAdapter, secondAdapter, "shared adapter");
equal(environmentReads, 1, "single environment read");
equal(driverLoads, 1, "single driver load");
equal(poolCreations, 1, "single pool creation");
equal(drizzleCreations, 1, "single drizzle creation");

await runtime.close();
await runtime.close();

equal(poolCloses, 1, "idempotent pool close");
equal(runtime.isClosed(), true, "closed state");

await expectRuntimeCode(
  () => runtime.initialize(),
  "DATABASE_RUNTIME_CLOSED",
);

const driverSecret = "driver-secret-must-not-leak";

const driverFailureRuntime = createMySqlRuntime({
  readEnvironment() {
    return {
      DATABASE_URL:
        "mysql://fake-user:fake-secret@localhost:3306/fake_db",
    };
  },

  async loadDriver() {
    throw new Error(driverSecret);
  },
});

await expectRuntimeCode(
  () => driverFailureRuntime.initialize(),
  "DATABASE_ADAPTER_INITIALIZATION_FAILED",
  driverSecret,
);

let failedPoolCloses = 0;

const adapterFailureRuntime = createMySqlRuntime({
  readEnvironment() {
    return {
      DATABASE_URL:
        "mysql://fake-user:fake-secret@localhost:3306/fake_db",
    };
  },

  async loadDriver() {
    return {
      createPool() {
        return {
          async end() {
            failedPoolCloses += 1;
          },
        };
      },

      createDrizzle() {
        throw new Error("adapter-secret-must-not-leak");
      },
    };
  },
});

await expectRuntimeCode(
  () => adapterFailureRuntime.initialize(),
  "DATABASE_ADAPTER_INITIALIZATION_FAILED",
  "adapter-secret-must-not-leak",
);

equal(
  failedPoolCloses,
  1,
  "pool closed after adapter initialization failure",
);

await adapterFailureRuntime.close();

equal(
  failedPoolCloses,
  1,
  "failed runtime close remains idempotent",
);

// S51B-B adversarial initialization tests.

let invalidConfigDriverLoads = 0;

const invalidConfigRuntime = createMySqlRuntime({
  readEnvironment() {
    return {};
  },

  async loadDriver() {
    invalidConfigDriverLoads += 1;

    throw new Error(
      "driver must not load for invalid configuration",
    );
  },
});

await expectConfigCode(
  () => invalidConfigRuntime.initialize(),
  "DATABASE_URL_MISSING",
);

equal(
  invalidConfigDriverLoads,
  0,
  "driver not loaded for invalid configuration",
);

const environmentSecret = "environment-secret-must-not-leak";

const environmentFailureRuntime = createMySqlRuntime({
  readEnvironment() {
    throw new Error(environmentSecret);
  },

  async loadDriver() {
    throw new Error("driver must not load");
  },
});

await expectRuntimeCode(
  () => environmentFailureRuntime.initialize(),
  "DATABASE_ADAPTER_INITIALIZATION_FAILED",
  environmentSecret,
);

let closedBeforeInitializeEnvironmentReads = 0;
let closedBeforeInitializeDriverLoads = 0;

const closedBeforeInitializeRuntime = createMySqlRuntime({
  readEnvironment() {
    closedBeforeInitializeEnvironmentReads += 1;

    return {
      DATABASE_URL:
        "mysql://fake-user:fake-secret@localhost:3306/fake_db",
    };
  },

  async loadDriver() {
    closedBeforeInitializeDriverLoads += 1;

    throw new Error("driver must not load");
  },
});

await closedBeforeInitializeRuntime.close();
await closedBeforeInitializeRuntime.close();

equal(
  closedBeforeInitializeEnvironmentReads,
  0,
  "close before initialize does not read environment",
);

equal(
  closedBeforeInitializeDriverLoads,
  0,
  "close before initialize does not load driver",
);

await expectRuntimeCode(
  () => closedBeforeInitializeRuntime.initialize(),
  "DATABASE_RUNTIME_CLOSED",
);
