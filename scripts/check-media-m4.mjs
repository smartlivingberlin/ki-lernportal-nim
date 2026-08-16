#!/usr/bin/env node
/**
 * M4 media contract: prerendered Piper audio pilot (no runtime TTS/mic).
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const scope = read("docs/architecture/MEDIA_OPEN_SOURCE_STACK.md");
assert.match(scope, /MEDIA_M4_PILOT_AUTHORIZED=YES/);
assert.match(scope, /MEDIA_M4_RUNTIME_TTS_FORBIDDEN=YES/);
assert.match(scope, /MEDIA_M5_AI_AUTHORIZED=NO/);
assert.match(scope, /synthetische Stimme gekennzeichnet/);

const player = read(
  "apps/web/src/components/learning/MediaAudioPlayer.tsx",
);
assert.match(player, /data-testid="media-audio"/);
assert.match(player, /data-testid="media-audio-transcript"/);
assert.match(player, /preload="metadata"/);
assert.doesNotMatch(player, /\bautoPlay\b|getUserMedia|SpeechSynthesis|webkitSpeech/i);
assert.doesNotMatch(player, /\bautoplay\s*=/i);

const manifest = read("apps/web/src/data/media-manifest.ts");
assert.match(manifest, /aud-ki-patterns-pilot/);
assert.match(manifest, /kind: "audio"/);
assert.match(manifest, /phase: "m4"/);
assert.match(manifest, /synthetic: true/);
assert.match(manifest, /PILOT_AUDIO_TRANSCRIPT/);

const lessons = read("apps/web/src/data/lessons.ts");
assert.match(lessons, /aud-ki-patterns-pilot/);

const workspace = read(
  "apps/web/src/components/learning/LessonWorkspace.tsx",
);
assert.match(workspace, /MediaAudioPlayer/);
assert.match(workspace, /PILOT_AUDIO_TRANSCRIPT/);

const audioPath = join(
  root,
  "apps/web/public/media/audio/ki-patterns-pilot.m4a",
);
assert.equal(existsSync(audioPath), true, "pilot m4a missing");
const bytes = statSync(audioPath).size;
assert.ok(bytes > 5_000 && bytes < 400_000, `audio size out of band: ${bytes}`);

const gen = read("scripts/media/generate-ki-patterns-audio.sh");
assert.match(gen, /piper/i);
assert.doesNotMatch(gen, /elevenlabs|openai|heygen|gtts|azure/i);

const gitignore = read(".gitignore");
assert.match(gitignore, /scripts\/media\/models\//);

console.log(`MEDIA_M4_STATIC_OK=YES audioBytes=${bytes}`);
