/**
 * S51B-B disposable local MySQL connection proof.
 * Invoked only by scripts/prove-s51b-b-db-connection.sh.
 * Not part of packages/db typecheck surface.
 */
import { sql } from "drizzle-orm";
import type { MySql2Database } from "drizzle-orm/mysql2";
import { createMySqlRuntime } from "../packages/db/src/mysql-runtime.ts";
import { assertLocalDisposableConnectionUrl } from "../packages/db/src/connection-proof-guards.ts";

function assertTrue(value: boolean, label: string): void {
  if (!value) {
    throw new Error(`${label}: expected true`);
  }
}

assertTrue(
  process.env.S51B_B_CONNECTION_PROOF === "1",
  "S51B_B_CONNECTION_PROOF must be 1",
);

const databaseUrl = process.env.DATABASE_URL ?? "";
const expectedDatabase = process.env.S51B_B_EXPECTED_DATABASE ?? "";
assertLocalDisposableConnectionUrl(databaseUrl, expectedDatabase);

const runtime = createMySqlRuntime<MySql2Database>({
  readEnvironment: () => ({
    DATABASE_URL: process.env.DATABASE_URL,
    DB_CONNECT_TIMEOUT_MS: process.env.DB_CONNECT_TIMEOUT_MS,
    DB_POOL_LIMIT: process.env.DB_POOL_LIMIT,
    DB_QUEUE_LIMIT: process.env.DB_QUEUE_LIMIT,
  }),
});

try {
  const db = await runtime.initialize();
  const result = await db.execute(sql`SELECT 1 AS ok`);
  const rows = Array.isArray(result)
    ? result[0]
    : (result as { rows?: unknown }).rows;
  const first = Array.isArray(rows) ? rows[0] : undefined;
  const okValue =
    first && typeof first === "object" && first !== null && "ok" in first
      ? (first as { ok: unknown }).ok
      : undefined;

  assertTrue(
    okValue === 1 || okValue === "1" || okValue === 1n,
    "SELECT 1 must return ok=1 via createMySqlRuntime().initialize()",
  );

  console.log("S51B_B_CONNECTION_PROOF_RUNTIME=PASS");
  console.log("S51B_B_INITIALIZE=YES");
  console.log("S51B_B_SELECT_1=YES");
  console.log("S51B_B_DATABASE_PREFIX=ki_nim_s51bb_");
  console.log("RAILWAY_CONNECTION=NO");
  console.log("PRODUCTION_CONNECTION=NO");
} catch (error: unknown) {
  const message =
    error instanceof Error ? error.message : "unknown connection proof error";
  console.error("S51B_B_CONNECTION_PROOF_RUNTIME=FAIL");
  console.error(`ERROR=${message}`);
  process.exitCode = 1;
} finally {
  await runtime.close();
}
