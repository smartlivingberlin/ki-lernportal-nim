# Projektstatus: KI-Lernportal NIM

**Stand:** 17. Juli 2026
**Status:** S50B-R3-Architekturpaket lokal vollständig; Dokumentintegration und menschliche Freigabe ausstehend
**Branch:** `docs/s50b-r2-source-of-truth-20260716`
**Basis-HEAD:** `1d67a4b1b7eace8869614aec82bdf42fb3d61adc`
**Draft-PR:** #73, offen und weiterhin Draft

## Verbindliche Einordnung

Der aktuelle, noch nicht menschlich freigegebene Architekturkandidat steht in:

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

## Lokaler Dokumentationsstand

Lokal wurden bisher integriert:

- `AGENTS.md`;
- `README.md`;
- `QUALITY_GATES.md`;
- `RAILWAY_DEPLOYMENT_STRATEGY.md`;
- `ARCHITECTURE_TARGET.md`;
- `MVP_SCOPE.md`;
- `PACKAGE_DAG.md`;
- `PLATFORM_CONTRACTS.md`;
- `PREMIUM_TRANSFER_LEDGER.md`;
- `ADR-0001-MODULAR-NEXTJS-MONOLITH.md`;
- `ADR-0002-SERVER-BOUNDARIES.md`;
- `S50B_R2_SOURCE_OF_TRUTH.md`;
- dieses Projektstatusdokument.

Alle 13 Bestandsdokumente und 10 neuen S50B-R3-Dokumente wurden lokal
integriert und durch Inventar-, Freigabe-, Link- und Kohärenzprüfungen bestätigt.

Es wurde noch kein S50B-R3-Commit erstellt und nichts gepusht.

## GitHub-, Railway- und Produktionsgrenze

PR #73 ist offen, mergebar und weiterhin Draft. Sein Remote-Head entspricht
weiterhin `1d67a4b1b7eace8869614aec82bdf42fb3d61adc`.

PR #68 bleibt ein getrennter Railway-Readiness-PR und ist nicht Teil dieses
Dokumentationspakets.

S50B-R3 verändert weder Railway noch Datenbank oder Production.

## Nächste kontrollierte Schritte

1. Architekturfreigabe konsistent in allen betroffenen Dokumenten nachführen;
2. anschließend einen vollständigen Freigabe- und Kohärenzaudit ausführen;
3. danach eine gesonderte Commit-Freigabe einholen;
4. Push, Ready for Review und Merge jeweils getrennt entscheiden;
5. nach einem genehmigten Merge den aktuellen `main` read-only prüfen;
6. S51A-Scope und S51A-Implementierung anschließend getrennt freigeben;
7. S51A erst auf einem neuen kleinen Branch vom dann aktuellen `main` beginnen.

## Aktueller Freigabestatus

~~~text
S50B_R3_PACKAGE_COMPLETE=YES
S50B_R3_PACKAGE_APPROVED=YES
S50B_R3_DOCUMENT_INTEGRATION_COMPLETE=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
HUMAN_ARCHITECTURE_DECISION=APPROVE_ARCHITECTURE
HUMAN_ARCHITECTURE_DECISION_DATE=2026-07-17
S51A_SCOPE_DOCUMENTED=YES
S51A_SCOPE_APPROVED=NO
S51A_IMPLEMENTATION_AUTHORIZED=NO
PRODUCT_CODE_CHANGED=NO
LOCAL_TRACKED_DOCUMENTS_CHANGED=13
LOCAL_UNTRACKED_R3_DOCUMENTS=10
COMMIT_AUTHORIZED=YES
COMMIT_AUTHORIZATION=AUTHORIZE_COMMIT_ONLY
COMMIT_SCOPE=S50B_R3_DOCUMENTATION_ONLY
COMMIT_CREATED=YES
PUSH_EXECUTED=NO
PULL_REQUEST_73_DRAFT=YES
READY_FOR_REVIEW_AUTHORIZED=NO
MERGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
RAILWAY_CHANGED=NO
DATABASE_CHANGED=NO
PRODUCTION_CHANGED=NO
~~~
