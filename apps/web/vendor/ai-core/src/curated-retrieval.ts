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

/** Frozen pilot corpus — keep aligned with lesson teaching points (l1–l6). */
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
  {
    passageId: "l3-p-private",
    lessonId: "l3",
    sourceId: "eu-gdpr",
    revision: "2026-08-17",
    text: "Eine sichere KI-Frage ist klar, enthält aber keine privaten Daten wie Namen, Adresse, Telefonnummern oder Passwörter.",
    keywords: ["sichere", "private", "namen", "adresse", "passwort"],
  },
  {
    passageId: "l3-p-placeholder",
    lessonId: "l3",
    sourceId: "digcomp-30",
    revision: "2026-08-17",
    text: "Ersetze Namen durch neutrale Platzhalter. Beschreibe die Aufgabe allgemein und teile nur so viel Kontext, wie wirklich nötig ist.",
    keywords: ["platzhalter", "ersetzen", "allgemein", "kontext", "namen"],
  },
  {
    passageId: "l3-p-copy",
    lessonId: "l3",
    sourceId: "eu-gdpr",
    revision: "2026-08-17",
    text: "Kopiere keine privaten Daten in den Prompt, wenn eine allgemeine Beschreibung reicht.",
    keywords: ["kopieren", "prompt", "privaten", "beschreibung"],
  },
  {
    passageId: "l4-p-what",
    lessonId: "l4",
    sourceId: "digcomp-30",
    revision: "2026-08-17",
    text: "Ein Prompt ist deine Frage oder Aufgabe an die KI.",
    keywords: ["prompt", "aufgabe", "frage"],
  },
  {
    passageId: "l4-p-clear",
    lessonId: "l4",
    sourceId: "digcomp-30",
    revision: "2026-08-17",
    text: "Je klarer du sagst, was du brauchst, desto nützlicher wird die Antwort. Nenne Ziel, Zielgruppe, Länge und Stil.",
    keywords: ["klarer", "nützlicher", "zielgruppe", "länge", "stil"],
  },
  {
    passageId: "l4-p-vague",
    lessonId: "l4",
    sourceId: "digcomp-30",
    revision: "2026-08-17",
    text: "Ein zu ungenauer Prompt zwingt die KI zu raten, welches Ziel, welche Länge und welcher Stil gemeint sind.",
    keywords: ["ungenau", "raten", "ziel", "länge", "stil"],
  },
  {
    passageId: "l5-p-formula",
    lessonId: "l5",
    sourceId: "digcomp-30",
    revision: "2026-08-17",
    text: "Eine gute Grundformel lautet: Rolle + Aufgabe + Kontext + Format + Grenze. Du musst nicht immer alle Teile nutzen, aber die Formel hilft dir, genauer zu fragen.",
    keywords: ["formel", "rolle", "aufgabe", "kontext", "format", "grenze"],
  },
  {
    passageId: "l5-p-one",
    lessonId: "l5",
    sourceId: "digcomp-30",
    revision: "2026-08-17",
    text: "Schreibe lieber eine klare Aufgabe als fünf Aufgaben auf einmal. Sage auch, was die KI nicht tun soll.",
    keywords: ["klare", "einmal", "fünf", "nicht"],
  },
  {
    passageId: "l5-p-many",
    lessonId: "l5",
    sourceId: "digcomp-30",
    revision: "2026-08-17",
    text: "Man schreibt zu viele Themen in einen Prompt. Die Antwort wird dann lang, ungenau oder schwer prüfbar.",
    keywords: ["themen", "lang", "ungenau", "prüfbar"],
  },
  {
    passageId: "l6-p-help",
    lessonId: "l6",
    sourceId: "digcomp-30",
    revision: "2026-08-17",
    text: "KI kann helfen, einen Text freundlicher, kürzer, klarer oder sachlicher zu machen. Du bleibst aber verantwortlich dafür, ob der Inhalt stimmt.",
    keywords: ["freundlicher", "kürzer", "klarer", "verantwortlich", "inhalt"],
  },
  {
    passageId: "l6-p-private",
    lessonId: "l6",
    sourceId: "eu-gdpr",
    revision: "2026-08-17",
    text: "Entferne Namen, Adressen, Kundendaten und vertrauliche Details. Prüfe danach, ob die KI etwas erfunden oder verändert hat.",
    keywords: ["namen", "adressen", "kundendaten", "vertrauliche", "prüfen"],
  },
  {
    passageId: "l6-p-check",
    lessonId: "l6",
    sourceId: "digcomp-30",
    revision: "2026-08-17",
    text: "Man übernimmt den fertigen Text sofort und merkt nicht, dass ein Detail geändert wurde.",
    keywords: ["übernimmt", "sofort", "detail", "geändert"],
  },
  {
    passageId: "l7-p-ideas",
    lessonId: "l7",
    sourceId: "digcomp-30",
    revision: "2026-08-18",
    text: "KI kann dir schnell mehrere Vorschläge geben. Diese Vorschläge sind aber nur Möglichkeiten. Du entscheidest, was passt, was falsch ist und was verbessert werden muss.",
    keywords: ["vorschläge", "möglichkeiten", "entscheidest", "verbessert"],
  },
  {
    passageId: "l7-p-drafts",
    lessonId: "l7",
    sourceId: "oecd-ai-principles",
    revision: "2026-08-18",
    text: "Behandle Ideen als Entwürfe. Streiche schlechte Vorschläge. Verbessere gute Vorschläge. Prüfe Fakten, bevor du etwas veröffentlichst oder weitergibst.",
    keywords: ["entwürfe", "streiche", "verbessere", "fakten", "veröffentlichst"],
  },
  {
    passageId: "l7-p-first",
    lessonId: "l7",
    sourceId: "digcomp-30",
    revision: "2026-08-18",
    text: "Man nimmt die erste Liste der KI als fertige Lösung, obwohl manche Ideen unpassend oder oberflächlich sind.",
    keywords: ["erste", "liste", "fertige", "unpassend", "oberflächlich"],
  },
  {
    passageId: "l8-p-what",
    lessonId: "l8",
    sourceId: "nist-genai-profile",
    revision: "2026-08-18",
    text: "Eine Halluzination ist eine Antwort, die plausibel klingt, aber falsch oder unbelegt ist. Die KI kann Namen, Zahlen, Quellen oder Regeln erfinden.",
    keywords: ["halluzination", "plausibel", "unbelegt", "erfinden", "quellen"],
  },
  {
    passageId: "l8-p-signs",
    lessonId: "l8",
    sourceId: "nist-ai-rmf",
    revision: "2026-08-18",
    text: "Achte auf sehr genaue Zahlen ohne Quelle, erfundene Links, zu sichere Aussagen und Widersprüche zu bekannten Fakten.",
    keywords: ["zahlen", "quelle", "erfundene", "aussagen", "widersprüche", "fakten"],
  },
  {
    passageId: "l8-p-sure",
    lessonId: "l8",
    sourceId: "nist-genai-profile",
    revision: "2026-08-18",
    text: "Man fragt die KI, ob sie sicher ist, und glaubt dann der Bestätigung. Besser ist echte Quellenprüfung.",
    keywords: ["sicher", "bestätigung", "quellenprüfung"],
  },
  {
    passageId: "l9-p-what",
    lessonId: "l9",
    sourceId: "digcomp-30",
    revision: "2026-08-18",
    text: "Eine Quelle zeigt, woher eine Information kommt. Ohne Quelle kannst du schwer beurteilen, ob eine Aussage aktuell, richtig oder vollständig ist.",
    keywords: ["quelle", "information", "beurteilen", "aktuell", "vollständig"],
  },
  {
    passageId: "l9-p-check",
    lessonId: "l9",
    sourceId: "nist-genai-profile",
    revision: "2026-08-18",
    text: "Prüfe: Wer veröffentlicht die Information? Wann wurde sie aktualisiert? Passt die Quelle wirklich zur Aussage?",
    keywords: ["veröffentlicht", "aktualisiert", "quelle", "aussage"],
  },
  {
    passageId: "l9-p-proof",
    lessonId: "l9",
    sourceId: "digcomp-30",
    revision: "2026-08-18",
    text: "Man verwechselt eine schöne Erklärung mit einem Beleg. Eine Erklärung ist hilfreich, aber noch kein Nachweis.",
    keywords: ["erklärung", "beleg", "nachweis"],
  },
  {
    passageId: "l10-p-data",
    lessonId: "l10",
    sourceId: "eu-gdpr",
    revision: "2026-08-19",
    text: "Ein Prompt kann persönliche oder vertrauliche Daten enthalten. Dazu gehören Namen, Adressen, Telefonnummern, Passwörter, Kundendaten, Gesundheitsdaten oder Vertragsdetails.",
    keywords: ["prompt", "persönliche", "vertrauliche", "passwörter", "kundendaten", "gesundheitsdaten"],
  },
  {
    passageId: "l10-p-placeholder",
    lessonId: "l10",
    sourceId: "digcomp-30",
    revision: "2026-08-19",
    text: "Entferne Namen und ersetze sie durch Platzhalter. Kürze Dokumente auf das Nötigste. Gib keine Passwörter, Zugangsdaten oder Bankdaten ein.",
    keywords: ["platzhalter", "namen", "dokumente", "passwörter", "zugangsdaten", "bankdaten"],
  },
  {
    passageId: "l10-p-copy",
    lessonId: "l10",
    sourceId: "eu-gdpr",
    revision: "2026-08-19",
    text: "Man kopiert ganze Dokumente in einen Chat, obwohl nur ein kleiner Ausschnitt gebraucht wird.",
    keywords: ["dokumente", "chat", "ausschnitt", "kopiert"],
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
 * S56-C bis S56-C6 preset queries for the curated retrieval pilot UI.
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
  {
    id: "l3-q-private",
    lessonId: "l3",
    label: "Was ist eine sichere Frage?",
    query: "Was ist eine sichere KI-Frage ohne private Daten?",
  },
  {
    id: "l3-q-placeholder",
    lessonId: "l3",
    label: "Warum Platzhalter?",
    query: "Warum soll ich Namen durch Platzhalter ersetzen?",
  },
  {
    id: "l3-q-copy",
    lessonId: "l3",
    label: "Was nicht in den Prompt?",
    query: "Warum soll ich keine privaten Daten in den Prompt kopieren?",
  },
  {
    id: "l3-q-abstain",
    lessonId: "l3",
    label: "Beispiel ohne Evidenz",
    query: "Wie hoch ist der Bitcoin-Kurs heute?",
  },
  {
    id: "l4-q-what",
    lessonId: "l4",
    label: "Was ist ein Prompt?",
    query: "Was ist ein Prompt als Aufgabe an die KI?",
  },
  {
    id: "l4-q-clear",
    lessonId: "l4",
    label: "Warum klare Anweisungen?",
    query: "Warum wird die Antwort nützlicher wenn ich klarer Ziel und Stil nenne?",
  },
  {
    id: "l4-q-vague",
    lessonId: "l4",
    label: "Was bei ungenauem Prompt?",
    query: "Was passiert wenn der Prompt zu ungenau ist und die KI raten muss?",
  },
  {
    id: "l4-q-abstain",
    lessonId: "l4",
    label: "Beispiel ohne Evidenz",
    query: "Wie hoch ist der Bitcoin-Kurs heute?",
  },
  {
    id: "l5-q-formula",
    lessonId: "l5",
    label: "Was ist die Prompt-Formel?",
    query: "Was ist die Prompt-Formel mit Rolle Aufgabe Kontext Format und Grenze?",
  },
  {
    id: "l5-q-one",
    lessonId: "l5",
    label: "Warum nur eine Aufgabe?",
    query: "Warum lieber eine klare Aufgabe statt fünf Aufgaben auf einmal?",
  },
  {
    id: "l5-q-many",
    lessonId: "l5",
    label: "Was bei zu vielen Themen?",
    query: "Was passiert wenn zu viele Themen in einen Prompt kommen und die Antwort ungenau wird?",
  },
  {
    id: "l5-q-abstain",
    lessonId: "l5",
    label: "Beispiel ohne Evidenz",
    query: "Wie hoch ist der Bitcoin-Kurs heute?",
  },
  {
    id: "l6-q-help",
    lessonId: "l6",
    label: "Was kann KI am Text?",
    query: "Kann KI einen Text freundlicher kürzer und klarer machen?",
  },
  {
    id: "l6-q-private",
    lessonId: "l6",
    label: "Was vor dem Prompt entfernen?",
    query: "Warum Namen Adressen und Kundendaten vor dem Prompt entfernen?",
  },
  {
    id: "l6-q-check",
    lessonId: "l6",
    label: "Warum den Text prüfen?",
    query: "Warum nicht den fertigen Text sofort übernehmen wenn ein Detail geändert wurde?",
  },
  {
    id: "l6-q-abstain",
    lessonId: "l6",
    label: "Beispiel ohne Evidenz",
    query: "Wie hoch ist der Bitcoin-Kurs heute?",
  },
  {
    id: "l7-q-ideas",
    lessonId: "l7",
    label: "Was sind KI-Vorschläge?",
    query: "Sind KI-Vorschläge nur Möglichkeiten und entscheide ich selbst?",
  },
  {
    id: "l7-q-drafts",
    lessonId: "l7",
    label: "Wie mit Ideen umgehen?",
    query: "Warum Ideen als Entwürfe behandeln und Fakten prüfen?",
  },
  {
    id: "l7-q-first",
    lessonId: "l7",
    label: "Warum nicht die erste Liste?",
    query: "Warum nicht die erste Liste als fertige Lösung nehmen?",
  },
  {
    id: "l7-q-abstain",
    lessonId: "l7",
    label: "Beispiel ohne Evidenz",
    query: "Wie hoch ist der Bitcoin-Kurs heute?",
  },
  {
    id: "l8-q-what",
    lessonId: "l8",
    label: "Was ist eine Halluzination?",
    query: "Was ist eine Halluzination bei KI-Antworten die plausibel klingt aber unbelegt ist?",
  },
  {
    id: "l8-q-signs",
    lessonId: "l8",
    label: "Woran erkenne ich Warnzeichen?",
    query: "Woran erkenne ich genaue Zahlen ohne Quelle und zu sichere Aussagen?",
  },
  {
    id: "l8-q-sure",
    lessonId: "l8",
    label: "Hilft Bist du sicher?",
    query: "Warum hilft Bist du sicher nicht und echte Quellenprüfung besser ist?",
  },
  {
    id: "l8-q-abstain",
    lessonId: "l8",
    label: "Beispiel ohne Evidenz",
    query: "Wie hoch ist der Bitcoin-Kurs heute?",
  },
  {
    id: "l9-q-what",
    lessonId: "l9",
    label: "Was ist eine Quelle?",
    query: "Was ist eine Quelle und warum ohne Quelle schwer zu beurteilen ist ob eine Aussage aktuell richtig oder vollständig ist?",
  },
  {
    id: "l9-q-check",
    lessonId: "l9",
    label: "Wie prüfe ich Quellen?",
    query: "Wie prüfe ich ob jemand die Information veröffentlicht hat wann sie aktualisiert wurde und ob die Quelle zur Aussage passt?",
  },
  {
    id: "l9-q-proof",
    lessonId: "l9",
    label: "Erklärung oder Beleg?",
    query: "Warum ist eine schöne Erklärung kein Beleg und noch kein Nachweis?",
  },
  {
    id: "l9-q-abstain",
    lessonId: "l9",
    label: "Beispiel ohne Evidenz",
    query: "Wie hoch ist der Bitcoin-Kurs heute?",
  },
  {
    id: "l10-q-data",
    lessonId: "l10",
    label: "Was gehört nicht in den Prompt?",
    query: "Welche persönlichen oder vertraulichen Daten wie Namen Adressen Passwörter Kundendaten oder Vertragsdetails gehören nicht unüberlegt in einen Prompt?",
  },
  {
    id: "l10-q-placeholder",
    lessonId: "l10",
    label: "Platzhalter statt Namen",
    query: "Wie entferne ich Namen und ersetze sie durch Platzhalter und kürze Dokumente ohne Passwörter oder Bankdaten?",
  },
  {
    id: "l10-q-copy",
    lessonId: "l10",
    label: "Ganze Dokumente kopieren?",
    query: "Warum soll ich nicht ganze Dokumente in einen Chat kopieren wenn nur ein kleiner Ausschnitt gebraucht wird?",
  },
  {
    id: "l10-q-abstain",
    lessonId: "l10",
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
