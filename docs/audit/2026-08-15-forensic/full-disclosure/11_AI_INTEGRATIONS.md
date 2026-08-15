# 11 — AI & THIRD-PARTY INTEGRATIONS

## AI / LLM forensics

| Question | Answer | Class |
|----------|--------|-------|
| Does product call an LLM API today? | **NO** | VERIFIED_CURRENT |
| `packages/ai-core` | Empty `export {}` boundary | VERIFIED_CURRENT |
| SDKs openai/anthropic/nvidia in dependencies | **ABSENT** | VERIFIED_CURRENT `apps/web/package.json` |
| Env placeholders | `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `NVIDIA_API_KEY`, `QDRANT_URL` | names only in `.env.example` |
| RAG / embeddings / vector DB runtime | ABSENT | |
| Agents / tool calling | ABSENT | |
| Prompt library | **Static educational prompts** for users to copy — not model calls | VERIFIED_CURRENT |
| Model catalog | Static cards + external links | VERIFIED_CURRENT |
| Feature flag `ai_rag_runtime` | exists, default false | VERIFIED_CURRENT contracts |

### What AI functionality works TODAY?

**None as runtime AI.** The product **teaches about AI** with static content and local interactions.

## Third-party integration register

| Provider | Purpose | Code | Config | Data flow | PII? | Active Prod? | Lock-in / risk |
|----------|---------|------|--------|-----------|------|--------------|----------------|
| Railway | Hosting | deploy | railway JSON / dashboard UNKNOWN | HTTP logs (IP etc.) | possibly logs | YES | HIGH ops SPOF |
| GitHub Actions | CI | `ci.yml` | — | repo | no product PII | YES | MEDIUM |
| npm/pnpm registry | deps | lockfile | — | build | no | YES | MEDIUM |
| MySQL | designed DB | packages/db | DATABASE_URL | — | when used | **NO** live | — |
| Qdrant | placeholder | env example | QDRANT_URL | — | — | NO | — |
| OpenAI/Anthropic/NVIDIA | placeholder keys | env example | — | — | — | NO | — |
| Stripe/PostHog/Sentry/Resend | — | — | — | — | — | ABSENT | — |
| Fonts | Next font (Fraunces, Source Sans 3) | layout | self-hosted next/font typical | font files | low | YES | LOW |

**Affiliate URLs / referral tracking:** ABSENT (search). External educational links exist in resources/sources — not affiliate SDKs.
