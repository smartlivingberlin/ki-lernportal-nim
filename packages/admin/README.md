# `@ki-lernportal-nim/admin`

## Zweck

Grenze für spätere administrative Application Services, Review, Publish, Rollback und Audit.

## Erlaubte Imports

- `@ki-lernportal-nim/contracts`
- `@ki-lernportal-nim/domain`
- `@ki-lernportal-nim/db`
- `@ki-lernportal-nim/auth`

Die aufgeführten Grenzen beschreiben die maximal erlaubte Richtung.
S51A erzeugt keine künstlichen Demonstrationsimporte.

## Verbotene Imports

- Adminseiten und Adminrouten in S51A
- Nutzerverwaltung und Rollenvergabe
- Content Editor und Publikationsruntime

Unzulässig bleiben außerdem zyklische Abhängigkeiten und direkte
Quellpfadimporte in andere Packages.

## Öffentliche Exports

Der kontrollierte Entry-Point ist `src/index.ts`.

S51A exportiert keine produktive Runtime-Funktion und keinen
vorgetäuschten Stubwert.

## Status

Keine Runtime-Implementierung ist in S51A vorhanden.

Das Package ist ausschließlich ein privates Architektur- und
Workspace-Skeleton.

## Spätere Slices

S53 Admin, Content, Quellen und Medien.

Diese späteren Slices sind durch S51A nicht freigegeben.

## Sicherheit und Datenschutz

S51A enthält keine Secrets, Credentials, personenbezogenen Daten,
externen Requests, produktiven Providerzugriffe oder Persistenz.

Jede spätere Erweiterung benötigt eine eigene fachliche,
sicherheitsbezogene und datenschutzbezogene Prüfung.
