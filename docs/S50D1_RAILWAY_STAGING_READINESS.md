# S50D1 – Railway Staging- und Readiness-Vertrag

Stand: 2026-07-26

## Zweck

Dieser Vertrag bereitet das KI-Lernportal NIM auf ein späteres, separat
freizugebendes Railway-Staging vor. S50D1 verändert ausschließlich den
Repository-Branch von Pull Request #68. Dieser Restack greift nicht auf
Railway zu, verändert keine Railway-Einstellung und führt keinen Deploy aus.

```text
RESTACK_BASE=3b29e49464cf484f83fca3ee5b2ee548c9802b72
DEFAULT_RAILWAY_CONFIG_PRESENT=NO
STAGING_CONFIG_SOURCE=/railway.staging.json
PRODUCTION_CONFIG_UNCHANGED=YES
RAILWAY_PROJECT_CHANGED=NO
STAGING_CREATED=NO
DEPLOY=NO
MERGE=NO
PRODUCTION_CHANGED_BY_RESTACK=NO
```

## Exakter Repository-Scope

Der Netto-Diff von PR #68 darf ausschließlich diese fünf Dateien enthalten:

1. `.github/workflows/ci.yml`
2. `apps/web/src/app/health/route.ts`
3. `docs/S50D1_RAILWAY_STAGING_READINESS.md`
4. `railway.staging.json`
5. `scripts/check-s50d1-railway-readiness.mjs`

Nicht zum Scope gehören Produktfunktionen, Nutzerkonten, Datenbankzugriffe,
Zahlungen, Secrets, Railway-Variablen, Domains oder produktive Deployments.

## Zeitgebundene Railway-Beobachtungen

Die folgenden Angaben stammen aus dem dokumentierten Betriebsgate vom
15. Juli 2026. Sie wurden bei diesem Restack nicht erneut über Railway
geprüft und dürfen deshalb nicht als aktueller Live-Zustand behandelt werden.

```text
HISTORICAL_RAILWAY_STATE=REVERIFY_BEFORE_MERGE
HISTORICAL_PRODUCTION_AUTODEPLOY=DISABLED
HISTORICAL_ACTIVE_DEPLOYMENT=1ef14120-7b59-47d9-b38b-1cb6ed89146b
HISTORICAL_DEPLOYED_SHA=4173f2d935e3145142dce539b399bf8b9d77ee79
HISTORICAL_PRODUCTION_REGION=europe-west4-drams3a
HISTORICAL_ROOT_DIRECTORY=apps/web
HISTORICAL_BUILD_COMMAND=npm run build
HISTORICAL_START_COMMAND=HOSTNAME=0.0.0.0 npm run start
HISTORICAL_ROOT_HTTP_CODE=200
HISTORICAL_HEALTH_HTTP_CODE=404
```

Vor einer späteren Merge-Entscheidung müssen insbesondere Autodeploy,
Deployment-SHA, Region, Root Directory, Build- und Startvertrag sowie der
öffentliche Dienstzustand erneut read-only verifiziert werden.

## Verbindlicher Repository-Vertrag

### Toolchain

- Node.js: exakt `22.22.1`
- pnpm: exakt `11.13.0`
- einziges Lockfile: `pnpm-lock.yaml`
- Installation: `pnpm install --frozen-lockfile`

### Railway Staging Config as Code

Die Datei `/railway.staging.json` definiert:

- Builder: `RAILPACK`
- Build: `pnpm --filter web build`
- Start: `HOSTNAME=0.0.0.0 pnpm --filter web start`
- Healthcheck: `/health`
- Healthcheck-Timeout: 120 Sekunden
- Restart Policy: `ON_FAILURE`
- höchstens zehn Restart-Versuche

Die Konfiguration enthält keine Variablen, Tokens, Passwörter oder Secrets.

Im Repository existiert bewusst keine Standarddatei `/railway.json`.
Railway darf diese Staging-Konfiguration ausschließlich verwenden, wenn im
isolierten Staging-Service der absolute Config-Source-Pfad
`/railway.staging.json` ausdrücklich eingestellt wurde.

Dieser PR verändert weder Production-Root-Directory noch Production-Build-,
Start-, Config-Source-, Branch-, Wait-for-CI- oder Autodeploy-Einstellungen.
Der aktuelle Production-Zustand bleibt ohne erneute read-only Prüfung
`UNVERIFIED`.

### Health-Endpoint

`GET /health` liefert ausschließlich:

```text
HTTP 200
Content-Type: text/plain; charset=utf-8
Cache-Control: no-store

ok
```

Der Endpoint bestätigt nur die Bereitschaft des Webprozesses. Er veröffentlicht
keine Commit-SHAs, Buildnummern, Variablenwerte, Datenbankzustände oder
Infrastrukturdetails.

## CI-Vertrag

Die heutige CI-Struktur von `main` bleibt vollständig erhalten. Zusätzlich
werden genau zwei Railway-Readiness-Prüfungen ergänzt:

1. statische Prüfung von Toolchain, `railway.staging.json`, Health-Route,
   Runbook und CI-Integration;
2. echte HTTP-Prüfung des lokal gestarteten Standalone-Servers auf `/health`.

Unverändert erhalten bleiben insbesondere:

- GitHub-Governance-Prüfung;
- Frozen-Lockfile-Installation;
- S51A-Paketgrenzen;
- S51A-Typecheck;
- S51B-B-Datenbank-Runtimetest mit lokalen Fakes;
- Supply-Chain-Prüfung;
- vollständiges und produktives Dependency-Audit;
- Produktionsbuild und Standalone-Asset-Prüfung;
- Lint, Content- und Quellenintegrität;
- Responsive-, Hydration- und Accessibility-Regression;
- Quellen-, Praxis- und Fortschrittsregressionen.

Ein grüner GitHub-Lauf bestätigt nur den Repository-Vertrag. Er ist weder
eine Merge- noch eine Deployment-Freigabe.

## Blockierender Merge- und Betriebsgate

PR #68 darf erst nach einer separaten Entscheidung gemergt werden. Unmittelbar
vor dieser Entscheidung sind mindestens folgende Punkte erneut nachzuweisen:

```text
REMOTE_MAIN=APPROVED_SHA
PR68_HEAD=APPROVED_SHA
PR68_CHANGED_FILES=5
PR68_FULL_CI=PASS
PRODUCTION_AUTODEPLOY=READ_ONLY_REVERIFIED
RAILWAY_RUNTIME_STATE=READ_ONLY_REVERIFIED
HUMAN_MERGE_APPROVAL=YES
DEPLOY_APPROVAL=SEPARATE
```

Verbindliche Regeln:

1. Kein Merge darf still als Deployment-Freigabe behandelt werden.
2. Railway-Zugriffe und Railway-Änderungen benötigen eine eigene Freigabe.
3. Root Directory, Config Source, Branch-Verknüpfung, Region, Environment,
   Wait for CI und Autodeploy dürfen nicht still verändert werden.
4. Ein späteres Staging muss von Production getrennt sein.
5. Secrets dürfen ausschließlich über die dafür vorgesehene Railway-
   Secret-Verwaltung gesetzt werden und niemals in Repository-Dateien stehen.

## Später notwendige Staging-Schritte

Diese Schritte gehören ausdrücklich nicht zum Restack:

1. Railway-Istzustand read-only neu erfassen;
2. isoliertes `staging`-Environment anlegen;
3. Repository-Root als Workspace-Kontext sicherstellen;
4. Config Source ausdrücklich auf `/railway.staging.json` setzen;
5. `Wait for CI` aktivieren;
6. nur einen freigegebenen Staging-Branch verbinden;
7. einen einmaligen Staging-Deploy separat freigeben;
8. Root-, Health-, Header-, Responsive-, Accessibility- und No-Secret-Smokes
   gegen die Staging-URL ausführen.

Keiner dieser Schritte darf still auf `production` vorgenommen werden.

## Staging-Abnahmekriterien

```text
ROOT_DIRECTORY=/
PACKAGE_MANAGER=pnpm@11.13.0
NODE_VERSION=22.22.1
CONFIG_SOURCE=/railway.staging.json
WAIT_FOR_CI=YES
HEALTHCHECK_PATH=/health
HEALTH_HTTP_CODE=200
DEPLOYED_SHA=APPROVED_SHA
PRODUCTION_CHANGED=NO
```

Railway-Build und GitHub-CI müssen denselben freigegebenen Commit prüfen.
Logs dürfen keine Tokens, Cookies, personenbezogenen Daten oder Variablenwerte
enthalten.

## Rollback- und Stop-Regeln

Bei Build-, Start- oder Healthcheckfehlern gilt:

1. kein Production-Deploy;
2. kein Redeploy oder Restart ohne Ursachenprüfung;
3. fehlgeschlagenen Commit, Buildvertrag und Logs zunächst read-only prüfen;
4. Korrektur ausschließlich über einen neuen Commit;
5. vollständigen CI-Lauf erneut durchführen;
6. Rollback nur nach separater menschlicher Freigabe.

## Lokale und CI-Prüfung

```bash
node scripts/check-s50d1-railway-readiness.mjs
pnpm --filter web build
pnpm --filter web lint
```

Nach lokalem Start:

```bash
curl --fail --silent --show-error \
  http://127.0.0.1:3000/health
```

Erwartete Ausgabe:

```text
ok
```

## S51D-A Nachtrag (2026-08-10)

PR #68 ist auf `main` gemerged. Der Repository-Vertrag bleibt gültig.
S51D-A Scope-Lock: `docs/architecture/S51D_A_STAGING_SCOPE.md`.

```text
PR68_MERGED=YES
STAGING_ENVIRONMENT_CREATED=NO
S51D_B_EXECUTED=NO
PRODUCTION_CHANGED=NO
```

## S51D-B Nachtrag (2026-08-10 / 2026-08-11)

Execution-Package und GitHub-Reverify:
`docs/architecture/S51D_B_STAGING_EXECUTION.md`,
`scripts/check-s51d-b-github-reverify.mjs`,
`scripts/check-s51d-b-staging-static.mjs`.

Dashboard-Reverify (2026-08-11, menschlich): Production Autodeploy DISABLED,
Wait for CI / Check Suites ON. Staging-Environment weiterhin nicht angelegt.

```text
S51D_B_GITHUB_REVERIFY_SCRIPTED=YES
S51D_B_DASHBOARD_REVERIFY_COMPLETE=YES
STAGING_ENVIRONMENT_CREATED=NO
PRODUCTION_AUTODEPLOY=DISABLED
PRODUCTION_WAIT_FOR_CI=ON
APPARENT_AUTODEPLOY_ON_MAIN_VIA_GITHUB=HISTORICAL_BEFORE_2026_08_11_DISABLE
RAILWAY_TOKEN_IN_AGENT=NO
PRODUCTION_CHANGED=AUTODEPLOY_DISABLED_AND_WAIT_FOR_CI_ENABLED_ONLY
```
