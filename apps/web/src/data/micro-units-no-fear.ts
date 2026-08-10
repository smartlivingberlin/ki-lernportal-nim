import type { MicroLearningUnitV2 } from "./types";

const REVIEWED = "2026-08-10";

/**
 * Themenwelt „KI ohne Angst“ — vollständig nach Content Schema v2.
 * Die ersten drei Einheiten sind mit den bestehenden Lektionen l1–l3 verknüpft.
 */
export const microUnitsNoFear: MicroLearningUnitV2[] = [
  {
    id: "mu-nofear-01",
    worldId: "world-no-fear",
    lessonId: "l1",
    order: 1,
    title: "Was ist KI — ohne Fachchinesisch?",
    whyUseful:
      "Wenn du KI in einem Satz erklären kannst, sinkt die Angst und du kannst besser entscheiden, wann sie hilft.",
    oneSentence:
      "KI ist Software, die aus Mustern in Daten lernt und zu deiner Eingabe eine passende Ausgabe erzeugt — ohne eigenes Bewusstsein.",
    everydayExample:
      "Du tippst: „Formuliere diese Nachricht freundlicher.“ Die KI schlägt eine höflichere Version vor. Sie „fühlt“ nichts — sie berechnet eine wahrscheinliche Antwort.",
    steps: [
      "Merke dir: KI = Muster + Ausgabe, kein menschliches Denken.",
      "Vergleiche KI mit einem sehr schnellen Vorschlagshelfer.",
      "Übe eine Erklärung in Alltagssprache ohne das Wort „Algorithmus“.",
    ],
    practiceTask:
      "Erkläre einer imaginären Freundin in zwei Sätzen, was KI ist — und was sie nicht ist.",
    samplePath:
      "„KI ist ein Programm, das aus vielen Beispielen Muster lernt und dir Texte oder Ideen vorschlägt. Sie denkt nicht wie ein Mensch und kann sich irren.“",
    whyItWorks:
      "Eine ehrliche, kurze Erklärung verhindert Mythen und macht den nächsten Lernschritt leichter.",
    commonMistake:
      "Glauben, KI habe Absichten, Gefühle oder „wisse“ automatisch die Wahrheit.",
    safetyNote:
      "Nutze KI als Hilfe zum Verstehen und Formulieren — nicht als endgültige Autorität.",
    retrievalQuestions: [
      "Was erzeugt KI aus einer Eingabe?",
      "Denkt KI wie ein Mensch?",
      "Warum kann eine überzeugende Antwort trotzdem falsch sein?",
    ],
    teachBackPrompt: "Sag in einem Satz: Was ist KI — und was ist sie nicht?",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-nofear-02",
    worldId: "world-no-fear",
    lessonId: "l2",
    order: 2,
    title: "Was KI gut kann — und wann Vorsicht nötig ist",
    whyUseful:
      "So vermeidest du blinde Übernahme und nutzt KI dort, wo sie wirklich entlastet.",
    oneSentence:
      "KI ist stark bei Entwürfen, Struktur und Erklären — schwach bei Garantien für Wahrheit, Recht, Medizin und persönliche Sonderfälle.",
    everydayExample:
      "Gut: „Erklär den Unterschied zwischen Miete und Kaution.“ Vorsicht: „Ist dieser konkrete Mietvertrag rechtlich sicher?“",
    steps: [
      "Teile Aufgaben in „Entwurf“ und „Entscheidung mit Folgen“.",
      "Für Entwürfe darfst du KI nutzen.",
      "Für Entscheidungen mit Folgen brauchst du Quelle oder Fachperson.",
    ],
    practiceTask:
      "Schreibe zwei Aufgaben, bei denen KI hilft, und zwei, bei denen du zusätzlich prüfst.",
    samplePath:
      "Hilfreich: E-Mail umformulieren, Wochenplan skizzieren. Prüfen: gesundheitliche Einschätzung, Vertragsbewertung.",
    whyItWorks:
      "Die Trennung Entwurf/Entscheidung macht Risiken greifbar — ohne Panik.",
    commonMistake:
      "Professionell klingende Antworten ungeprüft übernehmen.",
    safetyNote:
      "Bei Recht, Gesundheit, Steuern, Finanzen und Verträgen immer gegenprüfen.",
    retrievalQuestions: [
      "Nenne eine gute Aufgabe für KI.",
      "Nenne eine Aufgabe mit Prüfpflicht.",
      "Warum ersetzt KI keine Fachprüfung?",
    ],
    teachBackPrompt:
      "Wann würdest du eine KI-Antwort auf keinen Fall ungeprüft weitergeben?",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-nofear-03",
    worldId: "world-no-fear",
    lessonId: "l3",
    order: 3,
    title: "Deine erste sichere KI-Frage",
    whyUseful:
      "Du kannst sofort starten, ohne private Daten zu riskieren.",
    oneSentence:
      "Eine sichere Frage ist klar formuliert und enthält keine Passwörter, Adressen, Gesundheits- oder Kundendaten.",
    everydayExample:
      "Unsicher: echte Namen, Adresse, Konto. Sicherer: „Formuliere eine freundliche Erinnerung an Person A ohne private Details.“",
    steps: [
      "Formuliere das Ziel in einem Satz.",
      "Ersetze echte Namen durch Platzhalter.",
      "Streiche alles, was geheim oder identifizierend ist.",
    ],
    practiceTask:
      "Schreibe eine harmlose Alltagsfrage an KI und streiche danach alle sensiblen Angaben.",
    samplePath:
      "„Schreibe eine kurze, freundliche Absage für einen Termin am Dienstag. Keine Namen, keine Adressen.“",
    whyItWorks:
      "Weniger sensible Daten = weniger Risiko, oft sogar klarere Antworten.",
    commonMistake:
      "Private Chats oder Dokumente ungeprüft in den Prompt kopieren.",
    safetyNote:
      "Keine Passwörter, Bankdaten, Gesundheitsakten oder vertraulichen Kundendaten eingeben.",
    retrievalQuestions: [
      "Welche Daten gehören nicht in einen Prompt?",
      "Was ist ein Platzhalter?",
      "Warum reicht oft eine allgemeine Beschreibung?",
    ],
    teachBackPrompt:
      "Nenne drei Dinge, die du nie in einen Prompt schreiben würdest.",
    sourceIds: ["digcomp-30", "eu-gdpr"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-worked-example", "method-playful"],
  },
  {
    id: "mu-nofear-04",
    worldId: "world-no-fear",
    lessonId: null,
    order: 4,
    title: "Angst ist okay — Panik blockiert Lernen",
    whyUseful:
      "Viele meiden KI aus Angst, etwas kaputt zu machen. Respekt hilft, Panik nicht.",
    oneSentence:
      "Du brauchst keine Angst vor dem Ausprobieren harmloser Übungen — du brauchst klare Grenzen für sensible Daten und wichtige Entscheidungen.",
    everydayExample:
      "Wie beim ersten Mal Online-Banking: erst mit Demo/Übungsaufgabe starten, nicht gleich mit dem wichtigsten Geheimnis.",
    steps: [
      "Unterscheide Respekt (Daten/Prüfung) von Panik (gar nicht anfassen).",
      "Starte mit einer Mini-Aufgabe ohne echte Geheimnisse.",
      "Notiere, was sich gut angefühlt hat.",
    ],
    practiceTask:
      "Schreibe einen Satz: „Heute probiere ich sicher … und lasse weg …“",
    samplePath:
      "„Heute probiere ich eine freundlichere E-Mail-Formulierung und lasse Namen sowie Kontodaten weg.“",
    whyItWorks:
      "Kleine, sichere Erfolgserlebnisse bauen Selbstvertrauen auf.",
    commonMistake:
      "Entweder alles meiden oder alles ungeprüft ausprobieren.",
    safetyNote:
      "Übe nur mit Inhalten, die du auch einer fremden Person zeigen dürftest.",
    retrievalQuestions: [
      "Was ist der Unterschied zwischen Respekt und Panik?",
      "Warum hilft eine Mini-Aufgabe?",
      "Was lässt du bewusst weg?",
    ],
    teachBackPrompt:
      "Erkläre einer ängstlichen Person in zwei Sätzen, warum ein kleiner sicherer Start sinnvoll ist.",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-progressive", "method-teachback", "method-confidence"],
  },
  {
    id: "mu-nofear-05",
    worldId: "world-no-fear",
    lessonId: null,
    order: 5,
    title: "KI fühlt nichts — und will nichts von dir",
    whyUseful:
      "Wenn du weißt, dass KI keine Absichten hat, wirst du weniger manipuliert von selbstsicherem Ton.",
    oneSentence:
      "KI klingt oft freundlich und sicher, hat aber keine Gefühle, kein Gewissen und keine eigenen Pläne.",
    everydayExample:
      "Eine Antwort kann „Natürlich helfe ich dir gerne!“ schreiben — das ist Stil, kein echtes Mitgefühl.",
    steps: [
      "Achte auf den Ton, aber prüfe den Inhalt.",
      "Frage: Was wäre, wenn der Ton unsicher klingen würde — ändert sich die Aussage?",
      "Trenne Höflichkeit von Wahrheit.",
    ],
    practiceTask:
      "Lies eine KI-Antwort und markiere: Was ist Ton? Was ist behauptete Tatsache?",
    samplePath:
      "Ton: „Gerne!“ Tatsache: „Der Laden hat bis 20 Uhr geöffnet.“ — die Tatsache braucht eine Quelle.",
    whyItWorks:
      "Du lernst, Form und Inhalt getrennt zu bewerten.",
    commonMistake:
      "Selbstsicheren Ton mit Richtigkeit verwechseln.",
    safetyNote:
      "Wichtig klingende Fakten immer gegenprüfen — besonders Termine, Preise, Regeln.",
    retrievalQuestions: [
      "Hat KI Gefühle?",
      "Warum wirkt KI oft so sicher?",
      "Was prüfst du trotz freundlichem Ton?",
    ],
    teachBackPrompt:
      "Erklär einem Kind: Warum klingt KI freundlich, ohne wirklich zu fühlen?",
    sourceIds: ["oecd-ai-principles", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-retrieval", "method-teachback"],
  },
  {
    id: "mu-nofear-06",
    worldId: "world-no-fear",
    lessonId: null,
    order: 6,
    title: "Alltag: Hilfe ohne Risiko wählen",
    whyUseful:
      "Du findest schnell Aufgaben, bei denen KI entlastet — ohne private Daten.",
    oneSentence:
      "Gute Einstiegsaufgaben sind Formulieren, Sortieren, Erklären und Ideen sammeln — ohne Geheimnisse.",
    everydayExample:
      "Einkaufsliste strukturieren, Geburtstagsideen sammeln, Fachbegriff einfach erklären lassen.",
    steps: [
      "Wähle eine Alltagsaufgabe ohne echte Namen.",
      "Formuliere Ziel + Format (z. B. 5 Stichpunkte).",
      "Prüfe das Ergebnis kurz auf Sinn und Vollständigkeit.",
    ],
    practiceTask:
      "Beschreibe eine Alltagsaufgabe für KI in einem Prompt ohne persönliche Daten.",
    samplePath:
      "„Erstelle 7 einfache Abendessen-Ideen für eine Person, 20 Minuten Zubereitung, ohne spezielle Diäten.“",
    whyItWorks:
      "Konkrete, harmlose Aufgaben machen den Nutzen spürbar.",
    commonMistake:
      "Gleich die schwierigste oder privateste Aufgabe zuerst wählen.",
    safetyNote:
      "Keine Adressen, Gesundheitsdetails oder Familieninterna in den Prompt.",
    retrievalQuestions: [
      "Nenne drei sichere Alltagsaufgaben.",
      "Welche Daten lässt du weg?",
      "Was prüfst du nach der Antwort?",
    ],
    teachBackPrompt:
      "Welche Alltagsaufgabe würdest du einer Anfängerin als erstes empfehlen — und warum?",
    sourceIds: ["digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-worked-example", "method-playful"],
  },
  {
    id: "mu-nofear-07",
    worldId: "world-no-fear",
    lessonId: null,
    order: 7,
    title: "Beruf: Entwurf ja — Entscheidung mit Prüfung",
    whyUseful:
      "Im Job spart KI Zeit, wenn du klare Grenzen für Kundendaten und Freigaben setzt.",
    oneSentence:
      "Im Beruf darf KI Entwürfe vorbereiten; verbindliche Aussagen und Kundendaten brauchen Regeln und Prüfung.",
    everydayExample:
      "Okay: interne Meeting-Agenda skizzieren. Nicht okay: Kundendaten, Gehälter oder Vertragsgeheimnisse ungefragt einfügen.",
    steps: [
      "Frage: Dürfte ich das auch laut im Großraumbüro sagen?",
      "Wenn nein: nicht in den Prompt.",
      "Lass KI einen Entwurf machen und prüfe ihn selbst vor dem Versenden.",
    ],
    practiceTask:
      "Formuliere einen beruflichen Prompt für eine Agenda — ohne Firmengeheimnisse und ohne Kundennamen.",
    samplePath:
      "„Erstelle eine 30-Minuten-Agenda für ein Team-Update: Begrüßung, Fortschritt, Blocker, nächste Schritte. Neutrale Platzhalter, kein Kundennamen.“",
    whyItWorks:
      "Die „Laut-sagen“-Regel macht Datenschutz im Alltag greifbar.",
    commonMistake:
      "Kundenmails komplett in öffentliche KI-Tools kopieren.",
    safetyNote:
      "Firmenregeln und Datenschutz gehen vor Komfort. Im Zweifel interne Tools oder Freigabe fragen.",
    retrievalQuestions: [
      "Was darf KI im Beruf vorbereiten?",
      "Was gehört nicht in den Prompt?",
      "Was bedeutet die Laut-sagen-Regel?",
    ],
    teachBackPrompt:
      "Erkläre einem Kollegen in zwei Sätzen, wann KI im Job hilft und wann nicht.",
    sourceIds: ["eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 7,
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-nofear-08",
    worldId: "world-no-fear",
    lessonId: null,
    order: 8,
    title: "Menschen bleiben in der Verantwortung",
    whyUseful:
      "Du behältst die Kontrolle — KI ist Werkzeug, keine Ausrede.",
    oneSentence:
      "Auch wenn KI hilft: Du entscheidest, was veröffentlicht, gesendet oder unterschrieben wird.",
    everydayExample:
      "KI schreibt einen Entwurf. Du liest, korrigierst und klickst erst dann auf „Senden“.",
    steps: [
      "Sieh KI als Co-Autor, nicht als Chef.",
      "Plane immer einen menschlichen Prüfpunkt.",
      "Übernimm Verantwortung für das Endergebnis.",
    ],
    practiceTask:
      "Beschreibe deinen persönlichen Prüfpunkt vor dem Absenden einer KI-gestützten Nachricht.",
    samplePath:
      "„Ich lese den Text einmal laut, prüfe Fakten und entferne alles Private — dann sende ich.“",
    whyItWorks:
      "Feste Prüfpunkte verhindern blinde Automatik.",
    commonMistake:
      "„Die KI hat das geschrieben“ als Entschuldigung für Fehler nutzen.",
    safetyNote:
      "Bei hohen Folgen: zweite Person oder Fachstelle einbeziehen.",
    retrievalQuestions: [
      "Wer trägt die Verantwortung für das Endergebnis?",
      "Was ist ein Prüfpunkt?",
      "Wann brauchst du eine zweite Person?",
    ],
    teachBackPrompt:
      "Warum reicht „Die KI war’s“ nicht als Erklärung für einen Fehler?",
    sourceIds: ["oecd-ai-principles", "eu-ai-act"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-teachback", "method-retrieval"],
  },
  {
    id: "mu-nofear-09",
    worldId: "world-no-fear",
    lessonId: null,
    order: 9,
    title: "Mini-Sicherheitscheck vor jedem Prompt",
    whyUseful:
      "Ein 20-Sekunden-Check verhindert die häufigsten Anfängerfehler.",
    oneSentence:
      "Vor dem Absenden: Ziel klar? Sensible Daten weg? Ergebnis prüfbar?",
    everydayExample:
      "Wie vor dem Posten in sozialen Medien: kurz innehalten und prüfen.",
    steps: [
      "Ziel: Was soll rauskommen?",
      "Daten: Was muss ich streichen?",
      "Prüfung: Wie erkenne ich, ob die Antwort taugt?",
    ],
    practiceTask:
      "Wende den 3-Fragen-Check auf einen Prompt an, den du heute schreiben würdest.",
    samplePath:
      "Ziel: 5 Tipps für Konzentration. Daten: keine. Prüfung: Sind die Tipps praktisch und harmlos?",
    whyItWorks:
      "Kurze Routinen bleiben im Alltag hängen.",
    commonMistake:
      "Aus Gewohnheit alles hineinkopieren „weil’s schneller geht“.",
    safetyNote:
      "Schnelligkeit schlägt niemals den Schutz von Geheimnissen.",
    retrievalQuestions: [
      "Welche drei Fragen gehören zum Check?",
      "Was streichst du zuerst?",
      "Wie prüfst du die Antwort?",
    ],
    teachBackPrompt:
      "Erklär den Mini-Sicherheitscheck in drei Stichpunkten.",
    sourceIds: ["eu-gdpr", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-worked-example", "method-retrieval", "method-playful"],
  },
  {
    id: "mu-nofear-10",
    worldId: "world-no-fear",
    lessonId: null,
    order: 10,
    title: "Abschluss: Dein sicherer Startplan",
    whyUseful:
      "Du verlässt die Themenwelt mit einem konkreten, angstfreien Plan.",
    oneSentence:
      "Dein Start: eine harmlose Aufgabe, ein klarer Prompt, ein Prüfpunkt — und keine sensiblen Daten.",
    everydayExample:
      "Heute: eine E-Mail umformulieren. Morgen: einen Begriff erklären lassen. Übermorgen: Ideen für ein Hobby sammeln.",
    steps: [
      "Wähle eine Aufgabe für die nächsten 24 Stunden.",
      "Schreibe den Prompt ohne Geheimnisse.",
      "Setze deinen Prüfpunkt vor dem Nutzen des Ergebnisses.",
    ],
    practiceTask:
      "Schreibe deinen 3-Zeilen-Startplan: Aufgabe / Prompt-Idee / Prüfpunkt.",
    samplePath:
      "Aufgabe: Geburtstagswunsch formulieren. Prompt: warm, 4 Sätze, kein Name nötig. Prüfpunkt: einmal laut lesen.",
    whyItWorks:
      "Ein Plan macht aus Wissen eine Gewohnheit.",
    commonMistake:
      "Alles auf einmal lernen wollen und dann gar nicht starten.",
    safetyNote:
      "Bleib bei Übungsinhalten, bis du den Sicherheitscheck automatisch machst.",
    retrievalQuestions: [
      "Was sind die drei Teile deines Startplans?",
      "Warum nur eine Aufgabe zuerst?",
      "Was bleibt immer weg?",
    ],
    teachBackPrompt:
      "Fasse die Themenwelt „KI ohne Angst“ in drei Sätzen für dich selbst zusammen.",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-teachback", "method-confidence", "method-progressive"],
  },
];
