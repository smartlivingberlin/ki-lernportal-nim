# 10 — AUTHENTICATION, AUTHORIZATION, SECURITY

## Authentication matrix

| Capability | Status | Evidence |
|------------|--------|----------|
| Login UI | PARTIAL — page exists; Prod disabled | `/anmelden`, flag |
| Login API | PARTIAL — Staging on / Prod off | HTTP probes |
| Logout API | IMPLEMENTED_NOT_RUNTIME_VERIFIED | route exists |
| Registration | ABSENT | no route |
| Session cookie `nim_session` | IMPLEMENTED_NOT_RUNTIME_VERIFIED | `session-cookie.ts` |
| Session store | Memory (`createMemorySessionStore`) | VERIFIED_CURRENT code — **not DB** |
| Password hashing | scrypt `nim-scrypt-v1` | VERIFIED_CURRENT tests PASS |
| Password reset | ABSENT | |
| Email verification | ABSENT | |
| MFA runtime | ABSENT — `roleRequiresMfa` helper only | |
| CSRF token | ABSENT explicit — SameSite=Lax cookie | PARTIAL |
| Rate limit / lockout enforcement | ABSENT in HTTP (schema columns exist unused) | |
| Account deletion product flow | ABSENT | |
| Session expiry policy | IMPLEMENTED in policy/runtime code | unit tested; live NOT TESTED |

## Authorization

| Item | Status |
|------|--------|
| Role vocabulary (Visitor, Learner, Editor, Reviewer, Admin, Owner) | VERIFIED_CURRENT `platform-roles.ts` |
| Enforced on learning content | **NO** — portal is public |
| Admin runtime flag | default false; no admin UI | ABSENT product |
| Object-level authz on lessons | ABSENT |
| Tenant isolation | ABSENT product |

### Permission matrix (effective today)

| Actor | Learn content | Mutate own LS progress | Call Prod login | Call Staging login | Admin |
|-------|---------------|------------------------|-----------------|--------------------|-------|
| Anonymous Prod | allow | allow (browser) | deny FEATURE_DISABLED | n/a | deny |
| Anonymous Staging | allow | allow | n/a | allow if valid bootstrap | deny |
| Authenticated Staging | allow (same) | allow LS only | — | — | deny (no admin) |

## Security evidence (read-only)

| Topic | Finding | Severity | Class |
|-------|---------|----------|-------|
| Security headers | HSTS, nosniff, DENY frame, referrer, permissions — live PASS s50d2 | — | VERIFIED_CURRENT |
| CSP | ABSENT | MEDIUM | VERIFIED_CURRENT absence |
| XSS via Markdown | Content is TS strings in React — lower raw HTML risk; not pen-tested | UNKNOWN residual | |
| Injection SQL | No live SQL from web | LOW today | |
| Secret in repo | Only `.env.example` placeholders | — | VERIFIED_CURRENT sample |
| Debug endpoints | Ops routes public (info disclosure low) | LOW | |
| Admin exposure | none | — | |
| Dependency audit | CI includes supply-chain — full CVE matrix this pass | UNKNOWN | NOT fully re-audited |
| Staging public + auth | surface exists | MEDIUM | VERIFIED_CURRENT URL |

**Do not claim “secure.”**
