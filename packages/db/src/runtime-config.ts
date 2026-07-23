export type DatabaseRuntimeConfigErrorCode =
  | "DATABASE_URL_MISSING"
  | "DATABASE_URL_INVALID"
  | "DATABASE_PROTOCOL_INVALID"
  | "DATABASE_CONNECT_TIMEOUT_INVALID"
  | "DATABASE_POOL_LIMIT_INVALID"
  | "DATABASE_QUEUE_LIMIT_INVALID";

export class DatabaseRuntimeConfigError extends Error {
  readonly code: DatabaseRuntimeConfigErrorCode;

  constructor(code: DatabaseRuntimeConfigErrorCode) {
    super(`Database runtime configuration is invalid (${code}).`);
    this.name = "DatabaseRuntimeConfigError";
    this.code = code;
  }
}

export type DatabaseRuntimeEnvironment = Readonly<
  Record<string, string | undefined>
>;

export type DatabaseRuntimeConfig = Readonly<{
  databaseUrl: string;
  connectTimeoutMs: number;
  poolLimit: number;
  queueLimit: number;
}>;

const CONNECT_TIMEOUT = {
  defaultValue: 5_000,
  minimum: 1_000,
  maximum: 10_000,
} as const;

const POOL_LIMIT = {
  defaultValue: 3,
  minimum: 1,
  maximum: 5,
} as const;

const QUEUE_LIMIT = {
  defaultValue: 10,
  minimum: 1,
  maximum: 50,
} as const;

function parseBoundedInteger(
  value: string | undefined,
  limits: Readonly<{
    defaultValue: number;
    minimum: number;
    maximum: number;
  }>,
  errorCode: DatabaseRuntimeConfigErrorCode,
): number {
  if (value === undefined || value.trim() === "") {
    return limits.defaultValue;
  }

  const normalized = value.trim();

  if (!/^[0-9]+$/.test(normalized)) {
    throw new DatabaseRuntimeConfigError(errorCode);
  }

  const parsed = Number(normalized);

  if (
    !Number.isSafeInteger(parsed) ||
    parsed < limits.minimum ||
    parsed > limits.maximum
  ) {
    throw new DatabaseRuntimeConfigError(errorCode);
  }

  return parsed;
}

function parseDatabaseUrl(value: string | undefined): string {
  if (value === undefined || value.trim() === "") {
    throw new DatabaseRuntimeConfigError("DATABASE_URL_MISSING");
  }

  const normalized = value.trim();
  const protocolMatch = /^([a-z][a-z0-9+.-]*):\/\//i.exec(normalized);

  if (protocolMatch === null) {
    throw new DatabaseRuntimeConfigError("DATABASE_URL_INVALID");
  }

  if (protocolMatch[1]?.toLowerCase() !== "mysql") {
    throw new DatabaseRuntimeConfigError("DATABASE_PROTOCOL_INVALID");
  }

  if (
    !/^mysql:\/\/[^/\s?#]+\/[^?\s#]+(?:\?[^#\s]*)?$/i.test(normalized)
  ) {
    throw new DatabaseRuntimeConfigError("DATABASE_URL_INVALID");
  }

  return normalized;
}

export function redactDatabaseUrl(
  value: string | undefined,
): "[REDACTED_DATABASE_URL]" | "[DATABASE_URL_NOT_SET]" {
  return value === undefined || value === ""
    ? "[DATABASE_URL_NOT_SET]"
    : "[REDACTED_DATABASE_URL]";
}

export function readDatabaseRuntimeConfig(
  environment: DatabaseRuntimeEnvironment,
): DatabaseRuntimeConfig {
  return Object.freeze({
    databaseUrl: parseDatabaseUrl(environment.DATABASE_URL),
    connectTimeoutMs: parseBoundedInteger(
      environment.DB_CONNECT_TIMEOUT_MS,
      CONNECT_TIMEOUT,
      "DATABASE_CONNECT_TIMEOUT_INVALID",
    ),
    poolLimit: parseBoundedInteger(
      environment.DB_POOL_LIMIT,
      POOL_LIMIT,
      "DATABASE_POOL_LIMIT_INVALID",
    ),
    queueLimit: parseBoundedInteger(
      environment.DB_QUEUE_LIMIT,
      QUEUE_LIMIT,
      "DATABASE_QUEUE_LIMIT_INVALID",
    ),
  });
}
