/**
 * S56-A curated retrieval (no embeddings, no live LLM, no network).
 * Frozen passages with source/revision/chunk provenance + abstention.
 */

export const CURATED_RETRIEVAL_MODE = "curated_retrieval" as const;

export type CuratedRetrievalMode = typeof CURATED_RETRIEVAL_MODE;

export type CuratedCitation = {
  sourceId: string;
  revision: string;
  passageId: string;
  quote: string;
};

export type CuratedPassage = {
  passageId: string;
  lessonId: string;
  sourceId: string;
  revision: string;
  text: string;
  keywords: readonly string[];
};

export type CuratedRetrieveRequest = {
  lessonId: string;
  query: string;
};

export type CuratedRetrieveResult = {
  mode: CuratedRetrievalMode;
  status: "hit" | "abstain";
  lessonId: string;
  query: string;
  answer: string;
  citations: CuratedCitation[];
  honesty: string;
};

const HONESTY =
  "Kuratiertes Retrieval (S56-A) · feste Passagen · keine Embeddings · keine Live-KI.";

/** Frozen pilot corpus — keep aligned with lesson teaching points (l1, l2). */
export const CURATED_PASSAGES: readonly CuratedPassage[] = [
  {
    passageId: "l1-p-patterns",
    lessonId: "l1",
    sourceId: "digcomp-30",
    revision: "2026-08-16",
    text: "KI ist Software, die Muster erkennt und daraus Antworten, Vorschläge oder Inhalte erzeugt. Sie denkt nicht wie ein Mensch.",
    keywords: ["muster", "software", "ki", "denkt", "mensch"],
  },
  {
    passageId: "l1-p-truth",
    lessonId: "l1",
    sourceId: "oecd-ai-principles",
    revision: "2026-08-16",
    text: "KI kann überzeugend klingen und trotzdem falsch liegen. Wichtige Aussagen solltest du selbst prüfen.",
    keywords: ["wahrheit", "falsch", "prüfen", "überzeugend", "lügen"],
  },
  {
    passageId: "l1-p-safe",
    lessonId: "l1",
    sourceId: "digcomp-30",
    revision: "2026-08-16",
    text: "Nutze KI als Hilfe zum Verstehen und Formulieren. Prüfe wichtige Aussagen trotzdem selbst.",
    keywords: ["sicher", "hilfe", "prüfen", "formulieren", "verstehen"],
  },
  {
    passageId: "l2-p-strengths",
    lessonId: "l2",
    sourceId: "digcomp-30",
    revision: "2026-08-16",
    text: "KI kann Texte strukturieren, Ideen sammeln, Zusammenfassungen schreiben und Formulierungen verbessern.",
    keywords: ["strukturieren", "ideen", "zusammenfassung", "formulierungen", "stärken"],
  },
  {
    passageId: "l2-p-limits",
    lessonId: "l2",
    sourceId: "nist-ai-rmf",
    revision: "2026-08-16",
    text: "KI kann aktuelle Fakten nicht sicher garantieren und keine verbindliche Fachberatung ersetzen.",
    keywords: ["grenzen", "fakten", "garantieren", "fachberatung", "vorsicht"],
  },
  {
    passageId: "l2-p-safe",
    lessonId: "l2",
    sourceId: "digcomp-30",
    revision: "2026-08-16",
    text: "Nutze KI für Entwürfe, Erklärungen und Ideen. Bei Recht, Medizin, Steuern oder Verträgen brauchst du geeignete Quellen oder Fachpersonen.",
    keywords: ["entwürfe", "recht", "medizin", "fachpersonen", "verträge"],
  },
] as const;

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9äöüß\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOPWORDS = new Set([
  "der",
  "die",
  "das",
  "und",
  "oder",
  "ein",
  "eine",
  "ist",
  "sind",
  "wie",
  "was",
  "wer",
  "wo",
  "warum",
  "mit",
  "von",
  "zu",
  "im",
  "in",
  "am",
  "an",
  "auf",
  "für",
  "den",
  "dem",
  "des",
  "nicht",
  "auch",
  "noch",
  "nur",
  "heute",
  "hoch",
  "liegt",
]);

function scorePassage(passage: CuratedPassage, queryNorm: string): number {
  if (!queryNorm) return 0;
  const haystack = normalize(`${passage.text} ${passage.keywords.join(" ")}`);
  let score = 0;
  for (const token of queryNorm.split(" ")) {
    if (token.length < 4 || STOPWORDS.has(token)) continue;
    if (haystack.includes(token)) score += 1;
    if (passage.keywords.some((keyword) => normalize(keyword) === token)) {
      score += 1;
    }
  }
  return score;
}

export type CuratedUiQuery = {
  id: string;
  lessonId: string;
  label: string;
  query: string;
};

/**
 * S56-C / S56-C2 preset queries for the curated retrieval pilot UI.
 * Fixed buttons only — no free-text chat.
 */
export const CURATED_UI_QUERIES: readonly CuratedUiQuery[] = [
  {
    id: "l1-q-patterns",
    lessonId: "l1",
    label: "Erkennt KI Muster?",
    query: "Erkennt KI Muster wie Software?",
  },
  {
    id: "l1-q-truth",
    lessonId: "l1",
    label: "Kann KI falsch liegen?",
    query: "Kann KI falsch liegen und überzeugend klingen?",
  },
  {
    id: "l1-q-safe",
    lessonId: "l1",
    label: "Wie nutze ich KI sicher?",
    query: "Wie nutze ich KI sicher als Hilfe zum Verstehen?",
  },
  {
    id: "l1-q-abstain",
    lessonId: "l1",
    label: "Beispiel ohne Evidenz",
    query: "Wie hoch ist der Bitcoin-Kurs heute?",
  },
  {
    id: "l2-q-strengths",
    lessonId: "l2",
    label: "Was kann KI gut?",
    query: "Kann KI Texte strukturieren und Ideen sammeln?",
  },
  {
    id: "l2-q-limits",
    lessonId: "l2",
    label: "Wo liegen Grenzen?",
    query: "Kann KI Fakten garantieren und Fachberatung ersetzen?",
  },
  {
    id: "l2-q-safe",
    lessonId: "l2",
    label: "Wann brauche ich Fachpersonen?",
    query: "Brauche ich bei Recht und Medizin Fachpersonen statt nur KI?",
  },
  {
    id: "l2-q-abstain",
    lessonId: "l2",
    label: "Beispiel ohne Evidenz",
    query: "Wie hoch ist der Bitcoin-Kurs heute?",
  },
] as const;

export function listCuratedPassages(lessonId: string): CuratedPassage[] {
  return CURATED_PASSAGES.filter((passage) => passage.lessonId === lessonId);
}

export function listCuratedUiQueries(lessonId: string): CuratedUiQuery[] {
  return CURATED_UI_QUERIES.filter((entry) => entry.lessonId === lessonId);
}

/**
 * Deterministic curated retrieval. Module import performs no I/O.
 */
export function retrieveCurated(
  request: CuratedRetrieveRequest,
): CuratedRetrieveResult {
  const query = request.query.trim();
  const queryNorm = normalize(query);
  const candidates = listCuratedPassages(request.lessonId)
    .map((passage) => ({ passage, score: scorePassage(passage, queryNorm) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = candidates[0];
  if (!best || best.score < 2) {
    return {
      mode: CURATED_RETRIEVAL_MODE,
      status: "abstain",
      lessonId: request.lessonId,
      query,
      answer:
        "Dazu liegt in den freigegebenen Passagen keine ausreichende Evidenz vor.",
      citations: [],
      honesty: HONESTY,
    };
  }

  const citation: CuratedCitation = {
    sourceId: best.passage.sourceId,
    revision: best.passage.revision,
    passageId: best.passage.passageId,
    quote: best.passage.text,
  };

  return {
    mode: CURATED_RETRIEVAL_MODE,
    status: "hit",
    lessonId: request.lessonId,
    query,
    answer: best.passage.text,
    citations: [citation],
    honesty: HONESTY,
  };
}
