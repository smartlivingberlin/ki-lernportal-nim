/**
 * 60-Minuten-AI-Literacy-Pfad — kuratierte Stationen für Laien.
 * Kein Behördenzertifikat: lokaler Teilnahme-Nachweis im Browser.
 */
export type LiteracyStation = {
  id: string;
  order: number;
  title: string;
  minutes: number;
  summary: string;
  href: string;
  actionLabel: string;
};

export const literacyPathMeta = {
  id: "literacy-60",
  title: "60-Minuten KI-Kurzpfad",
  subtitle:
    "Ein klarer Kernweg: verstehen, sicher üben, prüfen — ohne Konto und ohne Cloud-KI.",
  totalMinutes: 60,
  disclaimer:
    "Am Ende kannst du einen lokalen Teilnahme-Nachweis anzeigen und drucken. Das ist kein amtliches Zertifikat und keine Rechtsberatung — nur dein Lernbeleg in diesem Browser.",
} as const;

export const literacyStations: LiteracyStation[] = [
  {
    id: "lit-selfcheck",
    order: 1,
    title: "Selbstcheck: Wo stehe ich?",
    minutes: 6,
    summary: "Kurze Fragen → Empfehlung, womit du starten solltest.",
    href: "#selbstcheck",
    actionLabel: "Selbstcheck öffnen",
  },
  {
    id: "lit-basics",
    order: 2,
    title: "Was KI ist — und was nicht",
    minutes: 8,
    summary: "Alltagssprache, Grenzen, ohne Panik — optional in einer Themenwelt vertiefen.",
    href: "#ziele",
    actionLabel: "Themenwelten vertiefen",
  },
  {
    id: "lit-safety",
    order: 3,
    title: "Drei Sicherheitsregeln",
    minutes: 5,
    summary: "Keine Geheimnisse, prüfen, selbst entscheiden.",
    href: "#coach",
    actionLabel: "Zum Sicherheits-Coach",
  },
  {
    id: "lit-scam",
    order: 4,
    title: "Scam & Deepfake erkennen",
    minutes: 8,
    summary: "Typische Tricks und wie du stoppst, bevor Schaden entsteht.",
    href: "#scam",
    actionLabel: "Zum Scam-Modul",
  },
  {
    id: "lit-prompt",
    order: 5,
    title: "Prompt-Bibliothek nutzen",
    minutes: 8,
    summary: "Fertige Vorlagen kopieren und anpassen — mit Privacy-Hinweis.",
    href: "#prompt-bibliothek",
    actionLabel: "Zur Prompt-Bibliothek",
  },
  {
    id: "lit-scenario",
    order: 6,
    title: "Alltagsszenario entscheiden",
    minutes: 10,
    summary: "Eine echte Situation üben und die Erklärung lesen.",
    href: "#szenarien",
    actionLabel: "Zu den Szenarien",
  },
  {
    id: "lit-review",
    order: 7,
    title: "Kurz wiederholen",
    minutes: 8,
    summary: "Eine Übungsfrage beantworten und einschätzen, wie sicher du bist.",
    href: "#wiederholen",
    actionLabel: "Zum Wiederholen",
  },
  {
    id: "lit-proof",
    order: 8,
    title: "Nachweis anzeigen",
    minutes: 7,
    summary: "Wenn alle Stationen erledigt sind: lokalen Nachweis drucken.",
    href: "#literacy-nachweis",
    actionLabel: "Zum Nachweis",
  },
];

export function literacyTotalMinutes(): number {
  return literacyStations.reduce((sum, station) => sum + station.minutes, 0);
}
