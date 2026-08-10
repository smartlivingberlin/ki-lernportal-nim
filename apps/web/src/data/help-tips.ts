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
 * Kontextuelle Hilfe für Portal-Bereiche und Bedienelemente.
 * Kurz → Mittel → Tief (Progressive Disclosure).
 */
export const helpTips: HelpTip[] = [
  {
    id: "navigation",
    label: "Obere Navigation",
    short: "Springe zu Lernraum, Pfad, Coach oder Quellen — ohne die Seite zu verlassen.",
    medium:
      "Die Links scrollen zu den Bereichen. Ideal, wenn du dich verloren fühlst und schnell zurück willst.",
    deep: {
      whatFor: "Orientierung oben halten, statt wild zu suchen.",
      howTo: [
        "Antippe den Bereich, den du brauchst.",
        "Lernraum = Übungen und Ziele, Pfad = Lektionen, Coach = Sicherheit, Quellen = Nachweise.",
        "Auf dem Handy nutze auch die untere Leiste.",
      ],
      example: "Du bist in den Quellen → tippe „Lernraum“, um zurück zu den Zielen zu springen.",
      mistake: "Die Links für externe Websites halten — sie bleiben im Portal.",
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
    id: "hero",
    label: "Willkommen / Start",
    short: "Dein Einstieg: Ziel wählen oder genau dort weitermachen, wo du aufgehört hast.",
    medium:
      "„Ziel wählen“ führt zu den Themenwelten. „Hier weitermachen“ öffnet die nächste offene Lektion aus deinem lokalen Fortschritt.",
    deep: {
      whatFor: "Sofort handeln, ohne das Portal zu studieren.",
      howTo: [
        "Neu hier? Tippe „Ziel wählen“.",
        "Schon gestartet? Tippe „Hier weitermachen“.",
        "Die Karte „Heute empfohlen“ zeigt denselben nächsten Schritt.",
      ],
      example: "Nach Pause: „Hier weitermachen“ → Lektion 3 öffnet sich.",
      mistake: "Alles parallel anklicken und dann die Übersicht verlieren.",
    },
  },
  {
    id: "heute",
    label: "Heute empfohlen",
    short: "Eine konkrete nächste Lektion — berechnet aus deinem lokalen Fortschritt.",
    medium:
      "Die Karte schlägt die erste noch offene Lektion vor. Ein Tippen öffnet sie im Lernraum.",
    deep: {
      whatFor: "Entscheidungsaufwand senken: eine klare nächste Handlung.",
      howTo: [
        "Titel lesen.",
        "„Heute hier weitermachen“ antippen.",
        "Nach dem Üben als erledigt markieren.",
      ],
      example: "0/12 erledigt → Empfehlung ist meist Lektion 1 „Was ist KI?“.",
      mistake: "Die Empfehlung ignorieren und ziellos scrollen.",
    },
  },
  {
    id: "erststart",
    label: "3-Minuten-Coach",
    short: "Drei kurze Schritte für den sicheren Start — du kannst jederzeit abbrechen.",
    medium:
      "Ziel wählen → kleine Einheit öffnen → ein Werkzeug ausprobieren. Mehr brauchst du am Anfang nicht.",
    deep: {
      whatFor: "Angst vor dem „großen Portal“ nehmen.",
      howTo: [
        "Schritt 1 antippen und zur Zielwahl springen.",
        "Eine Themenwelt und eine Einheit öffnen.",
        "Ein lokales Werkzeug testen, dann Coach ausblenden.",
      ],
      example: "In drei Minuten: Welt „Chat & Prompting“ → Einheit → Prompt-Werkbank.",
      mistake: "Den Coach als Pflicht-Tutorial sehen und deshalb gar nicht starten.",
    },
  },
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
    id: "ziele-kachel",
    label: "Themenwelt-Kachel",
    short: "Antippen = diese Themenwelt aktivieren. Danach erscheinen passende Mini-Einheiten.",
    medium:
      "„Startklar“ heißt: Inhalt ist da. Die Kachel wechselt die aktive Welt — nicht die ganze Seite.",
    deep: {
      whatFor: "Ein Thema festlegen, bevor du übst.",
      howTo: [
        "Kachel antippen.",
        "Im Bereich darunter die Einheiten lesen.",
        "Eine Einheit öffnen und die kurze Übung machen.",
      ],
      example: "„Chat & Prompting“ antippen → Einheiten zu Rollen und Grenzen erscheinen.",
      mistake: "Nur die Titel lesen und keine Einheit öffnen.",
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
    id: "wiederholen",
    label: "Abruf / Wiederholen",
    short: "Kurze Fragen mit Abstand — so bleibt Wissen besser hängen.",
    medium:
      "Du siehst eine Frage, deckst die Antwort auf und sagst, wie sicher du warst. Unsicheres kommt früher wieder.",
    deep: {
      whatFor: "Aktives Erinnern statt nur Mitlesen.",
      howTo: [
        "Frage lesen, erst denken, dann Antwort anzeigen.",
        "Sicherheit ehrlich wählen.",
        "Quellennotiz lesen, wenn du unsicher warst.",
      ],
      example: "„Was ist eine Halluzination?“ → Antwort → „etwas unsicher“ → kommt bald wieder.",
      mistake: "Sofort „Antwort anzeigen“ tippen ohne nachzudenken.",
    },
  },
  {
    id: "methoden",
    label: "Lernmethoden",
    short: "Die Prinzipien hinter dem Portal: Beispiel → Abruf → Abstand → eigene Worte.",
    medium:
      "Du lernst nicht durch langes Lesen allein, sondern durch kurze Wiederholung und Anwendung.",
    deep: {
      whatFor: "Verstehen, warum die Übungen so aufgebaut sind.",
      howTo: [
        "Erst das Beispiel ansehen.",
        "Dann selbst abrufen.",
        "Später wiederholen und in eigenen Worten erklären.",
      ],
      example: "Worked Example in der Lektion → Abruffrage → Teach-back.",
      mistake: "Methodenübersicht lesen und die Übungen überspringen.",
    },
  },
  {
    id: "lektion",
    label: "Lektionsraum",
    short: "Hier liest und übst du die aktuelle Lektion Schritt für Schritt.",
    medium:
      "Ziel, Erklärung, Beispiel, Übung und Abschluss liegen untereinander. Am Ende kannst du „erledigt“ markieren.",
    deep: {
      whatFor: "Eine Lektion zu Ende bringen, ohne dich zu verlieren.",
      howTo: [
        "Von oben nach unten gehen.",
        "Die Mini-Übung wirklich ausfüllen.",
        "Als erledigt markieren, dann weiter.",
      ],
      example: "Lektion „Was ist KI?“ → Übung → Haken setzen.",
      mistake: "Nur die Überschrift lesen und sofort zur nächsten Lektion springen.",
    },
  },
  {
    id: "suche",
    label: "Lokale Suche",
    short: "Durchsucht nur die Inhalte dieses Portals — nichts wird ins Internet gesendet.",
    medium:
      "Tippe einen Begriff (z. B. Prompt, Datenschutz). Treffer führen zu Lektionen, Angeboten oder Glossar.",
    deep: {
      whatFor: "Schnell finden, ohne zu scrollen.",
      howTo: [
        "Mindestens zwei Zeichen eingeben.",
        "Treffer antippen.",
        "Bei Bedarf den Suchbegriff eingrenzen.",
      ],
      example: "Suche „Halluzination“ → passende Lektion und Begriff.",
      mistake: "Annehmen, die Suche würde das Web durchsuchen.",
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
    id: "lernpfad",
    label: "Lernpfad",
    short: "Die Lektionen in Reihenfolge — antippen öffnet die gewählte Lektion.",
    medium:
      "Module klappen auf. Grüne Haken = lokal erledigt. Die aktive Lektion ist hervorgehoben.",
    deep: {
      whatFor: "Den roten Faden behalten.",
      howTo: [
        "Modul öffnen.",
        "Lektion antippen.",
        "Nach dem Üben zurückkommen und den Haken setzen.",
      ],
      example: "Modul 1 → Lektion 2 antippen → im Lernraum erscheint der Inhalt.",
      mistake: "Reset drücken, nur um „aufzuräumen“ — der Fortschritt ist dann weg.",
    },
  },
  {
    id: "sicherheit",
    label: "Sicherheits-Coach",
    short: "Drei feste Regeln: keine Geheimnisse, Antworten prüfen, selbst entscheiden.",
    medium:
      "Der Coach erinnert dich bei jedem Schritt an sicheres Verhalten — besonders vor dem Kopieren in echte Chats.",
    deep: {
      whatFor: "Gewohnheiten schützen, bevor Schaden entsteht.",
      howTo: [
        "Die drei Regeln lesen.",
        "Vor jedem Prompt kurz dagegen prüfen.",
        "Unklare Begriffe im Glossar nachschlagen.",
      ],
      example: "Vor dem Absenden: Passwort? Personenbezogene Daten? Ungeprüfte Fakten?",
      mistake: "Regeln einmal lesen und danach ignorieren.",
    },
  },
  {
    id: "naechste",
    label: "Nächste offene Lektion",
    short: "Zeigt den nächsten sinnvollen Schritt anhand deiner Haken.",
    medium:
      "Ein Tippen bringt dich direkt zur empfohlenen Lektion. Fertig mit allen? Dann wiederholen oder Quellen prüfen.",
    deep: {
      whatFor: "Immer eine klare „nächste Handlung“ haben.",
      howTo: [
        "Vorschlag lesen.",
        "„Zu dieser Lektion“ antippen.",
        "Nach dem Abschluss den Fortschritt aktualisieren.",
      ],
      example: "Lektion 4 offen → Button öffnet genau diese Lektion.",
      mistake: "Immer bei Lektion 1 bleiben, obwohl schon viel erledigt ist.",
    },
  },
  {
    id: "quellen",
    label: "Quellenraum",
    short: "Geprüfte Ausgangspunkte — öffnen in einem neuen Tab.",
    medium:
      "Keine geheimen Links. Du siehst Name und Typ. Nutze sie, um Behauptungen nachzuprüfen.",
    deep: {
      whatFor: "Wahrheit und Herkunft sichtbar machen.",
      howTo: [
        "Eine Quelle antippen.",
        "Im neuen Tab überfliegen.",
        "Zurückkommen und die Aussage im Portal dagegen halten.",
      ],
      example: "OECD- oder EU-Quelle öffnen, bevor du einen KI-Tipp weitergibst.",
      mistake: "Quellenliste als „schon gelesen“ abhaken ohne zu öffnen.",
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
  {
    id: "ressourcen",
    label: "Weiterlernen",
    short: "Zusätzliche Angebote in Ruhe — optional, ohne Druck.",
    medium:
      "Drei Karten mit nächsten Schritten außerhalb der Kernlektionen. Nur ansehen, wenn du Kapazität hast.",
    deep: {
      whatFor: "Neugier kanalisieren, ohne den Hauptpfad zu sprengen.",
      howTo: [
        "Eine Karte lesen.",
        "Entscheiden: jetzt oder später.",
        "Zum Lernpfad zurückkehren.",
      ],
      example: "Nach Modul 1 eine Ressourcen-Karte als Inspiration lesen.",
      mistake: "Alles parallel starten und den Kernpfad liegen lassen.",
    },
  },
  {
    id: "mobilnav",
    label: "Untere Navigation",
    short: "Auf dem Handy: schnelle Sprünge zu den wichtigsten Bereichen.",
    medium:
      "Gleicher Sinn wie oben — nur daumengerecht. Lernraum, Pfad, Hilfe/Coach, Quellen.",
    deep: {
      whatFor: "Auch unterwegs Orientierung behalten.",
      howTo: [
        "Bereich antippen.",
        "Inhalt lesen.",
        "Zurück mit dem nächsten Tab.",
      ],
      example: "In der Bahn: „Hilfe“ → Sicherheits-Coach lesen.",
      mistake: "Untere und obere Navigation für unterschiedliche Orte halten.",
    },
  },
];

export function helpTipById(id: string): HelpTip | null {
  return helpTips.find((tip) => tip.id === id) ?? null;
}

/** Props-Helfer: markiert einen Bereich für die Cursor-Erklärungswolke. */
export function explainAttrs(tipId: string): { "data-explain": string } {
  return { "data-explain": tipId };
}
