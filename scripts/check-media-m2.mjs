#!/usr/bin/env node
/**
 * M2 media contract: pilot video + captions + accessible player.
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
assert.match(scope, /MEDIA_M2_PILOT_AUTHORIZED=YES/);
assert.match(scope, /MEDIA_M2_LIBRARY_EXPANSION=NO/);
assert.match(scope, /MEDIA_M3_AUTHORIZED=NO/);
assert.match(scope, /Captions Pflicht/);

const types = read("apps/web/src/data/types.ts");
assert.match(types, /posterSrc\?:/);

const manifest = read("apps/web/src/data/media-manifest.ts");
assert.match(manifest, /vid-ki-patterns-pilot/);
assert.match(manifest, /kind: "video"/);
assert.match(manifest, /captionsVtt: "\/media\/videos\/ki-patterns-pilot\.vtt"/);
assert.match(manifest, /splitMediaByKind/);

const lessons = read("apps/web/src/data/lessons.ts");
assert.match(lessons, /vid-ki-patterns-pilot/);

const player = read(
  "apps/web/src/components/learning/MediaVideoPlayer.tsx",
);
assert.match(player, /data-testid="media-video"/);
assert.match(player, /prefers-reduced-motion/);
assert.match(player, /kind="captions"/);
assert.match(player, /playsInline/);
assert.doesNotMatch(player, /autoPlay/);

const workspace = read(
  "apps/web/src/components/learning/LessonWorkspace.tsx",
);
assert.match(workspace, /MediaVideoPlayer/);
assert.match(workspace, /splitMediaByKind/);

const videoPath = join(
  root,
  "apps/web/public/media/videos/ki-patterns-pilot.mp4",
);
const posterPath = join(
  root,
  "apps/web/public/media/posters/ki-patterns-pilot.jpg",
);
const vttPath = join(
  root,
  "apps/web/public/media/videos/ki-patterns-pilot.vtt",
);

assert.equal(existsSync(videoPath), true, "pilot mp4 missing");
assert.equal(existsSync(posterPath), true, "pilot poster missing");
assert.equal(existsSync(vttPath), true, "pilot vtt missing");

const videoBytes = statSync(videoPath).size;
assert.ok(
  videoBytes > 5_000 && videoBytes < 500_000,
  `pilot video size out of band: ${videoBytes}`,
);

const vtt = read("apps/web/public/media/videos/ki-patterns-pilot.vtt");
assert.match(vtt, /^WEBVTT/m);
assert.match(vtt, /Muster/);

const gen = read("scripts/media/generate-ki-patterns-pilot.sh");
assert.match(gen, /ffmpeg/);
assert.doesNotMatch(gen, /heygen|elevenlabs|openai|synthesia/i);

console.log(`MEDIA_M2_STATIC_OK=YES videoBytes=${videoBytes}`);
