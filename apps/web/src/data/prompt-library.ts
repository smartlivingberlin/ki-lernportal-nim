/**
 * Prompt-Bibliothek — fertige Vorlagen zum Kopieren.
 * Lokal im Browser, keine Cloud-KI hinter dem Portal.
 */
export type PromptTemplate = {
  id: string;
  title: string;
  category: "alltag" | "beruf" | "lernen" | "sicherheit";
  useWhen: string;
  prompt: string;
  privacyNote: string;
  tip: string;
};

export const promptLibraryMeta = {
  title: "Prompt-Bibliothek",
  intro:
    "Fertige Textbausteine zum Kopieren. Passe Platzhalter an — und lasse echte Namen, Passwörter und Geheimnisse weg. Das Portal sendet nichts an eine KI-Cloud.",
} as const;

export const promptTemplates: PromptTemplate[] = [
  {
    id: "prompt-agenda",
    title: "Team-Agenda in 30 Minuten",
    category: "beruf",
    useWhen: "Du brauchst eine neutrale Meeting-Struktur.",
    prompt:
      "Erstelle eine 30-Minuten-Agenda mit Zeitangaben für: Begrüßung, Fortschritt, Blocker, Entscheidungen, nächste Schritte. Neutrale Platzhalter, keine echten Kundennamen, kein vertraulicher Inhalt.",
    privacyNote: "Keine Kundennamen, Aktenzeichen oder internen Zahlen einfügen.",
    tip: "Danach selbst prüfen: Passt die Reihenfolge zu eurem Ziel?",
  },
  {
    id: "prompt-email-polite",
    title: "Höfliche E-Mail umformulieren",
    category: "alltag",
    useWhen: "Dein Entwurf klingt zu schroff oder unsicher.",
    prompt:
      "Formuliere den folgenden Entwurf freundlicher und klarer. Behalte die Fakten. Kürze Floskeln. Markiere unsichere Annahmen. Entwurf: „[HIER TEXT OHNE PERSONENBEZOGENE DATEN]“",
    privacyNote: "Adressen, Telefonnummern und interne Details vorher entfernen.",
    tip: "Vergleiche Entwurf und Vorschlag Zeile für Zeile.",
  },
  {
    id: "prompt-summary",
    title: "Langen Text kurz machen",
    category: "lernen",
    useWhen: "Du willst die Kernaussagen in 5 Bulletpoints.",
    prompt:
      "Fasse den folgenden Text in fünf Bulletpoints zusammen. Trenne Fakten und Meinungen. Liste Unklarheiten separat. Text: „[HIER TEXT]“",
    privacyNote: "Keine vertraulichen Dokumente hochladen — nur öffentliche oder eigene Notizen.",
    tip: "Prüfe, ob etwas Wichtiges fehlt oder hinzugedichtet wurde.",
  },
  {
    id: "prompt-learn-plan",
    title: "Lernplan für 7 Tage",
    category: "lernen",
    useWhen: "Du willst KI-Grundlagen in kleinen Happen lernen.",
    prompt:
      "Erstelle einen 7-Tage-Lernplan für absolute Anfänger:innen zum Thema „KI sicher im Alltag“. Pro Tag max. 20 Minuten, ohne Programmierkenntnisse, mit einer Mini-Übung und einer Sicherheitsregel.",
    privacyNote: "Keine persönlichen Gesundheits- oder Finanzdaten angeben.",
    tip: "Nutze den Plan parallel zum 60-Minuten-Pfad in diesem Portal.",
  },
  {
    id: "prompt-explain-like-12",
    title: "Erklär’s wie für eine 12-Jährige",
    category: "lernen",
    useWhen: "Ein Begriff ist zu abstrakt.",
    prompt:
      "Erkläre „[BEGRIFF]“ in einfachem Deutsch, wie für eine 12-jährige Person. Ein Alltagsbeispiel, eine Grenze („was es nicht ist“), ein Satz „worauf du achten solltest“.",
    privacyNote: "Unkritisch — trotzdem keine privaten Beispiele mit echten Namen.",
    tip: "Teach-back: Erklär denselben Begriff danach selbst laut.",
  },
  {
    id: "prompt-checklist-privacy",
    title: "Datenschutz-Check vor dem Absenden",
    category: "sicherheit",
    useWhen: "Du willst einen Prompt auf Risiken scannen.",
    prompt:
      "Prüfe den folgenden Prompt auf Datenschutzrisiken. Liste: (1) mögliche personenbezogene Daten, (2) Geheimnisse, (3) Formulierungsvorschläge mit Platzhaltern. Prompt: „[HIER PROMPT]“",
    privacyNote: "Wenn der Prompt schon Geheimnisse enthält: nicht in externe Tools kopieren — lokal ersetzen.",
    tip: "Im Portal gibt es zusätzlich den Datenschutz-Check unter Werkzeuge.",
  },
  {
    id: "prompt-job-bullets",
    title: "Bewerbungs-Stichpunkte schärfen",
    category: "beruf",
    useWhen: "Du hast Stichpunkte und willst klarere Formulierungen.",
    prompt:
      "Verbessere diese Bewerbungs-Stichpunkte: klarer Nutzen, messbare Formulierungen wo möglich, ohne Übertreibung. Keine erfundenen Zahlen. Stichpunkte: „[HIER]“",
    privacyNote: "Arbeitgeber und Gehaltszahlen nur, wenn du das wirklich teilen willst.",
    tip: "Alles, was die KI „dazu erfindet“, wieder streichen.",
  },
  {
    id: "prompt-family-explain",
    title: "KI der Familie erklären",
    category: "alltag",
    useWhen: "Du willst Angehörigen eine ruhige Erklärung geben.",
    prompt:
      "Schreibe eine kurze Erklärung (max. 120 Wörter) für Angehörige: Was generative KI ungefähr ist, was sie nicht ist, und drei Sicherheitsregeln (keine Geheimnisse, prüfen, selbst entscheiden). Ton: ruhig, ohne Panik.",
    privacyNote: "Keine Familiengeschichten mit echten Diagnosen oder Konflikten einfügen.",
    tip: "Danach die drei Regeln gemeinsam üben.",
  },
  {
    id: "prompt-claim-check",
    title: "Behauptung zerlegen",
    category: "sicherheit",
    useWhen: "Ein KI-Tipp oder Kettenbrief klingt zu sicher.",
    prompt:
      "Zerlege diese Behauptung: (1) Was genau wird behauptet? (2) Welche Teile sind überprüfbar? (3) Welche Gegenfragen sollte ich stellen? (4) Was wäre ein vorsichtiger nächster Schritt? Behauptung: „[HIER]“",
    privacyNote: "Keine Screenshots mit Personen oder Kontoinformationen einfügen.",
    tip: "Im Quellenraum eine passende Quelle öffnen und gegenlesen.",
  },
  {
    id: "prompt-reply-no",
    title: "Freundliche Absage",
    category: "alltag",
    useWhen: "Du willst Nein sagen, ohne grob zu wirken.",
    prompt:
      "Formuliere eine kurze, freundliche Absage auf Deutsch. Situation: „[HIER OHNE NAMEN]“. Klar, höflich, ohne Ausreden-Roman. Biete optional eine Alternative an.",
    privacyNote: "Namen und Kontaktdaten weglassen oder anonymisieren.",
    tip: "Sende nichts, bevor du den Ton noch einmal selbst gelesen hast.",
  },
];

export const promptCategories = [
  { id: "alltag", label: "Alltag" },
  { id: "beruf", label: "Beruf" },
  { id: "lernen", label: "Lernen" },
  { id: "sicherheit", label: "Sicherheit" },
] as const;
