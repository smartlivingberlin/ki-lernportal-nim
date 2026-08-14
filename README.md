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
- lokales S51B-C1/C2 Pilot-Schema und disposable MySQL-Proof (keine Live-DB);
- zwölf strukturierte Anfängerlektionen plus Themenwelten/Micro-Einheiten;
- lokalen Lernfortschritt, Klarheits-/Packaging- und „Nächster Schritt“-Vertrag;
- zwölf Übungen und 36 Selbstprüfungsfragen;
- Content-, Quellen-, Accessibility-, Governance- und Supply-Chain-Gates;
- Railway-Production-Isolation (`apps/web/vendor`, npm-Overrides) und Staging;
- einen reproduzierbaren Next.js-Standalone-Build;
- eine öffentlich erreichbare Railway-Konzeptdemo unter
  `https://web-production-51d3c8.up.railway.app`.

Noch nicht vorhanden oder nicht freigegeben sind insbesondere:

- produktive Benutzerkonten und freigeschaltete Production-Auth-Runtime;
- produktive MySQL-/Drizzle-Persistenz (Live-Verbindung, Seeds, Migrate);
- ein echtes Admin- und Publikationssystem;
- serverseitiger Lernfortschritt;
- eine produktive KI-/RAG-Laufzeit;
- bezahlte NVIDIA-NIM- oder sonstige Cloud-KI-Anbindung.

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
Production bleibt Dashboard (kein `railway.json` am Repo-Root). Root
Directory Production: `apps/web` (npm + vendored Packages unter
`apps/web/vendor`).

Isoliertes Staging-Environment `staging` ist angelegt und HTTP-grün unter
`https://ki-lernportal-nim-staging.up.railway.app` (Root `/`, Config
`/railway.staging.json`, Staging-Autodeploy disabled, Wait for CI on).
Nachweise: `docs/architecture/S51D_B_STAGING_EXECUTION.md`.

Live-Probe 2026-08-14: Production und Staging melden Build-SHA
`33fe1c6dbe48` (`/version`, nach #210 Themenwelt-Jargon; Production-Domain
`web-production-51d3c8.up.railway.app`); Ready-Check `database=not_configured`.
Teachback-Honesty (#208), Docs-Sync (#209) und Themenwelt-Jargon (#210) sind in
`main` integriert. Production-Auth und Railway-DB bleiben gesperrt.
S52-D2b: Staging `AUTH_RUNTIME` HTTP-verifiziert (Login-Formular + `401`);
Freigabe D: optionaler Staging-Memory-Seed über `STAGING_BOOTSTRAP_*`
(Hash only, keine Secrets im Repo, Production unverändert).
Production bewusst `403 FEATURE_DISABLED`.

Vor jeder weiteren Production-Änderung erneut read-only im Dashboard prüfen.

~~~text
CURRENT_PRODUCTION_AUTODEPLOY=DISABLED
CURRENT_WAIT_FOR_CI=ON
CURRENT_CONFIG_SOURCE=DASHBOARD_NO_RAILWAY_JSON
CURRENT_ROOT_DIRECTORY=apps/web
LIVE_BUILD_SHA_OBSERVED=33fe1c6dbe48
STAGING_ENVIRONMENT_CREATED=YES
STAGING_PUBLIC_DOMAIN=ki-lernportal-nim-staging.up.railway.app
STAGING_AUTODEPLOY=DISABLED
STAGING_WAIT_FOR_CI=ON
S52_D2B_STAGING_FLAG_HTTP_VERIFIED=YES
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

S51B_B_CONNECTION_PROOF_AUTHORIZED=YES
S51B_B_CONNECTION_PROOF_IMPLEMENTED=YES
HUMAN_FREIGABE_B_CONNECTION_PROOF=YES
S51B_C_SCHEMA_AUTHORIZED=YES
DATABASE_CONNECTION_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
MIGRATION_AUTHORIZED=YES_DISPOSABLE_LOCAL_ONLY
S51B_C_LOCAL_MIGRATE_HELPER=YES
HUMAN_FREIGABE_C_SCHEMA_LOCAL_MIGRATE=YES
S52_STAGING_AUTH_SEED_AUTHORIZED=YES
RAILWAY_DATABASE_PROHIBITED=YES
LIVE_MIGRATE_RAILWAY=NO
PRODUCTION_USERS=NO
LOGIN_UI=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
~~~

## Arbeitsregel

Kleine, nachvollziehbare Slices; klare Branches vom jeweils aktuellen `main`;
keine Secrets; keine Blind-Merges; keine unbeabsichtigten Kosten oder
Deployments. Produktcode, Commit, Push, PR, Merge, Datenbank-, Railway- und
Deploymentänderungen benötigen jeweils eine ausdrückliche menschliche
Freigabe.
