# S51A – Historischer Workspace- und Package-Skeleton-Implementierungsvertrag

**Status:** vollständig umgesetzt und in `main` integriert
**Ursprünglicher Vertragsstand:** 17. Juli 2026
**Tatsachenabgleich:** 26. Juli 2026
**Merge:** PR #76, Squash-Commit `4bd8abeceac7e7b6bcd3b6cf4852653a8d0942c8`

## 1. Zweck dieses Dokuments

Dieses Dokument war der exakte, vor der Umsetzung festgelegte S51A-Scope für
das physische Workspace- und Package-Gerüst des modularen
Next.js-Monolithen.

S51A ist inzwischen abgeschlossen. Dieses Dokument ist daher kein offener
Implementierungskandidat mehr, sondern ein historischer Scope-, Abnahme- und
Auditbeleg.

Der vollständige ursprüngliche Vertragsinhalt vom geprüften Baseline-Stand
bleibt unveränderlich über folgenden Commit-Permalink verfügbar:

- [Vollständiger ursprünglicher S51A-Vertrag auf `dc2d594c`](https://github.com/smartlivingberlin/ki-lernportal-nim/blob/dc2d594c2993c0094c6accf4a23a45379077bf2d/docs/architecture/S51A_IMPLEMENTATION_SCOPE.md)

Der aktuelle Integrationsstand wird in
[`../00_PROJECT_STATUS.md`](../00_PROJECT_STATUS.md),
[`ARCHITECTURE_TARGET.md`](ARCHITECTURE_TARGET.md) und
[`PACKAGE_DAG.md`](PACKAGE_DAG.md) beschrieben.

~~~text
HISTORICAL_DOCUMENT=YES
S51A_SCOPE_DOCUMENTED=YES
S51A_IMPLEMENTED=YES
S51A_INTEGRATED_TO_MAIN=YES
S51A_MERGE_COMMIT=4bd8abeceac7e7b6bcd3b6cf4852653a8d0942c8
THIS_DOCUMENT_DOES_NOT_AUTHORIZE_FURTHER_WORK=YES
~~~

## 2. Ursprüngliches Ziel

S51A führte ausschließlich das physische Workspace- und Package-Gerüst der
freigegebenen modularen Monolith-Architektur ein.

Der Slice durfte keine produktive Fachfunktion einführen. Der bestehende
öffentliche Lernraum musste sich funktional genauso verhalten wie vor S51A.

## 3. Exakt eingeführte Package-Grenzen

~~~text
packages/ui
packages/contracts
packages/domain
packages/db
packages/auth
packages/admin
packages/ai-core
packages/testing
~~~

Jedes Package erhielt mindestens:

~~~text
package.json
README.md
src/index.ts
tsconfig.json oder dokumentierte geerbte TypeScript-Konfiguration
~~~

Die Packages wurden privat angelegt und mit kontrollierten Exportgrenzen
versehen.

## 4. Ursprüngliche Verantwortungsgrenzen

### `packages/ui`

Zielgrenze für wiederverwendbare UI-Primitives, Design Tokens und zugängliche
Komponentenverträge. Direkte Datenbank-, Auth- oder Providerkopplung war
verboten.

### `packages/contracts`

Zielgrenze für providerneutrale Request-/Response-Schemas, DTOs, Events,
Commands und kontrollierte Fehler. Framework-, Datenbank- und Providerlogik
war verboten.

### `packages/domain`

Infrastrukturfreie Zielgrenze für fachliche Typen, Policies, Zustände,
Domain Errors und Use-Case-Interfaces.

### `packages/db`

Vorbereitete Persistenzgrenze. S51A durfte noch kein Drizzle-Schema, keine
Migration, MySQL-Verbindung, Query, produktives Repository, Seed oder
Testdatenbank enthalten.

### `packages/auth`

Vorbereitete Grenze für Auth-, Session- und Policy-Interfaces. Login,
Registrierung, Passwort-Hashing, Cookies, Sessiontabellen, Recovery, MFA,
Passkeys und OAuth waren nicht Teil von S51A.

### `packages/admin`

Vorbereitete Grenze für spätere administrative Application Services. Eine
Adminseite, Nutzerverwaltung, Rollenvergabe, Content Editor,
Publikationsfunktion oder Auditansicht war nicht Teil von S51A.

### `packages/ai-core`

Providerneutrale Zielgrenze für KI-, Retrieval-, Citation- und
Abstention-Verträge. Provider-SDKs, API-Keys, Modellaufrufe, Embeddings,
Reranking, Vektordatenbanken, RAG-Indizes und produktive KI-Laufzeit waren
verboten.

### `packages/testing`

Gemeinsame Testgrenze für Fixtures, Builder und Boundary-Unterstützung.
Produktionscode durfte dieses Package nicht importieren.

## 5. Import- und Anbietergrenzen

Der historische Vertrag verlangte unter anderem:

- `packages/domain` bleibt infrastrukturfrei;
- `packages/ui` importiert weder `packages/db`, `packages/auth` noch
  `packages/ai-core`;
- `packages/contracts` importiert weder Next.js noch Drizzle;
- Produktionscode importiert `packages/testing` nicht;
- nur `packages/db` darf Drizzle und den MySQL-Treiber importieren;
- nur `packages/ai-core` darf KI-, Embedding- oder Reranking-SDKs importieren;
- zyklische Package-Abhängigkeiten sind verboten;
- direkte Quellpfadimporte außerhalb kontrollierter Exports sind verboten.

## 6. Boundary-Automation

S51A musste einen deterministischen lokalen und CI-fähigen Check einführen,
der mindestens folgende Fehlerklassen ablehnt:

~~~text
workspace_manifest_check
package_entrypoint_check
package_typecheck
package_dependency_check
forbidden_import_check
cycle_check
testing_import_boundary_check
provider_sdk_boundary_check
git_diff_check
~~~

Die technische Benennung durfte abweichen; die Schutzwirkung durfte nicht
abgeschwächt werden.

Diese Schutzwirkung ist inzwischen in `main` integriert und wird durch die
aktuelle CI ausgeführt.

## 7. Ursprüngliche Acceptance Criteria

S51A war nur abnahmefähig, wenn insbesondere:

1. exakt acht Package-Skeletons vorhanden waren;
2. jedes Package eine dokumentierte Verantwortung besaß;
3. der Dependency Graph azyklisch blieb;
4. verbotene Imports automatisiert abgelehnt wurden;
5. Produktionscode `packages/testing` nicht importieren konnte;
6. das bestehende Webverhalten unverändert blieb;
7. keine produktive Datenbankverbindung oder Migration entstand;
8. keine Auth-, Admin-, KI-, Search- oder Worker-Runtime entstand;
9. keine Railway-Datei, kein Environment und kein Deployment verändert wurde;
10. alle bestehenden und neuen CI-Gates grün waren;
11. `git diff --check` bestand;
12. keine Secrets enthalten waren;
13. der PR ausschließlich S51A enthielt.

## 8. Historisch ausdrücklich ausgeschlossener Scope

Nicht Teil von S51A waren unter anderem:

- Drizzle-Schema und Datenbankmigration;
- MySQL-Verbindung oder produktive Repositories;
- Login, Registrierung, Sessions, MFA oder Rollenpersistenz;
- Adminseite, Content Editor oder Publikationsworkflow;
- serverseitiger Lernfortschritt und Assessment Scoring;
- Worker, Scheduler, Outbox oder externe Queue;
- Search-Route oder Search-Index;
- Embeddings, Vektordatenbank oder KI-Provider;
- Analytics, Tracking oder Payment;
- Organisationen, B2B oder White Label;
- Railway-Staging oder Production-Deploy.

## 9. Tatsächlicher Abschluss

S51A wurde durch PR #76 auf Grundlage des freigegebenen Vertrags umgesetzt und
per Squash in `main` integriert.

~~~text
PR76_MERGED=YES
PR76_MERGE_METHOD=SQUASH
PR76_MERGE_COMMIT=4bd8abeceac7e7b6bcd3b6cf4852653a8d0942c8
S51A_PACKAGE_STRUCTURE_IMPLEMENTED=YES
S51A_BOUNDARY_AUTOMATION_IMPLEMENTED=YES
S51A_PACKAGE_TYPECHECK_IMPLEMENTED=YES
S51A_WEB_BEHAVIOR_INTENTIONALLY_UNCHANGED=YES
~~~

Nach S51A wurden S51B-A, der S51B-B-Scope-Lock und das lokale
S51B-B-MySQL-/Drizzle-Adapterfundament separat autorisiert und integriert.
Diese späteren Integrationen ändern nicht den historischen S51A-Scope.

## 10. Weiterhin nicht freigegeben

~~~text
S51B_B_CONNECTION_PROOF_AUTHORIZED=NO
S51B_C_SCHEMA_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
MIGRATION_AUTHORIZED=NO
AUTH_RUNTIME_AUTHORIZED=NO
ADMIN_RUNTIME_AUTHORIZED=NO
AI_RUNTIME_AUTHORIZED=NO
RAILWAY_STAGING_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
~~~

Dieses Dokument erteilt keine weitere Produktcode-, Dependency-, Commit-,
Push-, PR-, Merge-, Datenbank-, Railway- oder Deploymentfreigabe.
