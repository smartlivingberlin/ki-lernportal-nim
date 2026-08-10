import type { MicroLearningUnitV2 } from "./types";

const REVIEWED = "2026-08-10";

/**
 * Themenwelt „Fortgeschrittene Praxis“ — Schema v2.
 * RAG, APIs, Evaluation, Kosten, Guardrails, Monitoring — beginner-friendly, ohne Fake-Claims.
 */
export const microUnitsAdvanced: MicroLearningUnitV2[] = [
  {
    id: "mu-advanced-01",
    worldId: "world-advanced",
    lessonId: null,
    order: 1,
    title: "RAG grob: Antworten mit eigenen Unterlagen",
    whyUseful:
      "Du verstehst die Idee hinter „KI sucht zuerst in deinen Texten“ — ohne Magie.",
    oneSentence:
      "RAG holt passende Ausschnitte aus freigegebenen Unterlagen und lässt die KI darauf antworten — Prüfung bleibt nötig.",
    everydayExample:
      "Betriebsrat-FAQ: Das System findet den passenden Absatz zur Homeoffice-Regel und formuliert eine Antwort — du prüfst, ob der Absatz stimmt.",
    steps: [
      "Merke: zuerst Suchen/Finden, dann Formulieren.",
      "Frage: Welche Unterlagen sind freigegeben und aktuell?",
      "Prüfe, ob die Antwort zum gefundenen Ausschnitt passt.",
    ],
    practiceTask:
      "Erkläre RAG in zwei Sätzen mit einem Alltagsbeispiel.",
    samplePath:
      "„Zuerst passende Stellen finden, dann daraus antworten. Ohne treffende Unterlage keine verlässliche Antwort.“",
    whyItWorks:
      "Du trennst Abruf von Unterlagen und freies Erfinden.",
    commonMistake:
      "Glauben, RAG mache jede Antwort automatisch wahr und aktuell.",
    safetyNote:
      "Nur freigegebene Dokumente anbinden — keine geheimen Personalakten „schnell“ indexieren.",
    retrievalQuestions: [
      "Was passiert bei RAG zuerst?",
      "Warum bleiben Prüfung und Aktualität wichtig?",
      "Welche Unterlagen dürfen rein?",
    ],
    teachBackPrompt:
      "Erklär RAG einer Kollegin ohne das Wort „Vektor“.",
    sourceIds: ["digcomp-30", "nist-genai-profile"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-worked-example", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-advanced-02",
    worldId: "world-advanced",
    lessonId: null,
    order: 2,
    title: "APIs: Türen zwischen Programmen",
    whyUseful:
      "Du verstehst, warum Apps „mit KI sprechen“ können — und wo Schlüssel riskant sind.",
    oneSentence:
      "Eine API ist eine geregelte Schnittstelle: ein Programm schickt eine Anfrage und bekommt eine Antwort — oft mit Zugangsschlüssel.",
    everydayExample:
      "Deine Notiz-App sendet einen Text an einen KI-Dienst und erhält eine Zusammenfassung zurück — ohne dass du den Chat manuell öffnest.",
    steps: [
      "Stelle dir API als Service-Schalter vor: Anfrage rein, Antwort raus.",
      "Frage: Wer darf den Schalter bedienen (Schlüssel/Rechte)?",
      "Halte Schlüssel geheim und begrenze, was gesendet wird.",
    ],
    practiceTask:
      "Nenne drei Dinge, die du nie über eine API mitsenden würdest.",
    samplePath:
      "Passwörter von Nutzer:innen, vollständige Ausweisnummern, ungefragte Kundendaten",
    whyItWorks:
      "Schnittstellen-Klarheit macht Integrationsrisiken sichtbar.",
    commonMistake:
      "API-Keys in Frontend-Code oder öffentliche Repos legen.",
    safetyNote:
      "Schlüssel gehören serverseitig und geschützt — nicht in den Prompt und nicht ins öffentliche Repo.",
    retrievalQuestions: [
      "Was ist eine API in einem Satz?",
      "Warum sind Schlüssel heikel?",
      "Was begrenzt du beim Senden?",
    ],
    teachBackPrompt:
      "Erklär API mit dem Bild „Service-Schalter“.",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-scenario", "method-retrieval"],
  },
  {
    id: "mu-advanced-03",
    worldId: "world-advanced",
    lessonId: null,
    order: 3,
    title: "Evaluation: Woran merkst du „gut genug“?",
    whyUseful:
      "Du ersetzt Bauchgefühl durch einfache Prüfkriterien.",
    oneSentence:
      "Evaluation heißt: festlegen, was „gute Antwort“ bedeutet, Beispiele prüfen und Fehler zählen — ehrlich und wiederholt.",
    everydayExample:
      "Zehn typische Kundenfragen: Stimmt die Antwort? Ton okay? Keine erfundenen Preise? Trefferquote notieren.",
    steps: [
      "Definiere 3 Kriterien (Richtigkeit, Ton, Sicherheit).",
      "Baue einen kleinen Satz echter Beispielaufgaben.",
      "Bewerte Ergebnisse und verbessere Prompt oder Prozess.",
    ],
    practiceTask:
      "Schreibe drei Kriterien für „gute Zusammenfassung einer Notiz“.",
    samplePath:
      "1) Keine neuen Fakten 2) Max. 5 Stichpunkte 3) Unklarheiten markiert",
    whyItWorks:
      "Messbare Kriterien machen Fortschritt sichtbar — ohne Marketingversprechen.",
    commonMistake:
      "Einmal „fühlte sich gut an“ als Beweis für Qualität nehmen.",
    safetyNote:
      "Bei hohem Risiko reichen Hobby-Tests nicht — Fachprüfung einplanen.",
    retrievalQuestions: [
      "Was ist Evaluation grob?",
      "Warum Beispielaufgaben?",
      "Nenne drei mögliche Kriterien.",
    ],
    teachBackPrompt:
      "Erklär, warum Bauchgefühl allein nicht reicht.",
    sourceIds: ["nist-ai-rmf", "nist-genai-profile", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-retrieval", "method-confidence", "method-progressive"],
  },
  {
    id: "mu-advanced-04",
    worldId: "world-advanced",
    lessonId: null,
    order: 4,
    title: "Kosten verstehen: Tokens, Limits, Wiederholungen",
    whyUseful:
      "Du planst Nutzung so, dass Überraschungsrechnungen und Leerlauf seltener werden.",
    oneSentence:
      "Viele Dienste rechnen nach Nutzungsumfang ab — kurze klare Anfragen und gezielte Iteration sparen Geld und Zeit.",
    everydayExample:
      "Statt das ganze Handbuch zehnmal hineinkopieren: relevante Abschnitte wählen und eine gezielte Frage stellen.",
    steps: [
      "Kürze den Input auf das Nötige.",
      "Formuliere die Aufgabe einmal klar.",
      "Iteriere gezielt statt endlos „nochmal“.",
    ],
    practiceTask:
      "Schreibe eine Spar-Regel für dein Team in zwei Sätzen.",
    samplePath:
      "„Nur nötige Abschnitte senden. Maximal zwei Nachbesserungen mit klarem Ziel.“",
    whyItWorks:
      "Kostenbewusstsein ist Teil verantwortlicher Nutzung — kein Geiz.",
    commonMistake:
      "Riesige Dokumente und viele parallele Chats ohne Ziel.",
    safetyNote:
      "Zahlungsdaten und Rechnungsdetails nicht in KI-Chats tippen.",
    retrievalQuestions: [
      "Warum können große Inputs teuer sein?",
      "Wie sparst du Iterationen?",
      "Was tippst du nie ins Chatfenster?",
    ],
    teachBackPrompt:
      "Erklär Kostenbewusstsein an einem Alltagsbeispiel.",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-scenario", "method-retrieval", "method-playful"],
  },
  {
    id: "mu-advanced-05",
    worldId: "world-advanced",
    lessonId: null,
    order: 5,
    title: "Guardrails: Leitplanken statt Hoffnung",
    whyUseful:
      "Du verstehst, warum Systeme Grenzen brauchen — technisch und organisatorisch.",
    oneSentence:
      "Guardrails sind Regeln und Filter, die riskante Eingaben/Ausgaben begrenzen — sie ersetzen nicht menschliche Verantwortung.",
    everydayExample:
      "Ein System blockiert Passwort-Eingaben im Prompt und verweigert medizinische Diagnosen — du entscheidest trotzdem über Freigaben.",
    steps: [
      "Nenne Risiken, die du begrenzen willst (Secrets, Beleidigungen, Fehlinfos).",
      "Kombiniere technische Filter und klare Nutzungsregeln.",
      "Plane, was bei Block oder Unsicherheit passiert (Mensch fragt nach).",
    ],
    practiceTask:
      "Liste drei Guardrails für einen Vereins-Chatbot.",
    samplePath:
      "1) Keine Mitgliedsdaten speichern 2) Keine Rechtsberatung 3) Bei Unsicherheit: auf Vorstand verweisen",
    whyItWorks:
      "Leitplanken reduzieren Schaden, wenn Modelle irren oder missbraucht werden.",
    commonMistake:
      "Ein Filter einschalten und denken, alles sei damit „sicher fertig“.",
    safetyNote:
      "Guardrails sind Hilfen — bei hohem Risiko zusätzliche Prüfung und Freigabe nötig.",
    retrievalQuestions: [
      "Was sind Guardrails?",
      "Warum reichen sie allein nicht?",
      "Nenne ein Beispiel für eine organisatorische Leitplanke.",
    ],
    teachBackPrompt:
      "Erklär Guardrails mit dem Bild „Leitplanke“.",
    sourceIds: ["nist-ai-rmf", "eu-ai-act", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-scenario", "method-teachback"],
  },
  {
    id: "mu-advanced-06",
    worldId: "world-advanced",
    lessonId: null,
    order: 6,
    title: "Monitoring: merken, wenn etwas schiefgeht",
    whyUseful:
      "Du lernst, dass Betrieb heißt: Fehler, Kosten und Missbrauch beobachten — in einfacher Sprache.",
    oneSentence:
      "Monitoring bedeutet: Nutzung, Fehler und Auffälligkeiten beobachten und reagieren — ohne private Inhalte unnötig zu speichern.",
    everydayExample:
      "Die Vereins-Hilfe zeigt plötzlich viele Anfragen zu Passwörtern: Alarm, Prompt anpassen, Nutzer:innen warnen.",
    steps: [
      "Lege fest, was du beobachten willst (Fehlerquote, Kosten, Missbrauch).",
      "Halte Logs datensparsam und zugriffsgeschützt.",
      "Definiere eine einfache Reaktion (stoppen, nachbessern, informieren).",
    ],
    practiceTask:
      "Schreibe einen Mini-Reaktionsplan für „plötzlich viele Fehlantworten“.",
    samplePath:
      "1) Stopp neuer Features 2) Beispiele sammeln 3) Prompt/Quellen prüfen 4) Team informieren",
    whyItWorks:
      "Ohne Beobachtung bleiben Probleme unsichtbar, bis Schaden entsteht.",
    commonMistake:
      "Alles speichern „für immer“ — inkl. sensibler Nutzereingaben.",
    safetyNote:
      "Monitoring-Logs können personenbezogene Daten enthalten — Zugriff und Löschfristen klären.",
    retrievalQuestions: [
      "Was beobachtest du grob?",
      "Warum Datensparsamkeit in Logs?",
      "Was gehört in einen Reaktionsplan?",
    ],
    teachBackPrompt:
      "Erklär Monitoring in Alltagssprache an einem Vereins-Beispiel.",
    sourceIds: ["nist-ai-rmf", "eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-scenario", "method-retrieval", "method-spaced"],
  },
];
