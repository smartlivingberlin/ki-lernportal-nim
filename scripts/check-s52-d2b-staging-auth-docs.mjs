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
assert.match(status, /LIVE_BUILD_SHA_OBSERVED=b9904aa61d4a/);
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
assert.match(status, /PR187_FREIGABE_D_STACK_MERGED=YES/);
assert.match(status, /PR187_LANDED_FREIGABE_ABCD=YES/);
assert.match(status, /PR188_DOCS_SYNC_09674F3_MERGED=YES/);
assert.match(status, /PR189_RETURNING_HERO_NEXTSTEP_MERGED=YES/);
assert.match(status, /PR190_DOCS_SYNC_656BC26_MERGED=YES/);
assert.match(status, /PR191_UX_HONESTY_PACK_MERGED=YES/);
assert.match(status, /PR192_DOCS_SYNC_15F8B9E_MERGED=YES/);
assert.match(status, /PR193_INTEGRITY_A123_MERGED=YES/);
assert.match(status, /PR196_PRODUCT_C_PACK_MERGED=YES/);
assert.match(status, /PR197_DOCS_SYNC_5BAEA1E_MERGED=YES/);
assert.match(status, /PR198_QUALITY_FOLLOWUP_MERGED=YES/);
assert.match(status, /PR199_DOCS_SYNC_0B44D67_MERGED=YES/);
assert.match(status, /PR200_CHALLENGE_CONFIDENCE_HONESTY_MERGED=YES/);
assert.match(status, /PR201_DOCS_SYNC_FF85A0D_MERGED=YES/);
assert.match(status, /PR202_UNSURE_MIDPATH_NEXTSTEP_MERGED=YES/);
assert.match(status, /PR203_DOCS_SYNC_6BB6E1A_MERGED=YES/);
assert.match(status, /PR204_LESSON_SHARE_COPY_MERGED=YES/);
assert.match(status, /PR205_DOCS_SYNC_71F1462_MERGED=YES/);
assert.match(status, /PR206_BACKUP_IMPORT_CONFIRM_MERGED=YES/);
assert.match(status, /PR207_DOCS_SYNC_23DCC1F_MERGED=YES/);
assert.match(status, /PR208_TEACHBACK_EPHEMERAL_HONESTY_MERGED=YES/);
assert.match(status, /PR209_DOCS_SYNC_3E18BDF_MERGED=YES/);
assert.match(status, /PR210_THEME_WORLD_JARGON_MERGED=YES/);
assert.match(status, /PR211_DOCS_SYNC_33FE1C6_MERGED=YES/);
assert.match(status, /PR213_PRIVACY_ENTRY_CLARITY_MERGED=YES/);
assert.match(status, /PR212_FORENSIC_AUDIT_HANDOFF_MERGED=YES/);
assert.match(status, /PR214_DOCS_SYNC_8E59F06_MERGED=YES/);
assert.match(status, /PR215_IA_TRIM_PROGRESSIVE_MERGED=YES/);
assert.match(status, /PR216_DOCS_SYNC_1D6CC65_MERGED=YES/);
assert.match(status, /PR217_HONESTY_BACKUP_DISCOVER_MERGED=YES/);
assert.match(status, /PR218_DOCS_SYNC_D07C2F0_MERGED=YES/);
assert.match(status, /PR219_UNSURE_REVIEW_POLISH_MERGED=YES/);
assert.match(status, /PR223_NOINDEX_REVIEW_SOFTSTART_MERGED=YES/);
assert.match(status, /PR224_DOCS_SYNC_0A33011_MERGED=YES/);
assert.match(status, /PR225_DATENSCHUTZ_STORAGE_KEYS_MERGED=YES/);
assert.match(status, /PR226_MEDIA_M0_M1_MERGED=YES/);
assert.match(status, /PR227_MEDIA_M2_MERGED=YES/);
assert.match(status, /PR228_MEDIA_M3_MERGED=YES/);
assert.match(status, /PR229_MEDIA_M4_MERGED=YES/);
assert.match(status, /PR230_DOCS_SYNC_D6B50F2_MERGED=YES/);
assert.match(status, /PR231_MEDIA_M5_A_MERGED=YES/);
assert.match(status, /PR232_DOCS_SYNC_0217914_MERGED=YES/);
assert.match(status, /PR233_MEDIA_M5_B_MERGED=YES/);
assert.match(status, /PR234_DOCS_SYNC_60B6EAE_MERGED=YES/);
assert.match(status, /PR235_S56_A_CURATED_RETRIEVAL_MERGED=YES/);
assert.match(status, /PR236_DOCS_SYNC_FFA90F6_MERGED=YES/);
assert.match(status, /PR237_S56_B_STAGING_FLAG_PRIVACY_MERGED=YES/);
assert.match(status, /PR238_DOCS_SYNC_A239AA5_MERGED=YES/);
assert.match(status, /PR239_S56_C_CURATED_RETRIEVAL_UI_MERGED=YES/);
assert.match(status, /PR240_DOCS_SYNC_CAF0CAF_MERGED=YES/);
assert.match(status, /PR241_DOCS_SYNC_62AC1DE_MERGED=YES/);
assert.match(status, /MEDIA_M0_SCOPE_LOCK=YES/);
assert.match(status, /MEDIA_M4_INTEGRATED_TO_MAIN=YES/);
assert.match(status, /MEDIA_M5_A_SCOPE_LOCK=YES/);
assert.match(status, /MEDIA_M5_A_MOCK_AUTHORIZED=YES/);
assert.match(status, /MEDIA_M5_A_INTEGRATED_TO_MAIN=YES/);
assert.match(status, /MEDIA_M5_B_SCOPE_LOCK=YES/);
assert.match(status, /MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=YES/);
assert.match(status, /MEDIA_M5_B_PRODUCT_UI=NO/);
assert.match(status, /MEDIA_M5_B_INTEGRATED_TO_MAIN=YES/);
assert.match(status, /S56_A_SCOPE_LOCK=YES/);
assert.match(status, /S56_A_CURATED_RETRIEVAL_AUTHORIZED=YES/);
assert.match(status, /S56_A_LIVE_LLM=NO/);
assert.match(status, /S56_A_STAGING_FLAG_FLIP=NO/);
assert.match(status, /S56_A_INTEGRATED_TO_MAIN=YES/);
assert.match(status, /S56_B_SCOPE_LOCK=YES/);
assert.match(status, /S56_B_STAGING_FLAG_FLIP_EXECUTED=NO/);
assert.match(status, /S56_B_PRODUCTION_FLAG_FLIP=NO/);
assert.match(status, /S56_B_INTEGRATED_TO_MAIN=YES/);
assert.match(status, /S56_C_SCOPE_LOCK=YES/);
assert.match(status, /S56_C_CURATED_RETRIEVAL_UI_AUTHORIZED=YES/);
assert.match(status, /S56_C_INTEGRATED_TO_MAIN=YES/);
assert.match(status, /MEDIA_M5_AI_AUTHORIZED=NO/);
assert.match(status, /HUMAN_FREIGABE_ABCD_AT=2026-08-13/);
assert.match(status, /S51B_B_CONNECTION_PROOF_AUTHORIZED=YES/);
assert.match(status, /S52_STAGING_AUTH_SEED_AUTHORIZED=YES/);
assert.match(status, /S52_STAGING_AUTH_SEED_IMPLEMENTED=YES/);

assert.match(
  read("scripts/probe-s52-d2b-staging-auth.sh"),
  /ki-lernportal-nim-staging\.up\.railway\.app/,
);

console.log("S52_D2B_STAGING_AUTH_DOCS_STATIC_OK=YES");
