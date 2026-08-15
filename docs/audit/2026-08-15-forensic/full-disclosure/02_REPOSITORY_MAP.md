# 02 — COMPLETE REPOSITORY MAP

**Classification:** paths VERIFIED_CURRENT unless noted. Ignored: `node_modules`, `.next`, `.git` object internals.

## Top-level

| Path | Purpose | Status | Notes |
|------|---------|--------|-------|
| `apps/web/` | Next.js concept-demo application | VERIFIED_CURRENT | sole app |
| `packages/` | Shared packages (8) | VERIFIED_CURRENT | see below |
| `scripts/` | Quality gates, Railway helpers, migrate/proof | VERIFIED_CURRENT | ~36 script files + subdirs |
| `docs/` | Architecture, status, research, audit | VERIFIED_CURRENT | large |
| `.github/workflows/` | CI | VERIFIED_CURRENT | `ci.yml` |
| `package.json` / `pnpm-lock.yaml` / `pnpm-workspace.yaml` | Workspace root | VERIFIED_CURRENT | |
| `.env.example` | Env **names** only | VERIFIED_CURRENT | no secrets |
| `railway.staging.json` | Staging build/deploy hints | VERIFIED_CURRENT | |
| `AGENTS.md` | Agent rules + architecture gate block | VERIFIED_CURRENT | may lag narrative docs — see conflicts |
| `README.md` | Public entry | VERIFIED_CURRENT | |
| `SECURITY.md` / `CONTRIBUTING.md` | Meta | VERIFIED_CURRENT | |
| `tsconfig.base.json` | Shared TS | VERIFIED_CURRENT | |

## `apps/web`

| Path | Purpose | Status |
|------|---------|--------|
| `src/app/` | App Router pages + route handlers | VERIFIED_CURRENT |
| `src/components/` | UI (auth + learning) | VERIFIED_CURRENT · 33 tsx |
| `src/data/` | All learning content (TS modules) | VERIFIED_CURRENT · 29 files |
| `src/hooks/` | localStorage hooks | VERIFIED_CURRENT |
| `src/lib/` | backup, share URL, hash nav, helpers | VERIFIED_CURRENT |
| `src/server/` | auth-http-adapter | VERIFIED_CURRENT |
| `vendor/{auth,contracts,domain}/` | Vendored package copies for Railway npm isolation | VERIFIED_CURRENT · sync via scripts |
| `public/` | Default Next SVGs | VERIFIED_CURRENT · mostly unused branding leftovers **PARTIAL** |
| `_prototype/portal-prototype.html` | Historical/experimental prototype | HISTORICAL / experimental |
| `scripts/prepare-standalone-assets.mjs` | Standalone build asset copy | VERIFIED_CURRENT |

## `packages/*`

| Package | Purpose | Status |
|---------|---------|--------|
| `ui` | Design tokens only (no React primitives yet) | VERIFIED_CURRENT · tokens; primitives PLANNED |
| `contracts` | Ops contracts, feature flags, progress import shapes | VERIFIED_CURRENT |
| `domain` | Pilot domain enums/transitions | VERIFIED_CURRENT |
| `db` | MySQL/Drizzle lazy runtime + pilot schema + local migrate/proof | VERIFIED_CURRENT code; live Railway ABSENT |
| `auth` | Session/password/roles/HTTP login-logout | VERIFIED_CURRENT code; Prod flag OFF |
| `admin` | Empty boundary `export {}` | PLACEHOLDER / empty |
| `ai-core` | Empty boundary `export {}` | PLACEHOLDER / empty |
| `testing` | Empty boundary `export {}` | PLACEHOLDER / empty |

**ABSENT packages claimed in older notes:** `packages/config`, `packages/observability` — **do not exist**.

## `docs/` (selected)

| Path | Purpose |
|------|---------|
| `00_PROJECT_STATUS.md` | Canonical narrative status (can drift vs live SHA) |
| `architecture/` | ADRs, DAG, scopes S50/S51/S52… |
| `agent-ops/` | Safety/quality rules |
| `research/` | NVIDIA NIM analysis etc. |
| `audit/2026-08-15-forensic/` | Prior + this disclosure |
| `product/`, `issues/`, `automation/`, `reports/`, `prompts/` | Supporting docs |

## Generated / ignored (not inventoried as product)

- `node_modules/`, build caches, lockfile internals beyond version pins.
