# `@ki-lernportal-nim/domain`

## Zweck

Infrastrukturfreie Fachbegriffe, Policies, Zustände, Fehler und Zustandsübergänge.

## Erlaubte Imports

- Keine Package-Imports im S51A-Skeleton.

Die aufgeführten Grenzen beschreiben die maximal erlaubte Richtung.
S51A erzeugt keine künstlichen Demonstrationsimporte.

## Verbotene Imports

- React, Next.js und HTTP-Frameworks
- Drizzle, Dateisystem- und Environment-Zugriffe
- Railway-, AI- und Monitoring-SDKs

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

Spätere fachliche Domain-Slices.

Diese späteren Slices sind durch S51A nicht freigegeben.

## Sicherheit und Datenschutz

S51A enthält keine Secrets, Credentials, personenbezogenen Daten,
externen Requests, produktiven Providerzugriffe oder Persistenz.

Jede spätere Erweiterung benötigt eine eigene fachliche,
sicherheitsbezogene und datenschutzbezogene Prüfung.
