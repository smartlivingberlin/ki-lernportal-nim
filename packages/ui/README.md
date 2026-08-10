# `@ki-lernportal-nim/ui`

## Zweck

Wiederverwendbare Design-Tokens, UI-Primitives und barrierearme Darstellungsverträge.

## Erlaubte Imports

- `@ki-lernportal-nim/contracts`
- `@ki-lernportal-nim/domain`

Die aufgeführten Grenzen beschreiben die maximal erlaubte Richtung.
S51A erzeugt keine künstlichen Demonstrationsimporte.

## Verbotene Imports

- Datenbank- und Drizzle-Zugriffe
- Auth-, Rollen- oder Ownership-Entscheidungen
- AI-, Search-, Railway- oder Monitoring-SDKs
- Secret-Zugriffe
- React-/Next-Runtime in diesem Foundation-Slice

Unzulässig bleiben außerdem zyklische Abhängigkeiten und direkte
Quellpfadimporte in andere Packages.

## Öffentliche Exports

Der kontrollierte Entry-Point ist `src/index.ts`.

Exportiert werden reine Design-Token-Daten (Farbe, Typografie, Spacing,
Radius, Motion). Es gibt keine React-Komponenten und keine DOM-Runtime.

## Status

Keine Runtime-Implementierung ist in S51A vorhanden.

Das Package enthält in diesem Slice ausschließlich Design-System-2.0-Tokens
als reine Datenfoundation — ohne React-Primitives, ohne Provider und ohne
UI-Laufzeitverhalten.

Die Web-App spiegelt dieselben Token-Werte unter
`apps/web/src/design/tokens.ts`, damit Railway Production mit Root Directory
`apps/web` und npm ohne `workspace:`-Protokoll bauen kann. Werte bei
Token-Änderungen in beiden Orten synchron halten.

## Spätere Slices

Spätere UI-Primitives, zugängliche Komponenten und Design-System-Erweiterungen.

Diese späteren Slices sind durch S51A nicht freigegeben und brauchen jeweils
eine eigene Freigabe.

## Sicherheit und Datenschutz

S51A enthält keine Secrets, Credentials, personenbezogenen Daten,
externen Requests, produktiven Providerzugriffe oder Persistenz.

Jede spätere Erweiterung benötigt eine eigene fachliche,
sicherheitsbezogene und datenschutzbezogene Prüfung.

## Designprinzipien (Foundation)

- keine Grautöne als UI-Chrome
- WCAG 2.2 AA als Kontrastziel
- `prefers-reduced-motion` respektieren
- Touch-Ziele mindestens 44 CSS-Pixel
- deutschsprachige, verständliche Oberfläche
