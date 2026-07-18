# ADR-0002 – Next.js-Servergrenzen und sichere Delegation

- **Status:** In S50B-R3 menschlich beschlossen; Implementierungs- und Git-Freigaben ausstehend
- **Datum:** 17. Juli 2026
- **Basis:** `4173f2d935e3145142dce539b399bf8b9d77ee79`
- **Betrifft:** API, Authentifizierung, Autorisierung, Admin, Datenbank und KI-Aufrufe
- **Aktueller Freigabekandidat:** `../S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md`
- **Exakte S51A-Grenze:** `../S51A_IMPLEMENTATION_SCOPE.md`
- **Historische Grundlage:** `../S50B_R2_SOURCE_OF_TRUTH.md`

Für den tatsächlichen S51A-Datei-, Dependency- und Implementierungsscope hat
`../S51A_IMPLEMENTATION_SCOPE.md` Vorrang.

## 1. Kontext

Das Portal benötigt künftig serverseitige Validierung, widerrufbare Sessions,
Rollen, Scopes, Ownership, Persistenz, Adminaktionen und KI-Adapter.

Eine zweite Hauptruntime würde zusätzliche Auth-, Deployment-, Monitoring-,
Fehler- und Kostenbereiche schaffen. Für den aktuellen Projektstand besteht
dafür kein belegter Bedarf.

## 2. Entscheidung

Für die erste Plattformphase dienen Next.js Route Handler und Server Actions
als serverseitige Composition Boundary.

```text
Browser
-> Route Handler oder Server Action
-> Eingabevalidierung
-> Authentifizierung
-> Autorisierung, Scope und Ownership
-> Domain Use Case
-> Repository- oder Provider-Interface
-> Infrastrukturadapter
```

Geschäftslogik bleibt in fachneutralen Paketen. Next.js komponiert die
Anwendungsgrenzen, ersetzt aber nicht Domain-Policies oder Repository-Interfaces.

## 3. Verbindliche Regeln

### Eingaben

- alle externen Eingaben werden durch versionierte Schemas validiert;
- unbekannte Felder werden nach Vertrag abgewiesen oder bewusst verworfen;
- IDs, Dateinamen, URLs, Suchtexte und Pagination werden begrenzt;
- Fehlerantworten enthalten keine internen Stacktraces oder Secrets.

### Authentifizierung

- produktive Sitzungen sind serverseitig widerrufbar;
- Session-Cookies sind `HttpOnly`, `Secure` und angemessen `SameSite`;
- Sessionrotation erfolgt nach Login und sicherheitskritischen Änderungen;
- lange, nicht widerrufbare JWT-Sitzungen sind ausgeschlossen;
- kein Mechanismus macht automatisch den ersten Nutzer zum Administrator;
- Passwort- und Recovery-Flows benötigen Rate Limits und Security Events.

### Autorisierung

- jede geschützte Operation prüft Rolle, Scope und Ownership serverseitig;
- eine Ressourcen-ID ist niemals ein Berechtigungsnachweis;
- Navigation, versteckte Buttons und Clientzustand ersetzen keine Policy;
- Admin-UI und API verwenden dieselben serverseitigen Regeln;
- Autor und Reviewer bleiben bei Veröffentlichungen getrennt;
- Break-glass benötigt starke Authentifizierung, Grund und Audit.

### Datenbank

- nur `packages/db` importiert Drizzle;
- React-Komponenten und Clientcode greifen niemals direkt auf die Datenbank zu;
- Repositories kapseln Queries und Transaktionen;
- Migrationen sind versioniert, wiederholbar geprüft und im Ledger erfasst;
- dynamische DDL im Requestpfad ist ausgeschlossen;
- Mandanten-, Scope- und Ownership-Filter dürfen nicht optional sein.

### KI und externe Provider

- nur `packages/ai-core` importiert KI-, Embedding- oder Reranking-SDKs;
- Providerzugriffe erfolgen über Interfaces und Feature Flags;
- Prompts, Dokumentvolltexte, Tokens und personenbezogene Daten erscheinen
  nicht in Betriebslogs;
- Retrieval filtert Berechtigung und Ownership vor der Generierung;
- Antworten benötigen Quellenbezug oder kontrollierte Enthaltung;
- Provider, Modell und Funktion sind getrennt abschaltbar.

## 4. Fehler- und Loggingvertrag

Jede Servergrenze verwendet:

- stabile fachliche Fehlercodes;
- sichere öffentliche Fehlermeldungen;
- Correlation ID;
- redigierte strukturierte Logs;
- getrennte Security- und Fachaudit-Ereignisse;
- keine Cookies, Tokens, Secrets, Passwörter oder Dokumentvolltexte;
- messbare Latenz, Fehlerrate und Rate-Limit-Ereignisse.

## 5. Idempotenz und Nebenwirkungen

Operationen mit möglichen Wiederholungen benötigen einen Idempotenzvertrag,
insbesondere:

- Veröffentlichung;
- Rollenänderung;
- Uploadabschluss;
- E-Mail-Versand;
- KI-Indexierung;
- Zahlungs- oder Abrechnungsaktionen in späteren Phasen.

Nebenwirkungen werden erst nach erfolgreicher Validierung und Autorisierung
ausgelöst. Teilfehler müssen nachvollziehbar kompensiert oder wiederholt werden
können.

## 6. Tests

Jede geschützte Servergrenze benötigt mindestens:

- erlaubter positiver Pfad;
- nicht authentifizierter Zugriff;
- falsche Rolle;
- falscher Scope;
- fremde Ownership;
- ungültige Eingabe;
- nicht vorhandene Ressource;
- Rate-Limit- oder Wiederholungsfall;
- redigierte Fehler- und Logausgabe.

Für kritische Policies werden tabellengesteuerte Negativtests verwendet.

## 7. Auslagerungskriterien

Ein separater Worker oder Service wird erst geprüft, wenn mindestens eines
belegt ist:

- Jobs überschreiten zuverlässig den Request-Lifecycle;
- unabhängige Skalierung ist durch Messwerte erforderlich;
- Isolation ist aus Security- oder Datenschutzgründen notwendig;
- ein externer Anbieter oder ein Protokoll erzwingt eine separate Runtime;
- Fehlertoleranz oder Warteschlangen benötigen eine entkoppelte Ausführung.

Auch nach einer Auslagerung bleiben Domainverträge unabhängig von Railway,
Python, einem Provider oder einer konkreten Queue.

## 8. Abgelehnte Alternativen

Für Phase 1 werden abgelehnt:

- eine parallele FastAPI-, Express- oder NestJS-Hauptruntime;
- Autorisierung ausschließlich im Browser;
- Rollen allein aus nicht widerrufbaren JWTs;
- direkte Drizzle-Nutzung in Route-Komponenten;
- direkte KI-SDK-Aufrufe aus UI- oder Route-Dateien;
- dynamische Schemaänderungen während normaler Requests;
- versteckte Adminfunktionen ohne serverseitige Policy.

## 9. Konsequenzen

Vorteile:

- eine klar kontrollierte Servergrenze;
- weniger Deployment- und Authentifizierungsflächen;
- testbare Ownership- und Scope-Policies;
- spätere Serviceauslagerung ohne Domain-Neuschreibung.

Nachteile:

- Paket- und Importgrenzen müssen automatisiert geprüft werden;
- lang laufende Aufgaben benötigen später wahrscheinlich Queue oder Worker;
- serverseitige Policies müssen konsequent zentral gepflegt werden.

## 10. Gate

Dieses ADR ist in S50B-R3 integriert und seit dem 17. Juli 2026 durch
menschliche Abnahme beschlossen.

```text
ADR_SERVER_BOUNDARIES_DOCUMENTED=YES
ADR_SERVER_BOUNDARIES_APPROVED=YES
AUTH_SESSION_MODEL_DOCUMENTED=YES
AUTH_SESSION_MODEL_APPROVED=YES
ROLE_SCOPE_OWNERSHIP_MODEL_DOCUMENTED=YES
ROLE_SCOPE_OWNERSHIP_MODEL_APPROVED=YES
DB_REPOSITORY_BOUNDARY_DOCUMENTED=YES
DB_REPOSITORY_BOUNDARY_APPROVED=YES
AI_PROVIDER_BOUNDARY_DOCUMENTED=YES
AI_PROVIDER_BOUNDARY_APPROVED=YES
NEGATIVE_POLICY_TESTS_REQUIRED=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
S51A_SCOPE_DOCUMENTED=YES
S51A_SCOPE_APPROVED=NO
S51A_IMPLEMENTATION_AUTHORIZED=NO
COMMIT_AUTHORIZED=NO
PUSH_AUTHORIZED=NO
MERGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
```

Dieses ADR erteilt keine Implementierungs-, Commit-, Push-, Merge- oder
Deployfreigabe.
