/**
 * Freigabe D – staging bootstrap credential guards (no network, no secrets).
 */
import assert from "node:assert/strict";
import {
  isProductionLikeAuthEnvironment,
  readStagingBootstrapCredentials,
} from "./staging-auth-seed.ts";

assert.equal(isProductionLikeAuthEnvironment({ APP_ENV: "production" }), true);
assert.equal(
  isProductionLikeAuthEnvironment({ RAILWAY_ENVIRONMENT_NAME: "production" }),
  true,
);
assert.equal(isProductionLikeAuthEnvironment({ APP_ENV: "staging" }), false);

assert.deepEqual(
  readStagingBootstrapCredentials({
    AUTH_RUNTIME: "true",
    STAGING_BOOTSTRAP_EMAIL: "seed@example.com",
    STAGING_BOOTSTRAP_PASSWORD_HASH: "nim-scrypt-v1$16384$8$1$saltsalthash",
  }),
  [
    {
      subjectId: "staging-bootstrap",
      email: "seed@example.com",
      role: "Learner",
      passwordHash: "nim-scrypt-v1$16384$8$1$saltsalthash",
    },
  ],
);

assert.deepEqual(
  readStagingBootstrapCredentials({
    AUTH_RUNTIME: "false",
    STAGING_BOOTSTRAP_EMAIL: "seed@example.com",
    STAGING_BOOTSTRAP_PASSWORD_HASH: "nim-scrypt-v1$16384$8$1$saltsalthash",
  }),
  [],
);

assert.deepEqual(
  readStagingBootstrapCredentials({
    AUTH_RUNTIME: "true",
    APP_ENV: "production",
    STAGING_BOOTSTRAP_EMAIL: "seed@example.com",
    STAGING_BOOTSTRAP_PASSWORD_HASH: "nim-scrypt-v1$16384$8$1$saltsalthash",
  }),
  [],
);

assert.deepEqual(
  readStagingBootstrapCredentials({
    AUTH_RUNTIME: "true",
    STAGING_BOOTSTRAP_EMAIL: "seed@example.com",
    STAGING_BOOTSTRAP_PASSWORD_HASH: "nim-scrypt-v1$16384$8$1$saltsalthash",
    STAGING_BOOTSTRAP_ROLE: "Admin",
  }),
  [],
);

assert.deepEqual(
  readStagingBootstrapCredentials({
    AUTH_RUNTIME: "true",
    STAGING_BOOTSTRAP_EMAIL: "seed@example.com",
    STAGING_BOOTSTRAP_PASSWORD_HASH: "plaintext-not-allowed",
  }),
  [],
);

assert.deepEqual(
  readStagingBootstrapCredentials({
    AUTH_RUNTIME: "true",
    STAGING_BOOTSTRAP_EMAIL: "seed@example.com",
    STAGING_BOOTSTRAP_PASSWORD_HASH: "nim-scrypt-v1$16384$8$1$saltsalthash",
    STAGING_BOOTSTRAP_ROLE: "Editor",
    STAGING_BOOTSTRAP_SUBJECT_ID: "staging-editor-1",
  }),
  [
    {
      subjectId: "staging-editor-1",
      email: "seed@example.com",
      role: "Editor",
      passwordHash: "nim-scrypt-v1$16384$8$1$saltsalthash",
    },
  ],
);

console.log("S52_STAGING_AUTH_SEED_ADAPTER_TESTS=PASS");
