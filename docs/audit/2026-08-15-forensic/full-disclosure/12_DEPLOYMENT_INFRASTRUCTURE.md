# 12 — DEPLOYMENT & INFRASTRUCTURE

## Environments

| Env | URL | Provider | Branch/Commit observed | DB | Auth | AI | Flags observed |
|-----|-----|----------|------------------------|----|------|----|----------------|
| Production | https://web-production-51d3c8.up.railway.app | Railway | build_sha `5c489c2d1acf` = `origin/main` tip content | not_configured | OFF | OFF | concept_demo |
| Staging | https://ki-lernportal-nim-staging.up.railway.app | Railway | same sha | not_configured | ON (validation) | OFF | concept_demo |
| Local | localhost (dev) | developer | workspace | optional | optional | off | `.env.example` |
| Preview | — | UNKNOWN | — | — | — | — | not verified |

## Build / start (documented in repo)

| Step | Command | Notes |
|------|---------|-------|
| Install | `pnpm install --frozen-lockfile` | CI |
| Build web | `pnpm --filter web build` / railway.staging.json | standalone prepare script |
| Start | `pnpm --filter web start` (standalone server.js) | HOSTNAME 0.0.0.0 staging config |
| Healthcheck | `/health` | railway.staging.json |

## CI/CD

- Workflow: `.github/workflows/ci.yml` on `main` + `fix/**` + PRs to main  
- Job: install → boundaries → vendor isolation → typecheck → many package tests → db proof → supply-chain → build → lint → content gates → Playwright smokes → local server ops checks  
- This audit: **did not** run full CI; sample gates PASS (see 13)

## Live vs repository HEAD

| Check | Result | Class |
|-------|--------|-------|
| Prod SHA vs `origin/main` | match `5c489c2d1acf` | VERIFIED_CURRENT |
| Audit branch ahead of main | docs-only commits on `cursor/forensic-audit-handoff-b554` | VERIFIED_CURRENT |
| Features in code not live | none major for learning (same sha) | — |
| Auth flag Prod vs Staging | differ | VERIFIED_CURRENT |

## Autodeploy / secrets / rollback

| Item | Status |
|------|--------|
| Autodeploy Wait-for-CI | UNKNOWN (dashboard not accessed); docs historically claim controls |
| Secret values | UNKNOWN (not read — correct) |
| Rollback runbook | PARTIAL in docs; not executed |

## Env var names (no values)

Required/optional for various modes: `APP_ENV`, `DATABASE_URL`, `DB_CONNECT_TIMEOUT_MS`, `DB_POOL_LIMIT`, `DB_QUEUE_LIMIT`, `AUTH_RUNTIME`, `STAGING_BOOTSTRAP_EMAIL`, `STAGING_BOOTSTRAP_PASSWORD_HASH`, `STAGING_BOOTSTRAP_SUBJECT_ID`, `STAGING_BOOTSTRAP_ROLE`, `QDRANT_URL`, `NVIDIA_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, plus CI/local `S51B_*`, `BASE_URL`, `RAILWAY_GIT_COMMIT_SHA`, `RAILWAY_ENVIRONMENT*`.

Feature flags (contracts, default false): `auth_runtime`, `admin_runtime`, `ai_rag_runtime`, `database_readiness_required`.
