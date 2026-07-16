# ADR-0001 – Modularer Next.js-Monolith

- **Status:** Entwurf zur menschlichen Abnahme
- **Datum:** 16. Juli 2026
- **Betrifft:** Runtime, Repositorystruktur und Deploymentgrenzen
- **Verknüpfte Source of Truth:** `../S50B_R2_SOURCE_OF_TRUTH.md`

## Kontext

Frühere Projektdokumente beschreiben FastAPI, NestJS, PostgreSQL, Qdrant,
Microservices, API-Gateway, LMS, CRM und Kubernetes als Zielarchitektur.

Der nachgewiesene aktuelle Produktstand ist dagegen eine Next.js-Anwendung
unter `apps/web`. Das Projekt wird mit begrenzten personellen und finanziellen
Ressourcen aufgebaut. Eine sofortige Aufteilung in mehrere Laufzeiten und
Dienste würde zusätzliche Authentifizierungs-, Deployment-, Monitoring-,
Fehler- und Kostenkomplexität erzeugen, bevor ein belegter Skalierungsgrund
vorliegt.

## Entscheidung

Die erste Plattformphase wird als **modularer Next.js-Monolith** aufgebaut.

```text
apps/
  web/

packages/
  ui/
  contracts/
  domain/
  db/
  auth/
  admin/
  ai-core/
  testing/
```

Die Anwendung verwendet eine Next.js-Hauptruntime. MySQL mit Drizzle ist die
geplante relationale Persistenz. KI-, Embedding-, Reranking- und
Indexanbieter werden hinter Interfaces gekapselt.

## Verbindliche Grenzen

- keine zweite Express-, FastAPI- oder NestJS-Hauptruntime in Phase 1;
- keine Microservice-, Kubernetes-, LMS-, CRM- oder ERP-Pflicht;
- keine direkte Drizzle-Nutzung außerhalb von `packages/db`;
- keine direkte Provider-SDK-Nutzung außerhalb von `packages/ai-core`;
- keine Infrastrukturabhängigkeiten in `packages/domain`;
- keine endgültige Berechtigungsentscheidung im Browser;
- keine Anbieterbindung ohne separates Architektur- und Kostengate.

## Nicht entschieden

Dieses ADR entscheidet noch nicht:

- das endgültige Datenbankschema;
- einen Authentifizierungsanbieter;
- einen KI-, Embedding- oder Reranking-Provider;
- einen Vektorindexanbieter;
- einen Storage- oder E-Mail-Anbieter;
- eine Multi-Tenant-, White-Label- oder Payment-Architektur.

Diese Fragen werden erst im jeweiligen Slice mit Sicherheits-, Datenschutz-,
Kosten- und Testnachweisen entschieden.

## Konsequenzen

### Vorteile

- eine kontrollierbare Hauptruntime;
- weniger Betriebs- und Sicherheitsgrenzen;
- kleine vertikale Slices;
- einfachere lokale und CI-Verifikation;
- geringere frühe Infrastrukturkosten;
- spätere Extraktion bleibt über Interfaces möglich.

### Nachteile und Risiken

- Paketgrenzen müssen automatisiert geprüft werden;
- lange KI- oder Importjobs können später einen Worker benötigen;
- unklare Verantwortlichkeiten könnten den Monolithen unkontrolliert koppeln;
- Skalierungsgrenzen werden erst durch reale Messwerte sichtbar.

Gegenmaßnahmen:

- dokumentierter Package-DAG;
- verbotene Importpfade als CI-Gate;
- klare Domain- und Adapterinterfaces;
- kleine PRs;
- Last-, Latenz- und Fehlerdaten vor jeder Auslagerung.

## Kriterium für eine spätere Auslagerung

Ein eigener Service oder Worker wird erst geprüft, wenn mindestens eines der
folgenden Kriterien mit Messwerten oder Sicherheitsanforderungen belegt ist:

1. Jobs überschreiten zuverlässig den HTTP-Request-Lifecycle.
2. Eine Komponente benötigt unabhängig skalierbare Rechenleistung.
3. Sicherheits- oder Datenschutzisolation ist erforderlich.
4. Ein Protokoll oder Anbieter erzwingt eine separate Runtime.
5. Releasezyklen oder Fehlerrisiken können im Monolithen nicht mehr kontrolliert
   getrennt werden.

Eine Auslagerung darf die Domainverträge nicht an Railway, Python oder einen
konkreten Provider koppeln.

## Abgelehnte aktuelle Alternative

Ein sofortiges Microservice-System mit FastAPI oder NestJS, PostgreSQL,
Qdrant, LMS, CRM und Kubernetes wird für Phase 1 abgelehnt.

Diese Technologien können später einzeln bewertet werden. Sie sind derzeit
keine Implementierungsanweisung.

## Statuswirkung

Dieses ADR ist ein Dokumentationsentwurf. Es erteilt keine Freigabe für:

- Workspace-Änderungen;
- neue Pakete;
- Datenbank oder Migrationen;
- Auth oder Admin;
- KI/RAG;
- Commit, Push oder Pull Request;
- Merge oder Deploy.
