# 20 — EVIDENCE INDEX

| ID | Claim | Classification | Path / locus | Runtime / test |
|----|-------|----------------|--------------|----------------|
| E01 | Repo smartlivingberlin/ki-lernportal-nim | VERIFIED_CURRENT | git remote | 2026-08-15 |
| E02 | main SHA 5c489c2… | VERIFIED_CURRENT | origin/main | |
| E03 | Prod/Staging version sha 5c489c2d1acf | VERIFIED_CURRENT | GET /version | HTTP |
| E04 | DB not_configured | VERIFIED_CURRENT | GET /ready | HTTP |
| E05 | Prod auth FEATURE_DISABLED | VERIFIED_CURRENT | POST /api/auth/login | HTTP |
| E06 | Staging auth validates body | VERIFIED_CURRENT | POST login {} | HTTP |
| E07 | robots Disallow / | VERIFIED_CURRENT | /robots.txt | HTTP |
| E08 | Security headers PASS | VERIFIED_CURRENT | s50d2 script + live hdrs | EXIT 0 |
| E09 | 12 lessons l1–l12 | VERIFIED_CURRENT | lessons.ts | count |
| E10 | 38 practice checkQuestions | VERIFIED_CURRENT | practice.ts | count |
| E11 | 36 practice selfCheck lines | VERIFIED_CURRENT | practice.ts | count |
| E12 | 8 placement self-check | VERIFIED_CURRENT | self-check.ts | count |
| E13 | 17 glossary | VERIFIED_CURRENT | glossary.ts | count |
| E14 | 37 challenges | VERIFIED_CURRENT | interactive-challenges.ts | count |
| E15 | 116 micro-units | VERIFIED_CURRENT | micro-units-*.ts | count |
| E16 | 10 theme worlds | VERIFIED_CURRENT | theme-worlds.ts | count |
| E17 | No /api/auth/me | ABSENT | app/api/auth/* | list |
| E18 | ai-core empty | VERIFIED_CURRENT | packages/ai-core/src/index.ts | |
| E19 | admin empty | VERIFIED_CURRENT | packages/admin/src/index.ts | |
| E20 | No use server | ABSENT | repo rg | |
| E21 | 8 LS keys | VERIFIED_CURRENT | hooks + backup | |
| E22 | Datenschutz missing 2 keys | CONFLICT | datenschutz/page.tsx | |
| E23 | Backup 6 keys | VERIFIED_CURRENT | local-progress-backup.ts | test PASS |
| E24 | Sample gates PASS | VERIFIED_CURRENT | see 13 | EXIT 0 |
| E25 | Next 16.2.11 | VERIFIED_CURRENT | apps/web/package.json | |
| E26 | pnpm 11.13 | VERIFIED_CURRENT | packageManager | |
| E27 | Memory session store | VERIFIED_CURRENT | memory-session-store.ts | |
| E28 | Pilot schema 8 tables | VERIFIED_CURRENT | pilot-schema.ts | |
| E29 | Hash SPA learning | VERIFIED_CURRENT | page.tsx | |
| E30 | Open PR #212 | VERIFIED_CURRENT | gh pr list | |

## Source manifest (investigated)

- Repository tree depth ≤3; packages/*; apps/web/src/**; scripts; .github/workflows/ci.yml  
- `.env.example`, `railway.staging.json`, `AGENTS.md`, `README.md`, `docs/00_PROJECT_STATUS.md`  
- Prior `docs/audit/2026-08-15-forensic/*`  
- Live Prod+Staging HTTP probes listed in 12/13  
- git log / gh pr list merged+open  
- Sample pnpm tests listed in 13  
**Not investigated deeply:** full Playwright headed runs, Docker DB proof, Railway dashboard, secret values, formal legal opinion.
