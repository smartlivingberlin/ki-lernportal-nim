# S51B-B – MySQL-/Drizzle-Adapterfundament: Dokumentations- und Scope-Lock

**Status:** Dokumentations- und Runtime-Scope-Lock durch PR #79 in
`main` integriert. Die eigentliche Adapterimplementierung,
Adapter-Abhängigkeiten, Datenbankverbindung, Schema, Migration, Railway und
Deployment bleiben gesperrt.

**Stand:** 21. Juli 2026

**Baseline:** `ebaca10d7cbcee69587f5a87391e8b5b298c75f8`

**Historischer PR-Head:** `0fe754e9225bf3e6e2e3e8504aa88a11850daa01`

**Integration:** PR #79, Squash-Commit
`c37703fdd4d2df152857e4834ab9cf01351a9cfb`

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

## 2. Dateiscope des ursprünglichen Dokumentationsslices

```text
AGENTS.md
docs/architecture/S51B_IMPLEMENTATION_SCOPE.md
docs/architecture/S51B_B_IMPLEMENTATION_SCOPE.md
```

Dieser ursprüngliche Dokumentationsscope wurde durch PR #79 in `main`
integriert. PR #79 enthielt zusätzlich ausschließlich den geprüften minimalen
transitiven Audit-Fix in `pnpm-lock.yaml` und `pnpm-workspace.yaml`.

Dadurch wurde keine MySQL-/Drizzle-Adapterruntime implementiert oder
freigegeben.

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
S51B_B_EXACT_SCOPE_DOCUMENTED=YES
S51B_B_SCOPE_LOCK_INTEGRATED_TO_MAIN=YES
S51B_B_PR_NUMBER=79
S51B_B_PR_HEAD=0fe754e9225bf3e6e2e3e8504aa88a11850daa01
S51B_B_MERGE_EXECUTED=YES
PR79_MERGED=YES
PR79_MERGE_METHOD=SQUASH
PR79_MERGE_COMMIT=c37703fdd4d2df152857e4834ab9cf01351a9cfb
PR79_MERGED_AT=2026-07-21T22:38:53+02:00
PR79_PRE_MERGE_CI_RUN_NUMBER=177
PR79_PRE_MERGE_CI_CONCLUSION=SUCCESS
S51B_B_TRANSITIVE_AUDIT_FIX_INTEGRATED=YES
S51B_B_APPLICATION_RUNTIME_CHANGED=NO

S51B_B_IMPLEMENTATION_AUTHORIZED=YES
S51B_B_DEPENDENCY_INSTALL_AUTHORIZED=YES
S51B_B_DATABASE_RUNTIME_AUTHORIZED=YES
S51B_B_LOCAL_IMPLEMENTATION_EXECUTED=YES
S51B_B_IMPLEMENTATION_BRANCH=feat/s51b-b-mysql-drizzle-adapter-foundation-20260721
S51B_B_IMPLEMENTATION_BASE=b7811f25b618b48281f615fe7fbac629e20811a5
S51B_B_DEPENDENCIES_INSTALLED=drizzle-orm@0.45.2,mysql2@3.23.1
S51B_B_RUNTIME_CONFIG_IMPLEMENTED=YES
S51B_B_LAZY_ADAPTER_IMPLEMENTED=YES
S51B_B_FAKE_TESTS_IMPLEMENTED=YES
S51B_B_CI_FAKE_TEST_EXECUTION_CONFIGURED=YES
S51B_B_LOCAL_ACCEPTANCE=PASS
S51B_B_LOCAL_ACCEPTANCE_DATE=2026-07-22
S51B_B_CONNECTION_PROOF_AUTHORIZED=NO
S51B_B_NEXT_IMPLEMENTATION_ACTION_AUTHORIZED=NO
S51B_B_COMMIT_CREATED=NO
S51B_B_PUSH_EXECUTED=NO
S51B_B_PR_CREATED=NO
S51B_B_INTEGRATED_TO_MAIN=NO

S51B_C_SCHEMA_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
MIGRATION_AUTHORIZED=NO

RAILWAY_CHANGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
```
