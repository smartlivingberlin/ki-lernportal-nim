export type HelpTip = {
  id: string;
  label: string;
  short: string;
  medium: string;
  deep: {
    whatFor: string;
    howTo: string[];
    example: string;
    mistake: string;
    nextHint?: string;
  };
};

/**
 * Kontextuelle Hilfe-Karten für Laien.
 * Kurz → Mittel → Tief (Progressive Disclosure).
 */
export const helpTips: HelpTip[] = [
  {
    id: "ziele",
    label: "Ziel wählen",
    short: "Hier suchst du aus, was du heute mit KI üben willst.",
    medium:
      "Jede Kachel ist eine Themenwelt. Nach dem Antippen siehst du kurze Lerneinheiten und Übungen dazu.",
    deep: {
      whatFor: "Damit du nicht alles auf einmal lernen musst — nur ein klares Ziel.",
      howTo: [
        "Antippe eine Kachel, die zu dir passt.",
        "Öffne die erste Micro-Einheit oder Challenge.",
        "Wenn es zu viel wirkt: Simple Mode einschalten.",
      ],
      example: "Ziel „Recherche & Wahrheit“ → Einheit zu Halluzinationen → eine Challenge.",
      mistake: "Alle Welten parallel öffnen und dann überfordert abbrechen.",
      nextHint: "Danach: eine Einheit lesen und die Prompt-Werkbank ausprobieren.",
    },
  },
  {
    id: "simple-mode",
    label: "Simple Mode",
    short: "Weniger Elemente auf dem Bildschirm — ruhiger Einstieg.",
    medium:
      "Simple Mode blendet Nebenbereiche aus und zeigt größere, klarere Texte. Ideal, wenn die Seite zu voll wirkt.",
    deep: {
      whatFor: "Digitale Unsicherheit und Reizüberflutung senken.",
      howTo: [
        "Schalter „Simple Mode“ oben einschalten.",
        "Nur Ziel, Lernen und Üben nutzen.",
        "Später wieder ausschalten, wenn du mehr Details willst.",
      ],
      example: "Statt vieler Panels siehst du die wichtigsten Schritte nacheinander.",
      mistake: "Simple Mode für „weniger lernen“ halten — du lernst weiter, nur ruhiger.",
    },
  },
  {
    id: "themenwelt",
    label: "Themenwelt / Micro-Einheiten",
    short: "Kleine Lernhappen: Warum → Beispiel → Üben → Prüfen.",
    medium:
      "Jede Einheit ist kurz. Du siehst Nutzen, Schritte, Übung und Fragen — keine lange Vorlesung.",
    deep: {
      whatFor: "Damit Wissen hängen bleibt und du sofort etwas ausprobieren kannst.",
      howTo: [
        "Einheit antippen.",
        "Beispielweg lesen.",
        "Übung selbst machen und Teach-back schreiben.",
      ],
      example: "5 Minuten „Was ist ein Prompt?“ inkl. eigener Mini-Übung.",
      mistake: "Nur überfliegen und die Abruffragen überspringen.",
    },
  },
  {
    id: "werkzeuge",
    label: "Werkzeuge",
    short: "Lokale Hilfen: Prompt bauen, Datenschutz prüfen, Quellen notieren.",
    medium:
      "Alles läuft in deinem Browser. Nichts wird hier an eine KI-Cloud geschickt — du übst nur die Methode.",
    deep: {
      whatFor: "Sichere Gewohnheiten trainieren, bevor du echte Chats nutzt.",
      howTo: [
        "Prompt-Werkbank: Rolle, Aufgabe, Format, Grenze ausfüllen.",
        "Datenschutz-Check: Punkte abhaken und Entwurf scannen.",
        "Quellen-Workflow: eine Aussage gegenprüfen.",
      ],
      example: "Prompt bauen → Privacy-Check → erst dann in einem externen Chat nutzen.",
      mistake: "Werkzeuge mit „KI antwortet hier live“ verwechseln — sie trainieren dich.",
    },
  },
  {
    id: "challenge",
    label: "Challenge",
    short: "Kurze Entscheidung mit Erklärung — Fehler sind erlaubt.",
    medium:
      "Du wählst eine Option und bekommst Feedback. Danach kannst du den Gedanken in eigenen Worten wiederholen.",
    deep: {
      whatFor: "Verständnis prüfen, ohne Prüfungsdruck.",
      howTo: [
        "Situation lesen.",
        "Eine Antwort wählen.",
        "Feedback lesen und Teach-back ausfüllen.",
      ],
      example: "Alltagsszene „Förder-Tipp teilen?“ → richtige Option: erst Quelle prüfen.",
      mistake: "Nur tippen und Feedback ignorieren.",
    },
  },
  {
    id: "fortschritt",
    label: "Lernfortschritt",
    short: "Dein Haken bleibt lokal im Browser — kein Konto nötig.",
    medium:
      "Erledigte Lektionen speichert dieses Gerät. Anderer Browser oder Reset = anderer Stand.",
    deep: {
      whatFor: "Weitermachen ohne Anmeldung, bei voller Kontrolle über deine Daten.",
      howTo: [
        "Lektion als erledigt markieren.",
        "„Hier weitermachen“ nutzt den nächsten offenen Schritt.",
        "Reset nur, wenn du wirklich neu starten willst.",
      ],
      example: "3 von 12 Lektionen erledigt → nächste offene Lektion wird vorgeschlagen.",
      mistake: "Annehmen, der Fortschritt sei in der Cloud gespeichert.",
    },
  },
  {
    id: "modelle",
    label: "Model Navigator",
    short: "Modell-Arten grob einordnen — ohne Hype und ohne Kaufdruck.",
    medium:
      "Du siehst, wofür Chat, Vision oder Reasoning typischerweise gut sind — und was du prüfen solltest.",
    deep: {
      whatFor: "Aufgabe zuerst klären, dann passenden Typ wählen.",
      howTo: [
        "Aufgabe in einem Satz formulieren.",
        "Im Navigator den passenden Typ lesen.",
        "Datenschutz und Prüfung nicht vergessen.",
      ],
      example: "Foto einer Speisekarte erklären → Vision-Typ, keine sensiblen Fotos.",
      mistake: "„Bestes Modell der Welt“ suchen statt die Aufgabe zu klären.",
    },
  },
  {
    id: "glossar",
    label: "Glossar / Fachbegriffe",
    short: "Unterstrichene Begriffe: Maus darüber oder tippen — Erklärung in Schichten.",
    medium:
      "Fachwörter werden sofort in Alltagssprache übersetzt. Du musst nichts auswendig lernen.",
    deep: {
      whatFor: "Angst vor Fachchinesisch nehmen und mitreden können.",
      howTo: [
        "Mit der Maus über den markierten Begriff fahren — oder tippen/klicken.",
        "Kurz lesen; bei Bedarf „Mehr“ öffnen.",
        "Teach-back: dem Begriff einen eigenen Satz geben.",
      ],
      example: "„Halluzination“ → KI klingt sicher, ist aber falsch.",
      mistake: "Fachwörter überspringen und später ratlos sein.",
    },
  },
];

export function helpTipById(id: string): HelpTip | null {
  return helpTips.find((tip) => tip.id === id) ?? null;
}
