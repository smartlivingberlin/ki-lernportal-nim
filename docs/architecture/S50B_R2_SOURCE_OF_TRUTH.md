# S50B-R2 – Historische Architekturgrundlage

**Status:** Historische Grundlage; für die aktuelle Freigabeentscheidung durch S50B-R3 ergänzt
**Stand:** 17. Juli 2026
**Ursprüngliche Basis:** `4173f2d935e3145142dce539b399bf8b9d77ee79`
**Aktueller Nachfolger:** [`S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md`](./S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md)
**Scope:** Architektur und Reihenfolge kommender Entwicklungsslices

## 1. Rangfolge

Bei Widersprüchen gilt:

1. aktueller reproduzierbarer Repository-, GitHub- und Railway-Beweis;
2. das aktuelle [`S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md`](./S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md)
   einschließlich der acht ergänzten Architekturverträge;
3. die aktuelle Zielarchitektur, ADRs, Package-DAG und Plattformverträge;
4. dieses S50B-R2-Dokument als historische Grundlage;
5. aktuelle Produkt-, UX-, Sicherheits- und Betriebsanforderungen;
6. ältere Entwicklungspläne, Agentenprompts und Backlogs.

Dieses Dokument bleibt Evidenz, ist aber nicht mehr alleinige
Implementierungs- oder Freigabeanweisung.

## 2. Nachgewiesener Istzustand

Vorhanden sind eine produktionsfähig baubare Next.js-Anwendung unter `apps/web`,
zwölf Anfängerlektionen, lokale Suche und lokaler Lernfortschritt, zwölf Übungen
mit 36 Selbstprüfungsfragen, Content-, Quellen-, Accessibility-, Governance- und
Supply-Chain-Gates, ein Standalone-Build und eine öffentliche Railway-Konzeptdemo.

Noch nicht vorhanden sind produktive Datenbank und Migrationen, serverseitige
Konten und widerrufbare Sessions, Rollen/Scopes/Ownership, Admin-, Review-,
Publish- und Rollback-System, serverseitiger Lernfortschritt, produktive KI/RAG,
isoliertes Railway-Staging, kontinuierliches Monitoring und Restore-Nachweis.

## 3. Vorgesehene Zielarchitektur

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

Im Architekturentwurf vorgesehene Rollen:

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

1. S50B-R3 Architektur-Freigabepaket;
2. S51A Workspace- und Package-Skeleton;
3. S51B MySQL/Drizzle und Migration Ledger;
4. S51C Feature Flags, Health, Readiness und Logs;
5. S51D isoliertes Railway-Staging nach separater Freigabe;
6. S52 Auth, Sessions, Rollen und Ownership;
7. S53 Content-, Quellen- und Medienadmin;
8. S54/S55 Lernfortschritt, Fragen und Wiederholung;
9. S56 KI/RAG hinter Evaluation Gate;
10. S57 Monitoring, Backup, Restore und Incident Response.

## 10. Historischer Status und aktuelles Exit-Gate

S50B-R2 bleibt als historische Grundlage erhalten. Die aktuelle
Entscheidung wird ausschließlich über das S50B-R3-Freigabepaket getroffen.

~~~text
S50B_R2_RETAINED_AS_HISTORICAL_EVIDENCE=YES
S50B_R3_IS_CURRENT_APPROVAL_CANDIDATE=YES
S50B_R3_PACKAGE_COMPLETE=YES
S50B_R3_PACKAGE_APPROVED=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
S51A_SCOPE_DOCUMENTED=YES
S51A_SCOPE_APPROVED=NO
HUMAN_IMPLEMENTATION_APPROVAL=NO
COMMIT_AUTHORIZED=NO
PUSH_AUTHORIZED=NO
READY_FOR_REVIEW_AUTHORIZED=NO
MERGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
~~~

Dieses Dokument erteilt weder Implementierungs-, Commit-, Push-, PR-, Merge-,
Datenbank-, Railway- noch Deployfreigabe.
