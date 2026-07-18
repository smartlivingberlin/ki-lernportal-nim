# Content and Assessment Revision Contract

**Status:** In S50B-R3 menschlich beschlossen; Implementierungs- und externe Aktionsfreigaben ausstehend
**Stand:** 17. Juli 2026
**Geltungsbereich:** Unveränderliche Revisionen, Review, Publikation, Rollback,
Quellen, Assessment-Items, Antwortoptionen und Scoring-Policies

## 1. Grundprinzip

Veröffentlichte Lerninhalte und historische Assessment-Evidenz müssen dauerhaft
rekonstruierbar bleiben.

Eine spätere Bearbeitung darf niemals unbemerkt verändern:

- welche Lektion ein Lernender gesehen hat;
- welche Aufgabe bearbeitet wurde;
- welche Antwortoptionen verfügbar waren;
- welche Antwort als richtig galt;
- welche Scoring-Regel angewendet wurde;
- welche Quellen eine veröffentlichte Aussage stützten.

Korrekturen erzeugen neue Revisionen.

Freigegebene Revisionen werden nicht überschrieben.

## 2. Stabile Identität und Revision

Jedes verwaltete Objekt besitzt:

~~~text
stabile Objektidentität
-> Revision 1
-> Revision 2
-> Revision 3
~~~

Die stabile Identität dient Navigation, Ownership und Referenzierung.

Eine Publikation verweist auf genau eine freigegebene Revision.

## 3. Betroffene Objekttypen

Der Revisionsvertrag gilt mindestens für:

- Kurse;
- Module;
- Lektionen;
- Übungen;
- Assessment-Definitionen;
- Assessment-Items;
- Antwortoptionen;
- Rubriken;
- Scoring-Policies;
- Quellen;
- Claim-zu-Quellen-Zuordnungen;
- Medienmetadaten;
- Sicherheits- und Datenschutzhinweise;
- Lernziel- und Kompetenzzuordnungen.

## 4. Revisionsmetadaten

Jede Revision benötigt mindestens:

~~~text
revision_id
object_id
revision_number
status
created_by
created_at
change_reason
content_hash
review_requested_at
reviewed_by
reviewed_at
review_decision
published_at
supersedes_revision_id
~~~

Zusätzlich können je nach Objekttyp gelten:

- Sprache;
- Kompetenzzuordnung;
- Quellenrevisionen;
- Rechtefreigabe;
- Accessibility-Review;
- Legal-Review;
- Gültigkeitsbeginn;
- geplantes Publikationsdatum.

## 5. Workflow

Der verbindliche Workflow lautet:

~~~text
draft
-> review_requested
-> changes_requested oder approved
-> published
-> superseded, archived oder rolled_back
~~~

Regeln:

1. Ein Autor darf den eigenen Entwurf nicht selbst genehmigen.
2. Eine Publikation benötigt eine freigegebene Revision.
3. Änderungen nach Freigabe erzeugen eine neue Revision.
4. Archivierung löscht historische Evidenz nicht.
5. Rollback löscht die problematische Revision nicht.
6. Eine geplante Publikation muss abbrechbar sein.
7. Wiederholte Publikationsaufrufe müssen idempotent sein.

## 6. Publikationsoperation

Eine Publikation ist eine serverseitige, transaktionale Operation.

Sie prüft mindestens:

- Revision besitzt Status `approved`;
- Reviewer ist nicht der Autor;
- alle erforderlichen Quellen sind freigegeben;
- Medienrechte sind dokumentiert;
- notwendige Accessibility-Prüfung ist vorhanden;
- kein blockierender Legal- oder Safety-Status besteht;
- Publikation ist für den vorgesehenen Scope zulässig.

Danach:

~~~text
freigegebene Revision prüfen
-> unveränderliche Publikationsreferenz erzeugen
-> öffentlichen Pointer transaktional aktualisieren
-> Outbox-Ereignis erzeugen
-> Auditereignis schreiben
~~~

Es darf kein öffentlicher Zustand aus einer Mischung verschiedener, nicht
gemeinsam freigegebener Revisionen entstehen.

## 7. Rollback

Rollback bedeutet:

- eine bereits freigegebene frühere Revision auswählen;
- eine neue auditierte Publikationsoperation ausführen;
- den öffentlichen Pointer kontrolliert umstellen;
- Such- und Cache-Aktualisierung auslösen;
- Grund und verantwortliche Person dokumentieren.

Rollback bedeutet nicht:

- alte Revision überschreiben;
- Datenbankhistorie löschen;
- historische Attempts neu bewerten;
- problematische Evidenz vernichten.

## 8. Assessment-Revisionen

Ein Assessment Attempt referenziert immer:

- Assessment-Identität;
- Assessment-Revision;
- konkrete Item-Revisionen;
- konkrete Antwortoptionsrevisionen;
- Scoring-Policy-Revision;
- Kursrevision;
- Modulrevision;
- Lektionsrevision.

Jede Änderung an folgenden Elementen erzeugt eine neue Revision:

- Fragewortlaut;
- richtige Antwort;
- Antwortoptionen;
- Feedback;
- Rubrik;
- Punktewert;
- Schwellenwert;
- Kompetenzzuordnung;
- Schwierigkeitsgrad;
- Quellenbezug.

## 9. Item-Auswahl

Ein späterer Fragebankdienst darf Items auswählen nach:

- Kompetenz;
- Schwierigkeitsgrad;
- Sprache;
- Reviewstatus;
- Veröffentlichungsstatus;
- Kurs- und Scope-Zulässigkeit.

Nicht auswählbar sind:

- Drafts;
- abgelehnte Revisionen;
- archivierte Items;
- Items ohne notwendige Quellen;
- Items ohne freigegebene Scoring-Regel;
- Items aus einem fremden Scope.

Bei zufälliger Auswahl werden die tatsächlich verwendeten Revisionen im Attempt
gespeichert.

## 10. Scoring Policy

Objektiv auswertbare Aufgaben verwenden zunächst deterministische Regeln.

Eine Scoring Policy definiert beispielsweise:

~~~text
scoring_policy_revision_id
maximum_score
item_weights
partial_credit_rule
pass_threshold
rounding_rule
missing_answer_rule
invalid_answer_rule
~~~

Eine neue Scoring Policy verändert frühere Ergebnisse nicht automatisch.

Eine rückwirkende Neubewertung benötigt einen eigenen dokumentierten Vorgang und
erzeugt eine neue Result-Version.

## 11. Freitext und KI-Unterstützung

Freitext kann zunächst durch folgende Mittel unterstützt werden:

- Musterantwort;
- Checkliste;
- Rubrik;
- Selbstprüfung;
- menschliche formative Rückmeldung.

Ein späterer KI-Tutor darf formative Hinweise geben.

Ohne gesondertes Legal-, Didaktik-, Privacy-, Security- und AI-Evaluation-Gate
darf ein LLM nicht allein entscheiden über:

- bestanden oder nicht bestanden;
- endgültige Punktzahl;
- Mastery;
- Zertifikat;
- berufliche Eignung;
- rechtlich relevante Qualifikation.

## 12. Quellen und Claims

Die Zielarchitektur unterstützt nicht nur Quelle-zu-Lektion, sondern auch
Claim-zu-Quellenrevision.

Ein wichtiger Claim kann verweisen auf:

~~~text
claim_id
content_revision_id
claim_text_hash
source_revision_id
supporting_location
review_status
reviewed_at
~~~

Eine abgelaufene Quellenprüfung kann neue Publikationen blockieren.

Sie darf historische Evidenz einer älteren Publikation nicht entfernen.

## 13. Medien und Rechte

Eine Medienrevision benötigt je nach Verwendung:

- Rechteinhaber;
- Herkunft;
- Lizenz;
- erlaubten Nutzungsumfang;
- Bearbeitungsstatus;
- Alt-Text;
- Accessibility-Prüfung;
- Ablauf oder Widerruf;
- Reviewer.

Medien ohne notwendige Rechtefreigabe dürfen nicht veröffentlicht werden.

## 14. Content Hash

Ein kanonischer Hash dient:

- Change Detection;
- Revisionsvergleich;
- Auditnachweis;
- Erkennung stiller Veränderungen;
- Reproduzierbarkeit von Publikationen.

Ein Hash ersetzt keine:

- Berechtigung;
- Reviewer-Freigabe;
- Signatur;
- Quellenprüfung;
- Medienrechteprüfung.

## 15. Historische Reproduzierbarkeit

Für einen historischen Attempt muss rekonstruierbar sein:

- Kursrevision;
- Lektionsrevision;
- Assessment-Revision;
- Item-Revisionen;
- Antwortoptionen;
- Scoring Policy;
- eingereichte Antwort;
- berechnetes Ergebnis;
- Zeitpunkt;
- Scope;
- verwendete Publikation.

Spätere Korrekturen werden nicht rückwirkend als damals sichtbarer Inhalt
dargestellt.

## 16. Paketgrenzen

`packages/domain` besitzt:

- Revisionszustände;
- Workflow-Invarianten;
- Publikationsregeln;
- Rollbackregeln;
- Scoring-Grundbegriffe.

`packages/contracts` besitzt:

- Commands;
- validierte Eingaben;
- versionierte Responses;
- Fehlerverträge.

`packages/db` besitzt:

- transaktionale Repositories;
- Publikationspointer;
- Revisionspersistenz;
- Attempt-Referenzen;
- Outbox-Schreibvorgänge.

`packages/admin` besitzt:

- Authoring;
- Review Request;
- Review Decision;
- Publikation;
- Rollback;
- Archivierung;
- Rechteprüfung.

`apps/web` darf öffentliche Pointer nicht direkt verändern.

## 17. Pflicht-Negativtests

Mindestens zu prüfen:

- Autor genehmigt eigenen Entwurf;
- Draft wird öffentlich publiziert;
- ungeprüfte Quelle wird angehängt;
- Medium ohne Rechtefreigabe wird veröffentlicht;
- zwei identische Publish Requests;
- Publish-Transaktion scheitert vor Outbox-Eintrag;
- geplante Publikation wird nach Stornierung ausgeführt;
- Rollback verändert historische Attempts;
- Item-Wortlaut ändert sich nach einem Attempt;
- richtige Antwort ändert sich nach einem Attempt;
- Scoring Policy ändert historische Ergebnisse;
- archiviertes Item wird neu ausgewählt;
- fremder Scope wird publiziert;
- öffentlicher Pointer verweist auf gemischte Revisionen.

## 18. Freigabestatus

~~~text
CONTENT_REVISION_CONTRACT_APPROVED=NO
ASSESSMENT_REVISION_CONTRACT_APPROVED=NO
PUBLICATION_WORKFLOW_APPROVED=NO
SCORING_VERSION_CONTRACT_APPROVED=NO
CLAIM_SOURCE_MAPPING_APPROVED=NO
MEDIA_RIGHTS_WORKFLOW_APPROVED=NO
AUTOMATIC_CONTENT_PUBLICATION_APPROVED=NO
AUTOMATIC_LLM_FINAL_GRADING_APPROVED=NO
~~~

## 19. Aktueller Autorisierungsstand

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
