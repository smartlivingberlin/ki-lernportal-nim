#!/usr/bin/env node
/**
 * Static guard: S52-D2b staging AUTH_RUNTIME decision + HTTP evidence markers.
 * Does not call Railway or mutate env.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const d2b = read("docs/architecture/S52_D2B_STAGING_AUTH_RUNTIME.md");
assert.match(d2b, /AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY/);
assert.match(d2b, /AUTH_RUNTIME_FLAG_FLIP_PRODUCTION=NO/);
assert.match(d2b, /S52_D2B_STAGING_FLAG_DECISION_DOCUMENTED=YES/);
assert.match(d2b, /S52_D2B_STAGING_FLAG_HTTP_VERIFIED=YES/);
assert.match(d2b, /STAGING_POST_LOGIN_UNKNOWN_USER=401_AUTH_REQUIRED/);
assert.match(d2b, /PRODUCTION_POST_LOGIN=403_FEATURE_DISABLED/);
assert.match(d2b, /HUMAN_SETS_STAGING_AUTH_RUNTIME=YES/);
assert.match(d2b, /RAILWAY_CHANGE_IN_REPO=NO/);

const status = read("docs/00_PROJECT_STATUS.md");
assert.match(status, /S52_D2B_STAGING_FLAG_HTTP_VERIFIED=YES/);
assert.match(status, /AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY/);
assert.match(status, /LIVE_BUILD_SHA_OBSERVED=d8d46ce7180c/);
assert.match(status, /PR159_S52_D2B_STAGING_AUTH_DOCS_MERGED=YES/);
assert.match(status, /PR161_DEEPEN_KERN_WEG_ONLY_MERGED=YES/);

assert.match(
  read("scripts/probe-s52-d2b-staging-auth.sh"),
  /ki-lernportal-nim-staging\.up\.railway\.app/,
);

console.log("S52_D2B_STAGING_AUTH_DOCS_STATIC_OK=YES");
