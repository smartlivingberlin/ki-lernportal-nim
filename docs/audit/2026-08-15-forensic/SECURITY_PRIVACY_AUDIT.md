# SECURITY & PRIVACY AUDIT — KI-Lernportal NIM

**Audit:** 2026-08-15 · Commit `5c489c2d1acf…`  
**Kein Pen-Test, keine destruktiven Angriffe, keine Secrets eingesehen.**  
Klassifikation: CRITICAL / HIGH / MEDIUM / LOW / INFORMATIONAL.

---

## Security Findings (technisch)

| ID | Risiko | Severity | Status | Evidence / Hinweis |
|----|--------|----------|--------|-------------------|
| S1 | Production Auth bewusst disabled | INFORMATIONAL | VERIFIZIERT | POST login → `403 FEATURE_DISABLED` |
| S2 | Staging Auth ohne gehärteten Prod-Betrieb | MEDIUM | TEILWEISE | Runtime ON; Bootstrap-Login nicht E2E mit Secrets |
| S3 | Client-only Progress manipulierbar / verlierbar | MEDIUM (Integrität) | VERIFIZIERT | localStorage Keys im Code |
| S4 | Kein CSP Header beobachtet | LOW–MEDIUM | TEILWEISE | Header-Stichprobe / Gate s50d2 — CSP nicht als hart verifiziert |
| S5 | Ops-Endpoints öffentlich (version/ready) | LOW | VERIFIZIERT | Information Disclosure gering (SHA/env) |
| S6 | Dependency CVEs | UNBEKANNT | — | Kein frischer `npm audit` als verbindlich dokumentiert in diesem Lauf |
| S7 | Secret Leakage im Repo | LOW (positiv) | TEILWEISE | `.env.example` Platzhalter; keine Real-Keys gefunden |
| S8 | Admin-Endpunkte produktiv | INFORMATIONAL | VERIFIZIERT | `packages/admin` leer — kein Admin-API-Angriffsfläche |
| S9 | XSS über Markdown-Content | MEDIUM* | UNBEKANNT Laufzeit | Content kontrolliert im Repo; Renderer-Härtung nicht pen-getestet |
| S10 | CSRF auf Auth POST | LOW–MEDIUM | TEILWEISE | SameSite=Lax im Code; vollständiger CSRF-Review fehlt |
| S11 | Rate Limit / Brute Force Login | MEDIUM | TEILWEISE | Policy/Docs vs. harte Runtime-Limits nicht Live bewiesen |
| S12 | Kein Security-Monitoring/Sentry | MEDIUM (Betrieb) | VERIFIZIERT Abwesenheit | Keine SDK gefunden |
| S13 | Railway Staging öffentlich erreichbar | MEDIUM | VERIFIZIERT URL | Auth ON reduziert anonymen Schreibzugriff; Surface bleibt |
| S14 | Upload/Path Traversal | INFORMATIONAL | — | Keine allgemeinen User-Uploads gefunden |

\*Severity abhängig von Markdown-Sanitization — **nicht als „sicher“ behaupten**.

### Cookie / Session (Code)

- HttpOnly, Secure, SameSite=Lax — **IMPLEMENTIERT IM CODE**, Staging-Laufzeit cookie-set nicht mit Login-Success verifiziert.

### CORS

- Keine auffällige offene Cross-Origin-API für Lernfortschritt (Fortschritt clientseitig). Auth-API CORS-Detail: **nicht tief geprüft**.

---

## Privacy / DSGVO — technische Bestandsaufnahme

**Keine Rechtsberatung.**

### Nachweisbare Verarbeitung

| Daten | Wo | Zweck | Dauer | Beleg |
|-------|-----|-------|-------|-------|
| Lernfortschritt u. a. | Browser localStorage | UX Lernen | bis User löscht/Reset | Progress-Module |
| Self-Check / Confidence / Challenges … | Browser | Didaktik | lokal | Keys im Code |
| Staging Session | Cookie + Server | Auth Test | Session-Policy | packages/auth |
| Request Logs | Hosting Railway | Betrieb | UNBEKANNT Retention | Plattform |
| Analytics IDs | — | — | — | **NICHT VORHANDEN** (keine SDK) |
| KI-Prompts mit Userdaten | — | — | — | **Keine Live-KI** |

### Abweichung Doku vs. Code

Datenschutz-Seite listet laut Audit-Stichprobe **nicht alle** localStorage-Keys (u. a. self-check, lesson-confidence fehlen in der öffentlichen Liste) — **TEILWEISE VERIFIZIERT** Inkonsistenz → Transparenzrisiko.

### Vorhandene Legal-Surfaces

- Datenschutz-Seite, Impressum: **IMPLEMENTIERT** (Inhalt nicht juristisch geprüft)
- Cookie-Consent-Banner: **nicht als vollständiges CMP verifiziert**
- Export: Client-Backup JSON — **teilweise** Datenportabilität lokal
- Löschung: Reset Progress clientseitig; Account-Löschung Produkt: **nicht**
- AI-Anbieter: keine Live-Übermittlung gefunden
- Hosting Railway: potenziell AVV / Drittland — **Punkt für juristische Prüfung**

### Empfehlung an Juristen (nicht Audit-Schluss)

1. Hosting-Vertrag / AVV / TOMs Railway  
2. Vollständige Verarbeitungstätigkeiten inkl. aller LS-Keys  
3. Staging-Zugriffskontrolle & Zweckbindung Auth-Daten  
4. Ob Concept-Demo Impressumspflicht / Fernabsatz berührt  
5. KI-Marketing vs. keine Live-KI (UWG/Transparenz)

---

## AI Compliance Note

Keine Live-LLM-Inferenz → keine Modell-Logging-Pipeline gefunden.  
Zukünftige NIM/OpenAI-Anbindung: Privacy, Kosten, Guardrails — **geplant/dokumentiert, nicht implementiert**.
