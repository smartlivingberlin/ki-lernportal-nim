# PROJECT STATE HANDOFF — KI-Lernportal NIM

**Audit-Zeitpunkt:** 2026-08-15T05:50:00Z  
**Commit:** `5c489c2d1acf0d3a5e63a26f4e1a1bd9b9c3f1e0` (`main`)  
**Zweck:** Eine neue KI oder ein neues Team soll das Projekt **ohne Chat-Historie** verstehen.  
**Regel:** Evidence vor Annahme. Siehe auch `PROJECT_STATE_HANDOFF.json` und `PROJECT_AUDIT_FULL.md`.

---

## 1. Was ist das Projekt?

**KI-Lernportal NIM** ist ein **deutschsprachiges, anfängerfreundliches Lernportal** zum Thema Künstliche Intelligenz (Grundlagen, Agenten, RAG-Idee, Tools, Sicherheit, Themenwelten).  
Es läuft als **öffentliche Railway-Concept-Demo** auf Next.js — **kein** vollständiges SaaS mit produktiven Nutzerkonten, Admin-CMS oder Live-KI.

## 2. Was kann es heute?

**Nachweislich (Code + Live-HTTP wo geprüft):**

- 12 Lektionen mit Markdown, Übungs-Self-Checks (36 Fragen), Challenges, Micro-Units, Teach-Back, Spaced Review
- Lernpfade (Kernweg + Themenwelten), Glossar (~17 Einträge), Modellkatalog (statisch)
- Clientseitiger Fortschritt (`localStorage`), Export/Import/Reset, Share-Link-Kopie
- Adaptive Next-Step-Empfehlung (clientseitig, u. a. Unsicherheits-Filter)
- Ops: `/version`, `/live`, `/ready`, `/health`
- Staging-Auth-Runtime **Code** (Login/Logout/Me) — Feature-Flag; Production Auth **abgeschaltet** (`403 FEATURE_DISABLED`)
- Lokale MySQL/Drizzle-Pilot-Schema-Foundation in `packages/db` (kein Live-DB-Beweis: `/ready` → `database: not_configured`)

## 3. Was kann es noch nicht?

- Server-gespeicherter Fortschritt / Sync zwischen Geräten
- Produktive Nutzeraccounts auf Production
- Admin-Publishing / CMS
- Live AI/RAG-Antworten an Endnutzer
- Analytics, Error-Tracking, Payment
- Indexierbares SEO (`robots.txt` Disallow `/`)
- Railway-DB angebunden

## 4. Für wen ist es?

Primär: **Nicht-technische Einsteiger:innen** (Deutsch), die KI-Grundlagen verstehen wollen.  
Sekundär: Betreiber/Owner für Demo und kontrollierte Plattform-Weiterentwicklung.

## 5. Wie ist es technisch aufgebaut?

Monorepo (`npm` workspaces):

| Pfad | Rolle |
|------|--------|
| `apps/web` | Next.js 16.2.11 App (UI + Route Handlers); pnpm workspace |
| `packages/db` | MySQL/Drizzle Adapter + Pilot-Schema (lazy init) |
| `packages/auth` | Session/Password/Policy (Staging-orientiert) |
| `packages/contracts` / `domain` / `ui` | Contracts, Domain, UI-Bausteine |
| `packages/ai-core`, `admin`, `testing` | **Leere Skeletons** (`export {}`) |

Architekturziel: Modularer Next.js-Monolith (ADR-0001/0002). Package-DAG und Gates in Docs + Scripts.

## 6. Wo läuft es?

| Umgebung | URL | Status |
|----------|-----|--------|
| Production Concept Demo | https://web-production-51d3c8.up.railway.app | Live SHA = `5c489c2d1acf…`, Auth OFF |
| Staging | https://ki-lernportal-nim-staging.up.railway.app | Gleiche SHA, Auth Runtime ON (ohne geprüften Bootstrap-Login) |
| Custom Domains | — | **Nicht verifiziert** |

## 7. Welche Daten verarbeitet es?

**Browser (localStorage), kein Server-User-Store in Production:**

- `ki-lernportal-progress`, `self-check`, `lesson-confidence`, `teachback`, `challenge`, `micro-learning`, `spaced-review`, `theme-progress`

**Server Staging Auth (wenn aktiv):** Session-Cookie, Bootstrap-User nur über Env — **keine** Live-Credentials in diesem Audit genutzt.

**Personenbezug:** Technisch möglich (Browser-Daten + ggf. Staging-Login-Identifier). Keine Analytics-SDK gefunden. Hosting: Railway (AVV/Transfer: juristische Prüfung).

## 8. Welche Integrationen besitzt es?

| Integration | Status |
|-------------|--------|
| Railway Hosting | VERIFIZIERT (HTTP) |
| MySQL live | NICHT (not_configured) |
| NVIDIA NIM / OpenAI / Anthropic live | NICHT (nur `.env.example` Platzhalter) |
| Stripe / Payment | NICHT |
| PostHog / GA / Sentry | NICHT gefunden |
| E-Mail-Provider | NICHT gefunden |

## 9. Authentifizierung und Autorisierung?

| | Production | Staging |
|--|------------|---------|
| Auth Feature | OFF → 403 | ON |
| Login UI | `/anmelden` (Flag-gated) | vorhanden |
| Session APIs | nur `/api/auth/login` + `/logout` | **kein** `/api/auth/me` |
| Session Cookie | — | `HttpOnly`/`Secure`/`SameSite=Lax` (Code) |
| Rollen | Policy in `packages/auth` | Nicht auf Lerninhalte enforced |
| Passwort-Reset / MFA / Account-Löschung UI | — | **Nicht als Produktflow verifiziert** |

**Unterscheidung:** Auth = „wer bist du?“ (Staging-Session). Authz = „was darfst du?“ — **kein** produktives Scope/Ownership-System im Demo-Lernbereich.

## 10. Welche KI wird eingesetzt?

**Keine Live-KI für Lernende.**  
`packages/ai-core` ist Skeleton. UI erklärt KI-Konzepte und Modellkatalog **statisch**. `.env.example` enthält leere Provider-Keys.

## 11. Welche Risiken bestehen?

Siehe `RISK_REGISTER.md`. Top:

1. Concept-Demo vs. Produktionserwartung (Reputation)
2. Nur-clientseitiger Fortschritt (Verlust/Manipulation)
3. Staging-Auth ohne gehärteten Produktivbetrieb
4. Datenschutz-Texte vs. Code (localStorage-Keys unvollständig in Datenschutz-Seite)
5. Kein Runtime-Monitoring/Alerting

## 12. Rechtliche / DSGVO-Fragen (offen — keine Rechtsberatung)

- Railway als Host / mögliche Drittlandbezüge
- Vollständigkeit Impressum/Datenschutz vs. tatsächliche Verarbeitung
- Cookie-Banner: Session-Cookie Staging vs. Consent-UX
- KI-Transparenz: derzeit keine Live-KI, aber Marketing muss das klar halten
- AVV mit Hosting-Anbieter

→ **Punkt für juristische Prüfung.**

## 13. Wie gut ist es getestet?

- Viele **lokale Quality Gates** (Scripts) + Vitest in Packages
- Playwright E2E **lokal** (nicht als Live-Prod-E2E in diesem Audit)
- Stichprobe Gates 2026-08-15: portal-clarity, packaging-a, content-wave-c, s50d2 headers, s52-d2b docs → **PASS**
- `npm test` / Full CI: **nicht vollständig in diesem Auditlauf ausgeführt** (Zeit/CI); CI-Historie auf `main` historisch oft grün laut Docs — **UNBEKANNT für exakt diesen Commit ohne CI-Run-Lookup**

## 14. Betriebsreife?

**Niedrig für SaaS-Betrieb.** Geeignet als **öffentliche Concept-Demo** mit Ops-Basisrouten. Fehlt: APM, Alerting, Backup-Restore-Runbooks für Userdaten (es gibt kaum Server-Userdaten), Incident-Playbooks produktiv, Admin-Tools.

## 15. Monetarisierung?

**Keine implementiert.** Strategische Optionen nur in `ROADMAP_RECOMMENDATIONS.md`.

## 16. Sinnvolle nächste Schritte (Empfehlung, nicht Auftrag)

1. Docs/UI Honesty: Datenschutz-localStorage-Liste synchronisieren  
2. Explizite Freigaben für D-Plattform (DB→Auth→Server-Progress) nur nach Gate  
3. Monitoring (mindestens Uptime + Error) vor größerer Bewerbung  
4. Keine Live-KI ohne Kosten-/Privacy-Review  
5. SEO erst nach bewusster Indexierungsentscheidung (`robots`)

## 17. Nicht verifiziert

- Custom Domains, Railway-Dashboard-Kosten, exakte Staging-Secrets
- Bootstrap-Login End-to-End mit echten Credentials
- Vollständiger `npm run build` + alle Tests in diesem Lauf
- Formale WCAG-Konformität, Pen-Test, Rechtsprüfung
- Ob Production Autodeploy aktuell „Wait for CI“ aktiv ist (Docs sagen oft ja — Dashboard nicht eingesehen)

---

**Weiterlesen:** `PROJECT_AUDIT_FULL.md` · `FEATURE_INVENTORY.md` · `ARCHITECTURE.md` · `SECURITY_PRIVACY_AUDIT.md` · `RISK_REGISTER.md` · `ROADMAP_RECOMMENDATIONS.md` · `PROJECT_STATE_HANDOFF.json`
