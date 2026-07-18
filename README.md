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

## S50B-R3-Architekturpaket zur menschlichen Abnahme

Der aktuelle Architekturkandidat ist vollständig dokumentiert, aber
noch nicht menschlich freigegeben. PR #73 bleibt Draft.

Maßgeblich sind:

- [`docs/architecture/S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md`](docs/architecture/S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md)
- [`docs/architecture/S51A_IMPLEMENTATION_SCOPE.md`](docs/architecture/S51A_IMPLEMENTATION_SCOPE.md)
- [`docs/architecture/ARCHITECTURE_TARGET.md`](docs/architecture/ARCHITECTURE_TARGET.md)
- [`docs/architecture/PACKAGE_DAG.md`](docs/architecture/PACKAGE_DAG.md)
- [`docs/architecture/PLATFORM_CONTRACTS.md`](docs/architecture/PLATFORM_CONTRACTS.md).

Die acht ergänzten Verträge regeln Identität und Sessions,
Datenklassifizierung und Löschung, Learning Domain, Content- und
Assessment-Revisionen, Observability und SLOs, Organisationsgrenzen,
Jobs und Transactional Outbox sowie Search.

S50B-R2 bleibt als historische Architekturgrundlage erhalten:

- [`docs/architecture/S50B_R2_SOURCE_OF_TRUTH.md`](docs/architecture/S50B_R2_SOURCE_OF_TRUTH.md)

Die Plattform wird als modularer Next.js-Monolith geplant:

~~~text
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
~~~

Die geplante Persistenz ist MySQL mit Drizzle. KI-, Retrieval- und
Search-Anbieter bleiben hinter providerneutralen Grenzen.

Nicht freigegeben sind insbesondere Produktcode für S51A, produktive
Benutzerkonten, Datenbankänderungen, KI-Laufzeit, Railway-Staging,
Merge oder Deployment.

~~~text
S50B_R3_PACKAGE_COMPLETE=YES
S50B_R3_PACKAGE_APPROVED=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
S51A_SCOPE_DOCUMENTED=YES
S51A_SCOPE_APPROVED=NO
HUMAN_IMPLEMENTATION_APPROVAL=NO
COMMIT_AUTHORIZED=NO
PUSH_AUTHORIZED=NO
READY_FOR_REVIEW_AUTHORIZED=NO
MERGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
~~~

## Arbeitsregel

Kleine, nachvollziehbare Slices; klare Branches; keine Secrets; keine
Blind-Merges; keine unbeabsichtigten Kosten oder Deployments. Produktcode,
Commit, Push, PR, Merge, Datenbank- oder Railway-Änderungen benötigen jeweils
eine ausdrückliche menschliche Freigabe.
