# Media generation scripts (local, Open Source)

Regenerate the M2 pilot clip:

```bash
bash scripts/media/generate-ki-patterns-pilot.sh
```

Requires `ffmpeg` and DejaVu fonts. No paid APIs. Captions live beside the
MP4 as `.vtt` and must stay in sync with the spoken/on-screen message.

Regenerate the M4 pilot narration (Piper, local):

```bash
# once: unpack Piper binary, or `export PIPER_BIN=/path/to/piper`
bash scripts/media/generate-ki-patterns-audio.sh
```

Voice weights download into `scripts/media/models/` (gitignored). Only the
resulting `apps/web/public/media/audio/*.m4a` is committed.
