# S51C-B1B – Contract-Implementierungs-Scope-Lock

**Status:** Dokumentarischer Scope-Lock. Keine Implementierungs-, Test-, Manifest-, Lockfile-, Schema-, Migrations-, Datenbank-, Auth-, Web-, Railway-, Vercel- oder Deployment-Freigabe.

**Parent:** Issue #94
**Baseline:** `588cbadce7803825b464170a9d402b6c0f6c7d62`
**Branch:** `docs/s51c-b1b-contract-implementation-scope-lock-20260728`

## 1. Zweck und Vorrang

Der erste B1B-Slice wird auf providerneutrale TypeScript-Verträge für einen vollständigen lokalen Lektionsfortschrittsimport begrenzt. Zulässig sind nur Typen, DTOs, Parser, Guards und reine Validierungsergebnisse.

Vorrang: `S51C_A_PILOT_PERSISTENCE_SCOPE.md`, danach `S51C_B1_DOMAIN_CONTRACT_TYPES_SCOPE.md`, danach öffentliche Exports von `packages/domain`, danach dieses Dokument. Jede Implementierung benötigt eine getrennte Autorisierung.

## 2. Dateigrenze

Dieser Dokumentationsslice erzeugt ausschließlich:

```text
docs/architecture/S51C_B1B_CONTRACT_IMPLEMENTATION_SCOPE.md
```

Später maximal erlaubt:

```text
MODIFY packages/contracts/README.md
MODIFY packages/contracts/src/index.ts
ADD    packages/contracts/src/local-progress-import.ts
ADD    packages/contracts/src/local-progress-import.test.ts
```

```text
EXACT_CHANGED_FILE_COUNT=4
EXACT_MODIFIED_FILE_COUNT=2
EXACT_NEW_FILE_COUNT=2
```

Verboten: Änderungen an Manifesten, Lockfiles, `packages/domain/**`, `packages/db/**`, `packages/auth/**`, `packages/admin/**`, `packages/testing/**`, `apps/**`, `scripts/**` und `.github/**`.

## 3. Abhängigkeit und Runtime

Erlaubt:

```text
packages/contracts -> packages/domain
```

Verboten:

```text
packages/domain -> packages/contracts
```

Domain-Importe erfolgen nur über `@ki-lernportal-nim/domain`. Relative Imports innerhalb von `packages/contracts`, beispielsweise `export * from "./local-progress-import.ts";`, sind erlaubt. Relative Cross-Package-Importe sowie direkte Source- und Subpath-Importe in `packages/domain` sind verboten. `local_import` wird aus `ProgressSource` wiederverwendet; keine duplizierte String-Union.

Keine neue Dependency oder externe Validierungsbibliothek, insbesondere kein `zod`, `valibot`, `yup`, `joi`, `ajv`, `superstruct`, `io-ts` oder `class-validator`.

Kein React, Next.js, Drizzle, MySQL, Railway, Vercel, Datenbankclient, Repository, Auth-/Sessionruntime, Route Handler, Server Action, Provider-SDK, Secret-, Netzwerk-, Dateisystem- oder Environmentzugriff. Nur reines TypeScript.

## 4. Version

```ts
export const LOCAL_PROGRESS_IMPORT_CONTRACT_VERSION =
  "S51C_B1B_LOCAL_PROGRESS_IMPORT_V1" as const;
```

Die Kennung ist Modul-Metainformation, kein serialisiertes Feld. Neue Versionen benötigen einen neuen Slice.

## 5. Request

Exakte Felder:

```text
idempotency_key
client_snapshot_hash
lesson_ids
```

```ts
export interface LocalProgressImportRequestV1 {
  readonly idempotency_key: string;
  readonly client_snapshot_hash: string;
  readonly lesson_ids: readonly string[];
}
```

Verboten sind unter anderem `user_id`, `membership_id`, `cohort_id`, `role`, `source`, `status`, `import_id`, `raw_snapshot` und `metadata`. Identität, Mitgliedschaft, Rolle, Pilot-Scope und Ownership stammen später ausschließlich aus serverseitigem Kontext.

`lesson_ids` bezeichnet ausschließlich Lektionen, die das bestehende lokale Fortschrittsmodell als abgeschlossen markiert. Der Vertrag transportiert keine `in_progress`-Zustände, Start- oder Abschlusszeiten, Scores, Versuche oder sonstigen Aktivitätsdaten.

Eine spätere Runtime darf gültige IDs ausschließlich als `lesson_progress.status=completed` mit `source=local_import` übernehmen. Bereits vorhandener Serverfortschritt darf weder zurückgesetzt noch herabgestuft werden.

## 6. Syntax und Größen

`idempotency_key`: kanonische kleingeschriebene UUID v4, exakt 36 ASCII-Zeichen:

```regex
^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$
```

`client_snapshot_hash`: kleingeschriebener SHA-256-Hexwert, exakt 64 ASCII-Zeichen:

```regex
^[0-9a-f]{64}$
```

Jede `lesson_id`: 1 bis 128 ASCII-Zeichen:

```regex
^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$
```

Kein Trimmen, keine unsichtbaren Zeichen, Leerzeichen, Steuerzeichen, Schrägstriche, Rückwärtsschrägstriche oder Prozentkodierung. `lesson_ids` enthält 1 bis 512 Einträge. Der Contract berechnet keinen Hash und prüft keine Katalogexistenz.

## 7. Listenregeln

1. Request- und Reject-Liste sind nicht leer.
2. Duplikate sind ungültig; keine Deduplizierung.
3. Request-Reihenfolge bleibt erhalten; keine Sortierung.
4. Jede Ergebnisliste ist intern duplikatfrei.
5. Erfolgslisten sind disjunkt.
6. Ihre geordnete Vereinigung entspricht exakt dem Request.
7. Relative Reihenfolge entspricht dem Request.
8. Reject-IDs sind eine nichtleere geordnete Request-Teilmenge.
9. Eine unbekannte oder unzulässige ID bewirkt vollständige Ablehnung.

```text
PARTIAL_IMPORT_ALLOWED=NO
```

## 8. Erfolgsantwort

Exakte Felder:

```text
status
import_id
client_snapshot_hash
imported_lesson_ids
already_present_lesson_ids
imported_lesson_count
already_present_lesson_count
```

```ts
export interface LocalProgressImportImportedResponseV1 {
  readonly status: "imported";
  readonly import_id: string;
  readonly client_snapshot_hash: string;
  readonly imported_lesson_ids: readonly string[];
  readonly already_present_lesson_ids: readonly string[];
  readonly imported_lesson_count: number;
  readonly already_present_lesson_count: number;
}
```

`import_id` erfüllt das UUID-v4-Muster. Zähler sind sichere Ganzzahlen von 0 bis 512 und entsprechen exakt den Listenlängen. Ihre Summe entspricht der Request-Anzahl. Der Hash entspricht dem Request. Bei idempotenter Wiederholung darf die Importliste leer sein, wenn alle IDs bereits vorhanden sind.

## 9. Ablehnungsantwort

Exakte Felder:

```text
status
error_code
rejected_lesson_ids
```

```ts
export interface LocalProgressImportRejectedResponseV1 {
  readonly status: "rejected";
  readonly error_code: "LOCAL_PROGRESS_IMPORT_REJECTED";
  readonly rejected_lesson_ids: readonly string[];
}
```

Einziger Transportfehlercode:

```text
LOCAL_PROGRESS_IMPORT_REJECTED
```

Keine weiteren Fehlercodes, freien Meldungen, Stacktraces, Debug-, Identitäts- oder Katalogdaten.

## 10. Union, Parser und Guards

```ts
export type LocalProgressImportResponseV1 =
  | LocalProgressImportImportedResponseV1
  | LocalProgressImportRejectedResponseV1;

export type ContractParseResult<T> =
  | Readonly<{ ok: true; value: T }>
  | Readonly<{ ok: false }>;
```

Einzige Response-Discriminants: `status=imported` und `status=rejected`.

Parser akzeptieren `unknown`, werfen bei gewöhnlichen Validierungsfehlern nicht und geben keine Eingabedaten oder freien Meldungen zurück.

Erlaubte reine Funktionen:

```text
isLocalProgressImportRequestV1
parseLocalProgressImportRequestV1
isLocalProgressImportImportedResponseV1
parseLocalProgressImportImportedResponseV1
isLocalProgressImportRejectedResponseV1
parseLocalProgressImportRejectedResponseV1
isLocalProgressImportResponseV1
parseLocalProgressImportResponseV1
isLocalProgressImportResponseConsistentWithRequestV1
```

## 11. Fail-Closed-Regeln

Vor Erfolg vollständig prüfen:

1. Gewöhnliches Nicht-Null-Record-Objekt, kein Array; zulässiger Prototyp nur `Object.prototype` oder `null`.
2. Alle Pflichtfelder sind eigene Datenproperties; geerbte Pflichtfelder, Accessor-Properties, Getter und Setter sind unzulässig.
3. Exakte Pflichtfeldmenge.
4. Keine unbekannten eigenen String- oder Symbolfelder.
5. Exakte Typ-, ASCII-, Längen- und Musterregeln.
6. Exakte Listen-, Eindeutigkeits- und Reihenfolgeregeln.
7. Exakte Zähler-/Listen-Konsistenz.
8. Exakte Discriminants und exakter Fehlercode.
9. Vollständige Request-/Response-Konsistenz.

Keine Eingabe wird getrimmt, repariert, dedupliziert, sortiert, ergänzt oder teilweise zurückgegeben.

```text
UNKNOWN_FIELDS_ALLOWED=NO
UNKNOWN_VALUES_ALLOWED=NO
PARTIAL_IMPORT_ALLOWED=NO
```

## 12. Atomarität, Sicherheit und Datenschutz

B1B validiert nur und persistiert nichts. Eine spätere Runtime schreibt vollständig atomar oder gar nicht.

Der Contract authentifiziert nicht, akzeptiert keine clientseitige Identität, entscheidet nicht über Ownership oder Rolle, speichert/protokolliert keine Eingaben und enthält keine Secrets, Tokens, Credentials oder personenbezogenen Freitexte.

```text
DATABASE_ATOMICITY_IMPLEMENTED_IN_B1B=NO
PARTIAL_IMPORT_ALLOWED=NO
```

## 13. Pflichtprüfungen der späteren Implementierung

Tests prüfen mindestens: exakte Felder; fehlende, unbekannte und Symbolfelder; UUID-, Hash- und Lesson-ID-Grenzen; Listenlängen; leere Listen; Duplikate; Reihenfolge; Disjunktheit; vollständige Request-Abdeckung; Zähler; Hashgleichheit; Reject-Teilmenge; exakte Discriminants; einzigen Fehlercode; fail-closed bei `null`, Arrays, Funktionen und primitiven Werten; keine Eingabemutation; Domain-Import nur über den Entry-Point; keine verbotene Abhängigkeit.

Gates vor Commit:

```text
node --experimental-strip-types packages/contracts/src/local-progress-import.test.ts
pnpm packages:boundaries
pnpm packages:typecheck
pnpm supply-chain:check
git diff --check
```

Vor Push/PR zusätzlich vollständige vorhandene CI. Keine Änderung an `package.json`, Scripts oder Workflowdateien.

## 14. Ausgeschlossener Scope

Ausgeschlossen: Manifest/Lockfile, Domainänderungen, Schema, SQL, Migrationen, Seeds, Datenbankzugriff, Queries, Repositories, Transaktionen, Auth, Sessions, Einladungen, CSRF, APIs, Server Actions, Web/UI, Inhaltskatalog, Hashberechnung, Lernereignisse, Feedback, Assessments, Retention, Löschruntime, Railway, Vercel, Deployment, KI, RAG, Payment, White Label, Multi-Tenant, öffentlicher Launch und öffentliche Claims.

## 15. Abnahme

```text
DOCUMENT_ONLY_SLICE=YES
EXACT_NEW_FILE_COUNT=1
EXACT_CHANGED_FILE_COUNT=1
LOCAL_PROGRESS_IMPORT_ONLY=YES
REQUEST_FIELDS_LOCKED=YES
RESPONSE_FIELDS_LOCKED=YES
TRANSPORT_VERSION_LOCKED=YES
IDEMPOTENCY_KEY_RULE_LOCKED=YES
SNAPSHOT_HASH_RULE_LOCKED=YES
LESSON_ID_RULE_LOCKED=YES
LIST_RULES_LOCKED=YES
UNKNOWN_FIELDS_ALLOWED=NO
UNKNOWN_VALUES_ALLOWED=NO
PARTIAL_IMPORT_ALLOWED=NO
IMPORTED_DISCRIMINANT_LOCKED=YES
REJECTED_DISCRIMINANT_LOCKED=YES
ONLY_TRANSPORT_ERROR_CODE=LOCAL_PROGRESS_IMPORT_REJECTED
DOMAIN_DEPENDENCY_DIRECTION_LOCKED=YES
EXTERNAL_VALIDATION_LIBRARY_ALLOWED=NO
LATER_IMPLEMENTATION_MAX_FILE_COUNT=4
MANIFEST_CHANGED=NO
LOCKFILE_CHANGED=NO
PACKAGE_CHANGED=NO
TEST_CHANGED=NO
SCRIPT_CHANGED=NO
CI_CHANGED=NO
DOMAIN_CHANGED=NO
DATABASE_CHANGED=NO
AUTH_CHANGED=NO
WEB_CHANGED=NO
RAILWAY_ACCESSED=NO
VERCEL_ACCESSED=NO
DEPLOYMENT_EXECUTED=NO
```

## 16. Autorisierungsstand

```text
S51C_B1B_SCOPE_LOCK_DOCUMENT_AUTHORIZED=YES
S51C_B1B_IMPLEMENTATION_AUTHORIZED=NO
PACKAGE_CHANGE_AUTHORIZED=NO
TEST_IMPLEMENTATION_AUTHORIZED=NO
MANIFEST_CHANGE_AUTHORIZED=NO
LOCKFILE_CHANGE_AUTHORIZED=NO
DEPENDENCY_CHANGE_AUTHORIZED=NO
DOMAIN_CHANGE_AUTHORIZED=NO
SCRIPT_CHANGE_AUTHORIZED=NO
CI_CHANGE_AUTHORIZED=NO
SCHEMA_AUTHORIZED=NO
MIGRATION_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
AUTH_RUNTIME_AUTHORIZED=NO
WEB_INTEGRATION_AUTHORIZED=NO
STAGING_AUTHORIZED=NO
COMMIT_AUTHORIZED=NO
PUSH_AUTHORIZED=NO
PR_AUTHORIZED=NO
GITHUB_WRITE_AUTHORIZED=NO
RAILWAY_CHANGE_AUTHORIZED=NO
VERCEL_CHANGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
PUBLIC_LAUNCH_AUTHORIZED=NO
```
