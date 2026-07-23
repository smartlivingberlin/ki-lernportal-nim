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
- den integrierten S51A-Package-Skeleton;
- das integrierte lokale S51B-B-MySQL-/Drizzle-Adapterfundament;
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

## S50B-R3-Architekturpaket – freigegeben und integriert

Das S50B-R3-Architekturpaket wurde am 17. Juli 2026 menschlich freigegeben
und am 18. Juli 2026 durch den autorisierten Squash-Merge von PR #73 unter
`cab2745c9cfea8a4d6418d866972cef6f982e55b` in `main` integriert.

Der S51A-Package-Skeleton und das lokale S51B-B-MySQL-/Drizzle-
Adapterfundament sind inzwischen ebenfalls integriert. PR #82 wurde am
23. Juli 2026 unter
`0f126ab2eb2b7a87f8a8ee85b611ec2ea410bcd5` per Squash gemergt; der
geprüfte PR-Head war
`b76d128fbe163708f4767c4ecc737d838188b0ce`.

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

Die Persistenzrichtung ist MySQL mit Drizzle. Das integrierte S51B-B-
Fundament kapselt Konfigurationsprüfung und Lazy Initialization in
`packages/db`. Es führt beim Import und in den lokalen Tests keine echte
Datenbank- oder Netzwerkverbindung aus. KI-, Retrieval- und Search-Anbieter
bleiben hinter providerneutralen Grenzen.

Nicht freigegeben sind insbesondere produktive Benutzerkonten, ein
echter Datenbank-Verbindungsnachweis, S51B-C-Tabellen und -Schemas,
`drizzle-kit`, Migrationen, Seeds, produktive KI-Laufzeit,
Railway-Staging oder Deployment.

~~~text
S50B_R3_PACKAGE_COMPLETE=YES
S50B_R3_PACKAGE_APPROVED=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
S50B_R3_INTEGRATED_TO_MAIN=YES
PR73_MERGED=YES
PR73_MERGE_METHOD=SQUASH
PR73_MERGE_COMMIT=cab2745c9cfea8a4d6418d866972cef6f982e55b
S51A_PACKAGE_SKELETON_COMPLETE=YES
S51A_INTEGRATED_TO_MAIN=YES
S51B_A_INTEGRATED_TO_MAIN=YES
S51B_B_SCOPE_LOCK_INTEGRATED_TO_MAIN=YES
PR82_MERGED=YES
PR82_MERGE_METHOD=SQUASH
PR82_MERGED_HEAD=b76d128fbe163708f4767c4ecc737d838188b0ce
PR82_MERGE_COMMIT=0f126ab2eb2b7a87f8a8ee85b611ec2ea410bcd5
PR82_PRE_MERGE_CI_RUN_NUMBER=184
PR82_PRE_MERGE_CI_CONCLUSION=SUCCESS
S51B_B_IMPLEMENTATION_INTEGRATED_TO_MAIN=YES
S51B_B_CONNECTION_PROOF_AUTHORIZED=NO
S51B_C_SCHEMA_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
MIGRATION_AUTHORIZED=NO
NEXT_PRODUCT_CODE_CHANGE_AUTHORIZED=NO
NEXT_COMMIT_AUTHORIZED=NO
NEXT_PUSH_AUTHORIZED=NO
NEXT_PR_AUTHORIZED=NO
NEXT_MERGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
PRODUCTION_AUTODEPLOY=DISABLED
PRODUCTION_CHANGED=NO
~~~

## Arbeitsregel

Kleine, nachvollziehbare Slices; klare Branches; keine Secrets; keine
Blind-Merges; keine unbeabsichtigten Kosten oder Deployments. Produktcode,
Commit, Push, PR, Merge, Datenbank- oder Railway-Änderungen benötigen jeweils
eine ausdrückliche menschliche Freigabe.
