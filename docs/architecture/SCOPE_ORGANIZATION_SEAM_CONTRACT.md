# Scope and Organization Seam Contract

**Status:** In S50B-R3 menschlich beschlossen; Implementierungs- und externe Aktionsfreigaben ausstehend
**Stand:** 17. Juli 2026
**Geltungsbereich:** Einzelplattform, Ownership, Scopes, spätere
Organisationsgrenzen und Schutz vor versehentlicher Mandantenkopplung

## 1. Entscheidung

Die erste produktive NIM-Plattform bleibt ein Einzelplattform-Produkt.

Nicht Bestandteil von S51A oder des ersten Konto-Slices sind:

- vollständige B2B-Mandantenfähigkeit;
- White Label;
- kundeneigene Adminbereiche;
- organisationsbezogene Abrechnung;
- organisationsbezogene Markenanpassung;
- delegierte Tenant-Owner;
- mandantenspezifische KI-Provider.

Die Architektur darf eine spätere Organisationsgrenze jedoch nicht unmöglich
machen.

## 2. Grundbegriffe

Die fachliche Berechtigungsentscheidung kann verwenden:

~~~text
scope_type
scope_id
owner_user_id
organization_id
role_assignment
permission
resource_policy
~~~

Nicht jede Tabelle benötigt alle Felder.

Eine Objekt-ID ist niemals ein Berechtigungsnachweis.

## 3. Vorgesehene Scope-Typen

Mögliche fachliche Scope-Typen:

~~~text
public
user
platform
organization
~~~

Nur für freigegebene Funktionen benötigte Typen werden tatsächlich persistiert.

Das bloße Vorhandensein eines Enum-Werts aktiviert keine B2B-Funktion.

## 4. Erste Produktphase

In der ersten Produktphase gelten:

- veröffentlichte Inhalte gehören zum öffentlichen Plattform-Scope;
- Lernfortschritt gehört dem jeweiligen Lernenden;
- Entwürfe gehören zum internen redaktionellen Plattform-Scope;
- Admin und Owner arbeiten im Plattform-Scope;
- Nutzer können keine Organisationen anlegen;
- Nutzer können keine Organisationsmitglieder einladen;
- keine Organisation besitzt eigene Preise oder Verträge im System;
- keine Organisation besitzt eigene öffentliche Domain oder Branding;
- keine Organisation besitzt eigene KI- oder Search-Konfiguration.

## 5. Ownership

Ownership beschreibt, welchem Nutzer oder fachlichen Scope eine Ressource
zugeordnet ist.

Beispiele:

| Ressource | Ownership |
|---|---|
| Lernfortschritt | Lernender |
| Practice Attempt | Lernender |
| Assessment Attempt | Lernender |
| persönliche Exportanforderung | Lernender |
| öffentliche Lektionsrevision | Plattform |
| interner Content Draft | Plattform-Redaktion |
| Sicherheitsereignis | Plattform-Security-Scope |
| Feature Flag | Plattform oder später ausdrücklich definierter Scope |

Ownership ersetzt keine Rollen- oder Permission-Prüfung.

## 6. Autorisierungsreihenfolge

Jede geschützte Operation folgt mindestens:

~~~text
authentifizieren
-> aktuelle Rollen und Scopes laden
-> angeforderten Scope bestimmen
-> Scope-Mitgliedschaft prüfen
-> Ressourcen-Ownership oder Permission prüfen
-> Domain Policy ausführen
-> Ergebnis auditieren, wenn erforderlich
~~~

Eine UI-Prüfung ist nur Komfort und keine abschließende Autorisierung.

## 7. Listen- und Detailabfragen

Listenabfragen filtern bereits im Repository nach zulässigem Scope.

Detailabfragen prüfen zusätzlich:

- konkrete Ressource;
- Ownership;
- aktuelle Rolle;
- aktuelle Scope-Mitgliedschaft;
- Feature-Flag-Zustand;
- Ressourcenstatus.

Ein nachträgliches Filtern im Browser ist unzulässig.

## 8. Fehlerverhalten

Bei unzulässigem Zugriff darf die Antwort nicht verraten, ob eine fremde
geschützte Ressource existiert.

Die konkrete Auswahl zwischen `NOT_FOUND` und `ACCESS_DENIED` wird pro
Risikobereich dokumentiert.

Interne Logs dürfen die Entscheidung redigiert erklären, ohne fremde Inhalte
offenzulegen.

## 9. Zukünftige Organisationsnaht

Ein späterer B2B-Slice kann einführen:

~~~text
organizations
organization_memberships
organization_role_assignments
organization_content_assignments
organization_learning_assignments
organization_feature_settings
~~~

Dieser spätere Slice benötigt:

- eigenes Threat Model;
- Isolationstest;
- Datenmigrationsplan;
- Lösch- und Exportvertrag;
- Rollenmatrix;
- Billing- und Vertragsabgrenzung;
- Datenschutzprüfung;
- Audit- und Supportmodell.

## 10. Keine mechanische Tenant-Spalte

Es wird nicht automatisch zu jeder Tabelle ein nullable `tenant_id` hinzugefügt.

Jedes Aggregate dokumentiert stattdessen, ob es ist:

- globale Referenz;
- öffentliche Plattformressource;
- nutzereigene Ressource;
- interne Plattformressource;
- spätere organisationsbezogene Ressource;
- unveränderliche Auditevidenz.

Der maßgebliche Repository-Adapter erzwingt die passende Policy.

## 11. Organisation und persönliche Konten

Ein zukünftiges Organisationsmitglied kann weiterhin ein persönliches
Nutzerkonto besitzen.

Zu unterscheiden sind:

- persönliche Identität;
- persönliche Lernhistorie;
- Organisationsmitgliedschaft;
- organisationsbezogene Zuweisung;
- organisationsbezogener Bericht;
- Plattformrolle.

Das Ende einer Mitgliedschaft löscht nicht automatisch das persönliche Konto.

Es widerruft jedoch unmittelbar organisationsbezogene Zugriffsrechte.

## 12. Sitzungen und Scope-Änderung

Wenn eine Rollen- oder Scope-Mitgliedschaft reduziert oder entfernt wird:

- betroffene Sitzungen werden widerrufen oder neu bewertet;
- Hintergrundjobs werden vor Ausführung erneut geprüft;
- Caches werden invalidiert;
- Search- und Retrieval-Zugriffe verlieren den Scope;
- Audit- oder Sicherheitsereignis wird erzeugt.

Eine einmal ausgestellte Sitzung behält keine dauerhaft eingefrorene
Organisationsberechtigung.

## 13. Cache-Grenzen

Cache-Schlüssel für geschützte Daten enthalten mindestens:

- Ressourcentyp;
- Ressourcen-ID;
- Scope;
- relevante Revisions- oder Policy-Version.

Ein Cache darf keine geschützten Daten eines Scopes an einen anderen Scope
ausliefern.

Öffentliche und geschützte Cache-Pfade werden getrennt behandelt.

## 14. Search-Grenzen

Eine spätere geschützte Suche muss:

- Scope serverseitig filtern;
- Ownership berücksichtigen;
- nur freigegebene Revisionen liefern;
- Result Counts nicht scopeübergreifend offenlegen;
- keine fremden Treffer im Client ausfiltern;
- Scope in Index und Query berücksichtigen.

## 15. AI- und RAG-Grenzen

Eine spätere Retrieval-Operation muss:

- aktuellen Nutzer authentifizieren;
- aktuellen Scope auflösen;
- Collection- und Dokumentberechtigung prüfen;
- Retrieval nach Scope filtern;
- Citation-Provenienz erhalten;
- fremde Chunks vollständig ausschließen.

Ein gemeinsamer Vektorindex ist nur zulässig, wenn die Isolation technisch und
negativ getestet ist.

## 16. Hintergrundjobs

Ein Hintergrundjob speichert den fachlichen Scope.

Vor einer sicherheitsrelevanten Wirkung prüft der Handler:

- Job ist noch gültig;
- Scope existiert;
- Akteur oder Systemberechtigung ist noch zulässig;
- Ressource ist nicht archiviert oder gelöscht;
- Feature ist noch aktiviert.

Ein Job darf nicht allein deshalb weiterlaufen, weil er früher einmal
eingereiht wurde.

## 17. Spätere Organisationslöschung

Ein zukünftiger Löschworkflow muss unterscheiden:

- persönliche Konten, die bestehen bleiben;
- Organisationsmitgliedschaften;
- organisationsbezogene Lernzuweisungen;
- organisationsbezogene Reports;
- organisationsbezogene Inhalte;
- Auditnachweise;
- geplante Jobs;
- Search-Indizes;
- RAG-Dokumente;
- Backups.

Die Organisationslöschung ist kein Bestandteil von S51A.

## 18. Reporting

Ein späterer organisationsbezogener Report darf nur:

- ausdrücklich zugewiesene Lernende enthalten;
- notwendige Daten zeigen;
- keine privaten Inhalte oder Freitextantworten standardmäßig offenlegen;
- nachvollziehbare Aggregationsregeln verwenden;
- den Lernenden transparent erklärt werden;
- Export und Löschung berücksichtigen.

Überwachungs- oder Beschäftigtenprofiling wird nicht durch diesen Vertrag
freigegeben.

## 19. Paketgrenzen

`packages/domain` definiert:

- Scope-Typen;
- Ownership-Regeln;
- Resource Policies;
- Organisation- und Mitgliedschaftszustände.

`packages/auth` löst aktuelle Rollen- und Scope-Zuweisungen auf.

`packages/db` erzwingt Repository-Filter.

`packages/admin` stellt ausschließlich freigegebene Scope-Workflows bereit.

`packages/ai-core` erzwingt Retrieval-Isolation.

`apps/web` leitet keine endgültige Berechtigung aus Route-Parametern ab.

## 20. Pflicht-Negativtests

Mindestens zu prüfen:

- gültiger Nutzer liest fremden Lernfortschritt;
- Editor greift auf Owner-Konfiguration zu;
- Nutzer manipuliert `scope_id`;
- Listenabfrage enthält fremde Ressourcen;
- Detailabfrage akzeptiert fremde Objekt-ID;
- Cache-Schlüssel enthält keinen Scope;
- Search-Ergebnis enthält fremden Scope;
- RAG liefert fremden Dokument-Chunk;
- Mitgliedschaft wird entfernt, Sitzung bleibt berechtigt;
- entfernter Scope führt geplanten Job aus;
- Result Count verrät fremde geschützte Datensätze;
- Organisationsreport enthält private Freitextantworten.

## 21. Aktivierungsgrenzen

Nicht aktiviert werden durch dieses Dokument:

- Organisationserstellung;
- Mitgliedereinladung;
- organisationsbezogene Rollenvergabe;
- White Label;
- Tenant Billing;
- organisationsbezogene Domains;
- organisationsbezogene KI-Provider;
- organisationsbezogene Analytics;
- organisationsbezogene Lernüberwachung.

## 22. Freigabestatus

~~~text
SCOPE_ORGANIZATION_SEAM_APPROVED=NO
OWNERSHIP_MODEL_APPROVED=NO
FIRST_PHASE_MULTI_TENANCY=NO
FIRST_PHASE_WHITE_LABEL=NO
FUTURE_ORGANIZATION_SEAM=REQUIRED
B2B_ISOLATION_REVIEW_COMPLETED=NO
ORGANIZATION_ADMINISTRATION_AUTHORIZED=NO
ORGANIZATION_REPORTING_AUTHORIZED=NO
~~~

## 23. Aktueller Autorisierungsstand

Dieses Dokument beschreibt einen Architekturvertrag zur getrennten menschlichen
Abnahme. Es erteilt keine Implementierungs- oder externe Aktionsfreigabe.

~~~text
DOCUMENT_STATUS=ARCHITECTURE_APPROVED_IMPLEMENTATION_NOT_AUTHORIZED
PRODUCT_CODE_CHANGE_AUTHORIZED=NO
DATABASE_CHANGE_AUTHORIZED=NO
RAILWAY_CHANGE_AUTHORIZED=NO
COMMIT_AUTHORIZED=NO
PUSH_AUTHORIZED=NO
MERGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
~~~
