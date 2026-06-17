# AGENTS.md — KI-Lernportal NIM

This repository is the controlled development base for "KI-Lernportal NIM", an adaptive AI learning portal for non-technical users.

## Mission

Build a beginner-friendly, accessible, DSGVO-aware AI learning portal that helps users understand AI, digital tools, AI agents, RAG, automation, robotics and NVIDIA NIM-inspired model categories.

The portal should support:
- simple language for beginners,
- adaptive learning paths,
- glossary and jargon translation,
- model catalog exploration,
- admin/owner dashboard,
- AI/RAG-assisted learning,
- safe automation,
- future Railway deployment,
- strong quality gates.

## Current status

This repository is in early bootstrap phase.

Existing assets:
- static HTML prototype,
- NVIDIA/NIM analysis report,
- development plan,
- presentation artifact,
- agent operation docs,
- initial GitHub issues.

Not existing yet:
- no production frontend,
- no backend,
- no database,
- no real RAG service,
- no authentication,
- no NVIDIA API integration,
- no Railway deployment,
- no production users.

## Hard safety rules

Do not commit secrets.
Do not create or modify real .env files with real values.
Do not add API keys.
Do not add paid cloud dependencies without explicit human approval.
Do not deploy to Railway unless explicitly asked.
Do not enable autodeploy unless CI, tests, healthcheck and cost controls are documented.
Do not claim that all NVIDIA/NIM models have been deeply validated.
Do not modify generated history or force-push.
Do not create large all-in-one PRs.
Do not merge PRs.
Do not change repository visibility.
Do not add tracking, analytics, payment or auth providers without explicit approval.

## Working style

Before modifying code:
1. Read README.md.
2. Read docs/00_PROJECT_STATUS.md.
3. Read docs/01_PRODUCT_VISION.md.
4. Read docs/architecture/MVP_SCOPE.md.
5. Read docs/architecture/ARCHITECTURE_TARGET.md.
6. Read docs/research/NVIDIA_NIM_ANALYSIS_REPORT.md.
7. Read docs/agent-ops/SAFETY_RULES.md.
8. Read docs/agent-ops/QUALITY_GATES.md.

For audit tasks:
- Do not modify files.
- Do not create commits.
- Do not open PRs.
- Produce structured findings and recommendations only.

For implementation tasks:
- Use a new branch.
- Keep changes small.
- Explain every changed file.
- Add or update tests when meaningful.
- Provide local verification commands.
- Keep beginner-friendly UX and accessibility in mind.

## Preferred architecture direction

Frontend:
- Next.js
- TypeScript
- accessible components
- responsive design
- beginner-friendly German UX copy

Backend:
- FastAPI or comparable lightweight API service
- healthcheck endpoint
- clean API boundaries

AI/RAG:
- service layer separated from frontend
- no real API keys in repo
- local/mock adapters first
- later NVIDIA NIM adapters only after cost and privacy review

Database:
- Postgres planned later
- Qdrant or comparable vector store planned later
- no database dependency before MVP baseline

Deployment:
- Railway is planned later.
- No deployment before build, tests, CI and healthcheck exist.
- Railway autodeploy should use Wait for CI when enabled.
- Cost controls must be reviewed before live usage.

## MVP order

1. Architecture audit.
2. Next.js frontend baseline.
3. Static prototype converted into components.
4. Beginner onboarding.
5. Model catalog data layer.
6. Glossary and jargon translator UI.
7. Admin dashboard skeleton.
8. Playwright and accessibility tests.
9. FastAPI backend skeleton.
10. AI/RAG service skeleton.

## Quality priorities

- Clarity over complexity.
- Small PRs over big rewrites.
- Tests over assumptions.
- Accessibility from the start.
- Privacy from the start.
- No fake claims.
- No accidental costs.
