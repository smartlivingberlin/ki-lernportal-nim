# S50B-R2 – Package-DAG und Importregeln

**Status:** Entwurf zur menschlichen Abnahme
**Stand:** 16. Juli 2026
**Geltung:** Zielstruktur für S51A und alle späteren Plattform-Slices

## 1. Zielstruktur

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

Die Verzeichnisse unter `packages/*` sind noch nicht implementiert. Ihre
technische Einführung gehört ausschließlich zu S51A.

## 2. Verantwortungen

| Paket | Darf enthalten | Darf nicht enthalten |
|---|---|---|
| `ui` | UI-Primitives, Design Tokens, barrierearme Komponenten | Drizzle, Auth-Entscheidungen, Provider-SDKs |
| `contracts` | Zod-Schemas, DTOs, Events, Fehlercodes | Datenzugriff, React-Komponenten, Providerlogik |
| `domain` | Entitäten, Value Objects, Policies, Use-Case-Interfaces | Next.js, Drizzle, Railway, Provider-SDKs |
| `db` | Drizzle-Schema, Migrationen, Repositories, Transaktionen | React, KI-Provider, UI |
| `auth` | Credentials, Sessions, Rollen, Scopes, Ownership | React-Seiten, direkte KI-Aufrufe |
| `admin` | Review, Publish, Rollback, Audit-Use-Cases | versteckte Client-Autorisierung |
| `ai-core` | Provideradapter, Retrieval, Zitate, Budgets, Safety | direkte UI- oder Drizzle-Kopplung |
| `testing` | Fixtures, Test-DB, Policy- und Browserhelfer | Produktionslaufzeitlogik |

## 3. Erlaubte Import-Richtung

```text
ui
  -> contracts
  -> domain

db
  -> contracts
  -> domain

auth
  -> contracts
  -> domain
  -> db

admin
  -> contracts
  -> domain
  -> db
  -> auth

ai-core
  -> contracts
  -> domain

testing
  -> alle Pakete ausschließlich für Tests

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

## 4. Harte Invarianten

1. `domain` importiert kein Infrastruktur- oder Frameworkpaket.
2. Nur `packages/db` importiert Drizzle oder den MySQL-Treiber.
3. Nur `packages/ai-core` importiert KI-, Embedding- oder Reranking-SDKs.
4. React-Komponenten importieren weder Drizzle noch Provider-SDKs.
5. Browsercode entscheidet niemals endgültig über Rollen, Scopes oder Ownership.
6. Next.js Route Handler und Server Actions validieren, autorisieren und
   delegieren an Use Cases.
7. IDs, Routen und sichtbare Navigation sind kein Berechtigungsnachweis.
8. Produktionscode unter `apps/web` importiert `packages/testing` nicht.
9. Testdateien, Testkonfigurationen und Testhelfer dürfen `packages/testing`
   importieren.
10. Pakete dürfen keine zyklischen Abhängigkeiten erzeugen.
11. Feature Flags müssen zentral registriert und serverseitig auswertbar sein.
12. Datenbanktransaktionen bleiben innerhalb klarer Repository- oder Use-Case-
    Grenzen.

## 5. Verbotene Beispiele

```text
packages/domain -> next/*
packages/domain -> drizzle-orm
packages/ui -> packages/db
packages/ui -> provider SDK
React component -> drizzle-orm
React component -> raw SQL
client hook -> endgültige Rollenfreigabe
packages/db -> packages/admin
packages/db -> packages/auth
packages/ai-core -> packages/db
```

`ai-core` darf Daten nur über fachliche Interfaces erhalten. Eine spätere
Persistenzintegration wird in der Composition Boundary verdrahtet.

## 6. Composition Boundary

`apps/web` ist die technische Zusammensetzungsgrenze:

```text
Request
-> Contract Validation
-> Authentication
-> Authorization, Scope und Ownership
-> Domain Use Case
-> Repository- oder Provider-Interface
-> Adapter
```

Die Composition Boundary darf Pakete verbinden, aber keine fachliche Policy
heimlich duplizieren.

## 7. Geplante S51A-Prüfungen

S51A soll mindestens folgende statische Gates einführen:

- Workspace erkennt `apps/*` und `packages/*`;
- keine verbotenen Importpfade;
- keine zyklischen Paketabhängigkeiten;
- Drizzle ausschließlich in `packages/db`;
- KI-SDKs ausschließlich in `packages/ai-core`;
- keine direkten DB-Importe aus React-Komponenten;
- keine nicht registrierten Feature Flags;
- keine neue zweite Hauptruntime;
- keine unzulässige Kopplung an Railway;
- jedes Paket besitzt klaren `package.json`-, TypeScript- und Exportvertrag.

## 8. Testvertrag

Jeder Plattform-Slice benötigt passend zum Risiko:

- Unit-Tests für Policies und Value Objects;
- Negativtests für Rollen, Scopes und Ownership;
- Integrationstests für Repositories und Transaktionen;
- Contract-Tests für Route Handler und Provideradapter;
- Browsertests für kritische Nutzerwege;
- Accessibility-Tests für neue UI;
- Regressionstests für vorhandene zwölf Lektionen und Übungen.

## 9. Änderungsregel

Eine neue Abhängigkeit zwischen Paketen benötigt:

1. begründeten Architekturzweck;
2. Prüfung gegen diese DAG;
3. Security-, Privacy- und Testauswirkung;
4. menschliche Freigabe;
5. aktualisierten automatischen Import-Gate.

## 10. Exit-Gate

```text
PACKAGE_DAG_DOCUMENTED=YES
FORBIDDEN_IMPORTS_DOCUMENTED=YES
COMPOSITION_BOUNDARY_DOCUMENTED=YES
S51A_AUTOMATION_SCOPE_DOCUMENTED=YES
PACKAGE_DAG_APPROVED=NO
```

`PACKAGE_DAG_APPROVED` bleibt bis zur ausdrücklichen menschlichen Abnahme
`NO`. Dieses Dokument ändert keinen Workspace und keinen Produktcode.
