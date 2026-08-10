/**
 * S51B-C2 integration proof against a disposable local MySQL database.
 *
 * Requires env from scripts/test-s51b-c-local-mysql.sh:
 * - DATABASE_URL (127.0.0.1 only, database prefix ki_nim_s51bc_)
 * - S51B_C2_DISPOSABLE=1
 * - S51B_C2_EXPECTED_DATABASE
 *
 * Importing this module must not open a connection; work happens in main().
 */
import { createConnection, type Connection, type ResultSetHeader } from "mysql2/promise";
import { PILOT_CORE_TABLE_NAMES } from "./pilot-schema.ts";

function equal(actual: unknown, expected: unknown, label: string): void {
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

function isDuplicateError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const code = (error as { code?: string }).code;
  return code === "ER_DUP_ENTRY";
}

function isForeignKeyError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const code = (error as { code?: string }).code;
  return code === "ER_NO_REFERENCED_ROW_2" || code === "ER_NO_REFERENCED_ROW";
}

function assertLocalDisposableUrl(url: string, expectedDatabase: string): void {
  assertTrue(url.startsWith("mysql://"), "DATABASE_URL must be mysql://");
  assertTrue(
    url.includes("@127.0.0.1:") || url.includes("@localhost:"),
    "DATABASE_URL must target localhost only",
  );
  assertTrue(
    !/railway|production|\.rlwy\.|\.amazonaws\.|cloud/.test(url.toLowerCase()),
    "DATABASE_URL must not look like Railway/production",
  );
  assertTrue(
    expectedDatabase.startsWith("ki_nim_s51bc_"),
    "expected database must use ki_nim_s51bc_ prefix",
  );
  assertTrue(url.includes(`/${expectedDatabase}`), "DATABASE_URL must include expected database");
}

async function expectFailure(
  action: () => Promise<unknown>,
  predicate: (error: unknown) => boolean,
  label: string,
): Promise<void> {
  try {
    await action();
  } catch (error: unknown) {
    if (!predicate(error)) {
      throw new Error(
        `${label}: unexpected error ${JSON.stringify(error)}`,
      );
    }
    return;
  }
  throw new Error(`${label}: expected failure`);
}

async function tableNames(connection: Connection, database: string): Promise<string[]> {
  const [rows] = await connection.query(
    `SELECT table_name AS name
     FROM information_schema.tables
     WHERE table_schema = ?
     ORDER BY table_name`,
    [database],
  );
  return (rows as Array<{ name: string }>).map((row) => row.name);
}

async function main(): Promise<void> {
  equal(process.env.S51B_C2_DISPOSABLE, "1", "S51B_C2_DISPOSABLE");
  const databaseUrl = process.env.DATABASE_URL;
  const expectedDatabase = process.env.S51B_C2_EXPECTED_DATABASE;
  assertTrue(typeof databaseUrl === "string" && databaseUrl.length > 0, "DATABASE_URL set");
  assertTrue(
    typeof expectedDatabase === "string" && expectedDatabase.length > 0,
    "S51B_C2_EXPECTED_DATABASE set",
  );
  assertLocalDisposableUrl(databaseUrl!, expectedDatabase!);

  const connection = await createConnection(databaseUrl!);
  try {
    const names = await tableNames(connection, expectedDatabase!);
    equal(names, [...PILOT_CORE_TABLE_NAMES].sort(), "core tables present");
    assertTrue(!names.includes("practice_attempts"), "deferred table absent");

    const [fkRows] = await connection.query(
      `SELECT COUNT(*) AS c
       FROM information_schema.TABLE_CONSTRAINTS
       WHERE CONSTRAINT_SCHEMA = ?
         AND CONSTRAINT_TYPE = 'FOREIGN KEY'`,
      [expectedDatabase],
    );
    const fkCount = Number((fkRows as Array<{ c: number }>)[0]?.c ?? 0);
    assertTrue(fkCount >= 8, `foreign key count >= 8 (got ${fkCount})`);

    await connection.query("SET FOREIGN_KEY_CHECKS=1");

    const userA = "11111111-1111-4111-8111-111111111111";
    const userB = "22222222-2222-4222-8222-222222222222";
    const cohortA = "33333333-3333-4333-8333-333333333333";
    const cohortB = "44444444-4444-4444-8444-444444444444";
    const membershipA = "55555555-5555-4555-8555-555555555555";
    const membershipB = "66666666-6666-4666-8666-666666666666";
    const sessionA = "77777777-7777-4777-8777-777777777777";
    const now = "2026-08-10 18:00:00.000";

    await connection.execute(
      `INSERT INTO users (id, email_normalized, email_display, status, created_at, updated_at)
       VALUES (?, 'alpha@example.com', 'Alpha', 'active', ?, ?)`,
      [userA, now, now],
    );

    await expectFailure(
      () =>
        connection.execute(
          `INSERT INTO users (id, email_normalized, email_display, status, created_at, updated_at)
           VALUES (?, 'alpha@example.com', 'Clone', 'active', ?, ?)`,
          [userB, now, now],
        ),
      isDuplicateError,
      "unique email_normalized",
    );

    await connection.execute(
      `INSERT INTO users (id, email_normalized, email_display, status, created_at, updated_at)
       VALUES (?, 'beta@example.com', 'Beta', 'active', ?, ?)`,
      [userB, now, now],
    );

    await expectFailure(
      () =>
        connection.execute(
          `INSERT INTO auth_credentials
           (user_id, password_hash, password_updated_at, failed_attempt_count, created_at, updated_at)
           VALUES ('99999999-9999-4999-8999-999999999999', 'hash', ?, 0, ?, ?)`,
          [now, now, now],
        ),
      isForeignKeyError,
      "auth_credentials FK to users",
    );

    await connection.execute(
      `INSERT INTO auth_credentials
       (user_id, password_hash, password_updated_at, failed_attempt_count, created_at, updated_at)
       VALUES (?, 'hash-a', ?, 0, ?, ?)`,
      [userA, now, now, now],
    );

    await connection.execute(
      `INSERT INTO auth_sessions
       (id, user_id, token_hash, created_at, last_seen_at, idle_expires_at, absolute_expires_at)
       VALUES (?, ?, 'token-hash-aaaa', ?, ?, ?, ?)`,
      [sessionA, userA, now, now, now, now],
    );

    await expectFailure(
      () =>
        connection.execute(
          `INSERT INTO auth_sessions
           (id, user_id, token_hash, created_at, last_seen_at, idle_expires_at, absolute_expires_at)
           VALUES (?, ?, 'token-hash-aaaa', ?, ?, ?, ?)`,
          [
            "88888888-8888-4888-8888-888888888888",
            userB,
            now,
            now,
            now,
            now,
          ],
        ),
      isDuplicateError,
      "unique auth_sessions.token_hash",
    );

    await connection.execute(
      `INSERT INTO pilot_cohorts
       (id, code, title, status, starts_at, ends_at, learning_path_id, retention_delete_after, created_at, updated_at)
       VALUES (?, 'pilot-a', 'Pilot A', 'active', ?, ?, 'path-1', ?, ?, ?)`,
      [cohortA, now, now, now, now, now],
    );
    await connection.execute(
      `INSERT INTO pilot_cohorts
       (id, code, title, status, starts_at, ends_at, learning_path_id, retention_delete_after, created_at, updated_at)
       VALUES (?, 'pilot-b', 'Pilot B', 'active', ?, ?, 'path-1', ?, ?, ?)`,
      [cohortB, now, now, now, now, now],
    );

    await expectFailure(
      () =>
        connection.execute(
          `INSERT INTO pilot_cohorts
           (id, code, title, status, starts_at, ends_at, learning_path_id, retention_delete_after, created_at, updated_at)
           VALUES (?, 'pilot-a', 'Dup', 'draft', ?, ?, 'path-1', ?, ?, ?)`,
          ["99999999-9999-4999-8999-999999999991", now, now, now, now, now],
        ),
      isDuplicateError,
      "unique pilot_cohorts.code",
    );

    await connection.execute(
      `INSERT INTO pilot_memberships
       (id, cohort_id, user_id, role, status, joined_at, created_at, updated_at)
       VALUES (?, ?, ?, 'learner', 'active', ?, ?, ?)`,
      [membershipA, cohortA, userA, now, now, now],
    );

    await expectFailure(
      () =>
        connection.execute(
          `INSERT INTO pilot_memberships
           (id, cohort_id, user_id, role, status, joined_at, created_at, updated_at)
           VALUES (?, ?, ?, 'learner', 'active', ?, ?, ?)`,
          [membershipB, cohortA, userA, now, now, now],
        ),
      isDuplicateError,
      "unique membership cohort_id+user_id",
    );

    await expectFailure(
      () =>
        connection.execute(
          `INSERT INTO pilot_memberships
           (id, cohort_id, user_id, role, status, joined_at, created_at, updated_at)
           VALUES (?, ?, ?, 'learner', 'active', ?, ?, ?)`,
          [membershipB, cohortB, userA, now, now, now],
        ),
      isDuplicateError,
      "at most one active/suspended membership per user",
    );

    // Historical ended membership for the same user is allowed.
    await connection.execute(
      `INSERT INTO pilot_memberships
       (id, cohort_id, user_id, role, status, joined_at, ended_at, created_at, updated_at)
       VALUES (?, ?, ?, 'learner', 'ended', ?, ?, ?, ?)`,
      [membershipB, cohortB, userA, now, now, now, now],
    );

    const lessonId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
    await connection.execute(
      `INSERT INTO lesson_progress
       (id, membership_id, learning_path_id, lesson_id, content_revision, status, source,
        started_at, last_activity_at, version, created_at, updated_at)
       VALUES (?, ?, 'path-1', 'l1', 'rev-1', 'in_progress', 'pilot_runtime', ?, ?, 1, ?, ?)`,
      [lessonId, membershipA, now, now, now, now],
    );

    await expectFailure(
      () =>
        connection.execute(
          `INSERT INTO lesson_progress
           (id, membership_id, learning_path_id, lesson_id, content_revision, status, source,
            started_at, last_activity_at, version, created_at, updated_at)
           VALUES (?, ?, 'path-1', 'l1', 'rev-1', 'completed', 'local_import', ?, ?, 1, ?, ?)`,
          ["bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", membershipA, now, now, now, now],
        ),
      isDuplicateError,
      "unique lesson_progress membership+path+lesson",
    );

    const importId = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
    await connection.execute(
      `INSERT INTO local_progress_imports
       (id, membership_id, client_snapshot_hash, imported_lesson_count, idempotency_key, created_at)
       VALUES (?, ?, 'snapshot-hash-1', 1, 'idem-1', ?)`,
      [importId, membershipA, now],
    );

    await expectFailure(
      () =>
        connection.execute(
          `INSERT INTO local_progress_imports
           (id, membership_id, client_snapshot_hash, imported_lesson_count, idempotency_key, created_at)
           VALUES (?, ?, 'snapshot-hash-2', 1, 'idem-1', ?)`,
          ["dddddddd-dddd-4ddd-8ddd-dddddddddddd", membershipA, now],
        ),
      isDuplicateError,
      "unique import membership+idempotency",
    );

    const parallelUrl = databaseUrl!;
    const parallelA = await createConnection(parallelUrl);
    const parallelB = await createConnection(parallelUrl);
    let parallelResults: PromiseSettledResult<unknown>[];
    try {
      parallelResults = await Promise.allSettled([
        parallelA.execute(
          `INSERT INTO users (id, email_normalized, email_display, status, created_at, updated_at)
           VALUES ('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', 'parallel@example.com', 'P1', 'active', ?, ?)`,
          [now, now],
        ),
        parallelB.execute(
          `INSERT INTO users (id, email_normalized, email_display, status, created_at, updated_at)
           VALUES ('ffffffff-ffff-4fff-8fff-ffffffffffff', 'parallel@example.com', 'P2', 'active', ?, ?)`,
          [now, now],
        ),
      ]);
    } finally {
      await Promise.all([parallelA.end(), parallelB.end()]);
    }

    const fulfilled = parallelResults.filter((result) => result.status === "fulfilled");
    const rejected = parallelResults.filter((result) => result.status === "rejected");
    equal(fulfilled.length, 1, "parallel unique insert winners");
    equal(rejected.length, 1, "parallel unique insert losers");
    assertTrue(
      isDuplicateError((rejected[0] as PromiseRejectedResult).reason),
      "parallel loser is duplicate",
    );

    const [countRows] = await connection.query(
      `SELECT COUNT(*) AS c FROM users WHERE email_normalized = 'parallel@example.com'`,
    );
    const count = Number((countRows as Array<{ c: number }>)[0]?.c ?? 0);
    equal(count, 1, "exactly one parallel email row");

    const [header] = (await connection.execute(
      `UPDATE users SET updated_at = ? WHERE id = ?`,
      [now, userA],
    )) as [ResultSetHeader, unknown];
    assertTrue(header.affectedRows >= 1, "update affected rows");

    console.log("S51B_C2_INTEGRATION=PASS");
    console.log("FOREIGN_KEYS=PASS");
    console.log("UNIQUE_CONSTRAINTS=PASS");
    console.log("PARALLEL_WRITE_PROTECTION=PASS");
    console.log("LOCAL_DISPOSABLE_ONLY=PASS");
  } finally {
    await connection.end();
  }
}

await main();
