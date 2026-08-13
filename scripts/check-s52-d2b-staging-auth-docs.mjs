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
assert.match(d2b, /S52_STAGING_AUTH_SEED_AUTHORIZED=YES/);
assert.match(d2b, /S52_STAGING_AUTH_SEED_IMPLEMENTED=YES/);
assert.match(d2b, /BOOTSTRAP_CREDENTIALS_IN_REPO=NO/);
assert.match(d2b, /STAGING_BOOTSTRAP_PASSWORD_HASH/);
assert.match(d2b, /PRODUCTION_USERS=NO/);

const status = read("docs/00_PROJECT_STATUS.md");
assert.match(status, /S52_D2B_STAGING_FLAG_HTTP_VERIFIED=YES/);
assert.match(status, /AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY/);
assert.match(status, /S52_STAGING_AUTH_SEED_IMPLEMENTED=YES/);
assert.match(status, /S52_STAGING_AUTH_SEED_AUTHORIZED=YES/);
assert.match(status, /LIVE_BUILD_SHA_OBSERVED=f8bc8a5f1ca6/);
assert.match(status, /PR159_S52_D2B_STAGING_AUTH_DOCS_MERGED=YES/);
assert.match(status, /PR161_DEEPEN_KERN_WEG_ONLY_MERGED=YES/);
assert.match(status, /PR160_DOCS_SYNC_D8D46CE_MERGED=YES/);
assert.match(status, /PR165_PROGRESS_BACKUP_CLARITY_MERGED=YES/);
assert.match(status, /PR166_PLANNED_PATHS_ALLTAG_PROMPTING_MERGED=YES/);
assert.match(status, /PR167_DOCS_SYNC_B2D0EC4_MERGED=YES/);
assert.match(status, /PR168_DOCS_SYNC_2B50B77_MERGED=YES/);
assert.match(status, /PR169_UX_PLANNED_PATHS_HERO_QA_MERGED=YES/);
assert.match(status, /PR170_DOCS_SYNC_326219D_MERGED=YES/);
assert.match(status, /PR171_DOCS_SYNC_FB1C000_MERGED=YES/);
assert.match(status, /PR173_DOCS_SYNC_019FA4B_MERGED=YES/);
assert.match(status, /PR175_S49D_EXPLAIN_FLAKE_MERGED=YES/);
assert.match(status, /PR174_BACKUP_DEEPLINK_MERGED=YES/);
assert.match(status, /PR176_DOCS_SYNC_CB1D493_MERGED=YES/);
assert.match(status, /PR178_DOCS_SYNC_EB4C285_MERGED=YES/);
assert.match(status, /PR179_WEITERE_PFADE_HELP_TIP_MERGED=YES/);
assert.match(status, /PR180_DOCS_SYNC_8610251_MERGED=YES/);
assert.match(status, /PR181_BACKUP_HASH_FOCUS_MERGED=YES/);
assert.match(status, /PR182_DOCS_SYNC_CB68836_MERGED=YES/);
assert.match(status, /PR183_KERN_WEG_COMPLETE_MERGED=YES/);
assert.match(status, /HUMAN_FREIGABE_ABCD_AT=2026-08-13/);
assert.match(status, /S51B_B_CONNECTION_PROOF_AUTHORIZED=YES/);
assert.match(status, /S52_STAGING_AUTH_SEED_AUTHORIZED=YES/);

assert.match(
  read("scripts/probe-s52-d2b-staging-auth.sh"),
  /ki-lernportal-nim-staging\.up\.railway\.app/,
);

console.log("S52_D2B_STAGING_AUTH_DOCS_STATIC_OK=YES");
