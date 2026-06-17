# KI-Lernportal NIM

Adaptives, barrierearmes KI-Lernportal für Menschen mit wenig oder keiner KI-/Digital-Erfahrung.

## Mission

Das Portal soll Einsteiger, ältere Nutzer, berufliche Umsteiger, Unternehmen und Bildungseinrichtungen sanft, verständlich und motivierend in KI, digitale Werkzeuge, Robotics, RAG, Agenten und NVIDIA-NIM-inspirierte Modellkategorien einführen.

## Aktueller Stand

Dieses Repository ist ein Startpaket. Es enthält:

- statischen HTML-Prototyp: `apps/web/_prototype/portal-prototype.html`
- NVIDIA-/NIM-Analysebericht: `docs/research/NVIDIA_NIM_ANALYSIS_REPORT.md`
- Entwicklungsmappe: `docs/architecture/DEVELOPMENT_PLAN.md`
- Konzeptpräsentation: `docs/reports/ki-lernportal-konzept.pptx`
- Agenten-Briefings für Jules/Codex/Manus
- Audit- und Bootstrap-Skripte

## Nicht behaupten

Dieses Repository enthält noch kein fertiges Full-Stack-Portal. Es gibt noch kein echtes Login, keine Datenbank, kein RAG, kein echtes Adminsystem und keine produktive NVIDIA-NIM-Anbindung.

## Zielstruktur

```text
apps/web              Next.js Frontend
services/api          Backend/API
services/ai           AI/RAG/Agent-Service
infra                 Docker, Security, Deployment
scripts               Audits, Bootstrap, Smoke-Tests
docs                  Architektur, Research, Agentenbriefings, Issues
```

## Grundregel

Kleine Schritte, klare Branches, keine Secrets, keine bezahlten Dienste, keine Blind-Merges.
