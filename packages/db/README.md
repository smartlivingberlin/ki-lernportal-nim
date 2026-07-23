# `@ki-lernportal-nim/db`

## Zweck

Kontrollierte Grenze für das lokale S51B-B-MySQL-/Drizzle-Adapterfundament.

Das Package kapselt Konfigurationsprüfung, Lazy Initialization und später
kontrollierte Datenbankzugriffe innerhalb der bestehenden Next.js-Runtime.

## Erlaubte Imports

- `drizzle-orm`
- `mysql2`
- `mysql2/promise`
- `@ki-lernportal-nim/contracts`
- `@ki-lernportal-nim/domain`
- relative Package-Dateien
- erforderliche Node.js-Built-ins

Externe Datenbankabhängigkeiten sind ausschließlich `drizzle-orm` und `mysql2`.

## Verbotene Imports

- `drizzle-kit`
- andere Datenbankclients oder ORMs
- UI und React
- AI-Provider
- direkte Quellpfadimporte in andere Packages
- zyklische Package-Abhängigkeiten

## Öffentliche Exports

Der kontrollierte Entry-Point bleibt `src/index.ts`.

Nur ausdrücklich geprüfte S51B-B-Konfigurations- und Adapterfunktionen dürfen
über diesen Entry-Point exportiert werden.

## Status

Die lokale S51B-B-Implementierung ist begonnen.

Vorhanden sind die freigegebenen Dependencies, die lokal getestete
Runtime-Konfigurationsschicht und eine Lazy-Adapterfactory. Environment,
MySQL-Treiber, Pool und Drizzle-Adapter werden erst durch den ausdrücklichen
Aufruf von `initialize()` ausgewertet beziehungsweise erzeugt. Die Tests
verwenden ausschließlich Fakes; es erfolgt keine echte Datenbankverbindung,
kein Netzwerkaufruf und kein automatischer Verbindungsnachweis.

## Spätere Slices

S51B-C umfasst erst nach separater Freigabe Tabellen, Drizzle-Schemas,
Relationen, Indizes, Migrationen und Testdatenbanken.

`drizzle-kit`, Migrationen, Seeds und reale Datenbankverbindungen bleiben
gesperrt.

## Sicherheit und Datenschutz

- keine Secrets oder reale Zugangsdaten im Repository;
- kein Lesen von Environment-Werten beim Modulimport;
- keine Pool- oder Drizzle-Erzeugung beim Modulimport;
- keine Connection Strings oder Credentials in Logs und Fehlern;
- begrenzte Timeout-, Pool- und Queue-Werte;
- ausschließlich lokale Fake- und Unit-Tests in diesem Slice.
