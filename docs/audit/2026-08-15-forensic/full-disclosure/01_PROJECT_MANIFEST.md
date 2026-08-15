# 01 — PROJECT MANIFEST

**Disclosure package:** `docs/audit/2026-08-15-forensic/full-disclosure/`  
**Audit timestamp (UTC):** 2026-08-15T06:12:20Z  
**Mode:** READ-ONLY forensic disclosure  
**Classification legend:** VERIFIED_CURRENT | IMPLEMENTED_NOT_RUNTIME_VERIFIED | PARTIAL | HISTORICAL | PLANNED | PROPOSED | ABSENT | UNKNOWN | CONFLICT

## Technical identity

| Field | Value | Classification | Evidence |
|-------|-------|----------------|----------|
| Name | KI-Lernportal NIM | VERIFIED_CURRENT | `package.json` name, UI titles |
| Repository | github.com/smartlivingberlin/ki-lernportal-nim | VERIFIED_CURRENT | `git remote` |
| Owner/Org | smartlivingberlin | VERIFIED_CURRENT | remote URL |
| Default branch | `main` | VERIFIED_CURRENT | GitHub / fetch |
| Audit branch | `cursor/forensic-audit-handoff-b554` | VERIFIED_CURRENT | `git branch` |
| Base SHA (`origin/main`) | `5c489c2d1acf6cf08c3ed9d0c5af22b4aba82fdc` | VERIFIED_CURRENT | `git rev-parse origin/main` |
| Audit workspace tip (pre-disclosure commit) | see git after this package lands | PARTIAL | evolving |
| Live Production build_sha | `5c489c2d1acf` | VERIFIED_CURRENT | GET `https://web-production-51d3c8.up.railway.app/version` |
| Live Staging build_sha | `5c489c2d1acf` | VERIFIED_CURRENT | GET `https://ki-lernportal-nim-staging.up.railway.app/version` |
| Environment label | `concept_demo` | VERIFIED_CURRENT | `/version` JSON |
| Tags | multiple `safety/pr*` + `archive/*` | VERIFIED_CURRENT | `git tag -l` (sample listed in 17) |
| Remote branches | ~165 refs | VERIFIED_CURRENT | `git branch -r` count |
| Open PRs (sample) | #212 audit; #107 dependabot | VERIFIED_CURRENT | `gh pr list` |
| Monorepo | YES (pnpm workspaces) | VERIFIED_CURRENT | `pnpm-workspace.yaml` |
| Package manager | pnpm@11.13.0 | VERIFIED_CURRENT | `packageManager` field |
| Node engines | 22.22.1 | VERIFIED_CURRENT | root `package.json` |
| Languages | TypeScript, JavaScript, Markdown, SQL | VERIFIED_CURRENT | tree |
| Framework | Next.js 16.2.11 App Router | VERIFIED_CURRENT | `apps/web/package.json` |
| UI | React 19.2.4, Tailwind 4.3.3 | VERIFIED_CURRENT | same |
| Hosting | Railway | VERIFIED_CURRENT | response `server: railway-hikari`, configs |
| Production URL | https://web-production-51d3c8.up.railway.app | VERIFIED_CURRENT | HTTP 200 |
| Staging URL | https://ki-lernportal-nim-staging.up.railway.app | VERIFIED_CURRENT | HTTP 200 |
| Custom domains | — | UNKNOWN | not observed |
| Database (designed) | MySQL via drizzle-orm + mysql2 in `packages/db` | VERIFIED_CURRENT | code |
| Database (live Railway) | `not_configured` | VERIFIED_CURRENT | GET `/ready` |
| Auth (Production) | DISABLED (`FEATURE_DISABLED`) | VERIFIED_CURRENT | POST login |
| Auth (Staging) | RUNTIME ON (memory bootstrap path) | VERIFIED_CURRENT | POST login → VALIDATION_FAILED |
| E-Mail provider SDK | ABSENT | VERIFIED_CURRENT | search |
| AI runtime | ABSENT (`packages/ai-core` empty) | VERIFIED_CURRENT | `export {}` |
| Analytics SDK | ABSENT | VERIFIED_CURRENT | search |
| Monitoring/APM | Ops routes only; no Sentry/etc. | VERIFIED_CURRENT | search + `/health` family |
| CI/CD | GitHub Actions `.github/workflows/ci.yml` | VERIFIED_CURRENT | file |
| Payments | ABSENT | VERIFIED_CURRENT | search |

## Prior audit stance

Parent package `docs/audit/2026-08-15-forensic/` is a starting point. This full-disclosure pass **re-verified** and **corrected** several claims (see `18_DOCUMENTATION_CONFLICTS.md`).
