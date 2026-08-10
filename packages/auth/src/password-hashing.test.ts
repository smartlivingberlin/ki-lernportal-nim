import assert from "node:assert/strict";
import { hashPassword, verifyPassword } from "./password-hashing.ts";

const password = "korrektes-geheimnis-42";

const encoded = await hashPassword(password);
assert.match(encoded, /^nim-scrypt-v1\$/);
assert.equal(await verifyPassword(password, encoded), true);
assert.equal(await verifyPassword("falsch", encoded), false);
assert.equal(await verifyPassword(password, "not-a-hash"), false);

const again = await hashPassword(password);
assert.notEqual(encoded, again, "salts must differ");
assert.equal(await verifyPassword(password, again), true);

console.log("password-hashing tests: ok");
