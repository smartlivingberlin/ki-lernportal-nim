import {
  DatabaseRuntimeConfigError,
  readDatabaseRuntimeConfig,
  redactDatabaseUrl,
  type DatabaseRuntimeConfigErrorCode,
} from "./runtime-config.ts";

function equal(actual: unknown, expected: unknown, label: string): void {
  if (!Object.is(actual, expected)) {
    throw new Error(
      `${label}: expected ${String(expected)}, received ${String(actual)}`,
    );
  }
}

function expectCode(
  action: () => unknown,
  expectedCode: DatabaseRuntimeConfigErrorCode,
): void {
  try {
    action();
  } catch (error: unknown) {
    if (!(error instanceof DatabaseRuntimeConfigError)) {
      throw error;
    }

    equal(error.code, expectedCode, "error code");
    return;
  }

  throw new Error(`Expected error code ${expectedCode}.`);
}

const defaults = readDatabaseRuntimeConfig({
  DATABASE_URL: "mysql://user:secret@localhost:3306/portal",
});

equal(defaults.connectTimeoutMs, 5_000, "default timeout");
equal(defaults.poolLimit, 3, "default pool limit");
equal(defaults.queueLimit, 10, "default queue limit");

const custom = readDatabaseRuntimeConfig({
  DATABASE_URL: "mysql://user:secret@localhost:3306/portal?ssl=false",
  DB_CONNECT_TIMEOUT_MS: "10000",
  DB_POOL_LIMIT: "5",
  DB_QUEUE_LIMIT: "50",
});

equal(custom.connectTimeoutMs, 10_000, "custom timeout");
equal(custom.poolLimit, 5, "custom pool limit");
equal(custom.queueLimit, 50, "custom queue limit");

expectCode(
  () => readDatabaseRuntimeConfig({}),
  "DATABASE_URL_MISSING",
);

expectCode(
  () => readDatabaseRuntimeConfig({ DATABASE_URL: "not-a-url" }),
  "DATABASE_URL_INVALID",
);

expectCode(
  () =>
    readDatabaseRuntimeConfig({
      DATABASE_URL: "postgres://user:secret@localhost:5432/portal",
    }),
  "DATABASE_PROTOCOL_INVALID",
);

expectCode(
  () =>
    readDatabaseRuntimeConfig({
      DATABASE_URL: "mysql://localhost",
    }),
  "DATABASE_URL_INVALID",
);

expectCode(
  () =>
    readDatabaseRuntimeConfig({
      DATABASE_URL: "mysql://localhost/portal",
      DB_CONNECT_TIMEOUT_MS: "999",
    }),
  "DATABASE_CONNECT_TIMEOUT_INVALID",
);

expectCode(
  () =>
    readDatabaseRuntimeConfig({
      DATABASE_URL: "mysql://localhost/portal",
      DB_POOL_LIMIT: "6",
    }),
  "DATABASE_POOL_LIMIT_INVALID",
);

expectCode(
  () =>
    readDatabaseRuntimeConfig({
      DATABASE_URL: "mysql://localhost/portal",
      DB_QUEUE_LIMIT: "unlimited",
    }),
  "DATABASE_QUEUE_LIMIT_INVALID",
);

equal(
  redactDatabaseUrl("mysql://user:very-secret@localhost/portal"),
  "[REDACTED_DATABASE_URL]",
  "URL redaction",
);

equal(
  redactDatabaseUrl(undefined),
  "[DATABASE_URL_NOT_SET]",
  "missing URL redaction",
);

try {
  readDatabaseRuntimeConfig({
    DATABASE_URL: "mysql://user:very-secret@localhost",
  });
} catch (error: unknown) {
  if (!(error instanceof Error)) {
    throw error;
  }

  equal(error.message.includes("very-secret"), false, "secret-safe error");
}

// S51B-B additional numeric boundary tests.

expectCode(
  () =>
    readDatabaseRuntimeConfig({
      DATABASE_URL: "mysql://localhost/portal",
      DB_CONNECT_TIMEOUT_MS: "10001",
    }),
  "DATABASE_CONNECT_TIMEOUT_INVALID",
);

expectCode(
  () =>
    readDatabaseRuntimeConfig({
      DATABASE_URL: "mysql://localhost/portal",
      DB_POOL_LIMIT: "0",
    }),
  "DATABASE_POOL_LIMIT_INVALID",
);

expectCode(
  () =>
    readDatabaseRuntimeConfig({
      DATABASE_URL: "mysql://localhost/portal",
      DB_QUEUE_LIMIT: "51",
    }),
  "DATABASE_QUEUE_LIMIT_INVALID",
);

expectCode(
  () =>
    readDatabaseRuntimeConfig({
      DATABASE_URL: "mysql://localhost/portal",
      DB_POOL_LIMIT: "2.5",
    }),
  "DATABASE_POOL_LIMIT_INVALID",
);
