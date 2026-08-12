#!/usr/bin/env bash
# Optional live probe for S52-D2b (manual / operator). Not a CI gate.
# No secrets, no credential seeding — only anonymous HTTP checks.
set -euo pipefail

STAGING="${STAGING_BASE_URL:-https://ki-lernportal-nim-staging.up.railway.app}"
PROD="${PROD_BASE_URL:-https://web-production-51d3c8.up.railway.app}"

echo "Probe staging anmelden…"
staging_html="$(curl -fsS "$STAGING/anmelden")"
echo "$staging_html" | grep -q 'type="email"'
echo "STAGING_ANMELDEN_FORM=YES"

echo "Probe staging login (unknown user)…"
staging_code="$(curl -sS -o /tmp/s52-d2b-staging.json -w '%{http_code}' \
  -X POST "$STAGING/api/auth/login" \
  -H 'content-type: application/json' \
  -d '{"email":"probe@example.com","password":"not-a-real-user"}')"
test "$staging_code" = "401"
grep -q 'AUTH_REQUIRED\|Invalid credentials' /tmp/s52-d2b-staging.json
echo "STAGING_LOGIN_401=YES"

echo "Probe production anmelden (disabled)…"
prod_html="$(curl -fsS "$PROD/anmelden")"
echo "$prod_html" | grep -q 'Anmeldung ist derzeit nicht aktiv'
echo "PRODUCTION_ANMELDEN_DISABLED=YES"

echo "Probe production login (feature off)…"
prod_code="$(curl -sS -o /tmp/s52-d2b-prod.json -w '%{http_code}' \
  -X POST "$PROD/api/auth/login" \
  -H 'content-type: application/json' \
  -d '{"email":"probe@example.com","password":"not-a-real-user"}')"
test "$prod_code" = "403"
grep -q 'FEATURE_DISABLED' /tmp/s52-d2b-prod.json
echo "PRODUCTION_LOGIN_403=YES"

echo "S52_D2B_STAGING_AUTH_LIVE_PROBE_OK=YES"
