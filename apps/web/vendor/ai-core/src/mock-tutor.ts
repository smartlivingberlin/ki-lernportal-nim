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

/** Curated bank — keep in sync with lesson l1–l4 teaching points. */
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
  {
    id: "l2-strengths",
    lessonId: "l2",
    question: "Was kann KI gut?",
    answer:
      "KI kann Texte strukturieren, Ideen sammeln, Zusammenfassungen schreiben, Formulierungen verbessern und einfache Erklärungen geben.",
    sourceNote: "Lektion l2 · Abschnitt „Einfach erklärt“",
  },
  {
    id: "l2-limits",
    lessonId: "l2",
    question: "Was kann KI nicht sicher?",
    answer:
      "KI kann aktuelle Fakten nicht sicher garantieren, persönliche Situationen nicht vollständig beurteilen und keine verbindliche Fachberatung ersetzen.",
    sourceNote: "Lektion l2 · Abschnitt „Einfach erklärt“",
  },
  {
    id: "l2-experts",
    lessonId: "l2",
    question: "Wann brauche ich Fachpersonen?",
    answer:
      "Bei Recht, Medizin, Steuern, Finanzen oder Verträgen brauchst du geeignete Quellen oder Fachpersonen. KI darf dort nur Entwurf oder Erklärung sein, keine Entscheidung.",
    sourceNote: "Lektion l2 · Abschnitt „Sicher arbeiten“",
  },
  {
    id: "l3-safe-question",
    lessonId: "l3",
    question: "Was macht eine KI-Frage sicher?",
    answer:
      "Eine sichere KI-Frage ist klar, aber enthält keine privaten oder vertraulichen Daten. Du musst also nicht deinen Namen, deine Adresse, Telefonnummern, Passwörter, Kundendaten oder ganze Dokumente eingeben.",
    sourceNote: "Lektion l3 · Abschnitt „Einfach erklärt“",
  },
  {
    id: "l3-placeholders",
    lessonId: "l3",
    question: "Warum Platzhalter statt echter Namen?",
    answer:
      "Ersetze Namen durch neutrale Platzhalter. Beschreibe die Aufgabe allgemein. Teile nur so viel Kontext, wie wirklich nötig ist.",
    sourceNote: "Lektion l3 · Abschnitt „Sicher arbeiten“",
  },
  {
    id: "l3-no-copy",
    lessonId: "l3",
    question: "Warum keine privaten Daten in den Prompt kopieren?",
    answer:
      "Kopiere keine privaten Daten in den Prompt, wenn eine allgemeine Beschreibung reichen würde. Eine freundliche Erinnerung an Person A braucht keinen echten Namen, keine Adresse und keine privaten Details.",
    sourceNote: "Lektion l3 · Abschnitt „Typischer Fehler“",
  },
  {
    id: "l4-what-is-prompt",
    lessonId: "l4",
    question: "Was ist ein Prompt?",
    answer:
      "Ein Prompt ist deine Frage oder Aufgabe an die KI. Je klarer du sagst, was du brauchst, desto nützlicher wird die Antwort.",
    sourceNote: "Lektion l4 · Abschnitt „Einfach erklärt“",
  },
  {
    id: "l4-clear",
    lessonId: "l4",
    question: "Warum klare Anweisungen?",
    answer:
      "Nenne Ziel, Zielgruppe, Länge und Stil. Füge eine Grenze hinzu, wenn die KI etwas nicht tun soll.",
    sourceNote: "Lektion l4 · Abschnitt „Sicher arbeiten“",
  },
  {
    id: "l4-vague",
    lessonId: "l4",
    question: "Was passiert bei einem ungenauen Prompt?",
    answer:
      "Der Prompt ist zu ungenau. Dann muss die KI raten, welches Ziel, welche Länge und welcher Stil gemeint sind.",
    sourceNote: "Lektion l4 · Abschnitt „Typischer Fehler“",
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
