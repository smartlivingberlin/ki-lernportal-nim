# S51B-A – Persistenz-Scope-Lock

**Status:** S51B-A und der S51B-B-Dokumentations- und Runtime-Scope-Lock sind in `main` integriert; die eigentliche Adapterimplementierung, Dependency-Installation, Datenbankruntime, Schema, Migration, Railway und Betrieb bleiben gesperrt

**Stand:** 21. Juli 2026

**S51B-A Integration Commit:** `fbdedec8f3e67ce99678c41779b99b22be506710`

**Implementation Branch (historisch):** `feat/s51b-a-persistence-scope-lock-20260720`

## 1. Zweck

S51B-A bereinigt vor der ersten Datenbankabhängigkeit widersprüchliche
Source-of-Truth-Angaben und härtet die Datenbank-Paketgrenzen.

Dieser Slice erzeugt keine Datenbanklaufzeit.

## 2. Verbindliche Persistenzrichtung

```text
DATABASE_ENGINE=MYSQL
ORM=DRIZZLE
PRIMARY_DRIVER=mysql2
MAIN_RUNTIME=EXISTING_NEXTJS_RUNTIME
SECOND_BACKEND_RUNTIME=NO
```

PostgreSQL, SQLite, Prisma, TypeORM, Sequelize, Knex, Kysely, MongoDB
und weitere nicht separat genehmigte Persistenztechnologien sind nicht
freigegeben.

`drizzle-kit` bleibt in S51B-A ebenfalls verboten. Eine mögliche spätere
Freigabe als Migrationstooling gehört in einen getrennten, ausdrücklich
genehmigten Schema- und Migrationsslice.

## 3. Exakter Dateiscope

S51B-A darf ausschließlich folgende Dateien ändern:

```text
.env.example
AGENTS.md
docs/architecture/S51B_IMPLEMENTATION_SCOPE.md
scripts/check-package-boundaries.mjs
```

Nicht zulässig sind Änderungen an `package.json`, `pnpm-lock.yaml`,
`pnpm-workspace.yaml`, `apps/**`, `packages/**`, `.github/workflows/**`,
Railway-Konfigurationen oder Datenbanken.

## 4. Zulässige Umsetzung

S51B-A darf ausschließlich:

- die lokale Beispiel-URL in `.env.example` auf MySQL korrigieren;
- den abgeschlossenen S51A-Status dokumentieren;
- Datenbank- und ORM-SDKs außerhalb von `packages/db` blockieren;
- innerhalb von `packages/db` nur Drizzle und `mysql2` als spätere
  technische Richtung anerkennen;
- Datenbank-Dependencies in Root-, App- und Package-Manifesten
  einschließlich ihrer `npm:`-Aliasziele prüfen;
- neue externe Manifest-Dependencies nur über eine explizite,
  ownerbezogene Allowlist zulassen;
- externe Source-Imports in `packages/db` fail closed auf
  `drizzle-orm`, `mysql2`, interne Pakete, relative Pfade und
  Node.js-Built-ins begrenzen;
- alle Quellpfade unter `apps/**`, `packages/**` und `scripts/**` prüfen;
- deterministische positive, negative und verdrahtete Policy-Selbsttests
  ergänzen.

Diese Anerkennung ist keine Installationsfreigabe.

## 5. Unverändertes Produktverhalten

Der Gastfortschritt bleibt unter
`ki-lernportal-nim:local-progress:v1` browserlokal gespeichert.

S51B-A verändert weder Storage Key noch JSON-Format, Undo, Reset,
Reload-Persistenz, Cross-Tab-Verhalten, Datenschutzdarstellung oder
sichtbare Produktfunktionen.

## 6. Import- und Manifest-Policy

Für Source-Imports und Manifest-Dependencies gilt:

- `drizzle-orm` und `mysql2` sind nur in `packages/db` zulässig;
- nicht freigegebene Datenbank- und ORM-Pakete sind überall verboten;
- `drizzle-kit` ist bis zu einem separaten Migrationsgate überall verboten;
- externe Manifest-Dependencies arbeiten fail closed gegen eine
  ownerbezogene Allowlist;
- Dependency-Schlüssel und `npm:`-Aliasziele werden beide geprüft;
- unbekannte externe Source-Imports in `packages/db` sind verboten;
- Root-, App-, Script- und andere Package-Kontexte dürfen keine
  Datenbank-SDKs importieren oder deklarieren;
- zukünftige Anwendungen unter `apps/**` werden automatisch erfasst.

Pflichtfälle umfassen mindestens:

```text
apps/web + mysql2 import/dependency = FAIL
apps/worker + pg import/dependency = FAIL
packages/contracts + drizzle-orm = FAIL
packages/domain + @prisma/client = FAIL
scripts/** + mysql2 = FAIL
packages/db + pg = FAIL
packages/db + prisma = FAIL
packages/db + drizzle-kit = FAIL
packages/db + unknown-db-client import/dependency = FAIL
apps/web + unknown external dependency = FAIL
apps/web + next -> npm:mysql2 alias target = FAIL
packages/db + mysql2 -> npm:pg alias target = FAIL
normal string containing import "mysql2" text = PASS
packages/db + drizzle-orm = PASS
packages/db + mysql2 = PASS
packages/db + mysql2/promise = PASS
```

Die Selbsttests müssen sowohl die reine Entscheidungspolicy als auch die
Verdrahtung aus Quelltext beziehungsweise Manifest über Owner-Erkennung,
Specifier-Ermittlung und Policy bis zum erwarteten Ergebnis prüfen.

## 7. Bewusste Parsergrenzen

S51B-A verwendet weiterhin einen kleinen, dependency-freien Parser und
keinen vollständigen JavaScript-/TypeScript-AST.

Abgedeckt werden:

- statische ES-Imports und Re-Exports;
- CommonJS-`require()` mit statischem String;
- dynamisches `import()` mit statischem String;
- dynamisches `import()` mit statischem Template-Literal ohne Interpolation;
- konservatives Ausblenden normaler Zeilen- und Blockkommentare;
- Ausblenden gewöhnlicher String- und Template-Inhalte, damit darin
  vorkommender Import-Beispieltext keinen False Positive erzeugt.

Nicht garantiert abgedeckt werden:

- berechnete oder zusammengesetzte Specifier;
- Template-Literale mit `${...}`-Interpolation;
- Aliase um `require`;
- `module.require`;
- `createRequire` und anschließend umbenannte Loader;
- zur Laufzeit erzeugte Modulnamen;
- exotische Syntax, die einen vollständigen AST erfordern würde.

Diese Grenzen sind akzeptiert, weil S51B-A keine neue Parser-Abhängigkeit
installieren darf. Vor einer produktiven Server- oder Datenbankruntime muss
erneut bewertet werden, ob ein AST-basierter Checker erforderlich ist.

## 8. Ausdrücklich ausgeschlossen

S51B-A enthält keine neue Abhängigkeit, Installation,
Datenbankverbindung, Tabelle, SQL-Datei, Drizzle-Schema, Migration,
Seed-Ausführung, Repository-Runtime, Transaktion, Route Handler,
Server Action, Auth-, Session-, Rollen-, Ownership-, Learning-Event-,
Attempt-, Outbox- oder Job-Persistenz.

Railway-, Deploy- und Production-Änderungen bleiben verboten.

## 9. Folgeslices

Der S51B-B-Dokumentations- und Runtime-Scope-Lock wurde durch PR #79
unter `c37703fdd4d2df152857e4834ab9cf01351a9cfb` in `main` integriert.
Die eigentliche lokale MySQL-/Drizzle-Adapterimplementierung darf erst nach
separater menschlicher Freigabe beginnen.

Der exakte S51B-B-Kandidatenscope ist in
[`S51B_B_IMPLEMENTATION_SCOPE.md`](./S51B_B_IMPLEMENTATION_SCOPE.md)
festgeschrieben. Dieser integrierte Scope-Lock autorisiert weiterhin keine
Adapter-Dependency-Installation, Datenbankruntime, Verbindung, Schema oder
Migration.

S51B-C bleibt blockiert, bis Datenkategorien, Zwecke, IDs,
Beziehungen, Aufbewahrung, Löschung, Auditgrenzen, Indizes,
Transaktionen, Migration, Rollback und Testdatenbank beschlossen sind.

## 10. Abnahmekriterien

```text
EXACT_CHANGED_FILE_COUNT=4
PACKAGE_JSON_CHANGED=NO
LOCKFILE_CHANGED=NO
NEW_DEPENDENCY=NO
DATABASE_CONNECTION=NO
DATABASE_SCHEMA=NO
MIGRATION=NO
APP_RUNTIME_CHANGED=NO
DATABASE_IMPORT_POLICY_SELF_TESTS=PASS
DATABASE_MANIFEST_POLICY_SELF_TESTS=PASS
DATABASE_END_TO_END_SELF_TESTS=PASS
PACKAGE_BOUNDARY_CHECK=PASS
PACKAGE_TYPECHECK=PASS
WORKTREE_STAGED=NO
```

## 11. Autorisierungsstand

```text
S51A_COMPLETE=YES
S51A_INTEGRATED_TO_MAIN=YES
S51A_MERGE_COMMIT=4bd8abeceac7e7b6bcd3b6cf4852653a8d0942c8

S51B_A_PREFLIGHT_COMPLETE=YES
S51B_A_SCOPE_DOCUMENTED=YES
S51B_A_LOCAL_IMPLEMENTATION_AUTHORIZED=YES
S51B_A_PR_NUMBER=77
S51B_A_INTEGRATED_TO_MAIN=YES
S51B_A_MERGE_EXECUTED=YES
PR77_MERGED=YES
PR77_MERGE_METHOD=SQUASH
PR77_MERGE_COMMIT=fbdedec8f3e67ce99678c41779b99b22be506710

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
