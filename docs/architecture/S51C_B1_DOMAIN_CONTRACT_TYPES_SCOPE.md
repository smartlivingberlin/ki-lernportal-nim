# S51C-B1 – Domain- und Contract-Typen-Scope-Lock

**Status:** Dokumentarischer Scope-Lock integriert. S51C-B1A ist über PR #102
implementiert und auf `main` integriert; siehe
`S51C_B1A_IMPLEMENTATION_SCOPE.md`. S51C-B1B-Code ist über PR #104 vorhanden,
benötigt aber einen eigenen Gate-/CI-Nachzug. Schema-Live-Migrate, Runtime,
Railway und Deployment bleiben gesperrt.

**Parent:** GitHub Issue #94
**Baseline:** `566ac0a88d921e660f13b8296ffd2536459f74be`
**Arbeitsbranch:** `cursor/s51c-b1a-ci-gate-docs-b554`

## 1. Zweck

Dieser Vertrag teilt den ersten Implementierungsschritt nach S51C-A in zwei
getrennt zu autorisierende Folgeslices:

1. **S51C-B1A:** Pilot-Domain-Vokabular und reine fachliche Regeln.
2. **S51C-B1B:** Providerneutrale Contract-Typen und Validierungsgrenzen.

Dieses Dokument implementiert weder B1A noch B1B.

## 2. Verbindliche Quellenhierarchie

1. `S51C_A_PILOT_PERSISTENCE_SCOPE.md` ist für den ersten Pilot die engere
   und vorrangige Quelle.
2. Allgemeine Architekturverträge gelten nur ergänzend.
3. Breitere Zielmodelle werden nicht automatisch freigegeben.
4. Jeder Implementierungsslice benötigt eine getrennte Autorisierung.

## 3. Exakter Dateiscope

Dieser Dokumentationsslice erzeugt ausschließlich:

```text
docs/architecture/S51C_B1_DOMAIN_CONTRACT_TYPES_SCOPE.md
```

Unzulässig sind Änderungen an `apps/**`, `packages/**`, `scripts/**`,
`.github/**`, Manifesten, Lockfiles, Tests, Schema, SQL, Migrationen,
Datenbank-, Auth-, Web-, Railway- oder Deploymentdateien.

## 4. Verbindliche Reihenfolge und Abhängigkeit

```text
S51C-B1A Domain-Vokabular
-> getrennte Prüfung und Integration
-> S51C-B1B Contract-Typen
-> späterer separat freizugebender Schema-/Migrationsslice
```

```text
packages/contracts -> packages/domain = erlaubt
packages/domain -> packages/contracts = verboten
```

## 5. S51C-B1A – Domain-Vokabular

B1A gehört ausschließlich zu `packages/domain` und bleibt vollständig
infrastruktur- und frameworkfrei.

B1A darf später ausschließlich kontrollierte Statuswerte, Pilotrollen,
Fortschrittsquellen, Lernereignistypen, Feedbackarten, Diagnostikarten,
Statusübergänge, terminale Zustände sowie reine fachliche Prädikate und
Fehlerbegriffe definieren.

### 5.1 Statusfamilien

```text
users=active,suspended,pending_deletion,deidentified
pilot_cohorts=draft,active,closed,archived
pilot_memberships=active,suspended,ended
lesson_progress=in_progress,completed
assessment_runs=in_progress,completed,abandoned
privacy_requests=requested,processing,completed,failed
```

Bei `lesson_progress` wird `not_started` durch das Fehlen eines Datensatzes
dargestellt.

### 5.2 Zulässige Übergänge

```text
users:
  active -> suspended | pending_deletion
  suspended -> active | pending_deletion
  pending_deletion -> deidentified

pilot_cohorts:
  draft -> active | archived
  active -> closed
  closed -> archived

pilot_memberships:
  active -> suspended | ended
  suspended -> active | ended

assessment_runs:
  in_progress -> completed | abandoned

privacy_requests:
  requested -> processing | failed
  processing -> completed | failed
  failed -> processing
```

Jeder nicht aufgeführte Übergang bleibt verboten.
`privacy_requests.failed -> processing` ist nur als autorisierter
Wiederholungsversuch mit unverändertem Request-Typ und erhaltener
Fehlerhistorie zulässig.

### 5.3 Terminale Zustände

```text
users.deidentified
pilot_cohorts.archived
pilot_memberships.ended
assessment_runs.completed
assessment_runs.abandoned
privacy_requests.completed
```

### 5.4 Kontrollierte Allowlists

```text
pilot_roles=learner,pilot_admin
progress_sources=pilot_runtime,local_import
assessment_kinds=baseline,final
feedback_kinds=clarity,confidence,content_problem,technical_problem
learning_events=learning_path_started,lesson_started,lesson_completed,lesson_reopened,practice_submitted,assessment_started,assessment_completed,help_opened
```

`pilot_admin` gilt nur im eigenen Pilot-Scope. `admin_repair` gehört nicht
zum ersten Pilot. Freitextfeedback bleibt ausgeschlossen.

### 5.5 Antwortinvariante

Diagnostikantworten sind append-orientiert. Antwortinhalt und
`response_sequence` bleiben unveränderlich. Nur `is_final` darf beim Abschluss
einmal von `false` auf `true` wechseln und gehört fachlich zu
`assessment_runs.in_progress -> completed`. Abgeschlossene oder abgebrochene
Läufe nehmen keine neue Antwort an.

Persistenz, Transaktionen und Constraints gehören nicht zu B1A.

## 6. S51C-B1B – Contract-Typen

B1B gehört ausschließlich zu `packages/contracts`.

B1B darf später providerneutral Request- und Response-Typen, DTOs,
kontrollierte Fehlercodes, Event-Transporttypen, Parser-, Guard- und
Validierungsergebnisse sowie versionierte Transportverträge definieren.

B1B importiert das kanonische Vokabular aus `packages/domain` und darf es
nicht durch abweichende String-Union-Typen duplizieren.

B1B darf weder Next.js, React, Drizzle, MySQL, Railway, Datenbank- oder
Repositorycode, Auth- oder Sessionruntime, Route Handler, Server Actions,
Provider-SDKs, UI-Komponenten, Secrets noch Environmentzugriffe enthalten.

Eine externe Validierungsbibliothek ist nicht freigegeben.

### 6.1 Lokaler Fortschrittsimport

Teilimporte sind verboten. Zuerst werden alle Lektions-IDs vollständig
validiert, danach darf der Import atomar angewendet werden.

Erfolgsantwort:

```text
status=imported
import_id
client_snapshot_hash
imported_lesson_ids
already_present_lesson_ids
imported_lesson_count
already_present_lesson_count
```

Ablehnungsantwort:

```text
status=rejected
error_code=LOCAL_PROGRESS_IMPORT_REJECTED
rejected_lesson_ids
```

Die ID-Listen gehören nur zur unmittelbaren Antwort. Der rohe
Browser-Snapshot wird nicht dauerhaft gespeichert. Dieser Vertrag erfindet
keine weiteren Fehlercodes.

## 7. Ausgeschlossener Scope

Weder B1A noch B1B umfassen Tabellen, Drizzle-Schema, SQL, Migrationen, Seeds,
Datenbankverbindungen, Queries, Repositories, Transaktionen, Credentials,
Passwort-Hashing, Sessions, Einladungsruntime, Rollenpersistenz, APIs,
Server Actions, Web- oder UI-Integration, Adminruntime, Railway, Deployment,
Productionänderungen, Retention- oder Löschjobs, Backups, Observability-,
KI-, RAG- oder Paymentruntime, B2B, Multi-Tenant, White Label, Mastery-,
Review- oder Wiederholungsplanung, Content-Publikation oder automatische
LLM-Bewertung.

## 8. Retention-Grenze

B1A darf neutrale Retention-, Lösch- und Deidentifizierungsbegriffe
vorbereiten. Konkrete 30-/90-Tage-Werte bleiben unfreigegebene Kandidaten.

```text
RETENTION_VALUES_APPROVED=NO
```

## 9. Prüfgrenzen späterer Implementierung

Ein später autorisierter B1A-Slice muss erlaubte und verbotene Übergänge,
terminale Zustände, exakte Allowlists, Infrastruktur-Freiheit und das Verbot
einer Abhängigkeit von `packages/contracts` prüfen.

Ein später autorisierter B1B-Slice muss den Import aus `packages/domain`,
Zyklusfreiheit, exakte Response-Discriminants, Ablehnung unbekannter Werte,
das Verbot von Teilimporten und das Verbot externer Framework-, Datenbank-
und Providerimporte prüfen.

Diese Anforderungen autorisieren noch keine Testdateien.

## 10. Abnahmekriterien

```text
DOCUMENT_ONLY_SLICE=YES
EXACT_NEW_FILE_COUNT=1
EXACT_CHANGED_FILE_COUNT=1
S51C_A_PRECEDENCE_DEFINED=YES
B1A_DOMAIN_SCOPE_DEFINED=YES
B1B_CONTRACT_SCOPE_DEFINED=YES
DEPENDENCY_DIRECTION_DEFINED=YES
STATUS_FAMILIES_DEFINED=YES
TRANSITION_BOUNDARIES_DEFINED=YES
EVENT_ALLOWLIST_DEFINED=YES
FEEDBACK_ALLOWLIST_DEFINED=YES
LOCAL_IMPORT_RESPONSE_BOUNDARY_DEFINED=YES
RETENTION_VALUES_APPROVED=NO
PRODUCT_CODE_CHANGED=NO
PACKAGE_CHANGED=NO
MANIFEST_CHANGED=NO
LOCKFILE_CHANGED=NO
TEST_CHANGED=NO
SCHEMA_CHANGED=NO
SQL_CHANGED=NO
MIGRATION_CHANGED=NO
DATABASE_ACCESSED=NO
AUTH_RUNTIME_CHANGED=NO
WEB_CHANGED=NO
RAILWAY_ACCESSED=NO
DEPLOYMENT_EXECUTED=NO
STAGED=NO
COMMIT_CREATED=NO
PUSH_EXECUTED=NO
PR_CREATED=NO
GITHUB_WRITE_EXECUTED=NO
```

## 11. Autorisierungsstand

```text
S51C_B1_SCOPE_LOCK_LOCAL_DOCUMENT_AUTHORIZED=YES
S51C_B1A_IMPLEMENTATION_AUTHORIZED=YES
S51C_B1A_INTEGRATED_TO_MAIN=YES
S51C_B1A_IMPLEMENTATION_PR_NUMBER=102
S51C_B1B_IMPLEMENTATION_AUTHORIZED=YES
S51C_B1B_INTEGRATED_TO_MAIN=YES
S51C_B1B_IMPLEMENTATION_PR_NUMBER=104
S51C_B1B_CI_GATE_FOLLOWUP_REQUIRED=YES
PACKAGE_CHANGE_AUTHORIZED=NO
DEPENDENCY_CHANGE_AUTHORIZED=NO
SCHEMA_AUTHORIZED=NO
MIGRATION_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
AUTH_RUNTIME_AUTHORIZED=NO
WEB_INTEGRATION_AUTHORIZED=NO
RAILWAY_CHANGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
```
