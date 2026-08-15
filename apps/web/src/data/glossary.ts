import { GlossaryTerm } from './types';

export const seedGlossary: GlossaryTerm[] = [
  // Priority 1
  {
    id: 'ki',
    term: 'KI (Künstliche Intelligenz)',
    definition: 'Ein Computerprogramm, das Aufgaben erledigt, für die man normalerweise menschliche Intelligenz braucht, wie z.B. Texte schreiben oder Bilder erkennen.',
    example: 'Ein Programm, das dir hilft, eine E-Mail höflicher zu formulieren.',
    priority: 1,
    sourceIds: ["digcomp-30","oecd-ai-principles"]
  },
  {
    id: 'prompt',
    term: 'Prompt',
    definition: 'Die Anweisung oder Frage, die du der KI gibst.',
    example: 'Wenn du schreibst: "Schreibe ein kurzes Gedicht über einen Hund", dann ist dieser Satz der Prompt.',
    priority: 1,
    sourceIds: ["digcomp-30"]
  },
  {
    id: 'halluzination',
    term: 'Halluzination',
    definition: 'Wenn die KI Dinge erfindet, die falsch sind, aber sehr überzeugend klingen.',
    example: 'Die KI behauptet, dass der aktuelle Bundeskanzler ein berühmter Eiskunstläufer sei.',
    priority: 1,
    sourceIds: ["nist-genai-profile","nist-ai-rmf"]
  },
  {
    id: 'quelle',
    term: 'Quelle',
    definition: 'Der Ursprung einer Information, also woher eine Aussage nachprüfbar kommt — nicht nur die Formulierung der KI.',
    example: 'Ein Zeitungsartikel oder eine Behörden-Webseite, die als Beleg für eine Aussage dient.',
    priority: 1,
    sourceIds: ["digcomp-30","nist-genai-profile"]
  },
  {
    id: 'datenschutz',
    term: 'Datenschutz',
    definition: 'Regeln, die bestimmen, wie deine persönlichen Informationen (wie Name oder Adresse) geschützt werden.',
    example: 'Dass du keine privaten Passwörter oder Bankdaten in einen öffentlichen KI-Chat eingeben solltest.',
    priority: 1,
    sourceIds: ["eu-gdpr","digcomp-30"]
  },
  {
    id: 'modell',
    term: 'KI-Modell',
    definition: 'Das Rechenprogramm hinter einem Chat oder Bildgenerator. Verschiedene Modelle sind für verschiedene Aufgaben besser geeignet.',
    example: 'Ein Text-Modell für E-Mails, ein Vision-Modell für Bilderklärungen.',
    priority: 1,
    sourceIds: ["digcomp-30","oecd-ai-principles"]
  },
  // Priority 2
  {
    id: 'llm',
    term: 'Großes Sprachmodell',
    definition: 'Ein KI-Sprachsystem, das mit sehr vielen Texten trainiert wurde und dadurch Fragen beantworten, Texte schreiben und Sprache erkennen kann.',
    example: 'ChatGPT oder ähnliche Systeme sind Beispiele für große Sprachmodelle.',
    priority: 2,
    sourceIds: ["digcomp-30","oecd-ai-principles"]
  },
  {
    id: 'rag',
    term: 'Antworten mit Quellenbezug',
    definition: 'Eine Methode, bei der die KI erst in verlässlichen Dokumenten nachschaut, bevor sie eine Antwort gibt.',
    example: 'Ein Firmen-Chatbot, der erst im internen Handbuch liest, wie der Urlaubsantrag funktioniert, bevor er dir antwortet.',
    priority: 2,
    sourceIds: ["digcomp-30","nist-genai-profile"]
  },
  {
    id: 'ai-act',
    term: 'AI Act',
    definition: 'Ein neues Gesetz der Europäischen Union, das Regeln für den sicheren Einsatz von KI festlegt.',
    example: 'Ein Gesetz, das u. a. AI Literacy und risikobasierte Pflichten thematisiert.',
    priority: 2,
    sourceIds: ["eu-ai-act","oecd-ai-principles"]
  },
  {
    id: 'agent',
    term: 'KI-Agent',
    definition: 'Ein KI-System, das nicht nur antwortet, sondern Schritte ausführen oder Werkzeuge nutzen kann — deshalb braucht es klare Grenzen.',
    example: 'Ein Assistent, der Termine vorschlägt und erst nach deiner Freigabe etwas bucht.',
    priority: 2,
    sourceIds: ["digcomp-30","nist-ai-rmf"]
  },
  {
    id: 'automation',
    term: 'Automatisierung',
    definition: 'Wiederkehrende Abläufe werden ganz oder teilweise von Software erledigt.',
    example: 'Eingehende Formulare werden sortiert, und du prüfst nur die Grenzfälle.',
    priority: 2,
    sourceIds: ["digcomp-30","oecd-ai-principles"]
  },
  {
    id: 'multimodal',
    term: 'Multimodal',
    definition: 'KI, die mit mehreren Medienarten umgehen kann — z. B. Text und Bild.',
    example: 'Du lädst ein Foto einer Speisekarte hoch und lässt sie in Alltagssprache erklären.',
    priority: 2,
    sourceIds: ["digcomp-30"]
  },
  {
    id: 'vibe-coding',
    term: 'Vibe Coding',
    definition: 'Mit KI kleine Software-Ideen bauen: Wunsch beschreiben, Code vorschlagen lassen, prüfen, testen, absichern.',
    example: 'Du baust eine Checklisten-App und lässt die KI den ersten Entwurf schreiben — du prüfst Secrets und Fehler.',
    priority: 2,
    sourceIds: ["digcomp-30","nist-ai-rmf"]
  },
  // Priority 3
  {
    id: 'embedding',
    term: 'Bedeutung als Zahlen-Code',
    definition: 'Eine Methode, mit der ein Computer Wörter oder Texte so umwandelt, dass er ihre Bedeutung vergleichen kann.',
    example: 'Der Computer kann erkennen, dass "Hund" und "Welpe" eine ähnliche Bedeutung haben.',
    priority: 3,
    sourceIds: ["digcomp-30","nist-genai-profile"]
  },
  {
    id: 'reranking',
    term: 'Suchergebnisse neu sortieren',
    definition: 'Ein zweiter Prüfschritt, bei dem gefundene Antworten oder Quellen noch einmal nach ihrer Wichtigkeit sortiert werden.',
    example: 'Von 10 gefundenen Antworten werden die 3 ausgewählt, die wirklich am besten zur Frage passen.',
    priority: 3,
    sourceIds: ["digcomp-30","nist-genai-profile"]
  },
  {
    id: 'guardrail',
    term: 'Leitplanke',
    definition: 'Eine Schutzregel oder technische Grenze, die riskante KI-Ausgaben oder -Aktionen verhindern soll (manchmal „Guardrail“ genannt).',
    example: 'Das System darf keine Passwörter speichern und keine Buchungen ohne Freigabe ausführen.',
    priority: 3,
    sourceIds: ["nist-ai-rmf","nist-genai-profile"]
  },
  {
    id: 'spaced-review',
    term: 'Wiederholen mit Abstand',
    definition: 'Du rufst Wissen später erneut ab, statt alles an einem Tag zu pauken — das stärkt die Erinnerung.',
    example: 'Heute unsicher markiert → morgen kommt die Abruffrage wieder.',
    priority: 2,
    sourceIds: ["digcomp-30"]
  }
];
