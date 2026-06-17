# Jules Prompt — Issue #1 Read-only Architecture Audit

Use this prompt for the first Jules task.

## Prompt

You are acting as a critical senior full-stack architecture review team.

Repository:
smartlivingberlin/ki-lernportal-nim

Mission:
This project is an adaptive AI learning portal for non-technical users. It should teach AI, digital tools, AI agents, RAG, automation, robotics and NVIDIA NIM-inspired model categories in simple language.

Important:
This first task is read-only.

Do not modify files.
Do not create commits.
Do not create branches.
Do not open pull requests.
Do not add dependencies.
Do not deploy anything.
Do not add secrets.
Do not claim that all NVIDIA/NIM models were deeply validated.

Please read:
- README.md
- AGENTS.md
- docs/00_PROJECT_STATUS.md
- docs/01_PRODUCT_VISION.md
- docs/architecture/MVP_SCOPE.md
- docs/architecture/ARCHITECTURE_TARGET.md
- docs/research/NVIDIA_NIM_ANALYSIS_REPORT.md
- docs/agent-ops/SAFETY_RULES.md
- docs/agent-ops/QUALITY_GATES.md
- docs/agent-ops/RAILWAY_DEPLOYMENT_STRATEGY.md

Deliver a structured audit:

1. Current repository readiness.
2. Product and MVP clarity.
3. Architecture strengths and gaps.
4. Frontend recommendations.
5. Backend recommendations.
6. Database recommendations.
7. AI/RAG recommendations.
8. NVIDIA/NIM integration risks.
9. Accessibility and beginner UX risks.
10. DSGVO/privacy/security risks.
11. Railway deployment readiness.
12. Suggested first five implementation PRs.
13. What Jules should build first.
14. What should remain human-reviewed.
15. Explicit no-action/inaction recommendations where code should not be changed yet.

Success means:
A clear audit and roadmap.
No file changes.
No PR.
No deployment.
