# Projektstatus: KI-Lernportal NIM

**Stand:** 10. August 2026
**Baseline `main`:** `74354d758688c71a4da9b04bb6773fc64927fc76`
**Status:** S51D-B Reverify/Runbook und S52-B Auth-Runtime-Foundation integriert bzw. in Merge; Staging-Environment noch nicht erstellt; Login-UI/DB-Sessions/Live-Migrate weiterhin gesperrt

~~~text
PHASE0_MASTER_BASELINE=PASS_WITH_BLOCKERS
PHASE0A_SOURCE_OF_TRUTH_SYNC=COMPLETE
BACKLOG_NORMALIZATION=COMPLETE
BASELINE_MAIN_SHA=8d01f606a1621a5b41d8e3c4020eddcaf97cafd7
PR68_MERGED=YES
PR102_S51C_B1A_MERGED=YES
PR104_S51C_B1B_MERGED=YES
PR105_SUPERSEDED_BY_S51B_C_SCOPE_LOCK_REBASE=YES
PR118_WAVE_A_MERGED=YES
PR119_WAVE_B_MERGED=YES
PR120_S51B_C_SCOPE_LOCK_MERGED=YES
PR121_S51B_C1_MERGED=YES
PR122_S51B_C2_MERGED=YES
PR124_S51C_B1A_GATE_CI_MERGED=YES
PR125_S51C_B1B_GATE_CI_MERGED=YES
PR126_S51C_OPS_A_MERGED=YES
PR127_S51D_A_MERGED=YES
PR128_S52_A_MERGED=YES
HUMAN_AGENCY_FREIGABE_MERGE_DEPLOY_CONCEPT_DEMO=YES
S51D_HUMAN_FREIGABE=YES
S51D_A_SCOPE_AUTHORIZED=YES
S51D_B_SCOPE_DOCUMENTED=YES
S51D_B_GITHUB_REVERIFY_SCRIPTED=YES
S51D_B_DASHBOARD_REVERIFY_COMPLETE=NO
S51D_B_EXECUTED=NO
STAGING_ENVIRONMENT_CREATED=NO
APPARENT_AUTODEPLOY_ON_MAIN_VIA_GITHUB=YES
S52_A_IMPLEMENTATION_AUTHORIZED=YES
S52_B_IMPLEMENTATION_AUTHORIZED=YES
AUTH_RUNTIME_AUTHORIZED=YES
AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY
LOGIN_UI=NO
S51B_C_SCHEMA_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
~~~

## 1. Verbindliche Einordnung

Das menschlich freigegebene und in `main` integrierte S50B-R3-Zielbild wird
zusammen mit den nachfolgenden Integrationsnachweisen beschrieben durch:

- [S50B-R3 Final Architecture Approval Package](architecture/S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md)
- [Historischer S51A-Implementierungsvertrag](architecture/S51A_IMPLEMENTATION_SCOPE.md)
- [S51B-Persistenz-Scope und Integrationsstatus](architecture/S51B_IMPLEMENTATION_SCOPE.md)
- [S51B-B Adapter-Scope-Lock](architecture/S51B_B_IMPLEMENTATION_SCOPE.md)
- [S51B-C Schema-/Migrations-Scope-Lock](architecture/S51B_C_SCHEMA_MIGRATION_SCOPE.md)
- [S51C-B1 Domain-/Contract-Typen-Scope](architecture/S51C_B1_DOMAIN_CONTRACT_TYPES_SCOPE.md)
- [S51C-B1A Domain-Implementierungs-Scope](architecture/S51C_B1A_IMPLEMENTATION_SCOPE.md)
- [S51C-B1B Integration Gate](architecture/S51C_B1B_INTEGRATION_GATE.md)
- [S51C-OPS-A Betriebsfundament Scope](architecture/S51C_OPS_A_OPERATIONS_FOUNDATION_SCOPE.md)
- [S51D-A Staging Scope-Lock](architecture/S51D_A_STAGING_SCOPE.md)
- [S51D-B Staging Execution / Reverify](architecture/S51D_B_STAGING_EXECUTION.md)
- [S52-A Auth Session-/Rollen-Scope](architecture/S52_A_IMPLEMENTATION_SCOPE.md)
- [S52-B Auth-Runtime Foundation](architecture/S52_B_IMPLEMENTATION_SCOPE.md)
- [Zielarchitektur](architecture/ARCHITECTURE_TARGET.md)
- [Package-DAG](architecture/PACKAGE_DAG.md)
- [Plattformverträge](architecture/PLATFORM_CONTRACTS.md)
- [MVP-Scope](architecture/MVP_SCOPE.md)
- [Premium-Transfer-Ledger](architecture/PREMIUM_TRANSFER_LEDGER.md)

[S50B-R2](architecture/S50B_R2_SOURCE_OF_TRUTH.md) bleibt als historische
Architekturgrundlage erhalten.

Bei einem aktuellen Tatsachenwiderspruch gilt folgende Rangfolge:

1. tatsächlicher Code- und CI-Stand auf dem geprüften `main`;
2. dieser Projektstatus;
3. aktuelle Zielarchitektur und Package-DAG;
4. historische Scope-, Freigabe- und Auditdokumente.

Historische Dokumente bleiben Belege, erteilen aber keine neue
Implementierungs-, Merge-, Datenbank-, Railway- oder Deploymentfreigabe.

## 2. Nachgewiesener Produkt- und Repository-Istzustand

Vorhanden sind:

- eine produktionsfähig baubare Next.js-Anwendung unter `apps/web`;
- ein S51A-Workspace mit acht privaten Package-Grenzen;
- automatisierte Package-Boundary- und Package-Typecheck-Gates;
- integrierte S51B-A- und S51B-B-Scope-Locks;
- ein lokales S51B-B-MySQL-/Drizzle-Adapterfundament mit begrenzter
  Konfiguration, Lazy Initialization sowie Fake- und Unit-Tests;
- zwölf strukturierte Anfängerlektionen;
- lokale Suche und lokaler Lernfortschritt;
- zwölf Übungen und 36 Selbstprüfungsfragen;
- Content-, Quellen-, Accessibility-, Governance- und Supply-Chain-Gates;
- ein reproduzierbarer Next.js-Standalone-Build;
- eine öffentlich erreichbare Railway-Konzeptdemo.

Die Konzeptdemo ist kein Nachweis für vollständige Produktionsreife.

## 3. Noch nicht vorhanden oder nicht freigegeben

Nicht vorhanden oder nicht freigegeben sind insbesondere:

- produktive Benutzerkonten;
- eine echte produktive MySQL-/Drizzle-Verbindung;
- Tabellen, kanonisches Schema, Migrationen und Seeds;
- widerrufbare Serversitzungen;
- Rollen-, Scope- und Ownership-Persistenz;
- ein Admin- und Publikationssystem;
- serverseitiger Lernfortschritt;
- Hintergrundworker oder Transactional Outbox;
- serverseitige Search-Laufzeit;
- produktive KI-/RAG-Laufzeit;
- isoliertes Railway-Staging;
- kontinuierliches Monitoring;
- Backup-/Restore-Nachweis;
- Payment, B2B, Multi-Tenant oder White Label;
- ein freigegebener Production-Deploy-Ablauf.

## 4. Integrierte Architektur- und Plattformschritte

Das S50B-R3-Architekturpaket wurde am 18. Juli 2026 durch den autorisierten
Squash-Merge von PR #73 unter
`cab2745c9cfea8a4d6418d866972cef6f982e55b` in `main` integriert.

Der anschließende Tatsachenabgleich wurde durch PR #74 unter
`f8ba5da1b7652447a93511e377c1891ff4470754` integriert.

Der S51A-Package-Skeleton wurde durch PR #76 unter
`4bd8abeceac7e7b6bcd3b6cf4852653a8d0942c8` integriert.

Der S51B-A-Persistenz-Scope-Lock folgte durch PR #77 unter
`fbdedec8f3e67ce99678c41779b99b22be506710`; der zugehörige
Post-Merge-Tatsachenabgleich wurde durch PR #78 unter
`ebaca10d7cbcee69587f5a87391e8b5b298c75f8` integriert.

Der S51B-B-Dokumentations- und Runtime-Scope-Lock sowie ein minimaler
transitiver Audit-Fix wurden durch PR #79 unter
`c37703fdd4d2df152857e4834ab9cf01351a9cfb` integriert.

Das lokale S51B-B-MySQL-/Drizzle-Adapterfundament wurde am 23. Juli 2026 durch
PR #82 unter `0f126ab2eb2b7a87f8a8ee85b611ec2ea410bcd5` per Squash
integriert. Der geprüfte PR-Head war
`b76d128fbe163708f4767c4ecc737d838188b0ce`; PR-CI #184 war erfolgreich.

PR #82 führte keine echte Datenbankverbindung, Query, Tabelle, kein
Drizzle-Schema, keine Migration, keinen Seed und keine Railway- oder
Deploymentänderung aus.

## 5. CI- und Governance-Baseline

Der vollständige `main`-CI-Lauf auf dem geprüften Baseline-Stand war
erfolgreich. Zur Baseline gehören unter anderem:

- gepinnte Node- und pnpm-Toolchain;
- read-only Workflow-Berechtigungen;
- unveränderliche Action-SHA-Pins;
- Frozen-Lockfile-Installation;
- Package-Boundaries und Package-Typecheck;
- S51B-B-Runtimetest mit lokalen Fakes;
- Supply-Chain- und Dependency-Audits;
- Produktionsbuild und Standalone-Asset-Verifikation;
- Lint, Content- und Quellenintegrität;
- Playwright-/Chromium-Smokes;
- Responsive-, Hydration- und Accessibility-Regression;
- Übungs-, Fortschritts-, Reset- und Cross-Tab-Smokes.

Nicht als vollständig abgenommen gelten insbesondere Firefox, WebKit/Safari,
reales Browserzoom bis 400 Prozent, manuelle Screenreader-Nutzung, reale
Mobilgeräte, Lighthouse-Budgets und visuelle Vergleichstests.

## 6. Railway- und Production-Baseline

Der zuletzt read-only erfasste Production-Zustand lautete:

~~~text
RAILWAY_PROJECT=ki-lernportal-nim-private-demo
RAILWAY_ENVIRONMENT=production
RAILWAY_SERVICE=web
CONNECTED_BRANCH=main
ACTIVE_DEPLOYMENT_STATUS=SUCCESS
DEPLOYED_SHA=4173f2d935e3145142dce539b399bf8b9d77ee79
ROOT_DIRECTORY=apps/web
BUILDER=RAILPACK
BUILD_COMMAND=npm run build
START_COMMAND=HOSTNAME=0.0.0.0 npm run start
HEALTHCHECK_PATH=NOT_CONFIGURED
ROOT_HTTP_CODE=200
HEALTH_HTTP_CODE=404
REGION=europe-west4-drams3a
REPLICAS=1
VOLUMES=0
~~~

Historisch wurde vor dem Merge von PR #73 read-only bestätigt, dass
Production-Autodeploy deaktiviert und Wait for CI aktiviert war. Diese Werte
sind zeitgebunden.

Die verwendeten CLI-Abfragen konnten den gegenwärtigen Wert folgender Felder
nicht belastbar ausweisen:

~~~text
CURRENT_PRODUCTION_AUTODEPLOY=UNVERIFIED_DASHBOARD_REQUIRED
CURRENT_WAIT_FOR_CI=UNVERIFIED_DASHBOARD_REQUIRED
CURRENT_CONFIG_SOURCE=UNVERIFIED_DASHBOARD_REQUIRED
APPARENT_AUTODEPLOY_ON_MAIN_VIA_GITHUB=YES
LATEST_GITHUB_DEPLOYMENT_SHA=8d01f606a1621a5b41d8e3c4020eddcaf97cafd7
RAILWAY_PROJECT_ID=f69a0054-8cd9-4481-a461-bd17ddde296d
RAILWAY_PRODUCTION_ENVIRONMENT_ID=f30e6e3b-60b5-4b3e-8949-2ca868f4e2da
~~~

S51D-B (2026-08-10): GitHub Deployments zeigen wiederholte Production-Deploys
durch `railway-app[bot]` nach `main`-Merges. Das widerspricht dem historischen
Gate `PRODUCTION_AUTODEPLOY=DISABLED` und muss im Railway-Dashboard bestätigt
werden, bevor Staging angelegt wird. Siehe
[S51D_B_STAGING_EXECUTION.md](architecture/S51D_B_STAGING_EXECUTION.md).

Vor jeder zukünftigen Railway-, Merge-, Deployment- oder
Produktionsentscheidung ist der dann aktuelle Dashboardzustand erneut
read-only zu prüfen.

## 7. PR #68 (Staging-Readiness) — gemergt

PR #68 („S50D1: establish Railway staging readiness contract“) ist auf GitHub
**gemergt** (Merge am 26. Juli 2026). Der Repository-Diff enthält keine
Standarddatei `railway.json`, sondern die explizit zu konfigurierende Datei
`railway.staging.json`.

~~~text
PR68_STATE=MERGED
PR68_MERGED=YES
PR68_READY_EXECUTED=HISTORICAL
RAILWAY_STAGING_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
RAILWAY_REVERIFY_BEFORE_STAGING_USE=REQUIRED
~~~

Ein Merge von PR #68 ist **keine** Freigabe für Staging-Nutzung, Autodeploy
oder Production-Änderungen. Vor jeder Railway-Aktion ist der Dashboardzustand
erneut read-only zu prüfen.

## 7b. Offener PR #105 (S51B-C Scope-Lock)

PR #105 bleibt als historischer Draft bestehen und wird durch den rebaselineden
S51B-C-Scope-Lock auf aktuellem `main` ersetzt. Der neue Scope-Lock autorisiert
ausschließlich die Dokumentation; Schemaimplementierung, Migration und
Datenbankverbindung bleiben gesperrt.

~~~text
PR105_STATE=OPEN_DRAFT_SUPERSEDED
PR105_MERGED=NO
S51B_C_SCOPE_LOCK_REBASE_BRANCH=cursor/s51b-c-scope-lock-b554
S51B_C_SCOPE_MERGE_AUTHORIZED=YES
S51B_C_SCHEMA_AUTHORIZED=NO
S51B_C1_SCHEMA_IMPLEMENTATION_AUTHORIZED=NO
S51B_C2_DATABASE_TEST_AUTHORIZED=NO
~~~

Dieses Dokument erteilt keine Schema-, Migrations-, Datenbank- oder
Deploymentfreigabe über den dokumentarischen Scope-Lock hinaus.

## 7c. PR #108 (Design-/Content-Foundation) und Agency-Freigabe

Am 10. August 2026 wurde für den Design-/Content-Foundation-Slice
(PR #108) eine menschliche Fullstack-Agency-Freigabe erteilt: Merge und
Deploy der öffentlichen Konzeptdemo dürfen nach grünem CI und
Scope-Prüfung ausgeführt werden.

Nicht freigegeben bleiben weiterhin Schema, Migrationen, echte
Datenbankverbindungen, isoliertes Staging und Autodeploy-Umschaltung ohne
erneute Prüfung.

~~~text
PR108_STATE=OPEN
HUMAN_AGENCY_FREIGABE_MERGE_DEPLOY_CONCEPT_DEMO=YES
S51B_C_SCHEMA_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
RAILWAY_STAGING_AUTHORIZED=NO
~~~

## 8. Phase-0- und Phase-0A-Befunde

~~~text
ARCHITECTURE_DIRECTION=GO
REBUILD_REQUIRED=NO
CONTROLLED_HARDENING_REQUIRED=YES
ARCHITECTURE_DOCUMENTATION_SYNC_REQUIRED=NO
BACKLOG_NORMALIZATION_REQUIRED=NO
BACKLOG_NORMALIZATION_COMPLETE=YES
PR68_STAGING_ONLY_REMEDIATION_REQUIRED=NO
PR68_STAGING_ONLY_REMEDIATION_COMPLETE=YES
~~~

Die Backlog-Normalisierung ist abgeschlossen. Ready, Merge, Railway-Verifikation
und jedes Deployment für PR #68 bleiben getrennte, ausdrücklich
freigabepflichtige Arbeitsschritte.

## 9. Dauerhafte Arbeits- und Freigabegrenzen

1. Jede neue Arbeit beginnt auf einem kleinen Branch vom jeweils aktuellen
   `main`.
2. Abgeschlossene oder abgelöste PR-Branches werden nicht als neue
   Entwicklungsbasis verwendet.
3. Datenbankverbindungen, Queries, Tabellen, Drizzle-Schemas, `drizzle-kit`,
   Migrationen, Seeds und Testdatenbanken benötigen eine neue ausdrückliche
   Freigabe.
4. GitHub-Issue-, Railway-, Datenbank-, Deployment- und Produktionsaktionen
   sind jeweils separat freigabepflichtig.
5. Vor jeder Mergeentscheidung werden Head, Base-Freshness, CI,
   Review-Threads und Dateiscope erneut read-only geprüft.
6. Ein Merge ist keine automatische Deploymentfreigabe.

## 10. Stabiler Status

~~~text
S50B_R3_PACKAGE_COMPLETE=YES
S50B_R3_PACKAGE_APPROVED=YES
S50B_R3_INTEGRATED_TO_MAIN=YES
HUMAN_ARCHITECTURE_APPROVAL=YES

S51A_SCOPE_DOCUMENTED=YES
S51A_INTEGRATED_TO_MAIN=YES
S51A_PACKAGE_BOUNDARY_GATE_IN_CI=YES
S51A_PACKAGE_TYPECHECK_IN_CI=YES

S51B_A_INTEGRATED_TO_MAIN=YES
S51B_B_SCOPE_LOCK_INTEGRATED_TO_MAIN=YES
S51B_B_IMPLEMENTATION_INTEGRATED_TO_MAIN=YES
S51B_B_CONNECTION_PROOF_AUTHORIZED=NO
S51B_C_SCHEMA_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
MIGRATION_AUTHORIZED=NO

RAILWAY_STAGING_AUTHORIZED=NO
PR68_MERGED=YES
PR105_OPEN_DRAFT=YES
PR108_DESIGN_CONTENT_FOUNDATION=OPEN
HUMAN_AGENCY_FREIGABE_MERGE_DEPLOY_CONCEPT_DEMO=YES
S51B_C_SCHEMA_AUTHORIZED=NO
DEPLOY_AUTHORIZED=YES_FOR_CONCEPT_DEMO_AFTER_CI_GREEN
PRODUCTION_CHANGE_AUTHORIZED=YES_FOR_CONCEPT_DEMO_CONTENT_SLICE_ONLY

PRODUCT_CODE_CHANGE_REQUIRES_SEPARATE_AUTHORIZATION=NO_FOR_APPROVED_CONTENT_SLICE
FUTURE_GIT_ACTIONS_REQUIRE_SEPARATE_AUTHORIZATION=NO_FOR_APPROVED_CONTENT_SLICE
FUTURE_RAILWAY_ACTIONS_REQUIRE_CURRENT_READ_ONLY_EVIDENCE=YES
FUTURE_DEPLOYMENT_ACTIONS_REQUIRE_SEPARATE_AUTHORIZATION=NO_FOR_APPROVED_CONCEPT_DEMO
~~~
