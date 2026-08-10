import type { MicroLearningUnitV2 } from "./types";

const REVIEWED = "2026-08-10";

/**
 * Themenwelt „Recherche & Wahrheit“ — Schema v2.
 * Verknüpft mit l7–l9; weitere Einheiten direkt in der Themenwelt.
 */
export const microUnitsResearchTruth: MicroLearningUnitV2[] = [
  {
    id: "mu-truth-01",
    worldId: "world-research-truth",
    lessonId: "l8",
    order: 1,
    title: "Was ist eine Halluzination — ohne Fachchinesisch?",
    whyUseful:
      "Wenn du das Wort verstehst, wirst du weniger von selbstsicheren Antworten überrumpelt.",
    oneSentence:
      "Eine Halluzination ist eine KI-Antwort, die glaubwürdig klingt, aber falsch, erfunden oder unbelegt ist.",
    everydayExample:
      "Die KI nennt ein „Gesetz vom 12. März 2019, § 14b“ — klingt präzise, existiert aber so nicht.",
    steps: [
      "Lies die Antwort wie einen Entwurf, nicht wie eine Behörde.",
      "Markiere Zahlen, Namen, Links und Regeln als „prüfen“.",
      "Vergleiche mindestens eine Kernaussage mit einer unabhängigen Quelle.",
    ],
    practiceTask:
      "Schreibe in eigenen Worten, warum „klingt überzeugend“ nicht „ist wahr“ bedeutet.",
    samplePath:
      "„Die KI kann flüssig erklären und trotzdem erfinden. Überzeugung ≠ Beleg.“",
    whyItWorks:
      "Ein klares Bild vom Fehlertyp macht dich wachsamer, ohne Panik.",
    commonMistake:
      "Nur fragen „Bist du sicher?“ und der Bestätigung glauben.",
    safetyNote:
      "Bei Recht, Gesundheit, Steuern und Finanzen immer externe Prüfung — nie nur den Chat.",
    retrievalQuestions: [
      "Was ist eine Halluzination?",
      "Welche Antwortteile solltest du besonders markieren?",
      "Warum reicht „Bist du sicher?“ nicht?",
    ],
    teachBackPrompt:
      "Erklär einem Freund in einem Satz, was eine KI-Halluzination ist.",
    sourceIds: ["nist-genai-profile", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-worked-example", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-truth-02",
    worldId: "world-research-truth",
    lessonId: "l8",
    order: 2,
    title: "Warnsignale: Wann solltest du besonders misstrauisch sein?",
    whyUseful:
      "Du brauchst keine Expertendiagnose — ein paar klare Signale reichen für den Alltag.",
    oneSentence:
      "Sehr präzise Zahlen ohne Quelle, erfundene Links, absolute Sicherheit und Widersprüche sind Warnsignale.",
    everydayExample:
      "„Genau 47,3 % aller Haushalte …“ ohne Angabe — stopp und prüfen.",
    steps: [
      "Suche nach absoluten Formulierungen („immer“, „garantiert“, „bewiesen“).",
      "Prüfe, ob Links und Titel echt wirken und erreichbar sind.",
      "Vergleiche mit dem, was du schon sicher weißt.",
    ],
    practiceTask:
      "Liste drei Warnsignale auf und finde in einer KI-Antwort (oder Beispiel) eines davon.",
    samplePath:
      "Warnsignale: genaue Statistik ohne Quelle · toter Link · „100 % sicher“.",
    whyItWorks:
      "Checklisten reduzieren Blindvertrauen unter Zeitdruck.",
    commonMistake:
      "Nur auf Rechtschreibung achten und Inhalt für wahr halten.",
    safetyNote:
      "Selbst „offizielle klingende“ Formulierungen sind kein Nachweis.",
    retrievalQuestions: [
      "Nenne drei Warnsignale.",
      "Warum sind tote Links ein Problem?",
      "Was bedeutet absolute Sicherheit in einer KI-Antwort?",
    ],
    teachBackPrompt:
      "Welche zwei Warnsignale erklärst du als Erstes einer Kollegin?",
    sourceIds: ["nist-genai-profile", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-retrieval", "method-scenario", "method-confidence"],
  },
  {
    id: "mu-truth-03",
    worldId: "world-research-truth",
    lessonId: "l9",
    order: 3,
    title: "Was zählt als Quelle — und was nicht?",
    whyUseful:
      "Ohne diesen Unterschied verwechselst du schöne Erklärungen mit Belegen.",
    oneSentence:
      "Eine Quelle ist ein nachprüfbarer Ort der Information — nicht nur die Formulierung der KI.",
    everydayExample:
      "„Die EU sagt …“ ohne Link oder Dokumenttitel ist eine Behauptung, keine Quelle.",
    steps: [
      "Frage: Wer hat das veröffentlicht?",
      "Frage: Wann wurde es aktualisiert?",
      "Frage: Passt die Quelle wirklich zur Aussage?",
    ],
    practiceTask:
      "Formuliere einen Prompt, der die KI bittet, Behauptungen und mögliche Prüfquellen getrennt zu listen.",
    samplePath:
      "„Liste 5 Behauptungen. Für jede: mögliche offizielle Prüfstelle (Name + warum). Keine erfundenen Links.“",
    whyItWorks:
      "Trennung von Anspruch und Nachweis macht Prüfung machbar.",
    commonMistake:
      "Eine flüssige Zusammenfassung als Beleg behandeln.",
    safetyNote:
      "Von der KI genannte Links können tot oder erfunden sein — immer selbst öffnen.",
    retrievalQuestions: [
      "Was ist eine Quelle?",
      "Welche drei PrüfFragen gehören dazu?",
      "Warum ist eine Erklärung noch kein Nachweis?",
    ],
    teachBackPrompt:
      "Erklär den Unterschied zwischen Erklärung und Quelle in einem Satz.",
    sourceIds: ["digcomp-30", "nist-genai-profile"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-truth-04",
    worldId: "world-research-truth",
    lessonId: "l9",
    order: 4,
    title: "Gegenprüfung in drei Minuten",
    whyUseful:
      "Du brauchst kein Wissenschaftsstudium — eine kurze, feste Routine reicht oft.",
    oneSentence:
      "Wähle eine Kernaussage, suche eine unabhängige Quelle, vergleiche und entscheide.",
    everydayExample:
      "KI sagt: „Frist X gilt immer.“ Du prüfst auf der offiziellen Behördenseite — und siehst Ausnahmen.",
    steps: [
      "Eine Aussage auswählen (nicht alles auf einmal).",
      "Unabhängige Quelle öffnen (Behörde, Verlag, bekannte Fachseite).",
      "Übereinstimmung oder Widerspruch notieren.",
    ],
    practiceTask:
      "Nimm eine fiktive Aussage und beschreibe deine 3-Minuten-Prüfung Schritt für Schritt.",
    samplePath:
      "Aussage markieren → offizielle Seite suchen → Ergebnis in einem Satz notieren.",
    whyItWorks:
      "Kleine, wiederholbare Routinen schlagen Absichtserklärungen.",
    commonMistake:
      "Zehn Aussagen gleichzeitig prüfen wollen und dann gar nichts prüfen.",
    safetyNote:
      "Bei schweren Folgen (Vertrag, Gesundheit) lieber Fachperson oder Primärquelle.",
    retrievalQuestions: [
      "Welche drei Schritte hat die Kurzprüfung?",
      "Warum nur eine Aussage zuerst?",
      "Was notierst du am Ende?",
    ],
    teachBackPrompt:
      "Wie erklärst du die 3-Minuten-Gegenprüfung einem Anfänger?",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-worked-example", "method-retrieval", "method-scenario"],
  },
  {
    id: "mu-truth-05",
    worldId: "world-research-truth",
    lessonId: "l7",
    order: 5,
    title: "Ideen nutzen, ohne sie für Wahrheit zu halten",
    whyUseful:
      "KI ist stark bei Varianten — schwach, wenn du Varianten mit Fakten verwechselst.",
    oneSentence:
      "Behandle Vorschläge als Optionen: auswählen, streichen, verbessern, dann prüfen.",
    everydayExample:
      "Fünf Ideentitel für einen Blog — gut. Fünf „statistische Belege“ ungeprüft übernehmen — riskant.",
    steps: [
      "Ideen sammeln lassen.",
      "Unpassendes streichen.",
      "Behauptungen, die wie Fakten klingen, extra markieren und prüfen.",
    ],
    practiceTask:
      "Schreibe eine kurze Regel für dich: Wann ist eine KI-Idee nur Entwurf?",
    samplePath:
      "„Alles ohne Quelle ist Entwurf. Alles mit Zahl/Name/Regel braucht Prüfung.“",
    whyItWorks:
      "Rollenklarheit verhindert Blindvertrauen bei kreativen Aufgaben.",
    commonMistake:
      "Die erste Liste 1:1 übernehmen, weil sie „fertig“ wirkt.",
    safetyNote:
      "Auch kreative Texte können falsche Fakten einschmuggeln.",
    retrievalQuestions: [
      "Was ist der Unterschied zwischen Idee und Fakt?",
      "Welche drei Schritte nach dem Ideensammeln?",
      "Was markierst du besonders?",
    ],
    teachBackPrompt:
      "Wie erklärst du „Ideen ≠ Wahrheit“ in 15 Sekunden?",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-retrieval", "method-teachback", "method-confidence"],
  },
  {
    id: "mu-truth-06",
    worldId: "world-research-truth",
    lessonId: null,
    order: 6,
    title: "Zweitmeinung: Warum dieselbe KI nicht reicht",
    whyUseful:
      "Viele denken, zweimal fragen sei Prüfung — oft ist es nur Wiederholung.",
    oneSentence:
      "Eine echte Gegenprüfung braucht eine unabhängige Quelle oder Person — nicht denselben Chat.",
    everydayExample:
      "Chat bestätigt sich selbst. Die Behörden-FAQ sagt etwas anderes.",
    steps: [
      "Erste Antwort als Entwurf speichern.",
      "Zweite Quelle außerhalb des Chats öffnen.",
      "Abweichungen klar notieren.",
    ],
    practiceTask:
      "Beschreibe einen Fall, in dem „nochmal dieselbe KI fragen“ dich in die Irre führen würde.",
    samplePath:
      "Rechtliche Frist: Chat bestätigt sich — erst die offizielle Seite zählt.",
    whyItWorks:
      "Unabhängigkeit ist der Kern von Prüfung.",
    commonMistake:
      "Zwei ähnliche Chat-Antworten als „doppelt geprüft“ verbuchen.",
    safetyNote:
      "Bei Konflikten zwischen Chat und Primärquelle gewinnt die Primärquelle.",
    retrievalQuestions: [
      "Warum reicht dieselbe KI nicht?",
      "Was ist eine unabhängige Quelle?",
      "Was machst du bei Widersprüchen?",
    ],
    teachBackPrompt:
      "Erklär den Unterschied zwischen „nochmal fragen“ und „gegenprüfen“.",
    sourceIds: ["nist-genai-profile", "digcomp-30"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-scenario", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-truth-07",
    worldId: "world-research-truth",
    lessonId: null,
    order: 7,
    title: "Prompt für prüfbare Antworten",
    whyUseful:
      "Du kannst die KI bitten, Unsicherheit und Prüfpunkte sichtbar zu machen.",
    oneSentence:
      "Bitte um Annahmen, Unsicherheiten und konkrete Prüffragen — nicht nur um „die Antwort“.",
    everydayExample:
      "„Nenne Annahmen. Markiere Unsicherheiten. Gib 3 Prüffragen für mich.“",
    steps: [
      "Aufgabe klar formulieren.",
      "Explizit um Unsicherheiten und Prüfpunkte bitten.",
      "Selbst die Prüfpunkte abarbeiten.",
    ],
    practiceTask:
      "Schreibe einen Prompt, der Antwort + Unsicherheiten + Prüfliste verlangt.",
    samplePath:
      "„Erkläre X für Anfänger. Liste Annahmen. Markiere Unsicherheiten. Gib 3 konkrete Prüffragen.“",
    whyItWorks:
      "Sichtbare Unsicherheit macht Blindvertrauen schwerer.",
    commonMistake:
      "Nur „Schreib den Text“ verlangen und Prüfung vergessen.",
    safetyNote:
      "Auch eine ehrliche Unsicherheitsliste ersetzt keine echte Quelle.",
    retrievalQuestions: [
      "Welche drei Extra-Bausteine helfen bei prüfbaren Antworten?",
      "Warum Annahmen sichtbar machen?",
      "Wer arbeitet die Prüffragen ab?",
    ],
    teachBackPrompt:
      "Wie lautet dein Standard-Zusatz für prüfbare Prompts?",
    sourceIds: ["digcomp-30", "nist-ai-rmf"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-worked-example", "method-retrieval", "method-playful"],
  },
  {
    id: "mu-truth-08",
    worldId: "world-research-truth",
    lessonId: null,
    order: 8,
    title: "Alltag: Nachrichten und Tipps nicht ungeprüft teilen",
    whyUseful:
      "Falsche Tipps verbreiten sich schnell — besonders wenn sie hilfreich klingen.",
    oneSentence:
      "Bevor du teilst: eine Kernaussage gegenprüfen und den Kontext nennen.",
    everydayExample:
      "„Neue Förderregel für alle“ — erst auf der offiziellen Seite prüfen, dann weiterleiten.",
    steps: [
      "Kernaussage in einem Satz formulieren.",
      "Eine Primärquelle suchen.",
      "Beim Teilen den Prüfstand kurz sagen („ungeprüft“ / „geprüft bei …“).",
    ],
    practiceTask:
      "Schreibe zwei Varianten einer Weiterleitung: ungeprüft vs. geprüft.",
    samplePath:
      "Ungeprüft: „Habe das noch nicht geprüft.“ Geprüft: „Laut [Behörde], Stand …“",
    whyItWorks:
      "Transparenz schützt dich und andere.",
    commonMistake:
      "Teilen, weil es „zu gut klingt, um falsch zu sein“.",
    safetyNote:
      "Gesundheits- und Geld-Tipps besonders streng prüfen.",
    retrievalQuestions: [
      "Was machst du vor dem Teilen?",
      "Warum Kontext nennen?",
      "Welche Themen brauchen besonders strenge Prüfung?",
    ],
    teachBackPrompt:
      "Welche eine Regel nimmst du dir fürs Teilen vor?",
    sourceIds: ["digcomp-30", "oecd-ai-principles"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-scenario", "method-retrieval", "method-teachback"],
  },
  {
    id: "mu-truth-09",
    worldId: "world-research-truth",
    lessonId: null,
    order: 9,
    title: "Beruf: Berichte und Zahlen gegen das Original halten",
    whyUseful:
      "Im Job können falsche Zahlen teuer und peinlich werden.",
    oneSentence:
      "KI darf kürzen und sortieren — du sicherst Zahlen, Namen und Schlussfolgerungen.",
    everydayExample:
      "Zusammenfassung sagt „Umsatz +12 %“ — im Original steht „+1,2 %“.",
    steps: [
      "Zahlen und Namen in der Zusammenfassung markieren.",
      "Gegen Original oder Systembericht prüfen.",
      "Ton und Verantwortung vor dem Versand anpassen.",
    ],
    practiceTask:
      "Liste drei Dinge, die du nach einer KI-Zusammenfassung immer prüfst.",
    samplePath:
      "Zahlen · Eigennamen · Empfehlungen/Schlussfolgerungen.",
    whyItWorks:
      "Feste Prüfobjekte verhindern „nur überfliegen“.",
    commonMistake:
      "Nur Stil glätten und Inhalt für korrekt halten.",
    safetyNote:
      "Keine vertraulichen Kundendaten in öffentliche KI-Chats kopieren.",
    retrievalQuestions: [
      "Welche drei Dinge prüfst du nach einer Zusammenfassung?",
      "Warum Zahlen besonders?",
      "Was ist vor dem Versand noch wichtig?",
    ],
    teachBackPrompt:
      "Erklär einem Azubi die Kurz-Checkliste nach KI-Zusammenfassungen.",
    sourceIds: ["nist-ai-rmf", "eu-gdpr"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 6,
    methodIds: ["method-scenario", "method-retrieval", "method-confidence"],
  },
  {
    id: "mu-truth-10",
    worldId: "world-research-truth",
    lessonId: "l12",
    order: 10,
    title: "Abschluss-Ritual: Entwurf → Prüfung → Freigabe",
    whyUseful:
      "Ein kleines Ritual hält dich auch dann sicher, wenn es stressig wird.",
    oneSentence:
      "Erst Entwurf, dann gezielte Prüfung, dann bewusste Freigabe — in dieser Reihenfolge.",
    everydayExample:
      "Mail-Entwurf von KI → zwei Fakten prüfen → erst dann senden.",
    steps: [
      "Antwort als Entwurf behandeln.",
      "1–3 kritische Punkte prüfen.",
      "Erst danach freigeben, speichern oder teilen.",
    ],
    practiceTask:
      "Schreibe dein persönliches Ritual in drei kurzen Zeilen.",
    samplePath:
      "1 Entwurf 2 Prüfung (Zahlen/Quellen) 3 Freigabe mit Datum/Stand.",
    whyItWorks:
      "Rituale schützen besser als gute Vorsätze.",
    commonMistake:
      "Unter Zeitdruck die Prüfung „später“ verschieben und vergessen.",
    safetyNote:
      "Bei Unsicherheit: nicht freigeben — nachschlagen oder nachfragen.",
    retrievalQuestions: [
      "Welche drei Schritte hat das Ritual?",
      "Warum Freigabe bewusst?",
      "Was tun bei Unsicherheit?",
    ],
    teachBackPrompt:
      "Wie lautet dein Ritual in einem Satz?",
    sourceIds: ["digcomp-30", "nist-ai-rmf", "eu-gdpr"],
    lastReviewed: REVIEWED,
    estimatedMinutes: 5,
    methodIds: ["method-retrieval", "method-teachback", "method-confidence"],
  },
];
