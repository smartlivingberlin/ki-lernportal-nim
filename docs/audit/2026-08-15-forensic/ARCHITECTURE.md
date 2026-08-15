# ARCHITECTURE — KI-Lernportal NIM (IST)

**Audit:** 2026-08-15 · Commit `5c489c2d1acf0d3a5e63a26f4e1a1bd9b9c3f1e0`  
Nur Komponenten, die **tatsächlich** im Repo bzw. Live nachweisbar sind.

---

## Textuelles Diagramm (IST)

```
[Browser Lernende]
        |
        v
[Next.js App Router — apps/web]
  - RSC/SSR Seiten (Lektionen, Pfade, Glossar, Katalog)
  - Client Components (Progress, Self-Check, Challenges, Backup)
  - localStorage (Fortschritt, Confidence, Reviews, …)
        |
        +---> [Ops Route Handlers]
        |       /version  /live  /ready  /health
        |
        +---> [Auth Route Handlers]  (Staging ON / Production OFF)
        |       POST /api/auth/login
        |       POST /api/auth/logout
        |       (kein /api/auth/me)
        |            |
        |            v
        |       [packages/auth]  Session Cookie + Policy (memory store)
        |
        +---> [packages/contracts|domain|ui]
        |
        v (nur bei explizitem initialize + DATABASE_URL)
[packages/db] drizzle-orm + mysql2  →  MySQL
        |
        Live Production/Staging 2026-08-15: database = not_configured

[packages/ai-core]   EMPTY SKELETON
[packages/admin]     EMPTY SKELETON
[packages/testing]   EMPTY SKELETON

[Content] apps/web/src/data/*  (statisch im Deploy-Artefakt)

[Hosting] Railway → Node standalone Next build
[CI] GitHub Actions Quality Gates
[Package Manager] pnpm 11.13 / Node 22
```

---

## Schichten

| Schicht | Technologie | Beleg |
|---------|-------------|--------|
| Frontend | Next.js 16.2.11, React 19.2.4, TypeScript, Tailwind 4.3.3 | `apps/web/package.json` |
| Backend | Next Route Handlers im gleichen Runtime | `apps/web/src/app/api/` / ops routes |
| API | REST-ähnliche JSON-Routen (Ops + Auth login/logout) | HTTP Live |
| Datenbank | MySQL via drizzle (optional, lazy) | `packages/db` |
| Storage User Progress | Browser localStorage | Progress-Module |
| Auth | Eigene Session (`packages/auth`), Memory-Store Staging | Staging HTTP |
| AI | — | Skeleton leer |
| E-Mail / Payment / Analytics | — | nicht gefunden |
| Jobs/Queues/Cron | — | nicht gefunden |
| Hosting | Railway | Live URLs |
| CDN/DNS Custom | — | UNBEKANNT |
| CI/CD | GitHub Actions | `.github/workflows` |
| Monitoring | Ops endpoints only | kein Sentry gefunden |
| Backup User | Client Export JSON | ProgressBackupPanel |
| Package Manager | pnpm@11.13.0 | root `package.json` |

---

## Package-Grenzen (beabsichtigt)

Dokumentiert in `docs/architecture/PACKAGE_DAG.md` und ADR-0001/0002.  
Hardening: Imports zwischen Packages kontrolliert (Gates).

## Datenmodell (IST)

### Browser (kein SQL)

Keys u. a.: progress, self-check, lesson-confidence, teachback, challenge, micro-learning, spaced-review, theme-progress.

### MySQL Pilot Schema (Code in `packages/db`, Live nicht verbunden)

Typische Pilot-Entities laut Schema-Dateien (ohne Live-Daten): Users/Sessions-orientierte Tabellen für Auth-Pfad — **IMPLEMENTIERT IM CODE, NICHT LAUFZEITVERIFIZIERT auf Railway**.

Migrationen: lokal/gated; Production-Migration **nicht** als ausgeführt verifiziert (`DATABASE_CONNECTION` / Schema-Gates historisch streng).

---

## API-Inventar (wesentliche)

| Methode | Route | Zweck | Auth | Live-Check |
|---------|-------|-------|------|------------|
| GET | `/version` | Build/SHA/Env | nein | 200 SHA match |
| GET | `/live` | Liveness | nein | 200 |
| GET | `/ready` | Readiness + DB flag | nein | 200 `not_configured` |
| GET | `/health` | Health Aggregat | nein | 200 |
| POST | `/api/auth/login` | Session | Credentials | Prod 403; Staging validiert |
| POST | `/api/auth/logout` | Session clear | Session | Code vorhanden; Erfolgs-Login nicht auditiert |
| — | `/api/auth/me` | — | — | **NICHT VORHANDEN** (kein Route-Handler) |

Keine GraphQL. Keine öffentlichen AI-Endpunkte gefunden.

---

## Deployment-Architektur

- Build: Next standalone (reproduzierbar laut Docs/Gates)
- Railway Production Service + separates Staging-Service
- Autodeploy: in Projektdocs oft „Wait for CI“ — **Dashboard-Zustand UNBEKANNT in diesem Audit**
- Secrets: Railway Env (nicht eingesehen; korrekt so)

## Reproduzierbarkeit lokal

Grundsätzlich: Node + `npm install` + Content + Scripts.  
MySQL optional. Auth Staging braucht Env-Bootstrap — Details in Docs, Secrets nicht im Repo.
