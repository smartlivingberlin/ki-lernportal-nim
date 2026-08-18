#!/usr/bin/env node
/**
 * S56-C9 contract: curated retrieval expansion to l9, no free chat / embeddings / flag flip.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const scope = read("docs/architecture/S56_C9_CURATED_RETRIEVAL_EXPANSION.md");
assert.match(scope, /S56_C9_SCOPE_LOCK=YES/);
assert.match(scope, /S56_C9_CURATED_L9_AUTHORIZED=YES/);
assert.match(scope, /S56_C9_FREE_CHAT_FORBIDDEN=YES/);
assert.match(scope, /S56_C9_LIVE_LLM=NO/);
assert.match(scope, /S56_C9_VECTOR_DB=NO/);
assert.match(scope, /S56_C9_EMBEDDINGS=NO/);
assert.match(scope, /S56_C9_STAGING_FLAG_FLIP=NO/);
assert.match(scope, /S56_C9_PRODUCTION_FLAG_FLIP=NO/);
assert.match(scope, /S56_C9_RAILWAY_CHANGE_IN_REPO=NO/);
assert.match(scope, /S56_C9_INTEGRATED_TO_MAIN=YES/);
assert.match(scope, /FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false/);

const status = read("docs/00_PROJECT_STATUS.md");
assert.match(status, /S56_C9_SCOPE_LOCK=YES/);
assert.match(status, /S56_C9_CURATED_L9_AUTHORIZED=YES/);
assert.match(status, /S56_C9_FREE_CHAT_FORBIDDEN=YES/);
assert.match(status, /S56_C9_STAGING_FLAG_FLIP=NO/);
assert.match(status, /S56_C9_INTEGRATED_TO_MAIN=YES/);
assert.match(status, /S56_C8_INTEGRATED_TO_MAIN=YES/);
assert.match(status, /MEDIA_M5_RAG_AUTHORIZED=NO/);

const retrieval = read("packages/ai-core/src/curated-retrieval.ts");
assert.match(retrieval, /l9-p-what/);
assert.match(retrieval, /l9-q-what/);
assert.match(retrieval, /l9-q-abstain/);
assert.doesNotMatch(retrieval, /fetch\(|openai|anthropic|ollama|pinecone|chroma/i);

const workspace = read(
  "apps/web/src/components/learning/LessonWorkspace.tsx",
);
assert.match(workspace, /CuratedRetrievalPanel/);
assert.match(workspace, /lesson\.id === "l9"/);

const stack = read("docs/architecture/MEDIA_OPEN_SOURCE_STACK.md");
assert.match(stack, /S56_C9_SCOPE_LOCK=YES/);
assert.match(stack, /S56_C9_CURATED_L9_AUTHORIZED=YES/);

const operations = read("packages/contracts/src/operations.ts");
assert.match(operations, /ai_rag_runtime:\s*false/);

console.log("S56_C9_STATIC_OK=YES");
