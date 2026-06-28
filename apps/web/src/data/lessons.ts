import { Lesson, DifficultyLevel } from './types';

export const seedLessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Was ist KI?',
    description: 'Eine einfache Einführung in die Welt der künstlichen Intelligenz.',
    content: `Lernziel:
Du verstehst, was künstliche Intelligenz im Alltag bedeutet.

Einfach erklärt:
KI ist Software, die Muster erkennt und daraus Antworten, Vorschläge oder Inhalte erzeugt. Sie denkt nicht wie ein Mensch, sondern berechnet, welche Antwort wahrscheinlich gut passt.

Mini-Beispiel:
Du schreibst: "Formuliere diese E-Mail freundlicher." Die KI erkennt die Aufgabe und schlägt eine höflichere Version vor.

Typischer Fehler:
Viele Menschen glauben, KI wisse automatisch die Wahrheit. Das stimmt nicht. KI kann überzeugend klingen und trotzdem falsch liegen.

Übung:
Nenne drei Situationen, in denen KI dir im Alltag helfen könnte. Markiere danach eine Situation, bei der du die Antwort unbedingt prüfen würdest.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 5,
    order: 1,
    pathId: 'path-beginner'
  },
  {
    id: 'l2',
    title: 'Was kann KI gut und was nicht?',
    description: 'Stärken und Schwächen von KI-Systemen verstehen.',
    content: `Lernziel:
Du erkennst, wann KI hilfreich ist und wann Vorsicht nötig ist.

KI kann gut:
Texte strukturieren, Ideen sammeln, Zusammenfassungen schreiben, Formulierungen verbessern und einfache Erklärungen geben.

KI kann weniger gut:
Aktuelle Fakten ohne Prüfung garantieren, persönliche Situationen vollständig beurteilen oder verbindliche Rechts-, Medizin- oder Finanzberatung ersetzen.

Mini-Beispiel:
Für "Erkläre mir den Unterschied zwischen Miete und Kaution" kann KI nützlich sein. Für "Ist dieser konkrete Vertrag rechtlich sicher?" brauchst du zusätzliche Prüfung.

Typischer Fehler:
Man übernimmt KI-Antworten ungeprüft, nur weil sie klar und professionell klingen.

Übung:
Schreibe zwei Aufgaben auf, die du KI geben würdest, und zwei Aufgaben, bei denen du zusätzlich eine Quelle oder einen Experten brauchst.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 7,
    order: 2,
    pathId: 'path-beginner'
  },
  {
    id: 'l3',
    title: 'Was ist ein Prompt?',
    description: 'Die Sprache der KI lernen: Befehle richtig formulieren.',
    content: `Lernziel:
Du verstehst, was ein Prompt ist und warum gute Anweisungen bessere Ergebnisse bringen.

Einfach erklärt:
Ein Prompt ist deine Frage oder Aufgabe an die KI. Je klarer du sagst, was du brauchst, desto nützlicher wird die Antwort.

Schwacher Prompt:
"Schreib was über KI."

Besserer Prompt:
"Erkläre einem Anfänger in 5 Sätzen, was KI ist. Nutze ein Beispiel aus dem Alltag und vermeide Fachwörter."

Typischer Fehler:
Der Prompt ist zu ungenau. Dann muss die KI raten, welches Ziel, welche Länge und welcher Stil gemeint sind.

Übung:
Verbessere diesen Prompt: "Mach mir einen Text." Ergänze Ziel, Zielgruppe, Länge, Stil und Thema.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 5,
    order: 3,
    pathId: 'path-beginner'
  },
  {
    id: 'l4',
    title: 'Gute Prompts schreiben',
    description: 'Praktische Tipps für bessere Ergebnisse.',
    content: `Lernziel:
Du kannst einfache, klare Prompts nach einer festen Struktur schreiben.

Eine gute Grundformel:
Rolle + Aufgabe + Kontext + Format + Grenze.

Beispiel:
"Du bist ein geduldiger Lerncoach. Erkläre mir in einfacher Sprache, wie ich eine KI-Antwort prüfe. Nutze eine kurze Liste mit drei Schritten. Gib keine Rechtsberatung."

Warum das funktioniert:
Die KI bekommt eine Rolle, ein klares Ziel, den gewünschten Stil und eine Grenze. Dadurch wird die Antwort genauer.

Typischer Fehler:
Man schreibt zu viele Themen in einen Prompt. Besser ist: eine Aufgabe nach der anderen.

Übung:
Schreibe einen Prompt für eine E-Mail-Verbesserung. Lege fest: Ton, Länge, Empfänger und was nicht verändert werden soll.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 10,
    order: 4,
    pathId: 'path-beginner'
  },
  {
    id: 'l5',
    title: 'Halluzinationen erkennen',
    description: 'Warum man KI-Antworten immer prüfen sollte.',
    content: `Lernziel:
Du erkennst Warnzeichen für erfundene oder unsichere KI-Antworten.

Einfach erklärt:
Eine Halluzination ist eine Antwort, die plausibel klingt, aber falsch oder unbelegt ist. Die KI kann Namen, Zahlen, Quellen oder Regeln erfinden.

Warnzeichen:
Die Antwort nennt sehr genaue Zahlen ohne Quelle. Sie klingt zu sicher. Sie widerspricht bekannten Fakten. Sie liefert Links oder Titel, die du nicht findest.

Mini-Beispiel:
Die KI nennt ein Gesetz mit Paragraf und Datum. Bevor du das verwendest, prüfst du es in einer offiziellen Quelle.

Typischer Fehler:
Man fragt die KI: "Bist du sicher?" und glaubt dann der Bestätigung. Besser ist echte Quellenprüfung.

Übung:
Nimm eine KI-Antwort mit einer konkreten Behauptung. Markiere alle Fakten, die du vor Veröffentlichung prüfen müsstest.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 8,
    order: 5,
    pathId: 'path-beginner'
  },
  {
    id: 'l6',
    title: 'Warum Quellen wichtig sind',
    description: 'Fakten-Check und Transparenz bei KI-Inhalten.',
    content: `Lernziel:
Du verstehst, warum Quellen bei KI-Antworten wichtig sind.

Einfach erklärt:
Eine Quelle zeigt, woher eine Information kommt. Ohne Quelle kannst du schwer beurteilen, ob eine Aussage aktuell, richtig oder vollständig ist.

Gute Quellen können sein:
Offizielle Webseiten, Gesetze, Leitlinien, wissenschaftliche Veröffentlichungen, Handbücher oder seriöse Fachseiten.

Mini-Beispiel:
Wenn die KI etwas über eine EU-Regel erklärt, solltest du die Aussage bei einer offiziellen EU-Seite oder einer verlässlichen Fachquelle nachprüfen.

Typischer Fehler:
Man verwechselt eine schöne Erklärung mit einem Beleg. Eine Erklärung ist hilfreich, aber noch kein Nachweis.

Übung:
Wähle eine Behauptung aus einer KI-Antwort. Suche eine Quelle dazu und notiere: Wer veröffentlicht sie, wann wurde sie aktualisiert und passt sie wirklich zur Aussage?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 6,
    order: 6,
    pathId: 'path-beginner'
  },
  {
    id: 'l7',
    title: 'Datenschutz im Prompt',
    description: 'Sicherer Umgang mit persönlichen Daten.',
    content: `Lernziel:
Du lernst, welche Informationen du nicht unüberlegt in KI-Systeme eingeben solltest.

Einfach erklärt:
Ein Prompt kann persönliche oder vertrauliche Daten enthalten. Dazu gehören Namen, Adressen, Telefonnummern, Passwörter, Kundendaten, Gesundheitsdaten oder Vertragsdetails.

Sichere Arbeitsweise:
Entferne Namen und ersetze sie durch Platzhalter. Kürze Dokumente auf das Nötigste. Gib keine Passwörter, Zugangsdaten oder Bankdaten ein.

Mini-Beispiel:
Statt "Max Müller, Musterstraße 4, schuldet mir 1.200 Euro" schreibst du: "Person A schuldet Person B einen Betrag. Formuliere eine neutrale Erinnerung."

Typischer Fehler:
Man kopiert ganze Dokumente in einen Chat, obwohl nur ein kleiner Ausschnitt gebraucht wird.

Übung:
Schreibe einen unsicheren Prompt in eine sichere Version um. Entferne alle persönlichen Daten und ersetze sie durch neutrale Platzhalter.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 5,
    order: 7,
    pathId: 'path-beginner'
  }
];
