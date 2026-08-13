# S51B-C – Schema- und Migrations-Scope-Lock

**Status:** Dokumentarischer Scope-Lock auf `main` integriert. S51B-C1 (Schema + generierte Migration + statische Tests) und S51B-C2 (disposable lokaler MySQL-Constraint-Proof) sind integriert. C1/C2 integriert. Menschliche Freigabe C (2026-08-13): disposable lokale Connection/Migration erlaubt. Railway-/Production-DB bleiben gesperrt.

**Parent:** GitHub Issue #94 (supersedes Draft PR #105)  
**Baseline:** `e0791383d726fcf0cbbea7f9101ab53cd8753154`  
**Arbeitsbranch:** `cursor/s51b-c2-gate-docs-b554`

## 1. Zweck

Dieses Dokument definiert ausschließlich den späteren Implementierungsscope für ein code-first Drizzle-Schema, versionierte MySQL-Migrationen und nachgelagerte Tests gegen eine disposable lokale MySQL-Datenbank.

Dieses Dokument erzeugt selbst kein TypeScript-Schema, keine SQL-Datei, keine Migration, keine Datenbankverbindung, keinen Docker-Container und keine Produktfunktion.

Bei Widersprüchen gelten vorrangig:

1. `docs/architecture/S51C_A_PILOT_PERSISTENCE_SCOPE.md`
2. `docs/architecture/S51C_B1_DOMAIN_CONTRACT_TYPES_SCOPE.md`
3. öffentliche Exports von `packages/domain`
4. `docs/architecture/adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md`
5. `docs/architecture/S51B_B_IMPLEMENTATION_SCOPE.md`
6. dieses Dokument

## 2. Verbindliche technische Richtung

```text
DATABASE_ENGINE=MYSQL
ORM=DRIZZLE
PRIMARY_DRIVER=mysql2
DATABASE_OWNER_PACKAGE=packages/db
MAIN_RUNTIME=EXISTING_NEXTJS_RUNTIME
SECOND_BACKEND_RUNTIME=NO
SCHEMA_APPROACH=CODE_FIRST
```

Andere Datenbanken, ORMs und eine zweite Backend-Runtime bleiben ausgeschlossen. `packages/db` bleibt alleiniger Eigentümer von Schema, Migrationen, Constraints, Indizes, Transaktionen und Datenbankzugriffen.

## 3. Migrationstooling

`drizzle-kit` darf später ausschließlich als `devDependency` von `packages/db` ergänzt werden.

Zulässige spätere Befehle:

```text
drizzle-kit generate
drizzle-kit migrate
```

Verboten bleiben:

```text
drizzle-kit push
drizzle-kit pull
drizzle-kit studio
```

Verbindlich gilt:

```text
MIGRATION_GENERATION=DRIZZLE_KIT_GENERATE
MIGRATION_EXECUTION=DRIZZLE_KIT_MIGRATE
DRIZZLE_PUSH_PROHIBITED=YES
SQL_MIGRATIONS_COMMITTED=YES
SCHEMA_SNAPSHOTS_COMMITTED=YES
DISPOSABLE_LOCAL_MYSQL_ONLY=YES
RAILWAY_DATABASE_PROHIBITED=YES
PRODUCTION_DATABASE_PROHIBITED=YES
```

Migrationen werden niemals beim Modulimport automatisch ausgeführt. Generierte SQL-Migrationen und Drizzle-Snapshots werden vor jeder Ausführung geprüft und eingecheckt.

## 4. Erster Kerntabellenumfang

Der erste spätere Schema-Slice umfasst ausschließlich:

```text
users
auth_credentials
auth_sessions
pilot_cohorts
pilot_invitations
pilot_memberships
lesson_progress
local_progress_imports
```

```text
CORE_TABLE_COUNT=8
```

Zurückgestellte Tabellen:

```text
practice_attempts
assessment_runs
assessment_answers
learning_events
learner_feedback
privacy_requests
```

```text
DEFERRED_TABLE_COUNT=6
```

## 5. Kanonische Status-, Rollen- und Quellenwerte

Das Schema muss exakt die öffentlichen Domainwerte übernehmen:

```text
users=active,suspended,pending_deletion,deidentified
pilot_cohorts=draft,active,closed,archived
pilot_memberships=active,suspended,ended
lesson_progress=in_progress,completed
pilot_roles=learner,pilot_admin
progress_sources=pilot_runtime,local_import
```

Neue, umbenannte oder zusätzliche Werte sind nicht zulässig.

## 6. Tabellenregeln

### `users`

- serverseitig erzeugte kanonische UUID;
- normalisierte E-Mail eindeutig, solange vorhanden;
- kein automatischer Adminstatus;
- kein Marketing- oder Trackingprofil.

### `auth_credentials`

- höchstens ein Datensatz pro Nutzer;
- ausschließlich Passwort-Hash;
- niemals Klartextpasswort;
- keine Sitzungs-, Einladungs- oder Recovery-Tokens.

### `auth_sessions`

- opake, widerrufbare serverseitige Sitzungen;
- Sitzungstoken ausschließlich gehasht;
- eindeutiger Token-Hash;
- Idle- und absolute Ablaufzeit;
- keine IP-Adresse und kein vollständiger User-Agent.

### `pilot_cohorts`

- eindeutiger Pilotcode;
- klarer Beginn und klares Ende;
- kein White-Label- oder Mandantensystem.

### `pilot_invitations`

- Einladungstoken ausschließlich gehasht;
- Ablauf und Widerruf verpflichtend;
- parallele Einlösung höchstens einmal erfolgreich;
- Einlösung vollständig transaktional.

### `pilot_memberships`

- eindeutige Kombination aus Pilot und Nutzer;
- nur `learner` und `pilot_admin`;
- höchstens eine aktive oder suspendierte Mitgliedschaft pro Nutzer;
- beendete historische Mitgliedschaften bleiben zulässig.

### `lesson_progress`

- eindeutige Kombination aus Mitgliedschaft, Lernpfad und Lektion;
- `not_started` wird durch fehlenden Datensatz dargestellt;
- Status nur `in_progress` oder `completed`;
- Quelle nur `pilot_runtime` oder `local_import`;
- Versionsfeld schützt konkurrierende Änderungen;
- unbekannte Inhalts-IDs werden vor dem Schreiben abgelehnt.

### `local_progress_imports`

- eindeutige Kombination aus Mitgliedschaft und Idempotency Key;
- Duplicate-Schutz über Mitgliedschaft und Snapshot-Hash;
- kein roher Browser-Snapshot;
- keine dauerhaft gespeicherte Lektions-ID-Liste;
- keine Teilimporte;
- Importnachweis und Fortschritts-Upserts in einer Transaktion.

## 7. Foreign Keys, Constraints und Indizes

Später verbindlich zu definieren und zu testen sind:

- Foreign Keys zwischen Nutzern, Credentials, Sessions, Piloten, Einladungen, Mitgliedschaften, Fortschritt und Importnachweisen;
- Unique Constraints für normalisierte E-Mail, Token-Hashes, Pilotcode, Mitgliedschaften, Lektionsfortschritt und Idempotenz;
- Indizes für Nutzerstatus, Sitzungsablauf, Einladungsablauf, Mitgliedschaftsstatus und Fortschrittsabfragen;
- restriktive Löschung als sicherer Default;
- keine verwaisten Credentials, Sessions, Mitgliedschaften, Fortschrittsdaten oder Importnachweise.

Datenbank-Constraints ersetzen keine serverseitige Autorisierungsprüfung.

## 8. IDOR- und Ownership-Grenzen

Jede spätere lernendenbezogene Operation benötigt serverseitig:

```text
authenticated_user_id
active_membership_id
cohort_scope
resource_ownership
requested_operation
```

Clientseitig behauptete Nutzer-, Mitgliedschafts-, Rollen-, Pilot- oder Ownership-Werte sind nicht maßgeblich.

Sicherer Zugriffspfad:

```text
gültige Session
-> aktiver Nutzer
-> aktive Mitgliedschaft
-> richtiger Pilot-Scope
-> Ressourcen-Ownership
-> erlaubte Operation
-> Datenbankzugriff
```

## 9. Idempotenz und Transaktionen

Idempotenz bindet einen Schlüssel mindestens an:

```text
membership_id
operation_type
resource_key
request_fingerprint
```

Pflichtverhalten:

- gleicher Schlüssel und gleicher Request liefern dasselbe Ergebnis;
- gleicher Schlüssel mit verändertem Payload wird abgelehnt;
- parallele Requests werden durch Constraint und Transaktion geschützt;
- ein Idempotency Key ist kein Authentifizierungsnachweis.

Ein lokaler Fortschrittsimport umfasst atomar:

1. Session und Mitgliedschaft prüfen;
2. Nutzerbestätigung prüfen;
3. vollständigen Request validieren;
4. sämtliche Lektions-IDs gegen den Inhaltskatalog prüfen;
5. Idempotenz reservieren;
6. Fortschritt ausschließlich vorwärts schreiben;
7. Importnachweis schreiben;
8. vollständig committen oder vollständig zurückrollen.

Teilimporte sind verboten.

## 10. Datenminimierung

Nicht speichern:

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
raw_local_progress_snapshot
```

## 11. Getrennte spätere Slices

### S51B-C1

Späterer Kandidat für:

- `drizzle-kit` als kontrollierte Dev-Dependency;
- code-first Schema der acht Kerntabellen;
- generierte SQL-Migration;
- generierte Drizzle-Snapshots;
- statische Prüfungen ohne Datenbankzugriff.

S51B-C1 führt keine Migration gegen eine Datenbank aus.

### S51B-C2

Erst nach erfolgreicher Abnahme von S51B-C1 und eigener Freigabe:

- disposable lokalen MySQL-Container starten;
- Testdatenbank mit Präfix `ki_nim_s51bc_` erstellen;
- ausschließlich die eingecheckte Migration anwenden;
- Constraints, Indizes und Fehlerszenarien testen;
- Testdatenbank und Container vollständig entfernen.

## 12. Späterer Implementierungskandidatenscope

S51B-C1-Kandidat:

```text
.github/workflows/ci.yml
package.json
pnpm-lock.yaml
packages/db/README.md
packages/db/package.json
packages/db/drizzle.config.ts
packages/db/src/index.ts
packages/db/src/pilot-schema.ts
packages/db/src/pilot-schema.test.ts
packages/db/drizzle/0000_s51bc_pilot_core.sql
packages/db/drizzle/meta/_journal.json
packages/db/drizzle/meta/0000_snapshot.json
scripts/check-package-boundaries.mjs
scripts/check-supply-chain-policy.mjs
```

S51B-C2-Kandidat:

```text
.github/workflows/ci.yml
package.json
packages/db/src/pilot-schema.integration.test.ts
scripts/test-s51b-c-local-mysql.sh
```

Jede Scope-Erweiterung benötigt eine neue ausdrückliche Genehmigung.

## 13. Abnahmekriterien

S51B-C1 muss später nachweisen:

- exakt acht Kerntabellen;
- keine zurückgestellte Tabelle;
- kanonische Domainwerte unverändert;
- deterministische Migrationserzeugung;
- eingecheckte SQL-Migration und Snapshots;
- keine Datenbankverbindung;
- keine Environmentauswertung beim Modulimport;
- keine Secrets;
- kein `drizzle-kit push`;
- vollständige bestehende CI weiterhin grün.

S51B-C2 muss später nachweisen:

- Migration auf leerer disposable MySQL-Datenbank erfolgreich;
- Foreign Keys und Unique Constraints wirksam;
- ungültige Beziehungen werden abgelehnt;
- parallele Doppelschreibvorgänge werden geschützt;
- keine Verbindung zu Railway oder Production;
- Container und Testdatenbank werden vollständig entfernt.

Abnahmehinweis: Diese Kriterien sind durch PR #122 / CI-Run `31421822999`
(`S51B_C2_LOCAL_MYSQL=PASS`, `FOREIGN_KEY_COUNT=9`) auf `main` nachgewiesen.

## 14. Rollback

Dieser Dokumentationsstand ist rücknehmbar durch:

1. Revert des Scope-Lock-Commits auf `main`;
2. Schließen des zugehörigen Pull Requests;
3. Beibehalten von `S51B_C1_*_AUTHORIZED=NO` bis zu einer neuen Freigabe.

Ein späterer S51B-C1-Rollback erfordert:

- Schema, Migrationen und Snapshots entfernen;
- `drizzle-kit` entfernen;
- Lockfile kontrolliert zurücknehmen;
- Package- und CI-Gates wiederherstellen;
- vollständige CI erneut ausführen.

Keine Datenbank darf für diesen Dokumentationsrollback kontaktiert werden.

## 15. Autorisierungsstand

```text
S51B_C_SCOPE_DOCUMENT_LOCAL_CREATION_AUTHORIZED=YES
S51B_C_SCOPE_COMMIT_AUTHORIZED=YES
S51B_C_SCOPE_PUSH_AUTHORIZED=YES
S51B_C_SCOPE_PR_AUTHORIZED=YES
S51B_C_SCOPE_MERGE_AUTHORIZED=YES

S51B_C1_SCHEMA_IMPLEMENTATION_AUTHORIZED=YES
S51B_C1_MIGRATION_GENERATION_AUTHORIZED=YES
S51B_C1_DEPENDENCY_CHANGE_AUTHORIZED=YES
S51B_C1_CI_CHANGE_AUTHORIZED=YES
S51B_C1_INTEGRATED_TO_MAIN=YES

S51B_C2_DATABASE_TEST_AUTHORIZED=YES
S51B_C2_INTEGRATED_TO_MAIN=YES
S51B_C2_DISPOSABLE_DOCKER_AUTHORIZED=YES

S51B_C_SCHEMA_AUTHORIZED=YES
DATABASE_CONNECTION_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
DATABASE_QUERY_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
LIVE_MIGRATE_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
MIGRATION_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
HUMAN_FREIGABE_C_SCHEMA_LOCAL_MIGRATE=YES
HUMAN_FREIGABE_ABCD_AT=2026-08-13

RAILWAY_DATABASE_PROHIBITED=YES
PRODUCTION_DATABASE_PROHIBITED=YES
LIVE_MIGRATE_RAILWAY=NO
AUTH_RUNTIME_FLAG_FLIP_PRODUCTION=NO
PRODUCTION_USERS=NO
PUBLIC_LAUNCH_AUTHORIZED=NO
```
