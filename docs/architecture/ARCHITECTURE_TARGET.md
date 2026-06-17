# Zielarchitektur

## Hauptmodule

```text
Frontend:        Next.js + TypeScript + Tailwind
Backend/API:     FastAPI oder NestJS
AI/RAG-Service:  Python + Haystack/LangChain optional + Qdrant
Datenbank:       Postgres
Vector DB:       Qdrant
Workflow:        n8n optional lokal
Tests:           Playwright + axe + Vitest/Pytest
Security:        gitleaks + trivy + dependency checks
Deployment:      später Railway/Fly.io/VPS/Cloudflare Pages je nach Kostenlage
```

## Dienste

1. `apps/web` — Benutzerportal
2. `services/api` — Nutzer, Kurse, Admin, Auth, Einstellungen
3. `services/ai` — RAG, Modelladapter, Trend-Watcher, Glossar-Übersetzung
4. `infra/docker` — lokale Entwicklungsdienste
5. `docs` — Architektur, Product, Agentensteuerung

## Keine Kosten am Anfang

- keine Cloud-GPU
- keine produktiven API-Keys
- keine Partner-Endpunkte
- keine kostenpflichtigen Deployments
- alles lokal und private Repo
