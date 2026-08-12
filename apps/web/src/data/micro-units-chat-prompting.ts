import type { MicroLearningUnitV2 } from "./types";

const REVIEWED = "2026-08-12";

/**
 * Themenwelt „Chat & Prompting“ — Schema v2.
 * Verknüpft mit l4–l6; weitere Einheiten direkt in der Themenwelt.
 */
export const microUnitsChatPrompting: MicroLearningUnitV2[] = [
  {
    id: "mu-chat-01",
    worldId: "world-chat-prompting",
    lessonId: "l4",
    order: 1,
    title: "Was ist ein Prompt — in Alltagssprache?",
    whyUseful:
      "Wenn du weißt, was ein Prompt ist, hörst du auf zu raten und fängst an, klar zu fragen.",
    oneSentence:
      "Ein Prompt ist deine Aufgabe oder Frage an die KI — je klarer, desto brauchbarer die Antwort.",
    everydayExample:
      "Schwach: „Schreib was über KI.“ Besser: „Erkläre einem Anfänger in fünf Sätzen, was KI ist, mit einem Alltagsbeispiel.“",
    steps: [
      "Sag zuerst das Ziel in einem Satz.",
      "Nenne Zielgruppe, Länge und Stil.",
      "Füge eine Grenze hinzu (was die KI nicht tun soll).",
    ],
    practiceTask:
      "Schreibe denselben Wunsch einmal vage und einmal als klaren Prompt.",
    samplePath:
      "Vage: „Hilf mir mit einer Mail.“ Klar: „Schreibe eine freundliche Absage für einen Termin, 4 Sätze, ohne Namen, höflich und kurz.“",
    whyItWorks:
      "Klare Bausteine reduzieren Rätselraten — die KI muss weniger erfinden.",
    commonMistake:
      "Nur ein Stichwort tippen und sich über unpassende Antworten wundern.",
    safetyNote:
      "Auch gute Prompts dürfen keine Passwörter oder privaten Daten enthalten.",
    retrievalQuestions: [
      "Was ist ein Prompt?",
      "Warum sind vage Prompts riskant für die Qualität?",
      "Welche drei Angaben machen einen Prompt klarer?",
    ],
    teachBackPrompt:
      "Erklär einer Freundin in einem Satz, was ein Prompt ist.",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-worked-example", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-chat-02",
    worldId: "world-chat-prompting",
    lessonId: "l5",
    order: 2,
    title: "Die Prompt-Formel: Rolle, Aufgabe, Kontext, Format",
    whyUseful:
      "Mit einer festen Formel bekommst du schneller Antworten, die du wirklich nutzen kannst.",
    oneSentence:
      "Eine gute Grundformel lautet: Rolle + Aufgabe + Kontext + Format + Grenze.",
    everydayExample:
      "„Du bist Schreibcoach. Formuliere meinen Entwurf klarer. Kontext: Bewerbung um Teilzeitstelle. Format: 6 Sätze. Grenze: keine Übertreibungen.“",
    steps: [
      "Rolle: Wer soll die KI „sein“?",
      "Aufgabe: Was genau soll entstehen?",
      "Kontext + Format + Grenze ergänzen.",
    ],
    practiceTask:
      "Baue einen Prompt mit allen fünf Bausteinen für eine kurze Danksagung.",
    samplePath:
      "Rolle: freundlicher Assistent. Aufgabe: Danksagung schreiben. Kontext: Hilfe beim Umzug. Format: 5 Sätze. Grenze: keine Geschenke erwähnen.",
    whyItWorks:
      "Die Formel macht unsichtbare Annahmen sichtbar und steuerbar.",
    commonMistake:
      "Nur die Aufgabe nennen und Format sowie Grenzen weglassen.",
    safetyNote:
      "Keine echten Adressen, Kontodaten oder internen Firmengeheimnisse in den Kontext.",
    retrievalQuestions: [
      "Nenne die fünf Bausteine der Formel.",
      "Was bringt das Format?",
      "Wozu dient die Grenze?",
    ],
    teachBackPrompt:
      "Sag die Prompt-Formel laut in eigenen Worten.",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-worked-example", "method-retrieval", "method-playful"],
  },
  {
    id: "mu-chat-03",
    worldId: "world-chat-prompting",
    lessonId: "l6",
    order: 3,
    title: "Texte verbessern — ohne den Sinn zu verbiegen",
    whyUseful:
      "Du nutzt KI als Stilhilfe, behältst aber Inhalt und Verantwortung.",
    oneSentence:
      "Beim Umformulieren sagst du Zielton und behältst Fakten — danach liest du selbst gegen.",
    everydayExample:
      "„Mache diesen Text freundlicher und kürzer. Behalte alle Fakten. Markiere Unklarheiten statt zu erfinden.“",
    steps: [
      "Originaltext ohne Geheimnisse vorbereiten.",
      "Zielton und Länge nennen.",
      "Ergebnis Satz für Satz prüfen.",
    ],
    practiceTask:
      "Formuliere einen Prompt, der eine grobe Nachricht höflicher macht — ohne neue Fakten zu erfinden.",
    samplePath:
      "„Formuliere höflich und klar in 5 Sätzen. Erfinde keine Gründe. Wenn etwas fehlt, stelle eine Rückfrage.“",
    whyItWorks:
      "Explizite Anti-Erfindungs-Regel reduziert Halluzinationen beim Umschreiben.",
    commonMistake:
      "Schön klingende Version ungeprüft absenden.",
    safetyNote:
      "Namen und private Details vorher durch Platzhalter ersetzen.",
    retrievalQuestions: [
      "Was muss beim Umformulieren erhalten bleiben?",
      "Warum Gegenlesen?",
      "Wie verhinderst du erfundene Details?",
    ],
    teachBackPrompt:
      "Welche drei Regeln gelten beim KI-gestützten Textverbessern?",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-chat-04",
    worldId: "world-chat-prompting",
    lessonId: null,
    order: 4,
    title: "Kontext dosieren: genug, aber nicht privat",
    whyUseful:
      "Zu wenig Kontext ergibt Rätselraten — zu viel Kontext riskiert Datenschutz.",
    oneSentence:
      "Gib der KI nur den Kontext, den sie für die Aufgabe braucht — ohne Geheimnisse.",
    everydayExample:
      "Statt Krankenakte: „Erkläre allgemein, was eine Überweisung zum Facharzt bedeutet.“",
    steps: [
      "Frage: Braucht die KI diese Info wirklich?",
      "Ersetze Identifizierer durch Platzhalter.",
      "Teste, ob die Antwort ohne Geheimnisse trotzdem passt.",
    ],
    practiceTask:
      "Kürze einen zu privaten Prompt auf das Nötigste.",
    samplePath:
      "Vorher: Name, Adresse, Diagnose. Nachher: „Erkläre in einfacher Sprache, was ein Befundbericht typischerweise enthält.“",
    whyItWorks:
      "Datensparsamkeit und Klarheit gehen oft zusammen.",
    commonMistake:
      "„Zur Sicherheit alles reinkopieren.“",
    safetyNote:
      "Gesundheits-, Finanz- und Kundendaten gehören nicht in öffentliche Chats.",
    retrievalQuestions: [
      "Was ist genug Kontext?",
      "Was ist zu viel?",
      "Was ist ein Platzhalter?",
    ],
    teachBackPrompt:
      "Erklär die Regel „genug Kontext, keine Geheimnisse“ an einem Beispiel.",
    sourceIds: ["eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-scenario", "method-progressive", "method-retrieval"],
  },
  {
    id: "mu-chat-05",
    worldId: "world-chat-prompting",
    lessonId: null,
    order: 5,
    title: "Nachfragen und Iterieren statt Frust",
    whyUseful:
      "Die erste Antwort ist oft ein Entwurf — Iteration macht sie brauchbar.",
    oneSentence:
      "Gute Chat-Nutzung heißt: Feedback geben, eingrenzen, erneut fragen.",
    everydayExample:
      "„Kürzer.“ „Konkreter.“ „Nur Stichpunkte.“ „Bitte Beispiel aus dem Alltag.“",
    steps: [
      "Bewerte die erste Antwort: Was fehlt?",
      "Formuliere eine gezielte Nachbesserung.",
      "Vergleiche Version 1 und Version 2.",
    ],
    practiceTask:
      "Schreibe drei kurze Iterations-Prompts zu derselben Aufgabe.",
    samplePath:
      "1) „Nur 5 Stichpunkte.“ 2) „Einfacher, ohne Fachwörter.“ 3) „Füge ein Alltagsbeispiel hinzu.“",
    whyItWorks:
      "Iteration ersetzt Perfektionismus beim ersten Versuch.",
    commonMistake:
      "Nach einer mäßigen Antwort aufgeben statt nachzusteuern.",
    safetyNote:
      "Bei jeder Runde erneut prüfen, ob keine sensiblen Daten nachgerutscht sind.",
    retrievalQuestions: [
      "Warum reicht der erste Versuch oft nicht?",
      "Was ist eine gute Nachbesserung?",
      "Woran erkennst du Fortschritt zwischen Versionen?",
    ],
    teachBackPrompt:
      "Wie erklärst du Iteration beim Prompting einem Anfänger?",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-worked-example", "method-playful", "method-confidence"],
  },
  {
    id: "mu-chat-06",
    worldId: "world-chat-prompting",
    lessonId: null,
    order: 6,
    title: "Rollen sinnvoll nutzen — ohne Theater",
    whyUseful:
      "Rollen helfen beim Ton, ersetzen aber keine Fachprüfung.",
    oneSentence:
      "Eine Rolle steuert Stil und Fokus — sie macht die KI nicht zur echten Expertin mit Haftung.",
    everydayExample:
      "„Erkläre wie eine geduldige Lehrerin“ ist hilfreich. „Du bist mein Arzt, stelle eine Diagnose“ ist riskant.",
    steps: [
      "Wähle eine Rolle für Ton und Zielgruppe.",
      "Halte die Aufgabe sachlich.",
      "Prüfe Fachinhalte unabhängig.",
    ],
    practiceTask:
      "Schreibe zwei Rollen-Prompts: einen sinnvollen und einen riskanten — und begründe den Unterschied.",
    samplePath:
      "Sinnvoll: Schreibcoach für Klarheit. Riskant: verbindliche Rechtsberatung ohne Prüfung.",
    whyItWorks:
      "Du trennst hilfreichen Stil von gefährlicher Autorität.",
    commonMistake:
      "Rollen-Prompts mit echtem Expertenstatus verwechseln.",
    safetyNote:
      "Keine medizinischen, rechtlichen oder finanziellen Entscheidungen allein der KI überlassen.",
    retrievalQuestions: [
      "Wozu dient eine Rolle?",
      "Wann wird eine Rolle riskant?",
      "Was ersetzt eine Rolle nicht?",
    ],
    teachBackPrompt:
      "Wann ist eine Rolle hilfreich — und wann gefährlich?",
    sourceIds: ["nist-ai-rmf", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-chat-07",
    worldId: "world-chat-prompting",
    lessonId: null,
    order: 7,
    title: "Antwortqualität prüfen in 60 Sekunden",
    whyUseful:
      "Du erkennst schnell, ob eine Antwort brauchbar, lückenhaft oder riskant ist.",
    oneSentence:
      "Prüf-Check: Ziel getroffen? Fakten unsicher? Ton okay? Etwas erfunden?",
    everydayExample:
      "Die KI nennt ein Datum oder eine Regel — du fragst: Woher weiß ich das?",
    steps: [
      "Zielabgleich: Wurde die Aufgabe erfüllt?",
      "Unsicherheits-Scan: Zahlen, Regeln, Namen.",
      "Gegenfrage oder Quelle anfordern.",
    ],
    practiceTask:
      "Nimm eine beliebige KI-Antwort und wende den 60-Sekunden-Check an.",
    samplePath:
      "Ziel: ok. Fakten: eine Zahl unsicher → „Bitte kennzeichne Unsicherheiten.“ Ton: zu förmlich → „lockerer.“",
    whyItWorks:
      "Ein kurzes Ritual verhindert Blindvertrauen.",
    commonMistake:
      "Nur auf flüssigen Stil achten.",
    safetyNote:
      "Unsichere Fakten nicht als Wahrheit weitergeben.",
    retrievalQuestions: [
      "Welche vier Punkte prüfst du?",
      "Was tust du bei unsicheren Fakten?",
      "Warum reicht Stil nicht?",
    ],
    teachBackPrompt:
      "Beschreibe deinen 60-Sekunden-Check in Stichpunkten.",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-retrieval", "method-confidence", "method-playful"],
  },
  {
    id: "mu-chat-08",
    worldId: "world-chat-prompting",
    lessonId: null,
    order: 8,
    title: "Abschluss: Dein Prompt-Werkzeugkasten",
    whyUseful:
      "Du verlässt die Welt mit einer wiederholbaren Routine für bessere Chats.",
    oneSentence:
      "Formel nutzen → Kontext dosieren → iterieren → prüfen → erst dann übernehmen.",
    everydayExample:
      "Ob Einkaufsliste, Mail oder Lernhilfe: dieselbe Reihenfolge hält dich sicher und klar.",
    steps: [
      "Wähle eine Aufgabe für heute.",
      "Schreibe den Prompt mit Formel.",
      "Iteriere einmal und prüfe das Ergebnis.",
    ],
    practiceTask:
      "Notiere deinen persönlichen Prompt-Werkzeugkasten in fünf Zeilen.",
    samplePath:
      "1 Formel 2 Kontext sparsam 3 Iteration 4 60-Sekunden-Check 5 Mensch entscheidet",
    whyItWorks:
      "Routinen bleiben, einzelne Tricks vergessen sich.",
    commonMistake:
      "Jedes Mal bei null anfangen und improvisieren.",
    safetyNote:
      "Werkzeugkasten ohne Datenschutz-Check ist unvollständig.",
    retrievalQuestions: [
      "Welche fünf Schritte gehören dazu?",
      "Was kommt vor dem Übernehmen?",
      "Warum Routine statt Zufall?",
    ],
    teachBackPrompt:
      "Erklär deinen Prompt-Werkzeugkasten jemandem, der neu startet.",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-teachback", "method-progressive", "method-confidence"],
  },
  {
    id: "mu-chat-09",
    worldId: "world-chat-prompting",
    lessonId: null,
    order: 9,
    title: "Beispiel zeigen: So macht die KI dein Muster nach",
    whyUseful:
      "Mit ein bis zwei kurzen Beispielen steuerst du den Ton — ohne Fachwort „Few-Shot“.",
    oneSentence:
      "Zeig der KI ein kurzes Vorher-Nachher-Beispiel, dann folgt sie dem Muster zuverlässiger.",
    everydayExample:
      "„So will ich es: Vorher ‚Komm sofort.‘ Nachher ‚Kannst du bitte in 10 Minuten kommen?‘ Formuliere jetzt meine Nachricht genauso höflich.“",
    steps: [
      "Schreibe ein kleines Beispiel (vor → nach).",
      "Sag: „Mach meine neue Aufgabe im gleichen Stil.“",
      "Prüfe, ob Ton und Länge passen.",
    ],
    practiceTask:
      "Erfinde ein Vorher-Nachher-Beispiel für eine höflichere WhatsApp-Nachricht und baue es in einen Prompt.",
    samplePath:
      "Vorher grob → Nachher höflich → „Formuliere diesen Text im gleichen Stil: …“",
    whyItWorks:
      "Beispiele machen unsichtbare Regeln sichtbar — die KI muss weniger raten.",
    commonMistake:
      "Nur „mach es besser“ sagen, ohne zu zeigen, was „besser“ heißt.",
    safetyNote:
      "Im Beispiel keine echten Namen, Adressen oder Kundendaten verwenden.",
    retrievalQuestions: [
      "Warum hilft ein Beispiel im Prompt?",
      "Was zeigst du im Vorher-Nachher?",
      "Was prüfst du danach?",
    ],
    teachBackPrompt:
      "Erklär in einem Satz, warum ein kleines Beispiel den Prompt verbessert.",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-retrieval", "method-playful"],
  },
  {
    id: "mu-chat-10",
    worldId: "world-chat-prompting",
    lessonId: null,
    order: 10,
    title: "Zwei Antworten vergleichen — welche ist brauchbarer?",
    whyUseful:
      "Du trainierst Urteilskraft statt die erste Antwort blind zu übernehmen.",
    oneSentence:
      "Lass zwei Varianten erzeugen und entscheide mit klaren Kriterien: klar, korrekt, passend.",
    everydayExample:
      "„Gib mir zwei Varianten einer Absage-Mail: A kurz, B etwas wärmer. Ich wähle danach.“",
    steps: [
      "Bitte um zwei unterschiedlich gekennzeichnete Varianten.",
      "Bewerte Klarheit, Ton und fehlende Fakten.",
      "Übernimm nur das Geprüfte — oder mische selbst.",
    ],
    practiceTask:
      "Schreibe einen Prompt, der zwei Varianten einer Dankesmail erzeugt, und notiere dein Auswahlkriterium.",
    samplePath:
      "Variante A: 4 Sätze sachlich. Variante B: 5 Sätze freundlich. Danach: A wählen und einen Satz aus B übernehmen.",
    whyItWorks:
      "Vergleich macht Qualität sichtbar und reduziert Blindvertrauen.",
    commonMistake:
      "Die längere Variante automatisch für „besser“ halten.",
    safetyNote:
      "Auch bei Varianten: keine sensiblen Daten in den Prompt.",
    retrievalQuestions: [
      "Welche drei Kriterien nutzt du beim Vergleich?",
      "Warum zwei Varianten statt einer?",
      "Was machst du nach der Wahl?",
    ],
    teachBackPrompt:
      "Wie vergleichst du zwei KI-Antworten, ohne die erste zu übernehmen?",
    sourceIds: ["digcomp-30", "nist-genai-profile"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-confidence", "method-retrieval", "method-playful"],
  },
  {
    id: "mu-chat-11",
    worldId: "world-chat-prompting",
    lessonId: null,
    order: 11,
    title: "Stop-Signal: Wann ist Nachfragen genug?",
    whyUseful:
      "Endlose Nachfragen kosten Zeit und erzeugen oft mehr Unsicherheit.",
    oneSentence:
      "Plane maximal zwei Verbesserungsrunden — dann entscheidest du selbst und hörst auf.",
    everydayExample:
      "Runde 1: Entwurf. Runde 2: „Kürzer und klarer.“ Fertig — absenden nach menschlicher Prüfung.",
    steps: [
      "Lege vor dem Chat fest: höchstens zwei Iterationen.",
      "Formuliere die zweite Runde gezielt (nicht „nochmal besser“).",
      "Stoppe und prüfe selbst, bevor du weitermachst.",
    ],
    practiceTask:
      "Notiere für eine Aufgabe dein Stop-Signal (z. B. „nach 2 Runden fertig“).",
    samplePath:
      "Aufgabe: Einladung. Runde 1 Entwurf. Runde 2 kürzer. Stop. Selbst lesen. Senden.",
    whyItWorks:
      "Ein Stop-Signal schützt vor Perfektionsdruck und Chat-Endlosschleifen.",
    commonMistake:
      "Zehnmal „mach es besser“ tippen, ohne zu wissen, was fehlt.",
    safetyNote:
      "Je länger der Chat, desto eher können vertrauliche Details versehentlich landen — sparsam bleiben.",
    retrievalQuestions: [
      "Wie viele Verbesserungsrunden sind sinnvoll?",
      "Was ist ein Stop-Signal?",
      "Was kommt nach dem Stop?",
    ],
    teachBackPrompt:
      "Erklär jemandem dein Stop-Signal für KI-Chats.",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-progressive", "method-confidence", "method-teachback"],
  },
  {
    id: "mu-chat-12",
    worldId: "world-chat-prompting",
    lessonId: null,
    order: 12,
    title: "Alltag: Termin-Mail in drei Prompt-Schritten",
    whyUseful:
      "Du übst den kompletten Mini-Ablauf an einer echten, harmlosen Aufgabe.",
    oneSentence:
      "Ziel nennen → Prompt-Formel → einmal iterieren → selbst prüfen → erst dann nutzen.",
    everydayExample:
      "„Schreibe eine kurze Mail, um einen Arzttermin zu verschieben — höflich, 5 Sätze, ohne Diagnose.“",
    steps: [
      "Ziel und Grenze notieren (keine Gesundheitsdetails).",
      "Prompt mit Formel schreiben und Variante A holen.",
      "Eine gezielte Verbesserung, dann selbst gegenlesen.",
    ],
    practiceTask:
      "Schreibe den Drei-Schritt-Prompt für eine Terminverschiebung ohne private Details.",
    samplePath:
      "1 Ziel: Termin verschieben 2 Prompt mit Rolle/Format/Grenze 3 „Kürzer“ 4 Selbst prüfen",
    whyItWorks:
      "Der Ablauf verbindet Formel, Iteration und Prüfung zu einer Gewohnheit.",
    commonMistake:
      "Diagnosen oder Versicherungsnummern „zur Info“ in den Prompt tippen.",
    safetyNote:
      "Gesundheit, Versicherungen und Ausweisnummern gehören nie ungeprüft in den Chat.",
    retrievalQuestions: [
      "Welche drei Schritte hat der Ablauf?",
      "Was bleibt aus dem Prompt draußen?",
      "Wann darfst du die Mail nutzen?",
    ],
    teachBackPrompt:
      "Beschreibe den Drei-Schritt-Ablauf für eine Termin-Mail.",
    sourceIds: ["digcomp-30", "eu-gdpr"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-worked-example", "method-scenario", "method-progressive"],
  },
];
