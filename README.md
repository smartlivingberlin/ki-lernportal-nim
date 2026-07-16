# KI-Lernportal NIM

Adaptives, barrierearmes KI-Lernportal für Menschen mit wenig oder keiner
KI-/Digital-Erfahrung.

## Mission

Das Portal führt Einsteiger, ältere Nutzer, berufliche Umsteiger, Unternehmen
und Bildungseinrichtungen verständlich und motivierend an KI, digitale
Werkzeuge, Robotics, RAG, Agenten und NVIDIA-NIM-inspirierte Modellkategorien
heran.

## Nachgewiesener Stand

Dieses Repository enthält aktuell:

- eine produktionsfähig baubare Next.js-Anwendung unter `apps/web`;
- zwölf strukturierte Anfängerlektionen;
- lokale Suche und lokalen Lernfortschritt;
- zwölf Übungen und 36 Selbstprüfungsfragen;
- Content-, Quellen-, Accessibility-, Governance- und Supply-Chain-Gates;
- einen reproduzierbaren Next.js-Standalone-Build;
- eine öffentlich erreichbare Railway-Konzeptdemo.

Noch nicht vorhanden sind produktive Benutzerkonten, eine produktive
Datenbank, ein echtes Admin- und Publikationssystem sowie eine produktive
KI-/RAG-Laufzeit. Die Railway-Konzeptdemo ist kein Nachweis für vollständige
Produktionsreife.

## Architekturentwurf zur finalen Abnahme

Der aktuelle, noch nicht final freigegebene Source-of-Truth-Kandidat ist:

- [`docs/architecture/S50B_R2_SOURCE_OF_TRUTH.md`](docs/architecture/S50B_R2_SOURCE_OF_TRUTH.md)
- [`docs/architecture/ARCHITECTURE_TARGET.md`](docs/architecture/ARCHITECTURE_TARGET.md)
- [`docs/architecture/PACKAGE_DAG.md`](docs/architecture/PACKAGE_DAG.md)
- [`docs/architecture/PLATFORM_CONTRACTS.md`](docs/architecture/PLATFORM_CONTRACTS.md)
- [`docs/architecture/PREMIUM_TRANSFER_LEDGER.md`](docs/architecture/PREMIUM_TRANSFER_LEDGER.md)

Die Plattform wird als modularer Next.js-Monolith aufgebaut:

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

Die geplante Persistenz ist MySQL mit Drizzle. KI- und Retrieval-Anbieter
bleiben hinter providerneutralen Grenzen. Eine zweite separate Hauptruntime
sowie verpflichtende externe Plattformdienste, LMS, CRM oder ERP gehören
nicht zur ersten Plattformphase.

## Arbeitsregel

Kleine, nachvollziehbare Slices; klare Branches; keine Secrets; keine
Blind-Merges; keine unbeabsichtigten Kosten oder Deployments. Produktcode,
Commit, Push, PR, Merge, Datenbank- oder Railway-Änderungen benötigen jeweils
eine ausdrückliche menschliche Freigabe.
