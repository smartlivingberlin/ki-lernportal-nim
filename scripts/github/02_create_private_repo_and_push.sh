#!/usr/bin/env bash
set -euo pipefail
set +H

OWNER="smartlivingberlin"
REPO="ki-lernportal-nim"
FULL="$OWNER/$REPO"

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI fehlt. Bitte GitHub CLI installieren."
  exit 1
fi

gh auth status

if gh repo view "$FULL" >/dev/null 2>&1; then
  echo "Repo existiert bereits: $FULL"
else
  gh repo create "$FULL" --private --source=. --remote=origin --push
  exit 0
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin "https://github.com/$FULL.git"
fi

git push -u origin main || git push -u origin master
