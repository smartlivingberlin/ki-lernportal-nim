# `@ki-lernportal-nim/contracts`

## Zweck

Providerneutrale Requests, Responses, Commands, Fehler und validierte Systemverträge.

## Erlaubte Imports

- Keine Package-Imports im S51A-Skeleton.

Die aufgeführten Grenzen beschreiben die maximal erlaubte Richtung.
S51A erzeugt keine künstlichen Demonstrationsimporte.

## Verbotene Imports

- React und Next.js
- Drizzle, Datenbankclients und Railway
- AI-Provider- und Monitoring-SDKs

Unzulässig bleiben außerdem zyklische Abhängigkeiten und direkte
Quellpfadimporte in andere Packages.

## Öffentliche Exports

Der kontrollierte Entry-Point ist `src/index.ts`.

S51A exportiert keine produktive Runtime-Funktion und keinen
vorgetäuschten Stubwert.

## Status

S51C-B1B Local Progress Import Contract V1 ist integriert.

Keine Runtime-Implementierung von Persistenz, Auth, Web-Handlern, Railway oder
Deployment ist Bestandteil von S51C-B1B.

## Spätere Slices

Spätere Contract- und API-Slices.

Diese späteren Slices sind durch S51A nicht freigegeben.

## Sicherheit und Datenschutz

S51A enthält keine Secrets, Credentials, personenbezogenen Daten,
externen Requests, produktiven Providerzugriffe oder Persistenz.

Jede spätere Erweiterung benötigt eine eigene fachliche,
sicherheitsbezogene und datenschutzbezogene Prüfung.

## S51C-B1B Local Progress Import Contract V1

`S51C_B1B_LOCAL_PROGRESS_IMPORT_V1` defines provider-neutral TypeScript
transport contracts for importing a complete local lesson-progress snapshot.

The request contains exactly:

- `idempotency_key`
- `client_snapshot_hash`
- `lesson_ids`

A successful response contains exactly:

- `status="imported"`
- `import_id`
- `client_snapshot_hash`
- `imported_lesson_ids`
- `already_present_lesson_ids`
- `imported_lesson_count`
- `already_present_lesson_count`

A rejected response contains exactly:

- `status="rejected"`
- `error_code="LOCAL_PROGRESS_IMPORT_REJECTED"`
- `rejected_lesson_ids`

Validation is fail-closed. Unknown string or symbol fields, inherited required
fields, accessors, invalid prototypes, invalid identifiers, duplicate lesson
IDs, inconsistent counters, inconsistent ordering, incomplete partitions and
partial imports are rejected.

The contract does not authenticate users, determine ownership, access a
database, persist data, calculate snapshot hashes, call providers or implement
runtime import behavior. A later authenticated server runtime remains
responsible for authorization, catalogue checks, atomic persistence and
idempotency enforcement.
