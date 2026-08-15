# RISK REGISTER — KI-Lernportal NIM

**Audit:** 2026-08-15 · Commit `5c489c2d1acf…`  
Wahrscheinlichkeit/Auswirkung: H/M/L — Expertenurteil, keine Statistik.

| ID | Risiko | Bereich | Wahrsch. | Auswirkung | Priorität | Beleg | Empfohlene Maßnahme |
|----|--------|---------|----------|------------|-----------|-------|---------------------|
| R1 | Stakeholder halten Concept-Demo für fertiges SaaS | Produkt/Reputation | M | H | P0 | Live Demo + leere ai/admin | Klare Positionierung; Gate vor Auth-Prod |
| R2 | Fortschrittsverlust (nur localStorage) | Produkt/UX | H | M | P1 | Progress-Code | Backup betonen; später Server-Progress nach Freigabe |
| R3 | Staging Auth kompromittiert / schwache Bootstrap-Secrets | Security | M | H | P1 | Staging Auth ON | Secret-Rotation, Rate-Limit, Zugang einschränken |
| R4 | Datenschutz-Text unvollständig vs. LS-Keys | Privacy/Recht | M | M | P1 | Datenschutz vs. Code | Liste synchronisieren; juristische Review |
| R5 | Kein Error/Uptime-Monitoring | Betrieb | H | M | P1 | Keine APM-SDK | Mindestens Uptime + Error aggregation |
| R6 | Ungeprüfte Dependency CVEs | Security | M | M | P1 | Kein frischer audit-Lauf hier | Regelmäßig `npm audit` + CI |
| R7 | Production Auth versehentlich aktiviert ohne DB/Härte | Security | L | H | P0 | Feature flags | Gates/Checks vor Flag-Flip |
| R8 | Railway/Kosten/Vendor Lock-in | Kosten/Ops | M | M | P2 | Railway Hosting | Cost alerts; Runbooks |
| R9 | Content/XSS falls unsanitized Markdown | Security | L | H | P1 | Content-Pipeline | Sanitizer-Review / CSP |
| R10 | Scope Creep (große PRs, parallele Plattform) | Technik | M | M | P2 | Viele Cursor-Branches | Kleine PRs; Freigabe-Gates |
| R11 | SEO Disallow unbeabsichtigt dauerhaft | Marketing | M | L | P2 | robots Disallow | Bewusste Index-Entscheidung |
| R12 | Fake-AI-Claims in Marketing | Recht/Reputation | M | H | P0 | ai-core empty | Nur belegte Features bewerben |
| R13 | Single maintainer / Bus factor | Betrieb | M | H | P2 | Repo-Ops | Docs-Handoff (dieser Audit) |
| R14 | Rechtliche Betriebsreife unklar | Recht | M | H | P1 | Keine Legal-Sign-off Artefakt | Anwalt: Impressum/DSGVO/AVV |

---

## Technical Debt Register

| Problem | Komponenten | Ursache | Auswirkung | Dringlichkeit | Aufwand grob | Abhängigkeiten |
|---------|-------------|---------|------------|---------------|--------------|----------------|
| Leere Packages ai-core/admin/testing | packages/* | Scaffold vor Implementierung | Verwechslung „vorhanden“ | M | — | Produktfreigaben |
| Dual Reality: Docs-Gates vs. Live-DB | docs + Railway | Bewusste Stufenfreigabe | Onboarding-Verwirrung | M | Docs | S51/S52 Gates |
| Client-State als Source of Truth | apps/web progress | MVP-Demo | Kein Sync | H für SaaS | Groß | Auth+DB |
| Viele Quality-Scripts, teure CI | scripts/, GHA | Safety culture | Langsame Iteration | L | Mittel | Priorisierung |
| Datenschutz-Keys Drift | Legal page | Feature-Zuwachs | Compliance-Lücke | H | Klein | Content-PR |
| Auth nur Staging gehärtet unvollständig | auth routes | Freigabe fehlt | Nicht prod-ready | H für Prod Auth | Groß | D-Freigaben |

---

## Single Points of Failure

| Abhängigkeit | Ausfallwirkung | Mitigation IST |
|--------------|----------------|----------------|
| Railway Hosting | Demo offline | Kein Multi-Cloud verifiziert |
| GitHub Actions | Keine CI-Gates | Manuelle Checks möglich |
| npm Registry | Build fail | Lockfile vorhanden |
| Browser localStorage | User-Daten weg | Export-Backup Feature |
| Einzelne Railway Env Secrets | Auth/Staging bricht | UNBEKANNT Ops-Prozess |
| MySQL (wenn später an) | Server-Features down | Derzeit not_configured |

**KI-/Payment-/E-Mail-Provider:** derzeit keine produktiven SPOFs (nicht angebunden).
