#!/usr/bin/env bash
# S51B-C – apply the committed pilot migration to a disposable local MySQL only.
#
# Requires:
#   DATABASE_URL=mysql://…@127.0.0.1:PORT/ki_nim_s51bc_*
#   (or @localhost)
#
# Applies only packages/db/drizzle/0000_s51bc_pilot_core.sql.
# Forbidden: Railway, production hosts, drizzle-kit push, auto-migrate on import.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

MIGRATION_SQL="${ROOT}/packages/db/drizzle/0000_s51bc_pilot_core.sql"

if [[ ! -f "$MIGRATION_SQL" ]]; then
  echo "S51B_C_LOCAL_MIGRATE=FAIL"
  echo "ERROR=missing committed migration $MIGRATION_SQL"
  exit 1
fi

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "S51B_C_LOCAL_MIGRATE=FAIL"
  echo "ERROR=DATABASE_URL is required (localhost + ki_nim_s51bc_ only)"
  echo "HINT=start disposable MySQL via pnpm test:s51b-c2-local-mysql or a local throwaway instance"
  exit 1
fi

case "$DATABASE_URL" in
  *railway*|*RAILWAY*|*prod*|*production*|*rlwy*|*amazonaws*|*cloud*)
    echo "S51B_C_LOCAL_MIGRATE=FAIL"
    echo "ERROR=refusing non-local or production-like DATABASE_URL"
    exit 1
    ;;
esac

if [[ "$DATABASE_URL" != mysql://* ]]; then
  echo "S51B_C_LOCAL_MIGRATE=FAIL"
  echo "ERROR=DATABASE_URL must use mysql://"
  exit 1
fi

if [[ "$DATABASE_URL" != *"@127.0.0.1:"* && "$DATABASE_URL" != *"@localhost:"* ]]; then
  echo "S51B_C_LOCAL_MIGRATE=FAIL"
  echo "ERROR=DATABASE_URL must target 127.0.0.1 or localhost only"
  exit 1
fi

# Extract database name (path after host, before ?).
DB_NAME="$(printf '%s' "$DATABASE_URL" | sed -E 's#^mysql://[^/]+/([^?]+).*#\1#')"
if [[ "$DB_NAME" != ki_nim_s51bc_* ]]; then
  echo "S51B_C_LOCAL_MIGRATE=FAIL"
  echo "ERROR=database name must use ki_nim_s51bc_ prefix (got '${DB_NAME}')"
  exit 1
fi

export S51B_C_LOCAL_MIGRATE=1
export S51B_C_EXPECTED_DATABASE="$DB_NAME"

node --experimental-strip-types \
  "${ROOT}/packages/db/src/local-migrate.ts"

echo "S51B_C_LOCAL_MIGRATE=PASS"
echo "DATABASE_PREFIX=ki_nim_s51bc_"
echo "MIGRATION_FILE=packages/db/drizzle/0000_s51bc_pilot_core.sql"
echo "RAILWAY_CONNECTION=NO"
echo "PRODUCTION_CONNECTION=NO"
echo "DRIZZLE_KIT_PUSH=NO"
