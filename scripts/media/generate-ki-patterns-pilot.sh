#!/usr/bin/env bash
# Regenerate the M2 pilot clip locally (Open Source: ffmpeg only, no SaaS).
# Usage: bash scripts/media/generate-ki-patterns-pilot.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT_DIR="$ROOT/apps/web/public/media"
VIDEO="$OUT_DIR/videos/ki-patterns-pilot.mp4"
POSTER="$OUT_DIR/posters/ki-patterns-pilot.jpg"
FONT_BOLD="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

mkdir -p "$OUT_DIR/videos" "$OUT_DIR/posters"

ffmpeg -y \
  -f lavfi -i "color=c=0xf1f5f9:s=640x360:d=10" \
  -f lavfi -i "anullsrc=r=44100:cl=mono" \
  -vf "drawtext=fontfile=${FONT_BOLD}:text='KI erkennt Muster':fontsize=36:fontcolor=0x0f766e:x=(w-text_w)/2:y=120,drawtext=fontfile=${FONT}:text='Sie denkt nicht wie ein Mensch':fontsize=22:fontcolor=0x475569:x=(w-text_w)/2:y=190,drawtext=fontfile=${FONT}:text='Kurzclip · Concept-Demo':fontsize=16:fontcolor=0x64748b:x=(w-text_w)/2:y=280" \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest -movflags +faststart \
  "$VIDEO"

ffmpeg -y -ss 0.5 -i "$VIDEO" -frames:v 1 -update 1 -q:v 3 "$POSTER"

echo "MEDIA_PILOT_VIDEO_OK=$VIDEO"
echo "MEDIA_PILOT_POSTER_OK=$POSTER"
