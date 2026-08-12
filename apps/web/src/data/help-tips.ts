export type HelpLink = {
  href: string;
  label: string;
  /** true = neuer Tab; false/undefined = Sprung im Portal */
  external?: boolean;
};

/**
 * Laien-Handbuch pro Portal-Bereich (Konzept A).
 * Immer gleiche Kapitel: Was / Wozu / Tun / Beispiel / Fehler / Links.
 */
export type HelpTip = {
  id: string;
  /** Klartext-Titel, keine Versalien */
  label: string;
  /** Ein Satz Orientierung (auch für aria) */
  short: string;
  whatIs: string;
  whatFor: string;
  canDo: string[];
  example: string;
  mistake: string;
  links: HelpLink[];
};

/**
 * Kontextuelle Hilfe für Portal-Bereiche und Bedienelemente.
 */
export const helpTips: HelpTip[] = [
  {
    id: "navigation",
    label: "Die Leiste oben",
    short: "Schnelle Sprünge zu den wichtigsten Bereichen — ohne die Seite zu verlassen.",
    whatIs:
      "Das ist die Orientierungsleiste dieses Portals. Die Einträge sind keine neuen Websites, sondern Sprungmarken auf derselben Seite: Lernraum, Pfad, Coach und Quellen.",
    whatFor:
      "Sie löst das Problem „Ich weiß nicht, wo ich bin“. Statt lange zu scrollen, kommst du mit einem Tippen zurück zu dem Bereich, den du brauchst — besonders hilfreich, wenn du dich digital leicht verlierst.",
    canDo: [
      "„Lernraum“ antippen → Ziele, Übungen und Werkzeuge.",
      "„Pfad“ antippen → Lektionen in Reihenfolge und dein Fortschritt.",
      "„Coach“ antippen → Sicherheitsregeln und ruhige Hinweise.",
      "„Quellen“ antippen → geprüfte Ausgangspunkte zum Nachlesen.",
      "Auf dem Handy zusätzlich die untere Leiste nutzen — gleicher Sinn, nur daumengerecht.",
    ],
    example:
      "Du bist bei den Quellen und willst wieder üben: tippe oben auf „Lernraum“. Die Seite scrollt dorthin, du musst nichts neu laden und kein Konto öffnen.",
    mistake:
      "Die Links für „externe Internetseiten“ halten. Sie bleiben im Portal. Externe Quellen erkennst du später im Quellenraum daran, dass sie in einem neuen Tab öffnen.",
    links: [
      { href: "#lernraum", label: "Zum Lernraum" },
      { href: "#pfad", label: "Zum Lernpfad" },
      { href: "#coach", label: "Zum Sicherheits-Coach" },
      { href: "#quellen", label: "Zum Quellenraum" },
    ],
  },
  {
    id: "simple-mode",
    label: "Einfache Ansicht",
    short: "Ruhiger Einstieg: Nebenbereiche nur ausgeblendet, nicht gelöscht.",
    whatIs:
      "Einfache Ansicht blendet Themenwelten, Werkzeuge, Suche und Extra-Szenarien aus und macht Texte ruhiger. Alle Inhalte bleiben im Portal.",
    whatFor:
      "Gegen das Gefühl „Die Seite ist zu voll“. Einsteiger:innen sehen den klaren Kernweg — ohne Angst vor Fehlklicks in Nebenräumen.",
    canDo: [
      "Schalter „Einfache Ansicht“ oben einschalten.",
      "Selbstcheck, Kurzpfad, Wiederholen, Scam und Lektionen nutzen.",
      "„Mehr Bereiche einblenden“ tippen oder den Schalter aus — dann erscheinen Welten und Werkzeuge wieder.",
    ],
    example:
      "Beim ersten Besuch: Einfache Ansicht an → drei Einstiegsschritte → später Schalter aus für Themenwelten.",
    mistake:
      "Einfache Ansicht mit „weniger lernen“ verwechseln. Du übst weiter. Es wird nur die Oberfläche verpackt.",
    links: [
      { href: "#erststart", label: "Zum Einstieg" },
      { href: "#lernraum", label: "Zum Lernraum" },
    ],
  },
  {
    id: "hero",
    label: "Willkommen und Start",
    short: "Dein Einstieg: in drei Schritten starten oder die heutige Empfehlung öffnen.",
    whatIs:
      "Das ist der Startbereich. Er fasst zusammen, worum es im Portal geht, und bietet klare Türen: Einstiegsroute, Selbstcheck, 60-Minuten-Pfad, Abruf — plus die Karte „Heute empfohlen“.",
    whatFor:
      "Er nimmt die Entscheidungslast. Du musst das Portal nicht erst „studieren“. Eine Handlung reicht: Einstieg folgen oder die Empfehlung öffnen.",
    canDo: [
      "Neu hier? „In 3 Schritten starten“ antippen — Selbstcheck, Kurzpfad, Abruf.",
      "Oder direkt „Selbstcheck“, „60-Minuten-Pfad“ oder „Abruf“ wählen.",
      "Die Karte „Heute empfohlen“ / „Heute hier weitermachen“ für die nächste offene Lektion nutzen.",
      "Oben den Fortschritt ablesen (lokal in diesem Browser).",
    ],
    example:
      "Nach einer Woche Pause: tippe „Heute hier weitermachen“. Das Portal öffnet die nächste offene Lektion — ohne Login und ohne zu raten, wo du warst.",
    mistake:
      "Alles gleichzeitig anklicken (Ziele, Werkzeuge, Quellen) und dann die Übersicht verlieren. Besser: eine Tür, ein Schritt.",
    links: [
      { href: "#einstieg-route", label: "In 3 Schritten starten" },
      { href: "#selbstcheck", label: "Selbstcheck" },
      { href: "#literacy-pfad", label: "60-Minuten-Pfad" },
      { href: "#heute", label: "Heute empfohlen" },
    ],
  },
  {
    id: "heute",
    label: "Nächster Schritt",
    short: "Eine gemeinsame Empfehlung: Selbstcheck → Kurzpfad → Wiederholen → Lektion → Vertiefen.",
    whatIs:
      "Die Heute-Karte folgt dem Portal-Vertrag „Nächster Schritt“. Kein Cloud-Algorithmus — nur dein lokaler Stand (Kurzpfad, Wiederholen, Lektionen).",
    whatFor:
      "Eine Handlung statt vieler Türen. Dieselbe Priorität wie Kurzpfad und Seitenleiste.",
    canDo: [
      "Den vorgeschlagenen Schritt antippen.",
      "Im Kurzpfad dieselbe Station wiederfinden.",
      "Themenwelten erst als Vertiefung nutzen — nicht als parallelen Start.",
    ],
    example:
      "Neu: „Selbstcheck machen“. Nach dem Check: nächste Kurzpfad-Station. Später: Lektion oder Wiederholen.",
    mistake:
      "Die Karte ignorieren und in alle Welten springen. Dann wirkt das Portal wieder überfordernd.",
    links: [
      { href: "#selbstcheck", label: "Selbstcheck" },
      { href: "#literacy-pfad", label: "Kurzpfad" },
      { href: "#pfad", label: "Lektionen" },
    ],
  },
  {
    id: "erststart",
    label: "3-Minuten-Coach",
    short: "Drei kurze Schritte: Selbstcheck, 60-Minuten-Pfad, Abruf.",
    whatIs:
      "Ein kleiner Begleiter für den ersten Besuch. Er führt dich durch Selbstcheck, den 60-Minuten-Literacy-Pfad und eine kurze Abruf-Übung.",
    whatFor:
      "Er nimmt Angst vor dem „großen Portal“. Du brauchst kein Vorwissen über KI. Drei Minuten reichen für ein Erfolgserlebnis.",
    canDo: [
      "Selbstcheck öffnen und eine Themenwelt-Empfehlung holen.",
      "Den 60-Minuten-Pfad Station für Station gehen.",
      "Eine Abruffrage beantworten und die Sicherheit einschätzen.",
      "Den Coach ausblenden, wenn du allein weitergehen willst.",
    ],
    example:
      "In drei Minuten: Selbstcheck → Station 1 im Literacy-Pfad markieren → eine Abrufkarte üben.",
    mistake:
      "Den Coach als Pflicht-Tutorial sehen und deshalb gar nicht starten. Er ist optional und darf geschlossen werden.",
    links: [
      { href: "#selbstcheck", label: "Selbstcheck" },
      { href: "#literacy-pfad", label: "60-Minuten-Pfad" },
      { href: "#wiederholen", label: "Abruf" },
    ],
  },
  {
    id: "einstieg-route",
    label: "Einstieg in drei Schritten",
    short: "Der rote Faden: einschätzen → Kurzpfad → abrufen.",
    whatIs:
      "Eine Übersichtskarte mit drei klaren Stationen. Sie ersetzt das Suchen im Portal durch eine feste Reihenfolge.",
    whatFor:
      "Du siehst sofort, was zuerst dran ist — ohne dich in Themenwelten oder Werkzeugen zu verlieren.",
    canDo: [
      "Schritt 1: Selbstcheck starten.",
      "Schritt 2: 60-Minuten-Pfad öffnen.",
      "Schritt 3: Abruf-Übung machen.",
    ],
    example:
      "Du tippst „Selbstcheck“, bekommst eine Welt-Empfehlung, gehst weiter zum Pfad und schließt mit einer Abrufkarte ab.",
    mistake:
      "Alle drei Schritte parallel öffnen und keinem zu Ende folgen. Besser: einen Schritt fertig machen, dann den nächsten.",
    links: [
      { href: "#einstieg-route", label: "Zur Einstiegsroute" },
      { href: "#erststart", label: "Zum 3-Minuten-Coach" },
    ],
  },
  {
    id: "ziele",
    label: "Themenwelten vertiefen",
    short: "Optional nach dem Kernweg: Micro-Einheiten zu einem Ziel.",
    whatIs:
      "Themenwelt-Auswahl als Vertiefungsschicht. Nicht der Erst-Einstieg — der liegt bei Selbstcheck, Kurzpfad und Lektionen.",
    whatFor:
      "Wenn der Kernweg klar ist, kannst du gezielt tiefer gehen — ohne alles parallel zu öffnen.",
    canDo: [
      "Erst den „Nächsten Schritt“ in der Heute-Karte erledigen.",
      "Dann eine Welt antippen und eine Micro-Einheit üben.",
      "Bei Überforderung: Einfache Ansicht an — Welten sind dann nur ausgeblendet.",
    ],
    example:
      "Nach dem Kurzpfad: Welt „Recherche & Wahrheit“ → eine Einheit zu Halluzinationen.",
    mistake:
      "Welten als Ersatz für Selbstcheck und Kurzpfad nutzen. Dann fehlen Orientierung und Sicherheit.",
    links: [
      { href: "#heute", label: "Nächster Schritt" },
      { href: "#literacy-pfad", label: "Kurzpfad" },
      { href: "#themenwelt", label: "Micro-Einheiten" },
    ],
  },
  {
    id: "ziele-kachel",
    label: "Themenwelt-Kachel",
    short: "Antippen aktiviert diese Themenwelt — danach erscheinen passende Mini-Einheiten.",
    whatIs:
      "Eine einzelne Themenwelt als Kachel. „Startklar“ heißt: Inhalt ist vorhanden. Antippen wechselt die aktive Welt — die Seite bleibt dieselbe.",
    whatFor:
      "Du legst fest, worüber du gerade lernst, bevor du übst. Das verhindert zielloses Klicken.",
    canDo: [
      "Kachel antippen (sie wirkt aktiv/hervorgehoben).",
      "Im Bereich darunter die Einheiten lesen.",
      "Eine Einheit oder Challenge öffnen und üben.",
    ],
    example:
      "„Chat & Prompting“ antippen → Einheiten zu Rollen, Grenzen und guten Aufträgen erscheinen darunter.",
    mistake:
      "Nur die Titel lesen und keine Einheit öffnen. Die Kachel allein speichert noch kein Lernen.",
    links: [
      { href: "#ziele", label: "Alle Themenwelten" },
      { href: "#themenwelt", label: "Micro-Einheiten" },
    ],
  },
  {
    id: "themenwelt",
    label: "Themenwelt und Micro-Einheiten",
    short: "Vertiefung: Überblick, Start-Einheiten, Rest zugeklappt.",
    whatIs:
      "Kurze Lernstücke in einer Themenwelt. Oben siehst du Überblick und Lernziele, dann „Start hier“. Weitere Einheiten öffnest du erst bei Bedarf.",
    whatFor:
      "Nicht 12–16 Kacheln auf einmal. Du bleibst ruhig und wählst einen Happen.",
    canDo: [
      "Die ersten Einheiten unter „Start hier“ wählen.",
      "Bei Bedarf „Weitere Einheiten“ aufklappen.",
      "Eine Einheit von oben nach unten üben (Beispiel → Übung → Prüfen).",
    ],
    example:
      "Welt „Chat & Prompting“: Einheit 1–4 starten; Einheit 9–12 erst nach dem Kernweg.",
    mistake:
      "Alles aufklappen und parallel anfangen. Dann fühlt sich Vertiefung wieder nach Überforderung an.",
    links: [
      { href: "#ziele", label: "Andere Themenwelt" },
      { href: "#heute", label: "Nächster Schritt" },
      { href: "#wiederholen", label: "Wiederholen" },
    ],
  },
  {
    id: "werkzeuge",
    label: "Werkzeuge",
    short: "Lokale Hilfen: Prompt bauen, Datenschutz prüfen, Quellen notieren.",
    whatIs:
      "Übungs-Werkzeuge in deinem Browser: z. B. Prompt-Werkbank, Datenschutz-Check, Quellen-Workflow. Hier wird nichts an eine KI-Cloud geschickt — du trainierst die Methode.",
    whatFor:
      "Bevor du echte Chat-Dienste nutzt, übst du sichere Gewohnheiten: klar formulieren, keine Geheimnisse, Aussagen prüfen. Das schützt dich und andere.",
    canDo: [
      "Prompt-Werkbank: Rolle, Aufgabe, Format und Grenze ausfüllen.",
      "Datenschutz-Check: Punkte abhaken und den Entwurf scannen.",
      "Quellen-Workflow: eine Aussage gegen eine Quelle halten.",
      "Das Ergebnis später bewusst in einem externen Tool nutzen — oder auch nicht.",
    ],
    example:
      "Du baust einen Prompt für eine Agenda: ohne Kundennamen, mit klarer Struktur → Privacy-Check → erst dann (optional) in einem Chat einfügen.",
    mistake:
      "Werkzeuge mit „Hier antwortet schon die KI live“ verwechseln. Sie trainieren dich. Echte Modell-Antworten sind in diesem Demo-Portal bewusst nicht der Kern.",
    links: [
      { href: "#lernraum", label: "Zurück zum Lernraum" },
      { href: "#coach", label: "Sicherheitsregeln lesen" },
      { href: "/datenschutz", label: "Datenschutz-Seite" },
    ],
  },
  {
    id: "wiederholen",
    label: "Abruf und Wiederholen",
    short: "Kurze Fragen mit Abstand — so bleibt Wissen besser hängen.",
    whatIs:
      "Ein kleiner Wiederhol-Bereich. Du siehst eine Frage, denkst nach, deckst die Antwort auf und sagst, wie sicher du warst. Unsicheres kommt früher wieder.",
    whatFor:
      "Aktives Erinnern wirkt stärker als nur Mitlesen. Du merkst, was schon sitzt — und was noch wackelt — ohne Prüfungsdruck.",
    canDo: [
      "Frage lesen und erst selbst antworten (im Kopf oder kurz notieren).",
      "Antwort anzeigen und vergleichen.",
      "Sicherheit ehrlich wählen (sicher / etwas unsicher / unsicher).",
      "Quellennotiz lesen, wenn du unsicher warst.",
    ],
    example:
      "„Was ist eine Halluzination?“ → nachdenken → Antwort → „etwas unsicher“ → die Karte kommt bald wieder.",
    mistake:
      "Sofort „Antwort anzeigen“ tippen ohne nachzudenken. Dann trainierst du Klicken, nicht Erinnern.",
    links: [
      { href: "#methoden", label: "Lernmethoden erklären" },
      { href: "#literacy-pfad", label: "Im Literacy-Pfad (Station 7)" },
      { href: "#pfad", label: "Zurück zu den Lektionen" },
    ],
  },
  {
    id: "methoden",
    label: "Lernmethoden",
    short: "Die Prinzipien hinter dem Portal: Beispiel → Abruf → Abstand → eigene Worte.",
    whatIs:
      "Eine kurze Erklärung, warum das Portal so aufgebaut ist. Du lernst nicht durch langes Lesen allein, sondern durch Beispiel, eigene Übung, Abruf und Wiederholung mit Abstand.",
    whatFor:
      "Wenn du verstehst „warum die Übung so ist“, fühlst du dich weniger wie in einer Prüfung — und mehr wie in einem Training, das für Laien gemacht ist.",
    canDo: [
      "Zuerst das Worked Example (vorgezeigter Weg) ansehen.",
      "Dann selbst abrufen oder eine Mini-Übung machen.",
      "Später wiederholen und in eigenen Worten erklären (Teach-back).",
      "Bei Unsicherheit den Sicherheits-Coach und das Glossar nutzen.",
    ],
    example:
      "In einer Lektion: Beispielprompt sehen → eigenen Prompt schreiben → Abruffrage → später in „Wiederholen“ noch einmal.",
    mistake:
      "Nur die Methodenübersicht lesen und die Übungen überspringen. Die Methode wirkt erst beim Tun.",
    links: [
      { href: "#lernraum", label: "Jetzt eine Einheit üben" },
      { href: "#wiederholen", label: "Abruf starten" },
    ],
  },
  {
    id: "lektion",
    label: "Lektionsraum",
    short: "Hier liest und übst du die aktuelle Lektion Schritt für Schritt.",
    whatIs:
      "Der Arbeitsbereich der gewählten Lektion. Typisch untereinander: Ziel, Erklärung in einfacher Sprache, Beispiel, Übung, Abschluss. Am Ende kannst du „erledigt“ markieren.",
    whatFor:
      "Eine Lektion zu Ende bringen, ohne dich zu verlieren. Du siehst immer: Wo bin ich in dieser Lektion — und was ist der nächste Mini-Schritt?",
    canDo: [
      "Von oben nach unten gehen (nicht springen).",
      "Die Mini-Übung wirklich ausfüllen.",
      "Unklare Wörter im Glossar nachschlagen.",
      "Als erledigt markieren und zur nächsten offenen Lektion gehen.",
    ],
    example:
      "Lektion „Was ist KI?“ lesen → kurze Übung → Haken setzen → der Pfad zeigt den nächsten Schritt.",
    mistake:
      "Nur die Überschrift lesen und sofort zur nächsten Lektion springen. Dann entsteht ein falsches Gefühl von Fortschritt.",
    links: [
      { href: "#pfad", label: "Andere Lektion im Pfad wählen" },
      { href: "#quellen", label: "Aussagen nachprüfen" },
      { href: "#coach", label: "Sicherheitsregeln" },
    ],
  },
  {
    id: "suche",
    label: "Lokale Suche",
    short: "Durchsucht nur die Inhalte dieses Portals — nichts geht ins Internet.",
    whatIs:
      "Eine Suche über die Lerninhalte dieses Portals (Lektionen, Begriffe, Angebote). Die Eingabe bleibt lokal im Sinne der Portal-Demo: sie sucht hier, nicht „das ganze Web“.",
    whatFor:
      "Schnell finden, ohne zu scrollen. Wenn du ein Wort gehört hast (z. B. Prompt, Halluzination), findest du die passende Stelle.",
    canDo: [
      "Mindestens zwei Zeichen eingeben.",
      "Einen Treffer antippen — du springst zum Inhalt.",
      "Den Begriff eingrenzen, wenn zu viele Treffer kommen.",
    ],
    example:
      "Suche „Halluzination“ → Lektion und Glossar-Treffer → antippen und nachlesen.",
    mistake:
      "Annehmen, die Suche würde das gesamte Internet durchsuchen oder Daten an eine KI senden. Das ist eine Portal-Suche.",
    links: [
      { href: "#lernraum", label: "Im Lernraum bleiben" },
      { href: "#quellen", label: "Externe Quellen separat" },
    ],
  },
  {
    id: "challenge",
    label: "Challenge",
    short: "Kurze Entscheidung mit Erklärung — Fehler sind erlaubt und lehrreich.",
    whatIs:
      "Eine kleine Entscheidungssituation aus dem Alltag. Du wählst eine Option und bekommst Feedback. Danach kannst du den Gedanken in eigenen Worten wiederholen.",
    whatFor:
      "Verständnis prüfen ohne Prüfungsangst. Du übst Urteilsvermögen: Was wäre hier vorsichtig und sinnvoll?",
    canDo: [
      "Situation in Ruhe lesen.",
      "Eine Antwort wählen (auch wenn du unsicher bist).",
      "Feedback lesen — auch bei „falsch“, dort steckt oft das Lernen.",
      "Teach-back: in einem Satz sagen, was du mitnimmst.",
    ],
    example:
      "Szene „Förder-Tipp ungeprüft teilen?“ → bessere Option: erst Quelle prüfen → Feedback erklärt warum.",
    mistake:
      "Nur tippen und Feedback ignorieren. Die Challenge wirkt durch die Erklärung, nicht durch den Klick.",
    links: [
      { href: "#ziele", label: "Passende Themenwelt" },
      { href: "#quellen", label: "Quellenraum" },
    ],
  },
  {
    id: "fortschritt",
    label: "Lernfortschritt",
    short: "Dein Haken bleibt lokal im Browser — kein Konto nötig.",
    whatIs:
      "Eine Anzeige, wie viele Lektionen du auf diesem Gerät als erledigt markiert hast. Der Stand liegt in deinem Browser, nicht in einem Benutzerkonto in der Cloud.",
    whatFor:
      "Weitermachen ohne Anmeldung — und Kontrolle über deine Daten. Du siehst klar: Wie weit bin ich?",
    canDo: [
      "Am Ende einer Lektion „erledigt“ markieren.",
      "„Heute hier weitermachen“ / „Heute empfohlen“ für den nächsten offenen Schritt nutzen.",
      "„Zurücksetzen“ antippen und mit „Ja, zurücksetzen“ bestätigen — nur wenn du wirklich bei null neu starten willst.",
    ],
    example:
      "3 von 12 erledigt → die Empfehlung zeigt die nächste offene Lektion, nicht wieder Lektion 1.",
    mistake:
      "Glauben, der Fortschritt sei überall gespeichert (Handy + Laptop + Cloud). Anderer Browser oder Gerät = anderer Stand, bis Server-Accounts später kommen.",
    links: [
      { href: "#pfad", label: "Fortschritt im Lernpfad" },
      { href: "/datenschutz", label: "Mehr zum Datenschutz" },
    ],
  },
  {
    id: "lernpfad",
    label: "Lernpfad",
    short: "Die Lektionen in Reihenfolge — antippen öffnet die gewählte Lektion.",
    whatIs:
      "Die Kursübersicht in Modulen. Du siehst Reihenfolge, Dauer-Hinweise und welche Lektionen lokal erledigt sind. Die aktive Lektion ist hervorgehoben.",
    whatFor:
      "Den roten Faden behalten. Statt „Irgendwas mit KI“ hast du eine nachvollziehbare Reihenfolge vom Einstieg bis zu anspruchsvolleren Themen.",
    canDo: [
      "Ein Modul aufklappen.",
      "Eine Lektion antippen — der Lektionsraum zeigt den Inhalt.",
      "Nach dem Üben zurückkommen und den Haken setzen.",
      "Bei Bedarf zur empfohlenen nächsten Lektion springen.",
    ],
    example:
      "Modul 1 öffnen → Lektion 2 antippen → im Lernraum erscheint genau dieser Inhalt.",
    mistake:
      "„Zurücksetzen“ und bestätigen „zum Aufräumen“. Dann sind die Haken weg. Aufräumen braucht keinen Zurücksetzen-Knopf.",
    links: [
      { href: "#lernraum", label: "Zur geöffneten Lektion" },
      { href: "#heute", label: "Heute empfohlen" },
      { href: "#naechste", label: "Nächste offene Lektion" },
    ],
  },
  {
    id: "sicherheit",
    label: "Sicherheits-Coach",
    short: "Drei feste Regeln: keine Geheimnisse, Antworten prüfen, selbst entscheiden.",
    whatIs:
      "Ein ruhiger Hinweisbereich mit Grundregeln für den Umgang mit KI und digitalen Tools. Er ersetzt kein Gesetzbuch — er macht sichere Gewohnheiten greifbar.",
    whatFor:
      "Schäden vermeiden, bevor sie entstehen: keine Passwörter/personenbezogenen Daten in Prompts, keine ungeprüften Fakten weitergeben, wichtige Entscheidungen nicht „der KI überlassen“.",
    canDo: [
      "Die drei Regeln in Ruhe lesen.",
      "Vor jedem Prompt kurz dagegen prüfen.",
      "Unklare Begriffe im Glossar nachschlagen.",
      "Vor dem Teilen einer KI-Aussage eine Quelle im Quellenraum öffnen.",
    ],
    example:
      "Vor dem Absenden eines Prompts: Steht ein Passwort drin? Ein echter Name? Eine Behauptung ohne Quelle? Dann umformulieren.",
    mistake:
      "Regeln einmal lesen und danach ignorieren. Sicherheit ist eine Wiederholung — wie Anschnallen.",
    links: [
      { href: "#quellen", label: "Aussagen nachprüfen" },
      { href: "#werkzeuge", label: "Datenschutz-Check üben" },
      { href: "/datenschutz", label: "Datenschutz-Seite" },
    ],
  },
  {
    id: "naechste",
    label: "Nächster Schritt",
    short: "Dieselbe Empfehlung wie die Heute-Karte — aus dem Portal-Vertrag.",
    whatIs:
      "Seitenleisten-Spiegel der Heute-Karte. Priorität: Selbstcheck → Kurzpfad → Wiederholen → Lektion → Vertiefen.",
    whatFor:
      "Auch beim Scrollen im Coach-Bereich denselben nächsten Schritt sehen.",
    canDo: [
      "Den Vorschlag lesen.",
      "Den Button antippen — springt zum passenden Bereich oder öffnet die Lektion.",
    ],
    example:
      "Wenn der Kurzpfad bei Station 3 steht, sagt die Seitenleiste dasselbe wie die Heute-Karte.",
    mistake:
      "Hier eine andere Logik erwarten als oben. Es ist absichtlich dieselbe Sprache.",
    links: [
      { href: "#heute", label: "Heute-Karte" },
      { href: "#literacy-pfad", label: "Kurzpfad" },
    ],
  },
  {
    id: "quellen",
    label: "Quellenraum",
    short: "Geprüfte Ausgangspunkte — zum Nachlesen in einem neuen Tab.",
    whatIs:
      "Eine Liste vertrauenswürdiger Ausgangspunkte (z. B. öffentliche Institutionen). Du siehst Name und Typ. Sie helfen dir, Behauptungen zu prüfen — auch Behauptungen von KI.",
    whatFor:
      "Wahrheit und Herkunft sichtbar machen. In der digitalen Welt klingt vieles selbstbewusst und kann trotzdem falsch sein. Quellen sind dein Gegengewicht.",
    canDo: [
      "Eine Quelle antippen — sie öffnet in einem neuen Tab.",
      "Kurz überfliegen: Wer schreibt? Worum geht es?",
      "Zurückkommen und die Aussage im Portal dagegen halten.",
      "Vor dem Weitergeben eines Tipps mindestens eine Quelle checken.",
    ],
    example:
      "Bevor du einen „KI-Tipp“ in die Familie schickst: passende EU-/OECD- oder Behördenquelle öffnen und gegenlesen.",
    mistake:
      "Die Liste als „schon erledigt“ abhaken, ohne eine Quelle zu öffnen. Der Nutzen entsteht beim Nachsehen.",
    links: [
      { href: "#coach", label: "Sicherheits-Coach" },
      { href: "#lernraum", label: "Zurück zum Lernen" },
    ],
  },
  {
    id: "modelle",
    label: "Model Navigator",
    short: "Modell-Arten grob einordnen — ohne Hype und ohne Kaufdruck.",
    whatIs:
      "Eine Orientierungshilfe zu Modell-Typen (z. B. Chat, Vision, Reasoning). Du lernst Kategorien und typische Stärken/Grenzen — keine Produktempfehlung und kein Zwang etwas zu kaufen.",
    whatFor:
      "Zuerst die Aufgabe klären, dann den Typ verstehen. So vermeidest du den Mythos „ein bestes Modell für alles“.",
    canDo: [
      "Deine Aufgabe in einem Satz formulieren.",
      "Im Navigator den passenden Typ und die Hinweise lesen.",
      "Datenschutz und Prüfung mitdenken (keine sensiblen Fotos/Daten).",
      "Unklare Begriffe im Glossar nachschlagen.",
    ],
    example:
      "„Speisekarte auf einem Foto erklären“ → eher Vision-Typ. Trotzdem: keine Ausweise oder privaten Dokumente fotografieren und hochladen.",
    mistake:
      "„Das beste Modell der Welt“ suchen, statt die Aufgabe und Risiken zu klären.",
    links: [
      { href: "#ziele", label: "Passende Themenwelt" },
      { href: "#quellen", label: "Quellen zum Einordnen" },
      { href: "#glossar", label: "Fachbegriffe" },
    ],
  },
  {
    id: "glossar",
    label: "Glossar und Fachbegriffe",
    short: "Markierte Begriffe: darüberfahren oder tippen — Erklärung in Alltagssprache.",
    whatIs:
      "Ein eingebautes Wörterbuch für KI- und Digitalbegriffe. Markierte Wörter lassen sich öffnen und werden schichtweise erklärt — von kurz bis mit Beispiel.",
    whatFor:
      "Angst vor Fachchinesisch nehmen. Du sollst mitreden können, ohne Informatik studiert zu haben.",
    canDo: [
      "Mit der Maus über den markierten Begriff fahren — oder tippen/klicken.",
      "Die Kurzklärung lesen; bei Bedarf mehr Details öffnen.",
      "Teach-back: dem Begriff einen eigenen Alltagssatz geben.",
    ],
    example:
      "„Halluzination“ → die KI klingt sicher, liegt aber falsch. Danach erkennst du das Muster in echten Chats leichter.",
    mistake:
      "Fachwörter überspringen und später ratlos sein. Lieber sofort nachschlagen — dafür ist das Glossar da.",
    links: [
      { href: "#lernraum", label: "Im Text weiterlesen" },
      { href: "#methoden", label: "Warum Abruf hilft" },
    ],
  },
  {
    id: "ressourcen",
    label: "Weiterlernen",
    short: "Zusätzliche Angebote in Ruhe — optional, ohne Druck.",
    whatIs:
      "Optionale Karten mit Ideen zum Weitergehen außerhalb der Kernlektionen. Sie sind Einladung, keine Pflicht.",
    whatFor:
      "Neugier kanalisieren, ohne den Hauptpfad zu sprengen. Du bleibst beim Kern, kannst aber bei Kapazität tiefer schauen.",
    canDo: [
      "Eine Karte in Ruhe lesen.",
      "Entscheiden: jetzt vertiefen oder später.",
      "Zum Lernpfad zurückkehren und die nächste Lektion abschließen.",
    ],
    example:
      "Nach Modul 1 eine Ressourcen-Karte als Inspiration lesen, dann bewusst zurück zum Pfad.",
    mistake:
      "Alles parallel starten und den Kernpfad liegen lassen. Dann fühlt sich Lernen wieder chaotisch an.",
    links: [
      { href: "#pfad", label: "Zurück zum Lernpfad" },
      { href: "#ziele", label: "Themenwelt vertiefen" },
    ],
  },
  {
    id: "mobilnav",
    label: "Untere Navigation",
    short: "Auf dem Handy: schnelle Sprünge zu den wichtigsten Bereichen.",
    whatIs:
      "Die daumengerechte Variante der oberen Leiste. Dieselben Bereiche: Lernraum, Pfad, Hilfe/Coach, Quellen — nur unten und größer tippbar.",
    whatFor:
      "Auch unterwegs Orientierung behalten, ohne präzise auf kleine Links oben zielen zu müssen.",
    canDo: [
      "Einen Bereich antippen.",
      "Inhalt lesen oder üben.",
      "Mit dem nächsten Tab weiterwechseln.",
    ],
    example:
      "In der Bahn: „Hilfe“ → Sicherheits-Coach lesen → zurück zum „Pfad“ für die nächste Lektion.",
    mistake:
      "Untere und obere Navigation für völlig verschiedene Orte halten. Sie führen zu denselben Bereichen.",
    links: [
      { href: "#lernraum", label: "Lernraum" },
      { href: "#pfad", label: "Pfad" },
      { href: "#coach", label: "Coach" },
      { href: "#quellen", label: "Quellen" },
    ],
  },
  {
    id: "literacy-path",
    label: "60-Minuten AI-Literacy",
    short: "Ein klarer Kurzpfad mit Stationen und lokalem Teilnahme-Nachweis.",
    whatIs:
      "Ein geführter 60-Minuten-Weg aus acht Stationen: Selbstcheck, Grundlagen, Sicherheit, Scam, Prompts, Szenarien, Abruf, Nachweis.",
    whatFor:
      "Du brauchst keinen langen Kursplan. In etwa einer Stunde bekommst du Orientierung und einen lokalen Beleg — ohne Konto.",
    canDo: [
      "Die hervorgehobene „Nächste Station“ öffnen.",
      "Jede Station als erledigt markieren, wenn du sie bearbeitet hast.",
      "Am Ende den lokalen Nachweis mit Stationsliste drucken oder als PDF speichern.",
    ],
    example:
      "Nach dem Selbstcheck markierst du Station 1, gehst zum Scam-Modul, übst Abruf und schließt mit dem Nachweis ab.",
    mistake:
      "Den Nachweis für ein amtliches Zertifikat halten. Er gilt nur als lokaler Lernbeleg in diesem Browser.",
    links: [
      { href: "#literacy-pfad", label: "Zum Literacy-Pfad" },
      { href: "#selbstcheck", label: "Zum Selbstcheck" },
      { href: "#wiederholen", label: "Zur Abruf-Übung" },
      { href: "#literacy-nachweis", label: "Zum Nachweis" },
    ],
  },
  {
    id: "self-check",
    label: "Selbstcheck",
    short: "Einstieg ohne Note — danach derselbe „Nächste Schritt“ wie überall.",
    whatIs:
      "Kurze Alltagsfragen. Ergebnis: Themenwelt als Vertiefungs-Hinweis, Primärhandlung bleibt der Kurzpfad.",
    whatFor:
      "Orientierung ohne Prüfungsangst. Du startest nicht zufällig.",
    canDo: [
      "Alle Fragen beantworten.",
      "„Empfehlung zeigen“ antippen.",
      "Primär: „Nächster Schritt: Kurzpfad“. Optional später die Welt vertiefen.",
    ],
    example:
      "Sicherheitsantworten → Welt „Daten & Recht“ gemerkt → zuerst Station 2 im Kurzpfad.",
    mistake:
      "Sofort in die Themenwelt springen und den Kurzpfad liegen lassen.",
    links: [
      { href: "#selbstcheck", label: "Selbstcheck starten" },
      { href: "#literacy-pfad", label: "Kurzpfad" },
      { href: "#heute", label: "Nächster Schritt" },
    ],
  },
  {
    id: "prompt-library",
    label: "Prompt-Bibliothek",
    short: "Fertige Vorlagen zum Kopieren — mit Datenschutz-Hinweisen.",
    whatIs:
      "Eine Sammlung geprüfter Prompt-Bausteine für Alltag, Beruf, Lernen und Sicherheit. Du kopierst und passt Platzhalter an.",
    whatFor:
      "Sofortiger Nutzen, ohne bei null formulieren zu müssen — und mit Erinnerung, keine Geheimnisse einzufügen.",
    canDo: [
      "Kategorie wählen.",
      "Prompt lesen und kopieren.",
      "Platzhalter ersetzen und erst dann in einem externen Tool nutzen — oder nur hier üben.",
    ],
    example:
      "„Team-Agenda“ kopieren, Platzhalter füllen, Privacy-Hinweis beachten, fertig.",
    mistake:
      "Denken, das Portal schickt den Prompt schon an eine KI. Hier wird nur Text bereitgestellt.",
    links: [
      { href: "#prompt-bibliothek", label: "Zur Bibliothek" },
      { href: "#werkzeuge", label: "Zur Prompt-Werkbank" },
    ],
  },
  {
    id: "scam-module",
    label: "Scam & Deepfake",
    short: "Warnsignale, Stopp-Ablauf und Übungen gegen Betrugstricks.",
    whatIs:
      "Ein Sicherheitsmodul zu KI-gestütztem Betrug: Stimme, Druck, falsche Kanäle und was du tun sollst.",
    whatFor:
      "Schäden vermeiden, bevor Geld oder Daten weg sind — besonders für digital Unsichere.",
    canDo: [
      "Warnsignale lesen.",
      "Stopp-Ablauf merken.",
      "Schnell-Check abhaken und Scam-Challenges üben.",
    ],
    example:
      "„Chef“-Anruf mit Geschenkkarten-Wunsch → auflegen → über Dienstchat nachfragen.",
    mistake:
      "Aus der verdächtigen Nachricht zurückrufen oder Links „nur kurz“ öffnen.",
    links: [
      { href: "#scam", label: "Zum Scam-Modul" },
      { href: "#coach", label: "Zum Sicherheits-Coach" },
      { href: "#szenarien", label: "Weitere Szenarien" },
    ],
  },
];

export function helpTipById(id: string): HelpTip | null {
  return helpTips.find((tip) => tip.id === id) ?? null;
}

/** Props-Helfer: markiert einen Bereich für die Cursor-Erklärungswolke. */
export function explainAttrs(tipId: string): { "data-explain": string } {
  return { "data-explain": tipId };
}
