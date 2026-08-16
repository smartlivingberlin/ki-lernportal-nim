#!/usr/bin/env bash
# Generate M4 pilot narration with local Piper (Open Source, no SaaS).
# Models are downloaded into scripts/media/models/ (gitignored).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
MODEL_DIR="$ROOT/scripts/media/models"
OUT_DIR="$ROOT/apps/web/public/media/audio"
VOICE="de_DE-thorsten-low"
TEXT="KI erkennt Muster. Sie denkt nicht wie ein Mensch. Prüfe Antworten trotzdem selbst."
PIPER_BIN="${PIPER_BIN:-}"

mkdir -p "$MODEL_DIR" "$OUT_DIR"

if [[ -z "$PIPER_BIN" ]]; then
  if command -v piper >/dev/null 2>&1; then
    PIPER_BIN="$(command -v piper)"
  elif [[ -x /tmp/piper/piper ]]; then
    PIPER_BIN=/tmp/piper/piper
  else
    echo "PIPER_MISSING: install Piper or set PIPER_BIN" >&2
    exit 1
  fi
fi

ONNX="$MODEL_DIR/${VOICE}.onnx"
CFG="$MODEL_DIR/${VOICE}.onnx.json"
if [[ ! -f "$ONNX" || ! -f "$CFG" ]]; then
  echo "Downloading Piper voice ${VOICE}…"
  curl -fsSL -o "$ONNX" \
    "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/de/de_DE/thorsten/low/${VOICE}.onnx"
  curl -fsSL -o "$CFG" \
    "https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/de/de_DE/thorsten/low/${VOICE}.onnx.json"
fi

WAV="$(mktemp /tmp/ki-patterns-pilot.XXXXXX.wav)"
printf '%s\n' "$TEXT" | "$PIPER_BIN" --model "$ONNX" --output_file "$WAV"
ffmpeg -y -i "$WAV" -c:a aac -b:a 64k "$OUT_DIR/ki-patterns-pilot.m4a"
rm -f "$WAV"
echo "MEDIA_PILOT_AUDIO_OK=$OUT_DIR/ki-patterns-pilot.m4a"
