# `@ki-lernportal-nim/db`

## Zweck

Grenze für spätere Persistenzadapter, Repositories und kontrollierte Datenbankzugriffe.

## Erlaubte Imports

- `@ki-lernportal-nim/contracts`
- `@ki-lernportal-nim/domain`

Die aufgeführten Grenzen beschreiben die maximal erlaubte Richtung.
S51A erzeugt keine künstlichen Demonstrationsimporte.

## Verbotene Imports

- UI und React
- AI-Provider
- Produktive Verbindung, Schema oder Migration in S51A

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

S51B Persistenzfundament.

Diese späteren Slices sind durch S51A nicht freigegeben.

## Sicherheit und Datenschutz

S51A enthält keine Secrets, Credentials, personenbezogenen Daten,
externen Requests, produktiven Providerzugriffe oder Persistenz.

Jede spätere Erweiterung benötigt eine eigene fachliche,
sicherheitsbezogene und datenschutzbezogene Prüfung.
