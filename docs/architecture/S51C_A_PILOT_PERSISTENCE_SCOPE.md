# S51C-A – Pilot Persistence Scope Lock

**Status:** Dokumentarischer Scope-Lock. Noch keine Schema-,
Migrations-, Runtime-, Datenbank-, Railway- oder Deployment-Freigabe.

**Parent:** GitHub Issue #94
**Baseline:** `e957c5c1217454aa3dd5580095c4bfc6856769af`
**Arbeitsbranch:** `docs/s51c-a-pilot-persistence-scope-lock-20260727`

## 1. Zweck

Dieser Vertrag definiert die minimale Persistenz- und Datengrenze für
einen kontrollierten Pilotbetrieb. Er legt Datenzwecke, Package-Ownership,
IDOR-Schutz, Idempotenz, Transaktionsgrenzen, Datenminimierung, Export,
Löschung und lokale Fortschrittsübernahme vor jeder Implementierung fest.

Dieses Dokument erzeugt keine Tabelle, Migration, Datenbankabfrage oder
produktive Verbindung.

## 2. Nachgewiesener Ausgangszustand

```text
DATABASE_ENGINE=MYSQL
DATABASE_OWNER_PACKAGE=packages/db
DATABASE_ADAPTER_FOUNDATION=IMPLEMENTED
DATABASE_SCHEMA=NOT_IMPLEMENTED
DATABASE_MIGRATION=NOT_IMPLEMENTED
WEB_DATABASE_INTEGRATION=NOT_IMPLEMENTED
AUTH_RUNTIME=NOT_IMPLEMENTED
SESSION_RUNTIME=NOT_IMPLEMENTED
PILOT_INVITATION_RUNTIME=NOT_IMPLEMENTED
SERVER_PROGRESS=NOT_IMPLEMENTED
LOCAL_PROGRESS_STORAGE=localStorage
```

## 3. Exakter Dateiscope

In diesem Slice darf ausschließlich folgende Datei entstehen:

```text
docs/architecture/S51C_A_PILOT_PERSISTENCE_SCOPE.md
```

Nicht zulässig sind Änderungen an `apps/**`, `packages/**`, `scripts/**`,
`.github/**`, Manifesten, Lockfiles, Environmentdateien oder Railway-Dateien.

Ebenfalls nicht zulässig sind Schema, SQL, Migration, Seed, Query,
Datenbankverbindung, Auth-Runtime, Session-Runtime, API-Route, Server Action,
UI-Änderung oder Deployment.

## 4. Package-Verantwortungen

- `packages/domain`: Statuswerte, Übergänge, Ownership-, Idempotenz-,
  Fortschritts-, Retention- und Löschregeln ohne Infrastrukturcode.
- `packages/contracts`: validierte Requests, Responses, DTOs, Fehlercodes
  und kontrollierte Eventtypen.
- `packages/db`: später Schema, Migrationen, Repositories, Constraints,
  Indizes und Transaktionen.
- `packages/auth`: Credentials, widerrufbare Sessions, Rollen, Scopes und
  serverseitiger Auth-Kontext.
- `packages/admin`: autorisierte, aggregierte Pilotabfragen.
- `apps/web`: Composition Boundary mit Authentifizierung, Autorisierung,
  Domain-Service und Repository-Aufruf.

Browsercode entscheidet niemals endgültig über Rollen, Scope oder Ownership.

## 5. Minimales Pilot-Datenmodell

### 5.1 `users`

**Zweck:** Interne Identität eines eingeladenen Pilotnutzers.

**Kandidatenfelder:**

```text
id
email_normalized
email_display
status
created_at
updated_at
deleted_at
```

**Verbindliche Regeln:**

- serverseitig erzeugte UUID;
- normalisierte E-Mail eindeutig;
- keine automatische Marketingeinwilligung;
- keine Offenlegung, ob ein Konto existiert;

### 5.2 `auth_credentials`

**Zweck:** Credentialgrenze für eine spätere sichere Anmeldung.

**Kandidatenfelder:**

```text
user_id
password_hash
password_updated_at
failed_attempt_count
locked_until
created_at
updated_at
```

**Verbindliche Regeln:**

- niemals Klartextpasswörter;
- Hashparameter erst im Auth-Slice freigeben;
- Credentials niemals exportieren oder protokollieren;

### 5.3 `auth_sessions`

**Zweck:** Widerrufbare serverseitige Sitzungen.

**Kandidatenfelder:**

```text
id
user_id
token_hash
created_at
last_seen_at
idle_expires_at
absolute_expires_at
revoked_at
revocation_reason
```

**Verbindliche Regeln:**

- nur Hash des Sitzungstokens speichern;
- Idle- und absolute Ablaufzeit verpflichtend;
- widerrufene oder abgelaufene Sitzung nicht erneuern;
- keine IP-Adresse und kein vollständiger User-Agent;

### 5.4 `pilot_cohorts`

**Zweck:** Abgegrenzter kontrollierter Pilotzeitraum.

**Kandidatenfelder:**

```text
id
code
title
status
starts_at
ends_at
learning_path_id
retention_delete_after
created_at
updated_at
```

**Verbindliche Regeln:**

- keine öffentliche Selbstregistrierung;
- klarer Beginn und klares Ende;
- keine unbegrenzte Aufbewahrung;
- kein White-Label- oder Mandantensystem;

### 5.5 `pilot_invitations`

**Zweck:** Persönlicher und einmalig verwendbarer Pilotzugang.

**Kandidatenfelder:**

```text
id
cohort_id
email_normalized
token_hash
expires_at
redeemed_at
redeemed_user_id
revoked_at
created_at
created_by_user_id
```

**Verbindliche Regeln:**

- nur Hash eines hochentropischen Tokens speichern;
- Ablauf und Widerruf verpflichtend;
- parallele Einlösung höchstens einmal erfolgreich;
- Einlösung vollständig transaktional;

### 5.6 `pilot_memberships`

**Zweck:** Serverseitige Zuordnung eines Nutzers zu einem Pilot.

**Kandidatenfelder:**

```text
id
cohort_id
user_id
role
status
joined_at
ended_at
created_at
updated_at
```

**Verbindliche Regeln:**

- eindeutige Kombination aus cohort_id und user_id;
- erste Rollen nur learner und pilot_admin;
- pilot_admin ausschließlich im eigenen Pilot-Scope;
- inaktive Mitgliedschaft darf nicht schreiben;

### 5.7 `lesson_progress`

**Zweck:** Geräteübergreifender serverseitiger Lektionsfortschritt.

**Kandidatenfelder:**

```text
id
membership_id
learning_path_id
lesson_id
content_revision
status
source
started_at
completed_at
last_activity_at
version
created_at
updated_at
```

**Verbindliche Regeln:**

- not_started wird durch fehlenden Datensatz dargestellt;
- Statuswerte nur in_progress und completed;
- jede Operation prüft Mitgliedschaft und Ownership;
- version schützt konkurrierende Änderungen;
- Content-IDs gegen geprüften Inhaltsbestand validieren;

### 5.8 `practice_attempts`

**Zweck:** Unveränderliche und messbare Übungsversuche.

**Kandidatenfelder:**

```text
id
membership_id
lesson_id
exercise_id
content_revision
attempt_number
idempotency_key
outcome_code
score_numerator
score_denominator
started_at
submitted_at
duration_ms
created_at
```

**Verbindliche Regeln:**

- idempotency_key pro Mitgliedschaft eindeutig;
- frühere Versuche nicht überschreiben;
- keine sensiblen Freitexte;
- Dauerwerte plausibel begrenzen;

### 5.9 `assessment_runs`

**Zweck:** Getrennte Einstufungs- und Abschlussdiagnostik.

**Kandidatenfelder:**

```text
id
membership_id
assessment_id
assessment_revision
assessment_kind
status
idempotency_key
started_at
completed_at
score_numerator
score_denominator
duration_ms
created_at
updated_at
```

**Verbindliche Regeln:**

- Arten nur baseline und final;
- abgeschlossene Läufe nicht überschreiben;
- Wiederholung erzeugt neuen Lauf;
- keine öffentliche Lernwirkungsbehauptung ableiten;

### 5.10 `assessment_answers`

**Zweck:** Minimierte Antworten eines Diagnostiklaufs.

**Kandidatenfelder:**

```text
id
assessment_run_id
item_id
answer_code
is_correct
score_numerator
score_denominator
submitted_at
created_at
```

**Verbindliche Regeln:**

- eindeutige Kombination aus Lauf und Item;
- keine freien personenbezogenen Texte;
- Zugriff nur über autorisierten Elternlauf;

### 5.11 `learning_events`

**Zweck:** Minimierte und zweckgebundene Lernmessung.

**Kandidatenfelder:**

```text
id
membership_id
event_type
learning_path_id
lesson_id
occurred_at
duration_ms
idempotency_key
event_version
created_at
```

**Verbindliche Regeln:**

- Eventtyp nur aus Allowlist;
- keine beliebigen JSON-Payloads;
- keine IP-, Werbe-, Chat- oder Promptdaten;
- keine sensiblen Freitexte;

### 5.12 `learner_feedback`

**Zweck:** Strukturierte Verständlichkeits- und Sicherheitsrückmeldung.

**Kandidatenfelder:**

```text
id
membership_id
lesson_id
feedback_kind
rating
reason_code
idempotency_key
created_at
```

**Verbindliche Regeln:**

- erster Pilot ohne Freitext;
- feedback_kind aus kontrollierter Liste;
- keine sensiblen Angaben;
- Duplicate-Schutz verpflichtend;

### 5.13 `local_progress_imports`

**Zweck:** Kontrollierte Übernahme vorhandenen Browserfortschritts.

**Kandidatenfelder:**

```text
id
membership_id
client_snapshot_hash
imported_lesson_count
idempotency_key
created_at
```

**Verbindliche Regeln:**

- nur nach ausdrücklicher Nutzerhandlung;
- keine automatische Übernahme bei Anmeldung;
- rohen Browser-Snapshot nicht dauerhaft speichern;
- bestehenden Serverfortschritt niemals zurücksetzen;
- unbekannte Lektions-IDs ablehnen;

### 5.14 `privacy_requests`

**Zweck:** Nachvollziehbarer Export- und Löschworkflow.

**Kandidatenfelder:**

```text
id
user_id
request_type
status
idempotency_key
requested_at
completed_at
result_expires_at
created_at
updated_at
```

**Verbindliche Regeln:**

- Typen nur export und delete;
- Authentifizierung und Ownership verpflichtend;
- Export ohne Credentials, Tokens oder fremde Daten;
- Löschung wiederholbar und idempotent;

## 6. Stabile Inhaltsreferenzen

Lerninhalte bleiben im ersten Pilot versionierte, geprüfte Portalinhalte.
Persistierte Zustände referenzieren nur stabile IDs und Revisionen:

```text
learning_path_id
lesson_id
exercise_id
assessment_id
content_revision
```

Unbekannte IDs oder Revisionen müssen serverseitig abgelehnt werden.

## 7. Ownership- und IDOR-Grenzen

Jede lernendenbezogene Operation benötigt serverseitig:

```text
authenticated_user_id
active_membership_id
cohort_scope
resource_ownership
requested_operation
```

Mindestens zu prüfen sind gültige Sitzung, aktiver Nutzer, aktive
Pilotmitgliedschaft, Zugehörigkeit der Mitgliedschaft, Ressourcen-
Ownership, erlaubte Rolle, gültige Content-ID und gebundene
Idempotency Key.

Verboten sind clientseitig behauptete `user_id`, fremde Lernstände,
Adminzugriff im falschen Pilot und Fehlermeldungen, die fremde
Ressourcen bestätigen.

## 8. Idempotenz und Duplicate-Schutz

Schreiboperationen binden eine zufällige Idempotency Key mindestens an:

```text
membership_id
operation_type
resource_key
request_fingerprint
```

- gleicher Schlüssel und gleicher Request liefern dasselbe Ergebnis;
- gleicher Schlüssel mit verändertem Payload wird abgelehnt;
- Datenbankconstraint und Transaktion schützen parallele Requests;
- Idempotency Keys sind niemals Authentifizierungsnachweise.

## 9. Transaktionsgrenzen

### Einladungseinlösung

Einladung sperren und prüfen, Nutzer kontrolliert erstellen oder
zuordnen, Mitgliedschaft erstellen und Einladung als eingelöst markieren.
Eine Session wird erst nach erfolgreichem Commit ausgegeben.

### Fortschrittsänderung

Session und Mitgliedschaft prüfen, Content-ID validieren, Duplicate-
Schutz reservieren, Fortschritt ändern und minimiertes Lernereignis
innerhalb einer Transaktion schreiben.

### Übungs- und Diagnostikabgabe

Ownership und Revision prüfen, Duplicate-Schutz anwenden, Versuch oder
Lauf sowie Antworten speichern und Ergebnis atomar abschließen.

### Lokaler Import

Nutzerbestätigung, Snapshot-Validierung, Snapshot-Hash, bekannte
Lektions-IDs und Fortschritts-Upserts gehören in eine Transaktion.

### Löschung

Sessions widerrufen, Credentials entfernen, personenbezogene Lern- und
Feedbackdaten löschen oder wirksam anonymisieren und den Vorgang
idempotent abschließen.

## 10. Datenminimierung

Im ersten Pilot nicht speichern:

```text
plaintext_password
raw_session_token
raw_invitation_token
ip_address
full_user_agent
advertising_identifier
marketing_profile
referrer_history
precise_location
health_information
government_identifier
bank_or_payment_data
open_chat_history
prompt_history
arbitrary_event_payload
```

Keine Marketingtracker, keine vorsorgliche Datensammlung und keine
personenbezogenen Daten, Tokens, Cookies oder Secrets in Logs.

## 11. Aufbewahrungskandidaten

| Datenart | Maximale Kandidatenfrist |
|---|---:|
| nicht eingelöste Einladung | Ablauf plus 30 Tage |
| widerrufene Einladung | 30 Tage |
| abgelaufene oder widerrufene Session | 30 Tage |
| Lern-, Diagnostik- und Feedbackdaten | 90 Tage nach Pilotende |
| lokaler Importnachweis | 90 Tage nach Pilotende |
| abgeschlossene Privacy-Request-Metadaten | 90 Tage |

Diese Fristen benötigen vor jeder echten Erhebung eine getrennte
menschliche Freigabe.

## 12. Nutzerexport

Der Export enthält eigene Kontostammdaten, Pilotzuordnung, Fortschritt,
Versuche, Diagnostik, strukturiertes Feedback, Importnachweise und
Privacy-Request-Metadaten.

Er enthält niemals Passwort-Hashes, Token-Hashes, Secrets, fremde Daten
oder interne Sicherheitswerte.

## 13. Pflicht-Negativtests späterer Implementierung

- abgelaufene, widerrufene und doppelt eingelöste Einladung;
- Session Fixation, abgelaufene Sitzung und widerrufene Sitzung;
- CSRF gegen jede schreibende Operation;
- fremden Fortschritt lesen oder verändern;
- fremden Versuch oder Diagnostiklauf lesen;
- Export oder Löschung für fremden Nutzer;
- Adminzugriff auf falschen Pilot;
- gleiche Idempotency Key mit verändertem Payload;
- parallele doppelte Abgabe oder Einladungseinlösung;
- unbekannte Content-ID oder falsche Revision;
- unrealistische oder negative Dauer;
- personenbezogene Daten oder Secrets im Log;
- unvollständige oder nicht idempotente Löschung.

## 14. Verbindliche Folgeslice-Reihenfolge

1. Domain- und Contract-Typen;
2. Drizzle-Schema und lokale Migration;
3. Constraints und isolierte Datenbanktests;
4. Einladung, Credentials und Sessions;
5. serverseitiger Fortschritt und lokaler Import;
6. Übungen, Diagnostik und Lernmessung;
7. Export, Löschung und Retention;
8. Pilotdashboard;
9. isolierte Staging-Abnahme.

Kein Folgeslice wird durch dieses Dokument automatisch freigegeben.

## 14A. Verbindliches S51C-A-Entscheidungspaket

Die 15 Punkte des fachlichen Prechecks werden für den kontrollierten
ersten Pilot wie folgt aufgelöst. Dadurch werden noch keine Schema-,
Runtime-, Datenbank-, Commit-, Push-, PR- oder Deploymentrechte erteilt.

Bei Widersprüchen zu allgemeinen Kandidatenregeln aus Abschnitt 5 gilt
die engere Regel dieses Abschnitts.

1. Ein Nutzer darf höchstens eine aktive oder suspendierte
   Pilotmitgliedschaft besitzen. Beendete historische Mitgliedschaften
   sind zulässig.

2. `learning_events.lesson_id` ist ereignisabhängig optional.
   Assessment-Ereignisse referenzieren stattdessen `assessment_run_id`.

3. `learner_feedback.lesson_id` darf nur bei `technical_problem`
   fehlen. Alle inhaltlichen Feedbackarten benötigen eine Lektion.

4. `privacy_requests.result_expires_at` ist nur bei einem
   fertiggestellten Export erforderlich. Bei Löschung bleibt es `NULL`.

5. Nach abgeschlossener Kontolöschung erzeugt eine spätere Einladung
   eine neue Identität. Alte Daten werden nicht über die E-Mail
   zurückverknüpft.

6. Der erste Pilot-Admin wird ausschließlich durch einen einmaligen,
   nicht öffentlichen und separat freizugebenden Staging-Betreiberprozess
   erzeugt.

7. Der erste Pilot verwendet persönliche Einladungen mit einmaliger
   Passwortvergabe. Öffentliche Selbstregistrierung und dauerhaftes
   Magic-Link-Login bleiben ausgeschlossen.

8. Fortschrittsquellen sind nur `pilot_runtime` und `local_import`.
   `admin_repair` gehört nicht zum ersten Pilot.

9. Zulässige Lernereignisse sind:
   `learning_path_started`, `lesson_started`, `lesson_completed`,
   `lesson_reopened`, `practice_submitted`, `assessment_started`,
   `assessment_completed` und `help_opened`.

10. Zulässige Feedbackarten sind:
    `clarity`, `confidence`, `content_problem` und `technical_problem`.
    Freitext bleibt ausgeschlossen.

11. Assessmentantworten werden append-only gespeichert.
    Eine neue Antwort erhält eine höhere `response_sequence`; beim
    Abschluss wird die letzte gültige Antwort als final markiert.

12. Lokaler Fortschritt wird vollständig vorgeprüft und danach atomar
    übernommen. Teilimporte sind verboten.

13. Der Nutzerexport enthält die eigenen strukturierten Lernereignisse,
    aber keine Tokens, Credentials, Secrets oder Daten anderer Nutzer.

14. Verbindliche Statusfamilien sind:

```text
users=active,suspended,pending_deletion,deidentified
pilot_cohorts=draft,active,closed,archived
pilot_memberships=active,suspended,ended
assessment_runs=in_progress,completed,abandoned
privacy_requests=requested,processing,completed,failed
```

Terminale Zustände dürfen nicht wieder aktiviert werden.

15. Bei Pilotende werden Mitgliedschaft und Lernzugriff beendet sowie
    Sessions widerrufen. Ein eingeschränktes Privacy-Fenster von
    höchstens 30 Tagen bleibt nur ein Kandidatenwert. Anschließend werden
    Credentials und direkte Identifikatoren entfernt oder irreversibel
    deidentifiziert.

Die allgemeinen 30-/90-Tage-Aufbewahrungswerte bleiben bis zur
gesonderten Privacy-, Security- und Operations-Prüfung unverbindliche
Kandidaten.

```text
S51C_A_DECISION_PACKAGE_APPLIED=YES
S51C_A_DECISIONS_RESOLVED=YES
S51C_A_OPEN_DECISION_COUNT=0

MULTI_COHORT_POLICY=ONE_ACTIVE_MEMBERSHIP_PER_USER
EVENT_LESSON_REFERENCE_POLICY=NULLABLE_BY_EVENT_TYPE
FEEDBACK_LESSON_REFERENCE_POLICY=NULLABLE_FOR_TECHNICAL_PROBLEM
PRIVACY_RESULT_EXPIRY_POLICY=EXPORT_ONLY_NULLABLE
DELETED_EMAIL_REINVITATION_POLICY=NEW_IDENTITY_WITHOUT_DATA_RELINK
FIRST_PILOT_ADMIN_BOOTSTRAP=ONE_TIME_OFFLINE_STAGING_OPERATOR_FLOW
FIRST_PILOT_AUTH_METHOD=PERSONAL_INVITATION_PLUS_PASSWORD_SETUP
PROGRESS_SOURCE_ALLOWLIST=pilot_runtime,local_import
ADMIN_REPAIR_IN_FIRST_PILOT=NO
LEARNING_EVENT_ALLOWLIST=learning_path_started,lesson_started,lesson_completed,lesson_reopened,practice_submitted,assessment_started,assessment_completed,help_opened
FEEDBACK_KIND_ALLOWLIST=clarity,confidence,content_problem,technical_problem
ASSESSMENT_ANSWER_POLICY=APPEND_ONLY_SEQUENCE_FINAL_ON_COMPLETION
LOCAL_IMPORT_POLICY=VALIDATE_ALL_THEN_ATOMIC_APPLY
PARTIAL_LOCAL_IMPORT=FORBIDDEN
LEARNING_EVENT_EXPORT_POLICY=EXPORT_OWN_STRUCTURED_EVENTS
STATUS_ENUMS_AND_TRANSITIONS_DEFINED=YES
POST_PILOT_IDENTITY_POLICY=PRIVACY_ONLY_WINDOW_THEN_DEIDENTIFY

RETENTION_VALUES_APPROVED=NO
HUMAN_DOCUMENT_APPROVAL_EXECUTED=YES
```

Die menschliche Endabnahme bleibt ein eigener nachfolgender Schritt.

## 15. Abnahmekriterien

```text
PILOT_DATA_PURPOSES_DEFINED=YES
MINIMUM_ENTITY_SCOPE_DEFINED=YES
PACKAGE_OWNERSHIP_DEFINED=YES
IDOR_BOUNDARIES_DEFINED=YES
IDEMPOTENCY_BOUNDARIES_DEFINED=YES
TRANSACTION_BOUNDARIES_DEFINED=YES
LOCAL_PROGRESS_IMPORT_BOUNDARY_DEFINED=YES
DATA_MINIMIZATION_DEFINED=YES
RETENTION_CANDIDATES_DEFINED=YES
EXPORT_BOUNDARY_DEFINED=YES
DELETION_BOUNDARY_DEFINED=YES
NEGATIVE_TEST_CONTRACT_DEFINED=YES
```

## 16. Autorisierungsstand

```text
S51C_A_SCOPE_DOCUMENTED=YES
S51C_A_HUMAN_APPROVED=YES
S51C_A_APPROVED_CONTENT_SHA256=a60e2b6bfddbf9e7db8a551dc58ea9f4731de2790a243dd28439daec4ba4b2c6
S51C_A_APPROVAL_GITHUB_ISSUE=94
S51C_A_APPROVAL_GITHUB_COMMENT_ID=5092158977
S51C_A_APPROVAL_SCOPE=DOCUMENT_ONLY

DOCUMENTATION_CHANGE_AUTHORIZED=YES
DOMAIN_IMPLEMENTATION_AUTHORIZED=NO
CONTRACTS_IMPLEMENTATION_AUTHORIZED=NO
SCHEMA_IMPLEMENTATION_AUTHORIZED=NO
MIGRATION_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
DATABASE_QUERY_AUTHORIZED=NO
AUTH_RUNTIME_AUTHORIZED=NO
SESSION_RUNTIME_AUTHORIZED=NO
WEB_INTEGRATION_AUTHORIZED=NO
ADMIN_RUNTIME_AUTHORIZED=NO

COMMIT_AUTHORIZED=NO
PUSH_AUTHORIZED=NO
PR_CREATION_AUTHORIZED=NO
MERGE_AUTHORIZED=NO

RAILWAY_CHANGE_AUTHORIZED=NO
STAGING_DEPLOY_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
PRODUCTION_DEPLOY_AUTHORIZED=NO
```
