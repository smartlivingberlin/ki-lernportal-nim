/**
 * S51C-OPS-A – provider-neutral operations contracts.
 *
 * Health/readiness/version shapes, safe-default feature flags, correlation IDs
 * and redacted operational log fields. No framework, network, database or
 * monitoring-provider coupling.
 */

export const OPERATIONS_CONTRACT_VERSION =
  "S51C_OPS_A_OPERATIONS_V1" as const;

export const FEATURE_FLAG_NAMES = [
  "auth_runtime",
  "admin_runtime",
  "ai_rag_runtime",
  "database_readiness_required",
] as const;

export type FeatureFlagName = (typeof FEATURE_FLAG_NAMES)[number];

export type FeatureFlagRegistry = Readonly<
  Record<FeatureFlagName, boolean>
>;

export const DEFAULT_FEATURE_FLAGS: FeatureFlagRegistry =
  Object.freeze({
    auth_runtime: false,
    admin_runtime: false,
    ai_rag_runtime: false,
    database_readiness_required: false,
  });

export type LiveStatus = "live";

export interface LiveResponseV1 {
  readonly status: LiveStatus;
}

export type ReadyCheckStatus = "pass" | "fail" | "not_configured";

export interface ReadyCheckV1 {
  readonly name: string;
  readonly status: ReadyCheckStatus;
}

export type ReadyOverallStatus = "ready" | "not_ready";

export interface ReadyResponseV1 {
  readonly status: ReadyOverallStatus;
  readonly checks: readonly ReadyCheckV1[];
}

export type VersionEnvironment =
  | "concept_demo"
  | "local"
  | "unknown";

export interface VersionResponseV1 {
  readonly service: "web";
  readonly version: string;
  readonly build_sha: string | null;
  readonly environment: VersionEnvironment;
}

export const OPERATIONAL_LOG_LEVELS = [
  "debug",
  "info",
  "warn",
  "error",
] as const;

export type OperationalLogLevel =
  (typeof OPERATIONAL_LOG_LEVELS)[number];

export const OPERATIONAL_LOG_FIELD_NAMES = [
  "timestamp",
  "level",
  "service",
  "environment",
  "version",
  "route_template",
  "http_method",
  "status_class",
  "duration_ms",
  "correlation_id",
  "controlled_error_code",
  "redacted_actor_id",
  "redacted_scope_id",
] as const;

export type OperationalLogFieldName =
  (typeof OPERATIONAL_LOG_FIELD_NAMES)[number];

export interface OperationalLogFieldsV1 {
  readonly timestamp: string;
  readonly level: OperationalLogLevel;
  readonly service: string;
  readonly environment: VersionEnvironment;
  readonly version: string;
  readonly route_template?: string;
  readonly http_method?: string;
  readonly status_class?: string;
  readonly duration_ms?: number;
  readonly correlation_id?: string;
  readonly controlled_error_code?: string;
  readonly redacted_actor_id?: string;
  readonly redacted_scope_id?: string;
}

export const CONTROLLED_ERROR_CODES = [
  "AUTH_REQUIRED",
  "ACCESS_DENIED",
  "RESOURCE_NOT_FOUND",
  "VALIDATION_FAILED",
  "CONFLICT",
  "RATE_LIMITED",
  "DEPENDENCY_UNAVAILABLE",
  "MIGRATION_MISMATCH",
  "FEATURE_DISABLED",
  "INTERNAL_ERROR",
] as const;

export type ControlledErrorCode =
  (typeof CONTROLLED_ERROR_CODES)[number];

const FORBIDDEN_LOG_KEY_PATTERN =
  /(password|passwd|secret|token|authorization|cookie|set-cookie|api[_-]?key|private[_-]?key|database_url|connection_string|email|prompt|stack)/i;

const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

function isControlledValue<TValue extends string>(
  values: readonly TValue[],
  candidate: unknown,
): candidate is TValue {
  return (
    typeof candidate === "string" &&
    values.includes(candidate as TValue)
  );
}

export function isFeatureFlagName(
  candidate: unknown,
): candidate is FeatureFlagName {
  return isControlledValue(FEATURE_FLAG_NAMES, candidate);
}

export function isControlledErrorCode(
  candidate: unknown,
): candidate is ControlledErrorCode {
  return isControlledValue(CONTROLLED_ERROR_CODES, candidate);
}

export function isCorrelationId(candidate: unknown): boolean {
  return (
    typeof candidate === "string" && UUID_V4_PATTERN.test(candidate)
  );
}

export function createCorrelationId(): string {
  const webCrypto = (
    globalThis as {
      crypto?: { randomUUID?: () => string };
    }
  ).crypto;

  if (typeof webCrypto?.randomUUID !== "function") {
    throw new Error("crypto_random_uuid_unavailable");
  }

  return webCrypto.randomUUID();
}

export function resolveFeatureFlags(
  overrides: Partial<FeatureFlagRegistry> = {},
): FeatureFlagRegistry {
  const next: Record<FeatureFlagName, boolean> = {
    ...DEFAULT_FEATURE_FLAGS,
  };

  for (const [key, value] of Object.entries(overrides)) {
    if (!isFeatureFlagName(key)) {
      throw new Error(`unknown_feature_flag:${key}`);
    }
    if (typeof value !== "boolean") {
      throw new Error(`invalid_feature_flag_value:${key}`);
    }
    next[key] = value;
  }

  return Object.freeze(next);
}

export function isFeatureEnabled(
  flags: FeatureFlagRegistry,
  name: FeatureFlagName,
): boolean {
  return flags[name] === true;
}

export function buildLiveResponse(): LiveResponseV1 {
  return Object.freeze({ status: "live" });
}

export function buildReadyResponse(input: {
  readonly flags?: FeatureFlagRegistry;
  readonly databaseStatus?: ReadyCheckStatus;
}): ReadyResponseV1 {
  const flags = input.flags ?? DEFAULT_FEATURE_FLAGS;
  const databaseStatus = input.databaseStatus ?? "not_configured";
  const checks: ReadyCheckV1[] = [
    Object.freeze({ name: "database", status: databaseStatus }),
  ];

  const databaseBlocksReady =
    isFeatureEnabled(flags, "database_readiness_required") &&
    databaseStatus !== "pass";

  return Object.freeze({
    status: databaseBlocksReady ? "not_ready" : "ready",
    checks: Object.freeze(checks),
  });
}

export function truncateBuildSha(
  candidate: string | null | undefined,
): string | null {
  if (typeof candidate !== "string") return null;
  const trimmed = candidate.trim();
  if (!/^[0-9a-f]{7,40}$/i.test(trimmed)) return null;
  return trimmed.slice(0, 12).toLowerCase();
}

export function buildVersionResponse(input: {
  readonly version: string;
  readonly buildSha?: string | null;
  readonly environment?: VersionEnvironment;
}): VersionResponseV1 {
  if (
    typeof input.version !== "string" ||
    input.version.length < 1 ||
    input.version.length > 64
  ) {
    throw new Error("invalid_version");
  }

  const environment = input.environment ?? "unknown";
  if (
    environment !== "concept_demo" &&
    environment !== "local" &&
    environment !== "unknown"
  ) {
    throw new Error("invalid_environment");
  }

  return Object.freeze({
    service: "web",
    version: input.version,
    build_sha: truncateBuildSha(input.buildSha),
    environment,
  });
}

export function isForbiddenLogKey(key: string): boolean {
  return FORBIDDEN_LOG_KEY_PATTERN.test(key);
}

export function redactLogValue(key: string, value: unknown): unknown {
  if (isForbiddenLogKey(key)) {
    return "[REDACTED]";
  }

  if (typeof value === "string") {
    if (
      /mysql:\/\/|postgres:\/\/|mongodb:\/\/|redis:\/\//i.test(value) ||
      /Bearer\s+[A-Za-z0-9._\-]+/i.test(value) ||
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(value)
    ) {
      return "[REDACTED]";
    }
  }

  return value;
}

export function buildOperationalLogFields(
  input: OperationalLogFieldsV1,
): OperationalLogFieldsV1 {
  if (!isControlledValue(OPERATIONAL_LOG_LEVELS, input.level)) {
    throw new Error("invalid_log_level");
  }

  if (
    input.correlation_id !== undefined &&
    !isCorrelationId(input.correlation_id)
  ) {
    throw new Error("invalid_correlation_id");
  }

  if (
    input.controlled_error_code !== undefined &&
    !isControlledErrorCode(input.controlled_error_code)
  ) {
    throw new Error("invalid_controlled_error_code");
  }

  const output: {
    -readonly [K in keyof OperationalLogFieldsV1]?: OperationalLogFieldsV1[K];
  } = {};

  for (const field of OPERATIONAL_LOG_FIELD_NAMES) {
    const value = input[field];
    if (value === undefined) continue;
    output[field] = redactLogValue(field, value) as never;
  }

  for (const key of Object.keys(input)) {
    if (
      !OPERATIONAL_LOG_FIELD_NAMES.includes(
        key as OperationalLogFieldName,
      )
    ) {
      throw new Error(`unknown_log_field:${key}`);
    }
  }

  if (
    typeof output.timestamp !== "string" ||
    typeof output.level !== "string" ||
    typeof output.service !== "string" ||
    typeof output.environment !== "string" ||
    typeof output.version !== "string"
  ) {
    throw new Error("incomplete_operational_log");
  }

  return Object.freeze({
    timestamp: output.timestamp,
    level: output.level,
    service: output.service,
    environment: output.environment,
    version: output.version,
    ...(output.route_template !== undefined
      ? { route_template: output.route_template }
      : {}),
    ...(output.http_method !== undefined
      ? { http_method: output.http_method }
      : {}),
    ...(output.status_class !== undefined
      ? { status_class: output.status_class }
      : {}),
    ...(output.duration_ms !== undefined
      ? { duration_ms: output.duration_ms }
      : {}),
    ...(output.correlation_id !== undefined
      ? { correlation_id: output.correlation_id }
      : {}),
    ...(output.controlled_error_code !== undefined
      ? { controlled_error_code: output.controlled_error_code }
      : {}),
    ...(output.redacted_actor_id !== undefined
      ? { redacted_actor_id: output.redacted_actor_id }
      : {}),
    ...(output.redacted_scope_id !== undefined
      ? { redacted_scope_id: output.redacted_scope_id }
      : {}),
  });
}
