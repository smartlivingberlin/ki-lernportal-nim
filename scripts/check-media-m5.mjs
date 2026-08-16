#!/usr/bin/env node
/**
 * M5-A media/AI contract: mock tutor scope, no network/SDK, pilot wiring.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const scope = read("docs/architecture/MEDIA_M5_A_IMPLEMENTATION_SCOPE.md");
assert.match(scope, /MEDIA_M5_A_SCOPE_LOCK=YES/);
assert.match(scope, /MEDIA_M5_A_MOCK_AUTHORIZED=YES/);
assert.match(scope, /MEDIA_M5_A_FREE_CHAT_FORBIDDEN=YES/);
assert.match(scope, /MEDIA_M5_A_NETWORK_FORBIDDEN=YES/);
assert.match(scope, /MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=NO/);
assert.match(scope, /MEDIA_M5_RAG_AUTHORIZED=NO/);
assert.match(scope, /MEDIA_M5_PRODUCTION_LLM=NO/);

const stack = read("docs/architecture/MEDIA_OPEN_SOURCE_STACK.md");
assert.match(stack, /MEDIA_M5_A_SCOPE_LOCK=YES/);
assert.match(stack, /MEDIA_M5_A_MOCK_AUTHORIZED=YES/);
assert.match(stack, /MEDIA_M5_A_INTEGRATED_TO_MAIN=YES/);
assert.match(stack, /MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=NO/);
assert.match(stack, /MEDIA_M5_AI_AUTHORIZED=NO/);

const mock = read("packages/ai-core/src/mock-tutor.ts");
assert.match(mock, /mock_curated/);
assert.match(mock, /answerMockTutor/);
assert.match(mock, /listMockTutorPrompts/);
assert.match(mock, /l1-what-is-ai/);
assert.doesNotMatch(mock, /fetch\(|openai|anthropic|ollama|huggingface/i);

const index = read("packages/ai-core/src/index.ts");
assert.match(index, /answerMockTutor/);
assert.doesNotMatch(index, /export \{\}/);

const panel = read("apps/web/src/components/learning/MockTutorPanel.tsx");
assert.match(panel, /data-testid="mock-tutor-panel"/);
assert.match(panel, /data-testid="mock-tutor-honesty"/);
assert.match(panel, /keine Live-KI/);
assert.doesNotMatch(panel, /<textarea|<input/i);

const workspace = read(
  "apps/web/src/components/learning/LessonWorkspace.tsx",
);
assert.match(workspace, /MockTutorPanel/);
assert.match(workspace, /lesson\.id === "l1"/);

const vendorSync = read("scripts/sync-web-railway-vendor.mjs");
assert.match(vendorSync, /"ai-core"/);

const datenschutz = read("apps/web/src/app/datenschutz/page.tsx");
assert.match(datenschutz, /Mock-Tutor|kuratierte/);

console.log("MEDIA_M5_A_STATIC_OK=YES");
