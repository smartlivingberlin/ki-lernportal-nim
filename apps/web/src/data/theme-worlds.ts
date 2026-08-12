import type { ThemeWorld } from "./types";

/**
 * Zehn Themenwelten als skalierbare Content-Architektur.
 * Schema-v2-Micro-Einheiten aktiv: KI ohne Angst, Chat & Prompting,
 * Recherche & Wahrheit, Arbeit & Alltag, Daten/Sicherheit & Recht,
 * Bilder/Audio & Video, Modelle, Agenten, Vibe Coding, Fortgeschrittene Praxis.
 */
export const themeWorlds: ThemeWorld[] = [
  {
    id: "world-no-fear",
    title: "KI ohne Angst",
    shortLabel: "Ohne Angst",
    goalPrompt: "Ich will verstehen, was KI ist — ohne Fachchinesisch.",
    description:
      "Was KI kann, was sie nicht kann und wie du sicher die ersten Schritte machst.",
    audienceLevel: 0,
    estimatedUnits: 10,
    status: "active",
    accent: "teal",
    starterLessonId: "l1",
    learningOutcomes: [
      "KI in Alltagssprache erklären",
      "Risiken erkennen ohne Panik",
      "eine erste sichere Frage stellen",
    ],
  },
  {
    id: "world-chat-prompting",
    title: "Chat & Prompting",
    shortLabel: "Prompts",
    goalPrompt: "Ich will bessere Fragen stellen und klarere Antworten bekommen.",
    description:
      "Gute Prompts, Kontext, Rollen, Beispiele und Iteration — Schritt für Schritt.",
    audienceLevel: 1,
    estimatedUnits: 12,
    status: "active",
    accent: "coral",
    starterLessonId: "l4",
    learningOutcomes: [
      "Prompt-Formel anwenden",
      "Texte verbessern lassen",
      "Antworten kritisch prüfen",
    ],
  },
  {
    id: "world-research-truth",
    title: "Recherche & Wahrheit",
    shortLabel: "Wahrheit",
    goalPrompt: "Ich will wissen, wann KI irrt und wie ich das prüfe.",
    description:
      "Halluzinationen erkennen, Quellen prüfen und Gegenprüfung lernen.",
    audienceLevel: 1,
    estimatedUnits: 10,
    status: "active",
    accent: "teal",
    starterLessonId: "l8",
    learningOutcomes: [
      "Halluzinationen erkennen",
      "Quellen vergleichen",
      "nicht blind übernehmen",
    ],
  },
  {
    id: "world-work-life",
    title: "Arbeit & Alltag",
    shortLabel: "Alltag",
    goalPrompt: "Ich will KI für E-Mails, Planung und Alltag sinnvoll nutzen.",
    description:
      "Schreiben, Organisieren, Lernen und Arbeitsabläufe mit klaren Sicherheitsregeln.",
    audienceLevel: 2,
    estimatedUnits: 12,
    status: "active",
    accent: "coral",
    starterLessonId: "l11",
    learningOutcomes: [
      "Alltagsaufgaben auswählen",
      "Datenschutz beachten",
      "Arbeitsergebnisse prüfen",
    ],
  },
  {
    id: "world-multimodal",
    title: "Bilder, Audio & Video",
    shortLabel: "Medien",
    goalPrompt: "Ich will Bilder und Medien mit KI erzeugen — und die Grenzen kennen.",
    description:
      "Generieren, bearbeiten, Rechte, Qualität und gute Prompts für multimodale KI.",
    audienceLevel: 2,
    estimatedUnits: 12,
    status: "active",
    accent: "teal",
    starterLessonId: null,
    learningOutcomes: [
      "Medienaufgaben formulieren",
      "Rechte und Herkunft beachten",
      "Qualität kritisch bewerten",
    ],
  },
  {
    id: "world-models",
    title: "Modelle verstehen",
    shortLabel: "Modelle",
    goalPrompt: "Ich will das passende Modell für meine Aufgabe finden.",
    description:
      "Chat, Reasoning, Vision, Audio, Video, Embeddings und Open Models verständlich einordnen.",
    audienceLevel: 3,
    estimatedUnits: 10,
    status: "active",
    accent: "coral",
    starterLessonId: null,
    learningOutcomes: [
      "Modellarten unterscheiden",
      "nach Aufgabe statt Hype wählen",
      "Kosten und Datenschutz einordnen",
    ],
  },
  {
    id: "world-agents",
    title: "Agenten & Automationen",
    shortLabel: "Agenten",
    goalPrompt: "Ich will verstehen, was KI-Agenten wirklich tun.",
    description:
      "Tools, Aktionen, MCP, Workflows und Human-in-the-loop in einfacher Sprache.",
    audienceLevel: 3,
    estimatedUnits: 12,
    status: "active",
    accent: "teal",
    starterLessonId: null,
    learningOutcomes: [
      "Chat vs. Agent unterscheiden",
      "Rechte klein halten",
      "Prüfschritte einbauen",
    ],
  },
  {
    id: "world-vibe-coding",
    title: "Vibe Coding",
    shortLabel: "Bauen",
    goalPrompt: "Ich will mit KI etwas Kleines bauen — von Null an.",
    description:
      "Vom Wunsch zur App: Prompt, Plan, Dateien, Git, Tests, Debugging und Deploy.",
    audienceLevel: 4,
    estimatedUnits: 16,
    status: "active",
    accent: "coral",
    starterLessonId: null,
    learningOutcomes: [
      "Idee in Schritte zerlegen",
      "Code prüfen statt blind übernehmen",
      "Secrets und Sicherheit beachten",
    ],
  },
  {
    id: "world-safety-law",
    title: "Daten, Sicherheit & Recht",
    shortLabel: "Sicherheit",
    goalPrompt: "Ich will KI nutzen, ohne private Daten zu riskieren.",
    description:
      "Datenschutz, vertrauliche Daten, AI-Act-Literacy und Urheberrecht-Grundlagen.",
    audienceLevel: 2,
    estimatedUnits: 10,
    status: "active",
    accent: "teal",
    starterLessonId: "l10",
    learningOutcomes: [
      "sensible Daten erkennen",
      "sichere Prompt-Gewohnheiten",
      "rechtliche Grundregeln kennen",
    ],
  },
  {
    id: "world-advanced",
    title: "Fortgeschrittene Praxis",
    shortLabel: "Praxis+",
    goalPrompt: "Ich will RAG, APIs und Evaluation verstehen.",
    description:
      "APIs, RAG, Evaluation, Kosten, Guardrails und Monitoring — klar und praxisnah.",
    audienceLevel: 5,
    estimatedUnits: 12,
    status: "active",
    accent: "coral",
    starterLessonId: null,
    learningOutcomes: [
      "RAG grob erklären",
      "Evaluation und Kosten einordnen",
      "Guardrails verstehen",
    ],
  },
];

export const activeThemeWorlds = themeWorlds.filter(
  (world) => world.status === "active" || world.status === "planned",
);
