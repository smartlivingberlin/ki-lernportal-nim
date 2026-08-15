# 07 — USER JOURNEYS

## J1 — Anonymous learner (Production) — PRIMARY

| Step | Route/UI | Backend | Data | Auth | Errors / abort |
|------|----------|---------|------|------|----------------|
| 1 Land | `/` | none | none | guest | — |
| 2 Optional coach | `#erststart` | none | dismiss → LS coach key | guest | skip |
| 3 Optional self-check | `#selbstcheck` | none | `self-check` LS | guest | reset |
| 4 Literacy or Kernweg | `#literacy-pfad` / `#pfad` | none | progress LS | guest | leave mid-way |
| 5 Complete lesson / unsure | LessonWorkspace | none | progress + confidence LS | guest | — |
| 6 Practice / challenge | panels | none | mostly ephemeral | guest | — |
| 7 Theme worlds | `#ziele` | none | micro-progress LS | guest | — |
| 8 Spaced review | `#wiederholen` | none | review LS | guest | — |
| 9 Backup | `#fortschritt-sichern` | none | file ↔ LS | guest | cancel import |
| 10 Return later same browser | `/` | none | LS restore | guest | **dead end if cleared cookies/LS or new device without backup** |

**End state:** Local mastery marks; no server account.  
**E2E runtime:** IMPLEMENTED_NOT_RUNTIME_VERIFIED as full browser journey this pass; code+gates support.

## J2 — Share lesson link

| Step | Action | Data |
|------|--------|------|
| Open lesson | select lX | — |
| Copy link | clipboard absolute URL with lesson param/hash | none |
| Recipient opens | `/` deep-link focuses lesson | none |

Status: VERIFIED_CURRENT code + unit test PASS; clipboard OS-dependent.

## J3 — Staging auth (flag on)

| Step | Route | API | Data | Status |
|------|-------|-----|------|--------|
| Open `/anmelden` | UI | — | — | HTTP 200 |
| Submit credentials | LoginForm | POST login | Set-Cookie `nim_session` on success | Success path **NOT TESTED** (no secrets) |
| Use portal | `/` | learning still local | LS unchanged by auth | Auth does **not** gate lessons |
| Logout | POST logout | clear cookie | — | NOT TESTED success |

**Dead end:** Auth success does not sync progress to DB (DB not_configured; memory sessions).

## J4 — Production auth attempt

| Step | Result |
|------|--------|
| POST login | `403 FEATURE_DISABLED` VERIFIED_CURRENT |
| UI `/anmelden` | Explains runtime off VERIFIED_CURRENT |

## J5 — Admin / CMS / AI chat

**ABSENT** — no journey.

## Dead ends register

| Dead end | Impact |
|----------|--------|
| Device switch without backup | Progress lost |
| Teachback/challenge confidence expect persistence | Ephemeral by design (honesty) |
| Login expects cloud progress | Not implemented |
| Planned learning paths tiles | Honesty: not available yet |
| Empty packages admin/ai | No UI entry |
