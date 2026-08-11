# S51D-B – Railway-Staging Execution Package

**Status:** Production-Dashboard-Reverify am 2026-08-11 menschlich bestätigt.
Staging-Environment noch **nicht** angelegt (Agent ohne Railway-Token/CLI).
**Parent:** `docs/architecture/S51D_A_STAGING_SCOPE.md`,
`docs/S50D1_RAILWAY_STAGING_READINESS.md`  
**Baseline:** `18b91301131cb6f9567b3cc0f4667e7346059072`  
**Arbeitsbranch:** `cursor/s51d-b-dashboard-reverify-docs-b554`

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
S51D_B_EXECUTED=NO
STAGING_ENVIRONMENT_CREATED=NO
RAILWAY_TOKEN_IN_AGENT=NO
RAILWAY_CLI_AVAILABLE_IN_AGENT=NO
```

Ohne Railway-Token/CLI darf der Agent **kein** Environment anlegen.

## 3. GitHub-Evidenz (historisch, vor Dashboard-Fix)

Erfassbar ohne Railway-Dashboard (Stand 2026-08-10/11 vor Disable):

```text
RAILWAY_PROJECT_SLUG=ki-lernportal-nim-private-demo
RAILWAY_PROJECT_ID=f69a0054-8cd9-4481-a461-bd17ddde296d
RAILWAY_PRODUCTION_ENVIRONMENT_ID=f30e6e3b-60b5-4b3e-8949-2ca868f4e2da
GITHUB_DEPLOYMENT_ENVIRONMENT=ki-lernportal-nim-private-demo / production
LATEST_GITHUB_DEPLOYMENT_SHA=18b91301131cb6f9567b3cc0f4667e7346059072
LATEST_GITHUB_DEPLOYMENT_CREATOR=railway-app[bot]
APPARENT_AUTODEPLOY_ON_MAIN=YES
APPARENT_AUTODEPLOY_ON_MAIN_STATUS=HISTORICAL_BEFORE_HUMAN_DISABLE
```

## 3b. Dashboard-Reverify (menschlich, 2026-08-11) — verbindlich

Production Service `web`, Projekt `ki-lernportal-nim-private-demo`:

```text
CURRENT_PRODUCTION_AUTODEPLOY=DISABLED
CURRENT_PRODUCTION_WAIT_FOR_CI=ON
CURRENT_PRODUCTION_CHECK_SUITES=true
CURRENT_PRODUCTION_CONFIG_SOURCE=NONE
CURRENT_PRODUCTION_ROOT_DIRECTORY=apps/web
CURRENT_PRODUCTION_BUILD_COMMAND=npm run build
CURRENT_PRODUCTION_START_COMMAND=HOSTNAME=0.0.0.0 npm run start
CURRENT_PRODUCTION_HEALTHCHECK_PATH=EMPTY
CURRENT_PRODUCTION_PUBLIC_DOMAIN=web-production-51d3c8.up.railway.app
CURRENT_PRODUCTION_DEPLOYED_SHA=18b91301131cb6f9567b3cc0f4667e7346059072
PRODUCTION_CHANGED=AUTODEPLOY_DISABLED_AND_WAIT_FOR_CI_ENABLED_ONLY
```

Live-HTTP-Probe (2026-08-11):

```text
GET /health  -> 200 ok
GET /live    -> 200 {"status":"live"}
GET /ready   -> 200 database=not_configured
GET /version -> 200 build_sha=18b91301131c environment=concept_demo
GET /        -> 200
```

Lokaler CI-Check (statisch, ohne Token):
`node scripts/check-s51d-b-staging-static.mjs`

Optionaler Live-Check (Operator, benötigt `gh` Auth):
`S51D_B_LIVE_GITHUB=1 node scripts/check-s51d-b-github-reverify.mjs`

## 4. Operator-Runbook — Staging anlegen (noch ausstehend)

Voraussetzung: Abschnitt 3b erledigt (`YES`).

1. Neues Environment `staging` im **selben** Projekt anlegen.
2. Service aus dem Repo verbinden; Staging-Autodeploy zunächst **OFF**.
3. Root Directory = `/`.
4. Config Source = `/railway.staging.json` (absolut).
5. Wait for CI = **ON**.
6. Variablen/Secrets **getrennt** (keine Production-Secrets kopieren).
7. Healthcheck-Pfad laut Config: `/health`.
8. Kosten- und Löschplan notieren.
9. Staging-Deploy **nur** nach eigener Deploy-Freigabe.

Abnahme:

```text
STAGING_ENVIRONMENT_CREATED=YES
CONFIG_SOURCE=/railway.staging.json
ROOT_DIRECTORY=/
WAIT_FOR_CI=YES
PRODUCTION_AUTODEPLOY=DISABLED
PRODUCTION_CHANGED=NO_FURTHER
```

## 5. Ausgeschlossen ohne neue Freigabe

- Railway-CLI-/API-Aufrufe ohne Token
- Production-Autodeploy wieder aktivieren
- Staging-Deploy ohne separate Deploy-Freigabe
- Secrets im Repository
- Auth-Runtime-UI, DB-Live-Migrate, Railway-DB

## 6. Abnahme Stand 2026-08-11

```text
S51D_B_SCOPE_DOCUMENTED=YES
S51D_B_GITHUB_REVERIFY_SCRIPTED=YES
S51D_B_DASHBOARD_REVERIFY_COMPLETE=YES
CURRENT_PRODUCTION_AUTODEPLOY=DISABLED
CURRENT_PRODUCTION_WAIT_FOR_CI=ON
S51D_B_EXECUTED=NO
STAGING_ENVIRONMENT_CREATED=NO
```
