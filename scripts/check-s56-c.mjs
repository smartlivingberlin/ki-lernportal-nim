#!/usr/bin/env node
/**
 * S56-C contract: curated retrieval pilot UI, no free chat / embeddings / flag flip.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const scope = read("docs/architecture/S56_C_CURATED_RETRIEVAL_UI.md");
assert.match(scope, /S56_C_SCOPE_LOCK=YES/);
assert.match(scope, /S56_C_CURATED_RETRIEVAL_UI_AUTHORIZED=YES/);
assert.match(scope, /S56_C_FREE_CHAT_FORBIDDEN=YES/);
assert.match(scope, /S56_C_LIVE_LLM=NO/);
assert.match(scope, /S56_C_VECTOR_DB=NO/);
assert.match(scope, /S56_C_EMBEDDINGS=NO/);
assert.match(scope, /S56_C_STAGING_FLAG_FLIP=NO/);
assert.match(scope, /S56_C_PRODUCTION_FLAG_FLIP=NO/);
assert.match(scope, /S56_C_RAILWAY_CHANGE_IN_REPO=NO/);
assert.match(scope, /S56_C_INTEGRATED_TO_MAIN=YES/);
assert.match(scope, /FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false/);
assert.match(scope, /S56-D/);

const status = read("docs/00_PROJECT_STATUS.md");
assert.match(status, /S56_C_SCOPE_LOCK=YES/);
assert.match(status, /S56_C_CURATED_RETRIEVAL_UI_AUTHORIZED=YES/);
assert.match(status, /S56_C_FREE_CHAT_FORBIDDEN=YES/);
assert.match(status, /S56_C_STAGING_FLAG_FLIP=NO/);
assert.match(status, /S56_C_INTEGRATED_TO_MAIN=YES/);
assert.match(status, /S56_B_INTEGRATED_TO_MAIN=YES/);
assert.match(status, /MEDIA_M5_RAG_AUTHORIZED=NO/);

const retrieval = read("packages/ai-core/src/curated-retrieval.ts");
assert.match(retrieval, /CURATED_UI_QUERIES/);
assert.match(retrieval, /listCuratedUiQueries/);
assert.match(retrieval, /l1-q-abstain/);
assert.doesNotMatch(retrieval, /fetch\(|openai|anthropic|ollama|pinecone|chroma/i);

const index = read("packages/ai-core/src/index.ts");
assert.match(index, /listCuratedUiQueries/);
assert.match(index, /CURATED_UI_QUERIES/);

const panel = read(
  "apps/web/src/components/learning/CuratedRetrievalPanel.tsx",
);
assert.match(panel, /data-testid="curated-retrieval-panel"/);
assert.match(panel, /data-testid="curated-retrieval-honesty"/);
assert.match(panel, /retrieveCurated/);
assert.match(panel, /listCuratedUiQueries/);
assert.match(panel, /keine Live-KI/);
assert.doesNotMatch(panel, /<textarea|<input/i);

const workspace = read(
  "apps/web/src/components/learning/LessonWorkspace.tsx",
);
assert.match(workspace, /CuratedRetrievalPanel/);
assert.match(workspace, /MockTutorPanel/);

const operations = read("packages/contracts/src/operations.ts");
assert.match(operations, /ai_rag_runtime:\s*false/);

const datenschutz = read("apps/web/src/app/datenschutz/page.tsx");
assert.match(datenschutz, /Quellen-Suche|kuratiert/);

const stack = read("docs/architecture/MEDIA_OPEN_SOURCE_STACK.md");
assert.match(stack, /S56_C_SCOPE_LOCK=YES/);
assert.match(stack, /S56_C_CURATED_RETRIEVAL_UI_AUTHORIZED=YES/);

console.log("S56_C_STATIC_OK=YES");
