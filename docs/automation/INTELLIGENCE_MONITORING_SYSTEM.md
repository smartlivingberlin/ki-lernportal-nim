# Intelligence and Monitoring System — KI-Lernportal NIM

## Zielbild

Das Portal soll langfristig nicht statisch bleiben. Es soll ein kontrolliertes Intelligenz- und Monitoring-System bekommen, das neue Entwicklungen erkennt, bewertet, zusammenfasst und für Nutzer verständlich macht.

## Wichtige Module

1. Trend Watcher:
   - KI-News,
   - Robotik,
   - Automatisierung,
   - neue Tools,
   - neue Modelle,
   - neue Bildungsbedarfe.

2. Source Watcher:
   - offizielle Herstellerdokumentation,
   - GitHub Releases,
   - Forschungsfeeds,
   - RSS-Feeds,
   - Behördeninformationen,
   - Sicherheitswarnungen.

3. Content Assistant:
   - erstellt Vorschläge für neue Lernkarten,
   - erklärt Trends in einfacher Sprache,
   - schlägt Glossarbegriffe vor,
   - erstellt Entwürfe für Admin-Prüfung.

4. Quality Monitor:
   - prüft alte Inhalte auf Aktualität,
   - markiert veraltete Quellen,
   - schlägt Aktualisierungen vor,
   - warnt vor unsicheren Aussagen.

5. Admin Review Cockpit:
   - zeigt Vorschläge,
   - zeigt Quellen,
   - zeigt Risiko,
   - erlaubt Freigabe, Ablehnung oder Überarbeitung.

## Automationsregel

Automatisierung darf vorbereiten, aber nicht unkontrolliert veröffentlichen.

Automatisch erlaubt:
- Quellen sammeln,
- Zusammenfassungen vorbereiten,
- Begriffe vorschlagen,
- Änderungen markieren,
- Trends priorisieren.

Menschliche Freigabe nötig:
- Veröffentlichung,
- rechtliche Aussagen,
- Datenschutz,
- Preise,
- Partnerangebote,
- medizinische/finanzielle/rechtliche Inhalte,
- neue externe Integrationen,
- Deployment.

## Technische Richtung

Frühe Phase:
- manuelle Quellenliste,
- Markdown-Dateien,
- lokale Daten,
- keine externen API-Schlüssel.

Spätere Phase:
- Scheduler,
- RSS Parser,
- GitHub API,
- Quellen-Datenbank,
- Admin Review UI,
- RAG-Index,
- Audit-Logs.

Noch später:
- n8n oder vergleichbare Workflow-Automation,
- Postgres,
- Qdrant,
- kontrollierte AI Provider Adapter,
- Railway Services,
- Monitoring Dashboard.

## MVP-Abgrenzung

Dieses Monitoring-System wird nicht sofort gebaut.

Zuerst:
1. Next.js-Baseline.
2. Glossar.
3. Modellkatalog.
4. Admin-Skeleton.
5. Tests.
6. Backend/API.
7. Erst danach Monitoring-Automation.
