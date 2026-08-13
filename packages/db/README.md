# `@ki-lernportal-nim/db`

## Zweck

Kontrollierte Grenze für das lokale S51B-B-MySQL-/Drizzle-Adapterfundament
und das S51B-C1-Pilot-Schema mit versionierter SQL-Migration.

Das Package kapselt Konfigurationsprüfung, Lazy Initialization, code-first
Schema und später kontrollierte Datenbankzugriffe innerhalb der bestehenden
Next.js-Runtime.

## Erlaubte Imports

- `drizzle-orm`
- `mysql2`
- `mysql2/promise`
- `@ki-lernportal-nim/contracts`
- `@ki-lernportal-nim/domain`
- relative Package-Dateien
- erforderliche Node.js-Built-ins

Externe Datenbanklaufzeitabhängigkeiten sind ausschließlich `drizzle-orm` und
`mysql2`. `drizzle-kit` ist nur als `devDependency` für
`drizzle-kit generate` freigegeben.

## Verbotene Imports

- `drizzle-kit` in `src/**` (nur CLI/Dev-Tooling)
- `drizzle-kit push`, `pull` und `studio`
- andere Datenbankclients oder ORMs
- UI und React
- AI-Provider
- direkte Quellpfadimporte in andere Packages
- zyklische Package-Abhängigkeiten

## Öffentliche Exports

Der kontrollierte Entry-Point bleibt `src/index.ts`.

Exportiert werden die S51B-B-Konfigurations-/Adapterfunktionen sowie das
statische S51B-C1-Pilot-Schema. Kein Export darf beim Import eine
Datenbankverbindung öffnen.

## Status

Das lokale S51B-B-Adapterfundament ist durch den autorisierten
Squash-Merge von PR #82 unter
`0f126ab2eb2b7a87f8a8ee85b611ec2ea410bcd5` in `main` integriert.
Der geprüfte PR-Head war
`b76d128fbe163708f4767c4ecc737d838188b0ce`.

S51B-C1 ergänzt das code-first Schema der acht Kerntabellen, die generierte
SQL-Migration `drizzle/0000_s51bc_pilot_core.sql`, Snapshots und statische
Tests. Environment, MySQL-Treiber, Pool und Drizzle-Adapter werden weiterhin
erst durch den ausdrücklichen Aufruf von `initialize()` ausgewertet. Die Tests verwenden ausschließlich Fakes und Dateiprüfungen; es erfolgt
keine echte Datenbankverbindung, kein Netzwerkaufruf und keine
Migrationausführung.

## Spätere Slices

S51B-C2 darf erst nach separater Freigabe eine disposable lokale MySQL-
Testdatenbank starten, die eingecheckte Migration anwenden und Constraints
prüfen.

`drizzle-kit push`, Seeds, Railway-Datenbanken und Produktionsmigrationen
bleiben gesperrt.

Freigabe C (2026-08-13): Lokaler Migrate-Helper
`pnpm migrate:s51b-c-local` wendet nur die committed SQL-Datei gegen
`ki_nim_s51bc_*` auf localhost an.

## Sicherheit und Datenschutz

- keine Secrets oder reale Zugangsdaten im Repository;
- kein Lesen von Environment-Werten beim Modulimport;
- keine Pool- oder Drizzle-Erzeugung beim Modulimport;
- keine Connection Strings oder Credentials in Logs und Fehlern;
- begrenzte Timeout-, Pool- und Queue-Werte;
- Schema speichert keine Klartextpasswörter, Roh-Tokens, IPs oder User-Agents;
- ausschließlich lokale Fake-, Unit- und statische Schema-Tests in diesem Slice.
