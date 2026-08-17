import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  LESSON_PROGRESS_STATUSES,
  PILOT_COHORT_STATUSES,
  PILOT_MEMBERSHIP_STATUSES,
  PILOT_ROLES,
  PROGRESS_SOURCES,
  USER_STATUSES,
} from "@ki-lernportal-nim/domain";
import {
  DEFERRED_PILOT_TABLE_NAMES,
  PILOT_CORE_TABLE_NAMES,
  pilotSchema,
} from "./pilot-schema.ts";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const migrationSqlPath = resolve(
  packageRoot,
  "drizzle/0000_s51bc_pilot_core.sql",
);
const journalPath = resolve(packageRoot, "drizzle/meta/_journal.json");
const snapshotPath = resolve(
  packageRoot,
  "drizzle/meta/0000_snapshot.json",
);
const packageJsonPath = resolve(packageRoot, "package.json");
const drizzleConfigPath = resolve(packageRoot, "drizzle.config.ts");

function equal(
  actual: unknown,
  expected: unknown,
  label: string,
): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `${label}: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`,
    );
  }
}

function assertTrue(value: boolean, label: string): void {
  if (!value) {
    throw new Error(`${label}: expected true`);
  }
}

function assertFalse(value: boolean, label: string): void {
  if (value) {
    throw new Error(`${label}: expected false`);
  }
}

function read(path: string): string {
  return readFileSync(path, "utf8");
}

equal(PILOT_CORE_TABLE_NAMES.length, 8, "core table count");
equal(DEFERRED_PILOT_TABLE_NAMES.length, 6, "deferred table count");
equal(
  Object.keys(pilotSchema).sort(),
  [
    "authCredentials",
    "authSessions",
    "lessonProgress",
    "localProgressImports",
    "pilotCohorts",
    "pilotInvitations",
    "pilotMemberships",
    "users",
  ],
  "pilotSchema keys",
);

for (const deferred of DEFERRED_PILOT_TABLE_NAMES) {
  assertFalse(
    Object.prototype.hasOwnProperty.call(pilotSchema, deferred),
    `deferred table ${deferred} must not be in pilotSchema`,
  );
}

equal(
  [...USER_STATUSES],
  ["active", "suspended", "pending_deletion", "deidentified"],
  "user statuses",
);
equal(
  [...PILOT_COHORT_STATUSES],
  ["draft", "active", "closed", "archived"],
  "cohort statuses",
);
equal(
  [...PILOT_MEMBERSHIP_STATUSES],
  ["active", "suspended", "ended"],
  "membership statuses",
);
equal([...LESSON_PROGRESS_STATUSES], ["in_progress", "completed"], "lesson statuses");
equal([...PILOT_ROLES], ["learner", "pilot_admin"], "pilot roles");
equal([...PROGRESS_SOURCES], ["pilot_runtime", "local_import"], "progress sources");

const sql = read(migrationSqlPath);
for (const table of PILOT_CORE_TABLE_NAMES) {
  assertTrue(
    new RegExp(`CREATE TABLE \`${table}\``).test(sql),
    `SQL creates ${table}`,
  );
}
for (const deferred of DEFERRED_PILOT_TABLE_NAMES) {
  assertFalse(sql.includes(deferred), `SQL must not include ${deferred}`);
}

assertTrue(/ON DELETE restrict/i.test(sql), "restrict deletes");
assertTrue(/GENERATED ALWAYS AS/.test(sql), "generated active scope column");
assertTrue(/UNIQUE\(`email_normalized`\)/.test(sql), "email unique");
assertTrue(/UNIQUE\(`token_hash`\)/.test(sql), "token unique");
assertTrue(/UNIQUE\(`cohort_id`,`user_id`\)/.test(sql), "membership unique");
assertTrue(
  /UNIQUE\(`membership_id`,`learning_path_id`,`lesson_id`\)/.test(sql),
  "lesson progress unique",
);
assertTrue(
  /UNIQUE\(`membership_id`,`idempotency_key`\)/.test(sql),
  "import idempotency unique",
);
assertTrue(
  /UNIQUE\(`membership_id`,`client_snapshot_hash`\)/.test(sql),
  "import snapshot unique",
);

const forbiddenSqlTokens = [
  "plaintext_password",
  "raw_session_token",
  "raw_invitation_token",
  "ip_address",
  "user_agent",
  "advertising_identifier",
  "marketing_profile",
];
for (const token of forbiddenSqlTokens) {
  assertFalse(sql.toLowerCase().includes(token), token);
}

const journal = JSON.parse(read(journalPath)) as {
  entries: Array<{ tag: string }>;
};
equal(journal.entries.length, 1, "journal entries");
equal(journal.entries[0]?.tag, "0000_s51bc_pilot_core", "journal tag");

const snapshot = JSON.parse(read(snapshotPath)) as {
  tables: Record<string, unknown>;
};
equal(Object.keys(snapshot.tables).length, 8, "snapshot tables");

const packageJson = JSON.parse(read(packageJsonPath)) as {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
};
equal(packageJson.dependencies?.["drizzle-orm"], "0.45.2", "drizzle-orm version");
equal(packageJson.dependencies?.mysql2, "3.23.3", "mysql2 version");
equal(
  packageJson.dependencies?.["@ki-lernportal-nim/domain"],
  "workspace:*",
  "domain workspace dep",
);
equal(packageJson.devDependencies?.["drizzle-kit"], "0.31.10", "drizzle-kit version");
assertFalse(
  Object.values(packageJson.scripts ?? {}).some((script) =>
    script.includes("drizzle-kit push"),
  ),
  "no drizzle-kit push script",
);

const drizzleConfig = read(drizzleConfigPath);
assertTrue(/dialect:\s*"mysql"/.test(drizzleConfig), "mysql dialect");
assertFalse(drizzleConfig.includes("dbCredentials"), "no db credentials config");
assertFalse(/\bdrizzle-kit\s+push\b/.test(drizzleConfig), "no kit push command");

console.log("S51B_C1_PILOT_SCHEMA_STATIC=PASS");
console.log("CORE_TABLE_COUNT=8");
console.log("DEFERRED_TABLE_COUNT=6");
console.log("MIGRATION=0000_s51bc_pilot_core.sql");
console.log("DATABASE_CONNECTION=NO");
