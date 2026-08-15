# 13 — TEST, BUILD & QUALITY

## Commands (canonical)

| Purpose | Command |
|---------|---------|
| Install | `pnpm install --frozen-lockfile` |
| Build | `pnpm build` / `pnpm --filter web build` |
| Lint | `pnpm lint` / web eslint |
| Package boundaries | `pnpm packages:boundaries` / `packages:typecheck` |
| Many gates | see root `package.json` `test:*` scripts |
| Full CI | GitHub Actions `ci.yml` |

## Executed in THIS disclosure pass (2026-08-15T06:12Z)

| Command / check | Exit | Result | Class |
|-----------------|------|--------|-------|
| `pnpm test:portal-clarity` | 0 | PASS | TEST EXECUTED + PASSED |
| `pnpm test:packaging-a` | 0 | PASS | EXECUTED + PASSED |
| `pnpm test:next-step-contract` | 0 | PASS | EXECUTED + PASSED |
| `pnpm test:progress-backup` | 0 | PASS | EXECUTED + PASSED |
| `pnpm test:lesson-share-url` | 0 | PASS | EXECUTED + PASSED |
| `pnpm test:s50d2-security-headers` (default) | 0 | PASS | EXECUTED + PASSED |
| `BASE_URL=prod pnpm test:s50d2-security-headers` | 0 | PASS | EXECUTED + PASSED |
| `pnpm test:s52-d2b-staging-auth-docs` | 0 | PASS | EXECUTED + PASSED |
| `pnpm test:s52-a-auth-policy` | 0 | PASS | EXECUTED + PASSED |
| `pnpm test:s52-b-auth-runtime` | 0 | PASS | EXECUTED + PASSED |
| `pnpm test:s51b-b-db-runtime` | 0 | PASS | EXECUTED + PASSED |
| `pnpm packages:boundaries` | 0 | PASS | EXECUTED + PASSED |
| Full `pnpm build` | — | **NOT EXECUTED** this pass | UNKNOWN here |
| Full Playwright suite | — | NOT EXECUTED this pass | EXISTS in CI |
| Docker MySQL connection-proof script | — | NOT EXECUTED this pass | EXISTS; static proof tests ran |

## Test inventory (categories)

| Type | Examples | Exists? |
|------|----------|---------|
| Static contract scripts | portal-clarity, packaging, content-wave, headers | YES |
| node:assert package tests | auth, db, contracts, domain, ui tokens | YES |
| Playwright + axe smokes | CI local server | YES |
| E2E against Railway with writes | — | ABSENT / not done |
| Pen-test | — | ABSENT |

## Critical untested / thin areas (product)

- Staging login success with real bootstrap secrets  
- Multi-device progress  
- Full a11y certification  
- Load/performance budgets measured  
- AI paths (n/a — absent)  
- Admin paths (n/a — absent)
