import assert from "node:assert/strict";
import {
  createAuthHttpHandlers,
  createMemoryCredentialStore,
} from "./auth-http.ts";
import { hashPassword } from "./password-hashing.ts";
import { createMemorySessionStore } from "./memory-session-store.ts";
import { createSessionRuntime } from "./session-runtime.ts";
import { SESSION_COOKIE_NAME } from "./session-cookie.ts";

const passwordHash = await hashPassword("correct-horse-battery");
const credentials = createMemoryCredentialStore([
  {
    subjectId: "user-1",
    email: "learner@example.com",
    role: "Learner",
    passwordHash,
  },
]);
const store = createMemorySessionStore();
const runtime = createSessionRuntime(store);

let authEnabled = false;
const handlers = createAuthHttpHandlers({
  runtime,
  credentials,
  isAuthRuntimeEnabled: () => authEnabled,
});

authEnabled = false;
const disabledLogin = await handlers.login({
  body: { email: "learner@example.com", password: "correct-horse-battery" },
});
assert.equal(disabledLogin.status, 403);
assert.equal(
  (disabledLogin.body.error as { code: string }).code,
  "FEATURE_DISABLED",
);
assert.equal(disabledLogin.setCookie, null);

const disabledLogout = await handlers.logout({
  cookieHeader: `${SESSION_COOKIE_NAME}=anything`,
});
assert.equal(disabledLogout.status, 403);
assert.equal(disabledLogout.setCookie, null);

authEnabled = true;
const badBody = await handlers.login({ body: { email: "x" } });
assert.equal(badBody.status, 400);
assert.equal(badBody.setCookie, null);

const wrongPassword = await handlers.login({
  body: { email: "learner@example.com", password: "wrong" },
});
assert.equal(wrongPassword.status, 401);
assert.equal(wrongPassword.setCookie, null);

const login = await handlers.login({
  body: { email: "learner@example.com", password: "correct-horse-battery" },
  nowMs: 1_700_000_000_000,
});
assert.equal(login.status, 200);
assert.equal(login.body.ok, true);
assert.equal(login.body.subjectId, "user-1");
assert.ok(typeof login.setCookie === "string");
assert.ok(login.setCookie?.includes("HttpOnly"));
assert.ok(login.setCookie?.includes("Secure"));
assert.ok(login.setCookie?.includes("SameSite=Lax"));
assert.ok(!JSON.stringify(login.body).includes("correct-horse-battery"));
assert.ok(!JSON.stringify(login.body).toLowerCase().includes("token"));

const cookieHeader = login.setCookie?.split(";")[0] ?? "";
const logout = await handlers.logout({
  cookieHeader,
  nowMs: 1_700_000_000_100,
});
assert.equal(logout.status, 200);
assert.ok(logout.setCookie?.includes("Max-Age=0"));

console.log("S52_D1_AUTH_HTTP_TESTS=PASS");
