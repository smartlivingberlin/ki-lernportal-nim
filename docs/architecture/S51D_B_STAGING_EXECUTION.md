# S51D-B – Railway-Staging Execution Package (teilweise blockiert)

**Status:** Freigabe vorhanden; Railway-API-/CLI-Zugang im Agent fehlt.
Environment-Anlage und Dashboard-Reverify sind deshalb **nicht ausgeführt**.
**Parent:** `docs/architecture/S51D_A_STAGING_SCOPE.md`,
`docs/S50D1_RAILWAY_STAGING_READINESS.md`  
**Baseline:** `8d01f606a1621a5b41d8e3c4020eddcaf97cafd7`  
**Arbeitsbranch:** `cursor/s51d-b-staging-reverify-b554`

## 1. Zweck

S51D-B soll:

1. Production read-only reverifizieren (Autodeploy, Wait for CI, Config Source,
   Root Directory, Deployed SHA);
2. ein isoliertes Railway-Environment `staging` anlegen;
3. Config Source `/railway.staging.json`, Root `/`, Wait for CI und getrennte
   Secrets setzen;
4. Production unverändert lassen (`PRODUCTION_CHANGED=NO`).

## 2. Menschliche Freigabe

```text
S51D_HUMAN_FREIGABE=YES
S51D_B_RAILWAY_ENV_CREATE_AUTHORIZED=YES
S51D_B_EXECUTED=NO
STAGING_ENVIRONMENT_CREATED=NO
RAILWAY_TOKEN_IN_AGENT=NO
RAILWAY_CLI_AVAILABLE_IN_AGENT=NO
```

Ohne Railway-Token/CLI darf der Agent **kein** Environment anlegen und
**keine** Railway-Einstellungen schreiben oder lesen.

## 3. Read-only Reverify (GitHub Deployments API, 2026-08-10)

Erfassbar ohne Railway-Dashboard:

```text
RAILWAY_PROJECT_SLUG=ki-lernportal-nim-private-demo
RAILWAY_PROJECT_ID=f69a0054-8cd9-4481-a461-bd17ddde296d
RAILWAY_PRODUCTION_ENVIRONMENT_ID=f30e6e3b-60b5-4b3e-8949-2ca868f4e2da
GITHUB_DEPLOYMENT_ENVIRONMENT=ki-lernportal-nim-private-demo / production
LATEST_GITHUB_DEPLOYMENT_SHA=8d01f606a1621a5b41d8e3c4020eddcaf97cafd7
LATEST_GITHUB_DEPLOYMENT_CREATOR=railway-app[bot]
GITHUB_ENVIRONMENT_PROTECTION_RULES=NONE
```

Beobachtung: Nach Merges auf `main` erzeugt `railway-app[bot]` wiederholt
erfolgreiche Deployments gegen Production. Das widerspricht dem historischen
Gate `PRODUCTION_AUTODEPLOY=DISABLED` und verlangt Dashboard-Bestätigung.

```text
CURRENT_PRODUCTION_AUTODEPLOY=UNVERIFIED_DASHBOARD_REQUIRED
  (GitHub-Evidenz: APPARENT_AUTODEPLOY_ON_MAIN=YES)
CURRENT_PRODUCTION_WAIT_FOR_CI=UNVERIFIED_DASHBOARD_REQUIRED
CURRENT_PRODUCTION_CONFIG_SOURCE=UNVERIFIED_DASHBOARD_REQUIRED
CURRENT_PRODUCTION_ROOT_DIRECTORY=UNVERIFIED_DASHBOARD_REQUIRED
  (historisch: apps/web)
CURRENT_PRODUCTION_DEPLOYED_SHA=8d01f606a1621a5b41d8e3c4020eddcaf97cafd7
  (via GitHub Deployments API; Dashboard-Abgleich offen)
```

Lokaler CI-Check: `node scripts/check-s51d-b-github-reverify.mjs`

## 4. Operator-Runbook (menschlich / mit Railway-Zugang)

Vor jedem Schritt: Production nur **lesen**, nichts schreiben.

### 4.1 Dashboard-Reverify (Production)

Im Railway-Projekt `ki-lernportal-nim-private-demo`, Environment `production`:

1. Autodeploy: Ist-Wert notieren; Ziel laut Repo-Gate = **disabled**.
2. Wait for CI: Ist-Wert notieren; Ziel für Staging später = **enabled**.
3. Config Source: Ist-Wert (kein `railway.staging.json` für Production).
4. Root Directory: Ist-Wert (historisch `apps/web`).
5. Active Deployment SHA: mit GitHub/`main` abgleichen.
6. Ergebnis in `docs/00_PROJECT_STATUS.md` Abschnitt Railway aktualisieren.

Wenn Autodeploy entgegen dem Gate aktiv ist: **Staging nicht anlegen**, bis
eine menschliche Einzelentscheidung Production-Autodeploy bestätigt oder
deaktiviert.

### 4.2 Staging anlegen (nur nach Reverify)

1. Neues Environment `staging` im **selben** Projekt anlegen (oder bewusst
   getrenntes Staging-Projekt – Entscheidung dokumentieren).
2. Service aus dem Repo verbinden; Staging-Branch freigeben (nicht still
   Production-`main`-Autodeploy erweitern).
3. Root Directory = `/`.
4. Config Source = `/railway.staging.json` (absolut).
5. Wait for CI = **ON**.
6. Variablen/Secrets **getrennt** (keine Production-DB, keine Production-
   Secrets kopieren).
7. Healthcheck-Pfad laut Config: `/health`.
8. Kosten- und Löschplan notieren.
9. Optional: einmaligen Staging-Deploy **nur** nach eigener Deploy-Freigabe.

Abnahme:

```text
STAGING_ENVIRONMENT_CREATED=YES
CONFIG_SOURCE=/railway.staging.json
ROOT_DIRECTORY=/
WAIT_FOR_CI=YES
PRODUCTION_CHANGED=NO
PRODUCTION_AUTODEPLOY=DISABLED
```

## 5. Ausgeschlossen in diesem Slice

- Railway-CLI-/API-Aufrufe ohne Token
- Production-Config-Schreiben
- Production-Autodeploy aktivieren
- Staging-Deploy ohne separate Deploy-Freigabe
- Secrets im Repository
- Auth-Runtime, DB-Live-Migrate, Railway-DB

## 6. Abnahme dieses Repo-Slices

```text
S51D_B_SCOPE_DOCUMENTED=YES
S51D_B_GITHUB_REVERIFY_SCRIPTED=YES
S51D_B_DASHBOARD_REVERIFY_COMPLETE=NO
S51D_B_EXECUTED=NO
STAGING_ENVIRONMENT_CREATED=NO
PRODUCTION_CHANGED=NO
```
