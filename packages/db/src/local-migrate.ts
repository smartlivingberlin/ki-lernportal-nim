/**
 * S51B-C local migrate applicator (disposable localhost only).
 *
 * Requires env from scripts/migrate-s51b-c-local.sh.
 * Excluded from packages/db typecheck (Node/mysql2 CLI entry).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createConnection } from "mysql2/promise";
import {
  assertLocalMigrateUrl,
  prepareMigrationSql,
} from "./local-migrate-guards.ts";

function assertTrue(value: boolean, label: string): void {
  if (!value) {
    throw new Error(`${label}: expected true`);
  }
}

async function main(): Promise<void> {
  assertTrue(
    process.env.S51B_C_LOCAL_MIGRATE === "1",
    "S51B_C_LOCAL_MIGRATE must be 1",
  );

  const databaseUrl = process.env.DATABASE_URL ?? "";
  const expectedDatabase = process.env.S51B_C_EXPECTED_DATABASE ?? "";
  assertLocalMigrateUrl(databaseUrl, expectedDatabase);

  const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
  const migrationPath = join(
    root,
    "packages/db/drizzle/0000_s51bc_pilot_core.sql",
  );
  const sql = prepareMigrationSql(readFileSync(migrationPath, "utf8"));

  const connection = await createConnection({
    uri: databaseUrl,
    multipleStatements: true,
  });
  try {
    await connection.query(sql);
    const [rows] = await connection.query(
      `SELECT COUNT(*) AS fk_count
       FROM information_schema.TABLE_CONSTRAINTS
       WHERE CONSTRAINT_SCHEMA = ?
         AND CONSTRAINT_TYPE = 'FOREIGN KEY'`,
      [expectedDatabase],
    );
    const fkCount = Number(
      Array.isArray(rows) && rows[0] && typeof rows[0] === "object"
        ? (rows[0] as { fk_count: unknown }).fk_count
        : 0,
    );
    assertTrue(fkCount >= 8, `expected at least 8 foreign keys, got ${fkCount}`);
    console.log(`S51B_C_FOREIGN_KEY_COUNT=${fkCount}`);
  } finally {
    await connection.end();
  }
}

const isDirectRun =
  process.argv[1]?.endsWith("local-migrate.ts") ||
  process.argv[1]?.endsWith("local-migrate.js");

if (isDirectRun) {
  main().catch((error: unknown) => {
    const message =
      error instanceof Error ? error.message : "unknown local migrate error";
    console.error("S51B_C_LOCAL_MIGRATE_RUNTIME=FAIL");
    console.error(`ERROR=${message}`);
    process.exitCode = 1;
  });
}
