# Projektstatus: KI-Lernportal NIM

**Stand:** 13. August 2026
**Baseline `main`:** `f8bc8a5f1ca60446890e17cd38eb04f6f4f1690e` (nach #183 Kernweg-Abschluss)
**Status:** Concept-Demo live mit Fortschritts-Backup (#165/#174/#181), Pfad-Brücken (#166/#179),
Kernweg-Abschluss (#183), Docs-Sync (#182), S52-D2b Staging-Auth (#159);
Menschliche Freigabe A–D (2026-08-13): Docs-Sync, Connection-Proof, lokale Schema/Migration,
Staging-Auth-Seed — Umsetzung in Folge-PRs; Production-Auth/Live-Railway-DB weiter gesperrt

~~~text
PHASE0_MASTER_BASELINE=PASS_WITH_BLOCKERS
PHASE0A_SOURCE_OF_TRUTH_SYNC=COMPLETE
BACKLOG_NORMALIZATION=COMPLETE
BASELINE_MAIN_SHA=f8bc8a5f1ca60446890e17cd38eb04f6f4f1690e
LIVE_PRODUCTION_BUILD_SHA=f8bc8a5f1ca6
LIVE_STAGING_BUILD_SHA=f8bc8a5f1ca6
LIVE_PUBLIC_URL=https://web-production-51d3c8.up.railway.app
STAGING_PUBLIC_URL=https://ki-lernportal-nim-staging.up.railway.app
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
PR129_S51D_B_DOCS_MERGED=YES
PR130_S52_B_MERGED=YES
PR131_S51D_B_REVERIFY_DOCS_MERGED=YES
PR132_S51D_B_STAGING_CREATED_DOCS_MERGED=YES
PR133_S51D_DOCS_SYNC_MERGED=YES
PR134_S52_C_MERGED=YES
PR135_UX_HELP_LABELS_MERGED=YES
PR136_DOCS_BASELINE_MERGED=YES
PR137_UX_RESET_FOCUS_MERGED=YES
PR138_S52_D_SCOPE_LOCK_MERGED=YES
PR139_SMOKE_PROGRESS_MERGED=YES
PR140_UX_RESET_DIALOG_MERGED=YES
PR141_S52_D_IMPL_PLAN_MERGED=YES
PR142_S52_D1_AUTH_ROUTES_MERGED=YES
PR144_S52_D2_LOGIN_UI_MERGED=YES
PR148_PORTAL_CLARITY_PACKAGING_NEXT_STEP_CONTENT_C_MERGED=YES
PR149_RAILWAY_NPM_FILE_DEPS_SUPERSEDED_BY_150=YES
PR150_RAILWAY_WEB_VENDOR_MERGED=YES
PR151_RAILWAY_NPM_ISOLATION_HARDENING_MERGED=YES
PR152_DOCS_SYNC_LIVE_147FB43_MERGED=YES
PR153_MICRO_PROGRESS_KERN_WEG_MERGED=YES
PR154_MASS_AUDIENCE_QA_MERGED=YES
PR155_KERN_WEG_UNIT_SORT_DOCS_MERGED=YES
PR156_KERN_WEG_WORLDS_NEXT_MOBILE_MERGED=YES
PR156_MERGE_COMMIT=9ab3513b5f1fbde34fee06e7bd44c934b0602ef8
PR157_DOCS_SYNC_9AB3513_MERGED=YES
PR157_MERGE_COMMIT=f26de16972d1caabd60e90951bd504642e987037
PR158_SPAETER_DIDACTICS_MERGED=YES
PR158_MERGE_COMMIT=fad6cc935f87bceed73218a8a5f5ddb3b875859f
PR159_S52_D2B_STAGING_AUTH_DOCS_MERGED=YES
PR159_MERGE_COMMIT=e882f4aa98643ee5cee0b1e29218574f0afd1f5d
PR161_DEEPEN_KERN_WEG_ONLY_MERGED=YES
PR161_MERGE_COMMIT=d8d46ce7180cf14450cd605c2dde41da85a680fa
PR160_DOCS_SYNC_D8D46CE_MERGED=YES
PR160_MERGE_COMMIT=7005439062db6f599c1fa1d0fddf4acb29c5bd2f
PR162_DOCS_SYNC_7005439_MERGED=YES
PR162_MERGE_COMMIT=c50adcf4889ec503340eba1d75e7771b7c27e0c8
PR163_MYSQL2_3_23_2_PIN_MERGED=YES
PR163_MERGE_COMMIT=30ff92ba00404e078d3a88318cecc4a32c7ce47c
PR91_ESLINT_CONFIG_NEXT_16_2_12_MERGED=YES
PR91_MERGE_COMMIT=c17ea230fb9e805aae530328bb9ead87bc42c809
PR165_PROGRESS_BACKUP_CLARITY_MERGED=YES
PR165_MERGE_COMMIT=e4a85dacf75d2ec0e36a48fb7d3f11e81a88d9c8
PR166_PLANNED_PATHS_ALLTAG_PROMPTING_MERGED=YES
PR166_MERGE_COMMIT=b2d0ec4700e5eb5bea1e98cb2506d975fda07f6a
PR167_DOCS_SYNC_B2D0EC4_MERGED=YES
PR167_MERGE_COMMIT=2b50b77a0ab4e26d67e9798cfcd7478f02ff6b83
PR168_DOCS_SYNC_2B50B77_MERGED=YES
PR168_MERGE_COMMIT=f65240d5698054071cb73b0293027dc2c8a56db4
PR169_UX_PLANNED_PATHS_HERO_QA_MERGED=YES
PR169_MERGE_COMMIT=326219dd514dab68d97bbc4b4e2e95a1ef942267
PR170_DOCS_SYNC_326219D_MERGED=YES
PR170_MERGE_COMMIT=fb1c0008f1b7abb3146d17d33834c00bd838d956
PR171_DOCS_SYNC_FB1C000_MERGED=YES
PR171_MERGE_COMMIT=019fa4bbf064b8048408ebf420b28ce5ced40ede
PR173_DOCS_SYNC_019FA4B_MERGED=YES
PR173_MERGE_COMMIT=b4164abbb9b685a0017861b9dd6afe1490c5fa2d
PR175_S49D_EXPLAIN_FLAKE_MERGED=YES
PR175_MERGE_COMMIT=f2b1c645e26414fcb0466a3e4146702d1062ca39
PR174_BACKUP_DEEPLINK_MERGED=YES
PR174_MERGE_COMMIT=cb1d49379a643e3e661463d763e385f077c5a0b4
PR176_DOCS_SYNC_CB1D493_MERGED=YES
PR176_MERGE_COMMIT=eb4c285062b97695b87a64baa89a607680bf5a12
PR178_DOCS_SYNC_EB4C285_MERGED=YES
PR178_MERGE_COMMIT=3a1cfea78f10e401307c1870dbd5789f1eb8a570
PR179_WEITERE_PFADE_HELP_TIP_MERGED=YES
PR179_MERGE_COMMIT=8610251433e4859abff542af6ea9377c5c2c05dc
PR180_DOCS_SYNC_8610251_MERGED=YES
PR180_MERGE_COMMIT=3013db229e6727bc293cd3e7273ef03bd5103499
PR181_BACKUP_HASH_FOCUS_MERGED=YES
PR181_MERGE_COMMIT=cb6883670fe952f969d3c58f0a1578c71242a85e
PR182_DOCS_SYNC_CB68836_MERGED=YES
PR182_MERGE_COMMIT=a20071b75dbab55858be42490028edc19eea0a41
PR183_KERN_WEG_COMPLETE_MERGED=YES
PR183_MERGE_COMMIT=f8bc8a5f1ca60446890e17cd38eb04f6f4f1690e
HUMAN_FREIGABE_A_DOCS_SYNC=YES
HUMAN_FREIGABE_B_CONNECTION_PROOF=YES
HUMAN_FREIGABE_C_SCHEMA_LOCAL_MIGRATE=YES
HUMAN_FREIGABE_D_STAGING_AUTH_SEED=YES
HUMAN_FREIGABE_ABCD_AT=2026-08-13
S51B_B_CONNECTION_PROOF_AUTHORIZED=YES
S51B_C_SCHEMA_AUTHORIZED=YES
DATABASE_CONNECTION_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
MIGRATION_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
S52_STAGING_AUTH_SEED_AUTHORIZED=YES
RAILWAY_DATABASE_PROHIBITED=YES
PRODUCTION_DATABASE_PROHIBITED=YES
LIVE_MIGRATE_RAILWAY=NO
AUTH_RUNTIME_FLAG_FLIP_PRODUCTION=NO
PRODUCTION_USERS=NO
HUMAN_AGENCY_FREIGABE_MERGE_DEPLOY_CONCEPT_DEMO=YES
S51D_HUMAN_FREIGABE=YES
S51D_A_SCOPE_AUTHORIZED=YES
S51D_B_SCOPE_DOCUMENTED=YES
S51D_B_GITHUB_REVERIFY_SCRIPTED=YES
S51D_B_DASHBOARD_REVERIFY_COMPLETE=YES
S51D_B_EXECUTED=YES
STAGING_ENVIRONMENT_CREATED=YES
STAGING_PUBLIC_DOMAIN=ki-lernportal-nim-staging.up.railway.app
PRODUCTION_AUTODEPLOY=DISABLED
PRODUCTION_WAIT_FOR_CI=ON
PRODUCTION_ROOT_DIRECTORY=apps/web
PRODUCTION_BUILD=npm_with_apps_web_vendor
STAGING_ROOT_DIRECTORY=/
STAGING_CONFIG_SOURCE=/railway.staging.json
APPARENT_AUTODEPLOY_ON_MAIN_VIA_GITHUB=EVENTS_STILL_OBSERVED_LIVE_SHA_FOLLOWS_CI_GREEN
S52_A_IMPLEMENTATION_AUTHORIZED=YES
S52_B_IMPLEMENTATION_AUTHORIZED=YES
S52_C_SCOPE_AUTHORIZED=YES
S52_C_IMPLEMENTATION_AUTHORIZED=SCOPE_LOCK_ONLY
S52_D_SCOPE_AUTHORIZED=YES
S52_D_IMPLEMENTATION_AUTHORIZED=YES
S52_D1_ROUTES_AUTHORIZED=YES
S52_D1_INTEGRATED_TO_MAIN=YES
S52_D1_MERGE_COMMIT=d91514f1f08ad343cbd0d6e1e63e81833676ffd5
S52_D2_LOGIN_UI_AUTHORIZED=YES
S52_D2_CODE_CHANGED=YES
S52_D_IMPLEMENTATION_PLAN_DOCUMENTED=YES
AUTH_RUNTIME_AUTHORIZED=YES
AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY
AUTH_WEB_SURFACE=D2_LOGIN_UI_BEHIND_FLAG
LOGIN_UI=AUTHORIZED_BEHIND_FLAG
LOGIN_UI_IMPLEMENTED=YES
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
S52_D2B_STAGING_FLAG_DECISION_DOCUMENTED=YES
S52_D2B_STAGING_FLAG_HTTP_VERIFIED=YES
S52_D2B_STAGING_FLAG_HTTP_VERIFIED_AT=2026-08-12
AUTH_RUNTIME_FLAG_FLIP_PRODUCTION=NO
S51B_C_SCHEMA_AUTHORIZED=YES
DATABASE_CONNECTION_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
MIGRATION_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
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
- [S52-C Auth-Web Boundary Scope-Lock](architecture/S52_C_IMPLEMENTATION_SCOPE.md)
- [S52-D Auth-Web Implementation Scope-Lock](architecture/S52_D_IMPLEMENTATION_SCOPE.md)
- [S52-D Auth-Web Implementierungsplan](architecture/S52_D_IMPLEMENTATION_PLAN.md)
- [S52-D2b Staging AUTH_RUNTIME Deploy-Entscheid](architecture/S52_D2B_STAGING_AUTH_RUNTIME.md)
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

Aktueller Live- und Staging-Nachweis (HTTP-Probe 2026-08-12):

~~~text
CURRENT_PRODUCTION_AUTODEPLOY=DISABLED
CURRENT_WAIT_FOR_CI=ON
CURRENT_CONFIG_SOURCE=DASHBOARD_NO_RAILWAY_JSON
CURRENT_ROOT_DIRECTORY=apps/web
CURRENT_PUBLIC_DOMAIN=web-production-51d3c8.up.railway.app
DOCS_BASELINE_MAIN_SHA=f8bc8a5f1ca60446890e17cd38eb04f6f4f1690e
RAILWAY_PROJECT_ID=f69a0054-8cd9-4481-a461-bd17ddde296d
RAILWAY_PRODUCTION_ENVIRONMENT_ID=f30e6e3b-60b5-4b3e-8949-2ca868f4e2da
APPARENT_AUTODEPLOY_ON_MAIN_VIA_GITHUB=EVENTS_STILL_OBSERVED_LIVE_SHA_FOLLOWS_CI_GREEN
S51D_B_DASHBOARD_REVERIFY_COMPLETE=YES
STAGING_ENVIRONMENT_CREATED=YES
STAGING_PUBLIC_DOMAIN=ki-lernportal-nim-staging.up.railway.app
LIVE_BUILD_SHA_OBSERVED=f8bc8a5f1ca6
STAGING_BUILD_SHA_OBSERVED=f8bc8a5f1ca6
LIVE_READY_DATABASE=not_configured
PRODUCTION_NPM_VENDOR_PACKAGES=apps/web/vendor
RAILWAY_WEB_NPM_ISOLATION_GATE=YES
S52_D2B_STAGING_FLAG_HTTP_VERIFIED=YES
~~~

Hinweis zur Persistenz-Wahrheit: S51B-C1/C2 sind **lokal** im Repo integriert
(Pilot-Schema, generierte Migration, disposable MySQL-Proof). Menschliche Freigabe
A–D (2026-08-13) erlaubt disposable lokale Connection/Migration und Staging-Auth-Seed
in Folge-PRs. Railway-/Production-DB und Production-Auth bleiben gesperrt.

S51D-B (2026-08-10): GitHub Deployments zeigten wiederholte Production-Deploys
durch `railway-app[bot]` nach `main`-Merges.

S51D-B Dashboard-Reverify (2026-08-11, menschlich): Production-Autodeploy
wurde **deaktiviert**, Wait for CI / Check Suites auf **true** gesetzt.
Live-Probes gegen `web-production-51d3c8.up.railway.app` waren grün
(`/health`, `/live`, `/ready`, `/version`).

S51D-B Staging-Anlage (2026-08-11, menschlich): Empty Environment `staging`,
Root `/`, Config `/railway.staging.json`, Autodeploy DISABLED, Wait for CI ON,
Domain `ki-lernportal-nim-staging.up.railway.app`. Live-Probes Staging waren
grün. Siehe
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
S51B_C_SCHEMA_AUTHORIZED=YES
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
S51B_C_SCHEMA_AUTHORIZED=YES
DATABASE_CONNECTION_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
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
S51B_B_CONNECTION_PROOF_AUTHORIZED=YES
S51B_B_CONNECTION_PROOF_IMPLEMENTED=YES
HUMAN_FREIGABE_B_CONNECTION_PROOF=YES
HUMAN_FREIGABE_ABCD_AT=2026-08-13
S51B_C_SCHEMA_AUTHORIZED=YES
DATABASE_CONNECTION_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
MIGRATION_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
RAILWAY_DATABASE_PROHIBITED=YES
LIVE_MIGRATE_RAILWAY=NO

RAILWAY_STAGING_AUTHORIZED=NO
PR68_MERGED=YES
PR105_OPEN_DRAFT=YES
PR108_DESIGN_CONTENT_FOUNDATION=OPEN
HUMAN_AGENCY_FREIGABE_MERGE_DEPLOY_CONCEPT_DEMO=YES
S51B_C_SCHEMA_AUTHORIZED=YES
DEPLOY_AUTHORIZED=YES_FOR_CONCEPT_DEMO_AFTER_CI_GREEN
PRODUCTION_CHANGE_AUTHORIZED=YES_FOR_CONCEPT_DEMO_CONTENT_SLICE_ONLY

PRODUCT_CODE_CHANGE_REQUIRES_SEPARATE_AUTHORIZATION=NO_FOR_APPROVED_CONTENT_SLICE
FUTURE_GIT_ACTIONS_REQUIRE_SEPARATE_AUTHORIZATION=NO_FOR_APPROVED_CONTENT_SLICE
FUTURE_RAILWAY_ACTIONS_REQUIRE_CURRENT_READ_ONLY_EVIDENCE=YES
FUTURE_DEPLOYMENT_ACTIONS_REQUIRE_SEPARATE_AUTHORIZATION=NO_FOR_APPROVED_CONCEPT_DEMO
~~~
