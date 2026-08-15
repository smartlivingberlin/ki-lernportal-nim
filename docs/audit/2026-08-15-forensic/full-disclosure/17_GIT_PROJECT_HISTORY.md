# 17 — GIT / PROJECT HISTORY FORENSICS

**Commits on `origin/main`:** ~177 (count at audit). Not every commit listed.

## Timeline (milestones)

| Phase | Evidence (examples) | What changed |
|-------|---------------------|--------------|
| Bootstrap | `d239627` initialize baseline | repo birth |
| Frontend baseline | `e1e8041` Next.js baseline; CI `e115a24` | app skeleton |
| Premium UI / seed content | `a1c3f5b`, `a4cff86`, beginner lessons PRs | early learning UI |
| Trust/legal public layer | S41 commits | impressum/privacy direction |
| Content quality gates | PR #34+ | scripts |
| Architecture S50B-R3 → S51A packages | PR #73, #76 era (documented) | monorepo packages |
| DB adapter S51B-B | PR #82 era → later Freigabe B/C #185/#186 | drizzle/mysql local |
| Ops S51C | PR #126 area | health/ready/version |
| Staging S51D | docs + Railway staging | isolated staging |
| Auth S52 A/B/C/D | #128–#187 chain | policy → runtime → web → staging seed |
| Mass UX honesty / product-C | Aug 2026 #183–#211 | backup, share, unsure, jargon, teachback honesty |
| Docs-sync SHA loops | many `#docs(sync)` PRs | status vs live SHA |

## Direction changes

1. From “admin preview” experiments → hide internal admin from public (historical fixes).  
2. From ambitious live AI/RAG vision → **static teaching + gated empty `ai-core`**.  
3. From server platform push → **client-first progress** while DB/auth foundations land behind flags.  
4. Strong **honesty/UX** emphasis Aug 2026 (ephemeral fields, confirm dialogs).

## Removed / not shipping

- Live NIM inference (never shipped as runtime)  
- Production auth (explicitly disabled)  
- Railway DB (not configured)

## Open / audit branches

| Ref | Role |
|-----|------|
| `cursor/forensic-audit-handoff-b554` | This disclosure (docs) |
| Many `cursor/*-b554` remotes | historical agent branches (~165 remote refs) — many likely stale UNKNOWN activity |
| PR #212 | Audit docs |
| PR #107 | Dependabot pnpm action bump |

## Tags (sample)

`safety/pr22-…`, `safety/pr25-…`, … `safety/pr38-…`, `archive/pr22-…` — CI safety markers HISTORICAL.
