#!/usr/bin/env node
/**
 * S56-B contract: privacy + staging-flag decision documented; no flip executed.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const scope = read("docs/architecture/S56_B_STAGING_FLAG_PRIVACY.md");
assert.match(scope, /S56_B_SCOPE_LOCK=YES/);
assert.match(scope, /S56_B_PRIVACY_REVIEW_DOCUMENTED=YES/);
assert.match(scope, /S56_B_STAGING_FLAG_DECISION_DOCUMENTED=YES/);
assert.match(scope, /S56_B_STAGING_FLAG_FLIP_EXECUTED=NO/);
assert.match(scope, /S56_B_PRODUCTION_FLAG_FLIP=NO/);
assert.match(scope, /S56_B_PRODUCT_UI=NO/);
assert.match(scope, /S56_B_RAILWAY_CHANGE_IN_REPO=NO/);
assert.match(scope, /FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false/);
assert.match(scope, /AI_RAG_RUNTIME_FLAG_FLIP_PRODUCTION=NO/);
assert.match(scope, /S56_B_PRIVACY_NO_USER_CORPUS_PII=YES/);
assert.match(scope, /S56_B_PRIVACY_ABSTENTION_REQUIRED=YES/);

const status = read("docs/00_PROJECT_STATUS.md");
assert.match(status, /S56_B_SCOPE_LOCK=YES/);
assert.match(status, /S56_B_STAGING_FLAG_FLIP_EXECUTED=NO/);
assert.match(status, /S56_B_PRODUCTION_FLAG_FLIP=NO/);
assert.match(status, /S56_A_INTEGRATED_TO_MAIN=YES/);

const policy = read("packages/ai-core/src/ai-rag-runtime-policy.ts");
assert.match(policy, /resolveAiRagRuntimePolicy/);
assert.match(policy, /productionFlipAllowed: false/);
assert.match(policy, /stagingFlipExecuted: false/);
assert.doesNotMatch(policy, /process\.env|fetch\(/);

const index = read("packages/ai-core/src/index.ts");
assert.match(index, /resolveAiRagRuntimePolicy/);

const operations = read("packages/contracts/src/operations.ts");
assert.match(operations, /ai_rag_runtime:\s*false/);

const workspace = read(
  "apps/web/src/components/learning/LessonWorkspace.tsx",
);
assert.doesNotMatch(workspace, /ai_rag_runtime|resolveAiRagRuntimePolicy/);

console.log("S56_B_STATIC_OK=YES");
