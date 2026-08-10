/**
 * S51B-C1 code-first MySQL schema for the eight pilot core tables.
 *
 * Static only: importing this module must not open a database connection,
 * read environment variables, or run migrations.
 */
import { sql } from "drizzle-orm";
import {
  char,
  datetime,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import {
  LESSON_PROGRESS_STATUSES,
  PILOT_COHORT_STATUSES,
  PILOT_MEMBERSHIP_STATUSES,
  PILOT_ROLES,
  PROGRESS_SOURCES,
  USER_STATUSES,
} from "@ki-lernportal-nim/domain";

export const PILOT_CORE_TABLE_NAMES = [
  "users",
  "auth_credentials",
  "auth_sessions",
  "pilot_cohorts",
  "pilot_invitations",
  "pilot_memberships",
  "lesson_progress",
  "local_progress_imports",
] as const;

export const DEFERRED_PILOT_TABLE_NAMES = [
  "practice_attempts",
  "assessment_runs",
  "assessment_answers",
  "learning_events",
  "learner_feedback",
  "privacy_requests",
] as const;

const userStatusEnum = mysqlEnum("status", [...USER_STATUSES]);
const cohortStatusEnum = mysqlEnum("status", [...PILOT_COHORT_STATUSES]);
const membershipStatusEnum = mysqlEnum("status", [...PILOT_MEMBERSHIP_STATUSES]);
const lessonProgressStatusEnum = mysqlEnum("status", [...LESSON_PROGRESS_STATUSES]);
const pilotRoleEnum = mysqlEnum("role", [...PILOT_ROLES]);
const progressSourceEnum = mysqlEnum("source", [...PROGRESS_SOURCES]);

export const users = mysqlTable(
  "users",
  {
    id: char("id", { length: 36 }).primaryKey(),
    emailNormalized: varchar("email_normalized", { length: 320 }),
    emailDisplay: varchar("email_display", { length: 320 }),
    status: userStatusEnum.notNull().default("active"),
    createdAt: datetime("created_at", { fsp: 3 }).notNull(),
    updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
    deletedAt: datetime("deleted_at", { fsp: 3 }),
  },
  (table) => [
    uniqueIndex("users_email_normalized_uidx").on(table.emailNormalized),
    index("users_status_idx").on(table.status),
  ],
);

export const authCredentials = mysqlTable("auth_credentials", {
  userId: char("user_id", { length: 36 })
    .primaryKey()
    .references(() => users.id, { onDelete: "restrict", onUpdate: "restrict" }),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  passwordUpdatedAt: datetime("password_updated_at", { fsp: 3 }).notNull(),
  failedAttemptCount: int("failed_attempt_count").notNull().default(0),
  lockedUntil: datetime("locked_until", { fsp: 3 }),
  createdAt: datetime("created_at", { fsp: 3 }).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
});

export const authSessions = mysqlTable(
  "auth_sessions",
  {
    id: char("id", { length: 36 }).primaryKey(),
    userId: char("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "restrict", onUpdate: "restrict" }),
    tokenHash: char("token_hash", { length: 64 }).notNull(),
    createdAt: datetime("created_at", { fsp: 3 }).notNull(),
    lastSeenAt: datetime("last_seen_at", { fsp: 3 }).notNull(),
    idleExpiresAt: datetime("idle_expires_at", { fsp: 3 }).notNull(),
    absoluteExpiresAt: datetime("absolute_expires_at", { fsp: 3 }).notNull(),
    revokedAt: datetime("revoked_at", { fsp: 3 }),
    revocationReason: varchar("revocation_reason", { length: 64 }),
  },
  (table) => [
    uniqueIndex("auth_sessions_token_hash_uidx").on(table.tokenHash),
    index("auth_sessions_user_id_idx").on(table.userId),
    index("auth_sessions_idle_expires_at_idx").on(table.idleExpiresAt),
    index("auth_sessions_absolute_expires_at_idx").on(table.absoluteExpiresAt),
  ],
);

export const pilotCohorts = mysqlTable(
  "pilot_cohorts",
  {
    id: char("id", { length: 36 }).primaryKey(),
    code: varchar("code", { length: 64 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    status: cohortStatusEnum.notNull().default("draft"),
    startsAt: datetime("starts_at", { fsp: 3 }).notNull(),
    endsAt: datetime("ends_at", { fsp: 3 }).notNull(),
    learningPathId: varchar("learning_path_id", { length: 64 }).notNull(),
    retentionDeleteAfter: datetime("retention_delete_after", { fsp: 3 }).notNull(),
    createdAt: datetime("created_at", { fsp: 3 }).notNull(),
    updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
  },
  (table) => [
    uniqueIndex("pilot_cohorts_code_uidx").on(table.code),
    index("pilot_cohorts_status_idx").on(table.status),
  ],
);

export const pilotInvitations = mysqlTable(
  "pilot_invitations",
  {
    id: char("id", { length: 36 }).primaryKey(),
    cohortId: char("cohort_id", { length: 36 })
      .notNull()
      .references(() => pilotCohorts.id, {
        onDelete: "restrict",
        onUpdate: "restrict",
      }),
    emailNormalized: varchar("email_normalized", { length: 320 }).notNull(),
    tokenHash: char("token_hash", { length: 64 }).notNull(),
    expiresAt: datetime("expires_at", { fsp: 3 }).notNull(),
    redeemedAt: datetime("redeemed_at", { fsp: 3 }),
    redeemedUserId: char("redeemed_user_id", { length: 36 }).references(
      () => users.id,
      { onDelete: "restrict", onUpdate: "restrict" },
    ),
    revokedAt: datetime("revoked_at", { fsp: 3 }),
    createdAt: datetime("created_at", { fsp: 3 }).notNull(),
    createdByUserId: char("created_by_user_id", { length: 36 }).references(
      () => users.id,
      { onDelete: "restrict", onUpdate: "restrict" },
    ),
  },
  (table) => [
    uniqueIndex("pilot_invitations_token_hash_uidx").on(table.tokenHash),
    index("pilot_invitations_cohort_id_idx").on(table.cohortId),
    index("pilot_invitations_expires_at_idx").on(table.expiresAt),
  ],
);

export const pilotMemberships = mysqlTable(
  "pilot_memberships",
  {
    id: char("id", { length: 36 }).primaryKey(),
    cohortId: char("cohort_id", { length: 36 })
      .notNull()
      .references(() => pilotCohorts.id, {
        onDelete: "restrict",
        onUpdate: "restrict",
      }),
    userId: char("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "restrict", onUpdate: "restrict" }),
    role: pilotRoleEnum.notNull(),
    status: membershipStatusEnum.notNull().default("active"),
    joinedAt: datetime("joined_at", { fsp: 3 }).notNull(),
    endedAt: datetime("ended_at", { fsp: 3 }),
    createdAt: datetime("created_at", { fsp: 3 }).notNull(),
    updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
    /**
     * Enforces at most one active/suspended membership per user.
     * Ended memberships store NULL and remain historically allowed.
     */
    activeScopeUserId: char("active_scope_user_id", { length: 36 }).generatedAlwaysAs(
      sql`CASE WHEN \`status\` IN ('active', 'suspended') THEN \`user_id\` ELSE NULL END`,
      { mode: "stored" },
    ),
  },
  (table) => [
    uniqueIndex("pilot_memberships_cohort_user_uidx").on(
      table.cohortId,
      table.userId,
    ),
    uniqueIndex("pilot_memberships_active_scope_user_uidx").on(
      table.activeScopeUserId,
    ),
    index("pilot_memberships_user_id_idx").on(table.userId),
    index("pilot_memberships_status_idx").on(table.status),
  ],
);

export const lessonProgress = mysqlTable(
  "lesson_progress",
  {
    id: char("id", { length: 36 }).primaryKey(),
    membershipId: char("membership_id", { length: 36 })
      .notNull()
      .references(() => pilotMemberships.id, {
        onDelete: "restrict",
        onUpdate: "restrict",
      }),
    learningPathId: varchar("learning_path_id", { length: 64 }).notNull(),
    lessonId: varchar("lesson_id", { length: 64 }).notNull(),
    contentRevision: varchar("content_revision", { length: 64 }).notNull(),
    status: lessonProgressStatusEnum.notNull(),
    source: progressSourceEnum.notNull(),
    startedAt: datetime("started_at", { fsp: 3 }).notNull(),
    completedAt: datetime("completed_at", { fsp: 3 }),
    lastActivityAt: datetime("last_activity_at", { fsp: 3 }).notNull(),
    version: int("version").notNull().default(1),
    createdAt: datetime("created_at", { fsp: 3 }).notNull(),
    updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
  },
  (table) => [
    uniqueIndex("lesson_progress_membership_path_lesson_uidx").on(
      table.membershipId,
      table.learningPathId,
      table.lessonId,
    ),
    index("lesson_progress_membership_id_idx").on(table.membershipId),
    index("lesson_progress_status_idx").on(table.status),
  ],
);

export const localProgressImports = mysqlTable(
  "local_progress_imports",
  {
    id: char("id", { length: 36 }).primaryKey(),
    membershipId: char("membership_id", { length: 36 })
      .notNull()
      .references(() => pilotMemberships.id, {
        onDelete: "restrict",
        onUpdate: "restrict",
      }),
    clientSnapshotHash: char("client_snapshot_hash", { length: 64 }).notNull(),
    importedLessonCount: int("imported_lesson_count").notNull(),
    idempotencyKey: varchar("idempotency_key", { length: 128 }).notNull(),
    createdAt: datetime("created_at", { fsp: 3 }).notNull(),
  },
  (table) => [
    uniqueIndex("local_progress_imports_membership_idempotency_uidx").on(
      table.membershipId,
      table.idempotencyKey,
    ),
    uniqueIndex("local_progress_imports_membership_snapshot_uidx").on(
      table.membershipId,
      table.clientSnapshotHash,
    ),
    index("local_progress_imports_membership_id_idx").on(table.membershipId),
  ],
);

/** Schema object map used by drizzle-kit and static tests. */
export const pilotSchema = {
  users,
  authCredentials,
  authSessions,
  pilotCohorts,
  pilotInvitations,
  pilotMemberships,
  lessonProgress,
  localProgressImports,
} as const;

export type PilotSchema = typeof pilotSchema;
