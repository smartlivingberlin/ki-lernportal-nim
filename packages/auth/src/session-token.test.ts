import assert from "node:assert/strict";
import {
  generateSessionToken,
  hashSessionToken,
  sessionTokenHashesEqual,
} from "./session-token.ts";

const token = generateSessionToken();
assert.ok(token.length >= 40);
assert.match(token, /^[A-Za-z0-9_-]+$/);

const hash = hashSessionToken(token);
assert.equal(hash.length, 64);
assert.match(hash, /^[a-f0-9]+$/);
assert.notEqual(hash, token);
assert.equal(sessionTokenHashesEqual(hash, hashSessionToken(token)), true);
assert.equal(sessionTokenHashesEqual(hash, hashSessionToken(token + "x")), false);

assert.throws(() => hashSessionToken(""));

console.log("session-token tests: ok");
