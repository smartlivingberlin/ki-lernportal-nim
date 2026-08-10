/**
 * Scam- & Deepfake-Modul — Warnsignale und sichere Reaktionen für Laien.
 */
export type ScamSignal = {
  id: string;
  title: string;
  detail: string;
};

export type ScamPlaybookStep = {
  id: string;
  title: string;
  detail: string;
};

export const scamModuleMeta = {
  title: "Scam & Deepfake",
  intro:
    "Betrüger nutzen KI-Stimme, gefälschte Videos und drängende Nachrichten. Hier lernst du Warnsignale und einen klaren Stopp-Ablauf — ohne Panikmacherei.",
  disclaimer:
    "Das Modul ersetzt keine Polizei- oder Bankberatung. Bei konkretem Betrugsverdacht: Kanäle der Bank/Polizei nutzen, die du selbst gewählt hast — nicht die Nummer aus der verdächtigen Nachricht.",
} as const;

export const scamSignals: ScamSignal[] = [
  {
    id: "sig-urgency",
    title: "Extreme Eile",
    detail:
      "„Sofort zahlen“, „Konto wird gesperrt“, „Nur noch 10 Minuten“. Druck soll dich am Nachdenken hindern.",
  },
  {
    id: "sig-secrecy",
    title: "Geheimhaltung",
    detail:
      "„Sag niemandem Bescheid“, „Nicht die Bank anrufen“. Seriöse Stellen erlauben dir, nachzufragen.",
  },
  {
    id: "sig-channel",
    title: "Falscher Kanal",
    detail:
      "Plötzlicher Anruf, SMS-Link, QR-Code aus dem Nichts. Du hast den Kontakt nicht selbst gestartet.",
  },
  {
    id: "sig-voice",
    title: "Stimme oder Video wirkt „fast echt“",
    detail:
      "KI kann Stimmen und Gesichter nachahmen. Ein Anruf „vom Enkel“ oder „Chef“ ist kein Beweis.",
  },
  {
    id: "sig-money",
    title: "Geld, Codes, Remote-Zugriff",
    detail:
      "Überweisung, Geschenkkarten, TAN, TeamViewer/AnyDesk: klassische Betrugsziele.",
  },
  {
    id: "sig-story",
    title: "Unglaubwürdige Story",
    detail:
      "Gewinne, die du nicht erwartet hast, Pakete die du nicht bestellt hast, Behörden mit Drohungen per Chat.",
  },
];

export const scamPlaybook: ScamPlaybookStep[] = [
  {
    id: "step-stop",
    title: "1. Stopp",
    detail: "Nichts zahlen, nichts installieren, keine Codes weitergeben. Auflegen ist erlaubt.",
  },
  {
    id: "step-verify",
    title: "2. Selbst nachwählen",
    detail:
      "Offizielle Nummer der Bank/Behörde/des Angehörigen selbst suchen (nicht aus der Nachricht). Kurz nachfragen: „War das von dir?“",
  },
  {
    id: "step-share",
    title: "3. Zweite Meinung",
    detail:
      "Eine vertrauenswürdige Person einweihen. Betrug lebt von Isolation.",
  },
  {
    id: "step-report",
    title: "4. Melden & sichern",
    detail:
      "Bei Schaden: Bank sperren lassen, Anzeige prüfen, Passwörter ändern. Verdächtige Nachrichten nicht „zum Spaß“ weiterleiten.",
  },
];

export const scamQuickChecks = [
  "Habe ich diesen Kontakt selbst begonnen?",
  "Wird Geheimhaltung oder extreme Eile verlangt?",
  "Soll ich Geld, Codes oder Fernzugriff geben?",
  "Kann ich die Person über einen zweiten Kanal erreichen?",
  "Würde ich dasselbe tun, wenn ich 24 Stunden Zeit hätte?",
] as const;
