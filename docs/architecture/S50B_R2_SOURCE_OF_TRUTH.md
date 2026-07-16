# S50B-R2 – Verbindliche Architektur-Source-of-Truth

**Status:** Entwurf zur menschlichen Abnahme
**Stand:** 16. Juli 2026
**Basis:** `4173f2d935e3145142dce539b399bf8b9d77ee79`
**Scope:** Architektur und Reihenfolge kommender Entwicklungsslices

## 1. Rangfolge

Bei Widersprüchen gilt:

1. aktueller reproduzierbarer Repository-, GitHub- und Railway-Beweis;
2. dieses Dokument und die daraus abgeleiteten ADRs;
3. aktuelle Sicherheits-, Qualitäts- und Railway-Verträge;
4. aktuelle Produkt- und UX-Anforderungen;
5. historische Entwicklungspläne, alte Agentenprompts und alte Backlogs.

Ältere Dokumente bleiben Evidenz, sind aber keine aktuelle Implementierungsanweisung.

## 2. Nachgewiesener Istzustand

Vorhanden sind eine produktionsfähig baubare Next.js-Anwendung unter `apps/web`,
zwölf Anfängerlektionen, lokale Suche und lokaler Lernfortschritt, zwölf Übungen
mit 36 Selbstprüfungsfragen, Content-, Quellen-, Accessibility-, Governance- und
Supply-Chain-Gates, ein Standalone-Build und eine öffentliche Railway-Konzeptdemo.

Noch nicht vorhanden sind produktive Datenbank und Migrationen, serverseitige
Konten und widerrufbare Sessions, Rollen/Scopes/Ownership, Admin-, Review-,
Publish- und Rollback-System, serverseitiger Lernfortschritt, produktive KI/RAG,
isoliertes Railway-Staging, kontinuierliches Monitoring und Restore-Nachweis.

## 3. Verbindliche Zielarchitektur

Die Plattform wird als **modularer Next.js-Monolith** aufgebaut:

```text
apps/web
packages/ui
packages/contracts
packages/domain
packages/db
packages/auth
packages/admin
packages/ai-core
packages/testing
```

Für Phase 1 gilt:

- eine Next.js-Hauptruntime;
- keine zweite Express-, FastAPI- oder NestJS-Hauptruntime;
- MySQL mit Drizzle als geplante relationale Persistenz;
- kein fest gekoppelter Vektor-Datenbankanbieter;
- keine Microservice-, Kubernetes-, LMS-, CRM- oder ERP-Pflicht;
- risikoreiche Funktionen standardmäßig ausgeschaltet.

## 4. Paket- und Servergrenzen

- nur `packages/db` importiert Drizzle;
- nur `packages/ai-core` importiert KI-, Embedding- oder Reranking-SDKs;
- `domain` kennt weder Next.js noch Railway, Drizzle oder Provider-SDKs;
- React-Komponenten greifen nicht direkt auf Datenbank oder Provider zu;
- Browsercode trifft keine endgültige Berechtigungsentscheidung;
- IDs sind niemals ein Berechtigungsnachweis.

Serverfluss:

```text
Browser
-> Next.js Route Handler oder Server Action
-> Eingabevertrag
-> Authentifizierung
-> Autorisierung, Scope und Ownership
-> Domain Use Case
-> Repository- oder Provider-Interface
-> Adapter
```

## 5. Rollen und Veröffentlichung

Verbindliche Rollen:

```text
Visitor
Learner
Editor
Reviewer
Admin
Owner
```

Grundregeln:

- Rollen sind scopefähige Datensätze;
- Owner ist kein Alltagsadmin;
- Autor und Reviewer bleiben getrennt;
- ein Autor genehmigt nicht den eigenen Entwurf;
- Navigation ersetzt keine serverseitige Policy;
- Break-glass benötigt starke Authentifizierung, Begründung und Audit.

Workflow:

```text
Draft
-> Review requested
-> Changes requested oder Approved
-> Published
-> Superseded, Archived oder Rolled back
```

## 6. KI/RAG

Nur freigegebene Content- und Quellenrevisionen dürfen indexiert werden.

```text
Freigegebener Inhalt
-> normalisierte Revision
-> Chunking mit Provenienz
-> kontrollierter Index
-> berechtigungsgefiltertes Retrieval
-> Zitat- und Policy-Prüfung
-> Antwort oder kontrollierte Enthaltung
```

Pflicht sind Ownership-Prüfung, Quellenrückverfolgbarkeit, Injection- und
Exfiltrationstests, Kostenlimits, redigierte Logs und keine automatische
Veröffentlichung KI-generierter Inhalte.

## 7. Premium-Transfer

Premium ist eine Pattern Library, keine Zielcodebasis.

Erlaubte Klassifikationen:

```text
KEEP_AS_PRINCIPLE
ADAPT_PATTERN
REBUILD_FOR_NIM
DEFER
REJECT
```

Auth, Sessions, Rollen, Ownership, Datenmodell, Admin, Upload und KI/RAG werden
für NIM neu gebaut. Fachgebundene Immobilien-, Payment-, White-Label-, Vite- und
Express-Strukturen werden nicht ungeprüft übernommen.

## 8. Railway-Grenze

- Production ist keine Testumgebung.
- PR #68 bleibt ein separater Repository-Readiness-PR.
- Merge und Deploy sind getrennte menschliche Entscheidungen.
- Vor Production muss ein isoliertes Staging bestehen.
- Root Directory, Config Source, Region, Branch, Variablen und Wait for CI
  benötigen jeweils eine separate Freigabe.
- Ein Deployment-Healthcheck ersetzt kein kontinuierliches Monitoring.

## 9. Reihenfolge

1. S50B-R2 Architekturvertrag;
2. S51A Workspace- und Package-Skeleton;
3. S51B MySQL/Drizzle und Migration Ledger;
4. S51C Feature Flags, Health, Readiness und Logs;
5. S51D isoliertes Railway-Staging nach separater Freigabe;
6. S52 Auth, Sessions, Rollen und Ownership;
7. S53 Content-, Quellen- und Medienadmin;
8. S54/S55 Lernfortschritt, Fragen und Wiederholung;
9. S56 KI/RAG hinter Evaluation Gate;
10. S57 Monitoring, Backup, Restore und Incident Response.

## 10. Exit-Gate vor Produktcode

```text
ARCHITECTURE_SOURCE_OF_TRUTH=APPROVED
ADR_MODULAR_MONOLITH=APPROVED
ADR_SERVER_BOUNDARIES=APPROVED
PACKAGE_DAG=APPROVED
ROLE_SCOPE_CONTRACT=APPROVED
ADMIN_WORKFLOW_CONTRACT=APPROVED
AI_RAG_TRUST_BOUNDARIES=APPROVED
FEATURE_FLAG_CONTRACT=APPROVED
PREMIUM_TRANSFER_LEDGER=REVIEWED
HUMAN_IMPLEMENTATION_APPROVAL=YES
```

Dieses Dokument erteilt weder Implementierungs-, Commit-, Push-, Merge-,
Datenbank- noch Deployfreigabe.
