# 16 — ANALYTICS, MONETIZATION, AFFILIATE, ADMIN, OBSERVABILITY, BACKUP

## Analytics

| Capability | Status |
|------------|--------|
| Product analytics SDK | ABSENT |
| Event funnel tracking | ABSENT |
| Error tracking (Sentry etc.) | ABSENT |
| Telemetry beyond Railway logs | UNKNOWN (platform logs) |

## Monetization (CURRENT)

**NONE.** No Stripe, checkout, paywall, subscription, ads SDK.

Strategic ideas exist in docs only → PLANNED/PROPOSED, not CURRENT.

## Affiliate

**ABSENT** tracking parameters/components. External resource links ≠ affiliate system.

## Admin / CMS / operations UI

| Item | Status |
|------|--------|
| `packages/admin` | empty skeleton |
| Content editing UI | ABSENT (content in TS in repo) |
| User management UI | ABSENT |
| Ops endpoints | `/health` `/live` `/ready` `/version` VERIFIED_CURRENT |

## Observability

| Item | Status |
|------|--------|
| Health family | YES |
| APM/metrics/alerts | ABSENT product |
| Structured app logger package | no `packages/observability` |

## Backup / recovery

| Item | Status |
|------|--------|
| User progress backup | Client JSON export/import VERIFIED_CURRENT tests |
| DB backups | N/A live (no DB) |
| Deploy rollback | Railway/GitHub operational UNKNOWN detail |
| DR runbook | docs PARTIAL |
