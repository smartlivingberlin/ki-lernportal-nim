#!/usr/bin/env node
/**
 * M3 media contract: scripted guide mascot (no chat, no live AI).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const scope = read("docs/architecture/MEDIA_OPEN_SOURCE_STACK.md");
assert.match(scope, /MEDIA_M3_PILOT_AUTHORIZED=YES/);
assert.match(scope, /MEDIA_M3_CHAT_FORBIDDEN=YES/);
assert.match(scope, /MEDIA_M5_AI_AUTHORIZED=NO/);

const mascot = read("apps/web/src/components/learning/GuideMascot.tsx");
assert.match(mascot, /data-testid="guide-mascot"/);
assert.match(mascot, /data-mascot-pose/);
assert.match(mascot, /poseForCoachStep/);
assert.doesNotMatch(mascot, /openai|ollama|websocket|webrtc|musetalk|heygen/i);

const coach = read("apps/web/src/components/learning/FirstStartCoach.tsx");
assert.match(coach, /GuideMascot/);
assert.match(coach, /data-testid="guide-mascot-honesty"/);
assert.match(coach, /keine Live-KI und kein Chat/);
assert.doesNotMatch(coach, /\bLLM\b|Live-Avatar|openai|ollama/i);

const manifest = read("apps/web/src/data/media-manifest.ts");
assert.match(manifest, /mascot-guide-svg/);
assert.match(manifest, /kind: "mascot_state"/);
assert.match(manifest, /phase: "m3"/);

console.log("MEDIA_M3_STATIC_OK=YES");
