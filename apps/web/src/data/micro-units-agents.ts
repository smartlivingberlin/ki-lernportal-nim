import type { MicroLearningUnitV2 } from "./types";

const REVIEWED = "2026-08-10";

/**
 * Themenwelt „Agenten & Automationen“ — Schema v2.
 * Chat vs. Agent, Rechte klein halten, Human-in-the-loop.
 */
export const microUnitsAgents: MicroLearningUnitV2[] = [
  {
    id: "mu-agents-01",
    worldId: "world-agents",
    lessonId: null,
    order: 1,
    title: "Chat vs. Agent — der Unterschied",
    whyUseful:
      "Du weißt, wann du nur Text bekommst — und wann Software Aktionen auslösen kann.",
    oneSentence:
      "Ein Chat antwortet mit Text; ein Agent kann zusätzlich Werkzeuge nutzen und Schritte ausführen — oft mit mehr Risiko.",
    everydayExample:
      "Chat: „Formuliere eine Erinnerungsmail.“ Agent: „Suche Termine, entwirf die Mail und lege sie im Entwurfordner ab“ — wenn er darf.",
    steps: [
      "Frage: Soll nur Text entstehen oder eine Aktion?",
      "Bei Aktionen: Welche Rechte bräuchte das System?",
      "Starte immer mit Lesen/Vorschlagen, nicht mit Absenden.",
    ],
    practiceTask:
      "Schreibe je ein Beispiel für Chat-Hilfe und Agenten-Hilfe aus deinem Alltag.",
    samplePath:
      "Chat: Einkaufsliste strukturieren. Agent: Kalender lesen und Vorschlag erzeugen — ohne selbst Einladungen zu senden.",
    whyItWorks:
      "Die Unterscheidung steuert deine Sicherheitserwartung.",
    commonMistake:
      "Jeden Chatbot „Agent“ nennen und Rechte unterschätzen.",
    safetyNote:
      "Kein System sollte unbeaufsichtigt E-Mails senden, Käufe auslösen oder Dateien löschen.",
    retrievalQuestions: [
      "Was kann ein Chat typischerweise?",
      "Was kann ein Agent zusätzlich?",
      "Warum sind Aktionen riskanter?",
    ],
    teachBackPrompt:
      "Erklär Chat vs. Agent in einem Satz.",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-agents-02",
    worldId: "world-agents",
    lessonId: null,
    order: 2,
    title: "Werkzeuge: Was ein Agent „benutzen“ darf",
    whyUseful:
      "Du verstehst, dass Tools (Kalender, Dateien, Browser) Macht bedeuten — und begrenzt werden müssen.",
    oneSentence:
      "Jedes Werkzeug ist eine Erlaubnis: je mächtiger, desto kleiner halten und desto genauer prüfen.",
    everydayExample:
      "Kalender lesen: oft okay. Kalender löschen oder für alle senden: nur mit Freigabe und Bestätigung.",
    steps: [
      "Liste benötigte Werkzeuge für die Aufgabe.",
      "Streiche alles, was nicht zwingend nötig ist.",
      "Fordere für riskante Schritte eine menschliche Bestätigung.",
    ],
    practiceTask:
      "Für „Reise planen“: welche Tools braucht ein Agent — und welche nicht?",
    samplePath:
      "Braucht: Websuche (öffentlich), Notizen. Braucht nicht: Kreditkarte, Passwortmanager, Absenden.",
    whyItWorks:
      "Minimale Rechte reduzieren Schaden bei Fehlern.",
    commonMistake:
      "„Vollzugriff ist praktischer“ — und dann passiert etwas Unerwünschtes.",
    safetyNote:
      "Zugangsdaten und Zahlungsdaten nie an Agenten übergeben.",
    retrievalQuestions: [
      "Was ist ein Werkzeug für einen Agenten?",
      "Warum Rechte klein halten?",
      "Wann brauchst du Bestätigung?",
    ],
    teachBackPrompt:
      "Erklär die Regel „minimale Rechte“ an einem Beispiel.",
    sourceIds: ["nist-ai-rmf", "eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-retrieval", "method-progressive"],
  },
  {
    id: "mu-agents-03",
    worldId: "world-agents",
    lessonId: null,
    order: 3,
    title: "Human-in-the-loop: Mensch bleibt Entscheider",
    whyUseful:
      "Du baust Freigaben ein, bevor etwas Unwiderrufliches passiert.",
    oneSentence:
      "Wichtige Schritte warten auf dich: prüfen, freigeben oder abbrechen — der Agent schlägt vor.",
    everydayExample:
      "Agent entwirft eine Kundenmail. Du liest, korrigierst, klickst erst dann auf Senden.",
    steps: [
      "Markiere Schritte mit Folgen (Senden, Bezahlen, Löschen).",
      "Setze dort eine Pflicht-Freigabe.",
      "Protokolliere grob, was freigegeben wurde.",
    ],
    practiceTask:
      "Zeichne einen Mini-Ablauf mit zwei Freigabe-Punkten.",
    samplePath:
      "1) Entwurf erzeugen 2) Du prüfst 3) Optional: Anhang anhängen 4) Du sendest",
    whyItWorks:
      "Freigaben fangen Fehler ab, bevor sie teuer werden.",
    commonMistake:
      "Vollautomatik „weil es modern ist“ — ohne Stopp-Knopf.",
    safetyNote:
      "Bei Kunden, Geld und Personal: immer menschliche Freigabe.",
    retrievalQuestions: [
      "Was bedeutet Human-in-the-loop?",
      "Welche Schritte brauchen Freigabe?",
      "Warum nicht alles automatisieren?",
    ],
    teachBackPrompt:
      "Erklär einer Kollegin, warum Freigaben keine Schwäche sind.",
    sourceIds: ["oecd-ai-principles", "nist-ai-rmf", "eu-ai-act"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-scenario", "method-teachback", "method-confidence"],
  },
  {
    id: "mu-agents-04",
    worldId: "world-agents",
    lessonId: null,
    order: 4,
    title: "Workflows: Schritte statt Chaos",
    whyUseful:
      "Du zerlegst Automatisierung in klare, prüfbare Schritte.",
    oneSentence:
      "Ein guter Workflow ist eine kurze Kette: Input → Verarbeitung → Prüfung → Ausgabe.",
    everydayExample:
      "Eingang: Sprachnotiz. Schritt: Transkript. Prüfung: du. Ausgabe: To-do-Liste — ohne automatisches Weiterleiten.",
    steps: [
      "Schreibe Start und gewünschtes Ende.",
      "Füge maximal drei Zwischenschritte ein.",
      "An jeden riskanten Schritt eine Prüfung hängen.",
    ],
    practiceTask:
      "Skizziere einen Workflow für „Wochenplan aus Notizen“ mit einer Prüfung.",
    samplePath:
      "Notizen → strukturieren → du prüfst Termine → Kalender-Vorschlag (ohne Auto-Eintrag).",
    whyItWorks:
      "Kurze Ketten sind leichter zu verstehen und zu stoppen.",
    commonMistake:
      "Zehn verkettete Aktionen ohne Überblick bauen.",
    safetyNote:
      "Keine Workflows mit geheimen Dateien in öffentliche Dienste legen.",
    retrievalQuestions: [
      "Welche vier Teile hat der Grund-Workflow?",
      "Warum kurz halten?",
      "Wo sitzt die Prüfung?",
    ],
    teachBackPrompt:
      "Zeichne den Grund-Workflow mit Worten.",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-progressive", "method-retrieval"],
  },
  {
    id: "mu-agents-05",
    worldId: "world-agents",
    lessonId: null,
    order: 5,
    title: "MCP und Tool-Verbindungen — vorsichtig denken",
    whyUseful:
      "Du hörst Begriffe wie MCP und verstehst: Verbindungen zu Tools sind mächtig und prüfpflichtig.",
    oneSentence:
      "Protokoll- oder Tool-Brücken erlauben Agenten, externe Dienste anzusprechen — nur freigegebene, sparsame Verbindungen nutzen.",
    everydayExample:
      "Eine erlaubte Verbindung zum Notizbuch lesen: hilfreich. Eine ungeprüfte Verbindung mit Schreibrechten überall: riskant.",
    steps: [
      "Frage: Welche Verbindung ist freigegeben?",
      "Frage: Nur Lesen oder auch Schreiben?",
      "Teste zuerst mit harmlosen Beispieldaten.",
    ],
    practiceTask:
      "Formuliere drei Prüffragen vor dem Aktivieren einer Tool-Brücke.",
    samplePath:
      "1) Wer hat freigegeben? 2) Welche Rechte? 3) Was passiert bei Fehlern?",
    whyItWorks:
      "Verbindungen sind wie Schlüssel — du gibst sie nicht wahllos weiter.",
    commonMistake:
      "Alles verbinden „für den Komfort“ ohne Rechte-Check.",
    safetyNote:
      "Keine API-Schlüssel oder Passwörter in Prompts oder öffentlichen Repos legen.",
    retrievalQuestions: [
      "Warum sind Tool-Brücken mächtig?",
      "Welche Rechte-Frage stellst du?",
      "Womit testest du zuerst?",
    ],
    teachBackPrompt:
      "Erklär „Verbindungen = Schlüssel“ in eigenen Worten.",
    sourceIds: ["nist-ai-rmf", "digcomp-30", "eu-gdpr"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-agents-06",
    worldId: "world-agents",
    lessonId: null,
    order: 6,
    title: "Fehler und Schleifen: wann abbrechen?",
    whyUseful:
      "Du erkennst, wenn ein Agent hängt, halluziniert oder unsinnig wiederholt.",
    oneSentence:
      "Bei Wiederholungen ohne Fortschritt, unklaren Aktionen oder Datenrisiko: stoppen und manuell weiter.",
    everydayExample:
      "Der Agent sucht „noch einmal“ dieselbe Seite und will „trotzdem senden“ — du brichst ab.",
    steps: [
      "Beobachte: Gibt es Fortschritt?",
      "Prüfe: Werden unerwartete Rechte genutzt?",
      "Stoppe, dokumentiere kurz, starte enger begrenzt neu.",
    ],
    practiceTask:
      "Schreibe deine persönliche Abbruch-Regel in zwei Sätzen.",
    samplePath:
      "„Nach zwei sinnlosen Wiederholungen oder bei Sendeversuch ohne Freigabe: Soft-Stopp und ich übernehme.“",
    whyItWorks:
      "Abbruch ist Kompetenz — kein Scheitern.",
    commonMistake:
      "„Noch eine Runde“ trotz offensichtlichem Loop.",
    safetyNote:
      "Nie Rechte erweitern, um einen Fehler „schnell zu umgehen“.",
    retrievalQuestions: [
      "Wann brichst du ab?",
      "Was prüfst du bei Wiederholungen?",
      "Warum Rechte nicht erweitern?",
    ],
    teachBackPrompt:
      "Erklär deine Abbruch-Regel einer Kollegin.",
    sourceIds: ["nist-genai-profile", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-scenario", "method-playful", "method-retrieval"],
  },
  {
    id: "mu-agents-07",
    worldId: "world-agents",
    lessonId: null,
    order: 7,
    title: "Alltagstaugliche Automationen wählen",
    whyUseful:
      "Du startest mit kleinen, sicheren Automationen statt mit riskanten Großprojekten.",
    oneSentence:
      "Gute erste Automationen entlasten bei Routine — ohne Geheimnisse und ohne unwiderrufliche Aktionen.",
    everydayExample:
      "Wöchentliche To-do-Liste aus eigenen Notizen vorschlagen lassen — ja. Automatisch Rechnungen bezahlen — nein.",
    steps: [
      "Wähle eine wiederkehrende, niedrig-riskante Aufgabe.",
      "Automatisiere nur den Entwurf.",
      "Behalte Freigabe und Datenkontrolle.",
    ],
    practiceTask:
      "Nenne zwei Automationen, die du ausprobieren würdest — und eine, die du meidest.",
    samplePath:
      "Ausprobieren: Tagesplan-Skizze. Meiden: Auto-Antwort an Kund:innen mit persönlichen Daten.",
    whyItWorks:
      "Kleine Erfolge bauen Kompetenz ohne großen Schaden.",
    commonMistake:
      "Mit der komplexesten Automation starten.",
    safetyNote:
      "Kunden- und Finanzprozesse nicht ohne Freigabe und klare Regeln automatisieren.",
    retrievalQuestions: [
      "Was macht eine Automation alltagstauglich?",
      "Was automatisierst du zuerst nicht?",
      "Welche Rolle bleibt beim Menschen?",
    ],
    teachBackPrompt:
      "Sag deine Regel für „erste Automation“ laut.",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-scenario", "method-retrieval"],
  },
  {
    id: "mu-agents-08",
    worldId: "world-agents",
    lessonId: null,
    order: 8,
    title: "Abschluss: Agenten-Sicherheitskarte",
    whyUseful:
      "Du nimmst eine kurze Karte mit, bevor du Agenten-Rechte gibst.",
    oneSentence:
      "Aufgabe klar → Rechte minimal → Freigaben setzen → beobachten → bei Zweifel stoppen.",
    everydayExample:
      "Ob Kalenderhilfe oder Notiz-Workflow: dieselbe Karte vor dem Einschalten.",
    steps: [
      "Schreibe die fünf Punkte auf.",
      "Wende sie auf eine geplante Automation an.",
      "Streiche unnötige Rechte vor dem Start.",
    ],
    practiceTask:
      "Fülle die Sicherheitskarte für eine erfundene „E-Mail-Hilfe“ aus.",
    samplePath:
      "Aufgabe: Entwurf. Rechte: kein Senden. Freigabe: du. Beobachten: erste Woche. Stopp: bei Auto-Send-Versuch.",
    whyItWorks:
      "Eine Karte ist schneller als ein Bauchgefühl unter Zeitdruck.",
    commonMistake:
      "Rechte „später einschränken“ — und es vergessen.",
    safetyNote:
      "Keine Secrets in Agenten-Konfigurationen speichern, die andere sehen können.",
    retrievalQuestions: [
      "Welche fünf Punkte hat die Karte?",
      "Was kommt vor dem Start?",
      "Wann stoppst du?",
    ],
    teachBackPrompt:
      "Führe jemanden durch deine Agenten-Sicherheitskarte.",
    sourceIds: ["nist-ai-rmf", "eu-ai-act", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-teachback", "method-progressive", "method-spaced"],
  },
];
