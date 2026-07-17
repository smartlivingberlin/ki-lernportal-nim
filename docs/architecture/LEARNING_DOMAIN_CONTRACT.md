# Learning Domain Contract

**Status:** In S50B-R3 menschlich beschlossen; Implementierungs- und externe Aktionsfreigaben ausstehend
**Stand:** 17. Juli 2026
**Geltungsbereich:** Einschreibung, Lernereignisse, Lektionszustände,
Übungsversuche, Assessments, Selbsteinschätzung, Kompetenzstand und Wiederholung

## 1. Zweck

Das produktive Lernmodell muss zwischen Aktivität und tatsächlichem Lernen
unterscheiden.

Eine Lektion wurde nicht automatisch verstanden, nur weil sie:

- geöffnet wurde;
- vollständig gescrollt wurde;
- längere Zeit sichtbar war;
- manuell als erledigt markiert wurde;
- einmal richtig beantwortet wurde.

Der Lernfortschritt soll nachvollziehbar, erklärbar und revisionssicher sein.

## 2. Zentrale Domain-Objekte

Der Zielzustand umfasst mindestens:

~~~text
Enrollment
LearningEvent
LessonProgress
PracticeAttempt
AssessmentAttempt
AssessmentResponse
ConfidenceRating
MasteryState
ReviewSchedule
CompletionRecord
~~~

Ein vollständiges Event-Sourcing des gesamten Portals ist nicht erforderlich.

Lernereignisse dienen als append-orientierte Evidenz. Aktuelle Zustände dürfen
als überprüfbare Projektionen gespeichert werden.

## 3. Enrollment

Ein Enrollment verbindet einen Lernenden mit einer bestimmten Kursrevision.

Pflichtfelder:

~~~text
enrollment_id
learner_id
course_id
course_revision_id
status
scope
started_at
completed_at
created_at
updated_at
~~~

Mögliche Zustände:

~~~text
active
paused
completed
withdrawn
archived
~~~

Eine spätere neue Kursrevision verändert nicht rückwirkend, welche Inhalte für
ein bereits bestehendes Enrollment maßgeblich waren.

## 4. Lernereignisse

Mindestens folgende Ereignistypen werden unterstützt:

~~~text
lesson_opened
lesson_explanation_viewed
practice_started
practice_submitted
self_check_completed
assessment_started
assessment_answered
assessment_completed
lesson_completed
lesson_reopened
review_scheduled
review_started
review_completed
mastery_changed
~~~

Jedes Ereignis benötigt mindestens:

~~~text
learning_event_id
event_type
learner_id
enrollment_id
course_revision_id
lesson_revision_id
actor
occurred_at
correlation_id
idempotency_key
metadata_redacted
~~~

Lernereignisse enthalten keine Passwörter, Tokens oder unnötigen Volltexte.

## 5. Lektionszustände

Der fachliche Zustand einer Lektion unterscheidet:

~~~text
not_started
in_progress
practiced
checked
completed
review_due
mastered
~~~

Bedeutung:

- `not_started`: keine gültige Lernaktivität;
- `in_progress`: die Lektion wurde begonnen;
- `practiced`: eine vorgesehene Übung wurde bearbeitet;
- `checked`: Selbstprüfung oder vorgesehenes Assessment wurde durchgeführt;
- `completed`: die veröffentlichte Abschlussregel wurde erfüllt;
- `review_due`: eine Wiederholung ist fällig;
- `mastered`: späterer Abruf oder Transfer wurde erfolgreich nachgewiesen.

Ein Lernender darf eine Lektion jederzeit erneut öffnen.

Eine Wiederöffnung löscht keine historischen Versuche.

## 6. Abschlussregeln

Abschlussregeln sind versioniert und für Lernende verständlich.

Eine typische Anfängerlektion kann verlangen:

- Lektion wurde geöffnet;
- Übung wurde begonnen und eingereicht;
- notwendige Selbstprüfpunkte wurden bearbeitet;
- ein Sicherheits- oder Quellenhinweis wurde berücksichtigt;
- ein verpflichtendes Assessment wurde abgeschlossen.

Nicht zulässig als alleinige Abschlussregel sind:

- verstrichene Zeit;
- Scrollposition;
- Klick auf „Erledigt“;
- bloßes Öffnen einer Seite;
- eine clientseitige Variable ohne serverseitige Evidenz.

## 7. Practice Attempt

Ein Übungsversuch referenziert immer die konkrete Übungsrevision.

Mindestmodell:

~~~text
practice_attempt_id
learner_id
enrollment_id
lesson_revision_id
practice_revision_id
status
started_at
submitted_at
confidence_rating
rubric_selections
content_storage_mode
~~~

Freitext ist optional.

Für Freitext gelten die Datenklassifizierungs-, Lösch- und Exportregeln.

Die erste produktive Version benötigt keine automatische LLM-Bewertung.

## 8. Assessments

Ein Assessment Attempt referenziert:

- Assessment-Identität;
- konkrete Assessment-Revision;
- konkrete Item-Revisionen;
- konkrete Antwortoptionen;
- Scoring-Policy-Revision;
- Kurs- und Lektionsrevision;
- tatsächliche Reihenfolge der Items.

Frühere Antworten werden nicht überschrieben.

Jeder weitere Versuch erzeugt einen neuen Attempt.

## 9. Confidence Rating

Wo didaktisch sinnvoll, kann der Lernende seine Sicherheit angeben:

~~~text
very_unsure
unsure
sure
very_sure
~~~

Die Kombination aus Ergebnis und Selbsteinschätzung kann zeigen:

- richtig und realistisch sicher;
- richtig, aber unnötig unsicher;
- falsch und unsicher;
- falsch, aber übermäßig sicher.

Diese Information ist eine Lernhilfe.

Sie ist keine medizinische, psychologische oder persönliche Diagnose.

## 10. Mastery State

Der anfängliche erklärbare Kompetenzzustand lautet:

~~~text
unobserved
introduced
practiced
demonstrated
retained
~~~

Bedeutung:

- `unobserved`: noch keine belastbare Evidenz;
- `introduced`: Inhalt wurde eingeführt;
- `practiced`: Lernender hat ihn angewendet;
- `demonstrated`: vorgesehene Aufgabe wurde erfolgreich gelöst;
- `retained`: späterer Abruf oder Transfer war erfolgreich.

Mastery darf nicht ausschließlich durch folgende Signale entstehen:

- Zeit auf der Seite;
- Anzahl der Klicks;
- Öffnen einer Lektion;
- Selbsteinschätzung ohne Leistungsnachweis;
- nicht evaluierte KI-Bewertung.

## 11. Wiederholungsplanung

Die erste Version nutzt nachvollziehbare Regeln statt eines undurchsichtigen
Machine-Learning-Modells.

Grundprinzip:

~~~text
falsch oder sehr unsicher
-> frühe Wiederholung

richtig, aber unsicher
-> mittlere Wiederholung

richtig und sicher
-> längerer Abstand

mehrfach erfolgreich erinnert
-> größerer Abstand

später nicht erinnert
-> Abstand verkürzen
~~~

Die exakten Intervalle werden erst im S54-/S55-Didaktikslice beschlossen.

S51A implementiert keine Wiederholungslogik.

## 12. Gastmodus und Kontomigration

Der öffentliche Gastmodus darf Browser-lokalen Fortschritt behalten.

Nach Einführung von Konten darf lokaler Fortschritt nur übernommen werden, wenn:

- der Nutzer die Übernahme bewusst auslöst;
- das lokale Format validiert wurde;
- Konflikte sichtbar behandelt werden;
- keine Daten eines gemeinsam genutzten Browsers automatisch zugeordnet werden;
- die Übernahme idempotent ist;
- der Nutzer den Import abbrechen kann.

Eine Anmeldung führt nicht automatisch zur Übernahme lokaler Daten.

## 13. Fortschrittsprojektion

Der sichtbare Fortschritt wird aus fachlicher Evidenz und einer versionierten
Progress Policy abgeleitet.

~~~text
validierte Lernereignisse
-> fachliche Zustandsübergänge
-> Progress-Projektion
-> verständliche Darstellung
~~~

Ein Prozentwert muss erklären können, welche Kriterien erfüllt wurden und welche
noch fehlen.

## 14. Lernendenrechte

Lernende sollen später:

- den eigenen Fortschritt einsehen;
- historische Versuche nachvollziehen;
- eine Lektion wiederholen;
- gespeicherte Antworten löschen können, soweit zulässig;
- Daten exportieren können;
- eine verständliche Erklärung eines Kompetenzstatus erhalten;
- fehlerhafte Daten melden können.

Ein Admin darf historische Lernversuche nicht still verändern.

## 15. Paketgrenzen

`packages/domain` besitzt:

- Zustände;
- Lernereignistypen;
- fachliche Übergangsregeln;
- Mastery- und Progress-Policies;
- domain-spezifische Fehler.

`packages/contracts` besitzt:

- validierte Commands;
- Request- und Response-Schemas;
- versionierte Transportverträge.

`packages/db` besitzt:

- Event- und Attempt-Repositories;
- Projektionen;
- Transaktionen;
- idempotente Schreiboperationen.

`packages/admin` darf autorisierte Evidenz anzeigen, aber keine Domain-Regeln
umgehen.

`packages/ai-core` darf später formative Hinweise geben, aber ohne gesondertes
Gate keine endgültigen Assessment- oder Mastery-Entscheidungen treffen.

`apps/web` stellt Zustände dar und sendet validierte Commands.

## 16. Pflicht-Negativtests

Mindestens zu prüfen:

- Zugriff auf Enrollment eines anderen Lernenden;
- doppelte Übermittlung derselben Idempotency Key;
- Completion ohne notwendige Evidenz;
- Mastery nur durch Öffnen einer Lektion;
- nachträgliche Änderung der Kursrevision eines Enrollments;
- Import fremder lokaler Browserdaten;
- Admin überschreibt historischen Attempt;
- KI-Hinweis ändert automatisch das Endergebnis;
- ungültiger Zustandsübergang;
- veraltete Projektion nach gültigem Event;
- Reopen löscht frühere Versuche;
- Review wird im falschen Scope geplant.

## 17. Freigabestatus

~~~text
LEARNING_DOMAIN_CONTRACT_APPROVED=NO
ENROLLMENT_MODEL_APPROVED=NO
LEARNING_EVENT_MODEL_APPROVED=NO
LESSON_STATE_MODEL_APPROVED=NO
MASTERY_MODEL_APPROVED=NO
REVIEW_SCHEDULING_POLICY_APPROVED=NO
LOCAL_PROGRESS_IMPORT_APPROVED=NO
AUTOMATIC_LLM_GRADING_APPROVED=NO
~~~

## 18. Aktueller Autorisierungsstand

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
