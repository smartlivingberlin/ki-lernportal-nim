import {
  CONTROLLED_ERROR_CODES,
  DEFAULT_FEATURE_FLAGS,
  FEATURE_FLAG_NAMES,
  OPERATIONAL_LOG_FIELD_NAMES,
  OPERATIONS_CONTRACT_VERSION,
  buildLiveResponse,
  buildOperationalLogFields,
  buildReadyResponse,
  buildVersionResponse,
  createCorrelationId,
  isControlledErrorCode,
  isCorrelationId,
  isFeatureEnabled,
  isFeatureFlagName,
  isForbiddenLogKey,
  redactLogValue,
  resolveFeatureFlags,
  truncateBuildSha,
} from "./operations.ts";

function ok(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function same(actual: unknown, expected: unknown, message: string): void {
  ok(
    JSON.stringify(actual) === JSON.stringify(expected),
    `${message}: expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)}`,
  );
}

same(
  OPERATIONS_CONTRACT_VERSION,
  "S51C_OPS_A_OPERATIONS_V1",
  "operations contract version",
);

same(
  FEATURE_FLAG_NAMES,
  [
    "auth_runtime",
    "admin_runtime",
    "ai_rag_runtime",
    "database_readiness_required",
  ],
  "feature flag allowlist",
);

same(
  DEFAULT_FEATURE_FLAGS,
  {
    auth_runtime: false,
    admin_runtime: false,
    ai_rag_runtime: false,
    database_readiness_required: false,
  },
  "feature flag safe defaults",
);

for (const name of FEATURE_FLAG_NAMES) {
  ok(isFeatureFlagName(name), `flag accepted ${name}`);
  ok(!isFeatureEnabled(DEFAULT_FEATURE_FLAGS, name), `default false ${name}`);
}
ok(!isFeatureFlagName("public_launch"), "unknown flag rejected");

same(
  resolveFeatureFlags({ auth_runtime: true }).auth_runtime,
  true,
  "override auth_runtime",
);

let unknownFlagFailed = false;
try {
  resolveFeatureFlags({ public_launch: true } as never);
} catch {
  unknownFlagFailed = true;
}
ok(unknownFlagFailed, "unknown override rejected");

same(buildLiveResponse(), { status: "live" }, "live response");

same(
  buildReadyResponse({}),
  {
    status: "ready",
    checks: [{ name: "database", status: "not_configured" }],
  },
  "ready without required database",
);

same(
  buildReadyResponse({
    flags: resolveFeatureFlags({ database_readiness_required: true }),
    databaseStatus: "not_configured",
  }),
  {
    status: "not_ready",
    checks: [{ name: "database", status: "not_configured" }],
  },
  "ready blocked when database required",
);

same(
  buildReadyResponse({
    flags: resolveFeatureFlags({ database_readiness_required: true }),
    databaseStatus: "pass",
  }),
  {
    status: "ready",
    checks: [{ name: "database", status: "pass" }],
  },
  "ready when required database passes",
);

same(
  buildVersionResponse({
    version: "0.1.0",
    buildSha: "ABCDEF1234567890",
    environment: "concept_demo",
  }),
  {
    service: "web",
    version: "0.1.0",
    build_sha: "abcdef123456",
    environment: "concept_demo",
  },
  "version response truncated sha",
);

same(truncateBuildSha("not-a-sha"), null, "invalid sha rejected");
same(truncateBuildSha(undefined), null, "missing sha null");

const correlationId = createCorrelationId();
ok(isCorrelationId(correlationId), "generated correlation id");
ok(!isCorrelationId("not-a-uuid"), "invalid correlation id");

for (const code of CONTROLLED_ERROR_CODES) {
  ok(isControlledErrorCode(code), `error code ${code}`);
}
ok(!isControlledErrorCode("LEAK_STACK"), "unknown error code");

ok(isForbiddenLogKey("password_hash"), "password key forbidden");
ok(isForbiddenLogKey("authorization"), "authorization key forbidden");
ok(!isForbiddenLogKey("route_template"), "route_template allowed");

same(redactLogValue("password", "secret"), "[REDACTED]", "password redacted");
same(
  redactLogValue("message", "mysql://user:pass@host/db"),
  "[REDACTED]",
  "db url redacted",
);
same(
  redactLogValue("message", "user@example.com"),
  "[REDACTED]",
  "email redacted",
);
same(redactLogValue("message", "ok"), "ok", "safe message kept");

const log = buildOperationalLogFields({
  timestamp: "2026-08-10T19:00:00.000Z",
  level: "info",
  service: "web",
  environment: "concept_demo",
  version: "0.1.0",
  route_template: "/ready",
  http_method: "GET",
  status_class: "2xx",
  duration_ms: 3,
  correlation_id: correlationId,
  controlled_error_code: "INTERNAL_ERROR",
  redacted_actor_id: "actor-redacted",
  redacted_scope_id: "scope-redacted",
});

same(log.level, "info", "log level");
same(log.correlation_id, correlationId, "log correlation");
same(
  Object.keys(log).sort(),
  [...OPERATIONAL_LOG_FIELD_NAMES].sort(),
  "log fields exact allowlist",
);

let unknownLogFieldFailed = false;
try {
  buildOperationalLogFields({
    timestamp: "2026-08-10T19:00:00.000Z",
    level: "info",
    service: "web",
    environment: "local",
    version: "0.1.0",
    password: "nope",
  } as never);
} catch {
  unknownLogFieldFailed = true;
}
ok(unknownLogFieldFailed, "unknown log field rejected");
