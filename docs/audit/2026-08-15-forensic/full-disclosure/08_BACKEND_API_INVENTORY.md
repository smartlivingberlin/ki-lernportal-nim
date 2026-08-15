# 08 — BACKEND & API INVENTORY

**Architecture:** Modular Next.js monolith — Route Handlers only. **Zero** `"use server"` Server Actions (repo-wide search).

## API register

| Method | Route | Source | Purpose | Auth | Authz | Input | Validation | Output | Storage/DB | External | Rate limit | Runtime status |
|--------|-------|--------|---------|------|-------|-------|------------|--------|------------|----------|------------|----------------|
| GET | `/health` | `app/health/route.ts` | liveness | no | — | — | — | `ok\n` | none | none | none observed | VERIFIED_CURRENT 200 |
| GET | `/live` | `app/live/route.ts` | live JSON | no | — | — | — | `{status:live}` | none | none | none | VERIFIED_CURRENT 200 |
| GET | `/ready` | `app/ready/route.ts` | readiness | no | — | — | feature/db flags | checks incl. DB | reads config only | none | none | VERIFIED_CURRENT `not_configured` |
| GET | `/version` | `app/version/route.ts` | build identity | no | — | — | — | service/version/sha/env | env | none | none | VERIFIED_CURRENT SHA |
| POST | `/api/auth/login` | `api/auth/login/route.ts` + `server/auth-http-adapter.ts` + `packages/auth` | session create | credentials | role from bootstrap | JSON email/password | required fields; password verify | ok / error codes | **memory** session store; cookie | none | **none in auth HTTP** | Prod FEATURE_DISABLED; Staging VALIDATION without body |
| POST | `/api/auth/logout` | `api/auth/logout/route.ts` | session revoke | cookie | — | cookie | session resolve | ok/error | memory | none | none | IMPLEMENTED_NOT_RUNTIME_VERIFIED |

### ABSENT APIs

GraphQL, webhooks, AI completion, progress sync, admin CRUD, `/api/auth/me`, register, password-reset, payment, analytics ingest.

## Backend functions (packages)

| Module | Purpose | Caller | Status |
|--------|---------|--------|--------|
| `packages/auth` session/password/http | Auth foundation | web adapter | VERIFIED_CURRENT unit tests PASS (sample) |
| `packages/db` initialize/pool/schema | DB foundation | CI proof/migrate scripts; **not** web request path live | Live Railway ABSENT |
| `packages/contracts` flags/ops shapes | Shared contracts | ready/version/auth | VERIFIED_CURRENT |
| `packages/domain` enums | Schema vocabulary | db schema | VERIFIED_CURRENT |
| `packages/admin|ai-core|testing` | placeholders | none | empty |

## Logging / security notes

- Auth errors return structured codes (no stack to client in happy paths) — code review PARTIAL  
- Redaction library package `observability` — **ABSENT** as package (may be inline)  
- No request rate limiter found on login — VERIFIED_CURRENT absence
