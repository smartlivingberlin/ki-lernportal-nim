# 21 — EXTERNAL AI MASTER HANDOFF

**Instruction to the receiving AI:** You do not know this project. Read this file, then drill into numbered disclosure files in this folder as needed. Prefer **VERIFIED_CURRENT** evidence over README claims. Re-check anything marked CONFLICT or UNKNOWN before advising product changes.

**Audit timestamp:** 2026-08-15T06:12:20Z (UTC)  
**Mode:** READ-ONLY full disclosure  
**Repo:** `github.com/smartlivingberlin/ki-lernportal-nim`  
**main SHA verified:** `5c489c2d1acf6cf08c3ed9d0c5af22b4aba82fdc`  
**Live SHA:** `5c489c2d1acf` on Production + Staging  
**Disclosure path:** `docs/audit/2026-08-15-forensic/full-disclosure/`  
**Parent lighter audit:** `docs/audit/2026-08-15-forensic/` (corrected by this package)

---

## Project purpose & audience

German **beginner AI literacy portal** (“KI-Lernportal NIM”): teach what AI is, prompting, risks, safety — for non-technical users. **Not** a live NIM inference product today.

## What it is TODAY (CURRENT)

A **public Railway concept demo**: rich static/interactive learning content in a Next.js client portal with **browser localStorage progress**, ops endpoints, Staging-only gated auth foundation, and **unused** live DB. Empty `admin` / `ai-core` packages.

### Can today
- Complete 12 kernweg lessons, practices, challenges, theme worlds (116 micro-units), glossary, literacy path, spaced review, local search, backup/import, share links, help overlay.
- Hit `/version|/health|/live|/ready`.

### Cannot today
- Cloud accounts on Production, server progress sync, admin CMS, live LLM/RAG, payments, analytics product, SEO indexing (disallowed).

## Architecture (pointer)

See `02`, `08`, `12`. Monorepo pnpm + Next 16 app `apps/web` + packages ui/contracts/domain/db/auth + empty admin/ai-core/testing.

```
Browser → Next app (hash SPA /) + LS
       → Ops routes
       → Auth login/logout (Staging)
       → packages/db only if initialized (live: not)
```

## Pages / routes
See `03`. Five user pages + ops + 2 auth APIs. Learning = `/#…` sections.

## Content
See `06`. **Corrected counts:** 12 lessons; **38** practice checkQuestions; 36 practice checklist lines; 8 placement questions; 17 glossary; 37 challenges; 10 worlds; 116 micro-units.

## User flows
See `07`. Primary anonymous LS journey. Auth does not unlock lessons.

## Interactions / components
See `04`, `04b`, `05`.

## Backend / API / DB / storage
See `08`, `09`. Designed MySQL pilot schema ≠ configured ≠ used on Railway.

## Auth / security
See `10`. Prod auth OFF; Staging memory sessions; roles vocabulary unused on content; headers good; no CSP.

## AI / integrations
See `11`. **No runtime AI.** Railway + GitHub + pnpm.

## Deployment / tests
See `12`, `13`. Live matches main tip. Sample gates executed PASS; full CI/build not fully re-run here.

## Privacy / legal / SEO / a11y
See `14`, `15`. Privacy drift CONFLICTS. robots disallow all.

## Analytics / money / affiliate / admin / ops
See `16`. All monetization/affiliate/admin ABSENT; ops endpoints only.

## History / conflicts / risks
See `17`, `18`, `19`, `20`.

## Machine JSON
`22_EXTERNAL_AI_MASTER_HANDOFF.json`

---

## Positioning reality

**Portal is today actually:** a noindex concept-demo learning website with substantial beginner curriculum and local progress.

**Publicly say:** concept demo; data in browser; no production accounts; teaches AI, does not run your prompts through NVIDIA/OpenAI.

**Do not say:** production SaaS; live NIM API; cloud sync; certified WCAG/DSGVO-complete without review.

---

## Final questions (explicit answers)

1. **What is it today?** Public German AI-literacy concept demo on Railway/Next.js with local progress.  
2. **What can a real user do?** Learn via lessons/worlds/exercises; save progress in browser; export backup; read legal pages.  
3. **E2E verified functions?** Ops endpoints; static pages HTTP; Prod auth deny; Staging validation; security headers; listed unit/gates PASS — full learner browser E2E **NOT** fully executed here.  
4. **Looks finished but incomplete?** `/anmelden`, DB packages, role vocabulary, AI branding, Datenschutz completeness.  
5. **Code-only?** Pilot schema, memory auth success path, empty packages, MFA helpers, deferred tables.  
6. **Plan-only?** Prod auth+DB sessions, server progress, admin, RAG, payments, monitoring product.  
7. **Absent?** Live AI, payments, analytics SDK, `/me`, CMS, GraphQL, Server Actions.  
8. **Runs in Production?** Concept demo web at URL above, sha `5c489c2d1acf`, auth off, DB not_configured.  
9. **Repo vs Production?** Learning code aligned on sha; audit branch adds docs only; Staging auth flag differs.  
10. **What data stored?** Lesson/micro/literacy/review/self-check/confidence/simple-mode/coach in LS; Railway access logs UNKNOWN retention; Staging sessions if used.  
11. **Where?** Browser LS; optional cookie Staging; host logs.  
12. **Personal data?** Possible behavioral LS; emails only if Staging login used; log IPs.  
13. **External recipients?** Railway (hosting); no LLM/analytics vendors wired.  
14. **Real AI functionality?** None runtime.  
15. **Authentication?** Flag-gated; Prod off; Staging memory bootstrap path.  
16. **Authorization?** Public learn; roles not enforced on content.  
17. **Security measures?** Headers, HttpOnly cookie attrs, scrypt, feature flags, noindex; no CSP/rate limit.  
18. **Critical risks?** Mis-positioning; privacy copy drift; staging surface; no APM; LS-only progress.  
19. **DSGVO/legal open?** AVV/hosting, privacy sync, consent if cookies expand — legal review.  
20. **Tests executed & passed here?** Listed in `13` (clarity, packaging, next-step, backup, share, headers, auth policy/runtime, db runtime static, boundaries, d2b docs).  
21. **Thin test areas?** Staging login success, full Playwright, perf, pen-test, formal a11y.  
22. **Analytics?** None product.  
23. **Monetization?** None.  
24. **Affiliate?** None.  
25. **Admin/CMS?** Empty package only.  
26. **Monitoring?** Ops JSON/plaintext only.  
27. **Content completeness?** Substantial for demo (12+116+37…); not a full accredited curriculum.  
28. **Didactics?** Progressive kernweg + worlds + review + honesty UX; rule-based next-step; no adaptive ML.  
29. **Tech debt?** Vendor copies; empty packages; docs SHA drift; privacy drift; branch clutter; client SoT.  
30. **Five strongest?** Content depth; honesty culture; gates/CI discipline; ops+headers; auth/DB gated carefully.  
31. **Five weakest?** Privacy drift; no CSP/APM; LS-only; staging hardening; docs/gate instruction lag.  
32. **Blocks production readiness?** True accounts+DB+privacy/legal+monitoring+auth hardening+honest scope.  
33. **Stale/false docs?** 36 vs 38 questions; live SHA in 00; “no login”; backup key count; me endpoint myths; stale AGENTS cloud excerpt.  
34. **Still unknown?** Dashboard secrets/costs/bootstrap existence; full CI this branch; legal adequacy; CWV; pen-test.  
35. **More info for better judgment?** Railway env screenshots (redacted), staging login supervised test, Lighthouse, formal a11y, counsel memo, product analytics intent decision.

---

**STOP:** This package does not implement fixes.
