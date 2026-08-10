import { ModelCard, DifficultyLevel, TrustLevel } from "./types";

/**
 * Statischer Model-Navigator — Fähigkeiten vor Marken-Hype.
 * Kein Autopublish; lastChecked manuell gepflegt.
 */
export const seedModelCards: ModelCard[] = [
  {
    id: "m1",
    name: "Mixtral 8x7B",
    type: "Sprachmodell",
    useCase: "Code & Text",
    difficulty: DifficultyLevel.Intermediate,
    privacyNote:
      "Je nach Anbieter können Eingaben verarbeitet oder gespeichert werden. Keine Geheimnisse eingeben.",
    trustLevel: TrustLevel.High,
    displayAllowed: true,
    riskNote: "Kann bei komplexen Fakten halluzinieren — Ergebnisse prüfen.",
    plainPurpose:
      "Ein vielseitiges Text- und Code-Modell für Entwürfe, Erklärungen und technische Formulierungen.",
    strengths: [
      "Gute Allround-Hilfe für Text und Code-Skizzen",
      "Oft verständliche Erklärungen",
      "Geeignet für Zwischenschritte beim Schreiben",
    ],
    limits: [
      "Keine Wahrheitsgarantie",
      "Keine Bindung an aktuelle Firmenregeln ohne Kontext",
      "Nicht automatisch datenschutzkonform",
    ],
    capabilities: ["chat", "coding", "reasoning", "local-open"],
    costHint: "Abhängig von Hosting/Anbieter — vor Nutzung Kosten prüfen.",
    officialSourceName: "Mistral AI — Mixtral docs",
    officialSourceUrl: "https://docs.mistral.ai/",
    lastChecked: "2026-08-10",
  },
  {
    id: "m2",
    name: "Llama 3.1 8B",
    type: "Sprachmodell",
    useCase: "Chat & Hilfe",
    difficulty: DifficultyLevel.Beginner,
    privacyNote:
      "Lokal oder beim Anbieter: Datensparsam bleiben. Demo-Status im Portal.",
    trustLevel: TrustLevel.Medium,
    displayAllowed: true,
    riskNote: "Kleinere Modelle können bei schwierigen Themen schneller irren.",
    plainPurpose:
      "Ein zugängliches Chat-Modell für Einstiegsfragen, Umformulieren und einfache Erklärungen.",
    strengths: [
      "Gut für Anfänger-Prompts",
      "Nützlich zum Üben ohne Überforderung",
      "Oft lokal/open einsetzbar",
    ],
    limits: [
      "Weniger stark bei sehr komplexen Aufgaben",
      "Aktuelle Fakten unsicher",
      "Qualität hängt stark vom Prompt ab",
    ],
    capabilities: ["chat", "local-open"],
    costHint: "Open-Weight — Hosting-Kosten können anfallen.",
    officialSourceName: "Meta Llama — Overview",
    officialSourceUrl: "https://www.llama.com/",
    lastChecked: "2026-08-10",
  },
  {
    id: "m3",
    name: "NV-Embed v2",
    type: "Bedeutungsvergleich",
    useCase: "Wissenssuche",
    difficulty: DifficultyLevel.Advanced,
    privacyNote:
      "Embeddings können Inhalte repräsentieren. Keine sensiblen Rohdaten ohne Freigabe.",
    trustLevel: TrustLevel.Verified,
    displayAllowed: true,
    riskNote: "Findet ähnliche Texte — ersetzt keine inhaltliche Prüfung.",
    plainPurpose:
      "Hilft Systemen, ähnliche Bedeutungen zu finden (Suche/RAG) — kein Chat-Gesprächspartner.",
    strengths: [
      "Gut für Ähnlichkeitssuche",
      "Baustein für Wissensabfragen",
      "Nützlich hinter der Kulisse von Suchfunktionen",
    ],
    limits: [
      "Antwortet nicht wie ein Chat",
      "Qualität hängt von den Index-Daten ab",
      "Kein Ersatz für Quellenkritik",
    ],
    capabilities: ["search-rag"],
    costHint: "Abhängig von NVIDIA/Hosting-Angebot.",
    officialSourceName: "NVIDIA — NIM / embedding models",
    officialSourceUrl: "https://build.nvidia.com/",
    lastChecked: "2026-08-10",
  },
  {
    id: "m4",
    name: "Llama-Reranker",
    type: "Ergebnis-Sortierung",
    useCase: "Suche-Optimierung",
    difficulty: DifficultyLevel.Advanced,
    privacyNote:
      "Verarbeitet Suchkandidaten. Sensible Dokumente nur in freigegebenen Umgebungen.",
    trustLevel: TrustLevel.Medium,
    displayAllowed: true,
    riskNote: "Sortiert Treffer neu — prüft nicht automatisch Wahrheitsgehalt.",
    plainPurpose:
      "Ordnet Suchergebnisse neu, damit die passenderen Treffer weiter oben stehen.",
    strengths: [
      "Verbessert Trefferlisten",
      "Hilfreich in RAG-/Suchpipelines",
      "Fokus auf Relevanz statt Chat-Stil",
    ],
    limits: [
      "Kein generatives Chat-Modell",
      "Schlechte Quelldaten bleiben schlecht",
      "Braucht vorbereitete Kandidaten",
    ],
    capabilities: ["search-rag", "local-open"],
    costHint: "Abhängig von Pipeline und Hosting.",
    officialSourceName: "Meta Llama / Hugging Face model cards",
    officialSourceUrl: "https://huggingface.co/meta-llama",
    lastChecked: "2026-08-10",
  },
];

export const publicModelCards = seedModelCards.filter((card) => card.displayAllowed);

export const capabilityLabels: Record<string, string> = {
  chat: "Chat & Text",
  reasoning: "Nachdenken / Schritte",
  vision: "Bilder verstehen",
  image: "Bilder erzeugen",
  coding: "Code-Hilfe",
  "search-rag": "Suche / RAG",
  "local-open": "Lokal / Open",
};
