# KI-Lernportal NIM

Barrierearmes KI-Lernportal für Menschen mit wenig oder keiner KI- und
Digitalerfahrung.

## Mission

Das Portal führt Einsteiger, ältere Nutzer, berufliche Umsteiger, Unternehmen
und Bildungseinrichtungen verständlich und motivierend an KI, digitale
Werkzeuge, Robotics, RAG, Agenten und NVIDIA-NIM-inspirierte Modellkategorien
heran.

## Nachgewiesener Stand

Dieses Repository enthält aktuell:

- eine produktionsfähig baubare Next.js-Anwendung unter `apps/web`;
- den in `main` integrierten S51A-Package-Skeleton;
- das in `main` integrierte lokale S51B-B-MySQL-/Drizzle-Adapterfundament;
- zwölf strukturierte Anfängerlektionen;
- lokale Suche und lokalen Lernfortschritt;
- zwölf Übungen und 36 Selbstprüfungsfragen;
- Content-, Quellen-, Accessibility-, Governance- und Supply-Chain-Gates;
- einen reproduzierbaren Next.js-Standalone-Build;
- eine öffentlich erreichbare Railway-Konzeptdemo.

Noch nicht vorhanden oder nicht freigegeben sind insbesondere:

- produktive Benutzerkonten;
- produktive MySQL-/Drizzle-Persistenz;
- Tabellen, Schema, Migrationen oder Seeds;
- ein echtes Admin- und Publikationssystem;
- serverseitiger Lernfortschritt;
- eine produktive KI-/RAG-Laufzeit;
- ein isoliertes Railway-Staging;
- ein freigegebener Production-Deploy-Ablauf.

Die Railway-Konzeptdemo ist kein Nachweis für vollständige Produktionsreife.

## Kanonische Status- und Architekturdokumente

Maßgeblich für den gegenwärtigen Stand sind:

- [`docs/00_PROJECT_STATUS.md`](docs/00_PROJECT_STATUS.md)
- [`docs/architecture/ARCHITECTURE_TARGET.md`](docs/architecture/ARCHITECTURE_TARGET.md)
- [`docs/architecture/PACKAGE_DAG.md`](docs/architecture/PACKAGE_DAG.md)
- [`docs/architecture/MVP_SCOPE.md`](docs/architecture/MVP_SCOPE.md)
- [`docs/architecture/S51A_IMPLEMENTATION_SCOPE.md`](docs/architecture/S51A_IMPLEMENTATION_SCOPE.md)
- [`docs/architecture/S51B_IMPLEMENTATION_SCOPE.md`](docs/architecture/S51B_IMPLEMENTATION_SCOPE.md)
- [`docs/architecture/S51B_B_IMPLEMENTATION_SCOPE.md`](docs/architecture/S51B_B_IMPLEMENTATION_SCOPE.md)
- [`docs/architecture/PLATFORM_CONTRACTS.md`](docs/architecture/PLATFORM_CONTRACTS.md)

S50B-R2 bleibt als historische Architekturgrundlage erhalten:

- [`docs/architecture/S50B_R2_SOURCE_OF_TRUTH.md`](docs/architecture/S50B_R2_SOURCE_OF_TRUTH.md)

## Architekturstand

Das S50B-R3-Architekturpaket wurde am 17. Juli 2026 menschlich freigegeben
und am 18. Juli 2026 durch den autorisierten Squash-Merge von PR #73 unter
`cab2745c9cfea8a4d6418d866972cef6f982e55b` in `main` integriert.

Die Plattform folgt dem Zielbild eines modularen Next.js-Monolithen:

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

Der S51A-Package-Skeleton ist in `main` integriert. Das lokale
S51B-B-MySQL-/Drizzle-Adapterfundament wurde durch PR #82 unter
`0f126ab2eb2b7a87f8a8ee85b611ec2ea410bcd5` per Squash gemergt. Es kapselt
Konfigurationsprüfung und Lazy Initialization in `packages/db` und führt beim
Import oder in den lokalen Fake-Tests keine echte Datenbank- oder
Netzwerkverbindung aus.

## Railway- und Produktionswahrheit

Dashboard-Reverify 2026-08-11 (menschlich): Production-Autodeploy ist
**disabled**, Wait for CI / Check Suites ist **on**. Config Source für
Production bleibt Dashboard (kein `railway.json` am Repo-Root).

Isoliertes Staging-Environment `staging` ist angelegt und HTTP-grün unter
`https://ki-lernportal-nim-staging.up.railway.app` (Root `/`, Config
`/railway.staging.json`, Staging-Autodeploy disabled, Wait for CI on).
Nachweise: `docs/architecture/S51D_B_STAGING_EXECUTION.md`.

Vor jeder weiteren Production-Änderung erneut read-only im Dashboard prüfen.

~~~text
CURRENT_PRODUCTION_AUTODEPLOY=DISABLED
CURRENT_WAIT_FOR_CI=ON
CURRENT_CONFIG_SOURCE=DASHBOARD_NO_RAILWAY_JSON
STAGING_ENVIRONMENT_CREATED=YES
STAGING_PUBLIC_DOMAIN=ki-lernportal-nim-staging.up.railway.app
STAGING_AUTODEPLOY=DISABLED
STAGING_WAIT_FOR_CI=ON
RAILWAY_REVERIFY_BEFORE_NEXT_PRODUCTION_CHANGE=REQUIRED
~~~

## Stabiler Freigabestatus

~~~text
S50B_R3_PACKAGE_COMPLETE=YES
S50B_R3_PACKAGE_APPROVED=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
S50B_R3_INTEGRATED_TO_MAIN=YES
PR73_MERGE_COMMIT=cab2745c9cfea8a4d6418d866972cef6f982e55b

S51A_PACKAGE_SKELETON_COMPLETE=YES
S51A_INTEGRATED_TO_MAIN=YES
S51B_A_INTEGRATED_TO_MAIN=YES
S51B_B_SCOPE_LOCK_INTEGRATED_TO_MAIN=YES
S51B_B_IMPLEMENTATION_INTEGRATED_TO_MAIN=YES
PR82_MERGE_COMMIT=0f126ab2eb2b7a87f8a8ee85b611ec2ea410bcd5

S51D_B_EXECUTED=YES
STAGING_ENVIRONMENT_CREATED=YES
RAILWAY_STAGING_AUTHORIZED=YES_ISOLATED_STAGING_CREATED
PRODUCTION_AUTODEPLOY=DISABLED
PRODUCTION_WAIT_FOR_CI=ON

S51B_B_CONNECTION_PROOF_AUTHORIZED=NO
S51B_C_SCHEMA_AUTHORIZED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
MIGRATION_AUTHORIZED=NO
LOGIN_UI=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
~~~

## Arbeitsregel

Kleine, nachvollziehbare Slices; klare Branches vom jeweils aktuellen `main`;
keine Secrets; keine Blind-Merges; keine unbeabsichtigten Kosten oder
Deployments. Produktcode, Commit, Push, PR, Merge, Datenbank-, Railway- und
Deploymentänderungen benötigen jeweils eine ausdrückliche menschliche
Freigabe.
