import type { InteractiveChallenge } from "./types";

/**
 * Interaktive Mini-Challenges — spielerisch, aber kein Spielportal.
 * Startfokus: Themenwelt „KI ohne Angst“ + Prompting/Wahrheit.
 */
export const interactiveChallenges: InteractiveChallenge[] = [
  {
    id: "challenge-what-is-ai",
    worldId: "world-no-fear",
    lessonId: "l1",
    title: "Was ist KI — in einem Satz?",
    plainIntro:
      "Stell dir vor, eine Freundin fragt dich beim Kaffee: „Sag mal, was ist eigentlich KI?“",
    prompt: "Welche Erklärung passt am besten — einfach und ehrlich?",
    options: [
      {
        id: "a",
        label: "KI ist ein Roboter mit eigenem Bewusstsein.",
        feedback:
          "Nicht ganz. Die meisten KI-Systeme sind Programme ohne Bewusstsein. Sie erkennen Muster und erzeugen Ausgaben.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "KI ist Software, die aus Mustern in Daten lernt und zu einer Eingabe eine passende Ausgabe erzeugt.",
        feedback:
          "Stimmt. So kannst du es ohne Fachchinesisch erklären — und bleibst ehrlich über Grenzen.",
        isGood: true,
      },
      {
        id: "c",
        label: "KI weiß immer die Wahrheit und ersetzt Fachleute.",
        feedback:
          "Nein. KI kann irren und ersetzt keine Prüfung bei wichtigen Themen.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Erklär KI jetzt in deinen Worten in einem Satz (ohne das Wort „Algorithmus“).",
    methodIds: ["method-retrieval", "method-teachback", "method-playful"],
  },
  {
    id: "challenge-safe-prompt",
    worldId: "world-no-fear",
    lessonId: "l3",
    title: "Sicher fragen — was gehört nicht rein?",
    plainIntro:
      "Du willst KI um Hilfe bei einer Nachricht bitten. Was lässt du weg?",
    prompt: "Was solltest du in den Prompt nicht hineinschreiben?",
    options: [
      {
        id: "a",
        label: "Eine allgemeine Beschreibung: „Bitte formuliere freundlicher.“",
        feedback:
          "Das ist oft in Ordnung. Allgemeine Aufgaben ohne persönliche Daten sind ein guter Start.",
        isGood: false,
      },
      {
        id: "b",
        label: "Passwort, Krankenakte oder die komplette Vertragsnummer.",
        feedback:
          "Richtig — das bleibt draußen. Nutze Platzhalter statt echter Geheimnisse.",
        isGood: true,
      },
      {
        id: "c",
        label: "Das Thema der Nachricht, z. B. „Terminverschiebung“.",
        feedback:
          "Das Thema allein ist meist harmlos. Problematisch werden echte Geheimnisse und Identifikatoren.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Nenne drei Dinge, die du nie in einen Prompt schreiben würdest.",
    methodIds: ["method-scenario", "method-retrieval", "method-playful"],
  },
  {
    id: "challenge-hallucination",
    worldId: "world-research-truth",
    lessonId: "l8",
    title: "Klingt überzeugend — aber stimmt’s?",
    plainIntro:
      "Eine KI-Antwort klingt selbstbewusst und nennt sogar „Fakten“. Was tust du?",
    prompt: "Welche Haltung ist am sichersten?",
    options: [
      {
        id: "a",
        label: "Wenn es gut klingt, übernehme ich es sofort.",
        feedback:
          "Riskant. Gutes Formulieren heißt nicht, dass der Inhalt stimmt.",
        isGood: false,
      },
      {
        id: "b",
        label:
          "Ich prüfe wichtige Aussagen mit einer unabhängigen Quelle — besonders bei Recht, Gesundheit und Geld.",
        feedback:
          "Genau. Gegenprüfung schützt dich und macht KI zu einem Helfer statt zu einer Autorität.",
        isGood: true,
      },
      {
        id: "c",
        label: "Ich frage dieselbe KI noch einmal und glaube der zweiten Antwort.",
        feedback:
          "Nicht genug. Dieselbe Quelle kann denselben Fehler wiederholen. Besser: externe Prüfung.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Wann würdest du eine KI-Antwort auf keinen Fall ungeprüft weitergeben?",
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
  },
  {
    id: "challenge-prompt-formula",
    worldId: "world-chat-prompting",
    lessonId: "l5",
    title: "Prompt-Formel: Was fehlt?",
    plainIntro:
      "Jemand schreibt nur: „Mach das besser.“ Die KI antwortet vage.",
    prompt: "Was fehlt in so einem Prompt am meisten?",
    options: [
      {
        id: "a",
        label: "Ziel, Kontext, Format und ein Beispiel oder Kriterien.",
        feedback:
          "Richtig. Klare Bausteine machen Antworten brauchbarer und prüfbarer.",
        isGood: true,
      },
      {
        id: "b",
        label: "Mehr Ausrufezeichen und das Wort „bitte dringend“.",
        feedback:
          "Höflichkeit hilft — aber ohne Ziel und Kontext bleibt die Antwort schwammig.",
        isGood: false,
      },
      {
        id: "c",
        label: "Der Name des besten Modells der Welt.",
        feedback:
          "Ohne Aufgabe ist „bestes Modell“ sinnlos. Zuerst die Aufgabe klären.",
        isGood: false,
      },
    ],
    teachBackPrompt:
      "Schreibe die Prompt-Formel in eigenen Worten (4 kurze Bausteine).",
    methodIds: ["method-worked-example", "method-retrieval", "method-playful"],
  },
];

export function challengesForLesson(lessonId: string): InteractiveChallenge[] {
  return interactiveChallenges.filter((challenge) => challenge.lessonId === lessonId);
}

export function challengesForWorld(worldId: string): InteractiveChallenge[] {
  return interactiveChallenges.filter((challenge) => challenge.worldId === worldId);
}
