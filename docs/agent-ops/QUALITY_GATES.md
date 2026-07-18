# Quality Gates — KI-Lernportal NIM

## Purpose

This document defines mandatory gates before agent-created work is accepted.

## Current S50B-R3 gate

- [`S50B-R3 approval package`](../architecture/S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md)
- [`S51A scope`](../architecture/S51A_IMPLEMENTATION_SCOPE.md)

S50B-R2 is historical evidence.

```text
S50B_R3_PACKAGE_APPROVED=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
S51A_SCOPE_APPROVED=NO
S51A_IMPLEMENTATION_AUTHORIZED=NO
```

## Gate 0 — Read-only first

Before code work:
- repository status must be clean,
- relevant docs must be read,
- scope must be clear,
- no secrets must be introduced.

## Gate 1 — Small branch

Every implementation task should use a dedicated branch.

Examples:
- feature/nextjs-baseline
- feature/model-catalog
- feature/onboarding-flow
- test/playwright-accessibility
- feature/platform-healthcheck-contract

## Gate 2 — Small PR

A PR should have:
- clear title,
- clear summary,
- changed files list,
- test instructions,
- risks and limits,
- no unrelated changes.

## Gate 3 — Local verification

Before review:
- install step documented,
- build command documented,
- lint/test command documented,
- no secrets committed,
- no accidental deploy.

## Gate 4 — Human review

Human review is required for:
- dependency changes,
- auth,
- payments,
- database,
- AI provider integration,
- Railway deployment,
- tracking/analytics,
- DSGVO/privacy statements,
- public claims about NVIDIA/NIM models.

## Gate 5 — Deployment readiness

Railway deployment is allowed only after:
- frontend builds locally,
- at least one CI workflow exists,
- basic tests pass,
- healthcheck exists for backend services,
- environment variables are documented,
- cost control strategy is reviewed,
- autodeploy strategy is clear.

## Agent rules

Agents may suggest.
Agents may create branches and PRs when explicitly asked.
Agents may not merge.
Agents may not deploy.
Agents may not add real secrets.
Agents may not make legal or compliance claims as final truth.
