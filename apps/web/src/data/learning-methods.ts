import type { LearningMethod } from "./types";

/**
 * Evidenznahe Lernmethoden, die das Portal aktiv einbauen soll.
 * Quellen: Retrieval Practice (Karpicke), Worked Examples + stepwise retrieval,
 * UNESCO AI Competency Frameworks, Gamification für AI Literacy (Pinski et al.).
 */
export const learningMethods: LearningMethod[] = [
  {
    id: "method-worked-example",
    name: "Worked Example",
    plainName: "Erst Beispiel, dann selbst machen",
    summary:
      "Du siehst zuerst einen gelösten Weg in kleinen Schritten. Danach machst du eine ähnliche Aufgabe selbst.",
    whyItHelps:
      "Am Anfang entlastet das Beispiel das Arbeitsgedächtnis. Später bleibt mehr Kapazität fürs Verstehen.",
    howWeUseIt:
      "Jede Übung zeigt Hinweis und Beispielweg, bevor du deine eigene Antwort schreibst.",
    interactionHint: "Tipp auf „Beispielweg ansehen“, dann eigene Antwort schreiben.",
  },
  {
    id: "method-retrieval",
    name: "Retrieval Practice",
    plainName: "Aus dem Kopf abrufen",
    summary:
      "Statt nur zu lesen, holst du das Wissen aktiv zurück — mit Kurzfragen und Mini-Checks.",
    whyItHelps:
      "Abrufen stärkt die Erinnerung stärker als nochmaliges Durchlesen.",
    howWeUseIt:
      "Kontrollfragen, Selbstchecks und interaktive Wissensblitze nach dem Lesen.",
    interactionHint: "Beantworte die Frage erst, bevor du die Lösung aufdeckst.",
  },
  {
    id: "method-spaced",
    name: "Spaced Repetition",
    plainName: "Mit Abstand wiederholen",
    summary:
      "Unsichere Begriffe und Schritte kommen später noch einmal — nicht alles an einem Tag.",
    whyItHelps:
      "Abstand macht das Abrufen etwas schwerer und dadurch nachhaltiger.",
    howWeUseIt:
      "Lokale Wiederholungsqueue: Abruffragen mit Abstand nach Confidence (sicher / unsicher / unklar).",
    interactionHint: "Markiere „noch unklar“, damit die Karte früher wiederkommt.",
  },
  {
    id: "method-teachback",
    name: "Teach-back",
    plainName: "In eigenen Worten erklären",
    summary:
      "Du erklärst den Gedanken so, als würdest du ihn einer Freundin erzählen.",
    whyItHelps:
      "Lücken werden sichtbar, sobald du nicht mehr abschreiben kannst.",
    howWeUseIt:
      "„Erklär es selbst“-Felder und Abschlusschecks in Alltagssprache.",
    interactionHint: "Schreibe einen kurzen Satz ohne Fachwort — oder übersetze das Fachwort.",
  },
  {
    id: "method-scenario",
    name: "Scenario Learning",
    plainName: "Echte Alltagsszenen",
    summary:
      "Du übst an Situationen aus Alltag und Beruf statt an abstrakten Definitionen.",
    whyItHelps:
      "Transfer gelingt besser, wenn die Aufgabe sich wie echtes Leben anfühlt.",
    howWeUseIt:
      "E-Mail, Recherche, Datenschutz und Berufsszenen in Übungen und Challenges.",
    interactionHint: "Wähle die Situation, die zu deinem Alltag passt.",
  },
  {
    id: "method-confidence",
    name: "Confidence Rating",
    plainName: "Wie sicher fühlst du dich?",
    summary:
      "Nach einer Einheit sagst du ehrlich: sicher, etwas unsicher oder noch unklar.",
    whyItHelps:
      "Metakognition steuert Wiederholung und verhindert falsche Sicherheit.",
    howWeUseIt:
      "Confidence-Buttons in der Wiederholen-Queue — dort lokal gespeichert. Challenges speichern Confidence noch nicht dauerhaft.",
    interactionHint: "Kein Test. Ehrlichkeit hilft dem Lernweg mehr als „perfekt“.",
  },
  {
    id: "method-progressive",
    name: "Progressive Disclosure",
    plainName: "Erst einfach, Details auf Wunsch",
    summary:
      "Zuerst die kurze Erklärung. Mehr Tiefe nur, wenn du sie brauchst.",
    whyItHelps:
      "Überforderung sinkt — besonders für digital unsichere Einsteiger.",
    howWeUseIt:
      "Einfache Ansicht, aufklappbare Details und kurze Merksätze vor dem Feinschliff.",
    interactionHint: "Nutze die Einfache Ansicht, wenn dir die Seite zu voll wirkt.",
  },
  {
    id: "method-playful",
    name: "Playful Practice",
    plainName: "Spielerisch üben — ohne Spielportal",
    summary:
      "Kurze Challenges, Punktegefühl und Feedback — Inhalt bleibt ernst und nützlich.",
    whyItHelps:
      "Leichte Gamification kann Motivation und AI-Literacy erhöhen, wenn der Inhalt gleich bleibt.",
    howWeUseIt:
      "Wissensblitze, Szenario-Entscheidungen und Fortschrittsfeedback statt Highscore-Jagd.",
    interactionHint: "Mach eine Challenge wie ein Mini-Rätsel — Fehler sind erlaubt.",
  },
];
