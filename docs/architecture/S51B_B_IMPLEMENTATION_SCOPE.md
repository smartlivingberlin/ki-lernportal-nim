# S51B-B – MySQL-/Drizzle-Adapterfundament: Dokumentations- und Scope-Lock

**Status:** Reine Dokumentation. Implementierung, Abhängigkeiten,
Datenbankverbindung, Schema, Migration, Railway und Deployment bleiben
gesperrt.

**Stand:** 21. Juli 2026

**Baseline:** `ebaca10d7cbcee69587f5a87391e8b5b298c75f8`

## 1. Technische Richtung

```text
DATABASE_ENGINE=MYSQL
ORM=DRIZZLE
PRIMARY_DRIVER=mysql2
DATABASE_OWNER_PACKAGE=packages/db
MAIN_RUNTIME=EXISTING_NEXTJS_RUNTIME
SECOND_BACKEND_RUNTIME=NO
```

Andere Datenbanken, ORMs, `drizzle-kit` und eine zweite Backend-Runtime sind
nicht freigegeben.

## 2. Dateiscope dieses Dokumentationsslices

```text
AGENTS.md
docs/architecture/S51B_IMPLEMENTATION_SCOPE.md
docs/architecture/S51B_B_IMPLEMENTATION_SCOPE.md
```

Die Änderungen bleiben lokal und unstaged.

## 3. Kandidatenscope einer späteren Implementierung

```text
.env.example
AGENTS.md
docs/architecture/S51B_B_IMPLEMENTATION_SCOPE.md
package.json
pnpm-lock.yaml
packages/db/README.md
packages/db/package.json
packages/db/src/index.ts
packages/db/src/runtime-config.ts
packages/db/src/runtime-config.test.ts
packages/db/src/mysql-runtime.ts
packages/db/src/mysql-runtime.test.ts
```

Jede weitere Datei benötigt eine neue Freigabe.

## 4. Dependency-Grenze

Später grundsätzlich zulässig, aber noch nicht freigegeben:

```text
drizzle-orm
mysql2
```

Beide dürfen ausschließlich `packages/db` gehören. `drizzle-kit`, zusätzliche
Datenbankclients und Datenbankdependencies außerhalb `packages/db` bleiben
verboten.

## 5. Runtime-Grenzen

- kein Zugriff auf Environment-Werte beim Modulimport;
- keine Pool- oder Drizzle-Erzeugung beim Modulimport;
- keine Datenbankverbindung beim Modulimport;
- kein automatisches Ping oder `SELECT 1`;
- Lazy Initialization über eine ausdrückliche Factory;
- begrenzte Timeouts, Poolgröße und Queue;
- idempotentes `close()`;
- keine unkontrollierten globalen Singletons;
- keine Secrets oder Connection Strings in Logs und Fehlern.

## 6. Testanforderungen

Eine spätere Implementierung muss mit lokalen Fake-Adaptern prüfen:

- Modulimport erzeugt keinen Pool;
- Modulimport liest keine Datenbank-URL;
- ungültige Konfiguration scheitert kontrolliert;
- Secrets werden redigiert;
- wiederholtes Initialisieren erzeugt höchstens einen Fake-Pool;
- `close()` ist wiederholbar;
- echte Netzwerkaufrufe: null;
- echte Datenbankverbindungen: null.

## 7. Environment- und Secret-Vertrag

Später zulässige Variablennamen:

```text
DATABASE_URL
DB_CONNECT_TIMEOUT_MS
DB_POOL_LIMIT
DB_QUEUE_LIMIT
```

Verbindlich gilt:

- `DATABASE_URL` wird erst beim ausdrücklichen Runtime-Aufruf gelesen;
- ausschließlich `mysql://` ist zulässig;
- fehlende oder ungültige Werte scheitern kontrolliert;
- Passwörter, Benutzer, Hosts, Querywerte und vollständige URLs werden nie
  geloggt;
- reale `.env`-Dateien und Railway-Secrets bleiben außerhalb des Slices.

## 8. Timeout-, Pool- und Fehlergrenzen

```text
DB_CONNECT_TIMEOUT_MS_DEFAULT=5000
DB_CONNECT_TIMEOUT_MS_MIN=1000
DB_CONNECT_TIMEOUT_MS_MAX=10000
DB_POOL_LIMIT_DEFAULT=3
DB_POOL_LIMIT_MIN=1
DB_POOL_LIMIT_MAX=5
DB_QUEUE_LIMIT_DEFAULT=10
DB_QUEUE_LIMIT_MIN=1
DB_QUEUE_LIMIT_MAX=50
```

Mindestens folgende kontrollierte Fehlerkennungen sind erforderlich:

```text
DATABASE_URL_MISSING
DATABASE_URL_INVALID
DATABASE_PROTOCOL_INVALID
DATABASE_CONNECT_TIMEOUT_INVALID
DATABASE_POOL_LIMIT_INVALID
DATABASE_QUEUE_LIMIT_INVALID
DATABASE_RUNTIME_CLOSED
DATABASE_ADAPTER_INITIALIZATION_FAILED
```

Nicht zulässig sind unbegrenzte Timeouts, unbegrenzte Queues, automatische
Reconnect-Schleifen oder Hintergrund-Pings.

## 9. Rollback-Anforderung

Eine spätere S51B-B-Implementierung muss vollständig rücknehmbar sein durch:

1. Entfernung der neu eingeführten Runtime-Dateien;
2. Entfernung von `drizzle-orm` und `mysql2` aus `packages/db/package.json`;
3. kontrollierte Rücknahme des zugehörigen Lockfile-Diffs;
4. Entfernung des zugehörigen Testskripts;
5. erneute Ausführung der Paket-, Supply-Chain-, Lint- und Build-Gates.

Der Rollback darf keine Datenbank, Tabelle oder Daten verändern.

## 10. Trennung zu S51B-C

S51B-B enthält keine Tabellen, Drizzle-Schemas, Relationen, Indizes,
SQL-Dateien, Migrationen, Seeds, Testdatenbank, fachlichen Repositories,
Route Handler oder Server Actions.

## 11. Autorisierungsstand

```text
S51B_B_PREFLIGHT_COMPLETE=YES
S51B_B_DOCUMENTATION_SCOPE_LOCK_LOCAL_AUTHORIZED=YES
S51B_B_EXACT_SCOPE_DOCUMENTED=YES

S51B_B_IMPLEMENTATION_AUTHORIZED=NO
S51B_B_DEPENDENCY_INSTALL_AUTHORIZED=NO
S51B_B_DATABASE_RUNTIME_AUTHORIZED=NO
S51B_B_CONNECTION_PROOF_AUTHORIZED=NO

S51B_C_SCHEMA_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
MIGRATION_AUTHORIZED=NO

S51B_B_STAGE_AUTHORIZED=NO
S51B_B_COMMIT_AUTHORIZED=NO
S51B_B_PUSH_AUTHORIZED=NO
S51B_B_PR_AUTHORIZED=NO
S51B_B_MERGE_AUTHORIZED=NO

RAILWAY_CHANGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
```
