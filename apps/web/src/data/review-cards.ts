/**
 * Lokale Wiederholungs-„Datenbank“ (kuratiert, ohne Server-DB).
 * Karten mit Abruffragen und Quellenangaben (DigComp, NIST, EU, OECD).
 * Spaced Review speichert nur Fälligkeit lokal im Browser.
 */

export type ReviewCard = {
  id: string;
  worldId: string;
  prompt: string;
  answer: string;
  sourceIds: string[];
  sourceNote: string;
};

export const reviewCards: ReviewCard[] = [
  {
    id: "rev-ki-01",
    worldId: "world-no-fear",
    prompt: "Was ist KI — in einem Satz für Anfänger?",
    answer:
      "Ein Computerprogramm, das Aufgaben erledigt, für die man oft menschliche Intelligenz braucht (z. B. Texte formulieren) — aber nicht automatisch die Wahrheit kennt.",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    sourceNote: "DigComp 3.0 (digitale/KI-Kompetenz) und OECD AI Principles (menschenzentrierte KI).",
  },
  {
    id: "rev-prompt-01",
    worldId: "world-chat-prompting",
    prompt: "Was ist ein Prompt?",
    answer:
      "Die Aufgabe oder Frage, die du der KI gibst. Je klarer Ziel, Kontext und Format, desto brauchbarer die Antwort.",
    sourceIds: ["digcomp-30"],
    sourceNote: "DigComp 3.0: kompetenter, kritischer Umgang mit digitalen Werkzeugen.",
  },
  {
    id: "rev-halluzination-01",
    worldId: "world-research-truth",
    prompt: "Was bedeutet Halluzination bei KI?",
    answer:
      "Eine Antwort, die überzeugend klingt, aber falsch, erfunden oder unbelegt ist. Gegenprüfung mit einer unabhängigen Quelle hilft.",
    sourceIds: ["nist-genai-profile", "nist-ai-rmf"],
    sourceNote: "NIST Generative AI Profile / AI RMF: Risiken generativer KI und Prüfbedarf.",
  },
  {
    id: "rev-quelle-01",
    worldId: "world-research-truth",
    prompt: "Warum reicht „Die KI hat es erklärt“ nicht als Quelle?",
    answer:
      "Eine Erklärung hilft verstehen — eine Quelle ist ein nachprüfbarer Ort der Information (Wer? Wann? Passt sie zur Aussage?).",
    sourceIds: ["digcomp-30", "nist-genai-profile"],
    sourceNote: "DigComp (Informationskompetenz) und NIST GenAI-Profile.",
  },
  {
    id: "rev-datenschutz-01",
    worldId: "world-safety-law",
    prompt: "Was gehört nicht ungeprüft in einen Prompt?",
    answer:
      "Passwörter, Bankdaten, Gesundheitsdetails, Kundendaten und unnötig vollständige private Dokumente.",
    sourceIds: ["eu-gdpr", "digcomp-30"],
    sourceNote: "DSGVO (Datenschutz) und DigComp (sicheres digitales Handeln).",
  },
  {
    id: "rev-ai-act-01",
    worldId: "world-safety-law",
    prompt: "Was ist der AI Act — sehr kurz?",
    answer:
      "Ein EU-Rechtsrahmen für KI. Dazu gehört auch AI Literacy: Menschen sollen KI informiert und risikobewusst nutzen können.",
    sourceIds: ["eu-ai-act"],
    sourceNote: "EU-Kommission: AI Act / AI-Literacy-Hinweise (Art. 4 Kontext).",
  },
  {
    id: "rev-rag-01",
    worldId: "world-advanced",
    prompt: "Was bedeutet RAG / Antworten mit Quellenbezug — laienhaft?",
    answer:
      "Die KI schaut zuerst in ausgewählte Dokumente und antwortet danach. Das kann aktueller sein — Links und Aussagen trotzdem prüfen.",
    sourceIds: ["nist-genai-profile", "digcomp-30"],
    sourceNote: "NIST GenAI-Risiken und DigComp Informationsprüfung.",
  },
  {
    id: "rev-agent-01",
    worldId: "world-agents",
    prompt: "Worin unterscheidet sich ein KI-Agent grob von einem Chat?",
    answer:
      "Ein Chat antwortet vor allem mit Text. Ein Agent kann zusätzlich Schritte/Tools ausführen — deshalb Rechte klein halten und Prüfschritte einbauen.",
    sourceIds: ["nist-ai-rmf", "oecd-ai-principles"],
    sourceNote: "NIST AI RMF (Risiken/Steuerung) und OECD-Prinzipien (menschliche Kontrolle).",
  },
  {
    id: "rev-modell-01",
    worldId: "world-models",
    prompt: "Wonach wählst du ein Modell — statt nach Hype?",
    answer:
      "Nach Aufgabe (Text, Bild, Code, Recherche), Datenschutz, Kosten und wie gut du Ergebnisse prüfen kannst.",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    sourceNote: "DigComp (kompetente Werkzeugwahl) und NIST AI RMF.",
  },
  {
    id: "rev-vibe-01",
    worldId: "world-vibe-coding",
    prompt: "Welche Sicherheitsregel gilt beim Bauen mit KI-Code?",
    answer:
      "Keine Secrets in Prompts oder Git. Klein bauen, testen, Diff lesen, erst dann erweitern oder deployen.",
    sourceIds: ["digcomp-30", "nist-ai-rmf", "eu-gdpr"],
    sourceNote: "DigComp, NIST AI RMF und DSGVO-Datensparsamkeit.",
  },
  {
    id: "rev-medien-01",
    worldId: "world-multimodal",
    prompt: "Worauf achtest du bei KI-Bildern?",
    answer:
      "Rechte und Herkunft, keine sensiblen Fotos hochladen, Qualität kritisch bewerten, vor Veröffentlichung prüfen.",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    sourceNote: "DigComp (Medienkompetenz) und OECD AI Principles.",
  },
  {
    id: "rev-alltag-01",
    worldId: "world-work-life",
    prompt: "Wann ist KI im Alltag sinnvoll — und wann vorsichtig?",
    answer:
      "Gut: Entwürfe, Struktur, Erklären. Vorsichtig: Recht, Gesundheit, Finanzen, Verträge — dort prüfen oder Fachperson fragen.",
    sourceIds: ["eu-ai-act", "nist-ai-rmf", "oecd-ai-principles"],
    sourceNote: "EU AI Act Kontext, NIST AI RMF, OECD-Prinzipien.",
  },
];

export function reviewCardById(id: string): ReviewCard | null {
  return reviewCards.find((card) => card.id === id) ?? null;
}
