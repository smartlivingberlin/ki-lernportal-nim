# 18 — DOCUMENTATION CONFLICT REGISTER

| ID | Claim | Source | Actual evidence | Classification |
|----|-------|--------|-----------------|---------------|
| C1 | Practice has **36** self-check questions | README / AGENTS / prior audit | `checkQuestions` strings = **38**; checklist `selfCheck` = 36; placement quiz = 8 | CONFLICT |
| C2 | `/api/auth/me` exists | some handoff notes | only login/logout routes | CONFLICT → ABSENT |
| C3 | `packages/config` / `observability` | older architecture prose | directories missing | CONFLICT → ABSENT |
| C4 | Datenschutz: no login | `datenschutz/page.tsx` | `/anmelden` + Staging auth ON | CONFLICT |
| C5 | Datenschutz lists all LS keys | same | missing `self-check`, `lesson-confidence` | CONFLICT |
| C6 | Backup stores four progress blobs | Datenschutz copy | backup code stores **six** | CONFLICT |
| C7 | Live SHA `33fe1c6` in `00_PROJECT_STATUS` | docs | HTTP `/version` = `5c489c2d1acf` | CONFLICT (docs-sync lag) |
| C8 | Cloud `AGENTS.md` excerpt “CONNECTION_PROOF=NO / SCHEMA=NO” | stale agent cloud_instructions | repo `AGENTS.md` shows YES disposable local + later gates | CONFLICT (instruction lag) |
| C9 | “36 self-check” = placement Selbstcheck | casual speech | placement is 8 | CONFLICT naming |
| C10 | Prior forensic maturity ignore micro-units scale | prior audit emphasis | **116** micro-units + **10** worlds | PARTIAL under-count in prior narrative |
| C11 | Production autodeploy disabled | docs | dashboard not verified | UNKNOWN vs DOCS |
| C12 | AI learning portal implies AI backend | brand | no LLM runtime | NOT a code conflict — marketing risk |

## Corrections applied in this disclosure vs prior forensic package

1. checkQuestions **38** not 36.  
2. Explicit micro-units **116**, challenges **37**, worlds **10**, placement **8**.  
3. Reconfirmed no `/me`, no config/observability packages.  
4. AGENTS.md in repo is **more advanced** than stale cloud gate snippet.  
5. Backup/privacy drift severity raised.
