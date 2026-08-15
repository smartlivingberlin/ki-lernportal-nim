# ROADMAP RECOMMENDATIONS — KI-Lernportal NIM

**Audit:** 2026-08-15 · **Keine automatische Umsetzung.**  
Trennung: IST vs. empfohlene nächste Schritte.

---

## P0 — kritisch (vor „echtem“ Nutzerversprechen / Prod-Auth)

1. **Wahrheitsgemäße Positionierung** in allen öffentlichen Texten: Concept-Demo, keine Live-KI, kein Cloud-Account auf Production.  
2. **Production Auth nicht aktivieren** ohne DB, Session-Härte, Rate-Limit, Monitoring, juristische Klärung.  
3. **Keine KI-/SaaS-Marketingclaims** ohne Implementierungsnachweis.

## P1 — wichtig vor größerer Öffentlichkeitsnutzung

1. Datenschutz-Seite: alle localStorage-Keys + Zwecke listen.  
2. Staging-Auth härten (Secrets, Brute-Force, Zugriff).  
3. Minimales Monitoring (Uptime `/live`, Error logs).  
4. Dependency/Security-Scan in CI verbindlich auswerten.  
5. Markdown/XSS- und Header-(CSP)-Review.  
6. Juristische Prüfung Impressum/DSGVO/AVV Railway.

## P2 — Verbesserungen

1. Didaktik: Spaced Review / Unsicherheitsfluss UX-Feinschliff.  
2. Backup-Restore Discoverability.  
3. Performance-Budgets / Bundle-Analyse messen (nicht schätzen).  
4. Accessibility: gezielte manuelle + axe-Läufe dokumentieren.  
5. robots/SEO bewusst öffnen **oder** klar „noindex Demo“ belassen.

## P3 — Zukunft (nur nach expliziter Freigabe laut Projektgates)

1. D2 Auth→DB · D3 Server Progress · D4 Admin · D5 AI/RAG · D6 Production Auth  
2. Isolierte Staging-DB mit Migrationsfreigabe  
3. Provider-neutrale AI mit Kosten-/Privacy-Review  
4. Rollen/Scopes/Ownership (S52+)  
5. Monetarisierungsmodell (Subscription/B2B) — **derzeit nicht implementiert**

---

## Quick Wins (hohe Wirkung, geringes Risiko, **nicht implementiert in diesem Audit**)

| Win | Wirkung | Risiko |
|-----|---------|--------|
| Datenschutz-Keys sync | Transparenz | sehr niedrig |
| Hero/Footer Disclaimer „Concept-Demo / Daten nur im Browser“ | Erwartung | niedrig |
| `/ready` DB-Status in Ops-Docs für Handoff verlinken | Klarheit | keines |
| Staging Auth „Test only“ Banner | Security UX | niedrig |
| Evidence-Link zu diesem Audit-Ordner in README (1 Zeile) | Onboarding | niedrig |

---

## Monetarisierungsoptionen (STRATEGIE, nicht IST)

- Freemium Lernportal + B2B Lizenzen für Bildungsträger  
- Workshop/Content-Upsell  
- Später: API/RAG als Premium — **erst nach Privacy/Cost**  

**Heute implementiert:** keine Zahlung, keine Paywall.

## Affiliate / Partnerschaften

**IST:** keine Affiliate-Tracking-Integration gefunden.  
**SOLL (Strategie):** NVIDIA/Bildungs-Partner nur mit Kennzeichnung & Vertrag — nicht als vorhanden darstellen.

---

## Empfohlene Reihenfolge (kontrolliert)

```
Honesty/Legal sync (P0/P1)
    → Monitoring minimal
    → (Freigabe) DB connection proof
    → (Freigabe) Auth+DB
    → (Freigabe) Server progress
    → Admin / AI nur danach
```

Abweichung von `AGENTS.md` Controlled Platform Order vermeiden.
