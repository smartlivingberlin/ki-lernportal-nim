# Projektstatus: KI-Lernportal NIM

**Stand:** 19. Juli 2026
**Status:** S50B-R3 menschlich freigegeben und durch PR #73 in `main` integriert; nachgelagerter Dokumentabgleich dokumentiert, weitere Git- und Betriebsaktionen separat freigabepflichtig
**Branch:** `docs/s50b-r3-post-merge-sync-20260718`
**Main-HEAD:** `cab2745c9cfea8a4d6418d866972cef6f982e55b`
**PR #73:** am 18. Juli 2026 per Squash-Merge abgeschlossen

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

Das vollständige S50B-R3-Paket umfasst 23 Markdown-Dateien. Es wurde mit dem
autorisierten Squash-Merge von PR #73 unter `cab2745c9cfea8a4d6418d866972cef6f982e55b` in `main`
integriert.

PR #74 dokumentiert den abgeschlossenen Post-Merge-Abgleich für ausschließlich
sechs Dokumente, deren Tatsachenbeschreibungen zuvor noch den Zustand vor dem
Merge wiedergaben:

- `AGENTS.md`;
- `README.md`;
- `docs/00_PROJECT_STATUS.md`;
- `docs/architecture/ARCHITECTURE_TARGET.md`;
- `docs/architecture/PLATFORM_CONTRACTS.md`;
- `docs/architecture/S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md`.

S51A, Produktcode, Abhängigkeiten, Datenbank, Railway und Production werden
durch diesen Dokumentabgleich nicht verändert.

PR #74 wurde zunächst als Draft erstellt und nach erfolgreicher CI separat auf
Ready for Review gestellt. Diese Umstellung erteilt keine Merge-, S51A-,
Railway-, Datenbank-, Deploy- oder Produktionsfreigabe.

## GitHub-, Railway- und Produktionsgrenze

PR #73 ist geschlossen und wurde am 18. Juli 2026 per Squash-Merge in `main`
integriert.

~~~text
PR73_MERGED=YES
PR73_MERGE_METHOD=SQUASH
PR73_MERGE_COMMIT=cab2745c9cfea8a4d6418d866972cef6f982e55b
PR73_MERGED_AT=2026-07-18T09:04:49+02:00
MAIN_PREVIOUS_HEAD=4173f2d935e3145142dce539b399bf8b9d77ee79
~~~

CI #154 war für den geprüften PR-Head vollständig erfolgreich.

Unmittelbar vor dem Merge wurde im Railway-Dashboard read-only bestätigt:

~~~text
PRODUCTION_AUTODEPLOY=DISABLED
AUTODEPLOY_BUTTON=ENABLE
CONNECTED_BRANCH=main
WAIT_FOR_CI=ENABLED
~~~

Daher löste der Merge kein automatisches Railway-Deployment aus. Production
blieb auf dem vorherigen Anwendungscode. PR #68 bleibt ein getrennter
Railway-Readiness-PR und ist nicht Teil dieses Dokumentationspakets.

## Weiterer kontrollierter Ablauf

1. Vor jeder Mergeentscheidung werden aktueller Head, Base-Freshness, CI, Review-Threads und der exakte Dokumentationsscope read-only geprüft.
2. Ein Merge erfolgt nur nach separater menschlicher Freigabe und mit erwarteter Head-SHA; für diesen Dokumentations-PR ist Squash vorgesehen.
3. Nach einem genehmigten Merge werden aktueller `main`, Integrationscommit und Railway-/Autodeploy-Grenzen read-only geprüft.
4. S51A-Scope und S51A-Implementierung bleiben separate Entscheidungen.
5. Produktcode beginnt erst nach ausdrücklicher S51A-Implementierungsfreigabe.

## Aktueller Freigabestatus

~~~text
S50B_R3_PACKAGE_COMPLETE=YES
S50B_R3_PACKAGE_APPROVED=YES
S50B_R3_DOCUMENT_INTEGRATION_COMPLETE=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
HUMAN_ARCHITECTURE_DECISION=APPROVE_ARCHITECTURE
HUMAN_ARCHITECTURE_DECISION_DATE=2026-07-17
S50B_R3_INTEGRATED_TO_MAIN=YES
PR73_MERGED=YES
PR73_MERGE_METHOD=SQUASH
PR73_MERGE_COMMIT=cab2745c9cfea8a4d6418d866972cef6f982e55b
PR73_MERGED_AT=2026-07-18T09:04:49+02:00
PRODUCTION_AUTODEPLOY=DISABLED
DEPLOY_EXECUTED=NO
RAILWAY_CHANGED=NO
DATABASE_CHANGED=NO
PRODUCTION_CHANGED=NO
POST_MERGE_DOC_SYNC_LOCAL_AUTHORIZED=YES
POST_MERGE_DOC_SYNC_LOCAL_EXECUTED=YES
POST_MERGE_DOC_SYNC_COMMIT_AUTHORIZED=YES
POST_MERGE_DOC_SYNC_COMMIT_AUTHORIZATION=AUTHORIZE_POST_MERGE_DOC_SYNC_COMMIT_ONLY@GitHub
POST_MERGE_DOC_SYNC_COMMIT_EXECUTED=YES
POST_MERGE_DOC_SYNC_PUSH_AUTHORIZED=YES
POST_MERGE_DOC_SYNC_PUSH_AUTHORIZATION=AUTHORIZE_POST_MERGE_DOC_SYNC_PUSH_ONLY@GitHub@GitHub
POST_MERGE_DOC_SYNC_PUSH_EXECUTED=YES
POST_MERGE_DOC_SYNC_PR_AUTHORIZED=YES
POST_MERGE_DOC_SYNC_PR_AUTHORIZATION=AUTHORIZE_POST_MERGE_DOC_SYNC_DRAFT_PR_ONLY@GitHub@GitHub
POST_MERGE_DOC_SYNC_PR_CREATED=YES
POST_MERGE_DOC_SYNC_PR_NUMBER=74
POST_MERGE_DOC_SYNC_PR_CREATED_STATE=OPEN
POST_MERGE_DOC_SYNC_PR_CREATED_AS_DRAFT=YES
POST_MERGE_DOC_SYNC_PR_INITIAL_HEAD=e9ebc34331c46e21c89c1c7e7012ca2276c1cacb
POST_MERGE_DOC_SYNC_INITIAL_CI_RUN_NUMBER=156
POST_MERGE_DOC_SYNC_INITIAL_CI_RUN_ID=29647064323
POST_MERGE_DOC_SYNC_INITIAL_CI_STATUS=COMPLETED
POST_MERGE_DOC_SYNC_INITIAL_CI_CONCLUSION=SUCCESS
PR74_STATUS_SYNC_LOCAL_AUTHORIZED=YES
PR74_STATUS_SYNC_LOCAL_AUTHORIZATION=AUTHORIZE_PR74_STATUS_SYNC_LOCAL_ONLY
PR74_STATUS_SYNC_LOCAL_EXECUTED=YES
PR74_STATUS_SYNC_COMMIT_AUTHORIZED=YES
PR74_STATUS_SYNC_COMMIT_AUTHORIZATION=AUTHORIZE_PR74_STATUS_SYNC_COMMIT_ONLY@GitHub@GitHub
PR74_STATUS_SYNC_COMMIT_EXECUTED=YES
PR74_STATUS_SYNC_COMMIT_SUBJECT=docs: record PR 74 draft and initial CI evidence
POST_MERGE_DOC_SYNC_READY_FOR_REVIEW_AUTHORIZED=YES
POST_MERGE_DOC_SYNC_READY_FOR_REVIEW_AUTHORIZATION=AUTHORIZE_PR74_READY_FOR_REVIEW_ONLY@GitHub
POST_MERGE_DOC_SYNC_READY_FOR_REVIEW_EXECUTED=YES
PR74_READY_STATUS_SYNC_LOCAL_AUTHORIZED=YES
PR74_READY_STATUS_SYNC_LOCAL_AUTHORIZATION=AUTHORIZE_PR74_READY_STATUS_SYNC_LOCAL_ONLY
PR74_READY_STATUS_SYNC_LOCAL_EXECUTED=YES
PR74_FINAL_STATUS_TRUTH_SYNC_LOCAL_AUTHORIZED=YES
PR74_FINAL_STATUS_TRUTH_SYNC_LOCAL_AUTHORIZATION=AUTHORIZE_PR74_FINAL_STATUS_TRUTH_SYNC_LOCAL_ONLY
PR74_FINAL_STATUS_TRUTH_SYNC_LOCAL_EXECUTED=YES
POST_MERGE_DOC_SYNC_MERGE_AUTHORIZED=NO
S51A_SCOPE_DOCUMENTED=YES
S51A_SCOPE_APPROVED=NO
S51A_IMPLEMENTATION_AUTHORIZED=NO
HUMAN_IMPLEMENTATION_APPROVAL=NO
NEXT_PRODUCT_CODE_CHANGE_AUTHORIZED=NO
NEXT_COMMIT_AUTHORIZED=NO
NEXT_PUSH_AUTHORIZED=NO
NEXT_PR_AUTHORIZED=NO
NEXT_MERGE_AUTHORIZED=NO
~~~
