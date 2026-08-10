import {
  SESSION_STATES,
  SESSION_TTL_CANDIDATES,
  TERMINAL_SESSION_STATES,
  canRenewSession,
  canUseSession,
  isSessionExpiredByTime,
  isSessionState,
  isTerminalSessionState,
  logoutRevokesServerSession,
  mustRevokeSessionsOnPasswordChange,
  mustRevokeSessionsOnSuccessfulRecovery,
  mustRotateOnPrivilegeEscalation,
  resolveSessionTtlSeconds,
} from "./session-policy.ts";

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
  SESSION_STATES,
  [
    "created",
    "active",
    "rotated",
    "expired",
    "revoked",
    "compromised",
    "terminated",
  ],
  "session states",
);

for (const status of SESSION_STATES) {
  ok(isSessionState(status), `accept ${status}`);
}
ok(!isSessionState("anonymous"), "reject unknown");

for (const status of TERMINAL_SESSION_STATES) {
  ok(isTerminalSessionState(status), `terminal ${status}`);
  ok(!canRenewSession(status), `no renew ${status}`);
}

ok(canRenewSession("active"), "renew active");
ok(canRenewSession("rotated"), "renew rotated");
ok(!canRenewSession("created"), "no renew created");

ok(mustRotateOnPrivilegeEscalation(), "rotate on escalation");
ok(mustRevokeSessionsOnPasswordChange(), "revoke on password change");
ok(mustRevokeSessionsOnSuccessfulRecovery(), "revoke on recovery");
ok(logoutRevokesServerSession(), "logout revokes");

same(SESSION_TTL_CANDIDATES.SESSION_TTL_VALUES_APPROVED, false, "ttl not approved");

same(
  resolveSessionTtlSeconds("Learner"),
  {
    idleMaxSeconds: 7 * 24 * 60 * 60,
    absoluteMaxSeconds: 30 * 24 * 60 * 60,
  },
  "learner ttl",
);

same(
  resolveSessionTtlSeconds("Admin"),
  {
    idleMaxSeconds: 8 * 60 * 60,
    absoluteMaxSeconds: 24 * 60 * 60,
  },
  "admin ttl shorter",
);

const base = {
  nowMs: 1_000_000,
  lastSeenAtMs: 900_000,
  createdAtMs: 800_000,
  role: "Learner" as const,
};

ok(!isSessionExpiredByTime(base), "fresh learner session");

ok(
  isSessionExpiredByTime({
    ...base,
    lastSeenAtMs: base.nowMs - 8 * 24 * 60 * 60 * 1000,
  }),
  "idle exceeded",
);

ok(
  canUseSession({
    status: "active",
    expiry: base,
  }),
  "usable active session",
);

ok(
  !canUseSession({
    status: "revoked",
    expiry: base,
  }),
  "revoked not usable",
);
