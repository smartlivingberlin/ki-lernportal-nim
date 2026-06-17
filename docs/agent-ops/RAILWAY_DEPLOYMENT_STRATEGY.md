# Railway Deployment Strategy — KI-Lernportal NIM

## Current status

Railway is planned but not active for this project yet.

Railway CLI is available locally, but no Railway project should be created before the frontend baseline is buildable.

## Why Railway later

Railway can host the project later, but deploying too early creates noise, failed deployments and possible cost risk.

## Deployment phases

### R0 — CLI readiness

Check Railway CLI and login status only.

No project creation.

### R1 — Frontend baseline

Create a buildable Next.js application in apps/web.

Required before Railway:
- package.json,
- build command,
- start command,
- local build success.

### R2 — CI before autodeploy

Add GitHub Actions before enabling autodeploy.

Required:
- install,
- lint,
- build,
- smoke test if possible.

### R3 — Railway project creation

Only after R1 and R2.

Railway project should be separate from other portals.

Suggested project name:
ki-lernportal-nim

### R4 — Controlled first deploy

First deploy should be manual or preview-style.

No production claims.

### R5 — Autodeploy

Autodeploy may be enabled only after CI passes reliably.

Railway Wait for CI should be enabled if available.

### R6 — Backend and AI services

Add services later:
- web service,
- API service,
- AI/RAG service,
- database service,
- vector store.

No API keys before explicit approval.

### R7 — Cost control

Before public use:
- check project usage,
- configure limits where possible,
- document expected monthly cost,
- avoid always-on heavy AI workloads,
- prefer serverless/sleeping services for prototypes.
