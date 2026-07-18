# Zielarchitektur – freigegebenes S50B-R3-Zielbild

**Status:** S50B-R3 menschlich freigegeben und in `main` integriert; S51A-Umsetzung und Betrieb ausstehend
**Stand:** 17. Juli 2026
**Historische Grundlage:** S50B-R2 bleibt als nachvollziehbare Evidenz erhalten
**Ersetzt:** frühere FastAPI-, NestJS-, PostgreSQL-, Qdrant- und Microservice-Zielbeschreibung

## Kanonische Dokumente

Das menschlich freigegebene und in `main` integrierte S50B-R3-Zielbild wird beschrieben durch:

1. [`S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md`](./S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md)
2. [`S51A_IMPLEMENTATION_SCOPE.md`](./S51A_IMPLEMENTATION_SCOPE.md)
3. [`adr/ADR-0001-MODULAR-NEXTJS-MONOLITH.md`](./adr/ADR-0001-MODULAR-NEXTJS-MONOLITH.md)
4. [`adr/ADR-0002-SERVER-BOUNDARIES.md`](./adr/ADR-0002-SERVER-BOUNDARIES.md)
5. [`adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md`](./adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md)
6. [`PACKAGE_DAG.md`](./PACKAGE_DAG.md)
7. [`PLATFORM_CONTRACTS.md`](./PLATFORM_CONTRACTS.md)
8. [`DATA_CLASSIFICATION_RETENTION_DELETION_CONTRACT.md`](./DATA_CLASSIFICATION_RETENTION_DELETION_CONTRACT.md)
9. [`LEARNING_DOMAIN_CONTRACT.md`](./LEARNING_DOMAIN_CONTRACT.md)
10. [`CONTENT_ASSESSMENT_REVISION_CONTRACT.md`](./CONTENT_ASSESSMENT_REVISION_CONTRACT.md)
11. [`OBSERVABILITY_SLO_CONTRACT.md`](./OBSERVABILITY_SLO_CONTRACT.md)
12. [`SCOPE_ORGANIZATION_SEAM_CONTRACT.md`](./SCOPE_ORGANIZATION_SEAM_CONTRACT.md)
13. [`JOBS_OUTBOX_CONTRACT.md`](./JOBS_OUTBOX_CONTRACT.md)
14. [`SEARCH_CONTRACT.md`](./SEARCH_CONTRACT.md)
15. [`PREMIUM_TRANSFER_LEDGER.md`](./PREMIUM_TRANSFER_LEDGER.md)

[`S50B_R2_SOURCE_OF_TRUTH.md`](./S50B_R2_SOURCE_OF_TRUTH.md) bleibt historische Grundlage.
Bei aktuellen Architektur- oder Freigabewidersprüchen hat das
S50B-R3-Freigabepaket Vorrang.

## Zielstruktur

```text
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
```

Die `packages/*`-Struktur ist im menschlich freigegebenen S50B-R3-Zielbild
vorgesehen, aber noch nicht implementiert. Die technische Einführung gehört
ausschließlich in einen später separat freigegebenen S51A-Slice.

## Laufzeitentscheidung

Für die erste Plattformphase gilt:

- Next.js ist die einzige Hauptruntime;
- Route Handler und Server Actions bilden die serverseitige Composition Boundary;
- es gibt keine zweite Express-, FastAPI- oder NestJS-Hauptruntime;
- MySQL mit Drizzle ist die geplante relationale Persistenz;
- KI- und Retrievalanbieter werden hinter Interfaces gekapselt;
- ein externer Vektorindex ist nicht vorab festgelegt;
- Microservices werden nur nach einem belegten Auslagerungskriterium geprüft.

## Paketgrenzen

```text
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
```

Produktionscode unter `apps/web` darf `packages/testing` nicht importieren.
Testdateien, Testkonfigurationen und Testhelfer dürfen das Paket verwenden.

Geplante harte Regeln:

- nur `packages/db` importiert Drizzle;
- nur `packages/ai-core` importiert KI-, Embedding- oder Reranking-SDKs;
- `packages/domain` kennt keine Framework-, DB-, Railway- oder Provider-SDKs;
- React-Komponenten greifen nicht direkt auf Datenbank oder Provider zu;
- Browsercode entscheidet niemals endgültig über Berechtigungen;
- jede geschützte Ressource benötigt serverseitige Rollen-, Scope- und Ownership-Prüfung;
- zyklische Paketabhängigkeiten sind verboten.

## Plattformverträge

Die Plattformverträge regeln mindestens:

- Rollen `Visitor`, `Learner`, `Editor`, `Reviewer`, `Admin` und `Owner`;
- widerrufbare serverseitige Sessions;
- Trennung von Autor und Reviewer;
- revisionsbasierten Draft-, Review-, Publish- und Rollback-Workflow;
- Feature Flags mit Default `OFF` für risikoreiche Funktionen;
- Quellen- und Medienfreigaben;
- KI/RAG mit Provenienz, Zitaten, Berechtigungsfilterung und Enthaltung;
- redigierte Logs ohne Secrets, Sessionwerte, Prompts oder Dokumentvolltexte.

## Nicht freigegeben

Noch nicht implementiert und durch dieses Dokument nicht freigegeben sind:

- Workspace- oder Package-Skeleton;
- Datenbank, Schema oder Migrationen;
- Authentifizierung, Sessions, Rollen oder Ownership;
- Admin- und Publikationssystem;
- Upload-, Medien- oder Rechteverwaltung;
- serverseitiger Lernfortschritt;
- KI-/RAG-Laufzeit oder Provider;
- Railway-Staging oder Production-Deploy;
- Payment, B2B, Multi-Tenant oder White-Label.

## Ausdrücklich abgelöst

Folgende frühere Richtungen sind keine aktuelle Implementierungsanweisung:

- FastAPI oder NestJS als separates Standardbackend;
- PostgreSQL als beschlossene Zieldatenbank;
- Qdrant oder Weaviate als verpflichtende Vector DB;
- Microservice-System mit API-Gateway;
- Kubernetes als früher Standard;
- Open eLMS oder OATutor als verpflichtendes LMS;
- Odoo oder ERPNext als verpflichtendes CRM;
- getrennte `services/api`- und `services/ai`-Hauptruntimes.

Diese Optionen dürfen später nur durch eine neue, belegte Architekturentscheidung
wieder aufgenommen werden.

## Exit-Gate

Das S50B-R3-Zielbild ist vollständig dokumentiert, menschlich freigegeben und
in `main` integriert. Vor Produktcode in S51A sind weiterhin getrennte
menschliche Entscheidungen erforderlich.

Aktueller Stand:

~~~text
S50B_R3_PACKAGE_COMPLETE=YES
S50B_R3_PACKAGE_APPROVED=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
S50B_R3_INTEGRATED_TO_MAIN=YES
PR73_MERGED=YES
PR73_MERGE_METHOD=SQUASH
PR73_MERGE_COMMIT=cab2745c9cfea8a4d6418d866972cef6f982e55b
S51A_SCOPE_DOCUMENTED=YES
S51A_SCOPE_APPROVED=NO
S51A_IMPLEMENTATION_AUTHORIZED=NO
HUMAN_IMPLEMENTATION_APPROVAL=NO
NEXT_PRODUCT_CODE_CHANGE_AUTHORIZED=NO
NEXT_COMMIT_AUTHORIZED=NO
NEXT_PUSH_AUTHORIZED=NO
NEXT_PR_AUTHORIZED=NO
NEXT_MERGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
PRODUCTION_AUTODEPLOY=DISABLED
PRODUCTION_CHANGED=NO
~~~

Dieses Dokument erteilt keine weitere Implementierungs-, Commit-, Push-, PR-,
Merge-, Datenbank-, Railway- oder Deployfreigabe.
