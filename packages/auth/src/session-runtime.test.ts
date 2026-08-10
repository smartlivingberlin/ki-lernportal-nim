import assert from "node:assert/strict";
import { createMemorySessionStore } from "./memory-session-store.ts";
import { createSessionRuntime } from "./session-runtime.ts";
import { hashSessionToken } from "./session-token.ts";
import { SESSION_TTL_CANDIDATES } from "./session-policy.ts";

const store = createMemorySessionStore();
const runtime = createSessionRuntime(store);
const now = 1_700_000_000_000;

const created = await runtime.createSession({
  subjectId: "user-1",
  role: "Learner",
  nowMs: now,
});

assert.equal(created.session.status, "active");
assert.equal(created.session.tokenHash, hashSessionToken(created.rawToken));
assert.ok(created.setCookie.includes("HttpOnly"));
assert.ok(
  !(await store.findByTokenHash(created.rawToken)),
  "raw token must not be stored",
);

const resolved = await runtime.resolveSession({
  rawToken: created.rawToken,
  nowMs: now + 1000,
});
assert.ok(resolved);
assert.equal(resolved.sessionId, created.session.sessionId);

const touched = await runtime.touchSession({
  sessionId: created.session.sessionId,
  nowMs: now + 2000,
});
assert.ok(touched);
assert.equal(touched.lastSeenAtMs, now + 2000);

const rotated = await runtime.rotateSession({
  sessionId: created.session.sessionId,
  nowMs: now + 3000,
});
assert.ok(rotated);
assert.equal(rotated.session.status, "rotated");
assert.notEqual(rotated.rawToken, created.rawToken);
assert.equal(
  await runtime.resolveSession({
    rawToken: created.rawToken,
    nowMs: now + 3000,
  }),
  null,
  "old token must not resolve after rotation",
);
assert.ok(
  await runtime.resolveSession({
    rawToken: rotated.rawToken,
    nowMs: now + 3000,
  }),
);

const logout = await runtime.logout({
  sessionId: created.session.sessionId,
  nowMs: now + 4000,
});
assert.equal(logout.session?.status, "terminated");
assert.ok(logout.setCookie.includes("Max-Age=0"));
assert.equal(
  await runtime.resolveSession({
    rawToken: rotated.rawToken,
    nowMs: now + 4000,
  }),
  null,
);

const second = await runtime.createSession({
  subjectId: "user-2",
  role: "Admin",
  nowMs: now,
});
const third = await runtime.createSession({
  subjectId: "user-2",
  role: "Admin",
  nowMs: now,
});
const revokedCount = await runtime.revokeAllForSubject({
  subjectId: "user-2",
  nowMs: now + 10,
});
assert.equal(revokedCount, 2);
assert.equal(
  await runtime.resolveSession({
    rawToken: second.rawToken,
    nowMs: now + 10,
  }),
  null,
);
assert.equal(
  await runtime.resolveSession({
    rawToken: third.rawToken,
    nowMs: now + 10,
  }),
  null,
);

const learner = await runtime.createSession({
  subjectId: "user-3",
  role: "Learner",
  nowMs: now,
});
const pastAbsolute =
  now + SESSION_TTL_CANDIDATES.learnerAbsoluteMaxSeconds * 1000 + 1;
assert.equal(
  await runtime.resolveSession({
    rawToken: learner.rawToken,
    nowMs: pastAbsolute,
  }),
  null,
  "absolute TTL must expire the session",
);

console.log("session-runtime tests: ok");
