import type { MicroLearningUnitV2 } from "./types";

const REVIEWED = "2026-08-10";

/**
 * Themenwelt „Bilder, Audio & Video“ — Schema v2.
 * Einstieg in multimodale KI ohne Lektions-Verknüpfung.
 */
export const microUnitsMultimodal: MicroLearningUnitV2[] = [
  {
    id: "mu-multi-01",
    worldId: "world-multimodal",
    lessonId: null,
    order: 1,
    title: "Was heißt multimodal — ohne Fachchinesisch?",
    whyUseful:
      "Du verstehst, dass KI nicht nur Text kann — und wo die Grenzen liegen.",
    oneSentence:
      "Multimodal heißt: KI arbeitet mit mehreren Medienarten, z. B. Text, Bild, Ton oder Video.",
    everydayExample:
      "Du beschreibst ein Geburtstagskuchen-Motiv in Worten — und bekommst einen Bildvorschlag. Oder du lässt ein Foto grob beschreiben.",
    steps: [
      "Merke: Text ist nur eine Eingabe-Art unter mehreren.",
      "Unterscheide Erzeugen (neu) und Beschreiben (vorhandenes Medium).",
      "Frage immer: Wofür brauche ich das Ergebnis?",
    ],
    practiceTask:
      "Nenne drei Situationen aus deinem Alltag, in denen Bild- oder Tonhilfe nützlich wäre.",
    samplePath:
      "1) Einladungsgrafik-Idee 2) Foto der Packungsbeilage erklären lassen 3) Kurze Audio-Notiz strukturieren",
    whyItWorks:
      "Klarheit über Medienarten verhindert falsche Erwartungen an „die eine KI“.",
    commonMistake:
      "Annehmen, multimodale KI „sieht“ und „hört“ wie ein Mensch mit Verständnis.",
    safetyNote:
      "Keine privaten Fotos von Menschen, Ausweisen oder Dokumenten ungefragt hochladen.",
    retrievalQuestions: [
      "Was bedeutet multimodal?",
      "Nenne zwei Medienarten außer Text.",
      "Was ist der Unterschied zwischen Erzeugen und Beschreiben?",
    ],
    teachBackPrompt:
      "Erklär multimodal in einem Satz mit einem Alltagsbeispiel.",
    sourceIds: ["digcomp-30", "nist-genai-profile"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-worked-example", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-multi-02",
    worldId: "world-multimodal",
    lessonId: null,
    order: 2,
    title: "Gute Bild-Prompts: Motiv, Stil, Grenze",
    whyUseful:
      "Mit klaren Bausteinen bekommst du brauchbarere Bildvorschläge und weniger Zufall.",
    oneSentence:
      "Sag Motiv, Stil, Format und was nicht erscheinen soll — dann steuerst du das Ergebnis besser.",
    everydayExample:
      "Schwach: „schönes Bild.“ Besser: „Flache Illustration eines Küchentischs mit Obstschale, hell, ohne Text, ohne Logos.“",
    steps: [
      "Motiv in einem Satz nennen.",
      "Stil und Format ergänzen (z. B. einfach, quer).",
      "Grenze setzen: keine Personen, keine Marken, kein Text im Bild.",
    ],
    practiceTask:
      "Schreibe einen Bild-Prompt mit Motiv, Stil und einer klaren Grenze.",
    samplePath:
      "„Ruhige Aquarell-Skizze eines Fahrrads vor Café, Querformat, keine Menschen, keine Markennamen.“",
    whyItWorks:
      "Grenzen reduzieren unerwünschte Details und Rechtsrisiken.",
    commonMistake:
      "Nur Stimmungswörter tippen und sich über chaotische Ergebnisse wundern.",
    safetyNote:
      "Keine realen Personenfotos als Vorlage ohne Einwilligung nutzen.",
    retrievalQuestions: [
      "Welche drei Bausteine hat ein guter Bild-Prompt?",
      "Wozu dient die Grenze?",
      "Warum sind Marken riskant?",
    ],
    teachBackPrompt:
      "Sag die Bild-Prompt-Formel laut in eigenen Worten.",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-playful", "method-retrieval"],
  },
  {
    id: "mu-multi-03",
    worldId: "world-multimodal",
    lessonId: null,
    order: 3,
    title: "Qualität prüfen: Was stimmt am Bild nicht?",
    whyUseful:
      "Du lernst, Fehler zu sehen, bevor du ein Bild teilst oder druckst.",
    oneSentence:
      "Prüfe Hände, Text im Bild, Logik der Szene und ob etwas erfunden oder verzerrt wirkt.",
    everydayExample:
      "Ein KI-Bild zeigt eine Speisekarte mit wirren Buchstaben — hübsch, aber unbrauchbar für Gäste.",
    steps: [
      "Zoom auf Details: Hände, Gesichter, Schrift.",
      "Logik-Check: Passt Licht, Perspektive, Gegenstand?",
      "Zweck-Check: Reicht es für deine Nutzung — oder brauchst du ein Originalfoto?",
    ],
    practiceTask:
      "Liste fünf Prüfpunkte für ein KI-Bild vor dem Teilen.",
    samplePath:
      "1) Schrift lesbar? 2) Hände okay? 3) Marken frei? 4) Personen freigegeben? 5) Zweck erfüllt?",
    whyItWorks:
      "Ein kurzer Qualitäts-Check verhindert peinliche oder irreführende Veröffentlichungen.",
    commonMistake:
      "Nur den Gesamteindruck bewerten und Details übersehen.",
    safetyNote:
      "Irreführende Bilder nicht als echte Fotos ausgeben.",
    retrievalQuestions: [
      "Welche Details prüfst du zuerst?",
      "Wann reicht ein KI-Bild nicht?",
      "Warum ist Schrift im Bild oft problematisch?",
    ],
    teachBackPrompt:
      "Beschreibe deinen Bild-Qualitätscheck in drei Schritten.",
    sourceIds: ["nist-genai-profile", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-retrieval", "method-confidence", "method-scenario"],
  },
  {
    id: "mu-multi-04",
    worldId: "world-multimodal",
    lessonId: null,
    order: 4,
    title: "Rechte und Herkunft bei Medien",
    whyUseful:
      "Du vermeidest Streit um Bilder, Stimmen und fremde Werke.",
    oneSentence:
      "Kläre vor der Nutzung: Darf ich dieses Medium teilen, bearbeiten oder kommerziell verwenden?",
    everydayExample:
      "Ein KI-Bild für die Vereins-Website: Regeln des Tools und Vereinsregeln prüfen — nicht blind als „frei“ annehmen.",
    steps: [
      "Zweck nennen (privat, Verein, Werbung).",
      "Tool-Bedingungen und Lizenzen grob lesen.",
      "Bei Unsicherheit: eigenes Foto oder klar freigegebenes Material nutzen.",
    ],
    practiceTask:
      "Schreibe drei Fragen, die du vor der Nutzung eines KI-Bildes stellst.",
    samplePath:
      "1) Privat oder öffentlich? 2) Was erlaubt das Tool? 3) Personen erkennbar?",
    whyItWorks:
      "Rechtefragen vor dem Teilen sind billiger als danach.",
    commonMistake:
      "„KI hat’s gemacht“ mit „ich darf alles“ verwechseln.",
    safetyNote:
      "Stimmen und Gesichter anderer Menschen nicht ohne Einwilligung nachahmen oder veröffentlichen.",
    retrievalQuestions: [
      "Was klärst du vor der Nutzung?",
      "Warum reicht „KI-generiert“ nicht als Freibrief?",
      "Wann ist ein eigenes Foto sicherer?",
    ],
    teachBackPrompt:
      "Erklär die Regel „Zweck + Erlaubnis prüfen“ an einem Beispiel.",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-scenario", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-multi-05",
    worldId: "world-multimodal",
    lessonId: null,
    order: 5,
    title: "Audio und Transkript: sinnvoll und sparsam",
    whyUseful:
      "Du nutzt Audio-Hilfe für Notizen — ohne private Gespräche ungefragt preiszugeben.",
    oneSentence:
      "Transkription hilft beim Strukturieren; sensible Gespräche gehören nicht in fremde Systeme.",
    everydayExample:
      "Eigene Einkaufs-Sprachnotiz zusammenfassen lassen — okay. Team-Feedbackgespräch mit Namen hochladen — oft tabu.",
    steps: [
      "Prüfe Einwilligung und Sensibilität des Inhalts.",
      "Nutze kurze, eigene Aufnahmen statt langer Meetings.",
      "Gegenlese das Transkript auf Fehler und peinliche Details.",
    ],
    practiceTask:
      "Formuliere eine Regel, wann du Audio nie hochladen würdest.",
    samplePath:
      "„Keine Aufnahmen mit Kund:innen, Gesundheits- oder Personalthemen in öffentliche Tools.“",
    whyItWorks:
      "Audio enthält oft mehr Identifizierbares als Text — Vorsicht zahlt sich aus.",
    commonMistake:
      "Ganze Meetings „zur Zusammenfassung“ ohne Zustimmung hochladen.",
    safetyNote:
      "Stimmen und Gespräche können personenbezogene Daten sein — sparsam und mit Erlaubnis.",
    retrievalQuestions: [
      "Wann ist Transkription hilfreich?",
      "Warum ist Audio oft sensibler?",
      "Was prüfst du vor dem Upload?",
    ],
    teachBackPrompt:
      "Sag in einem Satz deine Audio-Sicherheitsregel.",
    sourceIds: ["eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-progressive", "method-retrieval"],
  },
  {
    id: "mu-multi-06",
    worldId: "world-multimodal",
    lessonId: null,
    order: 6,
    title: "Video-Ideen skizzieren — ohne Hollywood-Erwartung",
    whyUseful:
      "Du planst kurze Clips realistisch und prüfst Inhalte, bevor etwas „fertig“ wirkt.",
    oneSentence:
      "Nutze KI für Storyboard und Stichworte — fertige Videos brauchen trotzdem Prüfung und oft menschliches Schneiden.",
    everydayExample:
      "Drei Einstellungen für ein Vereins-Kurzvideo skizzieren lassen: Intro, Demo, Call-to-Action — dann selbst filmen oder freigeben.",
    steps: [
      "Ziel und Länge festlegen (z. B. 30 Sekunden).",
      "Drei Szenen in Stichpunkten anfordern.",
      "Fakten, Logos und Personenrechte vor dem Dreh prüfen.",
    ],
    practiceTask:
      "Schreibe einen Prompt für ein 30-Sekunden-Storyboard ohne Markennamen.",
    samplePath:
      "„Skizziere 3 Szenen für ein 30-Sekunden-Tutorial ‚Pflanzen gießen‘, einfache Sprache, keine Logos.“",
    whyItWorks:
      "Struktur zuerst spart Zeit und enttäuscht weniger bei der Technik.",
    commonMistake:
      "Erwarten, dass ein Klick ein perfektes, rechtssicheres Video liefert.",
    safetyNote:
      "Deepfake-ähnliche Nachahmung realer Personen vermeiden und kennzeichnen, wenn synthetisch.",
    retrievalQuestions: [
      "Wofür ist KI bei Video zuerst gut?",
      "Was legst du vor dem Prompt fest?",
      "Warum Prüfung vor dem Veröffentlichen?",
    ],
    teachBackPrompt:
      "Erklär den Unterschied zwischen Storyboard-Hilfe und fertigem Video.",
    sourceIds: ["nist-genai-profile", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-scenario", "method-retrieval"],
  },
  {
    id: "mu-multi-07",
    worldId: "world-multimodal",
    lessonId: null,
    order: 7,
    title: "Deepfakes und Misstrauen: gesunde Skepsis",
    whyUseful:
      "Du teilst weniger Fakes und erkennst, wann Medien bewusst täuschen können.",
    oneSentence:
      "Wenn ein Bild oder Clip dramatisch wirkt, prüfe Quelle und Kontext — besonders bei Politik, Geld und Skandalen.",
    everydayExample:
      "Ein „Beweisvideo“ in der Familiengruppe: erst offizielle Quelle suchen, nicht weiterleiten.",
    steps: [
      "Stopp vor dem Teilen.",
      "Frage: Wer hat es veröffentlicht und wann?",
      "Suche eine unabhängige Bestätigung.",
    ],
    practiceTask:
      "Formuliere drei Fragen vor dem Weiterleiten eines Clips.",
    samplePath:
      "1) Quelle? 2) Datum? 3) Passt der Kontext — oder ist etwas herausgeschnitten?",
    whyItWorks:
      "Misstrauen bei Medien ist eine digitale Kompetenz — kein Misstrauen gegen Menschen generell.",
    commonMistake:
      "„Sieht echt aus“ mit „ist echt“ gleichsetzen.",
    safetyNote:
      "Keine gefälschten Medien von realen Personen erstellen oder verbreiten.",
    retrievalQuestions: [
      "Wann brauchst du extra Skepsis?",
      "Was prüfst du vor dem Teilen?",
      "Warum reicht „sieht echt aus“ nicht?",
    ],
    teachBackPrompt:
      "Erklär das Stopp-Ritual für verdächtige Medienclips.",
    sourceIds: ["nist-genai-profile", "nist-ai-rmf", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-multi-08",
    worldId: "world-multimodal",
    lessonId: null,
    order: 8,
    title: "Abschluss: Dein Medien-Werkzeugkasten",
    whyUseful:
      "Du nimmst eine wiederholbare Routine für Bilder, Audio und Video mit.",
    oneSentence:
      "Klar prompten → Rechte prüfen → Qualität checken → bei Zweifel nicht teilen.",
    everydayExample:
      "Ob Vereinsflyer oder Sprachnotiz: dieselbe Reihenfolge hält dich sicher und klar.",
    steps: [
      "Wähle eine kleine Medienaufgabe für heute.",
      "Schreibe Prompt mit Motiv, Stil und Grenze.",
      "Prüfe Qualität und Rechte, bevor du speicherst oder teilst.",
    ],
    practiceTask:
      "Notiere deinen Medien-Werkzeugkasten in fünf Zeilen.",
    samplePath:
      "1) Zweck 2) Prompt-Bausteine 3) Rechte 4) Qualitätscheck 5) Mensch entscheidet",
    whyItWorks:
      "Routinen schützen besser als einzelne Tricks.",
    commonMistake:
      "Jedes Medium anders und ohne Check behandeln.",
    safetyNote:
      "Private Gesichter, Stimmen und Dokumente bleiben draußen, bis Erlaubnis und Zweck klar sind.",
    retrievalQuestions: [
      "Welche fünf Schritte gehören dazu?",
      "Was kommt vor dem Teilen?",
      "Warum Routine statt Zufall?",
    ],
    teachBackPrompt:
      "Erklär deinen Medien-Werkzeugkasten jemandem, der neu startet.",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-teachback", "method-progressive", "method-spaced"],
  },
  {
    id: "mu-multi-09",
    worldId: "world-multimodal",
    lessonId: null,
    order: 9,
    title: "Bild bearbeiten lassen — mit klarer Absicht",
    whyUseful:
      "Du steuerst Änderungen statt zufällig „schöner“ zu machen und wichtige Details zu verlieren.",
    oneSentence:
      "Sag genau, was bleiben und was sich ändern soll — und prüfe danach, ob der Zweck noch erfüllt ist.",
    everydayExample:
      "„Entferne den Hintergrund, behalte die Tasse scharf, keine neuen Logos, kein Text.“",
    steps: [
      "Ausgangsbild und Ziel in einem Satz nennen.",
      "Verbote setzen (keine Personen hinzufügen, keine Marken).",
      "Vorher/Nachher grob vergleichen.",
    ],
    practiceTask:
      "Schreibe einen Bearbeitungs-Prompt mit zwei Verboten.",
    samplePath:
      "„Helle den Hintergrund auf. Verboten: Gesichter ändern, Text einfügen.“",
    whyItWorks:
      "Klare Absicht reduziert unerwünschte Erfindungen im Bild.",
    commonMistake:
      "Nur „mach es besser“ tippen und Details verlieren.",
    safetyNote:
      "Fremde Personenfotos nicht ohne Einwilligung bearbeiten oder veröffentlichen.",
    retrievalQuestions: [
      "Was nennst du außer dem Ziel?",
      "Warum Verbote?",
      "Was vergleichst du danach?",
    ],
    teachBackPrompt:
      "Sag deine Bearbeitungs-Formel laut.",
    sourceIds: ["digcomp-30", "nist-genai-profile"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-worked-example", "method-playful", "method-retrieval"],
  },
  {
    id: "mu-multi-10",
    worldId: "world-multimodal",
    lessonId: null,
    order: 10,
    title: "Alt-Text und Beschreibung: inklusiv denken",
    whyUseful:
      "Du machst Bilder für mehr Menschen verständlich — und prüfst, was wirklich zu sehen ist.",
    oneSentence:
      "Beschreibe in kurzen Worten, was auf dem Bild wichtig ist — ohne erfundene Details.",
    everydayExample:
      "Statt „schönes Bild“: „Holzstuhl vor weißem Tisch, links eine grüne Pflanze, kein Text sichtbar.“",
    steps: [
      "Nenne die wichtigsten sichtbaren Elemente.",
      "Lass Unsichtbares oder Unklares weg bzw. markiere Unsicherheit.",
      "Prüfe, ob die Beschreibung zum Zweck passt (Barrierefreiheit, Archiv).",
    ],
    practiceTask:
      "Schreibe einen Alt-Text (max. 25 Wörter) für ein erfundenes Produktfoto.",
    samplePath:
      "„Blaue Keramiktasse auf Holztisch, Dampf steigt auf, Querformat.“",
    whyItWorks:
      "Gute Beschreibungen trainieren genaue Wahrnehmung — und helfen anderen.",
    commonMistake:
      "Stimmung dichten und Fakten erfinden, die nicht im Bild sind.",
    safetyNote:
      "Keine sensiblen Identifizierer in Beschreibungen aufnehmen, wenn nicht nötig.",
    retrievalQuestions: [
      "Was gehört in einen guten Alt-Text?",
      "Was lässt du weg?",
      "Warum keine erfundenen Details?",
    ],
    teachBackPrompt:
      "Erklär Alt-Text an einem Alltagsbeispiel.",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-retrieval", "method-teachback", "method-confidence"],
  },
  {
    id: "mu-multi-11",
    worldId: "world-multimodal",
    lessonId: null,
    order: 11,
    title: "Synthetische Medien kennzeichnen",
    whyUseful:
      "Du bleibst transparent und vermeidest, dass andere KI-Medien für echte Aufnahmen halten.",
    oneSentence:
      "Wenn ein Bild, Clip oder eine Stimme erzeugt oder stark verändert wurde, sage es klar — besonders öffentlich.",
    everydayExample:
      "Vereinsflyer: kleiner Hinweis „KI-generierte Illustration“ statt als Foto auszugeben.",
    steps: [
      "Entscheide: privat üben oder öffentlich teilen?",
      "Bei Öffentlich: Kennzeichnung und Zweck nennen.",
      "Keine realen Personen ohne Einwilligung nachahmen.",
    ],
    practiceTask:
      "Formuliere einen kurzen Kennzeichnungs-Satz für ein KI-Bild im Newsletter.",
    samplePath:
      "„Illustration mit KI erstellt; Motiv und Freigabe vom Redaktionsteam geprüft.“",
    whyItWorks:
      "Transparenz schützt Vertrauen — und passt zu verantwortlicher Nutzung.",
    commonMistake:
      "Synthetisches Material stillschweigend als Dokumentation ausgeben.",
    safetyNote:
      "Irreführende Deepfake-Nutzung realer Personen vermeiden.",
    retrievalQuestions: [
      "Wann kennzeichnest du?",
      "Was gehört in den Hinweis?",
      "Was ist bei Personen tabu?",
    ],
    teachBackPrompt:
      "Erklär, warum Kennzeichnung keine Schwäche ist.",
    sourceIds: ["nist-genai-profile", "oecd-ai-principles", "eu-ai-act"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-multi-12",
    worldId: "world-multimodal",
    lessonId: null,
    order: 12,
    title: "Abschluss: Medien sicher in den Alltag holen",
    whyUseful:
      "Du verbindest Prompt, Rechte, Qualität und Transparenz zu einer Gewohnheit.",
    oneSentence:
      "Zweck klären → sparsam hochladen → klar prompten → prüfen → Rechte & Kennzeichnung → erst dann teilen.",
    everydayExample:
      "Ob Sprachnotiz oder Flyer-Bild: dieselbe Reihenfolge hält dich ruhig und korrekt.",
    steps: [
      "Wähle eine kleine Medienaufgabe für diese Woche.",
      "Geh die sechs Schritte durch.",
      "Notiere eine Verbesserung fürs nächste Mal.",
    ],
    practiceTask:
      "Schreibe deine Medien-Alltagsregel in sechs Stichpunkten.",
    samplePath:
      "Zweck · Upload sparsam · Prompt · Qualität · Rechte/Kennzeichnung · Teilen oder lassen",
    whyItWorks:
      "Gewohnheit schützt besser als einzelne Warnungen.",
    commonMistake:
      "Nur bei Skandalen vorsichtig sein — und dazwischen alles hochladen.",
    safetyNote:
      "Private Gesichter, Stimmen und Dokumente bleiben draußen ohne Erlaubnis und klaren Zweck.",
    retrievalQuestions: [
      "Welche sechs Schritte gehören dazu?",
      "Was kommt vor dem Teilen?",
      "Warum Gewohnheit?",
    ],
    teachBackPrompt:
      "Führe jemanden durch deine Medien-Alltagsregel.",
    sourceIds: ["digcomp-30", "eu-gdpr", "nist-genai-profile"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-teachback", "method-spaced", "method-progressive"],
  },
];
