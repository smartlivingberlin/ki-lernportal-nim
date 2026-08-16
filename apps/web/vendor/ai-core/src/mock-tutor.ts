/**
 * Deterministic mock tutor (M5-A).
 * Curated lesson answers only — no network, no provider SDK, no free chat.
 */

export const MOCK_TUTOR_MODE = "mock_curated" as const;

export type MockTutorMode = typeof MOCK_TUTOR_MODE;

export type MockTutorRequest = {
  lessonId: string;
  /** Stable id of a curated prompt (no free-text chat in M5-A). */
  promptId: string;
};

export type MockTutorResponse = {
  mode: MockTutorMode;
  lessonId: string;
  promptId: string;
  status: "answered" | "abstain";
  question: string;
  answer: string;
  honesty: string;
  sourceNote: string;
};

export type MockTutorPrompt = {
  id: string;
  lessonId: string;
  question: string;
  answer: string;
  sourceNote: string;
};

const HONESTY =
  "Feste, kuratierte Antwort aus dem Lektionsstoff · kein Netz · keine Live-KI.";

/** Curated bank — keep in sync with lesson l1 teaching points. */
export const MOCK_TUTOR_PROMPTS: readonly MockTutorPrompt[] = [
  {
    id: "l1-what-is-ai",
    lessonId: "l1",
    question: "Was ist KI in einfachen Worten?",
    answer:
      "KI ist Software, die Muster erkennt und daraus Antworten, Vorschläge oder Inhalte erzeugt. Sie denkt nicht wie ein Mensch, sondern berechnet, welche Antwort wahrscheinlich gut passt.",
    sourceNote: "Lektion l1 · Abschnitt „Einfach erklärt“",
  },
  {
    id: "l1-truth",
    lessonId: "l1",
    question: "Weiß KI automatisch die Wahrheit?",
    answer:
      "Nein. KI kann überzeugend klingen und trotzdem falsch liegen. Wichtige Aussagen solltest du selbst prüfen.",
    sourceNote: "Lektion l1 · Abschnitt „Typischer Fehler“",
  },
  {
    id: "l1-safe-use",
    lessonId: "l1",
    question: "Wie nutze ich KI sicher?",
    answer:
      "Nutze KI als Hilfe zum Verstehen und Formulieren. Prüfe wichtige Aussagen trotzdem selbst — besonders bei Fakten, Entscheidungen und persönlichen Themen.",
    sourceNote: "Lektion l1 · Abschnitt „Sicher arbeiten“",
  },
] as const;

export function listMockTutorPrompts(lessonId: string): MockTutorPrompt[] {
  return MOCK_TUTOR_PROMPTS.filter((prompt) => prompt.lessonId === lessonId);
}

export function answerMockTutor(
  request: MockTutorRequest,
): MockTutorResponse {
  const prompt = MOCK_TUTOR_PROMPTS.find(
    (entry) =>
      entry.lessonId === request.lessonId && entry.id === request.promptId,
  );

  if (!prompt) {
    return {
      mode: MOCK_TUTOR_MODE,
      lessonId: request.lessonId,
      promptId: request.promptId,
      status: "abstain",
      question: "",
      answer:
        "Dazu gibt es hier keine feste Antwort. Lies die Lektion oder wähle eine der vorgegebenen Übungsfragen.",
      honesty: HONESTY,
      sourceNote: "Enthaltung · kein freier Chat in M5-A",
    };
  }

  return {
    mode: MOCK_TUTOR_MODE,
    lessonId: prompt.lessonId,
    promptId: prompt.id,
    status: "answered",
    question: prompt.question,
    answer: prompt.answer,
    honesty: HONESTY,
    sourceNote: prompt.sourceNote,
  };
}
