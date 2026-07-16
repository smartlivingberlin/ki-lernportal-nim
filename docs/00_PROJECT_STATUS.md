# Projektstatus: KI-Lernportal NIM

**Stand:** 16. Juli 2026
**Status:** S50B-R2-Dokumentationsslice in lokaler Bearbeitung
**Basis-Commit:** `4173f2d935e3145142dce539b399bf8b9d77ee79`

## Verbindliche Einordnung

Die aktuelle Architektur- und Arbeitsgrundlage steht in:

- [S50B-R2 Source of Truth](architecture/S50B_R2_SOURCE_OF_TRUTH.md)
- [Verbindliche Zielarchitektur](architecture/ARCHITECTURE_TARGET.md)
- [Package-DAG](architecture/PACKAGE_DAG.md)
- [Plattformverträge](architecture/PLATFORM_CONTRACTS.md)
- [Premium-Transfer-Ledger](architecture/PREMIUM_TRANSFER_LEDGER.md)

Bei Widersprüchen haben diese Dokumente Vorrang vor historischen Plänen,
alten Agentenprompts und früheren Backlogs.

## Nachgewiesener Istzustand

Vorhanden sind:

1. ein GitHub-Repository `smartlivingberlin/ki-lernportal-nim`;
2. eine produktionsfähig baubare Next.js-Anwendung unter `apps/web`;
3. zwölf strukturierte Anfängerlektionen;
4. lokale Suche und lokaler Lernfortschritt;
5. zwölf Übungen und 36 Selbstprüfungsfragen;
6. Content-, Quellen-, Accessibility-, Governance- und Supply-Chain-Gates;
7. ein reproduzierbarer Next.js-Standalone-Build;
8. eine öffentlich erreichbare Railway-Konzeptdemo.

## Aktuelle lokale Dokumentationsarbeit

Der lokale Branch lautet:

```text
docs/s50b-r2-source-of-truth-20260716
```

In diesem Branch werden ausschließlich Architektur- und Betriebsdokumente
ausgerichtet. Es wurden bisher weder Commit noch Push, Pull Request, Merge,
Datenbankänderung oder Deployment ausgelöst.

## Noch nicht vorhanden

Noch nicht produktiv umgesetzt oder freigegeben sind:

- MySQL-/Drizzle-Persistenz und kanonische Migrationen;
- serverseitige Benutzerkonten und widerrufbare Sessions;
- Rollen-, Scope- und Ownership-Prüfungen;
- Admin-, Review-, Publish- und Rollback-System;
- serverseitiger Lernfortschritt;
- produktive KI-/RAG-Laufzeit;
- isoliertes Railway-Staging;
- kontinuierliches Monitoring;
- Backup-/Restore-Nachweis;
- produktive Payment-, B2B- oder White-Label-Funktionen.

## GitHub- und Railway-Grenze

PR #68 ist ein separater Railway-Readiness-PR. Er ist nicht Teil dieses
Dokumentationsslices und erteilt keine Merge- oder Deployfreigabe.

Die Railway-Konzeptdemo bleibt auf dem nachgewiesenen `main`-Stand
`4173f2d935e3145142dce539b399bf8b9d77ee79`. Produktionsänderungen sind in
diesem Slice ausdrücklich ausgeschlossen.

## Nächster Zielzustand

1. aktive Dokumente vollständig auf S50B-R2 ausrichten;
2. historische Dokumente eindeutig als überholt markieren;
3. den gesamten Dokumentationsdiff read-only gegenprüfen;
4. erst danach eine gesonderte menschliche Entscheidung zu Commit und Push;
5. Produktcode erst nach ausdrücklicher Implementierungsfreigabe.

```text
PRODUCT_CODE_CHANGED=NO
COMMIT_CREATED=NO
PUSH_EXECUTED=NO
PULL_REQUEST_CREATED=NO
GITHUB_CHANGED=NO
RAILWAY_CHANGED=NO
DATABASE_CHANGED=NO
MERGE=NO
DEPLOY=NO
PRODUCTION_CHANGED=NO
```
