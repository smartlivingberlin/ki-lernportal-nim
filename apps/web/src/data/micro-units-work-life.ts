import type { MicroLearningUnitV2 } from "./types";

const REVIEWED = "2026-08-12";

/**
 * Themenwelt „Arbeit & Alltag“ — Schema v2.
 * Verknüpft u. a. mit l6, l10, l11; weitere Einheiten direkt in der Themenwelt.
 */
export const microUnitsWorkLife: MicroLearningUnitV2[] = [
  {
    id: "mu-work-01",
    worldId: "world-work-life",
    lessonId: "l11",
    order: 1,
    title: "Welche Alltags- und Jobaufgaben passen zu KI?",
    whyUseful:
      "Du sparst Zeit, wenn du die richtigen Aufgaben wählst — und vermeidest die riskanten.",
    oneSentence:
      "Gut: formulieren, strukturieren, Ideen sammeln, erklären. Vorsicht: Entscheidungen mit Folgen und Geheimnisse.",
    everydayExample:
      "Gut: Einkauf strukturieren, Agenda skizzieren. Vorsicht: Gehaltsverhandlung oder Kundendaten auswerten lassen.",
    steps: [
      "Liste drei Aufgaben aus deinem Tag.",
      "Markiere Entwurf vs. Entscheidung.",
      "Nur Entwürfe ohne Geheimnisse an KI geben.",
    ],
    practiceTask:
      "Schreibe je zwei passende und zwei unpassende KI-Aufgaben aus Alltag oder Beruf.",
    samplePath:
      "Passend: Mail-Ton, Meeting-Agenda. Unpassend: Vertragsbewertung, Krankenakte zusammenfassen.",
    whyItWorks:
      "Die Trennung Entwurf/Entscheidung macht den Nutzen ohne Panik greifbar.",
    commonMistake:
      "Die schwierigste oder privateste Aufgabe zuerst wählen.",
    safetyNote:
      "Keine Kundendaten, Gesundheitsdaten oder Zugangsdaten in öffentliche Tools.",
    retrievalQuestions: [
      "Nenne zwei passende Aufgaben.",
      "Nenne zwei riskante Aufgaben.",
      "Was ist der Unterschied Entwurf/Entscheidung?",
    ],
    teachBackPrompt:
      "Wie erklärst du jemandem, wann KI im Alltag hilft?",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-work-02",
    worldId: "world-work-life",
    lessonId: "l6",
    order: 2,
    title: "E-Mails und Nachrichten mit KI vorbereiten",
    whyUseful:
      "Du schreibst schneller höflich und klar — ohne private Details preiszugeben.",
    oneSentence:
      "KI hilft beim Ton und der Struktur; du prüfst Inhalt und sendest selbst.",
    everydayExample:
      "Absage, Erinnerung, Dankeschön: Prompt mit Zielton, Länge und Platzhaltern statt echten Namen.",
    steps: [
      "Ziel und Ton festlegen.",
      "Private Angaben entfernen.",
      "Entwurf gegenlesen und erst dann senden.",
    ],
    practiceTask:
      "Erstelle einen Prompt für eine höfliche Terminerinnerung ohne echte Namen.",
    samplePath:
      "„Schreibe eine kurze, freundliche Erinnerung an Person A zum Termin am Dienstag, 4 Sätze, keine Adressen.“",
    whyItWorks:
      "Klare Vorgaben + Prüfpunkt verhindern peinliche oder riskante Mails.",
    commonMistake:
      "Komplette Kundenmail ungefiltert in den Chat kopieren.",
    safetyNote:
      "Im Beruf Firmenregeln beachten — im Zweifel interne Tools nutzen.",
    retrievalQuestions: [
      "Was darf in den Prompt?",
      "Was bleibt deine Aufgabe?",
      "Wann sendest du?",
    ],
    teachBackPrompt:
      "Welche drei Schritte machst du vor dem Absenden?",
    sourceIds: ["digcomp-30", "eu-gdpr"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-scenario", "method-retrieval"],
  },
  {
    id: "mu-work-03",
    worldId: "world-work-life",
    lessonId: "l10",
    order: 3,
    title: "Datenschutz im Prompt — die Laut-sagen-Regel",
    whyUseful:
      "Eine einfache Regel schützt dich im Büro und zu Hause.",
    oneSentence:
      "Was du nicht laut im Großraum sagen würdest, gehört nicht in einen öffentlichen Prompt.",
    everydayExample:
      "Kundennummer, Diagnose, Gehalt, Passwort: streichen oder durch Platzhalter ersetzen.",
    steps: [
      "Lies den Prompt laut in Gedanken.",
      "Streiche alles Identifizierende.",
      "Prüfe erneut, ob die Aufgabe noch klar ist.",
    ],
    practiceTask:
      "Bereinige einen zu privaten Prompt mit der Laut-sagen-Regel.",
    samplePath:
      "Vorher: Name + Vertragsnummer. Nachher: „Formuliere eine höfliche Antwort auf eine allgemeine Lieferverzögerung.“",
    whyItWorks:
      "Alltagsnahe Regeln bleiben besser hängen als lange Richtlinien.",
    commonMistake:
      "„Ist ja nur intern“ — und dann doch öffentliches Tool.",
    safetyNote:
      "Datenschutz geht vor Tempo. Im Zweifel nicht eingeben.",
    retrievalQuestions: [
      "Was ist die Laut-sagen-Regel?",
      "Welche Daten sind typisch sensibel?",
      "Was tun statt echter Werte?",
    ],
    teachBackPrompt:
      "Erklär die Laut-sagen-Regel in zwei Sätzen.",
    sourceIds: ["eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-scenario", "method-teachback", "method-playful"],
  },
  {
    id: "mu-work-04",
    worldId: "world-work-life",
    lessonId: null,
    order: 4,
    title: "Planen und Organisieren mit KI",
    whyUseful:
      "Wochenpläne, Checklisten und Agenden entstehen schneller — wenn du Rahmen setzt.",
    oneSentence:
      "Sag Zeitbudget, Ziel und Format; prüfe danach Machbarkeit mit deinem echten Kalender.",
    everydayExample:
      "„Erstelle einen 7-Tage-Lernplan, 25 Minuten/Tag, Thema Prompting, als Checkliste.“",
    steps: [
      "Zeit und Ziel nennen.",
      "Format festlegen (Liste, Tabelle, Schritte).",
      "Plan gegen Realität prüfen und anpassen.",
    ],
    practiceTask:
      "Schreibe einen Planungs-Prompt für eine Woche mit klaren Grenzen.",
    samplePath:
      "„Plane 5 Abende à 20 Minuten für Sprachübungen. Einfach, ohne Käufe, als nummerierte Liste.“",
    whyItWorks:
      "Konkrete Grenzen verhindern unrealistische Vorschläge.",
    commonMistake:
      "Pläne ungeprüft übernehmen und sich überfordern.",
    safetyNote:
      "Keine Standortdaten, Familienmitglieder-Details oder Gesundheitsziele mit Diagnosen teilen.",
    retrievalQuestions: [
      "Welche Angaben braucht ein guter Planungs-Prompt?",
      "Warum gegen den Kalender prüfen?",
      "Was lässt du weg?",
    ],
    teachBackPrompt:
      "Wie promptest du einen realistischen Wochenplan?",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-scenario", "method-confidence"],
  },
  {
    id: "mu-work-05",
    worldId: "world-work-life",
    lessonId: "l7",
    order: 5,
    title: "Ideen sammeln — ohne Blindübernahme",
    whyUseful:
      "Brainstorming wird leichter, Qualität bleibt deine Entscheidung.",
    oneSentence:
      "KI liefert Optionen; du filterst nach Nutzen, Ethik und Machbarkeit.",
    everydayExample:
      "10 Geschenkideen oder Meeting-Themen erzeugen — dann drei realistische auswählen.",
    steps: [
      "Anzahl und Kriterien nennen.",
      "Ideen erzeugen lassen.",
      "Selbst filtern und begründen.",
    ],
    practiceTask:
      "Lass 8 Ideen erzeugen und wähle 3 mit kurzer Begründung.",
    samplePath:
      "Kriterien: kostenlos, 30 Minuten, allein machbar. Dann Top-3 notieren.",
    whyItWorks:
      "Mengen + Kriterien + Auswahl trainieren Urteilskraft.",
    commonMistake:
      "Die erste Liste 1:1 übernehmen.",
    safetyNote:
      "Keine Ideen umsetzen, die rechtlich oder sicherheitsrelevant ungeprüft sind.",
    retrievalQuestions: [
      "Was liefert KI beim Brainstorming?",
      "Was bleibt deine Aufgabe?",
      "Warum Kriterien vorher setzen?",
    ],
    teachBackPrompt:
      "Wie nutzt du KI zum Ideensammeln, ohne blind zu folgen?",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-retrieval", "method-playful", "method-teachback"],
  },
  {
    id: "mu-work-06",
    worldId: "world-work-life",
    lessonId: null,
    order: 6,
    title: "Meetings und Protokolle vorbereiten",
    whyUseful:
      "Du kommst strukturierter in Gespräche — ohne vertrauliche Details preiszugeben.",
    oneSentence:
      "Agenda und Stichworte ja; sensible Personal- oder Kundendetails nein.",
    everydayExample:
      "Neutrale Agenda: Begrüßung, Fortschritt, Blocker, Entscheidungen, nächste Schritte.",
    steps: [
      "Ziel des Meetings in einem Satz.",
      "Agenda ohne Geheimnisse anfordern.",
      "Vor dem Teilen intern gegenlesen.",
    ],
    practiceTask:
      "Erstelle einen Agenda-Prompt für ein 30-Minuten-Team-Update.",
    samplePath:
      "„30 Minuten, 5 Punkte, Zeitangaben, keine Kundennamen, Fokus Fortschritt und Blocker.“",
    whyItWorks:
      "Struktur spart Meeting-Zeit und schützt Inhalte.",
    commonMistake:
      "Kritische Personenbewertungen in den Prompt schreiben.",
    safetyNote:
      "HR-, Gehalts- und Gesundheitsdaten gehören nicht in öffentliche Chats.",
    retrievalQuestions: [
      "Was darf in eine Agenda-Anfrage?",
      "Was nicht?",
      "Was tust du vor dem Teilen?",
    ],
    teachBackPrompt:
      "Welche Agenda-Bausteine sind datensparsam und nützlich?",
    sourceIds: ["eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-worked-example", "method-retrieval"],
  },
  {
    id: "mu-work-07",
    worldId: "world-work-life",
    lessonId: null,
    order: 7,
    title: "Lernen und Weiterbilden mit KI",
    whyUseful:
      "Du nutzt KI als Tutor — und prüfst, ob du wirklich verstanden hast.",
    oneSentence:
      "Lass erklären, fasse in eigenen Worten zusammen, prüfe mit einer zweiten Quelle.",
    everydayExample:
      "Fachbegriff erklären lassen, dann Teach-back schreiben, dann offizielle Seite gegenlesen.",
    steps: [
      "Einfache Erklärung anfordern.",
      "In eigenen Worten wiedergeben.",
      "Eine verlässliche Quelle gegenprüfen.",
    ],
    practiceTask:
      "Wähle einen Begriff und durchlaufe Erklären → Teach-back → Quelle.",
    samplePath:
      "Begriff: Prompt. Teach-back in 2 Sätzen. Quelle: DigComp oder Portal-Glossar.",
    whyItWorks:
      "Aktives Abrufen plus Gegenprüfung schlägt reines Mitlesen.",
    commonMistake:
      "KI-Erklärung auswendig kopieren und glauben, man hätte gelernt.",
    safetyNote:
      "Bei Prüfungs- oder Berufskontexten Regeln der Institution beachten.",
    retrievalQuestions: [
      "Welche drei Schritte gehören dazu?",
      "Warum Teach-back?",
      "Warum zweite Quelle?",
    ],
    teachBackPrompt:
      "Wie lernst du mit KI, ohne Blindvertrauen?",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-teachback", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-work-08",
    worldId: "world-work-life",
    lessonId: null,
    order: 8,
    title: "Abschluss: Dein Alltags- und Job-Protokoll",
    whyUseful:
      "Du gehst mit einer klaren Checkliste in den nächsten Arbeitstag.",
    oneSentence:
      "Aufgabe wählen → datensparsam prompten → Entwurf prüfen → Mensch entscheidet.",
    everydayExample:
      "Morgens eine Agenda, mittags eine Mail, abends ein Lernplan — immer mit demselben Protokoll.",
    steps: [
      "Notiere drei KI-Aufgaben für die nächste Woche.",
      "Schreibe zu jeder den Sicherheitscheck.",
      "Lege deinen Prüfpunkt vor dem Nutzen fest.",
    ],
    practiceTask:
      "Erstelle dein persönliches 4-Zeilen-Protokoll für Alltag und Beruf.",
    samplePath:
      "1 Aufgabe 2 Daten streichen 3 Prompt-Formel 4 Gegenlesen vor Senden",
    whyItWorks:
      "Ein Protokoll macht sicheres Verhalten zur Gewohnheit.",
    commonMistake:
      "Jedes Mal improvisieren und Grenzen vergessen.",
    safetyNote:
      "Bei Unsicherheit: lieber weglassen als riskieren.",
    retrievalQuestions: [
      "Welche vier Zeilen hat dein Protokoll?",
      "Wann entscheidet der Mensch?",
      "Was kommt vor dem Senden?",
    ],
    teachBackPrompt:
      "Erklär dein Alltags-/Job-Protokoll einer Kollegin.",
    sourceIds: ["digcomp-30", "eu-gdpr"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-progressive", "method-teachback", "method-confidence"],
  },
  {
    id: "mu-work-09",
    worldId: "world-work-life",
    lessonId: null,
    order: 9,
    title: "Einkaufen & Haushalt: Listen ohne Blindübernahme",
    whyUseful:
      "KI kann Listen vorschlagen — Preise, Allergene und Angebote prüfst du selbst.",
    oneSentence:
      "Lass eine Einkaufs- oder Putzliste skizzieren, streiche Unpassendes und übernimm nur Geprüftes.",
    everydayExample:
      "„Erstelle eine Wochen-Einkaufsliste für 2 Personen, vegetarisch, ohne Markennamen.“ Danach selbst anpassen.",
    steps: [
      "Ziel und Grenzen nennen (Budget, Ernährung, keine Markenpflicht).",
      "Liste erzeugen lassen.",
      "Streiche, ergänze, prüfe Vorräte — dann erst kaufen.",
    ],
    practiceTask:
      "Schreibe einen Prompt für eine kurze Haushalts-To-do-Liste und markiere, was du selbst prüfen musst.",
    samplePath:
      "Prompt → Liste → „Milch schon da“ streichen → Allergene prüfen → fertig",
    whyItWorks:
      "Struktur ja, Verantwortung bleibt bei dir — besonders bei Gesundheit und Geld.",
    commonMistake:
      "Die Liste ungeprüft abarbeiten und Unnötiges kaufen.",
    safetyNote:
      "Keine Gesundheitsdiagnosen oder Medikamentenpläne von der KI übernehmen.",
    retrievalQuestions: [
      "Was prüfst du an einer KI-Einkaufsliste?",
      "Warum Grenzen im Prompt?",
      "Wann ist Blindübernahme riskant?",
    ],
    teachBackPrompt:
      "Wie nutzt du KI für Haushaltslisten, ohne alles zu glauben?",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-scenario", "method-confidence", "method-retrieval"],
  },
  {
    id: "mu-work-10",
    worldId: "world-work-life",
    lessonId: null,
    order: 10,
    title: "Reisen planen: Ideen ja — Buchung selbst prüfen",
    whyUseful:
      "Inspiration ist erlaubt; Preise, Visa und Öffnungszeiten kommen von offiziellen Quellen.",
    oneSentence:
      "Nutze KI für Ideen und Packlisten — buche und prüfe Termine immer auf Primärseiten.",
    everydayExample:
      "„Schlage drei ruhige Tagesausflüge bei Regen vor.“ Danach Öffnungszeiten auf der offiziellen Seite checken.",
    steps: [
      "Ideen und Alternativen sammeln lassen.",
      "Jede konkrete Angabe (Preis, Zeit, Regel) markieren.",
      "Nur markierte Punkte auf offiziellen Seiten gegenprüfen.",
    ],
    practiceTask:
      "Erstelle einen Prompt für eine Packliste und eine Checkliste „Was ich selbst prüfe“.",
    samplePath:
      "Ideen → Packliste → „Öffnungszeiten/Preise selbst“ → Buchung nur auf vertrauenswürdiger Seite",
    whyItWorks:
      "Trennung von Ideengeber und Wahrheitsquelle verhindert teure Fehler.",
    commonMistake:
      "Fahrpläne oder Visa-Infos aus dem Chat als verbindlich behandeln.",
    safetyNote:
      "Keine Reisepassnummern oder Buchungsdaten in den Prompt kopieren.",
    retrievalQuestions: [
      "Was darf KI bei der Reiseplanung?",
      "Was musst du selbst prüfen?",
      "Warum keine Passdaten im Prompt?",
    ],
    teachBackPrompt:
      "Erklär die Regel „Ideen ja, Buchung selbst prüfen“.",
    sourceIds: ["digcomp-30", "nist-genai-profile"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-work-11",
    worldId: "world-work-life",
    lessonId: null,
    order: 11,
    title: "Familie & Schule: Hilfe ohne Abschreiben",
    whyUseful:
      "KI kann erklären und üben — Abschreiben zerstört Lernen und verstößt oft gegen Regeln.",
    oneSentence:
      "Lass erklären und Übungsfragen erzeugen; die Antwort schreibt der Mensch in eigenen Worten.",
    everydayExample:
      "„Erkläre Brüche mit Pizza-Beispiel. Stelle danach 3 Übungsfragen — ohne fertige Aufsatzlösung.“",
    steps: [
      "Erklären lassen, nicht die Hausaufgabe lösen lassen.",
      "Teach-back: Kind/Erwachsener sagt es in eigenen Worten.",
      "Schul- oder Kursregeln beachten.",
    ],
    practiceTask:
      "Formuliere einen Prompt, der erklärt und übt — aber keine fertige Abgabe liefert.",
    samplePath:
      "Erklärung → 3 Übungsfragen → eigene Antwort → erst dann Hilfe vergleichen",
    whyItWorks:
      "Aktives Wiedergeben sitzt; fertige Texte umgehen das Lernen.",
    commonMistake:
      "Komplette Aufsätze generieren und abgeben.",
    safetyNote:
      "Keine Fotos von Klassenarbeiten oder Schülerdaten in fremde Tools laden.",
    retrievalQuestions: [
      "Was ist erlaubt beim Lernen mit KI?",
      "Warum Teach-back?",
      "Welche Daten bleiben draußen?",
    ],
    teachBackPrompt:
      "Wie hilft KI in der Schule, ohne dass jemand abschreibt?",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-teachback", "method-retrieval", "method-scenario"],
  },
  {
    id: "mu-work-12",
    worldId: "world-work-life",
    lessonId: null,
    order: 12,
    title: "Zeitfresser: Was du lieber selbst entscheidest",
    whyUseful:
      "Nicht jede Aufgabe braucht KI — manche gehen schneller und sicherer ohne.",
    oneSentence:
      "Nutze KI für Entwürfe und Struktur; Entscheidungen, Gefühle und heikle Fakten behältst du.",
    everydayExample:
      "Agenda-Skizze: ja. Ob du den Job kündigst: nein. Beileidsmail: Ton skizzieren, Inhalt persönlich schreiben.",
    steps: [
      "Frage: Ist das Entwurf oder Entscheidung?",
      "Nur Entwürfe an KI geben.",
      "Entscheidungen und heikle Nachrichten selbst finalisieren.",
    ],
    practiceTask:
      "Liste drei Aufgaben: eine für KI, eine gemischt, eine nur Mensch — mit kurzer Begründung.",
    samplePath:
      "KI: Struktur. Gemischt: Mail-Entwurf. Mensch: Kündigung / Beileid / Vertrag unterschreiben.",
    whyItWorks:
      "Klare Zuständigkeit spart Zeit und schützt Beziehungen und Rechte.",
    commonMistake:
      "Schwierige Gespräche komplett von der KI schreiben lassen und ungeprüft senden.",
    safetyNote:
      "Rechtliche, medizinische und finanzielle Entscheidungen nie allein der KI überlassen.",
    retrievalQuestions: [
      "Wann reicht ein KI-Entwurf?",
      "Was entscheidest du selbst?",
      "Warum ist das ein Zeitgewinn?",
    ],
    teachBackPrompt:
      "Erklär die Regel „Entwurf ja, Entscheidung selbst“.",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-confidence", "method-progressive", "method-teachback"],
  },
];
