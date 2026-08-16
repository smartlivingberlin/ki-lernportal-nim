#!/usr/bin/env node
/**
 * M5-B contract: local Ollama proof only (no product UI, no Railway LLM).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const scope = read("docs/architecture/MEDIA_M5_B_IMPLEMENTATION_SCOPE.md");
assert.match(scope, /MEDIA_M5_B_SCOPE_LOCK=YES/);
assert.match(scope, /MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=YES/);
assert.match(scope, /MEDIA_M5_B_DEV_ONLY=YES/);
assert.match(scope, /MEDIA_M5_B_LOCALHOST_ONLY=YES/);
assert.match(scope, /MEDIA_M5_B_PRODUCT_UI=NO/);
assert.match(scope, /MEDIA_M5_B_RAILWAY=NO/);
assert.match(scope, /MEDIA_M5_RAG_AUTHORIZED=NO/);
assert.match(scope, /MEDIA_M5_PRODUCTION_LLM=NO/);

const stack = read("docs/architecture/MEDIA_OPEN_SOURCE_STACK.md");
assert.match(stack, /MEDIA_M5_B_SCOPE_LOCK=YES/);
assert.match(stack, /MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=YES/);
assert.match(stack, /MEDIA_M5_B_PRODUCT_UI=NO/);
assert.match(stack, /MEDIA_M5_PRODUCTION_LLM=NO/);
assert.match(stack, /MEDIA_M5_RAG_AUTHORIZED=NO/);

const ollama = read("packages/ai-core/src/ollama-local.ts");
assert.match(ollama, /proveOllamaLocal/);
assert.match(ollama, /assertLocalOllamaBaseUrl/);
assert.match(ollama, /AI_CORE_OLLAMA_PROOF/);
assert.match(ollama, /LOCALHOST_ONLY/);
assert.doesNotMatch(ollama, /openai|anthropic|nvidia|heygen/i);

const index = read("packages/ai-core/src/index.ts");
assert.match(index, /proveOllamaLocal/);

const workspace = read(
  "apps/web/src/components/learning/LessonWorkspace.tsx",
);
assert.match(workspace, /MockTutorPanel/);
assert.doesNotMatch(workspace, /proveOllamaLocal|Ollama/);

const panel = read("apps/web/src/components/learning/MockTutorPanel.tsx");
assert.doesNotMatch(panel, /ollama|proveOllamaLocal/i);

const proof = read("scripts/ai/prove-ollama-local.sh");
assert.match(proof, /OLLAMA_PROOF_SKIPPED/);
assert.match(proof, /11434/);

console.log("MEDIA_M5_B_STATIC_OK=YES");
