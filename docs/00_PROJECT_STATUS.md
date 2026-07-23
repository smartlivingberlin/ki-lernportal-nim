# Projektstatus: KI-Lernportal NIM

**Stand:** 23. Juli 2026
**Status:** S50B-R3, S51A, S51B-A, der S51B-B-Scope-Lock und das lokale S51B-B-MySQL-/Drizzle-Adapterfundament sind in `main` integriert; echte Datenbankverbindungen, S51B-C, Schema, Migration, Railway und Deployment bleiben separat freigabepflichtig
**Für diesen Status maßgebliche Integrationen:** PR #73, #74, #76, #77, #78, #79, #81 und #82, jeweils per Squash-Merge

## Verbindliche Einordnung

Das menschlich freigegebene und in `main` integrierte S50B-R3-Zielbild steht in:

- [S50B-R3 Final Architecture Approval Package](architecture/S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md)
- [Exakter S51A-Implementierungsscope](architecture/S51A_IMPLEMENTATION_SCOPE.md)
- [S51B-Persistenz-Scope und Integrationsstatus](architecture/S51B_IMPLEMENTATION_SCOPE.md)
- [S51B-B Adapter-Scope-Lock](architecture/S51B_B_IMPLEMENTATION_SCOPE.md)
- [Zielarchitektur](architecture/ARCHITECTURE_TARGET.md)
- [Package-DAG](architecture/PACKAGE_DAG.md)
- [Plattformverträge](architecture/PLATFORM_CONTRACTS.md)
- [MVP-Scope](architecture/MVP_SCOPE.md)
- [Premium-Transfer-Ledger](architecture/PREMIUM_TRANSFER_LEDGER.md)

[S50B-R2](architecture/S50B_R2_SOURCE_OF_TRUTH.md) bleibt als historische
Architekturgrundlage erhalten.

Bei aktuellen Architektur- oder Freigabewidersprüchen hat das
S50B-R3-Freigabepaket Vorrang.

## Ergänzte Architekturverträge

S50B-R3 ergänzt acht zuvor fehlende Verträge:

1. Identitäts- und Session-Lifecycle;
2. Datenklassifizierung, Aufbewahrung und Löschung;
3. Learning Domain;
4. Content- und Assessment-Revisionen;
5. Observability und interne SLOs;
6. Scope- und Organisationsnaht;
7. Jobs und Transactional Outbox;
8. Search.

Alle zehn neu erstellten S50B-R3-Dokumente wurden lokal auf Hashintegrität,
Struktur, relative Links und Freigabemarker geprüft.

## Nachgewiesener Produkt-Istzustand

Vorhanden sind:

- eine produktionsfähig baubare Next.js-Anwendung unter `apps/web`;
- ein S51A-Workspace mit acht privaten und gehärteten Package-Grenzen;
- integrierte S51B-A- und S51B-B-Persistenz- beziehungsweise Runtime-Scope-Locks;
- ein integriertes lokales S51B-B-MySQL-/Drizzle-Adapterfundament mit
  begrenzter Konfiguration, Lazy Initialization und Fake-/Unit-Tests;
- zwölf strukturierte Anfängerlektionen;
- lokale Suche und lokaler Lernfortschritt;
- zwölf Übungen und 36 Selbstprüfungsfragen;
- Content-, Quellen-, Accessibility-, Governance- und Supply-Chain-Gates;
- ein reproduzierbarer Next.js-Standalone-Build;
- eine öffentlich erreichbare Railway-Konzeptdemo.

Die Konzeptdemo ist kein Nachweis für vollständige Produktionsreife.

## Noch nicht vorhanden oder freigegeben

Nicht vorhanden oder nicht freigegeben sind insbesondere:

- produktive Benutzerkonten;
- produktive MySQL-/Drizzle-Persistenz;
- Migrationen;
- widerrufbare Serversitzungen;
- Rollen-, Scope- und Ownership-Persistenz;
- Admin- und Publikationssystem;
- serverseitiger Lernfortschritt;
- Hintergrundworker oder Transactional Outbox;
- serverseitige Search-Laufzeit;
- produktive KI-/RAG-Laufzeit;
- isoliertes Railway-Staging;
- kontinuierliches Monitoring;
- Backup-/Restore-Nachweis;
- Payment, B2B, Multi-Tenant oder White Label.

## Integrierter Dokumentationsstand

Das vollständige S50B-R3-Architekturpaket umfasst 23 Markdown-Dateien. Es
wurde am 18. Juli 2026 durch den autorisierten Squash-Merge von PR #73 unter
`cab2745c9cfea8a4d6418d866972cef6f982e55b` in `main` integriert.

Der danach erforderliche Tatsachenabgleich wurde am 19. Juli 2026 durch den
autorisierten Squash-Merge von PR #74 unter
`f8ba5da1b7652447a93511e377c1891ff4470754` in `main` integriert.

Das S51A-Package-Skeleton wurde durch PR #76 unter
`4bd8abeceac7e7b6bcd3b6cf4852653a8d0942c8` integriert. Der
S51B-A-Persistenz-Scope-Lock folgte durch PR #77 unter
`fbdedec8f3e67ce99678c41779b99b22be506710`; der zugehörige
Post-Merge-Tatsachenabgleich wurde durch PR #78 unter
`ebaca10d7cbcee69587f5a87391e8b5b298c75f8` integriert.

Der S51B-B-Dokumentations- und Runtime-Scope-Lock sowie der minimale
transitive Audit-Fix wurden am 21. Juli 2026 durch PR #79 unter
`c37703fdd4d2df152857e4834ab9cf01351a9cfb` integriert. Der geprüfte
PR-Head war `0fe754e9225bf3e6e2e3e8504aa88a11850daa01`. Die
GitHub-CI-Läufe #164, #171, #174 und #177 waren erfolgreich.

Das lokale S51B-B-MySQL-/Drizzle-Adapterfundament wurde am 23. Juli 2026
durch den autorisierten Squash-Merge von PR #82 unter
`0f126ab2eb2b7a87f8a8ee85b611ec2ea410bcd5` in `main` integriert.
Der geprüfte PR-Head war
`b76d128fbe163708f4767c4ecc737d838188b0ce`. PR-CI #184 war
erfolgreich. Der spätere Main-CI-Lauf #191 auf
`fd7b773d2442bc7f17b0c9c9b5108c2288d91607` war ebenfalls erfolgreich
und führte den S51B-B-Fake-Test als festen CI-Schritt aus.

PR #82 führte keine echte Datenbankverbindung, keine Query, keine Tabelle,
kein Drizzle-Schema, keine Migration, keinen Seed und keine Railway- oder
Deploymentänderung aus.

PR #74 betraf ausschließlich:

- `AGENTS.md`;
- `README.md`;
- `docs/00_PROJECT_STATUS.md`;
- `docs/architecture/ARCHITECTURE_TARGET.md`;
- `docs/architecture/PLATFORM_CONTRACTS.md`;
- `docs/architecture/S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md`.

CI #159 war auf dem geprüften PR-Head erfolgreich. Der durch den Merge auf
`main` ausgelöste CI-Lauf #160 war ebenfalls erfolgreich.

PR #74 und diese Abschlusskorrektur sind ausschließlich
dokumentarisch. Sie verändern keinen Produktcode und keine Abhängigkeiten.

## GitHub-, Railway- und Produktionsgrenze

PR #73, #74, #76, #77, #78 und #79 sind abgeschlossen und jeweils per
Squash-Merge in `main` integriert.

PR #73 wurde am 18. Juli 2026 unter
`cab2745c9cfea8a4d6418d866972cef6f982e55b` integriert.

PR #74 wurde am 19. Juli 2026 unter
`f8ba5da1b7652447a93511e377c1891ff4470754` integriert. Der geprüfte
PR-Head war `55854a2a70aa80952fef569af56c5db925c0aa74`. Der zugehörige
Remote-Branch blieb nach dem Merge erhalten.

Vor dem Merge von PR #73 war im Railway-Dashboard read-only bestätigt, dass
Production-Autodeploy deaktiviert, der verbundene Branch `main` und
„Wait for CI“ aktiviert waren. Diese Angaben beschreiben ausschließlich den
damals geprüften Zustand.

Die Post-Merge-Prüfung von PR #74 bestätigte:

- CI #160 auf dem Squash-Commit: erfolgreich;
- GitHub-Deployments für den Squash-Commit: null;
- Railway-Deployreferenzen im GitHub-Workflow: null;
- Railway-Schreib- oder Deploybefehle innerhalb der geprüften Sequenz: keine.

Die Railway-CLI konnte den aktuell verknüpften Railway-Kontext bei der
Post-Merge-Prüfung nicht auslesen. Der gegenwärtige Railway-Autodeploy-,
Deployment- und Produktionszustand wird deshalb bewusst nicht als erneut
bestätigt dargestellt.

Vor jeder zukünftigen Railway-, Deployment- oder Produktionsentscheidung muss
der dann aktuelle Railway-Dashboardzustand erneut read-only geprüft werden.

## Dauerhafte Arbeits- und Freigabegrenzen

1. Jede weitere Arbeit beginnt auf einem neuen kleinen Branch vom dann aktuellen `origin/main`; abgeschlossene PR-Branches werden nicht als neue Entwicklungsbasis fortgeführt.
2. S51A, S51B-A, der S51B-B-Scope-Lock und das lokale S51B-B-Adapterfundament sind integriert.
3. Echte Datenbankverbindungen, Queries, Tabellen, Drizzle-Schemas, `drizzle-kit`, Migrationen, Seeds und Testdatenbanken beginnen erst nach einer neuen ausdrücklichen S51B-C- beziehungsweise Verbindungsfreigabe.
4. Git-, Railway-, Datenbank-, Deployment- und Produktionsaktionen bleiben jeweils separat freigabepflichtig.
5. Vor jeder zukünftigen Mergeentscheidung werden Head, Base-Freshness, CI, Review-Threads und Dateiscope erneut read-only geprüft.

## Stabiler Abschluss- und Freigabestatus

Die folgenden Marker beschreiben abgeschlossene historische Tatsachen und
dauerhafte Freigabegrenzen. Sie enthalten bewusst keine Angabe zu einem
aktuellen Arbeitsbranch, einem jeweils aktuellen `main`-Head oder einer
angeblich noch ausstehenden Commit-, Push-, PR- oder Merge-Aktion.

~~~text
S50B_R3_PACKAGE_COMPLETE=YES
S50B_R3_PACKAGE_APPROVED=YES
S50B_R3_DOCUMENT_INTEGRATION_COMPLETE=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
HUMAN_ARCHITECTURE_DECISION=APPROVE_ARCHITECTURE
HUMAN_ARCHITECTURE_DECISION_DATE=2026-07-17

PR73_MERGED=YES
PR73_MERGE_METHOD=SQUASH
PR73_MERGE_COMMIT=cab2745c9cfea8a4d6418d866972cef6f982e55b
PR73_MERGED_AT=2026-07-18T09:04:49+02:00

PR74_MERGED=YES
PR74_MERGE_METHOD=SQUASH
PR74_MERGED_HEAD=55854a2a70aa80952fef569af56c5db925c0aa74
PR74_MERGE_COMMIT=f8ba5da1b7652447a93511e377c1891ff4470754
PR74_MERGED_AT=2026-07-19T12:57:40+02:00
PR74_REMOTE_BRANCH_RETAINED_AFTER_MERGE=YES

PR76_MERGED=YES
PR76_MERGE_METHOD=SQUASH
PR76_MERGED_HEAD=fdccc81ec2d49e1a14bfb2f187ebb829bdba1f57
PR76_MERGE_COMMIT=4bd8abeceac7e7b6bcd3b6cf4852653a8d0942c8
PR76_MERGED_AT=2026-07-20T00:27:55+02:00
PR76_PRE_MERGE_CI_RUN_NUMBER=164
PR76_PRE_MERGE_CI_CONCLUSION=SUCCESS

PR77_MERGED=YES
PR77_MERGE_METHOD=SQUASH
PR77_MERGED_HEAD=09416fcb004b47498f3880387f64c87d4eef8883
PR77_MERGE_COMMIT=fbdedec8f3e67ce99678c41779b99b22be506710
PR77_MERGED_AT=2026-07-20T16:40:06+02:00
PR77_PRE_MERGE_CI_RUN_NUMBER=171
PR77_PRE_MERGE_CI_CONCLUSION=SUCCESS

PR78_MERGED=YES
PR78_MERGE_METHOD=SQUASH
PR78_MERGED_HEAD=8e57b7c826b482ff14592111b1b4c2e47c69ff48
PR78_MERGE_COMMIT=ebaca10d7cbcee69587f5a87391e8b5b298c75f8
PR78_MERGED_AT=2026-07-20T23:19:33+02:00
PR78_PRE_MERGE_CI_RUN_NUMBER=174
PR78_PRE_MERGE_CI_CONCLUSION=SUCCESS

PR79_MERGED=YES
PR79_MERGE_METHOD=SQUASH
PR79_MERGED_HEAD=0fe754e9225bf3e6e2e3e8504aa88a11850daa01
PR79_MERGE_COMMIT=c37703fdd4d2df152857e4834ab9cf01351a9cfb
PR79_MERGED_AT=2026-07-21T22:38:53+02:00
PR79_PRE_MERGE_CI_RUN_NUMBER=177
PR79_PRE_MERGE_CI_CONCLUSION=SUCCESS
PR79_TRANSITIVE_AUDIT_FIX_INTEGRATED=YES
PR79_APPLICATION_RUNTIME_CHANGED=NO
PR79_DATABASE_RUNTIME_IMPLEMENTED=NO

PR74_PRE_MERGE_CI_RUN_NUMBER=159
PR74_PRE_MERGE_CI_CONCLUSION=SUCCESS
PR74_POST_MERGE_CI_RUN_NUMBER=160
PR74_POST_MERGE_CI_CONCLUSION=SUCCESS

PR74_MERGED_SCOPE_DOCUMENTATION_ONLY=YES
PR74_MERGED_SCOPE_PRODUCT_CODE_CHANGED=NO
PR74_MERGED_SCOPE_DEPENDENCIES_CHANGED=NO

PR73_PRE_MERGE_PRODUCTION_AUTODEPLOY=DISABLED
PR74_POST_MERGE_VERIFICATION_DATE=2026-07-19
PR74_POST_MERGE_VERIFICATION_GITHUB_DEPLOYMENT_COUNT=0
PR74_POST_MERGE_VERIFICATION_GITHUB_WORKFLOW_RAILWAY_REFERENCE_COUNT=0
PR74_POST_MERGE_VERIFICATION_RAILWAY_CLI_EVIDENCE_AVAILABLE=NO
PR74_SEQUENCE_RAILWAY_WRITE_COMMAND_EXECUTED=NO
PR74_SEQUENCE_DEPLOY_COMMAND_EXECUTED=NO

S51A_SCOPE_DOCUMENTED=YES
S51A_INTEGRATED_TO_MAIN=YES
S51B_A_INTEGRATED_TO_MAIN=YES
S51B_B_SCOPE_LOCK_INTEGRATED_TO_MAIN=YES
S51B_B_IMPLEMENTATION_AUTHORIZED_HISTORICALLY=YES
S51B_B_DEPENDENCY_INSTALL_AUTHORIZED_HISTORICALLY=YES
S51B_B_LOCAL_RUNTIME_IMPLEMENTATION_AUTHORIZED_HISTORICALLY=YES
S51B_B_LOCAL_IMPLEMENTATION_EXECUTED=YES
S51B_B_IMPLEMENTATION_BRANCH=feat/s51b-b-mysql-drizzle-adapter-foundation-20260721
S51B_B_IMPLEMENTATION_BASE=b7811f25b618b48281f615fe7fbac629e20811a5
S51B_B_DEPENDENCIES_INSTALLED=drizzle-orm@0.45.2,mysql2@3.23.1
S51B_B_RUNTIME_CONFIG_IMPLEMENTED=YES
S51B_B_LAZY_ADAPTER_IMPLEMENTED=YES
S51B_B_FAKE_TESTS_IMPLEMENTED=YES
S51B_B_CI_FAKE_TEST_EXECUTION_CONFIGURED=YES
S51B_B_LOCAL_ACCEPTANCE=PASS
S51B_B_LOCAL_ACCEPTANCE_DATE=2026-07-22
PR82_MERGED=YES
PR82_MERGE_METHOD=SQUASH
PR82_MERGED_HEAD=b76d128fbe163708f4767c4ecc737d838188b0ce
PR82_MERGE_COMMIT=0f126ab2eb2b7a87f8a8ee85b611ec2ea410bcd5
PR82_MERGED_AT=2026-07-23T11:46:14+02:00
PR82_PRE_MERGE_CI_RUN_NUMBER=184
PR82_PRE_MERGE_CI_CONCLUSION=SUCCESS
S51B_B_IMPLEMENTATION_COMMIT_CREATED_HISTORICALLY=YES
S51B_B_IMPLEMENTATION_PUSH_EXECUTED_HISTORICALLY=YES
S51B_B_IMPLEMENTATION_PR_CREATED_HISTORICALLY=YES
S51B_B_IMPLEMENTATION_INTEGRATED_TO_MAIN=YES
S51B_B_CONNECTION_PROOF_AUTHORIZED=NO
S51B_C_SCHEMA_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
MIGRATION_AUTHORIZED=NO
PRODUCT_CODE_CHANGE_REQUIRES_SEPARATE_AUTHORIZATION=YES
FUTURE_GIT_ACTIONS_REQUIRE_SEPARATE_AUTHORIZATION=YES
FUTURE_RAILWAY_ACTIONS_REQUIRE_CURRENT_READ_ONLY_EVIDENCE=YES
FUTURE_DEPLOYMENT_ACTIONS_REQUIRE_SEPARATE_AUTHORIZATION=YES

PR74_POST_MERGE_STABLE_STATUS_LOCAL_AUTHORIZED=YES
PR74_POST_MERGE_STABLE_STATUS_LOCAL_AUTHORIZATION=AUTHORIZE_PR74_POST_MERGE_STABLE_STATUS_LOCAL_ONLY
PR74_POST_MERGE_STABLE_STATUS_LOCAL_EXECUTED=YES
~~~
