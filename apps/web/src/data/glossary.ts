import { GlossaryTerm } from './types';

export const seedGlossary: GlossaryTerm[] = [
  // Priority 1
  {
    id: 'ki',
    term: 'KI (Künstliche Intelligenz)',
    definition: 'Ein Computerprogramm, das Aufgaben erledigt, für die man normalerweise menschliche Intelligenz braucht, wie z.B. Texte schreiben oder Bilder erkennen.',
    example: 'Ein Programm, das dir hilft, eine E-Mail höflicher zu formulieren.',
    priority: 1
  },
  {
    id: 'prompt',
    term: 'Prompt',
    definition: 'Die Anweisung oder Frage, die du der KI gibst.',
    example: 'Wenn du schreibst: "Schreibe ein kurzes Gedicht über einen Hund", dann ist dieser Satz der Prompt.',
    priority: 1
  },
  {
    id: 'halluzination',
    term: 'Halluzination',
    definition: 'Wenn die KI Dinge erfindet, die falsch sind, aber sehr überzeugend klingen.',
    example: 'Die KI behauptet, dass der aktuelle Bundeskanzler ein berühmter Eiskunstläufer sei.',
    priority: 1
  },
  {
    id: 'quelle',
    term: 'Quelle',
    definition: 'Der Ursprung einer Information, also woher die KI ihr Wissen hat.',
    example: 'Ein Zeitungsartikel oder ein Buch, das als Beleg für eine Aussage dient.',
    priority: 1
  },
  {
    id: 'datenschutz',
    term: 'Datenschutz',
    definition: 'Regeln, die bestimmen, wie deine persönlichen Informationen (wie Name oder Adresse) geschützt werden.',
    example: 'Dass du keine privaten Passwörter oder Bankdaten in einen öffentlichen KI-Chat eingeben solltest.',
    priority: 1
  },
  // Priority 2
  {
    id: 'llm',
    term: 'Großes Sprachmodell',
    definition: 'Ein KI-Sprachsystem, das mit sehr vielen Texten trainiert wurde und dadurch Fragen beantworten, Texte schreiben und Sprache erkennen kann.',
    example: 'ChatGPT oder ähnliche Systeme sind Beispiele für große Sprachmodelle.',
    priority: 2
  },
  {
    id: 'rag',
    term: 'Antworten mit Quellenbezug',
    definition: 'Eine Methode, bei der die KI erst in verlässlichen Dokumenten nachschaut, bevor sie eine Antwort gibt.',
    example: 'Ein Firmen-Chatbot, der erst im internen Handbuch liest, wie der Urlaubsantrag funktioniert, bevor er dir antwortet.',
    priority: 2
  },
  {
    id: 'ai-act',
    term: 'AI Act',
    definition: 'Ein neues Gesetz der Europäischen Union, das Regeln für den sicheren Einsatz von KI festlegt.',
    example: 'Ein Gesetz, das verbietet, KI für gefährliche Überwachung einzusetzen.',
    priority: 2
  },
  // Priority 3
  {
    id: 'embedding',
    term: 'Bedeutung als Zahlen-Code',
    definition: 'Eine Methode, mit der ein Computer Wörter oder Texte so umwandelt, dass er ihre Bedeutung vergleichen kann.',
    example: 'Der Computer kann erkennen, dass "Hund" und "Welpe" eine ähnliche Bedeutung haben.',
    priority: 3
  },
  {
    id: 'reranking',
    term: 'Suchergebnisse neu sortieren',
    definition: 'Ein zweiter Prüfschritt, bei dem gefundene Antworten oder Quellen noch einmal nach ihrer Wichtigkeit sortiert werden.',
    example: 'Von 10 gefundenen Antworten werden die 3 ausgewählt, die wirklich am besten zur Frage passen.',
    priority: 3
  }
];
