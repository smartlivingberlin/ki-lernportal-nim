# 09 — DATA STORAGE & DATABASE FORENSICS

## Strict layers

| Layer | Status |
|-------|--------|
| DATABASE DESIGNED | YES — `packages/db/src/pilot-schema.ts` 8 core tables + deferred names |
| DATABASE CONFIGURED (Railway prod/staging) | NO — `/ready` → `not_configured` |
| DATABASE DEPLOYED (Railway) | NO evidence of live MySQL for app |
| DATABASE ACTUALLY USED (app requests) | NO |
| DATABASE USED (CI disposable local) | YES in CI scripts — IMPLEMENTED_NOT_RUNTIME_VERIFIED in this agent (Docker proof not re-run here); static connection-proof tests PASS |

## Provider / ORM

| Item | Value | Evidence |
|------|-------|----------|
| Type | MySQL | drizzle mysql-core |
| ORM | drizzle-orm | `packages/db` |
| Driver | mysql2 | package deps |
| Init | lazy `initialize()` only | runtime-config / mysql-runtime |
| Migration | `drizzle/0000_s51bc_pilot_core.sql` + local-migrate helper | disposable localhost only |

## Pilot core tables (designed)

`users`, `auth_credentials`, `auth_sessions`, `pilot_cohorts`, `pilot_invitations`, `pilot_memberships`, `lesson_progress`, `local_progress_imports`

Deferred names only: `practice_attempts`, `assessment_runs`, `assessment_answers`, `learning_events`, `learner_feedback`, `privacy_requests`

PII potential when used: emails, password hashes, session token hashes, progress — **not live today**.

Soft-delete: `users.deletedAt` column exists in schema — design only.

## Client storage register

| Key | Source | Stored data | Personal? | Created/Read/Updated/Deleted | Privacy documented? |
|-----|--------|-------------|-----------|------------------------------|---------------------|
| `ki-lernportal-nim:local-progress:v1` | `useLocalProgress` | completed lesson ids | possibly (behavior) | yes / backup / reset | YES on Datenschutz |
| `ki-lernportal-nim:micro-progress:v1` | `useLocalMicroProgress` | micro unit ids | possibly | yes | YES |
| `ki-lernportal-nim:literacy-path:v1` | `useLiteracyPathProgress` | stations | possibly | yes | YES |
| `ki-lernportal-nim:spaced-review:v1` | `useLocalReviewQueue` | SRS queue | possibly | yes | YES |
| `ki-lernportal-nim:self-check:v1` | `useSelfCheckProgress` | answers/recommendation | possibly | yes | **NO** (missing on Datenschutz) CONFLICT |
| `ki-lernportal-nim:lesson-confidence:v1` | `useLocalLessonConfidence` | unsure lesson ids | possibly | yes | **NO** CONFLICT |
| `ki-lernportal-nim:simple-mode:v1` | `useSimpleMode` | `"1"`/`"0"` | low | yes (not in backup/reset) | YES |
| `ki-lernportal-nim:first-start-coach:v1` | `FirstStartCoach` | dismissed | low | yes (not in backup/reset) | YES |

**sessionStorage:** ABSENT  
**IndexedDB / Cache API product use:** ABSENT (not found)  
**Cookie:** `nim_session` (HttpOnly, Secure, SameSite=Lax) — Staging when auth on; Prod auth off so typically unset — VERIFIED_CURRENT code; Prod Set-Cookie on login ABSENT path

### Backup file

Format `ki-lernportal-nim-progress-backup` v1 includes **six** progress keys (lessons, micro, literacy, review, selfCheck, lessonConfidence) — VERIFIED_CURRENT `local-progress-backup.ts`. Datenschutz text claiming “four” — **CONFLICT**.
