# S51D-A – Railway-Staging Scope-Lock (Repo-only)

**Status:** Scope-Lock mit dokumentarischer Freigabe. Kein Railway-Environment
angelegt, kein Deploy, keine Production-Änderung.
**Parent:** `docs/S50D1_RAILWAY_STAGING_READINESS.md`, `docs/architecture/MVP_SCOPE.md`, Issue #94  
**Baseline:** `068559ad72cb732ede61ffaa9a3742d9933d841c`  
**Arbeitsbranch:** `cursor/s51d-a-staging-scope-b554`

## 1. Zweck

S51D-A schließt den dokumentarischen Gate-Stand für isoliertes Railway-Staging:

1. bestätigt, dass S50D1 (PR #68) bereits gemerged ist;
2. definiert den exakten Folgescope für ein späteres Staging-Environment;
3. hält Production, Autodeploy und Secrets gesperrt, bis S51D-B ausgeführt wird.

## 2. Ist-Stand (verbindlich)

```text
PR68_S50D1_MERGED=YES
PR68_MERGE_COMMIT=43550961cb5f584b5a5b16aaaa93610b3ce0b2f8
RAILWAY_STAGING_JSON_PRESENT=YES
DEFAULT_RAILWAY_JSON_ABSENT=YES
HEALTH_ROUTE_PRESENT=YES
CI_RAILWAY_READINESS_CHECK=YES
CI_HEALTH_PROBE=YES
STAGING_ENVIRONMENT_CREATED=NO
STAGING_DEPLOY_EXECUTED=NO
PRODUCTION_CHANGED=NO
```

S50D1-Repo-Vertrag (bereits auf `main`):

```text
railway.staging.json
scripts/check-s50d1-railway-readiness.mjs
docs/S50D1_RAILWAY_STAGING_READINESS.md
apps/web/src/app/health/route.ts
.github/workflows/ci.yml  # readiness + /health probe
```

## 3. Menschliche Freigabe

```text
S51D_HUMAN_FREIGABE=YES
S51D_A_SCOPE_AUTHORIZED=YES
S51D_A_DOC_SYNC_AUTHORIZED=YES
S51D_B_RAILWAY_ENV_CREATE_AUTHORIZED=YES
S51D_B_EXECUTED=NO
RAILWAY_CLI_AVAILABLE_IN_AGENT=NO
```

S51D-B (Environment anlegen, Config Source setzen, Staging-Deploy) bleibt
ausgeführt=`NO`, bis Railway-Zugang und read-only Reverify vorliegen.

## 4. Exakter Dateiscope dieses Slices

```text
ADD    docs/architecture/S51D_A_STAGING_SCOPE.md
MODIFY AGENTS.md
MODIFY docs/00_PROJECT_STATUS.md
MODIFY docs/architecture/MVP_SCOPE.md
MODIFY docs/S50D1_RAILWAY_STAGING_READINESS.md
MODIFY docs/agent-ops/RAILWAY_DEPLOYMENT_STRATEGY.md
MODIFY docs/architecture/ARCHITECTURE_TARGET.md
```

Keine Änderungen an `apps/**`, `packages/**`, Lockfiles, Secrets oder
Railway-Live-Config in S51D-A.

## 5. S51D-B – späterer Ausführungsslice (autorisiert, nicht ausgeführt)

Maximaler Scope nach Reverify:

1. eigenes Railway-Environment `staging`, getrennt von Production;
2. Config Source ausdrücklich `/railway.staging.json`;
3. Root Directory `/` (Workspace-Build via pnpm filter web);
4. Wait for CI aktiv;
5. getrennte Variablen/Secrets (keine Production-DB, keine Production-Secrets);
6. freigegebener Staging-Branch;
7. Healthcheck `/health` → HTTP 200 `ok`;
8. kein Autodeploy auf Production; Production-Autodeploy bleibt disabled;
9. Kosten- und Löschplan dokumentiert;
10. Abnahme: `PRODUCTION_CHANGED=NO`.

Vor Ausführung verpflichtend read-only erfassen:

```text
CURRENT_PRODUCTION_AUTODEPLOY
CURRENT_PRODUCTION_WAIT_FOR_CI
CURRENT_PRODUCTION_CONFIG_SOURCE
CURRENT_PRODUCTION_ROOT_DIRECTORY
CURRENT_PRODUCTION_DEPLOYED_SHA
```

## 6. Ausgeschlossen (auch bei Freigabe)

- Production-Deploy oder Production-Config-Schreiben in diesem Slice
- Autodeploy für Production aktivieren
- Secrets im Repository
- Railway-DB / Live-Migrate
- Auth-Runtime, Nutzerkonten, Admin-Runtime
- Standarddatei `railway.json` (Production darf Staging-Config nicht erben)

## 7. Abnahme S51D-A

```text
S51D_A_SCOPE_LOCK_COMPLETE=YES
PR68_STATUS_DOCS_SYNCED=YES
STAGING_ENVIRONMENT_CREATED=NO
DEPLOY_EXECUTED=NO
PRODUCTION_CHANGED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
AUTH_RUNTIME_AUTHORIZED=NO
```
