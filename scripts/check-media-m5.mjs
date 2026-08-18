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
assert.match(scope, /MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=YES/);
assert.match(scope, /MEDIA_M5_RAG_AUTHORIZED=NO/);
assert.match(scope, /MEDIA_M5_PRODUCTION_LLM=NO/);

const stack = read("docs/architecture/MEDIA_OPEN_SOURCE_STACK.md");
assert.match(stack, /MEDIA_M5_A_SCOPE_LOCK=YES/);
assert.match(stack, /MEDIA_M5_A_MOCK_AUTHORIZED=YES/);
assert.match(stack, /MEDIA_M5_A_INTEGRATED_TO_MAIN=YES/);
assert.match(stack, /MEDIA_M5_A2_MOCK_L2_AUTHORIZED=YES/);
assert.match(stack, /MEDIA_M5_A3_MOCK_L3_AUTHORIZED=YES/);
assert.match(stack, /MEDIA_M5_A4_MOCK_L4_AUTHORIZED=YES/);
assert.match(stack, /MEDIA_M5_A5_MOCK_L5_AUTHORIZED=YES/);
assert.match(stack, /MEDIA_M5_A6_MOCK_L6_AUTHORIZED=YES/);
assert.match(stack, /MEDIA_M5_OLLAMA_PROOF_AUTHORIZED=YES/);
assert.match(stack, /MEDIA_M5_AI_AUTHORIZED=NO/);

const mock = read("packages/ai-core/src/mock-tutor.ts");
assert.match(mock, /mock_curated/);
assert.match(mock, /answerMockTutor/);
assert.match(mock, /listMockTutorPrompts/);
assert.match(mock, /l1-what-is-ai/);
assert.match(mock, /l2-strengths/);
assert.match(mock, /l3-safe-question/);
assert.match(mock, /l4-what-is-prompt/);
assert.match(mock, /l5-formula/);
assert.match(mock, /l6-help/);
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
assert.match(workspace, /lesson\.id === "l2"/);
assert.match(workspace, /lesson\.id === "l3"/);
assert.match(workspace, /lesson\.id === "l4"/);
assert.match(workspace, /lesson\.id === "l5"/);
assert.match(workspace, /lesson\.id === "l6" \? \(\s*<MockTutorPanel/);

const m5a2 = read("docs/architecture/MEDIA_M5_A2_MOCK_TUTOR_L2.md");
assert.match(m5a2, /MEDIA_M5_A2_SCOPE_LOCK=YES/);
assert.match(m5a2, /MEDIA_M5_A2_MOCK_L2_AUTHORIZED=YES/);
assert.match(m5a2, /MEDIA_M5_A2_FREE_CHAT_FORBIDDEN=YES/);
assert.match(m5a2, /MEDIA_M5_A2_NETWORK_FORBIDDEN=YES/);
assert.match(m5a2, /MEDIA_M5_A2_LIVE_LLM=NO/);
assert.match(m5a2, /Merge:.*#249/);

const m5a3 = read("docs/architecture/MEDIA_M5_A3_MOCK_TUTOR_L3.md");
assert.match(m5a3, /MEDIA_M5_A3_SCOPE_LOCK=YES/);
assert.match(m5a3, /MEDIA_M5_A3_MOCK_L3_AUTHORIZED=YES/);
assert.match(m5a3, /MEDIA_M5_A3_FREE_CHAT_FORBIDDEN=YES/);
assert.match(m5a3, /MEDIA_M5_A3_NETWORK_FORBIDDEN=YES/);
assert.match(m5a3, /MEDIA_M5_A3_LIVE_LLM=NO/);

const m5a4 = read("docs/architecture/MEDIA_M5_A4_MOCK_TUTOR_L4.md");
assert.match(m5a4, /MEDIA_M5_A4_SCOPE_LOCK=YES/);
assert.match(m5a4, /MEDIA_M5_A4_MOCK_L4_AUTHORIZED=YES/);
assert.match(m5a4, /MEDIA_M5_A4_FREE_CHAT_FORBIDDEN=YES/);
assert.match(m5a4, /MEDIA_M5_A4_NETWORK_FORBIDDEN=YES/);
assert.match(m5a4, /MEDIA_M5_A4_LIVE_LLM=NO/);

const m5a5 = read("docs/architecture/MEDIA_M5_A5_MOCK_TUTOR_L5.md");
assert.match(m5a5, /MEDIA_M5_A5_SCOPE_LOCK=YES/);
assert.match(m5a5, /MEDIA_M5_A5_MOCK_L5_AUTHORIZED=YES/);
assert.match(m5a5, /MEDIA_M5_A5_FREE_CHAT_FORBIDDEN=YES/);
assert.match(m5a5, /MEDIA_M5_A5_NETWORK_FORBIDDEN=YES/);
assert.match(m5a5, /MEDIA_M5_A5_LIVE_LLM=NO/);

const m5a6 = read("docs/architecture/MEDIA_M5_A6_MOCK_TUTOR_L6.md");
assert.match(m5a6, /MEDIA_M5_A6_SCOPE_LOCK=YES/);
assert.match(m5a6, /MEDIA_M5_A6_MOCK_L6_AUTHORIZED=YES/);
assert.match(m5a6, /MEDIA_M5_A6_FREE_CHAT_FORBIDDEN=YES/);
assert.match(m5a6, /MEDIA_M5_A6_NETWORK_FORBIDDEN=YES/);
assert.match(m5a6, /MEDIA_M5_A6_LIVE_LLM=NO/);

const status = read("docs/00_PROJECT_STATUS.md");
assert.match(status, /MEDIA_M5_A2_SCOPE_LOCK=YES/);
assert.match(status, /MEDIA_M5_A2_MOCK_L2_AUTHORIZED=YES/);
assert.match(status, /MEDIA_M5_A2_FREE_CHAT_FORBIDDEN=YES/);
assert.match(status, /MEDIA_M5_A3_SCOPE_LOCK=YES/);
assert.match(status, /MEDIA_M5_A3_MOCK_L3_AUTHORIZED=YES/);
assert.match(status, /MEDIA_M5_A3_FREE_CHAT_FORBIDDEN=YES/);
assert.match(status, /MEDIA_M5_A4_SCOPE_LOCK=YES/);
assert.match(status, /MEDIA_M5_A4_MOCK_L4_AUTHORIZED=YES/);
assert.match(status, /MEDIA_M5_A4_FREE_CHAT_FORBIDDEN=YES/);
assert.match(status, /MEDIA_M5_A5_SCOPE_LOCK=YES/);
assert.match(status, /MEDIA_M5_A5_MOCK_L5_AUTHORIZED=YES/);
assert.match(status, /MEDIA_M5_A5_FREE_CHAT_FORBIDDEN=YES/);
assert.match(status, /MEDIA_M5_A6_SCOPE_LOCK=YES/);
assert.match(status, /MEDIA_M5_A6_MOCK_L6_AUTHORIZED=YES/);
assert.match(status, /MEDIA_M5_A6_FREE_CHAT_FORBIDDEN=YES/);

const vendorSync = read("scripts/sync-web-railway-vendor.mjs");
assert.match(vendorSync, /"ai-core"/);

const datenschutz = read("apps/web/src/app/datenschutz/page.tsx");
assert.match(datenschutz, /Mock-Tutor|kuratierte/);

console.log("MEDIA_M5_A_STATIC_OK=YES");
