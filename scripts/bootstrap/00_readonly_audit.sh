#!/usr/bin/env bash
set -euo pipefail
set +H

OUT="$HOME/ki_lernportal_nim_readonly_audit_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$OUT"

{
  echo "===== KI-LERNPORTAL-NIM READONLY AUDIT ====="
  date
  echo

  echo "===== SYSTEM ====="
  uname -a || true
  lsb_release -a || true
  cat /etc/os-release || true
  echo

  echo "===== TOOL VERSIONS ====="
  for cmd in git gh node npm pnpm python3 pip3 uv docker docker-compose jq rg tree; do
    echo "--- $cmd ---"
    command -v "$cmd" || true
    "$cmd" --version 2>/dev/null || true
    echo
  done

  echo "===== CURRENT DIR ====="
  pwd
  find . -maxdepth 3 -type f | sort | head -n 300
  echo

  echo "===== GIT STATUS ====="
  git status --short 2>/dev/null || true
  git remote -v 2>/dev/null || true
  git branch --show-current 2>/dev/null || true
  echo

  echo "===== DONE ====="
} | tee "$OUT/audit.txt"

echo "Audit gespeichert: $OUT/audit.txt"
