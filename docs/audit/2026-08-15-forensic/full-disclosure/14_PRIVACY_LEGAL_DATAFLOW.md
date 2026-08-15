# 14 — PRIVACY / LEGAL / DATAFLOW

**Not legal advice.** Technical inventory only.

## Data flow (CURRENT Production)

```
User browser
  → HTTPS Railway (web)
  → HTML/JS (Next)
  → localStorage (progress keys)
  → optional clipboard (share/backup file stays on device unless user shares)
  → optional mailto (Kontakt)
NO app → MySQL
NO app → LLM provider
NO app → analytics SDK
Staging-only optional: login → memory session + nim_session cookie
```

## Privacy page vs reality

| Claim (Datenschutz) | Reality | Class |
|---------------------|---------|-------|
| No login / no account | Prod auth off; Staging auth on; `/anmelden` exists | CONFLICT / PARTIAL |
| Lists 6 LS keys | Code has 8 keys (missing self-check + lesson-confidence on page) | CONFLICT |
| Backup = four progress blobs | Backup includes 6 keys | CONFLICT |
| No server learning DB | TRUE live (`not_configured`) | VERIFIED_CURRENT |
| No analytics cookies | No analytics SDK found | VERIFIED_CURRENT absence |
| Stand 12.07.2026 | Auth/staging evolved since | PARTIAL stale |

## Legal surface inventory

| Surface | Present? | Possibly required later | Juristische Prüfung |
|---------|----------|-------------------------|---------------------|
| Impressum | YES | — | recommended |
| Datenschutz | YES (drifts) | update | recommended |
| AGB/Terms | ABSENT | if paid/accounts | if launch |
| Cookie consent CMP | ABSENT | if non-essential cookies | if auth/analytics |
| AI disclosure (runtime) | n/a (no runtime AI) | if AI enabled | yes then |
| Affiliate disclosure | ABSENT | if affiliate | yes then |
| Copyright / sources | sources module + external links | — | review links |

## Hosting / AVV

Railway processes connection logs (IP etc.) — AVV / transfer assessment = **Punkt für juristische Prüfung** (UNKNOWN adequacy).
