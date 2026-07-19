# Projektstatus: KI-Lernportal NIM

**Stand:** 19. Juli 2026
**Status:** S50B-R3-Architekturpaket und nachgelagerter Dokumentabgleich abgeschlossen und in `main` integriert; weitere Produkt-, S51A- und Betriebsentscheidungen bleiben separat freigabepflichtig
**Abgeschlossene Integrationen:** PR #73 und PR #74, jeweils per Squash-Merge

## Verbindliche Einordnung

Das menschlich freigegebene und in `main` integrierte S50B-R3-Zielbild steht in:

- [S50B-R3 Final Architecture Approval Package](architecture/S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md)
- [Exakter S51A-Implementierungsscope](architecture/S51A_IMPLEMENTATION_SCOPE.md)
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
- zwölf strukturierte Anfängerlektionen;
- lokale Suche und lokaler Lernfortschritt;
- zwölf Übungen und 36 Selbstprüfungsfragen;
- Content-, Quellen-, Accessibility-, Governance- und Supply-Chain-Gates;
- ein reproduzierbarer Next.js-Standalone-Build;
- eine öffentlich erreichbare Railway-Konzeptdemo.

Die Konzeptdemo ist kein Nachweis für vollständige Produktionsreife.

## Noch nicht vorhanden oder freigegeben

Nicht vorhanden oder nicht freigegeben sind insbesondere:

- S51A-Package-Skeleton;
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

PR #73 und PR #74 sind abgeschlossen und jeweils per Squash-Merge in `main`
integriert.

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
2. S51A-Scope und S51A-Implementierung bleiben getrennte menschliche Entscheidungen.
3. Produktcode beginnt erst nach ausdrücklicher S51A-Implementierungsfreigabe.
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
S51A_IMPLEMENTATION_REQUIRES_SEPARATE_HUMAN_APPROVAL=YES
PRODUCT_CODE_CHANGE_REQUIRES_SEPARATE_AUTHORIZATION=YES
FUTURE_GIT_ACTIONS_REQUIRE_SEPARATE_AUTHORIZATION=YES
FUTURE_RAILWAY_ACTIONS_REQUIRE_CURRENT_READ_ONLY_EVIDENCE=YES
FUTURE_DEPLOYMENT_ACTIONS_REQUIRE_SEPARATE_AUTHORIZATION=YES

PR74_POST_MERGE_STABLE_STATUS_LOCAL_AUTHORIZED=YES
PR74_POST_MERGE_STABLE_STATUS_LOCAL_AUTHORIZATION=AUTHORIZE_PR74_POST_MERGE_STABLE_STATUS_LOCAL_ONLY
PR74_POST_MERGE_STABLE_STATUS_LOCAL_EXECUTED=YES
~~~
