import { Lesson, DifficultyLevel, ReviewStatus } from './types';

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

Sicher arbeiten:
Nutze KI als Hilfe zum Verstehen und Formulieren. Prüfe wichtige Aussagen trotzdem selbst.

Typischer Fehler:
Viele Menschen glauben, KI wisse automatisch die Wahrheit. Das stimmt nicht. KI kann überzeugend klingen und trotzdem falsch liegen.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 5,
    order: 1,
    sourceIds: ['digcomp-30', 'oecd-ai-principles'],
    reviewStatus: ReviewStatus.Published,
    lastReviewed: '2026-07-13',
    pathId: 'path-beginner'
  },
  {
    id: 'l2',
    title: 'Was kann KI gut — und was nicht?',
    description: 'Stärken und Grenzen von KI-Systemen verstehen.',
    content: `Lernziel:
Du erkennst, wann KI hilfreich ist und wann Vorsicht nötig ist.

Einfach erklärt:
KI kann Texte strukturieren, Ideen sammeln, Zusammenfassungen schreiben, Formulierungen verbessern und einfache Erklärungen geben. Sie kann aber aktuelle Fakten nicht sicher garantieren, persönliche Situationen nicht vollständig beurteilen und keine verbindliche Fachberatung ersetzen.

Mini-Beispiel:
Für "Erkläre mir den Unterschied zwischen Miete und Kaution" kann KI nützlich sein. Für "Ist dieser konkrete Vertrag rechtlich sicher?" brauchst du zusätzliche Prüfung.

Sicher arbeiten:
Nutze KI für Entwürfe, Erklärungen und Ideen. Bei Recht, Medizin, Steuern, Finanzen oder Verträgen brauchst du geeignete Quellen oder Fachpersonen.

Typischer Fehler:
Man übernimmt KI-Antworten ungeprüft, nur weil sie klar und professionell klingen.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 7,
    order: 2,
    sourceIds: ['digcomp-30', 'nist-ai-rmf'],
    reviewStatus: ReviewStatus.Published,
    lastReviewed: '2026-07-13',
    pathId: 'path-beginner'
  },
  {
    id: 'l3',
    title: 'Deine erste sichere KI-Frage',
    description: 'Eine einfache Frage stellen, ohne private Daten preiszugeben.',
    content: `Lernziel:
Du kannst eine erste KI-Frage sicher formulieren.

Einfach erklärt:
Eine sichere KI-Frage ist klar, aber enthält keine privaten oder vertraulichen Daten. Du musst also nicht deinen Namen, deine Adresse, Telefonnummern, Passwörter, Kundendaten oder ganze Dokumente eingeben.

Mini-Beispiel:
Unsicher: "Schreibe eine Nachricht mit echtem Namen, Adresse und privatem Zahlungsgrund."
Sicherer: "Formuliere eine freundliche Erinnerung an Person A, ohne Namen, Adresse oder private Details."

Sicher arbeiten:
Ersetze Namen durch neutrale Platzhalter. Beschreibe die Aufgabe allgemein. Teile nur so viel Kontext, wie wirklich nötig ist.

Typischer Fehler:
Man kopiert private Daten in den Prompt, obwohl eine allgemeine Beschreibung reichen würde.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 6,
    order: 3,
    sourceIds: ['digcomp-30', 'eu-gdpr'],
    reviewStatus: ReviewStatus.Published,
    lastReviewed: '2026-07-13',
    pathId: 'path-beginner'
  },
  {
    id: 'l4',
    title: 'Was ist ein Prompt?',
    description: 'Die Sprache der KI lernen: Aufgaben richtig formulieren.',
    content: `Lernziel:
Du verstehst, was ein Prompt ist und warum gute Anweisungen bessere Ergebnisse bringen.

Einfach erklärt:
Ein Prompt ist deine Frage oder Aufgabe an die KI. Je klarer du sagst, was du brauchst, desto nützlicher wird die Antwort.

Mini-Beispiel:
Schwacher Prompt: "Schreib was über KI."
Besserer Prompt: "Erkläre einem Anfänger in 5 Sätzen, was KI ist. Nutze ein Beispiel aus dem Alltag und vermeide Fachwörter."

Sicher arbeiten:
Nenne Ziel, Zielgruppe, Länge und Stil. Füge eine Grenze hinzu, wenn die KI etwas nicht tun soll.

Typischer Fehler:
Der Prompt ist zu ungenau. Dann muss die KI raten, welches Ziel, welche Länge und welcher Stil gemeint sind.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 5,
    order: 4,
    sourceIds: ['digcomp-30'],
    reviewStatus: ReviewStatus.Published,
    lastReviewed: '2026-07-13',
    pathId: 'path-beginner'
  },
  {
    id: 'l5',
    title: 'Die einfache Prompt-Formel',
    description: 'Eine einfache Struktur für bessere KI-Antworten.',
    content: `Lernziel:
Du kannst einfache, klare Prompts nach einer festen Struktur schreiben.

Einfach erklärt:
Eine gute Grundformel lautet: Rolle + Aufgabe + Kontext + Format + Grenze. Du musst nicht immer alle Teile nutzen, aber die Formel hilft dir, genauer zu fragen.

Mini-Beispiel:
"Du bist ein geduldiger Lerncoach. Erkläre mir in einfacher Sprache, wie ich eine KI-Antwort prüfe. Nutze eine kurze Liste mit drei Schritten. Gib keine Rechtsberatung."

Sicher arbeiten:
Schreibe lieber eine klare Aufgabe als fünf Aufgaben auf einmal. Sage auch, was die KI nicht tun soll.

Typischer Fehler:
Man schreibt zu viele Themen in einen Prompt. Die Antwort wird dann lang, ungenau oder schwer prüfbar.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 8,
    order: 5,
    sourceIds: ['digcomp-30'],
    reviewStatus: ReviewStatus.Published,
    lastReviewed: '2026-07-13',
    pathId: 'path-beginner'
  },
  {
    id: 'l6',
    title: 'E-Mails und Texte verbessern',
    description: 'KI als Hilfe für klarere und freundlichere Formulierungen nutzen.',
    content: `Lernziel:
Du kannst KI nutzen, um kurze Texte besser zu formulieren, ohne Fakten zu verändern oder private Daten preiszugeben.

Einfach erklärt:
KI kann helfen, einen Text freundlicher, kürzer, klarer oder sachlicher zu machen. Du bleibst aber verantwortlich dafür, ob der Inhalt stimmt.

Mini-Beispiel:
Prompt: "Formuliere diesen kurzen Text freundlicher und klarer. Verändere keine Fakten. Mach ihn maximal 5 Sätze lang."

Sicher arbeiten:
Entferne Namen, Adressen, Kundendaten und vertrauliche Details. Prüfe danach, ob die KI etwas erfunden oder verändert hat.

Typischer Fehler:
Man übernimmt den fertigen Text sofort und merkt nicht, dass ein Detail geändert wurde.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 7,
    order: 6,
    sourceIds: ['digcomp-30', 'eu-gdpr'],
    reviewStatus: ReviewStatus.Published,
    lastReviewed: '2026-07-13',
    pathId: 'path-beginner'
  },
  {
    id: 'l7',
    title: 'Ideen sammeln, ohne blind zu übernehmen',
    description: 'KI als Ideenhilfe nutzen und Vorschläge bewusst auswählen.',
    content: `Lernziel:
Du verstehst KI als Ideenhilfe, nicht als automatische Wahrheit.

Einfach erklärt:
KI kann dir schnell mehrere Vorschläge geben. Diese Vorschläge sind aber nur Möglichkeiten. Du entscheidest, was passt, was falsch ist und was verbessert werden muss.

Mini-Beispiel:
Prompt: "Gib mir 5 Ideen, wie ich einem Kind KI einfach erklären kann. Schreibe jede Idee in einem Satz."

Sicher arbeiten:
Behandle Ideen als Entwürfe. Streiche schlechte Vorschläge. Verbessere gute Vorschläge. Prüfe Fakten, bevor du etwas veröffentlichst oder weitergibst.

Typischer Fehler:
Man nimmt die erste Liste der KI als fertige Lösung, obwohl manche Ideen unpassend oder oberflächlich sind.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 6,
    order: 7,
    sourceIds: ['digcomp-30', 'oecd-ai-principles'],
    reviewStatus: ReviewStatus.Published,
    lastReviewed: '2026-07-13',
    pathId: 'path-beginner'
  },
  {
    id: 'l8',
    title: 'Halluzinationen erkennen',
    description: 'Warum man KI-Antworten immer prüfen sollte.',
    content: `Lernziel:
Du erkennst Warnzeichen für erfundene oder unsichere KI-Antworten.

Einfach erklärt:
Eine Halluzination ist eine Antwort, die plausibel klingt, aber falsch oder unbelegt ist. Die KI kann Namen, Zahlen, Quellen oder Regeln erfinden.

Mini-Beispiel:
Die KI nennt ein Gesetz mit Paragraf und Datum. Bevor du das verwendest, prüfst du es in einer offiziellen Quelle.

Sicher arbeiten:
Achte auf sehr genaue Zahlen ohne Quelle, erfundene Links, zu sichere Aussagen und Widersprüche zu bekannten Fakten.

Typischer Fehler:
Man fragt die KI: "Bist du sicher?" und glaubt dann der Bestätigung. Besser ist echte Quellenprüfung.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 8,
    order: 8,
    sourceIds: ['nist-genai-profile', 'nist-ai-rmf'],
    reviewStatus: ReviewStatus.Published,
    lastReviewed: '2026-07-13',
    pathId: 'path-beginner'
  },
  {
    id: 'l9',
    title: 'Quellen prüfen',
    description: 'Fakten-Check und Transparenz bei KI-Inhalten.',
    content: `Lernziel:
Du verstehst, warum Quellen bei KI-Antworten wichtig sind und wie du einfache Prüfungen machst.

Einfach erklärt:
Eine Quelle zeigt, woher eine Information kommt. Ohne Quelle kannst du schwer beurteilen, ob eine Aussage aktuell, richtig oder vollständig ist.

Mini-Beispiel:
Wenn die KI etwas über eine EU-Regel erklärt, solltest du die Aussage bei einer offiziellen EU-Seite oder einer verlässlichen Fachquelle nachprüfen.

Sicher arbeiten:
Prüfe: Wer veröffentlicht die Information? Wann wurde sie aktualisiert? Passt die Quelle wirklich zur Aussage?

Typischer Fehler:
Man verwechselt eine schöne Erklärung mit einem Beleg. Eine Erklärung ist hilfreich, aber noch kein Nachweis.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 7,
    order: 9,
    sourceIds: ['digcomp-30', 'nist-genai-profile'],
    reviewStatus: ReviewStatus.Published,
    lastReviewed: '2026-07-13',
    pathId: 'path-beginner'
  },
  {
    id: 'l10',
    title: 'Datenschutz im Prompt',
    description: 'Sicherer Umgang mit persönlichen Daten.',
    content: `Lernziel:
Du lernst, welche Informationen du nicht unüberlegt in KI-Systeme eingeben solltest.

Einfach erklärt:
Ein Prompt kann persönliche oder vertrauliche Daten enthalten. Dazu gehören Namen, Adressen, Telefonnummern, Passwörter, Kundendaten, Gesundheitsdaten oder Vertragsdetails.

Mini-Beispiel:
Statt eine echte Person mit Adresse und Betrag zu nennen, schreibst du: "Person A schuldet Person B einen Betrag. Formuliere eine neutrale Erinnerung ohne Namen, Adresse oder Vertragsdetails."

Sicher arbeiten:
Entferne Namen und ersetze sie durch Platzhalter. Kürze Dokumente auf das Nötigste. Gib keine Passwörter, Zugangsdaten oder Bankdaten ein.

Typischer Fehler:
Man kopiert ganze Dokumente in einen Chat, obwohl nur ein kleiner Ausschnitt gebraucht wird.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 6,
    order: 10,
    sourceIds: ['eu-gdpr', 'digcomp-30'],
    reviewStatus: ReviewStatus.Published,
    lastReviewed: '2026-07-13',
    pathId: 'path-beginner'
  },
  {
    id: 'l11',
    title: 'KI im Alltag und Beruf sinnvoll nutzen',
    description: 'Typische sichere Einsatzfelder und klare Vorsichtsbereiche unterscheiden.',
    content: `Lernziel:
Du kannst typische sichere Einsatzfelder erkennen und weißt, wann du vorsichtiger sein musst.

Einfach erklärt:
KI kann im Alltag und Beruf helfen, Texte zu verbessern, Ideen zu sammeln, Lernpläne zu machen, einfache Begriffe zu erklären oder Notizen zu strukturieren. Bei wichtigen Entscheidungen brauchst du aber zusätzliche Prüfung.

Mini-Beispiel:
Gut geeignet: "Fasse meine eigenen Notizen in 5 Stichpunkten zusammen."
Vorsicht: "Entscheide, ob ich diesen Vertrag unterschreiben soll."

Sicher arbeiten:
Sortiere Aufgaben in drei Gruppen: gut für KI, nur mit Prüfung, lieber Fachperson oder verlässliche Quelle.

Typischer Fehler:
Man nutzt KI für Entscheidungen, die Verantwortung, Haftung oder persönliche Folgen haben.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 8,
    order: 11,
    sourceIds: ['eu-ai-act', 'nist-ai-rmf', 'oecd-ai-principles'],
    reviewStatus: ReviewStatus.Published,
    lastReviewed: '2026-07-13',
    pathId: 'path-beginner'
  },
  {
    id: 'l12',
    title: 'Abschluss-Check: Nutze KI sicherer',
    description: 'Die wichtigsten Grundlagen wiederholen und sicher anwenden.',
    content: `Lernziel:
Du prüfst, ob du die Grundlagen verstanden hast und KI sicherer starten kannst.

Einfach erklärt:
Du bist nach diesem Pfad kein KI-Experte. Aber du kannst jetzt besser fragen, Antworten einordnen, persönliche Daten schützen und wichtige Aussagen prüfen.

Mini-Beispiel:
Sicherer Start: "Erkläre mir diesen selbst geschriebenen Text einfacher. Verändere keine Fakten. Nenne am Ende, welche Aussagen ich prüfen sollte."

Sicher arbeiten:
Nutze die Grundregel: erst allgemein fragen, dann Antwort prüfen, dann wichtige Fakten mit Quellen absichern.

Typischer Fehler:
Man glaubt, nach den ersten Erfolgen könne KI alles zuverlässig. Gerade dann bleibt Prüfung wichtig.`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 6,
    order: 12,
    sourceIds: ['digcomp-30', 'nist-ai-rmf', 'eu-gdpr'],
    reviewStatus: ReviewStatus.Published,
    lastReviewed: '2026-07-13',
    pathId: 'path-beginner'
  }
];
