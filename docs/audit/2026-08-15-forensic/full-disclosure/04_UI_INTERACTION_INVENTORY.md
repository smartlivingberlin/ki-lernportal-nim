# 04 — UI / INTERACTION INVENTORY

**Scope:** Consciously implemented interactive elements in `apps/web`.  
**Method:** Static code analysis of components + page wiring. Full pixel QA / every viewport click = NOT fully runtime-tested this pass.

**Learning surface:** `/` (client). **Auth surface:** `/anmelden`.

## Global chrome (on `/`)

| Element | Type | Component / locus | Trigger → Action | Mutation | Status |
|---------|------|-------------------|------------------|----------|--------|
| Brand / title | text/link | `page.tsx` / hero | Navigate home `/` | none | VERIFIED_CURRENT code |
| Legal links | links | footer areas | → `/impressum`, `/datenschutz`, `/kontakt` | none | VERIFIED_CURRENT |
| Simple mode toggle | button | `SimpleModeToggle` | toggles simple mode | `localStorage` `…:simple-mode:v1` | VERIFIED_CURRENT code |
| Help / Explain layer | overlay | `CursorExplainLayer` / `ExplainCloud` | hover/focus/click tips; pin | ephemeral React state | VERIFIED_CURRENT code |
| Mobile bottom nav | buttons | `MobileBottomNav` | `navigatePortalHash` | URL hash | VERIFIED_CURRENT code |
| Print | browser | Honesty pack | `window.print` patterns | none | PARTIAL (script gates) |

## `#heute` / next-step

| Label (DE, typical) | Type | Handler | Action | Data | Status |
|---------------------|------|---------|--------|------|--------|
| Primary CTA (dynamic) | button/link | `TodayStartCard` / Guided | hash nav to recommended section/lesson | reads progress LS | VERIFIED_CURRENT code; runtime PARTIAL |
| Coach continue/dismiss | buttons | `FirstStartCoach` | dismiss coach | `…:first-start-coach:v1` | VERIFIED_CURRENT code |

## `#selbstcheck`

| Element | Handler | Action | Data | Status |
|---------|---------|--------|------|--------|
| Option buttons per question | `setAnswer` | store answer | `…:self-check:v1` | VERIFIED_CURRENT code |
| Show recommendation | `showRecommendation` | compute world | same LS | VERIFIED_CURRENT code |
| Reset self-check | confirm panel | clear answers | LS clear | VERIFIED_CURRENT code |

## `#literacy-pfad`

| Element | Action | Data | Status |
|---------|--------|------|--------|
| Mark station done | toggle | `…:literacy-path:v1` | VERIFIED_CURRENT code |
| Reset path | confirm | clear LS | VERIFIED_CURRENT code |

## `#wiederholen` (spaced review)

| Element | Action | Data | Status |
|---------|--------|------|--------|
| Reveal answer | `setRevealed(true)` | ephemeral | VERIFIED_CURRENT code |
| Grade buttons | `answer(value)` | `…:spaced-review:v1` | VERIFIED_CURRENT code |
| Reset queue | confirm | clear LS | VERIFIED_CURRENT code |

## `#ziele` / `#themenwelt`

| Element | Action | Data | Status |
|---------|--------|------|--------|
| World tile select | `onSelectWorld` | React + scroll hash | VERIFIED_CURRENT code |
| Micro-unit complete toggle | `onToggleCompleted` | `…:micro-progress:v1` | VERIFIED_CURRENT code |
| Confidence radios | local state | **ephemeral** (honesty note) | VERIFIED_CURRENT code |
| Open linked lesson | `onOpenLesson` | lesson selection state | VERIFIED_CURRENT code |
| Show sample path | toggle | ephemeral | VERIFIED_CURRENT code |

## `#pfad` / Lesson workspace

| Element | Action | Data | Status |
|---------|--------|------|--------|
| Module lesson buttons | `onOpenLesson(id)` | selection | VERIFIED_CURRENT code |
| Erledigt / complete | `onToggleCompleted` | `…:local-progress:v1` | VERIFIED_CURRENT code |
| Noch unsicher | `onToggleUnsure` | `…:lesson-confidence:v1` | VERIFIED_CURRENT code |
| Link kopieren | `clipboard.writeText(shareUrl)` | none (clipboard) | VERIFIED_CURRENT code; clipboard success PARTIAL by browser |
| Next lesson | `onOpenLesson(next)` | selection | VERIFIED_CURRENT code |
| Practice panel answers | local UI | largely ephemeral / lesson practice UI | VERIFIED_CURRENT code |
| Challenge option choose | `choose(optionId)` | ephemeral + feedback | VERIFIED_CURRENT code |
| Challenge confidence | `setLevel` | ephemeral (honesty) | VERIFIED_CURRENT code |
| Teachback textarea | local state | **not persisted** (honesty #208) | VERIFIED_CURRENT code |

## `#fortschritt-sichern` / reset

| Element | Action | Data | Status |
|---------|--------|------|--------|
| Export backup | download JSON | reads 6 progress keys | VERIFIED_CURRENT unit test PASS |
| Import choose file | stage pending | none until confirm | VERIFIED_CURRENT code |
| Confirm import | `applyProgressBackupToStorage` | writes LS keys | VERIFIED_CURRENT test PASS |
| Cancel import | clear pending | none | VERIFIED_CURRENT code |
| Reset all progress | `ResetProgressConfirm` | clears progress keys (not simple-mode/coach) | VERIFIED_CURRENT code |

## `#prompt-bibliothek` / `#suche` / `#scam` / `#modelle` / `#glossar`

| Area | Interactions | Persistence | Status |
|------|--------------|-------------|--------|
| Prompt library | copy-to-clipboard buttons | none | VERIFIED_CURRENT code |
| Local search | text input filters client index | ephemeral | VERIFIED_CURRENT code |
| Scam module | local challenge-like UI | ephemeral / local | VERIFIED_CURRENT code |
| Model navigator | select cards | ephemeral | VERIFIED_CURRENT code |
| Glossary | expand/inline term | ephemeral | VERIFIED_CURRENT code |
| Inline glossary | click term popover | ephemeral | VERIFIED_CURRENT code |

## `/anmelden`

| Element | Action | API | Status |
|---------|--------|-----|--------|
| Email/password inputs | controlled state | — | VERIFIED_CURRENT |
| Submit | `POST /api/auth/login` | cookie if success | Prod: FEATURE_DISABLED VERIFIED; Staging success: NOT TESTED (no secrets) |
| Link back to portal | `<Link href="/">` | — | VERIFIED_CURRENT |

## Dead / non-actions

| Observation | Status |
|-------------|--------|
| No contact form submit on `/kontakt` (mailto only) | VERIFIED_CURRENT by design |
| Login page when flag off: form replaced by disabled messaging | VERIFIED_CURRENT |
| Empty `admin`/`ai-core` → no admin/AI buttons in product UI | VERIFIED_CURRENT |
| Public SVG assets in `public/` not used as primary brand | PARTIAL |

## Accessibility-relevant patterns (inventory, not certification)

- Labels on login inputs (`htmlFor`) — VERIFIED_CURRENT  
- Focus outline tokens / `focus-visible` — VERIFIED_CURRENT code  
- Hash nav focuses `#{id}-title` — VERIFIED_CURRENT `portal-hash-nav`  
- Explain layer keyboard/hover paths — VERIFIED_CURRENT code  
- Full WCAG 2.2 AA — **UNKNOWN** (smokes exist; no formal audit)
