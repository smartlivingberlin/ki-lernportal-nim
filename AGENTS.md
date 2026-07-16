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
- an existing Railway concept demo and separately gated future staging,
- strong quality gates.

## Current status

This repository contains a buildable Next.js concept demo and is no longer in
the early bootstrap phase.

Existing assets:
- a production-buildable Next.js application under `apps/web`,
- twelve beginner lessons,
- local search and local learning progress,
- twelve exercises with 36 self-check questions,
- content, source, accessibility, governance and supply-chain gates,
- a reproducible Next.js standalone build,
- a public Railway concept demo.

Not existing yet:
- no productive database or canonical migrations,
- no server-side user accounts or revocable sessions,
- no productive role, scope or ownership system,
- no productive admin and publishing workflow,
- no productive AI/RAG runtime,
- no isolated Railway staging,
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
3. Read docs/architecture/S50B_R2_SOURCE_OF_TRUTH.md.
4. Read docs/architecture/ARCHITECTURE_TARGET.md.
5. Read docs/architecture/adr/ADR-0001-MODULAR-NEXTJS-MONOLITH.md.
6. Read docs/architecture/adr/ADR-0002-SERVER-BOUNDARIES.md.
7. Read docs/architecture/PACKAGE_DAG.md.
8. Read docs/architecture/PLATFORM_CONTRACTS.md.
9. Read docs/architecture/PREMIUM_TRANSFER_LEDGER.md.
10. Read docs/architecture/MVP_SCOPE.md.
11. Read docs/01_PRODUCT_VISION.md.
12. Read docs/research/NVIDIA_NIM_ANALYSIS_REPORT.md.
13. Read docs/agent-ops/SAFETY_RULES.md.
14. Read docs/agent-ops/QUALITY_GATES.md.

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
- Next.js Route Handlers or Server Actions inside the single main runtime
- healthcheck endpoint
- clean API boundaries

AI/RAG:
- provider-neutral AI boundary separated from React components
- no real API keys in repo
- local/mock adapters first
- later NVIDIA NIM adapters only after cost and privacy review

Database:
- MySQL with Drizzle is planned for the persistence slice
- vector retrieval remains provider-neutral and starts only after evaluation
- no database dependency before MVP baseline

Deployment:
- Railway production hosts the concept demo; isolated staging remains a separate future gate.
- No new deployment before build, tests, CI, health contracts and explicit approval.
- Railway autodeploy should use Wait for CI when enabled.
- Cost controls must be reviewed before live usage.

## Controlled platform order

1. S50B-R2 architecture source-of-truth approval.
2. S51A workspace and package skeleton.
3. S51B MySQL/Drizzle persistence foundation.
4. S51C feature flags, health, readiness and redacted logs.
5. S51D isolated Railway staging after separate approval.
6. S52 auth, sessions, roles, scopes and ownership.
7. S53 content, source and media administration.
8. S54/S55 server-side learning progress, questions and repetition.
9. S56 provider-neutral AI/RAG behind an evaluation gate.
10. S57 monitoring, backup, restore and incident response.

## Quality priorities

- Clarity over complexity.
- Small PRs over big rewrites.
- Tests over assumptions.
- Accessibility from the start.
- Privacy from the start.
- No fake claims.
- No accidental costs.
