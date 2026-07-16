# Verbindliche Zielarchitektur

**Status:** S50B-R2-Entwurf zur menschlichen Abnahme
**Stand:** 16. Juli 2026
**Ersetzt:** frühere FastAPI-, NestJS-, PostgreSQL-, Qdrant- und Microservice-Zielbeschreibung

## Kanonische Dokumente

Die verbindliche Architektur wird durch folgende Dokumente beschrieben:

1. [`S50B_R2_SOURCE_OF_TRUTH.md`](./S50B_R2_SOURCE_OF_TRUTH.md)
2. [`adr/ADR-0001-MODULAR-NEXTJS-MONOLITH.md`](./adr/ADR-0001-MODULAR-NEXTJS-MONOLITH.md)
3. [`adr/ADR-0002-SERVER-BOUNDARIES.md`](./adr/ADR-0002-SERVER-BOUNDARIES.md)
4. [`PACKAGE_DAG.md`](./PACKAGE_DAG.md)
5. [`PLATFORM_CONTRACTS.md`](./PLATFORM_CONTRACTS.md)
6. [`PREMIUM_TRANSFER_LEDGER.md`](./PREMIUM_TRANSFER_LEDGER.md)

Bei Widersprüchen hat die Source of Truth Vorrang.

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

Die `packages/*`-Struktur ist beschlossen, aber noch nicht implementiert.
Die technische Einführung gehört ausschließlich in den späteren S51A-Slice.

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
apps/web
  -> ui
  -> contracts
  -> domain
  -> db
  -> auth
  -> admin
  -> ai-core
  -> testing
```

Verbindliche Regeln:

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

Vor Produktcode in S51A müssen mindestens gelten:

```text
ARCHITECTURE_SOURCE_OF_TRUTH=APPROVED
ADR_MODULAR_MONOLITH=APPROVED
ADR_SERVER_BOUNDARIES=APPROVED
PACKAGE_DAG=APPROVED
PLATFORM_CONTRACTS=APPROVED
PREMIUM_TRANSFER_LEDGER=REVIEWED
HUMAN_IMPLEMENTATION_APPROVAL=YES
```

Dieses Dokument erteilt keine Commit-, Push-, Merge-, Datenbank- oder
Deployfreigabe.
