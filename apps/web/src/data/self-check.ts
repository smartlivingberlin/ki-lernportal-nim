import type { ThemeWorld } from "./types";

/**
 * Einstiegs-Selbstcheck — empfiehlt eine Themenwelt, bewertet nicht „bestanden“.
 */
export type SelfCheckOption = {
  id: string;
  label: string;
  /** Gewichtung je Welt-ID */
  scores: Partial<Record<ThemeWorld["id"], number>>;
};

export type SelfCheckQuestion = {
  id: string;
  prompt: string;
  options: SelfCheckOption[];
};

export const selfCheckMeta = {
  title: "Selbstcheck: Wo stehe ich?",
  intro:
    "Acht kurze Fragen — kein Test, keine Note. Am Ende siehst du eine passende Themenwelt als Startempfehlung.",
  resultDisclaimer:
    "Die Empfehlung ist eine Orientierung in diesem Browser. Du kannst jederzeit eine andere Welt wählen.",
} as const;

export const selfCheckQuestions: SelfCheckQuestion[] = [
  {
    id: "scq-1",
    prompt: "Was beschreibt dich gerade am besten?",
    options: [
      {
        id: "a",
        label: "Ich will erst verstehen, was KI überhaupt ist.",
        scores: { "world-no-fear": 3 },
      },
      {
        id: "b",
        label: "Ich will bessere Fragen an Chat-Tools stellen.",
        scores: { "world-chat-prompting": 3 },
      },
      {
        id: "c",
        label: "Ich will wissen, wann KI irrt und wie ich prüfe.",
        scores: { "world-research-truth": 3 },
      },
      {
        id: "d",
        label: "Ich will KI im Job oder Alltag sinnvoll nutzen.",
        scores: { "world-work-life": 3 },
      },
    ],
  },
  {
    id: "scq-2",
    prompt: "Wie sicher fühlst du dich digital?",
    options: [
      {
        id: "a",
        label: "Eher unsicher — bitte ganz langsam.",
        scores: { "world-no-fear": 2, "world-safety-law": 1 },
      },
      {
        id: "b",
        label: "Mittel — ich probiere, brauche aber klare Regeln.",
        scores: { "world-chat-prompting": 1, "world-safety-law": 2 },
      },
      {
        id: "c",
        label: "Ziemlich sicher — ich will Qualität und Prüfung.",
        scores: { "world-research-truth": 2, "world-advanced": 1 },
      },
    ],
  },
  {
    id: "scq-3",
    prompt: "Was beschäftigt dich gerade am meisten?",
    options: [
      {
        id: "a",
        label: "Fake-News, Halluzinationen, ungeprüfte Tipps.",
        scores: { "world-research-truth": 3 },
      },
      {
        id: "b",
        label: "Datenschutz, Passwörter, was ich nicht teilen soll.",
        scores: { "world-safety-law": 3 },
      },
      {
        id: "c",
        label: "E-Mails, Pläne, Alltagshilfe.",
        scores: { "world-work-life": 3 },
      },
      {
        id: "d",
        label: "Bilder, Audio, Video mit KI.",
        scores: { "world-multimodal": 3 },
      },
    ],
  },
  {
    id: "scq-4",
    prompt: "Hast du schon einmal einen Prompt (eine KI-Anweisung) geschrieben?",
    options: [
      {
        id: "a",
        label: "Nein, noch nie.",
        scores: { "world-no-fear": 2, "world-chat-prompting": 1 },
      },
      {
        id: "b",
        label: "Ja, aber die Antworten waren oft unbrauchbar.",
        scores: { "world-chat-prompting": 3 },
      },
      {
        id: "c",
        label: "Ja, und ich will das systematischer machen.",
        scores: { "world-chat-prompting": 2, "world-advanced": 1 },
      },
    ],
  },
  {
    id: "scq-5",
    prompt: "Wie wichtig ist dir Sicherheit vor Tricks (Scam, Fake-Anrufe)?",
    options: [
      {
        id: "a",
        label: "Sehr wichtig — ich will Warnsignale kennen.",
        scores: { "world-safety-law": 3 },
      },
      {
        id: "b",
        label: "Wichtig, aber ich will zuerst Grundlagen.",
        scores: { "world-no-fear": 2, "world-safety-law": 1 },
      },
      {
        id: "c",
        label: "Ich kenne das schon und will eher Produktivität.",
        scores: { "world-work-life": 2, "world-agents": 1 },
      },
    ],
  },
  {
    id: "scq-6",
    prompt: "Welche Aussage trifft eher zu?",
    options: [
      {
        id: "a",
        label: "Ich will KI erklären können, ohne Fachchinesisch.",
        scores: { "world-no-fear": 3 },
      },
      {
        id: "b",
        label: "Ich will Modell-Arten grob einordnen.",
        scores: { "world-models": 3 },
      },
      {
        id: "c",
        label: "Ich will verstehen, was „Agenten“ und Automatisierung bedeuten.",
        scores: { "world-agents": 3 },
      },
    ],
  },
  {
    id: "scq-7",
    prompt: "Für wen lernst du hauptsächlich?",
    options: [
      {
        id: "a",
        label: "Für mich privat / Familie.",
        scores: { "world-no-fear": 1, "world-work-life": 2 },
      },
      {
        id: "b",
        label: "Für Beruf oder Studium.",
        scores: { "world-work-life": 2, "world-chat-prompting": 1 },
      },
      {
        id: "c",
        label: "Um andere zu schützen (Team, Angehörige).",
        scores: { "world-safety-law": 2, "world-research-truth": 1 },
      },
    ],
  },
  {
    id: "scq-8",
    prompt: "Wie viel Zeit hast du heute?",
    options: [
      {
        id: "a",
        label: "Nur 10–15 Minuten.",
        scores: { "world-no-fear": 1, "world-chat-prompting": 1 },
      },
      {
        id: "b",
        label: "Etwa eine Stunde — der 60-Minuten-Pfad passt.",
        scores: { "world-no-fear": 1, "world-research-truth": 1 },
      },
      {
        id: "c",
        label: "Ich will tiefer einsteigen.",
        scores: { "world-advanced": 2, "world-vibe-coding": 1 },
      },
    ],
  },
];

export function scoreSelfCheck(
  answers: Record<string, string>,
): { worldId: ThemeWorld["id"]; score: number }[] {
  const totals = new Map<string, number>();

  for (const question of selfCheckQuestions) {
    const optionId = answers[question.id];
    const option = question.options.find((item) => item.id === optionId);
    if (!option) continue;
    for (const [worldId, value] of Object.entries(option.scores)) {
      totals.set(worldId, (totals.get(worldId) ?? 0) + (value ?? 0));
    }
  }

  return [...totals.entries()]
    .map(([worldId, score]) => ({ worldId: worldId as ThemeWorld["id"], score }))
    .sort((a, b) => b.score - a.score);
}
