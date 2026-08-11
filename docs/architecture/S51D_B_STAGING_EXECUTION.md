# S51D-B – Railway-Staging Execution Package

**Status:** Production-Dashboard-Reverify und Staging-Environment am
2026-08-11 menschlich ausgeführt. Staging ist öffentlich erreichbar und
HTTP-grün.
**Parent:** `docs/architecture/S51D_A_STAGING_SCOPE.md`,
`docs/S50D1_RAILWAY_STAGING_READINESS.md`  
**Baseline:** `2a567c79c76e` (Staging-Deploy) / Docs nach Sync  
**Arbeitsbranch:** `cursor/s51d-b-staging-created-docs-b554`

## 1. Zweck

S51D-B soll:

1. Production read-only reverifizieren (Autodeploy, Wait for CI, Config Source,
   Root Directory, Deployed SHA);
2. ein isoliertes Railway-Environment `staging` anlegen;
3. Config Source `/railway.staging.json`, Root `/`, Wait for CI und getrennte
   Secrets setzen;
4. Production unverändert lassen außer bewusst freigegebenen Security-Fixes
   (Autodeploy aus, Wait for CI an).

## 2. Menschliche Freigabe

```text
S51D_HUMAN_FREIGABE=YES
S51D_B_RAILWAY_ENV_CREATE_AUTHORIZED=YES
S51D_B_DASHBOARD_REVERIFY_COMPLETE=YES
S51D_B_EXECUTED=YES
STAGING_ENVIRONMENT_CREATED=YES
RAILWAY_TOKEN_IN_AGENT=NO
RAILWAY_CLI_AVAILABLE_IN_AGENT=NO
```

## 3. GitHub-Evidenz (historisch, vor Dashboard-Fix)

```text
RAILWAY_PROJECT_SLUG=ki-lernportal-nim-private-demo
RAILWAY_PROJECT_ID=f69a0054-8cd9-4481-a461-bd17ddde296d
RAILWAY_PRODUCTION_ENVIRONMENT_ID=f30e6e3b-60b5-4b3e-8949-2ca868f4e2da
GITHUB_DEPLOYMENT_ENVIRONMENT=ki-lernportal-nim-private-demo / production
APPARENT_AUTODEPLOY_ON_MAIN=YES
APPARENT_AUTODEPLOY_ON_MAIN_STATUS=HISTORICAL_BEFORE_HUMAN_DISABLE
```

## 3b. Dashboard-Reverify Production (2026-08-11)

```text
CURRENT_PRODUCTION_AUTODEPLOY=DISABLED
CURRENT_PRODUCTION_WAIT_FOR_CI=ON
CURRENT_PRODUCTION_CHECK_SUITES=true
CURRENT_PRODUCTION_CONFIG_SOURCE=NONE
CURRENT_PRODUCTION_ROOT_DIRECTORY=apps/web
CURRENT_PRODUCTION_PUBLIC_DOMAIN=web-production-51d3c8.up.railway.app
PRODUCTION_CHANGED=AUTODEPLOY_DISABLED_AND_WAIT_FOR_CI_ENABLED_ONLY
```

## 4. Staging angelegt (2026-08-11) — verbindlich

Empty Environment `staging` im Projekt `ki-lernportal-nim-private-demo`.
Service aus GitHub `smartlivingberlin/ki-lernportal-nim` (kein Duplicate von
Production-Variablen).

```text
STAGING_ENVIRONMENT_CREATED=YES
STAGING_SERVICE=ki-lernportal-nim
STAGING_BRANCH=main
STAGING_ROOT_DIRECTORY=/
STAGING_CONFIG_SOURCE=/railway.staging.json
STAGING_AUTODEPLOY=DISABLED
STAGING_WAIT_FOR_CI=ON
STAGING_PUBLIC_DOMAIN=ki-lernportal-nim-staging.up.railway.app
STAGING_DEPLOY_ACTIVE=YES
STAGING_DEPLOY_SHA=2a567c79c76e
CONFIG_SOURCE=/railway.staging.json
ROOT_DIRECTORY=/
WAIT_FOR_CI=YES
```

Live-HTTP-Probe Staging (2026-08-11):

```text
GET https://ki-lernportal-nim-staging.up.railway.app/health  -> 200 ok
GET .../live    -> 200 {"status":"live"}
GET .../ready   -> 200 database=not_configured
GET .../version -> 200 build_sha=2a567c79c76e environment=concept_demo
GET .../        -> 200
```

Lokaler CI-Check:
`node scripts/check-s51d-b-staging-static.mjs`

## 5. Ausgeschlossen ohne neue Freigabe

- Production-Autodeploy wieder aktivieren
- Production-Root/Config auf Staging-Vertrag umbiegen
- Secrets im Repository
- Auth-Runtime-UI, DB-Live-Migrate, Railway-DB
- Staging-Autodeploy aktivieren ohne neue Entscheidung

## 6. Abnahme Stand 2026-08-11 (nach Staging-Anlage)

```text
S51D_B_SCOPE_DOCUMENTED=YES
S51D_B_GITHUB_REVERIFY_SCRIPTED=YES
S51D_B_DASHBOARD_REVERIFY_COMPLETE=YES
S51D_B_EXECUTED=YES
STAGING_ENVIRONMENT_CREATED=YES
CURRENT_PRODUCTION_AUTODEPLOY=DISABLED
CURRENT_PRODUCTION_WAIT_FOR_CI=ON
PRODUCTION_CHANGED=AUTODEPLOY_DISABLED_AND_WAIT_FOR_CI_ENABLED_ONLY
```
