# Railway-Deployment-Strategie – KI-Lernportal NIM

**Status:** In S50B-R3 architektonisch freigegeben; Deploymentfreigabe ausstehend
**Stand:** 17. Juli 2026
**Wirkung:** Dokumentation; keine Railway-, Merge- oder Deploymentfreigabe

## 1. Verbindliche Grundlagen

Diese Strategie ist nachrangig zu:

- [`../architecture/S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md`](../architecture/S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md)
- [`../architecture/S51A_IMPLEMENTATION_SCOPE.md`](../architecture/S51A_IMPLEMENTATION_SCOPE.md)
- [`../architecture/ARCHITECTURE_TARGET.md`](../architecture/ARCHITECTURE_TARGET.md)
- [`../architecture/PLATFORM_CONTRACTS.md`](../architecture/PLATFORM_CONTRACTS.md)
- [`../architecture/MVP_SCOPE.md`](../architecture/MVP_SCOPE.md)
- [`../architecture/OBSERVABILITY_SLO_CONTRACT.md`](../architecture/OBSERVABILITY_SLO_CONTRACT.md)
- [`QUALITY_GATES.md`](QUALITY_GATES.md)

[`../architecture/S50B_R2_SOURCE_OF_TRUTH.md`](../architecture/S50B_R2_SOURCE_OF_TRUTH.md) bleibt historische Grundlage.

Bei aktuellen Architektur- oder Freigabewidersprüchen hat das S50B-R3-Freigabepaket Vorrang.

## 2. Nachgewiesener Iststand

Zum Stand 16. Juli 2026 gilt:

- Das GitHub-Repository ist `smartlivingberlin/ki-lernportal-nim`.
- Railway wird bereits für eine Produktions-Konzeptdemo verwendet.
- Die dort laufende Revision basiert weiterhin auf `main` mit SHA
  `4173f2d935e3145142dce539b399bf8b9d77ee79`.
- Der dokumentierte `/health`-Aufruf liefert auf diesem Stand `404`.
- PR #68 ist ein separater, offener Draft-PR für Railway Readiness.
- PR #68 ist nicht gemergt.
- Ein isoliertes Railway-Staging für die neue Plattformarchitektur ist noch
  nicht freigegeben oder erstellt.
- Die S50B-R3-Dokumentationsintegration verändert Railway nicht.

Der Produktionsstand ist deshalb weder als vollständige Plattform noch als
Beweis für Backend-, Datenbank-, Auth-, AI- oder RAG-Funktionalität zu werten.

## 3. Zielbild

Die Plattform bleibt zunächst ein modularer Next.js-Monolith:

```text
Railway-Projekt
└── Next.js-Webservice
    ├── öffentliche Seiten
    ├── Route Handlers / Server Actions
    ├── Health- und Readiness-Endpunkte
    └── interne Package-Grenzen
```

Spätere ergänzende Railway-Dienste sind nur zulässig, wenn ein konkreter,
begründeter Bedarf nachgewiesen wurde. Microservices sind kein automatisches
Ziel.

## 4. Umgebungsmodell

### 4.1 Production

Die bestehende Produktions-Konzeptdemo bleibt unverändert, bis eine getrennte
menschliche Freigabe für eine konkrete Änderung vorliegt.

Für Production gilt:

- kein Testen neuer Migrationen;
- keine experimentellen Secrets;
- keine ungeprüften Provider;
- keine automatische Übernahme von Dokumentationsbranches;
- kein Merge oder Deploy als Nebenwirkung eines Audits;
- keine öffentlichen Claims, die der Runtime-Stand nicht belegt.

### 4.2 Isoliertes Staging

Ein neues Staging ist frühestens in S51D vorgesehen und benötigt vorher:

1. ausdrückliche menschliche Freigabe;
2. geprüften Workspace- und Package-Skeleton;
3. lokal erfolgreichen Build;
4. dokumentierte Start- und Healthcheck-Verträge;
5. bestandene CI- und Secret-Gates;
6. getrennte Variablen und Daten;
7. Kosten- und Löschplan;
8. bestätigte Trennung von Production.

Staging darf keine produktiven Daten, Secrets oder Datenbankkopien übernehmen.

### 4.3 Preview-Umgebungen

Preview-Deployments sind nicht automatisch freigegeben. Vor Aktivierung müssen
Kosten, Secret-Zugriff, Datenhaltung, Aufräumregeln und Zugriffsschutz geprüft
werden.

## 5. Health-, Readiness- und Startverträge

Der Zielvertrag für den Next.js-Webservice umfasst mindestens:

- einen dokumentierten Startbefehl;
- Bindung an den von Railway bereitgestellten Port;
- einen liveness-orientierten Health-Endpunkt;
- einen getrennt bewertbaren Readiness-Zustand;
- sichere Antworten ohne Secrets oder interne Fehlermeldungen;
- sinnvolle HTTP-Statuscodes;
- automatisierte Tests der Endpunkte.

Ein `200`-Healthcheck darf nicht vortäuschen, dass optionale oder noch nicht
freigegebene Subsysteme bereits produktiv sind.

Der aktuelle `/health`-Status der Produktions-Konzeptdemo bleibt ein bekannter
Istbefund und ist keine Berechtigung, PR #68 zu mergen.

## 6. Datenbank und Migrationen

Für den geplanten Persistenz-Slice gilt MySQL mit Drizzle.

Vor jedem späteren Railway-Datenbankeinsatz sind erforderlich:

- kanonische, versionierte Migrationen;
- eindeutige Umgebungszuordnung;
- keine dynamische DDL aus Request-Pfaden;
- keine stillen Schema-Fallbacks;
- Rollback- oder Wiederherstellungsplan;
- Backup- und Restore-Nachweis vor kritischen Änderungen;
- keine Nutzung produktiver Dumps in Staging;
- ausdrückliche Freigabe für jede produktive Migration.

## 7. Secrets und Konfiguration

Verbindliche Regeln:

- keine echten Secrets im Repository;
- keine Secrets in Logs, Screenshots oder Dokumenten;
- getrennte Werte je Umgebung;
- minimale Berechtigungen;
- Provider erst nach Datenschutz-, Kosten- und Zweckprüfung;
- Rotation bei vermuteter Offenlegung;
- keine automatische Übernahme von Premium-Portal-Konfigurationen.

## 8. CI-, Merge- und Deploy-Gates

Vor einem späteren Deployment müssen mindestens bestehen:

- reproduzierbare Installation;
- Format-, Lint-, Typ- und Build-Prüfung;
- relevante Unit- und Integrationstests;
- Smoke-Test der Zielruntime;
- Secret- und Abhängigkeitsprüfung;
- dokumentierte Environment-Variablen;
- nachvollziehbarer Diff;
- menschliche Review-Freigabe.

Zusätzlich gilt:

```text
Dokumentation abgeschlossen ≠ Commit freigegeben
Commit erstellt ≠ Push freigegeben
Push erfolgt ≠ PR freigegeben
PR grün ≠ Merge freigegeben
Merge erfolgt ≠ Deploy freigegeben
Deploy erfolgreich ≠ Production-Abnahme
```

Wait for CI darf erst nach stabiler CI-Konfiguration aktiviert werden.

## 9. Kosten- und Betriebsgrenzen

Vor jeder neuen Railway-Ressource sind zu dokumentieren:

- Zweck;
- erwartete Laufzeit;
- geschätzte monatliche Kosten;
- Schlaf-, Skalierungs- oder Abschaltverhalten;
- Verantwortlicher;
- Löschkriterium;
- Alarmierungsbedarf;
- Daten- und Secret-Scope.

Dauerhaft laufende AI-, Worker- oder Vektor-Dienste sind ohne gesonderte
Begründung und Freigabe ausgeschlossen.

## 10. Beobachtbarkeit und Fehlerbehandlung

Spätere Runtime-Arbeit muss mindestens berücksichtigen:

- strukturierte, datensparsame Logs;
- Request- oder Korrelationskennung;
- keine personenbezogenen Inhalte als Standardlog;
- keine Secrets;
- sichere Fehlerantworten;
- erkennbare Start- und Shutdown-Probleme;
- dokumentierte Diagnosewege;
- klare Trennung zwischen Health, Readiness und Produktfunktion.

## 11. PR #68

PR #68 bleibt von S50B-R3 getrennt.

S50B-R3:

- prüft und korrigiert Dokumentation;
- mergt PR #68 nicht;
- verändert dessen Branch nicht;
- löst keinen Deploy aus;
- übernimmt keinen ungeprüften Code daraus.

Eine spätere Entscheidung zu PR #68 benötigt eine eigene technische Review und
eine eigene menschliche Freigabe.

## 12. Freigabestatus

```text
S50B_R3_PACKAGE_APPROVED=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
RAILWAY_STRATEGY_REVIEWED=NO
S51D_STAGING_APPROVED=NO
PR68_MERGE_APPROVED=NO
RAILWAY_CHANGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
```

Bis diese Zustände für einen klar begrenzten Arbeitsschritt ausdrücklich
geändert wurden, bleibt diese Datei reine Dokumentation.
