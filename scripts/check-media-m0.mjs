#!/usr/bin/env node
/**
 * M0/M1 media contract: scope lock, manifest integrity, lesson mediaIds resolve.
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
assert.match(scope, /MEDIA_M0_SCOPE_LOCK=YES/);
assert.match(scope, /MEDIA_OPEN_SOURCE_ONLY=YES/);
assert.match(scope, /MEDIA_PAID_SAAS_FORBIDDEN=YES/);
assert.match(scope, /MEDIA_LIVE_LLM_FORBIDDEN_UNTIL_S56_FREIGABE=YES/);
assert.match(scope, /MEDIA_LIVE_PHOTOREAL_AVATAR_RUNTIME_FORBIDDEN=YES/);
assert.match(scope, /MEDIA_BIOMETRIC_TRACKING_FORBIDDEN=YES/);
assert.match(scope, /EU AI Act/);
assert.match(scope, /DSGVO/);
assert.match(scope, /Keine Rechtsberatung/);
assert.match(scope, /MEDIA_M1_PILOT_AUTHORIZED_BY_M0=YES/);
assert.match(scope, /MEDIA_M2_PILOT_AUTHORIZED=YES/);
assert.match(scope, /MEDIA_M3_PILOT_AUTHORIZED=YES/);
assert.match(scope, /MEDIA_M3_CHAT_FORBIDDEN=YES/);
assert.match(scope, /MEDIA_M4_PILOT_AUTHORIZED=YES/);

const schema = read("docs/architecture/CONTENT_SCHEMA_V2.md");
assert.match(schema, /MEDIA_OPEN_SOURCE_STACK\.md/);
assert.match(schema, /mediaIds/);
assert.match(schema, /test:media-m0/);

const types = read("apps/web/src/data/types.ts");
assert.match(types, /mediaIds\?:/);
assert.match(types, /export interface MediaAsset/);
assert.match(types, /synthetic:/);

const manifest = read("apps/web/src/data/media-manifest.ts");
assert.match(manifest, /ill-ki-patterns/);
assert.match(manifest, /ill-ki-check/);
assert.match(manifest, /AllRights-Project/);
assert.match(manifest, /export function mediaForIds/);

const lessons = read("apps/web/src/data/lessons.ts");
assert.match(lessons, /ill-ki-patterns/);
assert.match(lessons, /ill-ki-check/);
assert.match(lessons, /mediaIds:/);

const figure = read("apps/web/src/components/learning/MediaFigure.tsx");
assert.match(figure, /data-testid="media-figure"/);
assert.match(figure, /data-testid="media-license"/);
assert.match(figure, /aria-label=\{asset\.alt\}/);

const workspace = read(
  "apps/web/src/components/learning/LessonWorkspace.tsx",
);
assert.match(workspace, /mediaForIds/);
assert.match(workspace, /data-testid="lesson-media"/);
assert.match(workspace, /MediaFigure/);

const illustrations = read(
  "apps/web/src/components/learning/media-illustrations.tsx",
);
assert.match(illustrations, /KiPatternsIllustration/);
assert.match(illustrations, /KiCheckIllustration/);

console.log("MEDIA_M0_STATIC_OK=YES");
