import type { MicroLearningUnitV2 } from "./types";

const REVIEWED = "2026-08-10";

/**
 * Themenwelt „Modelle verstehen“ — Schema v2.
 * Modellarten einordnen, ohne Hype und ohne Produktversprechen.
 */
export const microUnitsModels: MicroLearningUnitV2[] = [
  {
    id: "mu-models-01",
    worldId: "world-models",
    lessonId: null,
    order: 1,
    title: "Was ist ein „Modell“ — in Alltagssprache?",
    whyUseful:
      "Du hörst auf, „die KI“ als eine einzige Sache zu sehen, und wählst bewusster.",
    oneSentence:
      "Ein Modell ist ein trainiertes Programm, das zu einer Eingabe eine wahrscheinliche Ausgabe erzeugt — für bestimmte Aufgaben besser, für andere schlechter.",
    everydayExample:
      "Ein Chat-Modell formuliert Texte. Ein Bildmodell erzeugt Bilder. Beides heißt „KI“, braucht aber andere Eingaben und Prüfung.",
    steps: [
      "Merke: Modell = spezialisierte Mustererkennung, kein Allwissen.",
      "Frage immer: Welche Aufgabe habe ich?",
      "Erwarte Stärken und Schwächen statt Magie.",
    ],
    practiceTask:
      "Erkläre „Modell“ in zwei Sätzen ohne das Wort „Algorithmus“.",
    samplePath:
      "„Ein Modell ist wie ein sehr trainierter Vorschlagshelfer für eine Art von Aufgabe. Es kann irren und kennt nicht automatisch deine privaten Fakten.“",
    whyItWorks:
      "Eine ehrliche Definition verhindert Blindvertrauen und falsche Tool-Wahl.",
    commonMistake:
      "Glauben, ein neues Modell könne alles und ersetze Prüfung.",
    safetyNote:
      "Auch starke Modelle dürfen keine Geheimnisse und keine ungeprüften Entscheidungen übernehmen.",
    retrievalQuestions: [
      "Was erzeugt ein Modell?",
      "Warum gibt es verschiedene Modelle?",
      "Was ersetzt ein Modell nicht?",
    ],
    teachBackPrompt:
      "Sag einer Freundin in einem Satz, was ein KI-Modell ist.",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-worked-example", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-models-02",
    worldId: "world-models",
    lessonId: null,
    order: 2,
    title: "Chat-Modelle: stark bei Sprache, schwach bei Garantien",
    whyUseful:
      "Du nutzt Chat sinnvoll für Entwürfe — und weißt, wann Zahlen und Fakten riskant sind.",
    oneSentence:
      "Chat-Modelle sind gut im Formulieren und Strukturieren; sie garantieren keine Wahrheit.",
    everydayExample:
      "Mail höflicher machen: gut. Verbindliche Steuerberechnung nur aus dem Chat: riskant.",
    steps: [
      "Aufgabe als Entwurf formulieren.",
      "Unsichere Fakten markieren lassen.",
      "Wichtige Aussagen unabhängig prüfen.",
    ],
    practiceTask:
      "Schreibe einen Chat-Prompt, der Unsicherheiten explizit kennzeichnen soll.",
    samplePath:
      "„Erkläre in einfachen Worten. Kennzeichne Annahmen. Erfinde keine Zahlen.“",
    whyItWorks:
      "Du steuerst Erwartungen — und reduzierst Halluzinationsrisiko.",
    commonMistake:
      "Selbstsicheren Ton mit geprüfter Faktenlage verwechseln.",
    safetyNote:
      "Recht, Gesundheit und Geld: immer zusätzliche Quelle oder Fachperson.",
    retrievalQuestions: [
      "Wofür sind Chat-Modelle gut?",
      "Was garantieren sie nicht?",
      "Wie forderst du Unsicherheits-Kennzeichnung?",
    ],
    teachBackPrompt:
      "Wann ist ein Chat-Modell hilfreich — und wann riskant?",
    sourceIds: ["nist-genai-profile", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-models-03",
    worldId: "world-models",
    lessonId: null,
    order: 3,
    title: "Vision, Audio, Embedding — grob unterscheiden",
    whyUseful:
      "Du wählst nach Aufgabe: Bild beschreiben, Ton umwandeln oder Ähnlichkeit suchen.",
    oneSentence:
      "Vision arbeitet mit Bildern, Audio mit Ton, Embeddings mit Ähnlichkeit von Inhalten — alles andere Werkzeuge.",
    everydayExample:
      "Foto einer Speisekarte beschreiben lassen (Vision). Sprachnotiz zu Text (Audio). Ähnliche FAQ-Einträge finden (Embedding — oft hinter der Suche).",
    steps: [
      "Ordne deine Aufgabe einer Medienart zu.",
      "Frage: Brauche ich Erzeugen, Beschreiben oder Suchen?",
      "Prüfe Datenschutz für Uploads.",
    ],
    practiceTask:
      "Ordne fünf Alltagsaufgaben den Typen Chat / Vision / Audio zu.",
    samplePath:
      "Mail kürzen → Chat. Foto erklären → Vision. Meeting-Notiz → Audio (mit Erlaubnis).",
    whyItWorks:
      "Typ-Klarheit spart Experimente mit dem falschen Tool.",
    commonMistake:
      "Alles in denselben Chat tippen und hoffen, dass „die KI“ alles kann.",
    safetyNote:
      "Bilder und Ton können Identifizierbares enthalten — sparsam hochladen.",
    retrievalQuestions: [
      "Was macht Vision grob?",
      "Wofür sind Embeddings oft da?",
      "Warum Datenschutz bei Uploads?",
    ],
    teachBackPrompt:
      "Erklär den Unterschied zwischen Chat und Vision an einem Beispiel.",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-worked-example", "method-retrieval", "method-progressive"],
  },
  {
    id: "mu-models-04",
    worldId: "world-models",
    lessonId: null,
    order: 4,
    title: "Nach Aufgabe wählen — nicht nach Hype",
    whyUseful:
      "Du sparst Zeit und Geld, wenn du das passende Werkzeug statt des lautesten nimmst.",
    oneSentence:
      "Starte mit Aufgabe, Risiko und Daten — dann erst mit Modellnamen und Marketing.",
    everydayExample:
      "Brauche ich drei Stichpunkte aus meinen Notizen? Oft reicht ein einfaches Chat-Tool. Brauche ich keine brandneue „Super-KI“.",
    steps: [
      "Aufgabe in einem Satz schreiben.",
      "Daten und Risiko einschätzen.",
      "Einfachstes ausreichendes Tool wählen und Ergebnis prüfen.",
    ],
    practiceTask:
      "Vergleiche zwei Tools für dieselbe Aufgabe und notiere, welches „genug“ ist.",
    samplePath:
      "Aufgabe: Einladungstext. Risiko: gering. Daten: keine Geheimnisse. → einfaches Chat-Tool reicht.",
    whyItWorks:
      "Aufgabenfokus verhindert Feature-Jagd und Enttäuschung.",
    commonMistake:
      "Immer das neueste Modell wollen, obwohl die Aufgabe simpel ist.",
    safetyNote:
      "Neue Tools heißen nicht automatisch sicherer für private Daten.",
    retrievalQuestions: [
      "Was kommt vor dem Modellnamen?",
      "Wann reicht ein einfaches Tool?",
      "Warum ist Hype riskant?",
    ],
    teachBackPrompt:
      "Erklär die Regel „Aufgabe zuerst“ in eigenen Worten.",
    sourceIds: ["oecd-ai-principles", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-scenario", "method-teachback", "method-retrieval"],
  },
  {
    id: "mu-models-05",
    worldId: "world-models",
    lessonId: null,
    order: 5,
    title: "Kosten und Limits grob verstehen",
    whyUseful:
      "Du vermeidest Überraschungen bei Nutzungslimits und teuren Wiederholungen.",
    oneSentence:
      "Viele KI-Dienste haben Limits, Preise oder Wartezeiten — plane kurze, klare Anfragen statt Endlosschleifen.",
    everydayExample:
      "Statt zehnmal „nochmal anders“ ohne Ziel: einmal klar prompten, einmal nachbessern, dann entscheiden.",
    steps: [
      "Schau in den Einstellungen nach Limit-Hinweisen (ohne Geheimnisse zu teilen).",
      "Formuliere die erste Anfrage klar.",
      "Iteriere gezielt statt endlos.",
    ],
    practiceTask:
      "Schreibe eine Iterations-Regel mit maximal drei Nachbesserungen.",
    samplePath:
      "1) Klarer Prompt 2) Eine gezielte Nachbesserung 3) Prüfen und fertig oder anderes Tool",
    whyItWorks:
      "Bewusste Nutzung schützt Geld, Zeit und Nerven.",
    commonMistake:
      "Lange Dokumente und viele Runden „zum Spaß“ ohne Ziel.",
    safetyNote:
      "Bezahldienste brauchen oft Konten — keine Kartendaten in Chats tippen.",
    retrievalQuestions: [
      "Warum haben Dienste Limits?",
      "Wie sparst du Iterationen?",
      "Was tippst du nie in den Chat?",
    ],
    teachBackPrompt:
      "Wie erklärst du Kostenbewusstsein beim KI-Nutzen?",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-progressive", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-models-06",
    worldId: "world-models",
    lessonId: null,
    order: 6,
    title: "Open Models vs. Cloud-Dienste — Orientierung",
    whyUseful:
      "Du verstehst den Unterschied grob: wo läuft das Modell — und wer sieht deine Eingaben?",
    oneSentence:
      "Cloud-Dienste laufen oft beim Anbieter; lokale oder selbst gehostete Modelle können Daten näher bei dir halten — beides hat Vor- und Nachteile.",
    everydayExample:
      "Schneller öffentlicher Chat: praktisch, aber Eingaben können den Anbieter erreichen. Firmeninterne Lösung: oft strengere Regeln.",
    steps: [
      "Frage: Wo werden meine Eingaben verarbeitet?",
      "Frage: Welche Regeln und Freigaben gelten?",
      "Wähle sparsame Daten — egal welches Modell.",
    ],
    practiceTask:
      "Notiere zwei Vorteile und zwei Risiken von Cloud-Chats.",
    samplePath:
      "Vorteil: schnell, einfach. Risiko: Datenabfluss, unklare Speicherung. Gegenmittel: Platzhalter + Firmenregeln.",
    whyItWorks:
      "Standort und Regeln sind oft wichtiger als der Marketingname.",
    commonMistake:
      "„Open“ automatisch mit „sicher und kostenlos ohne Risiko“ gleichsetzen.",
    safetyNote:
      "Auch bei lokalen Tools: sensible Daten nur nach klarer Freigabe und Zweck.",
    retrievalQuestions: [
      "Was ist ein typischer Unterschied Cloud vs. lokal?",
      "Welche Frage stellst du zuerst?",
      "Warum bleibt Datensparsamkeit wichtig?",
    ],
    teachBackPrompt:
      "Erklär Cloud vs. lokal in zwei kurzen Sätzen.",
    sourceIds: ["eu-gdpr", "nist-ai-rmf", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-worked-example", "method-scenario", "method-retrieval"],
  },
  {
    id: "mu-models-07",
    worldId: "world-models",
    lessonId: null,
    order: 7,
    title: "Reasoning und „tiefes Nachdenken“ — realistisch",
    whyUseful:
      "Du erwartest bessere Zwischenschritte, aber keine magische Unfehlbarkeit.",
    oneSentence:
      "Manche Modelle zeigen längere Denkschritte — hilfreich bei Planung, aber weiterhin prüfpflichtig.",
    everydayExample:
      "Reiseplan in Schritten: nützlich. Verbindliche Rechtsauslegung nur aus dem „Denkprozess“: nicht ausreichend.",
    steps: [
      "Nutze Schritt-für-Schritt-Antworten für Struktur.",
      "Prüfe kritische Schritte einzeln.",
      "Lass Unsicherheiten markieren.",
    ],
    practiceTask:
      "Formuliere einen Prompt, der Schritte und Unsicherheiten verlangt.",
    samplePath:
      "„Plane in 5 Schritten. Kennzeichne Annahmen. Keine erfundenen Öffnungszeiten.“",
    whyItWorks:
      "Sichtbare Schritte machen Fehler leichter findbar — ersetzen aber keine Prüfung.",
    commonMistake:
      "Lange Begründung mit korrektem Ergebnis verwechseln.",
    safetyNote:
      "Auch ausführliche Antworten können falsche Fakten enthalten.",
    retrievalQuestions: [
      "Was bringt sichtbares „Nachdenken“?",
      "Was ersetzt es nicht?",
      "Wie forderst du Unsicherheits-Kennzeichnung?",
    ],
    teachBackPrompt:
      "Wann hilft Reasoning — und wann brauchst du trotzdem eine Quelle?",
    sourceIds: ["nist-genai-profile", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-retrieval", "method-playful"],
  },
  {
    id: "mu-models-08",
    worldId: "world-models",
    lessonId: null,
    order: 8,
    title: "Abschluss: Dein Modell-Entscheidungszettel",
    whyUseful:
      "Du hast eine kurze Checkliste für die nächste Tool-Wahl.",
    oneSentence:
      "Aufgabe → Daten & Risiko → Modelltyp → sparsam prompten → Ergebnis prüfen.",
    everydayExample:
      "Ob Chat, Bild oder Audio: derselbe Zettel verhindert Hype-Käufe und Datenunfälle.",
    steps: [
      "Schreibe die fünf Punkte auf eine Notiz.",
      "Wende sie auf eine reale Aufgabe an.",
      "Entscheide bewusst: nutzen, anpassen oder lassen.",
    ],
    practiceTask:
      "Fülle den Entscheidungszettel für eine Aufgabe aus deinem Alltag aus.",
    samplePath:
      "Aufgabe: Einladung. Daten: keine. Risiko: gering. Typ: Chat. Prompt klar. Prüfen: Ton und Datum.",
    whyItWorks:
      "Eine Checkliste bleibt, Modellnamen ändern sich.",
    commonMistake:
      "Jedes Mal neu raten, welches Modell „gerade angesagt“ ist.",
    safetyNote:
      "Kein Modell befreit dich von Datenschutz und Gegenlesen.",
    retrievalQuestions: [
      "Welche fünf Punkte stehen auf dem Zettel?",
      "Was kommt vor dem Modelltyp?",
      "Was kommt nach dem Prompt?",
    ],
    teachBackPrompt:
      "Führe jemanden durch deinen Modell-Entscheidungszettel.",
    sourceIds: ["digcomp-30", "oecd-ai-principles", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-teachback", "method-progressive", "method-spaced"],
  },
];
