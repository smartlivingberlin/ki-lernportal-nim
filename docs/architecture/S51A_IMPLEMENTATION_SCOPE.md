# S51A – Exact Workspace and Package-Skeleton Implementation Scope

**Status:** Architektonisch freigegebener Implementierungskandidat; gesonderte Scope- und Umsetzungsfreigaben ausstehend
**Stand:** 17. Juli 2026
**Architekturvoraussetzung:** erfüllt durch `APPROVE_ARCHITECTURE` vom 17. Juli 2026

## 1. Ziel

S51A führt ausschließlich das physische Workspace- und Package-Gerüst der
modularen Monolith-Architektur ein.

S51A implementiert keine produktive Fachfunktion.

Der bestehende öffentliche Lernraum muss sich nach S51A funktional genauso
verhalten wie vorher.

## 2. Vorgesehene Packages

Exakt folgende acht Package-Grenzen werden eingeführt:

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

Jedes Package erhält mindestens:

~~~text
package.json
README.md
src/index.ts
tsconfig.json oder dokumentierte geerbte TypeScript-Konfiguration
~~~

Zusätzliche Dateien benötigen eine konkrete Begründung im S51A-PR.

## 3. `packages/ui`

Verantwortung:

- wiederverwendbare UI-Primitives;
- Design-System-Grenze;
- zugängliche Komponentenverträge;
- React-basierte Darstellung.

Erlaubt:

- React;
- UI-nahe Hilfsfunktionen;
- Styling-nahe Abhängigkeiten, sofern ausdrücklich geprüft.

Verboten:

- Drizzle;
- Datenbankzugriffe;
- Auth-SDKs;
- AI-Provider;
- Search-Provider;
- Railway-SDKs;
- Secret-Zugriff;
- serverseitige Rollenentscheidung.

## 4. `packages/contracts`

Verantwortung:

- providerneutrale Request- und Response-Schemas;
- validierte Commands;
- kontrollierte Fehler;
- Health- und Readiness-Schemas;
- Search-, Auth-, Learning- und Admin-Verträge.

Verboten:

- React;
- Next.js;
- Drizzle;
- Datenbankclient;
- Railway;
- AI-Provider-SDK;
- konkrete Monitoring-Anbieter.

## 5. `packages/domain`

Verantwortung:

- reine fachliche Typen;
- Policies;
- Zustände;
- Domain Errors;
- Zustandsübergänge;
- Ownership-, Scope-, Revision- und Learning-Begriffe.

Verboten:

- React;
- Next.js;
- Drizzle;
- Datenbankclient;
- HTTP-Framework;
- Dateisystemzugriff;
- Railway;
- AI-Provider-SDK;
- Monitoring-SDK;
- Environment-Zugriff.

`packages/domain` bleibt infrastrukturfrei.

## 6. `packages/db`

Verantwortung in S51A:

- spätere Persistenzgrenze dokumentieren;
- Repository-Interfaces oder Adaptergrenzen vorbereiten;
- kontrollierte Exportoberfläche bereitstellen.

S51A darf nicht enthalten:

- Drizzle-Schema;
- Migration;
- MySQL-Verbindung;
- Connection String;
- Datenbankabfrage;
- produktives Repository;
- Seed;
- Testdatenbank;
- Railway-Datenbankintegration.

## 7. `packages/auth`

Verantwortung in S51A:

- Auth-Interfaces;
- Session-Interfaces;
- Policy-Grenze;
- dokumentierte spätere Adapterpunkte.

S51A darf nicht enthalten:

- Loginroute;
- Registrierung;
- Passwort-Hashing;
- Session-Cookie;
- Sessiontabelle;
- Recovery-Flow;
- MFA;
- Passkey;
- OAuth-Provider;
- First-User-Admin.

## 8. `packages/admin`

Verantwortung in S51A:

- Grenze für spätere administrative Application Services;
- dokumentierte Author-, Reviewer-, Publish- und Rollback-Verträge.

S51A darf nicht enthalten:

- Adminseite;
- Adminroute;
- Nutzerverwaltung;
- Rollenvergabe;
- Content Editor;
- Publikationsfunktion;
- Auditviewer;
- Break-glass-Aktion.

## 9. `packages/ai-core`

Verantwortung in S51A:

- providerneutrale AI-Interfaces;
- Retrieval-Interfaces;
- Citation- und Abstention-Verträge;
- dokumentierte Adaptergrenze.

S51A darf nicht enthalten:

- AI-Provider-SDK;
- API-Key;
- Modellaufruf;
- Embedding;
- Reranking;
- Vektordatenbank;
- RAG-Index;
- Dokumentupload;
- Prompt-Logging;
- produktive KI-Laufzeit.

## 10. `packages/testing`

Verantwortung:

- gemeinsame Test-Builder;
- Fixtures;
- Boundary-Test-Unterstützung;
- Testtypen;
- reproduzierbare Testdaten.

Regeln:

- Testcode darf `packages/testing` importieren;
- Production-Code darf `packages/testing` nicht importieren;
- `apps/web production code` darf `packages/testing` nicht importieren;
- `apps/web test code` darf `packages/testing` importieren;
- `packages/testing` darf andere Packages für Tests importieren.

## 11. Zulässige Root-Dateien

S51A darf nur die für Workspace, Build und Boundary-Tests notwendigen
Root-Dateien ändern.

Mögliche zulässige Dateien:

- `package.json`;
- `pnpm-workspace.yaml`;
- vorhandene oder neue gemeinsame TypeScript-Konfiguration;
- vorhandene ESLint-Konfiguration;
- Boundary-Check-Konfiguration;
- Boundary-Check-Skript;
- CI-Workflow für Package- und Boundary-Prüfung;
- direkt zu S51A gehörende Dokumentation.

Jede tatsächlich geänderte Datei muss im PR einzeln aufgelistet werden.

## 12. Bestehende Webanwendung

`apps/web` bleibt funktional unverändert.

Zulässig sind nur minimale Konfigurationsänderungen für Workspace-Auflösung,
sofern:

- Rendering unverändert bleibt;
- Routen unverändert bleiben;
- Texte unverändert bleiben;
- Browser-LocalStorage unverändert bleibt;
- keine neue Runtime-Abhängigkeit entsteht;
- keine externe Anfrage hinzukommt;
- keine Feature-Flag-Wirkung entsteht.

Packages werden nicht künstlich importiert, nur um ihre Existenz zu demonstrieren.

## 13. Vorgesehene Import-Richtung

Grundregel:

~~~text
apps/web
-> packages/ui
-> packages/contracts
-> packages/domain
~~~

Serverseitige Composition darf später verwenden:

~~~text
apps/web server-only
-> packages/auth
-> packages/admin
-> packages/db
-> packages/ai-core
~~~

Die tatsächliche spätere Application-Service-Struktur wird in den jeweiligen
Feature-Slices erweitert.

## 14. Verbotene Import-Richtungen

Mindestens verboten sind:

- `packages/domain` importiert Infrastruktur;
- `packages/ui` importiert `packages/db`;
- `packages/ui` importiert `packages/auth`;
- `packages/ui` importiert `packages/ai-core`;
- `packages/contracts` importiert Next.js;
- `packages/contracts` importiert Drizzle;
- `packages/db` importiert UI;
- `packages/auth` importiert UI;
- Production-Packages importieren `packages/testing`;
- `apps/web production code` importiert `packages/testing`;
- zyklische Package-Abhängigkeiten.

## 15. Exklusive Anbietergrenzen

Spätere Regeln werden bereits statisch vorbereitet:

- nur `packages/db` darf Drizzle importieren;
- nur `packages/ai-core` darf AI-, Embedding- oder Reranking-SDKs importieren;
- nur genehmigte Adapter dürfen Monitoring-SDKs importieren;
- nur serverseitige Composition darf Secrets lesen;
- Browserpakete dürfen keine Server-Secrets importieren.

In S51A werden diese Anbieter selbst noch nicht installiert.

## 16. Boundary-Automation

S51A muss einen deterministischen Check einführen, der mindestens fehlschlägt bei:

- nicht deklarierter Package-Abhängigkeit;
- verbotener Import-Richtung;
- zyklischer Package-Abhängigkeit;
- Production-Import von `packages/testing`;
- Drizzle-Import außerhalb `packages/db`;
- AI-SDK-Import außerhalb `packages/ai-core`;
- Next.js-Import in `packages/domain`;
- React-Import in `packages/domain`;
- fehlendem Package-Manifest;
- fehlendem Package-Entry-Point;
- fehlender TypeScript-Konfiguration;
- unzulässigem direkten Quellpfadimport.

Der Check läuft lokal und in CI.

## 17. Package-Manifeste

Jedes `package.json` muss:

- einen eindeutigen Package-Namen besitzen;
- `private: true` verwenden, solange keine Veröffentlichung freigegeben ist;
- kontrollierte `exports` definieren;
- keine unnötige Runtime-Abhängigkeit besitzen;
- keine ungepinnte Toolchain einführen;
- den vorhandenen Package Manager respektieren;
- keine Publish-Konfiguration aktivieren.

## 18. TypeScript

S51A soll:

- gemeinsame strenge TypeScript-Regeln verwenden;
- alle Package-Entry-Points prüfen;
- keine impliziten `any`-Fluchtwege einführen;
- keine produktiven Stubwerte vortäuschen;
- Type-only Imports korrekt behandeln;
- Build-Reihenfolge reproduzierbar machen.

Ein Interface darf leer oder minimal sein, wenn klar dokumentiert wird, dass
keine Runtime-Implementierung existiert.

## 19. README je Package

Jedes Package-README dokumentiert:

- Zweck;
- erlaubte Imports;
- verbotene Imports;
- öffentliche Exports;
- aktueller Implementierungsstatus;
- spätere verantwortliche Slices;
- Sicherheits- und Datenschutzgrenzen.

Kein README darf eine noch nicht existierende Funktion als implementiert
darstellen.

## 20. Keine neuen Produktabhängigkeiten ohne Bedarf

S51A soll nach Möglichkeit keine neue produktive Drittanbieterabhängigkeit
benötigen.

Wenn für den Boundary-Check eine neue Dev Dependency notwendig ist:

- genaue Notwendigkeit dokumentieren;
- Alternativen prüfen;
- Version festlegen;
- Supply-Chain- und Vulnerability-Gates ausführen;
- gesonderte menschliche Dependency-Prüfung beachten.

Ein eigenes kleines deterministisches Skript ist zulässig, wenn es einfacher und
prüfbarer ist.

## 21. Bestehende CI-Gates

Alle bestehenden CI-#152-Schutzwirkungen bleiben erhalten:

- gepinnte Toolchain;
- Governance-Check;
- Frozen Install;
- Supply-Chain-Policy;
- Dependency Audit;
- Production Dependency Audit;
- Produktionsbuild;
- Standalone-Prüfung;
- Lint;
- Content Quality;
- Quellenintegrität;
- Lesson Integrity;
- Playwright;
- Responsive Regression;
- Hydration Regression;
- Accessibility Regression;
- Practice Engine;
- Progress- und Persistence-Smokes;
- Reset;
- Cross-Tab;
- UI Guardrails.

S51A darf keine bestehende Prüfung entfernen oder abschwächen.

## 22. Neue S51A-Prüfungen

Zusätzlich erforderlich:

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

Die Namen können technisch abweichen, die Schutzwirkung nicht.

## 23. Exakte Acceptance Criteria

S51A ist nur abnahmefähig, wenn:

1. exakt acht Package-Skeletons vorhanden sind;
2. jedes Package eine dokumentierte Verantwortung besitzt;
3. der Dependency Graph azyklisch ist;
4. verbotene Imports automatisiert abgelehnt werden;
5. Production-Code `packages/testing` nicht importieren kann;
6. das bestehende Webverhalten unverändert bleibt;
7. keine produktive Datenbankverbindung existiert;
8. keine Migration existiert;
9. keine Authroute existiert;
10. kein Cookie oder Credential implementiert ist;
11. keine Adminfunktion existiert;
12. keine AI-Provider-Abhängigkeit existiert;
13. keine externe AI-Anfrage existiert;
14. keine serverseitige Suche existiert;
15. kein Hintergrundworker existiert;
16. keine Railway-Datei, kein Environment und kein Deployment verändert wird;
17. alle alten und neuen CI-Gates grün sind;
18. `git diff --check` besteht;
19. keine Secrets enthalten sind;
20. der PR ausschließlich S51A enthält.

## 24. Ausdrücklich verboten in S51A

Nicht zulässig sind:

- Drizzle-Schema;
- Datenbankmigration;
- MySQL-Verbindung;
- Sessiontabelle;
- Login;
- Registrierung;
- Passwort-Hashing;
- Recovery;
- MFA;
- Rollenpersistenz;
- Adminseite;
- Content Editor;
- Publikationsworkflow;
- Auditpersistenz;
- Learning-Datenbank;
- serverseitiger Fortschritt;
- Assessment Scoring;
- Wiederholungslogik;
- Outboxtabelle;
- Worker;
- Scheduler;
- externe Queue;
- serverseitige Search Route;
- Search-Index;
- Embeddings;
- Vektordatenbank;
- AI-Provider;
- Dokumentupload;
- Analytics;
- Tracking;
- Payment;
- Organisationserstellung;
- White Label;
- Railway-Staging;
- Production-Deploy.

## 25. Git- und Branch-Grenze

S51A soll erst nach einem gegebenenfalls genehmigten Merge von PR #73 auf einem
neuen kleinen Branch vom dann aktuellen `main` beginnen.

Vorgeschlagener Branchname:

~~~text
feat/s51a-package-skeleton-20260717
~~~

Vorgeschlagener Commit-Betreff:

~~~text
feat: establish S51A package boundaries
~~~

Beides sind Kandidaten und noch nicht autorisiert.

## 26. Stop-Bedingungen

Ohne Commit oder Push stoppen, wenn:

- der erwartete Basis-Commit nicht stimmt;
- `main` unerwartet verändert wurde;
- der Worktree nicht sauber ist;
- Package-DAG mehrdeutig ist;
- sichtbares Produktverhalten verändert wird;
- eine neue ungeprüfte Dependency notwendig wird;
- bestehende CI-Gates geschwächt werden;
- Product Code über Konfiguration hinaus verändert wird;
- Datenbank-, Auth-, Admin-, AI- oder Search-Implementierung in den Diff gelangt;
- Railway- oder Environment-Dateien verändert werden;
- Secrets erscheinen;
- der Scope größer als S51A wird.

## 27. Reviewfokus für S51A

Reviewer prüfen insbesondere:

- exakte Anzahl der Packages;
- Package-Namen;
- öffentliche Exports;
- Dependency Graph;
- verbotene Importpfade;
- Production/Test-Trennung;
- bestehende CI-Abdeckung;
- unnötige Dependencies;
- unveränderte Weboberfläche;
- Abwesenheit späterer S51B- bis S57-Funktionen.

## 28. Nicht Bestandteil der S51A-Abnahme

Die S51A-Abnahme bewertet nicht:

- Qualität eines Datenbankschemas;
- Authentifizierungsimplementierung;
- Passwortsicherheit;
- Admin-UX;
- Lernwirkungsmodell in Runtime;
- Assessment-Scoring;
- AI-Modellqualität;
- Search-Ranking;
- Railway-Staging;
- Production Readiness.

Diese Themen gehören in spätere Slices.

## 29. Nach S51A

Erst nach vollständiger S51A-Abnahme kann separat geplant werden:

~~~text
S51B Persistenzfundament
S51C Betriebsfundament
S51D isoliertes Railway-Staging
S52 Auth, Sessions, Rollen und Ownership
S53 Admin, Content, Quellen und Medien
S54/S55 Lernen und Assessments
S56 AI und RAG
S57 Monitoring, Restore und Pilotbetrieb
~~~

Keine dieser Phasen wird durch S51A automatisch freigegeben.

## 30. Autorisierungsgate

~~~text
S51A_SCOPE_DOCUMENTED=YES
S51A_SCOPE_APPROVED=NO
S51A_IMPLEMENTATION_AUTHORIZED=NO
S51A_BRANCH_CREATION_AUTHORIZED=NO
S51A_PRODUCT_CODE_CHANGE_AUTHORIZED=NO
S51A_DEPENDENCY_CHANGE_AUTHORIZED=NO
S51A_COMMIT_AUTHORIZED=NO
S51A_PUSH_AUTHORIZED=NO
S51A_PR_AUTHORIZED=NO
S51A_READY_FOR_REVIEW_AUTHORIZED=NO
S51A_MERGE_AUTHORIZED=NO
S51A_DEPLOY_AUTHORIZED=NO
DATABASE_CHANGE_AUTHORIZED=NO
RAILWAY_CHANGE_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
~~~

## 31. Aktueller Status

Dieses Dokument definiert ausschließlich den exakten Kandidatenscope.

Es erteilt keine Umsetzungsfreigabe.

~~~text
HUMAN_ARCHITECTURE_APPROVAL=YES
HUMAN_IMPLEMENTATION_APPROVAL=NO
COMMIT_AUTHORIZED=NO
PUSH_AUTHORIZED=NO
MERGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
~~~
