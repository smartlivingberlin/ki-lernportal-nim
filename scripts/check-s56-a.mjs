#!/usr/bin/env node
/**
 * S56-A contract: curated retrieval scope, no live LLM / vector DB / UI / flag flip.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const scope = read("docs/architecture/S56_A_RAG_SCOPE_LOCK.md");
assert.match(scope, /S56_A_SCOPE_LOCK=YES/);
assert.match(scope, /S56_A_CURATED_RETRIEVAL_AUTHORIZED=YES/);
assert.match(scope, /S56_A_LIVE_LLM=NO/);
assert.match(scope, /S56_A_VECTOR_DB=NO/);
assert.match(scope, /S56_A_EMBEDDINGS=NO/);
assert.match(scope, /S56_A_PRODUCT_UI=NO/);
assert.match(scope, /S56_A_STAGING_FLAG_FLIP=NO/);
assert.match(scope, /S56_A_PRODUCTION_FLAG_FLIP=NO/);
assert.match(scope, /FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false/);

const status = read("docs/00_PROJECT_STATUS.md");
assert.match(status, /S56_A_SCOPE_LOCK=YES/);
assert.match(status, /S56_A_CURATED_RETRIEVAL_AUTHORIZED=YES/);
assert.match(status, /S56_A_LIVE_LLM=NO/);
assert.match(status, /S56_A_STAGING_FLAG_FLIP=NO/);
assert.match(status, /MEDIA_M5_RAG_AUTHORIZED=NO/);

const retrieval = read("packages/ai-core/src/curated-retrieval.ts");
assert.match(retrieval, /retrieveCurated/);
assert.match(retrieval, /curated_retrieval/);
assert.match(retrieval, /citations/);
assert.match(retrieval, /abstain/);
assert.doesNotMatch(retrieval, /fetch\(|openai|anthropic|ollama|pinecone|chroma/i);

const index = read("packages/ai-core/src/index.ts");
assert.match(index, /retrieveCurated/);

const workspace = read(
  "apps/web/src/components/learning/LessonWorkspace.tsx",
);
assert.doesNotMatch(workspace, /retrieveCurated|curated_retrieval/);

const operations = read("packages/contracts/src/operations.ts");
assert.match(operations, /ai_rag_runtime:\s*false/);

const panel = read("apps/web/src/components/learning/MockTutorPanel.tsx");
assert.doesNotMatch(panel, /retrieveCurated/);

console.log("S56_A_STATIC_OK=YES");
