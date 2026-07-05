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

Sicher arbeiten:
Nutze KI als Hilfe zum Verstehen und Formulieren. Prüfe wichtige Aussagen trotzdem selbst.

Typischer Fehler:
Viele Menschen glauben, KI wisse automatisch die Wahrheit. Das stimmt nicht. KI kann überzeugend klingen und trotzdem falsch liegen.

Übung:
Nenne drei Situationen, in denen KI dir im Alltag helfen könnte. Markiere danach eine Situation, bei der du die Antwort unbedingt prüfen würdest.

Mini-Check:
1. Erkläre KI in einem Satz.
2. Denkt KI wie ein Mensch?
3. Warum solltest du wichtige Antworten prüfen?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 5,
    order: 1,
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
Man übernimmt KI-Antworten ungeprüft, nur weil sie klar und professionell klingen.

Übung:
Schreibe zwei Aufgaben auf, die du KI geben würdest, und zwei Aufgaben, bei denen du zusätzlich eine Quelle oder einen Experten brauchst.

Mini-Check:
1. Nenne eine gute Aufgabe für KI.
2. Nenne eine Aufgabe, bei der du vorsichtig sein musst.
3. Warum ersetzt KI keine Fachprüfung?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 7,
    order: 2,
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
Man kopiert private Daten in den Prompt, obwohl eine allgemeine Beschreibung reichen würde.

Übung:
Formuliere eine harmlose Frage an KI zu einem Alltagsthema. Prüfe danach, ob du persönliche Daten entfernen kannst.

Mini-Check:
1. Welche Daten gehören nicht in einen Prompt?
2. Was ist ein Platzhalter?
3. Warum ist eine allgemeine Beschreibung oft sicherer?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 6,
    order: 3,
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
Der Prompt ist zu ungenau. Dann muss die KI raten, welches Ziel, welche Länge und welcher Stil gemeint sind.

Übung:
Verbessere diesen Prompt: "Mach mir einen Text." Ergänze Ziel, Zielgruppe, Länge, Stil und Thema.

Mini-Check:
1. Was ist ein Prompt?
2. Warum ist "Schreib was" zu ungenau?
3. Welche vier Angaben machen einen Prompt klarer?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 5,
    order: 4,
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
Man schreibt zu viele Themen in einen Prompt. Die Antwort wird dann lang, ungenau oder schwer prüfbar.

Übung:
Schreibe einen Prompt für eine E-Mail-Verbesserung. Lege fest: Ton, Länge, Empfänger und was nicht verändert werden soll.

Mini-Check:
1. Welche fünf Teile hat die Prompt-Formel?
2. Warum hilft eine Grenze im Prompt?
3. Was passiert, wenn ein Prompt zu viele Aufgaben enthält?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 8,
    order: 5,
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
Man übernimmt den fertigen Text sofort und merkt nicht, dass ein Detail geändert wurde.

Übung:
Schreibe einen neutralen kurzen Text und lasse ihn höflicher formulieren. Prüfe danach: Wurde etwas erfunden oder verfälscht?

Mini-Check:
1. Wofür kann KI bei Texten helfen?
2. Welche Daten solltest du vorher entfernen?
3. Was musst du nach der KI-Antwort prüfen?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 7,
    order: 6,
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
Man nimmt die erste Liste der KI als fertige Lösung, obwohl manche Ideen unpassend oder oberflächlich sind.

Übung:
Lass dir 5 Ideen geben. Streiche 2 schlechte Ideen. Verbessere 1 gute Idee mit eigenen Worten.

Mini-Check:
1. Sind KI-Ideen automatisch richtig?
2. Was machst du mit schlechten Vorschlägen?
3. Wann musst du Fakten zusätzlich prüfen?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 6,
    order: 7,
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
Man fragt die KI: "Bist du sicher?" und glaubt dann der Bestätigung. Besser ist echte Quellenprüfung.

Übung:
Nimm eine KI-Antwort mit einer konkreten Behauptung. Markiere alle Fakten, die du vor Veröffentlichung prüfen müsstest.

Mini-Check:
1. Was ist eine Halluzination?
2. Warum reicht "Bist du sicher?" nicht aus?
3. Welche Warnzeichen solltest du erkennen?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 8,
    order: 8,
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
Man verwechselt eine schöne Erklärung mit einem Beleg. Eine Erklärung ist hilfreich, aber noch kein Nachweis.

Übung:
Wähle eine Behauptung aus einer KI-Antwort. Suche eine Quelle dazu und notiere: Herausgeber, Datum und passende Aussage.

Mini-Check:
1. Was ist eine Quelle?
2. Warum ist eine Erklärung noch kein Beleg?
3. Welche drei Fragen helfen beim Prüfen einer Quelle?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 7,
    order: 9,
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
Man kopiert ganze Dokumente in einen Chat, obwohl nur ein kleiner Ausschnitt gebraucht wird.

Übung:
Schreibe einen unsicheren Prompt in eine sichere Version um. Entferne alle persönlichen Daten und ersetze sie durch neutrale Platzhalter.

Mini-Check:
1. Nenne drei sensible Datenarten.
2. Warum sind Platzhalter hilfreich?
3. Warum solltest du keine ganzen vertraulichen Dokumente kopieren?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 6,
    order: 10,
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
Man nutzt KI für Entscheidungen, die Verantwortung, Haftung oder persönliche Folgen haben.

Übung:
Sortiere diese Aufgaben: E-Mail verbessern, medizinische Symptome bewerten, Lernplan erstellen, Vertrag prüfen, Ideen sammeln, aktuelle Rechtslage erklären.

Mini-Check:
1. Nenne zwei sichere KI-Aufgaben.
2. Nenne zwei Aufgaben mit Vorsicht.
3. Wann brauchst du eine Fachperson oder verlässliche Quelle?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 8,
    order: 11,
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
Man glaubt, nach den ersten Erfolgen könne KI alles zuverlässig. Gerade dann bleibt Prüfung wichtig.

Übung:
Beantworte die fünf Abschlussfragen: Was ist KI? Was ist ein Prompt? Welche Daten gehören nicht in KI-Systeme? Wann musst du prüfen? Was machst du, wenn KI sehr sicher klingt, aber keine Quelle nennt?

Mini-Check:
1. Kannst du KI in einfachen Worten erklären?
2. Kannst du einen sicheren Prompt schreiben?
3. Kannst du eine KI-Antwort kritisch prüfen?`,
    difficulty: DifficultyLevel.Beginner,
    estimatedMinutes: 6,
    order: 12,
    pathId: 'path-beginner'
  }
];
