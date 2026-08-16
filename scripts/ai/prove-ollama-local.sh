#!/usr/bin/env bash
# Optional M5-B proof against a local Ollama daemon.
# Skips cleanly when Ollama is not running (CI-safe).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
export AI_CORE_OLLAMA_PROOF="${AI_CORE_OLLAMA_PROOF:-1}"
export AI_CORE_OLLAMA_BASE_URL="${AI_CORE_OLLAMA_BASE_URL:-http://127.0.0.1:11434}"
export AI_CORE_OLLAMA_MODEL="${AI_CORE_OLLAMA_MODEL:-llama3.2}"

if ! curl -fsS --max-time 2 "${AI_CORE_OLLAMA_BASE_URL}/api/tags" >/dev/null 2>&1; then
  echo "OLLAMA_PROOF_SKIPPED=YES reason=daemon_unreachable"
  exit 0
fi

node --experimental-strip-types "$ROOT/scripts/ai/run-ollama-proof.mjs"
