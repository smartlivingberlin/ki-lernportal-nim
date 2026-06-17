#!/usr/bin/env bash
set -euo pipefail
set +H

if [ -d .git ]; then
  echo "Git ist bereits initialisiert."
else
  git init
fi

git add .
git commit -m "chore: initialize KI Lernportal NIM jules-ready baseline" || true

git status
