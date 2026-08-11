# S50B-R3 – Package-DAG und Importregeln

**Status:** S51A-Package-Struktur und zentrale Boundary-Gates in `main` integriert
**Stand:** 26. Juli 2026
**Baseline `main`:** `30e88dcd0516f5c2ddf3562a2f492f6f756f7e7a`
**Geltung:** verbindliche Package-Grenzen für alle späteren Plattform-Slices
**Historischer S51A-Vertrag:** [`S51A_IMPLEMENTATION_SCOPE.md`](S51A_IMPLEMENTATION_SCOPE.md)

S50B-R2 bleibt historische Grundlage. Für den gegenwärtigen Integrationsstand
haben [`../00_PROJECT_STATUS.md`](../00_PROJECT_STATUS.md) und die tatsächlichen
Boundary-Gates in `main` Vorrang vor alten Planungsmarkern.

## 1. Implementierte Struktur

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

Die acht Verzeichnisse unter `packages/*` sind physisch implementiert und in
`main` integriert.

~~~text
PACKAGE_DAG_IMPLEMENTED=YES
S51A_PACKAGE_STRUCTURE_INTEGRATED=YES
S51A_BOUNDARY_GATE_IN_CI=YES
S51A_PACKAGE_TYPECHECK_IN_CI=YES
~~~

Das Vorhandensein einer Package-Grenze bedeutet nicht, dass ihre langfristige
Fachfunktion bereits produktiv implementiert ist.

## 2. Verantwortungen und Reifestand

| Package | Langfristige Verantwortung | Darf nicht enthalten | Gegenwärtiger Stand |
|---|---|---|---|
| `ui` | UI-Primitives, Design Tokens, barrierearme Komponenten | Drizzle, Auth-Entscheidungen, Provider-SDKs | Skeleton integriert |
| `contracts` | Zod-Schemas, DTOs, Events und kontrollierte Fehler | Datenzugriff, React-Komponenten, Providerlogik | Skeleton integriert |
| `domain` | Entitäten, Value Objects, Policies und Use-Case-Interfaces | Next.js, Drizzle, Railway, Provider-SDKs | Skeleton integriert |
| `db` | Drizzle-Schema, Migrationen, Repositories und Transaktionen | React, KI-Provider, UI | lokales Adapterfundament integriert; Schema ausstehend |
| `auth` | Credentials, Sessions, Rollen, Scopes und Ownership | React-Seiten, direkte KI-Aufrufe | S52-A Vokabular + S52-B lokale Runtime-Foundation (kein Login-UI, keine DB) |
| `admin` | Review, Publish, Rollback und Audit-Use-Cases | versteckte Client-Autorisierung | Skeleton integriert; Runtime ausstehend |
| `ai-core` | Provideradapter, Retrieval, Zitate, Budgets und Safety | direkte UI- oder Drizzle-Kopplung | Skeleton integriert; Provider ausstehend |
| `testing` | Fixtures, Test-DB, Policy- und Browserhelfer | Produktionslaufzeitlogik | Skeleton integriert |

## 3. Erlaubte Import-Richtung

~~~text
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
~~~

Eine erlaubte Richtung ist keine automatische Freigabe für eine neue
Abhängigkeit. Jede tatsächlich neue Kante benötigt Begründung, Review,
Dependency-Erklärung und einen aktualisierten Boundary-Nachweis.

## 4. Harte Invarianten

1. `domain` bleibt frei von Infrastruktur- und Frameworkabhängigkeiten.
2. Nur `packages/db` darf Drizzle oder den MySQL-Treiber importieren.
3. Nur `packages/ai-core` darf KI-, Embedding- oder Reranking-SDKs importieren.
4. React-Komponenten importieren weder Drizzle noch Provider-SDKs.
5. Produktionscode importiert `packages/testing` nicht.
6. Testdateien, Testkonfigurationen und Testhelfer dürfen
   `packages/testing` verwenden.
7. Pakete dürfen keine zyklischen Abhängigkeiten erzeugen.
8. Browsercode entscheidet niemals endgültig über Rollen, Scopes oder
   Ownership.
9. IDs, Routen und sichtbare Navigation sind kein Berechtigungsnachweis.
10. Next.js Route Handler und Server Actions validieren, autorisieren und
    delegieren an Use Cases, sobald geschützte Serverfunktionen entstehen.
11. Feature Flags für risikoreiche Funktionen werden später zentral
    registriert und serverseitig ausgewertet.
12. Echte Datenbanktransaktionen bleiben später innerhalb klarer Repository-
    oder Use-Case-Grenzen.

## 5. Verbotene Beispiele

~~~text
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
production code -> packages/testing
~~~

`ai-core` erhält Daten über fachliche Interfaces. Eine spätere
Persistenzintegration wird in der Composition Boundary verdrahtet und nicht
als direkte Package-Kopplung eingeführt.

## 6. Composition Boundary

`apps/web` ist die technische Zusammensetzungsgrenze:

~~~text
Request
-> Contract Validation
-> Authentication
-> Authorization, Scope und Ownership
-> Domain Use Case
-> Repository- oder Provider-Interface
-> Adapter
~~~

Die Composition Boundary darf Packages verbinden, aber keine fachliche Policy
heimlich duplizieren.

## 7. Implementierte S51A-Prüfungen

Der aktuelle deterministische Package-Check und die CI prüfen unter anderem:

- Workspace-Erkennung für `apps/*` und `packages/*`;
- exakte Package-Namen und private Manifeste;
- kontrollierte Exports und TypeScript-Konfigurationen;
- deklarierte Package-Abhängigkeiten;
- verbotene Importpfade;
- zyklische Package-Abhängigkeiten;
- Drizzle und MySQL nur in `packages/db`;
- KI-SDK-Grenze für `packages/ai-core`;
- kein direkter Datenbankimport aus React-Komponenten;
- kein `packages/testing` im Produktionscode;
- keine neue zweite Hauptruntime;
- keine unzulässige Railway-Kopplung aus Packages;
- Package-Typecheck in CI.

~~~text
WORKSPACE_MANIFEST_CHECK=IMPLEMENTED
PACKAGE_ENTRYPOINT_CHECK=IMPLEMENTED
PACKAGE_TYPECHECK=IMPLEMENTED
PACKAGE_DEPENDENCY_CHECK=IMPLEMENTED
FORBIDDEN_IMPORT_CHECK=IMPLEMENTED
CYCLE_CHECK=IMPLEMENTED
TESTING_IMPORT_BOUNDARY_CHECK=IMPLEMENTED
PROVIDER_SDK_BOUNDARY_CHECK=IMPLEMENTED
~~~

Die genaue technische Benennung darf sich ändern; die Schutzwirkung darf
nicht abgeschwächt werden.

## 8. Noch nicht durch das Skeleton implementiert

Die folgenden Fähigkeiten bleiben späteren, separat freizugebenden Slices
vorbehalten:

- echtes Drizzle-Schema und Migrationen;
- produktive Repositories und Transaktionen;
- Login, Sessions, Rollen und Ownership;
- Admin-, Review- und Publikationsfunktionen;
- produktive KI-, Retrieval- oder Search-Laufzeit;
- serverseitiger Lernfortschritt;
- Worker, Outbox und Scheduler;
- Railway-Staging oder Production-Deploy.

## 9. Testvertrag für spätere Slices

Jeder Plattform-Slice benötigt passend zum Risiko:

- Unit-Tests für Policies und Value Objects;
- Negativtests für Rollen, Scopes und Ownership;
- Integrationstests für Repositories und Transaktionen;
- Contract-Tests für Route Handler und Provideradapter;
- Browsertests für kritische Nutzerwege;
- Accessibility-Tests für neue UI;
- Regressionstests für die vorhandenen zwölf Lektionen und Übungen.

## 10. Änderungsregel

Eine neue Abhängigkeit zwischen Packages benötigt:

1. einen begründeten Architekturzweck;
2. Prüfung gegen diese DAG;
3. Security-, Privacy- und Testauswirkung;
4. eine ausdrückliche menschliche Freigabe;
5. einen aktualisierten automatischen Import-Gate;
6. einen vollständigen CI-Nachweis.

## 11. Aktueller Exit- und Freigabestatus

~~~text
PACKAGE_DAG_DOCUMENTED=YES
PACKAGE_DAG_APPROVED=YES
PACKAGE_DAG_IMPLEMENTED=YES
FORBIDDEN_IMPORTS_DOCUMENTED=YES
COMPOSITION_BOUNDARY_DOCUMENTED=YES
S51A_PACKAGE_STRUCTURE_INTEGRATED=YES
S51A_AUTOMATION_INTEGRATED=YES
S51A_PACKAGE_TYPECHECK_IN_CI=YES

S51B_B_CONNECTION_PROOF_AUTHORIZED=NO
S51B_C_SCHEMA_AUTHORIZED=NO
AUTH_RUNTIME_AUTHORIZED=YES
AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY
LOGIN_UI=NO
ADMIN_RUNTIME_AUTHORIZED=NO
AI_RUNTIME_AUTHORIZED=NO
RAILWAY_STAGING_AUTHORIZED=YES_ISOLATED_STAGING_CREATED
STAGING_ENVIRONMENT_CREATED=YES
DEPLOY_AUTHORIZED=NO
~~~

Dieses Dokument verändert keinen Workspace und keinen Produktcode. Es erteilt
keine neue Implementierungs-, Datenbank-, Railway-, Merge- oder
Deploymentfreigabe.
