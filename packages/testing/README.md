# `@ki-lernportal-nim/testing`

## Zweck

Gemeinsame Test-Builder, Fixtures, Boundary-Helfer und reproduzierbare Testtypen.

## Erlaubte Imports

- `@ki-lernportal-nim/ui`
- `@ki-lernportal-nim/contracts`
- `@ki-lernportal-nim/domain`
- `@ki-lernportal-nim/db`
- `@ki-lernportal-nim/auth`
- `@ki-lernportal-nim/admin`
- `@ki-lernportal-nim/ai-core`

Die aufgeführten Grenzen beschreiben die maximal erlaubte Richtung.
S51A erzeugt keine künstlichen Demonstrationsimporte.

## Verbotene Imports

- Import durch Production-Code
- Produktive Runtime-Logik
- Produktive Secrets oder externe Provideraufrufe

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

Risikoabhängige Tests in allen späteren Slices.

Diese späteren Slices sind durch S51A nicht freigegeben.

## Sicherheit und Datenschutz

S51A enthält keine Secrets, Credentials, personenbezogenen Daten,
externen Requests, produktiven Providerzugriffe oder Persistenz.

Jede spätere Erweiterung benötigt eine eigene fachliche,
sicherheitsbezogene und datenschutzbezogene Prüfung.
