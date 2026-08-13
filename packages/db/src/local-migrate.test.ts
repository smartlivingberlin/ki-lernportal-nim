/**
 * Static tests for S51B-C local migrate URL guards and SQL prep.
 * Import must not open a network or database connection.
 */
import {
  assertLocalMigrateUrl,
  prepareMigrationSql,
} from "./local-migrate.ts";

function expectThrow(label: string, fn: () => void): void {
  try {
    fn();
  } catch {
    return;
  }
  throw new Error(`${label}: expected throw`);
}

const validUrl =
  "mysql://root:s51bcLocalOnly@127.0.0.1:34001/ki_nim_s51bc_demo";

assertLocalMigrateUrl(validUrl, "ki_nim_s51bc_demo");

expectThrow("rejects railway host", () =>
  assertLocalMigrateUrl(
    "mysql://root:x@railway.proxy:3306/ki_nim_s51bc_demo",
    "ki_nim_s51bc_demo",
  ),
);

expectThrow("rejects wrong prefix", () =>
  assertLocalMigrateUrl(
    "mysql://root:x@127.0.0.1:3306/other_db",
    "other_db",
  ),
);

const prepared = prepareMigrationSql(
  "CREATE TABLE t (id int);--> statement-breakpoint\nALTER TABLE t ADD INDEX i (id);",
);
if (prepared.includes("statement-breakpoint")) {
  throw new Error("prepareMigrationSql must strip breakpoints");
}
if (!prepared.includes("ALTER TABLE t ADD INDEX i (id);")) {
  throw new Error("prepareMigrationSql must keep ALTER statements");
}

console.log("S51B_C_LOCAL_MIGRATE_STATIC=PASS");
