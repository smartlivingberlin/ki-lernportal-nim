#!/usr/bin/env bash
# S51B-B – disposable local MySQL connection proof via createMySqlRuntime().initialize().
#
# Starts a throwaway MySQL container, creates a ki_nim_s51bb_* database,
# runs packages/db/src/connection-proof.ts (initialize + SELECT 1), then removes
# the container. No schema, no migrate, no Railway, no production hosts.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! command -v docker >/dev/null 2>&1; then
  echo "S51B_B_CONNECTION_PROOF=FAIL"
  echo "ERROR=docker is required for disposable MySQL connection proof"
  exit 1
fi

DOCKER=(docker)
if ! docker info >/dev/null 2>&1; then
  if command -v sudo >/dev/null 2>&1 && sudo docker info >/dev/null 2>&1; then
    DOCKER=(sudo docker)
  else
    echo "S51B_B_CONNECTION_PROOF=FAIL"
    echo "ERROR=docker daemon is not available"
    exit 1
  fi
fi

SUFFIX="$(date +%s)-$$"
CONTAINER="ki-nim-s51bb-${SUFFIX}"
DATABASE="ki_nim_s51bb_${SUFFIX}"
# Local disposable credentials only — never a real secret, never remote.
ROOT_PASSWORD="s51bbLocalOnly"
HOST_PORT="$((32000 + (RANDOM % 2000)))"
IMAGE="${S51B_B_MYSQL_IMAGE:-mysql:8.4}"
STATUS="FAIL"

cleanup() {
  local exit_code=$?
  if "${DOCKER[@]}" inspect "$CONTAINER" >/dev/null 2>&1; then
    "${DOCKER[@]}" rm -f "$CONTAINER" >/dev/null 2>&1 || true
  fi
  if [[ "$STATUS" == "PASS" && $exit_code -eq 0 ]]; then
    echo "S51B_B_CONNECTION_PROOF=PASS"
    echo "CONTAINER_REMOVED=YES"
    echo "DATABASE_PREFIX=ki_nim_s51bb_"
    echo "RAILWAY_CONNECTION=NO"
    echo "PRODUCTION_CONNECTION=NO"
    echo "SCHEMA_APPLIED=NO"
    echo "MIGRATION_APPLIED=NO"
  else
    echo "S51B_B_CONNECTION_PROOF=FAIL"
    echo "CONTAINER_REMOVED=YES"
  fi
  exit "$exit_code"
}
trap cleanup EXIT

echo "S51B_B_START_CONTAINER=$CONTAINER"
echo "S51B_B_DATABASE=$DATABASE"
echo "S51B_B_HOST_PORT=$HOST_PORT"

"${DOCKER[@]}" run \
  --name "$CONTAINER" \
  --detach \
  --publish "127.0.0.1:${HOST_PORT}:3306" \
  --env "MYSQL_ROOT_PASSWORD=${ROOT_PASSWORD}" \
  --env "MYSQL_DATABASE=${DATABASE}" \
  "$IMAGE" \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_unicode_ci \
  >/dev/null

ready=0
for _ in $(seq 1 90); do
  if "${DOCKER[@]}" exec "$CONTAINER" \
    mysqladmin ping -h127.0.0.1 -uroot -p"$ROOT_PASSWORD" --silent \
    >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 2
done

if [[ "$ready" -ne 1 ]]; then
  echo "ERROR=MySQL container did not become ready"
  "${DOCKER[@]}" logs "$CONTAINER" 2>&1 | tail -40 || true
  exit 1
fi

export DATABASE_URL="mysql://root:${ROOT_PASSWORD}@127.0.0.1:${HOST_PORT}/${DATABASE}"
export S51B_B_CONNECTION_PROOF="1"
export S51B_B_EXPECTED_DATABASE="$DATABASE"
export DB_CONNECT_TIMEOUT_MS="${DB_CONNECT_TIMEOUT_MS:-5000}"
export DB_POOL_LIMIT="${DB_POOL_LIMIT:-3}"
export DB_QUEUE_LIMIT="${DB_QUEUE_LIMIT:-10}"

case "$DATABASE_URL" in
  *railway*|*RAILWAY*|*prod*|*production*)
    echo "ERROR=refusing non-local or production-like DATABASE_URL"
    exit 1
    ;;
esac

if [[ "$DATABASE" != ki_nim_s51bb_* ]]; then
  echo "ERROR=database name must use ki_nim_s51bb_ prefix"
  exit 1
fi

node --experimental-strip-types \
  "${ROOT}/scripts/run-s51b-b-connection-proof.ts"

STATUS="PASS"
