import assert from "node:assert/strict";
import {
  SESSION_COOKIE_NAME,
  buildSessionCookieAttributes,
  parseSessionCookieHeader,
  serializeExpiredSessionCookie,
  serializeSessionCookie,
} from "./session-cookie.ts";

const attrs = buildSessionCookieAttributes(3600);
assert.equal(attrs.httpOnly, true);
assert.equal(attrs.secure, true);
assert.equal(attrs.path, "/");
assert.equal(attrs.sameSite, "Lax");
assert.equal(attrs.maxAgeSeconds, 3600);

const header = serializeSessionCookie("abcTOKEN", 3600);
assert.ok(header.startsWith(`${SESSION_COOKIE_NAME}=abcTOKEN;`));
assert.ok(header.includes("HttpOnly"));
assert.ok(header.includes("Secure"));
assert.ok(header.includes("SameSite=Lax"));
assert.ok(header.includes("Path=/"));
assert.ok(header.includes("Max-Age=3600"));

assert.equal(
  parseSessionCookieHeader(`a=1; ${SESSION_COOKIE_NAME}=abcTOKEN; b=2`),
  "abcTOKEN",
);
assert.equal(parseSessionCookieHeader("other=1"), null);

const expired = serializeExpiredSessionCookie();
assert.ok(expired.includes("Max-Age=0"));

assert.throws(() => serializeSessionCookie("bad;token", 1));
assert.throws(() => buildSessionCookieAttributes(-1));

console.log("session-cookie tests: ok");
