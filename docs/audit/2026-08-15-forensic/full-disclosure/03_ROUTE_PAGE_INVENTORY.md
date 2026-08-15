# 03 — COMPLETE ROUTE / PAGE INVENTORY

**App Router source root:** `apps/web/src/app/`  
**Learning UX model:** Almost all learning is **one client page** `/` with **hash sections**, not per-lesson routes. Classification: VERIFIED_CURRENT.

## HTTP routes (file-backed)

| URL | Source | Layout | Purpose | Audience | Auth required | Server/Client | Data | Runtime |
|-----|--------|--------|---------|----------|---------------|---------------|------|---------|
| `/` | `app/page.tsx` | `layout.tsx` | Learning portal (hash SPA) | Learners | No | Client page | `src/data/*` + localStorage | VERIFIED_CURRENT HTTP 200 |
| `/anmelden` | `app/anmelden/page.tsx` | root | Login surface | Staging/test | Flag `AUTH_RUNTIME` | Server page + client `LoginForm` | API login | VERIFIED_CURRENT 200; form works only if flag on |
| `/impressum` | `app/impressum/page.tsx` | root | Legal imprint | All | No | Server RSC | Static | VERIFIED_CURRENT 200 |
| `/datenschutz` | `app/datenschutz/page.tsx` | root | Privacy | All | No | Server RSC | Static | VERIFIED_CURRENT 200 |
| `/kontakt` | `app/kontakt/page.tsx` | root | Contact/mailto (no form) | All | No | Server RSC | Static | VERIFIED_CURRENT 200 |
| `/robots.txt` | `app/robots.ts` | — | Disallow all | Crawlers | No | Route | — | VERIFIED_CURRENT `Disallow: /` |
| `/health` | `app/health/route.ts` | — | Liveness plaintext `ok` | Ops | No | Route | — | VERIFIED_CURRENT 200 |
| `/live` | `app/live/route.ts` | — | JSON live | Ops | No | Route | — | VERIFIED_CURRENT 200 |
| `/ready` | `app/ready/route.ts` | — | Readiness + DB check status | Ops | No | Route | flags/env | VERIFIED_CURRENT `database: not_configured` |
| `/version` | `app/version/route.ts` | — | build_sha / env | Ops | No | Route | env | VERIFIED_CURRENT SHA match |
| `POST /api/auth/login` | `app/api/auth/login/route.ts` | — | Create session | Staging | Credentials + flag | Route | memory store + cookie | Prod FEATURE_DISABLED; Staging validates |
| `POST /api/auth/logout` | `app/api/auth/logout/route.ts` | — | Revoke session | Staging | Session cookie | Route | memory | IMPLEMENTED_NOT_RUNTIME_VERIFIED (no success login in audit) |

### ABSENT routes (searched)

| Expected / claimed | Status |
|--------------------|--------|
| `/api/auth/me` | **ABSENT** (no `route.ts`) |
| `/api/auth/register` | ABSENT |
| Admin UI routes | ABSENT |
| Per-lesson `/lesson/[id]` pages | ABSENT (hash/`?lesson=` instead) |
| GraphQL | ABSENT |
| Server Actions endpoints | ABSENT (`"use server"` count = 0) |

## Hash “views” on `/` (in-page)

Source: `apps/web/src/app/page.tsx` + `lib/portal-hash-nav.ts`.

| Hash / id | Purpose | Primary components |
|-----------|---------|-------------------|
| `#lernraum` | Main column | page shell |
| `#heute` | Next-step / today | `TodayStartCard` |
| `#erststart` | First-start coach | `FirstStartCoach` |
| `#einstieg-route` | Onboarding route map | `OnboardingRoutePanel` |
| `#selbstcheck` | Placement self-check (8 Q) | `SelfCheckPanel` |
| `#literacy-pfad` | 60-min path | `LiteracyPathPanel` |
| `#weitere-pfade` | Planned/locked paths | `PlannedPathsPanel` |
| `#wiederholen` | Spaced review | `SpacedReviewQueue` |
| `#ziele` | Theme worlds | `GoalNavigation` |
| `#themenwelt` | Selected world track | `ThemeWorldTrack` |
| `#werkzeuge` | Local practice tools | `LearningWorkspaces` |
| `#prompt-bibliothek` | Prompt library | `PromptLibraryPanel` |
| `#scam` | Scam literacy | `ScamModulePanel` |
| `#methoden` | Learning methods | (page section; hidden in simple mode) |
| `#kernweg-abschluss` | After 12 lessons | `KernwegCompletePanel` |
| `#challenge` / `#szenarien` | Challenges | `InteractiveChallengeCard` |
| `#suche` | Local search | `LocalSearchPanel` |
| `#pfad` | 12-lesson kernweg | `PortalHero`, `ModuleNavigation`, `LessonWorkspace` |
| `#fortschritt-sichern` | Backup | `ProgressBackupPanel` |
| `#coach` | Safety rules | page copy |
| `#naechste` | Next CTA | Guided/Today |
| `#quellen` | Sources | Resource/source lists |
| `#glossar` | Glossary | Inline + section |
| `#modelle` | Model cards | `ModelNavigator` |
| `#reset-progress-panel` | Reset host | `ResetProgressConfirm` |

**Deep links:** `?lesson=lX` / `#lesson-lX` via `lesson-share-url.ts` — VERIFIED_CURRENT code; clipboard share PARTIAL runtime.

## Global layout / SEO defaults

`app/layout.tsx`: fonts Fraunces + Source Sans 3; metadata robots **noindex**; site chrome.

## Loading / empty / error (portal)

| Concern | Behavior | Status |
|---------|----------|--------|
| Loading | Mostly sync client render; backup import pending UI | PARTIAL |
| Empty lesson | Fallback copy in `LessonWorkspace` | VERIFIED_CURRENT code |
| Auth errors | Mapped codes in `LoginForm` | VERIFIED_CURRENT code |
| Network login fail | `NETWORK` message | VERIFIED_CURRENT code |
| Mobile | `MobileBottomNav` fixed hash nav | IMPLEMENTED_NOT_RUNTIME_VERIFIED (no device lab this pass) |
