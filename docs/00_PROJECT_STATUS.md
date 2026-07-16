# Projektstatus: KI-Lernportal NIM

**Stand:** 16. Juli 2026
**Status:** S50B-R2-Korrekturslice nach Read-only-Abnahme von Draft-PR #73
**Basis-Commit:** `4173f2d935e3145142dce539b399bf8b9d77ee79`

## Verbindliche Einordnung

Der aktuelle Architekturentwurf und die Arbeitsgrundlage stehen in:

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

## Aktueller GitHub-Stand

Der lokale und der veröffentlichte Remote-Branch lauten:

```text
docs/s50b-r2-source-of-truth-20260716
```

Der erste Dokumentationscommit
`10cc4554cda4a99ddde8264cd08eb59e641a91c3` wurde zu GitHub gepusht und als
Draft-PR #73 gegen `main` geöffnet. Der Read-only-Abnahmeaudit hat vier
Dokumentationswidersprüche festgestellt. Dieser Korrekturslice behebt nur diese
Befunde. PR #73 bleibt Draft; Merge, Datenbankänderung, Railway-Änderung und
Deployment sind nicht freigegeben.

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

1. den lokalen Korrekturcommit read-only verifizieren;
2. erst danach gesondert über einen Push zum bestehenden Draft-PR #73 entscheiden;
3. nach einem Push GitHub-CI, Dateiscope und PR-Zustand erneut prüfen;
4. PR #73 bis zur finalen menschlichen Abnahme als Draft belassen;
5. Produktcode erst nach ausdrücklicher Implementierungsfreigabe beginnen.

```text
PRODUCT_CODE_CHANGED=NO
LOCAL_CORRECTION_COMPLETED=YES
CORRECTION_COMMIT_PRESENT=YES
PUSH_EXECUTED_FOR_CORRECTION=NO
PULL_REQUEST_73_CREATED=YES
PULL_REQUEST_73_DRAFT=YES
GITHUB_CHANGED_BY_CORRECTION=NO
RAILWAY_CHANGED=NO
DATABASE_CHANGED=NO
MERGE=NO
DEPLOY=NO
PRODUCTION_CHANGED=NO
```
