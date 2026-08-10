import type { MicroLearningUnitV2 } from "./types";

const REVIEWED = "2026-08-10";

/**
 * Themenwelt „Vibe Coding“ — Schema v2.
 * Kleine Dinge mit KI bauen: Plan, Prüfung, Secrets, Tests.
 */
export const microUnitsVibeCoding: MicroLearningUnitV2[] = [
  {
    id: "mu-vibe-01",
    worldId: "world-vibe-coding",
    lessonId: null,
    order: 1,
    title: "Was ist Vibe Coding — ehrlich erklärt?",
    whyUseful:
      "Du startest mit realistischen Erwartungen: KI hilft bauen, ersetzt aber kein Verstehen.",
    oneSentence:
      "Vibe Coding heißt: Du beschreibst, was du willst, KI schlägt Code vor — du prüfst, testest und entscheidest.",
    everydayExample:
      "„Kleine Webseite mit drei Buttons und einer To-do-Liste“ beschreiben, Vorschlag lesen, anpassen — nicht blind kopieren und online stellen.",
    steps: [
      "Wunsch in Alltagssprache schreiben.",
      "In kleine Schritte zerlegen.",
      "Jeden Vorschlag verstehen wollen, bevor du ihn übernimmst.",
    ],
    practiceTask:
      "Beschreibe ein Mini-Projekt in drei Sätzen (Ziel, Nutzer, was es nicht soll).",
    samplePath:
      "Ziel: Haushalts-Checkliste. Nutzer: ich. Nicht: Kontodaten speichern oder öffentliches Login.",
    whyItWorks:
      "Klare Grenzen verhindern Scope-Chaos und Sicherheitslücken.",
    commonMistake:
      "Sofort „baue mir die App“ tippen und das Ergebnis ungeprüft deployen.",
    safetyNote:
      "Keine echten API-Schlüssel, Passwörter oder Kundendaten in Prompts oder Code-Beispiele kleben.",
    retrievalQuestions: [
      "Was macht du außer dem Prompten?",
      "Warum Zerlegen?",
      "Was gehört nicht ins Projekt?",
    ],
    teachBackPrompt:
      "Erklär Vibe Coding in einem Satz — inklusive Prüfungspflicht.",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-worked-example", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-vibe-02",
    worldId: "world-vibe-coding",
    lessonId: null,
    order: 2,
    title: "Vom Wunsch zum Plan: kleine Schritte",
    whyUseful:
      "Ein Plan hält dich auf Kurs und macht KI-Antworten prüfbarer.",
    oneSentence:
      "Zerlege dein Projekt in Ziel, Oberflächen, Daten und einen ersten lauffähigen Minischritt.",
    everydayExample:
      "Statt „komplette Fitness-App“: zuerst eine Seite mit drei Übungen und einem Häkchen — mehr nicht.",
    steps: [
      "Ziel in einem Satz.",
      "Liste 3–5 Bausteine.",
      "Wähle den kleinsten Baustein als ersten Bau.",
    ],
    practiceTask:
      "Schreibe einen Plan für ein Mini-Tool mit genau vier Zeilen.",
    samplePath:
      "1) Ziel 2) Eingabe 3) Anzeige 4) Speichern lokal — ohne Account",
    whyItWorks:
      "Kleine Schritte erzeugen frühes Feedback und weniger Frust.",
    commonMistake:
      "Alles auf einmal verlangen und dann im Halbfertigen stecken bleiben.",
    safetyNote:
      "Plane Speicherung von Anfang an datensparsam — was muss wirklich gespeichert werden?",
    retrievalQuestions: [
      "Welche vier Teile hat der Plan?",
      "Warum zuerst der kleinste Baustein?",
      "Was bedeutet datensparsam speichern?",
    ],
    teachBackPrompt:
      "Erklär einem Anfänger, warum Planung vor dem Prompten kommt.",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-progressive", "method-worked-example", "method-retrieval"],
  },
  {
    id: "mu-vibe-03",
    worldId: "world-vibe-coding",
    lessonId: null,
    order: 3,
    title: "Gute Bau-Prompts: Kontext und Grenzen",
    whyUseful:
      "Du bekommst brauchbareren Code, wenn du Stack, Ziel und Verbote klar sagst.",
    oneSentence:
      "Nenne Ziel, Technik (falls bekannt), Dateien und was die KI nicht tun soll — z. B. keine Secrets.",
    everydayExample:
      "„Erzeuge eine einfache HTML-Seite mit einer Liste. Kein Backend. Keine externen Tracking-Skripte. Erkläre kurz, was du änderst.“",
    steps: [
      "Ziel und Nicht-Ziele nennen.",
      "Technik und Constraints angeben.",
      "Um Erklärung der Änderungen bitten.",
    ],
    practiceTask:
      "Schreibe einen Bau-Prompt mit zwei klaren Verboten.",
    samplePath:
      "„Baue … Verboten: API-Keys im Code, automatisches Absenden von Formularen.“",
    whyItWorks:
      "Grenzen reduzieren gefährliche Defaults in Vorschlägen.",
    commonMistake:
      "Nur „mach das cooler“ tippen ohne Sicherheitsgrenzen.",
    safetyNote:
      "Verlange nie, echte Schlüssel in den Quelltext zu schreiben.",
    retrievalQuestions: [
      "Welche Angaben machen Bau-Prompts klarer?",
      "Warum Verbote nennen?",
      "Warum Erklärungen verlangen?",
    ],
    teachBackPrompt:
      "Sag deine Bau-Prompt-Formel laut.",
    sourceIds: ["digcomp-30", "nist-genai-profile"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-playful", "method-retrieval"],
  },
  {
    id: "mu-vibe-04",
    worldId: "world-vibe-coding",
    lessonId: null,
    order: 4,
    title: "Code lesen statt blind übernehmen",
    whyUseful:
      "Du findest Fehler und riskante Stellen, bevor sie online gehen.",
    oneSentence:
      "Lies, was die KI vorschlägt: unerwartete Netzaufrufe, Dateizugriffe und Geheimnisse sind Warnsignale.",
    everydayExample:
      "Ein Snippet lädt ein fremdes Skript von einer unbekannten Domain — du streichst es und fragst nach einer lokalen Alternative.",
    steps: [
      "Scanne auf Secrets, Netzwerk und Dateizugriff.",
      "Frage nach einer einfacheren Variante, wenn du etwas nicht verstehst.",
      "Übernimm nur, was du grob erklären kannst.",
    ],
    practiceTask:
      "Liste fünf Warnsignale in KI-generiertem Code.",
    samplePath:
      "1) API-Key 2) eval 3) fremde Skript-URL 4) Schreibzugriff überall 5) Auto-Install unbekannter Pakete",
    whyItWorks:
      "Verstehen ist die beste Sicherheitsprüfung für Einsteiger.",
    commonMistake:
      "„Läuft irgendwie“ als Freigabe behandeln.",
    safetyNote:
      "Unbekannten Code nicht mit Admin-Rechten und Produktionsdaten ausführen.",
    retrievalQuestions: [
      "Welche Warnsignale suchst du?",
      "Was tust du bei Unverständnis?",
      "Warum „läuft“ nicht reicht?",
    ],
    teachBackPrompt:
      "Erklär die Regel „nur übernehmen, was ich grob erklären kann“.",
    sourceIds: ["nist-ai-rmf", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-vibe-05",
    worldId: "world-vibe-coding",
    lessonId: null,
    order: 5,
    title: "Secrets und .env: nie in den Chat",
    whyUseful:
      "Du schützt Zugangsdaten — der häufigste Anfängerfehler beim Bauen mit KI.",
    oneSentence:
      "Schlüssel, Tokens und Passwörter gehören in lokale, nicht geteilte Umgebungsvariablen — nie in Prompts oder Git.",
    everydayExample:
      "Statt den echten Key einzufügen: „Nutze process.env.API_KEY und zeige nur ein Platzhalter-Beispiel.“",
    steps: [
      "Ersetze echte Secrets durch Platzhalter in Prompts.",
      "Halte echte Werte nur lokal und außerhalb von Git.",
      "Wenn ein Secret geleakt sein könnte: rotieren/ändern.",
    ],
    practiceTask:
      "Formuliere einen Prompt, der explizit keine echten Schlüssel verlangt.",
    samplePath:
      "„Zeig Beispielcode mit YOUR_API_KEY_HERE. Keine echten Werte. Erkläre, wo die Variable lokal gesetzt wird.“",
    whyItWorks:
      "Ein geleakter Key ist oft teurer als ein langsamerer Lernfortschritt.",
    commonMistake:
      "Screenshot mit Key in den Chat oder ins Ticket kleben.",
    safetyNote:
      "Keine echten Cloud-Keys, Datenbankpasswörter oder Tokens committen.",
    retrievalQuestions: [
      "Wohin gehören Secrets?",
      "Was tippst du statt des echten Keys?",
      "Was tun bei Verdacht auf Leak?",
    ],
    teachBackPrompt:
      "Erklär die Secret-Regel in 20 Sekunden.",
    sourceIds: ["nist-ai-rmf", "eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-scenario", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-vibe-06",
    worldId: "world-vibe-coding",
    lessonId: null,
    order: 6,
    title: "Testen und Debugging mit KI",
    whyUseful:
      "Du nutzt KI zum Eingrenzen von Fehlern — ohne Blindvertrauen in „Fixes“.",
    oneSentence:
      "Beschreibe erwartetes vs. tatsächliches Verhalten, teile nur nötige Ausschnitte, prüfe den Fix selbst.",
    everydayExample:
      "„Button speichert nicht. Erwartet: Eintrag erscheint. Tatsächlich: nichts. Hier der relevante Funktionsausschnitt ohne Secrets.“",
    steps: [
      "Fehler reproduzierbar beschreiben.",
      "Nur relevante Code-Ausschnitte teilen.",
      "Fix lokal nachstellen und erneut prüfen.",
    ],
    practiceTask:
      "Schreibe eine Fehlerbeschreibung in fünf Zeilen ohne Secrets.",
    samplePath:
      "Schritt · Erwartung · Realität · Ausschnitt · was du schon versucht hast",
    whyItWorks:
      "Klare Fehlermeldungen führen zu besseren Vorschlägen und weniger Rätselraten.",
    commonMistake:
      "Komplettes Projekt inkl. .env in den Chat werfen.",
    safetyNote:
      "Logs können Tokens enthalten — vor dem Teilen bereinigen.",
    retrievalQuestions: [
      "Welche Infos braucht eine gute Fehlerbeschreibung?",
      "Was teilst du nicht?",
      "Was machst du nach dem vorgeschlagenen Fix?",
    ],
    teachBackPrompt:
      "Erklär dein Debugging-Ritual mit KI.",
    sourceIds: ["digcomp-30", "nist-genai-profile"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-scenario", "method-retrieval"],
  },
  {
    id: "mu-vibe-07",
    worldId: "world-vibe-coding",
    lessonId: null,
    order: 7,
    title: "Git und Versionen: Sicherheitsnetz",
    whyUseful:
      "Du kannst Änderungen rückgängig machen und behältst Überblick.",
    oneSentence:
      "Kleine Commits mit klarer Botschaft sind dein Netz — besonders wenn KI viel auf einmal ändert.",
    everydayExample:
      "Vor einem großen KI-Umbau committen: „Vor Refactor Listenansicht“. Danach gezielt testen.",
    steps: [
      "Vor riskanten Änderungen speichern/committen.",
      "KI-Änderungen in kleinen Häppchen annehmen.",
      "Nach jedem Häppchen kurz testen.",
    ],
    practiceTask:
      "Formuliere drei gute Commit-Botschaften für ein Mini-Projekt.",
    samplePath:
      "1) Add checklist page 2) Fix save button 3) Remove unused script",
    whyItWorks:
      "Versionen machen Experimente mit KI weniger beängstigend.",
    commonMistake:
      "Stundenlang ohne Speicherpunkt arbeiten und dann alles verlieren.",
    safetyNote:
      "Nie Secrets committen; prüfe die Diff vor dem Push.",
    retrievalQuestions: [
      "Wann commitest du vor KI-Umbauten?",
      "Warum kleine Häppchen?",
      "Was prüfst du vor dem Push?",
    ],
    teachBackPrompt:
      "Warum ist Git beim Vibe Coding ein Sicherheitsnetz?",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-progressive", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-vibe-08",
    worldId: "world-vibe-coding",
    lessonId: null,
    order: 8,
    title: "Abschluss: Deploy-Checkliste für Einsteiger",
    whyUseful:
      "Du gehst online nur mit einem kurzen Sicherheitscheck.",
    oneSentence:
      "Vor dem Veröffentlichen: Secrets raus, Zweck klar, Basics getestet, Daten sparsam, Rollback möglich.",
    everydayExample:
      "Hobby-Checkliste öffentlich: okay ohne Personenbezogene Daten. Mit echten Kundennamen: erst Schutz und Freigabe klären.",
    steps: [
      "Diff und Konfiguration auf Secrets scannen.",
      "Kernfunktionen einmal manuell testen.",
      "Entscheidung: deployen, nachbessern oder lokal lassen.",
    ],
    practiceTask:
      "Schreibe deine persönliche Deploy-Checkliste in sechs Punkten.",
    samplePath:
      "1) Keine Secrets 2) Datensparsam 3) Tests 4) Rechte 5) Backup/Rollback 6) Mensch gibt frei",
    whyItWorks:
      "Eine Checkliste verhindert „schnell live“-Unfälle.",
    commonMistake:
      "Erst deployen, dann über Sicherheit nachdenken.",
    safetyNote:
      "Keine Produktionsdaten in Demo-Deployments ohne Freigabe und Schutz.",
    retrievalQuestions: [
      "Welche Punkte gehören vor dem Deploy?",
      "Was scannst du in der Diff?",
      "Wann lässt du etwas lokal?",
    ],
    teachBackPrompt:
      "Führe jemanden durch deine Deploy-Checkliste.",
    sourceIds: ["nist-ai-rmf", "eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-teachback", "method-spaced", "method-progressive"],
  },
];
