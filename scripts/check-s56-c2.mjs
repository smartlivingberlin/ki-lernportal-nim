#!/usr/bin/env node
/**
 * S56-C2 contract: curated retrieval expansion to l2, no free chat / embeddings / flag flip.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const scope = read("docs/architecture/S56_C2_CURATED_RETRIEVAL_EXPANSION.md");
assert.match(scope, /S56_C2_SCOPE_LOCK=YES/);
assert.match(scope, /S56_C2_CURATED_L2_AUTHORIZED=YES/);
assert.match(scope, /S56_C2_FREE_CHAT_FORBIDDEN=YES/);
assert.match(scope, /S56_C2_LIVE_LLM=NO/);
assert.match(scope, /S56_C2_VECTOR_DB=NO/);
assert.match(scope, /S56_C2_EMBEDDINGS=NO/);
assert.match(scope, /S56_C2_STAGING_FLAG_FLIP=NO/);
assert.match(scope, /S56_C2_PRODUCTION_FLAG_FLIP=NO/);
assert.match(scope, /S56_C2_RAILWAY_CHANGE_IN_REPO=NO/);
assert.match(scope, /S56_C2_INTEGRATED_TO_MAIN=YES/);
assert.match(scope, /Merge:.*#244/);
assert.match(scope, /FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false/);

const status = read("docs/00_PROJECT_STATUS.md");
assert.match(status, /S56_C2_SCOPE_LOCK=YES/);
assert.match(status, /S56_C2_CURATED_L2_AUTHORIZED=YES/);
assert.match(status, /S56_C2_FREE_CHAT_FORBIDDEN=YES/);
assert.match(status, /S56_C2_STAGING_FLAG_FLIP=NO/);
assert.match(status, /S56_C2_INTEGRATED_TO_MAIN=YES/);
assert.match(status, /S56_C_INTEGRATED_TO_MAIN=YES/);
assert.match(status, /MEDIA_M5_RAG_AUTHORIZED=NO/);

const retrieval = read("packages/ai-core/src/curated-retrieval.ts");
assert.match(retrieval, /l2-p-strengths/);
assert.match(retrieval, /l2-q-strengths/);
assert.match(retrieval, /l2-q-abstain/);
assert.doesNotMatch(retrieval, /fetch\(|openai|anthropic|ollama|pinecone|chroma/i);

const workspace = read(
  "apps/web/src/components/learning/LessonWorkspace.tsx",
);
assert.match(workspace, /CuratedRetrievalPanel/);
assert.match(workspace, /lesson\.id === "l2"/);

const stack = read("docs/architecture/MEDIA_OPEN_SOURCE_STACK.md");
assert.match(stack, /S56_C2_SCOPE_LOCK=YES/);
assert.match(stack, /S56_C2_CURATED_L2_AUTHORIZED=YES/);
assert.match(stack, /S56_C2_MERGE_COMMIT=167b3199c03572fbe80cb81bf10f11160ca0a38c/);

const operations = read("packages/contracts/src/operations.ts");
assert.match(operations, /ai_rag_runtime:\s*false/);

console.log("S56_C2_STATIC_OK=YES");
