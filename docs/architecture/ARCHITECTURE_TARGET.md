# Zielarchitektur – freigegebenes und teilweise integriertes S50B-R3-Zielbild

**Status:** S50B-R3 freigegeben; S51A-Package-Skeleton sowie S51B-A- und lokales S51B-B-Adapterfundament in `main` integriert; produktive Persistenz, Auth, Admin, KI und Betrieb weiterhin ausstehend
**Stand:** 26. Juli 2026
**Baseline `main`:** `30e88dcd0516f5c2ddf3562a2f492f6f756f7e7a`
**Historische Grundlage:** S50B-R2 bleibt als nachvollziehbare Evidenz erhalten
**Ersetzt:** frühere FastAPI-, NestJS-, PostgreSQL-, Qdrant- und Microservice-Zielbeschreibung

## 1. Kanonische Dokumente

Das menschlich freigegebene S50B-R3-Zielbild und sein aktueller
Integrationsstand werden beschrieben durch:

1. [`S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md`](./S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md)
2. [`S51A_IMPLEMENTATION_SCOPE.md`](./S51A_IMPLEMENTATION_SCOPE.md)
3. [`S51B_IMPLEMENTATION_SCOPE.md`](./S51B_IMPLEMENTATION_SCOPE.md)
4. [`S51B_B_IMPLEMENTATION_SCOPE.md`](./S51B_B_IMPLEMENTATION_SCOPE.md)
5. [`adr/ADR-0001-MODULAR-NEXTJS-MONOLITH.md`](./adr/ADR-0001-MODULAR-NEXTJS-MONOLITH.md)
6. [`adr/ADR-0002-SERVER-BOUNDARIES.md`](./adr/ADR-0002-SERVER-BOUNDARIES.md)
7. [`adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md`](./adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md)
8. [`PACKAGE_DAG.md`](./PACKAGE_DAG.md)
9. [`PLATFORM_CONTRACTS.md`](./PLATFORM_CONTRACTS.md)
10. [`DATA_CLASSIFICATION_RETENTION_DELETION_CONTRACT.md`](./DATA_CLASSIFICATION_RETENTION_DELETION_CONTRACT.md)
11. [`LEARNING_DOMAIN_CONTRACT.md`](./LEARNING_DOMAIN_CONTRACT.md)
12. [`CONTENT_ASSESSMENT_REVISION_CONTRACT.md`](./CONTENT_ASSESSMENT_REVISION_CONTRACT.md)
13. [`OBSERVABILITY_SLO_CONTRACT.md`](./OBSERVABILITY_SLO_CONTRACT.md)
14. [`SCOPE_ORGANIZATION_SEAM_CONTRACT.md`](./SCOPE_ORGANIZATION_SEAM_CONTRACT.md)
15. [`JOBS_OUTBOX_CONTRACT.md`](./JOBS_OUTBOX_CONTRACT.md)
16. [`SEARCH_CONTRACT.md`](./SEARCH_CONTRACT.md)
17. [`PREMIUM_TRANSFER_LEDGER.md`](./PREMIUM_TRANSFER_LEDGER.md)

[`S50B_R2_SOURCE_OF_TRUTH.md`](./S50B_R2_SOURCE_OF_TRUTH.md) bleibt historische
Grundlage. Für den tatsächlichen gegenwärtigen Stand hat
[`../00_PROJECT_STATUS.md`](../00_PROJECT_STATUS.md) Vorrang vor veralteten
Freigabemarkern in historischen Dokumenten.

## 2. Implementierte Zielstruktur

~~~text
apps/
  web/

packages/
  ui/
  contracts/
  domain/
  db/
  auth/
  admin/
  ai-core/
  testing/
~~~

Die `packages/*`-Struktur ist implementiert und in `main` integriert. Jedes
Package besitzt eine private, kontrollierte Grenze. Das Vorhandensein eines
Packages bedeutet nicht, dass seine spätere produktive Fachfunktion bereits
implementiert ist.

~~~text
PACKAGE_STRUCTURE_IMPLEMENTED=YES
PACKAGE_BOUNDARY_AUTOMATION_IMPLEMENTED=YES
PACKAGE_TYPECHECK_IMPLEMENTED=YES
LOCAL_DB_ADAPTER_FOUNDATION_IMPLEMENTED=YES
~~~

## 3. Laufzeitentscheidung

Für die erste Plattformphase gilt weiterhin:

- Next.js ist die einzige Hauptruntime;
- Route Handler und Server Actions bilden die serverseitige Composition
  Boundary;
- es gibt keine zweite Express-, FastAPI- oder NestJS-Hauptruntime;
- MySQL mit Drizzle ist die relationale Persistenzrichtung;
- KI- und Retrievalanbieter werden hinter providerneutralen Interfaces
  gekapselt;
- ein externer Vektorindex ist nicht vorab festgelegt;
- Microservices werden erst nach einem belegten Auslagerungskriterium geprüft.

Die S51B-B-Integration enthält nur ein lokales Adapterfundament. Es existieren
noch keine Tabellen, Migrationen oder produktiven Repositories.

## 4. Paketgrenzen

~~~text
apps/web production code
  -> ui
  -> contracts
  -> domain
  -> db
  -> auth
  -> admin
  -> ai-core

apps/web test code
  -> testing
~~~

Produktionscode unter `apps/web` darf `packages/testing` nicht importieren.
Testdateien, Testkonfigurationen und Testhelfer dürfen das Package verwenden.

### Automatisiert erzwungene Regeln

Der aktuelle Boundary-Check und die CI erzwingen unter anderem:

- genau die vorgesehenen privaten Package-Grenzen;
- kontrollierte Package-Exports und TypeScript-Konfigurationen;
- deklarierte und azyklische Package-Abhängigkeiten;
- kein `packages/testing` im Produktionscode;
- Drizzle und MySQL-Treiber nur in `packages/db`;
- keine KI-, Embedding- oder Reranking-SDKs außerhalb `packages/ai-core`;
- keine direkte Datenbank- oder Providerkopplung aus React-Komponenten;
- keine zweite Hauptruntime;
- keine unzulässige Railway-Kopplung aus den Packages.

### Weiterhin fachlich zu implementierende Regeln

Erst spätere, separat freizugebende Slices implementieren und testen:

- endgültige Rollen-, Scope- und Ownership-Prüfungen;
- widerrufbare serverseitige Sessions;
- zentrale Feature Flags mit sicheren Defaultwerten;
- Repository- und Transaktionsgrenzen für echte Persistenz;
- revisionsbasierte Content- und Assessment-Workflows;
- produktive KI-, Retrieval- und Search-Policies.

## 5. Langfristige Package-Verantwortungen

| Package | Zielverantwortung | Gegenwärtiger Status |
|---|---|---|
| `ui` | UI-Primitives, Design Tokens, zugängliche Komponenten | Skeleton integriert |
| `contracts` | providerneutrale Schemas, DTOs, Events und Fehlercodes | Skeleton integriert |
| `domain` | fachliche Typen, Policies und Use-Case-Interfaces | Skeleton integriert |
| `db` | Drizzle-Schema, Migrationen, Repositories, Transaktionen | lokales Adapterfundament integriert; Schema ausstehend |
| `auth` | Credentials, Sessions, Rollen, Scopes und Ownership | Skeleton integriert; Runtime ausstehend |
| `admin` | Review, Publish, Rollback und Audit-Use-Cases | Skeleton integriert; Runtime ausstehend |
| `ai-core` | Provideradapter, Retrieval, Zitate, Budgets und Safety | Skeleton integriert; Provider ausstehend |
| `testing` | Fixtures, Test-DB, Policy- und Browserhelfer | Skeleton integriert |

## 6. Plattformverträge

Die Plattformverträge regeln als verbindliches Ziel mindestens:

- Rollen `Visitor`, `Learner`, `Editor`, `Reviewer`, `Admin` und `Owner`;
- widerrufbare serverseitige Sessions;
- Trennung von Autor und Reviewer;
- revisionsbasierten Draft-, Review-, Publish- und Rollback-Workflow;
- Feature Flags mit Default `OFF` für risikoreiche Funktionen;
- Quellen- und Medienfreigaben;
- KI/RAG mit Provenienz, Zitaten, Berechtigungsfilterung und Enthaltung;
- redigierte Logs ohne Secrets, Sessionwerte, Prompts oder Dokumentvolltexte.

Diese Verträge sind Architekturvorgaben. Ihre Dokumentation ist kein Nachweis,
dass die jeweilige produktive Runtime bereits existiert.

## 7. Nicht vorhanden oder nicht freigegeben

Noch nicht implementiert oder durch dieses Dokument nicht freigegeben sind:

- echte produktive Datenbankverbindung;
- kanonisches Schema, Tabellen, Migrationen und Seeds;
- Authentifizierung, Sessions, Rollen- oder Ownership-Persistenz;
- Admin- und Publikationssystem;
- Upload-, Medien- oder Rechteverwaltung;
- serverseitiger Lernfortschritt;
- KI-/RAG-Laufzeit oder Provider;
- serverseitige Search-Laufzeit;
- Background Worker oder Transactional Outbox;
- Railway-Staging oder Production-Deploy;
- Payment, B2B, Multi-Tenant oder White Label.

## 8. Ausdrücklich abgelöst

Folgende frühere Richtungen sind keine aktuelle Implementierungsanweisung:

- FastAPI oder NestJS als separates Standardbackend;
- PostgreSQL als beschlossene Zieldatenbank;
- Qdrant oder Weaviate als verpflichtende Vector DB;
- Microservice-System mit API-Gateway;
- Kubernetes als früher Standard;
- Open eLMS oder OATutor als verpflichtendes LMS;
- Odoo oder ERPNext als verpflichtendes CRM;
- getrennte `services/api`- und `services/ai`-Hauptruntimes.

Diese Optionen dürfen später nur durch eine neue, belegte
Architekturentscheidung wieder aufgenommen werden.

## 9. Railway- und Betriebsgrenze

Historisch bestätigte Railway-Einstellungen sind keine dauerhaft gültige
Betriebszusage.

~~~text
CURRENT_PRODUCTION_AUTODEPLOY=UNVERIFIED
CURRENT_WAIT_FOR_CI=UNVERIFIED
CURRENT_CONFIG_SOURCE=UNVERIFIED
RAILWAY_REVERIFY_BEFORE_STAGING_USE=REQUIRED
PR68_STAGING_ONLY_REMEDIATION=COMPLETE
PR68_FULL_CI=PASS
PR68_MERGED=YES
PR68_MERGE_COMMIT=43550961cb5f584b5a5b16aaaa93610b3ce0b2f8
S51D_A_STAGING_SCOPE=SEE_S51D_A_STAGING_SCOPE_MD
S51D_B_STAGING_EXECUTION=SEE_S51D_B_STAGING_EXECUTION_MD
~~~

PR #68 (S50D1) ist gemerged. Ein isoliertes Railway-Staging-Environment ist
dadurch nicht automatisch erstellt. S51D-A dokumentiert den Scope; S51D-B
liefert GitHub-Reverify und Operator-Runbook. Environment-Anlage bleibt
blockiert ohne Railway-Token und Dashboard-Bestätigung von Autodeploy /
Wait for CI.

## 10. Aktueller Exit- und Freigabestatus

~~~text
S50B_R3_PACKAGE_COMPLETE=YES
S50B_R3_PACKAGE_APPROVED=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
S50B_R3_INTEGRATED_TO_MAIN=YES
PR73_MERGE_COMMIT=cab2745c9cfea8a4d6418d866972cef6f982e55b

S51A_SCOPE_DOCUMENTED=YES
S51A_PACKAGE_STRUCTURE_IMPLEMENTED=YES
S51A_PACKAGE_BOUNDARY_GATE_IMPLEMENTED=YES
S51A_PACKAGE_TYPECHECK_IMPLEMENTED=YES
S51A_INTEGRATED_TO_MAIN=YES
PR76_MERGE_COMMIT=4bd8abeceac7e7b6bcd3b6cf4852653a8d0942c8

S51B_A_INTEGRATED_TO_MAIN=YES
S51B_B_SCOPE_LOCK_INTEGRATED_TO_MAIN=YES
S51B_B_LOCAL_ADAPTER_FOUNDATION_INTEGRATED=YES
PR82_MERGE_COMMIT=0f126ab2eb2b7a87f8a8ee85b611ec2ea410bcd5

S51B_B_CONNECTION_PROOF_AUTHORIZED=NO
S51B_C_SCHEMA_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
MIGRATION_AUTHORIZED=NO
S51D_HUMAN_FREIGABE=YES
S51D_A_SCOPE_AUTHORIZED=YES
S51D_B_EXECUTED=NO
RAILWAY_STAGING_AUTHORIZED=NO
PR68_MERGED=YES
DEPLOY_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
~~~

Dieses Dokument erteilt keine weitere Implementierungs-, Commit-, Push-, PR-,
Merge-, Datenbank-, Railway- oder Deployfreigabe.
