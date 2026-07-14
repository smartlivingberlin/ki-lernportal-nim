import type { LessonPractice } from "./types";

export const practiceByLessonId = {
  "l1": {
    task: "Nenne drei Situationen, in denen KI dir im Alltag helfen könnte. Markiere danach eine Situation, bei der du die Antwort unbedingt prüfen würdest.",
    checkQuestions: [
      "Erkläre KI in einem Satz.",
      "Denkt KI wie ein Mensch?",
      "Warum solltest du wichtige Antworten prüfen?",
    ],
    hint: "Denke an drei einfache Bereiche: Schreiben, Planen und Erklären. Besonders genau solltest du Antworten prüfen, wenn Gesundheit, Recht, Geld, persönliche Daten oder aktuelle Fakten betroffen sind.",
    sampleAnswer: "KI könnte mir helfen, eine E-Mail freundlicher zu formulieren, einen Wochenplan zu erstellen und einen schwierigen Begriff einfach zu erklären. Eine Antwort zu einer medizinischen, rechtlichen oder finanziellen Frage würde ich nicht ungeprüft übernehmen, sondern mit einer verlässlichen Quelle oder einer geeigneten Fachperson prüfen.",
    selfCheck: [
      "Ich habe drei konkrete Alltagssituationen genannt.",
      "Ich habe mindestens eine Situation mit erhöhtem Risiko markiert.",
      "Ich habe erklärt, warum dort eine zusätzliche Prüfung nötig ist.",
    ],
  },
  "l2": {
    task: "Schreibe zwei Aufgaben auf, die du KI geben würdest, und zwei Aufgaben, bei denen du zusätzlich eine Quelle oder einen Experten brauchst.",
    checkQuestions: [
      "Nenne eine gute Aufgabe für KI.",
      "Nenne eine Aufgabe, bei der du vorsichtig sein musst.",
      "Warum ersetzt KI keine Fachprüfung?",
    ],
    hint: "Unterscheide zwischen Entwurfsaufgaben und Entscheidungen mit möglichen Folgen. Formulieren, Sortieren und Ideenfinden sind meist geeigneter als medizinische, rechtliche oder finanzielle Entscheidungen.",
    sampleAnswer: "Geeignete Aufgaben wären: eine E-Mail verständlicher formulieren und Ideen für einen Lernplan sammeln. Vorsichtig wäre ich bei der Bewertung gesundheitlicher Beschwerden und bei der Prüfung eines Vertrages. Dort brauche ich zusätzlich aktuelle, verlässliche Quellen oder eine passende Fachperson.",
    selfCheck: [
      "Ich habe zwei geeignete KI-Aufgaben genannt.",
      "Ich habe zwei Aufgaben mit zusätzlichem Prüfbedarf genannt.",
      "Ich habe erklärt, wann eine Quelle oder Fachperson notwendig ist.",
    ],
  },
  "l3": {
    task: "Formuliere eine harmlose Frage an KI zu einem Alltagsthema. Prüfe danach, ob du persönliche Daten entfernen kannst.",
    checkQuestions: [
      "Welche Daten gehören nicht in einen Prompt?",
      "Was ist ein Platzhalter?",
      "Warum ist eine allgemeine Beschreibung oft sicherer?",
    ],
    hint: "Wähle ein ungefährliches Alltagsthema. Verwende keine echten Namen, Adressen, Telefonnummern, Kontodaten, Passwörter, Gesundheitsdaten oder vertraulichen Dokumente.",
    sampleAnswer: "Erkläre mir in einfacher Sprache, wie ich einen Wochenplan für Lernen, Einkaufen und Erholung erstellen kann. Nutze eine kurze Tabelle. Verwende keine persönlichen Daten und stelle keine Vermutungen über meine private Situation an.",
    selfCheck: [
      "Meine Frage behandelt ein harmloses Alltagsthema.",
      "Ich habe keine echten personenbezogenen oder vertraulichen Daten verwendet.",
      "Ziel und gewünschte Antwortform sind verständlich beschrieben.",
    ],
  },
  "l4": {
    task: "Verbessere diesen Prompt: \"Mach mir einen Text.\" Ergänze Ziel, Zielgruppe, Länge, Stil und Thema.",
    checkQuestions: [
      "Was ist ein Prompt?",
      "Warum ist \"Schreib was\" zu ungenau?",
      "Welche vier Angaben machen einen Prompt klarer?",
    ],
    hint: "Ergänze fünf Angaben: Thema, Ziel, Zielgruppe, gewünschte Länge und gewünschter Stil. Sage außerdem, welche Fakten nicht verändert oder erfunden werden dürfen.",
    sampleAnswer: "Schreibe einen freundlichen Informationstext über sicheres Arbeiten mit KI. Der Text ist für Menschen ohne technische Vorkenntnisse. Er soll höchstens 120 Wörter lang sein, kurze Sätze verwenden und keine unbelegten Versprechen oder neuen Fakten hinzufügen.",
    selfCheck: [
      "Thema und Ziel des Textes sind eindeutig.",
      "Zielgruppe, Länge und Stil sind festgelegt.",
      "Ich habe eine klare Grenze gegen erfundene oder veränderte Fakten gesetzt.",
    ],
  },
  "l5": {
    task: "Schreibe einen Prompt für eine E-Mail-Verbesserung. Lege fest: Ton, Länge, Empfänger und was nicht verändert werden soll.",
    checkQuestions: [
      "Welche fünf Teile hat die Prompt-Formel?",
      "Warum hilft eine Grenze im Prompt?",
      "Was passiert, wenn ein Prompt zu viele Aufgaben enthält?",
    ],
    hint: "Nutze die Reihenfolge Rolle, Aufgabe, Kontext, Format und Grenze. Nicht jeder Prompt braucht alle fünf Teile, aber das Ergebnis muss eindeutig und prüfbar bleiben.",
    sampleAnswer: "Du bist ein geduldiger Schreibassistent. Überarbeite meine selbst geschriebene E-Mail für einen geschäftlichen Empfänger. Formuliere freundlich, sachlich und leicht verständlich. Gib nur die überarbeitete E-Mail mit höchstens 150 Wörtern aus. Verändere keine Namen, Daten, Beträge oder sonstigen Fakten.",
    selfCheck: [
      "Rolle und konkrete Aufgabe sind genannt.",
      "Kontext und gewünschtes Ausgabeformat sind verständlich.",
      "Eine klare Grenze schützt Fakten und Inhalt vor Veränderungen.",
    ],
  },
  "l6": {
    task: "Schreibe einen neutralen kurzen Text und lasse ihn höflicher formulieren. Prüfe danach: Wurde etwas erfunden oder verfälscht?",
    checkQuestions: [
      "Wofür kann KI bei Texten helfen?",
      "Welche Daten solltest du vorher entfernen?",
      "Was musst du nach der KI-Antwort prüfen?",
    ],
    hint: "Nutze nur einen selbst geschriebenen, neutralen Beispieltext. Vergleiche danach Satz für Satz, ob Namen, Termine, Zahlen, Zusagen oder Bedeutungen verändert wurden.",
    sampleAnswer: "Ausgangstext: Bitte senden Sie mir die Unterlagen bis Freitag. Überarbeitete Fassung: Könnten Sie mir die Unterlagen bitte bis Freitag zusenden? Vielen Dank. Beim Vergleich wurden weder der Termin noch die Aussage verändert. Es wurden auch keine neuen Fakten ergänzt.",
    selfCheck: [
      "Der Ausgangstext enthält keine vertraulichen Daten.",
      "Die überarbeitete Fassung behält alle ursprünglichen Fakten bei.",
      "Ich habe geprüft, ob die KI etwas ergänzt, entfernt oder verfälscht hat.",
    ],
  },
  "l7": {
    task: "Lass dir 5 Ideen geben. Streiche 2 schlechte Ideen. Verbessere 1 gute Idee mit eigenen Worten.",
    checkQuestions: [
      "Sind KI-Ideen automatisch richtig?",
      "Was machst du mit schlechten Vorschlägen?",
      "Wann musst du Fakten zusätzlich prüfen?",
    ],
    hint: "Bewerte die Vorschläge nach Nutzen, Verständlichkeit und möglichem Risiko. Eine Idee darf verworfen werden. Gute Ideen solltest du mit eigenen Worten konkretisieren.",
    sampleAnswer: "Von fünf Vorschlägen habe ich zwei gestrichen, weil sie zu allgemein und nicht umsetzbar waren. Eine brauchbare Idee war eine kurze Schritt-für-Schritt-Erklärung. Ich habe sie verbessert: Statt nur den Begriff zu erklären, soll die Erklärung zusätzlich ein Alltagsbeispiel und eine kleine Kontrollfrage enthalten.",
    selfCheck: [
      "Ich habe mehrere Vorschläge kritisch miteinander verglichen.",
      "Ich habe ungeeignete Vorschläge begründet aussortiert.",
      "Ich habe mindestens eine gute Idee mit eigenen Worten verbessert.",
    ],
  },
  "l8": {
    task: "Nimm eine KI-Antwort mit einer konkreten Behauptung. Markiere alle Fakten, die du vor Veröffentlichung prüfen müsstest.",
    checkQuestions: [
      "Was ist eine Halluzination?",
      "Warum reicht \"Bist du sicher?\" nicht aus?",
      "Welche Warnzeichen solltest du erkennen?",
    ],
    hint: "Markiere besonders Namen, Zahlen, Daten, Preise, Zitate, Quellen, Gesetze und angeblich sichere Aussagen. Eine überzeugende Formulierung ist noch kein Beweis.",
    sampleAnswer: "Beispielbehauptung: Der Kurs kostet 99 Euro, ist staatlich anerkannt und führt garantiert zu einer Arbeitsstelle. Prüfen müsste ich den Preis, die behauptete Anerkennung und das Garantieversprechen. Dafür brauche ich aktuelle Angaben des Anbieters, eine zuständige offizielle Stelle und eine klare Erklärung, was tatsächlich zugesagt wird.",
    selfCheck: [
      "Ich habe alle konkreten Fakten und Versprechen markiert.",
      "Ich habe passende Quellenarten für die Prüfung genannt.",
      "Ich habe zwischen überzeugender Sprache und belegbaren Tatsachen unterschieden.",
    ],
  },
  "l9": {
    task: "Wähle eine Behauptung aus einer KI-Antwort. Suche eine Quelle dazu und notiere: Herausgeber, Datum und passende Aussage.",
    checkQuestions: [
      "Was ist eine Quelle?",
      "Warum ist eine Erklärung noch kein Beleg?",
      "Welche drei Fragen helfen beim Prüfen einer Quelle?",
    ],
    hint: "Prüfe drei Dinge: Wer veröffentlicht die Information, wann wurde sie aktualisiert und ob die Quelle genau die konkrete Behauptung stützt.",
    sampleAnswer: "Für eine Behauptung über eine Regel würde ich zuerst die zuständige Behörde oder den offiziellen Gesetzestext suchen. Ich notiere den Herausgeber, das Veröffentlichungs- oder Aktualisierungsdatum und den genauen Abschnitt, der zur Behauptung passt. Eine allgemeine Startseite oder ein Suchtreffer reicht nicht als Beleg.",
    selfCheck: [
      "Der Herausgeber der Quelle ist klar erkennbar.",
      "Datum und Aktualität der Information wurden geprüft.",
      "Die gefundene Textstelle stützt genau die untersuchte Behauptung.",
    ],
  },
  "l10": {
    task: "Schreibe einen unsicheren Prompt in eine sichere Version um. Entferne alle persönlichen Daten und ersetze sie durch neutrale Platzhalter.",
    checkQuestions: [
      "Nenne drei sensible Datenarten.",
      "Warum sind Platzhalter hilfreich?",
      "Warum solltest du keine ganzen vertraulichen Dokumente kopieren?",
    ],
    hint: "Ersetze echte Personen, Orte, Beträge und Vorgangsnummern durch neutrale Bezeichnungen. Teile nur Informationen, die für die Aufgabe wirklich erforderlich sind.",
    sampleAnswer: "Unsicher: Formuliere eine Mahnung an Max Mustermann aus der Musterstraße 5 wegen der offenen Rechnung 4711 über 850 Euro. Sicherer: Formuliere eine sachliche Zahlungserinnerung an Person A wegen eines offenen Betrags. Verwende keine Namen, Adressen, Kontodaten, Vorgangsnummern oder Vertragsdetails.",
    selfCheck: [
      "Namen, Adressen und Identifikationsnummern wurden entfernt.",
      "Sensible Beträge oder Vertragsdetails wurden verallgemeinert.",
      "Der verbleibende Kontext reicht trotzdem aus, um die Aufgabe zu bearbeiten.",
    ],
  },
  "l11": {
    task: "Sortiere diese Aufgaben: E-Mail verbessern, medizinische Symptome bewerten, Lernplan erstellen, Vertrag prüfen, Ideen sammeln, aktuelle Rechtslage erklären.",
    checkQuestions: [
      "Nenne zwei sichere KI-Aufgaben.",
      "Nenne zwei Aufgaben mit Vorsicht.",
      "Wann brauchst du eine Fachperson oder verlässliche Quelle?",
    ],
    hint: "Bilde drei Gruppen: gut als Unterstützung, nur mit zusätzlicher Prüfung und besser mit einer geeigneten Fachperson oder verlässlichen Primärquelle.",
    sampleAnswer: "Gut als Unterstützung: E-Mail verbessern, Lernplan erstellen und Ideen sammeln. Nur mit zusätzlicher Prüfung: aktuelle Rechtslage erklären. Besser mit einer Fachperson oder besonders verlässlichen Quelle: medizinische Symptome bewerten und einen Vertrag rechtlich prüfen. KI darf dort höchstens beim Strukturieren von Fragen helfen.",
    selfCheck: [
      "Alle vorgegebenen Aufgaben wurden einer Gruppe zugeordnet.",
      "Aufgaben mit möglichen gesundheitlichen, rechtlichen oder finanziellen Folgen wurden vorsichtig eingeordnet.",
      "Ich habe erklärt, welche Rolle KI trotz notwendiger Fachprüfung übernehmen kann.",
    ],
  },
  "l12": {
    task: "Beantworte die fünf Abschlussfragen: Was ist KI? Was ist ein Prompt? Welche Daten gehören nicht in KI-Systeme? Wann musst du prüfen? Was machst du, wenn KI sehr sicher klingt, aber keine Quelle nennt?",
    checkQuestions: [
      "Kannst du KI in einfachen Worten erklären?",
      "Kannst du einen sicheren Prompt schreiben?",
      "Kannst du eine KI-Antwort kritisch prüfen?",
    ],
    hint: "Beantworte jede Frage in wenigen eigenen Sätzen. Nutze die Grundregel: allgemein fragen, private Daten schützen, Aussagen prüfen und wichtige Fakten mit geeigneten Quellen absichern.",
    sampleAnswer: "KI erzeugt Antworten aus gelernten Mustern, denkt aber nicht wie ein Mensch und kann Fehler machen. Ein Prompt ist meine Anweisung oder Frage an die KI. Namen, Adressen, Passwörter, Gesundheitsdaten und vertrauliche Dokumente gehören nicht ungeprüft in KI-Systeme. Prüfen muss ich besonders aktuelle, rechtliche, medizinische, finanzielle und andere folgenreiche Aussagen. Klingt eine Antwort sicher, nennt aber keinen belastbaren Beleg, suche ich eine geeignete Primärquelle oder frage eine passende Fachperson.",
    selfCheck: [
      "Ich habe KI und Prompt in eigenen Worten erklärt.",
      "Ich habe sensible Daten und Situationen mit besonderem Prüfbedarf genannt.",
      "Ich habe beschrieben, wie ich unbelegte oder verdächtige Antworten überprüfe.",
    ],
  },
} satisfies Record<string, LessonPractice>;
