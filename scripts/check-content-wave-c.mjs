#!/usr/bin/env node
/**
 * Roadmap C: world overview UX + thin content wave guardrails.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const track = read("apps/web/src/components/learning/ThemeWorldTrack.tsx");
assert.match(track, /START_VISIBLE = 4/);
assert.match(track, /Start hier/);
assert.match(track, /Weitere Einheiten/);
assert.match(track, /learningOutcomes/);
assert.match(track, /spaeter-world-banner/);
assert.match(track, /worldLayer/);
assert.match(track, /Später · reine Vertiefung/);

const goals = read("apps/web/src/components/learning/GoalNavigation.tsx");
assert.match(goals, /Später/);
assert.match(goals, /data-world-layer/);
assert.match(goals, /sortThemeWorldsKernwegFirst/);
assert.match(goals, /spaeter-worlds-block/);
assert.match(goals, /Später · reine Vertiefung/);
assert.match(goals, /Später · bereit/);
assert.match(goals, /Später · demnächst/);

assert.match(
  read("apps/web/src/data/theme-worlds.ts"),
  /sortThemeWorldsKernwegFirst/,
);
const chat = read("apps/web/src/data/micro-units-chat-prompting.ts");
assert.match(chat, /mu-chat-09/);
assert.match(chat, /mu-chat-12/);

const work = read("apps/web/src/data/micro-units-work-life.ts");
assert.match(work, /mu-work-09/);
assert.match(work, /mu-work-12/);

const worlds = read("apps/web/src/data/theme-worlds.ts");
assert.match(worlds, /id: "world-chat-prompting"[\s\S]*estimatedUnits: 12/);
assert.match(worlds, /id: "world-work-life"[\s\S]*estimatedUnits: 12/);

assert.match(read("apps/web/src/data/review-cards.ts"), /rev-prompt-02/);
assert.match(read("apps/web/src/data/review-cards.ts"), /rev-nofear-02/);
assert.match(read("apps/web/src/data/interactive-challenges.ts"), /challenge-nofear-stop/);
assert.match(read("apps/web/src/data/interactive-challenges.ts"), /challenge-nofear-first-step/);

const forbidden = /TODO_CONTENT|PLACEHOLDER|lorem ipsum/i;
assert.doesNotMatch(chat, forbidden);
assert.doesNotMatch(work, forbidden);

console.log("CONTENT_WAVE_C_STATIC_OK=YES");
