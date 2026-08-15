# 06 — COMPLETE CONTENT INVENTORY

**Source of truth:** `apps/web/src/data/*.ts` (bundled into web app).  
**No separate `content/lessons/` markdown tree** (ABSENT — prior assumptions wrong).

## Counts (re-counted 2026-08-15)

| Entity | Count | Classification | Evidence |
|--------|------:|----------------|----------|
| Kernweg lessons | **12** (`l1`–`l12`) | VERIFIED_CURRENT | `lessons.ts` |
| Practice exercises | **12** (one per lesson) | VERIFIED_CURRENT | `practice.ts` |
| Practice `checkQuestions` strings | **38** (l4 & l8 have 4; others 3) | VERIFIED_CURRENT | regex count |
| Practice `selfCheck` checklist strings | **36** (3×12) | VERIFIED_CURRENT | regex count |
| Placement Selbstcheck questions | **8** (`scq-1`…`scq-8`) | VERIFIED_CURRENT | `self-check.ts` |
| Glossary terms | **17** | VERIFIED_CURRENT | `glossary.ts` |
| Interactive challenges | **37** | VERIFIED_CURRENT | `interactive-challenges.ts` |
| Theme worlds | **10** (all `status: "active"`) | VERIFIED_CURRENT | `theme-worlds.ts` |
| Micro-units | **116** across 10 world files | VERIFIED_CURRENT | per-file `mu-` ids |
| Learning paths | **6** (1 active beginner with 12 lessons; 5 planned empty) | VERIFIED_CURRENT | `learning-paths.ts` |
| Model cards | **4** (`m1`–`m4`) | VERIFIED_CURRENT | `model-cards.ts` |
| Sources | **8** | VERIFIED_CURRENT | `sources.ts` |
| Review cards | **15** | VERIFIED_CURRENT | `review-cards.ts` |
| Literacy stations | **8** (in literacy path) | VERIFIED_CURRENT | `literacy-path.ts` |
| Help tips | large table | VERIFIED_CURRENT | `help-tips.ts` (~36KB) |
| Prompt library entries | present | VERIFIED_CURRENT | `prompt-library.ts` |
| Scam module content | present | VERIFIED_CURRENT | `scam-module.ts` |
| Learning methods | present | VERIFIED_CURRENT | `learning-methods.ts` |
| Resources | present | VERIFIED_CURRENT | `resources.ts` |
| Next-step resolver | logic module | VERIFIED_CURRENT | `next-step.ts` |

### CONFLICT vs marketing/docs “36 self-check questions”

- If “36” means practice **checklist** `selfCheck` lines → matches.  
- If “36” means practice **checkQuestions** → **FALSE** (actual **38**).  
- Placement quiz is separately **8** questions.  
→ Document as **CONFLICT / naming ambiguity**.

## Kernweg lessons (titles)

| ID | Title |
|----|-------|
| l1 | Was ist KI? |
| l2 | Was kann KI gut — und was nicht? |
| l3 | Deine erste sichere KI-Frage |
| l4 | Was ist ein Prompt? |
| l5 | Die einfache Prompt-Formel |
| l6 | E-Mails und Texte verbessern |
| l7 | Ideen sammeln, ohne blind zu übernehmen |
| l8 | Halluzinationen erkennen |
| l9 | Quellen prüfen |
| l10 | Datenschutz im Prompt |
| l11 | KI im Alltag und Beruf sinnvoll nutzen |
| l12 | Abschluss-Check: Nutze KI sicherer |

Each lesson: beginner German prose in TS fields; linked practice; progress via localStorage; optional micro-unit bridge.

## Theme worlds (IDs)

`world-no-fear`, `world-chat-prompting`, `world-research-truth`, `world-work-life`, `world-safety-law`, `world-multimodal`, `world-models`, `world-agents`, `world-vibe-coding`, `world-advanced`.

Eager vs lazy micro loading: first five worlds eager; last five dynamic `import()` — VERIFIED_CURRENT `micro-units.ts`.

## Legal / marketing / system copy

| Surface | Location | Notes |
|---------|----------|-------|
| Datenschutz | `app/datenschutz/page.tsx` | Stand 12.07.2026; incomplete LS keys |
| Impressum | `app/impressum/page.tsx` | Operator identity present |
| Kontakt | `app/kontakt/page.tsx` | mailto; no form |
| Honesty banners | many learning components | ephemeral confidence / teachback |

## Content quality / didactics (IST)

| Aspect | IST |
|--------|-----|
| Target | Non-technical German beginners |
| Progression | Kernweg 12 + worlds + literacy + review |
| Practice | Per-lesson tasks + challenges + teachback (ephemeral) |
| Feedback | Immediate MC feedback; no server grading |
| Personalization | Rule-based next-step + self-check world recommend (local) |
| Sources | Explicit source list module |
| Live AI tutoring | **ABSENT** |

Foreign third-party texts: not dumped here; structure only.
