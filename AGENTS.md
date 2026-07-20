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

The S50B-R3 architecture package is human-approved and was integrated into
`main` through the authorized squash-merge of pull request #73 at commit
`cab2745c9cfea8a4d6418d866972cef6f982e55b`.

The S51A package skeleton and hardened package boundaries were integrated
through the authorized squash-merge of pull request #76 at commit
`4bd8abeceac7e7b6bcd3b6cf4852653a8d0942c8`.

S51B-A is the current separately gated persistence scope-lock slice.
It does not authorize a database runtime, schema, migration,
Railway change or deployment.

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

### Current architecture gate

```text
S50B_R3_PACKAGE_COMPLETE=YES
S50B_R3_PACKAGE_APPROVED=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
S50B_R3_INTEGRATED_TO_MAIN=YES
PR73_MERGED=YES
PR73_MERGE_METHOD=SQUASH
PR73_MERGE_COMMIT=cab2745c9cfea8a4d6418d866972cef6f982e55b

S51A_PACKAGE_SKELETON_COMPLETE=YES
S51A_INTEGRATED_TO_MAIN=YES
PR76_MERGED=YES
PR76_MERGE_METHOD=SQUASH
PR76_MERGE_COMMIT=4bd8abeceac7e7b6bcd3b6cf4852653a8d0942c8

S51B_A_PREFLIGHT_COMPLETE=YES
S51B_A_SCOPE_DOCUMENTED=YES
S51B_A_LOCAL_IMPLEMENTATION_AUTHORIZED=YES
S51B_B_DATABASE_RUNTIME_AUTHORIZED=NO
S51B_C_CANONICAL_SCHEMA_AUTHORIZED=NO

DATABASE_CONNECTION_AUTHORIZED=NO
MIGRATION_AUTHORIZED=NO
NEXT_COMMIT_AUTHORIZED=NO
NEXT_PUSH_AUTHORIZED=NO
NEXT_PR_AUTHORIZED=NO
NEXT_MERGE_AUTHORIZED=NO

DEPLOY_AUTHORIZED=NO
PRODUCTION_AUTODEPLOY=DISABLED
PRODUCTION_CHANGED=NO
```

Conditional examples do not override this current gate.

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
3. Read docs/architecture/S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md, docs/architecture/S51A_IMPLEMENTATION_SCOPE.md and docs/architecture/S51B_IMPLEMENTATION_SCOPE.md. Treat docs/architecture/S50B_R2_SOURCE_OF_TRUTH.md only as historical evidence.
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

1. Complete the S50B-R3 documentation integration and local audit.
2. Obtain explicit human architecture approval.
3. Obtain separate explicit S51A implementation approval.
4. Build S51A only on an approved branch.
5. Build S51B MySQL/Drizzle persistence.
6. Build S51C health, readiness, flags and redacted logs.
7. Create S51D Railway staging only after separate approval.
8. Build S52 auth, sessions, roles, scopes and ownership.
9. Build S53 content, source and media administration.
10. Build S54/S55 server-side learning functions.
11. Build S56 provider-neutral AI/RAG after evaluation.
12. Build S57 monitoring, backup, restore and incident response.

## Quality priorities

- Clarity over complexity.
- Small PRs over big rewrites.
- Tests over assumptions.
- Accessibility from the start.
- Privacy from the start.
- No fake claims.
- No accidental costs.
