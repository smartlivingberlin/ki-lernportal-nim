# `@ki-lernportal-nim/domain`

## Zweck

Dieses Package enthält das kanonische, infrastrukturfreie Fachvokabular und
reine fachliche Regeln des KI-Lernportals.

Persistenz, Transport, Frameworks, Umgebungszugriffe und Providerlogik gehören
nicht in dieses Package.

## Erlaubte Imports

S51C-B1A verwendet ausschließlich relative Imports innerhalb von
`packages/domain`.

Die Abhängigkeitsrichtung bleibt:

```text
packages/contracts -> packages/domain = erlaubt
packages/domain -> packages/contracts = verboten
```

## Verbotene Imports

Verboten sind insbesondere Imports aus React, Next.js, HTTP-Frameworks,
Datenbankbibliotheken, Dateisystem-, Environment-, Railway-, AI-,
Monitoring- und anderen Workspace-Packages.

## Öffentliche Exports

Der einzige öffentliche Entry-Point ist `src/index.ts`.

S51C-B1A exportiert ausschließlich:

- kontrollierte Pilot-Statuswerte und daraus abgeleitete Typen;
- Pilotrollen und Fortschrittsquellen;
- Assessment-, Feedback- und Lernereignisarten;
- interne Domain-Regelverletzungsbegriffe;
- reine Guards und fachliche Prädikate;
- ausdrücklich freigegebene Statusübergänge;
- terminale Zustände;
- Privacy-Retry-Regeln;
- Assessment-Antwort- und Finalisierungsinvarianten.

## Status

S51C-B1A enthält das freigegebene Pilot-Domain-Vokabular und reine fachliche
Regeln.

Keine Runtime-Implementierung von Persistenz, Transport, Framework-, Provider-,
Datenbank-, Auth-, Web-, Railway- oder Deploymentlogik ist Bestandteil von
S51C-B1A.

Für `lesson_progress` sind nur `in_progress` und `completed` gespeicherte
Statuswerte. `not_started` wird ausschließlich durch das Fehlen eines
Datensatzes dargestellt.

S51C-B1A ergänzt keine eigene Übergangsmatrix für den Lektionsfortschritt.

Die Rolle `pilot_admin` gilt ausschließlich innerhalb des eigenen
Pilotbereichs. Reparaturrollen und globale Administrationsrechte gehören nicht
zu diesem Slice.

Freitextfeedback, Mastery, Review- und Wiederholungsplanung bleiben
ausgeschlossen.

Privacy-Retry-Grenzen erlauben `failed -> processing` nur bei autorisiertem
Wiederholungsversuch, unverändertem Request-Typ und erhaltener Fehlerhistorie.

Neue Assessment-Antworten sind nur bei einem laufenden Assessment zulässig.
Antwortinhalt und `response_sequence` bleiben unverändert. `is_final` darf
genau einmal von `false` auf `true` wechseln und ausschließlich gemeinsam mit
dem Übergang `in_progress` zu `completed`.

Abgeschlossene und abgebrochene Assessment-Läufe nehmen keine neuen Antworten
an.

## Spätere Slices

Providerneutrale Transporttypen, DTOs, Parser, Response-Verträge und
B1B-Fehlercodes gehören zu einem getrennt zu autorisierenden S51C-B1B-Slice.

Persistenzmodelle, Datenbanktabellen, Constraints, Transaktionen, konkrete
Retention- oder Löschfristen sowie Schema- und Migrationsarbeit bleiben
ebenfalls späteren, getrennt freizugebenden Slices vorbehalten.

## Sicherheit und Datenschutz

S51C-B1A enthält keine Secrets, Credentials, personenbezogenen Daten, externen
Requests oder produktiven Providerzugriffe.

Ausdrücklich ausgeschlossen bleiben Manifest-, Lockfile-, Root-, CI-, Script-,
App-, Datenbank-, Auth-, Web-, Railway- und Deploymentänderungen.
