#!/usr/bin/env bash
# S51B-C2 – disposable local MySQL proof for the committed pilot migration.
#
# Starts a throwaway MySQL container, creates a ki_nim_s51bc_* database,
# applies only packages/db/drizzle/0000_s51bc_pilot_core.sql, runs constraint
# integration tests, then removes container and database artifacts.
#
# Forbidden: Railway, production hosts, drizzle-kit push, lingering containers.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! command -v docker >/dev/null 2>&1; then
  echo "S51B_C2_LOCAL_MYSQL=FAIL"
  echo "ERROR=docker is required for disposable MySQL tests"
  exit 1
fi

DOCKER=(docker)
if ! docker info >/dev/null 2>&1; then
  if command -v sudo >/dev/null 2>&1 && sudo docker info >/dev/null 2>&1; then
    DOCKER=(sudo docker)
  else
    echo "S51B_C2_LOCAL_MYSQL=FAIL"
    echo "ERROR=docker daemon is not available"
    exit 1
  fi
fi

SUFFIX="$(date +%s)-$$"
CONTAINER="ki-nim-s51bc-${SUFFIX}"
DATABASE="ki_nim_s51bc_${SUFFIX}"
# Local disposable credentials only — never a real secret, never remote.
ROOT_PASSWORD="s51bcLocalOnly"
HOST_PORT="$((34000 + (RANDOM % 2000)))"
IMAGE="${S51B_C2_MYSQL_IMAGE:-mysql:8.4}"
MIGRATION_SQL="${ROOT}/packages/db/drizzle/0000_s51bc_pilot_core.sql"
STATUS="FAIL"

cleanup() {
  local exit_code=$?
  if "${DOCKER[@]}" inspect "$CONTAINER" >/dev/null 2>&1; then
    "${DOCKER[@]}" rm -f "$CONTAINER" >/dev/null 2>&1 || true
  fi
  if [[ "$STATUS" == "PASS" && $exit_code -eq 0 ]]; then
    echo "S51B_C2_LOCAL_MYSQL=PASS"
    echo "CONTAINER_REMOVED=YES"
    echo "DATABASE_PREFIX=ki_nim_s51bc_"
    echo "RAILWAY_CONNECTION=NO"
    echo "PRODUCTION_CONNECTION=NO"
  else
    echo "S51B_C2_LOCAL_MYSQL=FAIL"
    echo "CONTAINER_REMOVED=YES"
  fi
  # Preserve the original failure code from the script body.
  exit "$exit_code"
}
trap cleanup EXIT

if [[ ! -f "$MIGRATION_SQL" ]]; then
  echo "ERROR=missing committed migration $MIGRATION_SQL"
  exit 1
fi

echo "S51B_C2_START_CONTAINER=$CONTAINER"
echo "S51B_C2_DATABASE=$DATABASE"
echo "S51B_C2_HOST_PORT=$HOST_PORT"

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

# Apply only the committed SQL migration.
# Drizzle places `--> statement-breakpoint` on the same line as ALTER/INDEX
# statements — strip the marker in-place; never delete the whole line.
TMP_SQL="$(mktemp)"
sed 's/-->[[:space:]]*statement-breakpoint//g' "$MIGRATION_SQL" >"$TMP_SQL"
"${DOCKER[@]}" cp "$TMP_SQL" "$CONTAINER:/tmp/s51bc_migrate.sql"
rm -f "$TMP_SQL"
"${DOCKER[@]}" exec "$CONTAINER" sh -c \
  "mysql -h127.0.0.1 -uroot -p'${ROOT_PASSWORD}' --default-character-set=utf8mb4 '${DATABASE}' < /tmp/s51bc_migrate.sql"

"${DOCKER[@]}" exec "$CONTAINER" \
  mysql -h127.0.0.1 -uroot -p"$ROOT_PASSWORD" --database="$DATABASE" \
  -e "SET GLOBAL FOREIGN_KEY_CHECKS=1; SET SESSION FOREIGN_KEY_CHECKS=1;"

FK_COUNT="$("${DOCKER[@]}" exec "$CONTAINER" \
  mysql -h127.0.0.1 -uroot -p"$ROOT_PASSWORD" -N -e \
  "SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA='${DATABASE}' AND CONSTRAINT_TYPE='FOREIGN KEY';")"
FK_COUNT="$(printf '%s' "$FK_COUNT" | tr -d '[:space:]')"
echo "S51B_C2_FOREIGN_KEY_COUNT=${FK_COUNT}"
if [[ -z "$FK_COUNT" || "$FK_COUNT" -lt 8 ]]; then
  echo "ERROR=expected at least 8 foreign keys after migration, got '${FK_COUNT}'"
  "${DOCKER[@]}" exec "$CONTAINER" \
    mysql -h127.0.0.1 -uroot -p"$ROOT_PASSWORD" -e \
    "SELECT TABLE_NAME, CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA='${DATABASE}' AND CONSTRAINT_TYPE='FOREIGN KEY';" \
    || true
  "${DOCKER[@]}" exec "$CONTAINER" \
    mysql -h127.0.0.1 -uroot -p"$ROOT_PASSWORD" --database="$DATABASE" \
    -e "SHOW CREATE TABLE auth_credentials\G" \
    || true
  exit 1
fi

export DATABASE_URL="mysql://root:${ROOT_PASSWORD}@127.0.0.1:${HOST_PORT}/${DATABASE}"
export S51B_C2_DISPOSABLE="1"
export S51B_C2_EXPECTED_DATABASE="$DATABASE"

# Hard safety: refuse non-local or non-prefixed targets before tests run.
case "$DATABASE_URL" in
  *railway*|*RAILWAY*|*prod*|*production*)
    echo "ERROR=refusing non-local or production-like DATABASE_URL"
    exit 1
    ;;
esac

if [[ "$DATABASE" != ki_nim_s51bc_* ]]; then
  echo "ERROR=database name must use ki_nim_s51bc_ prefix"
  exit 1
fi

node --experimental-strip-types \
  "${ROOT}/packages/db/src/pilot-schema.integration.test.ts"

STATUS="PASS"
