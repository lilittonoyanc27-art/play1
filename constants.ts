
export interface PorParaQuestion {
  sentence: string; // "Estudio ____ aprender."
  answer: "por" | "para";
  explanation: string;
}

export interface SentenceOrderQuestion {
  armenian: string;
  correctWords: string[]; // ["Yo", "estudio", "español"]
  shuffledWords: string[];
}

export interface NegationQuestion {
  sentence: string; // "Yo tengo un libro."
  negative: string; // "Yo no tengo un libro."
  explanation: string;
}

export interface TimeQuestion {
  timeStr: string; // "08:15"
  options: string[]; // ["Son las ocho y cuarto", ...]
  correct: string;
}

export const POR_PARA_DATA: PorParaQuestion[] = [
  { sentence: "Gracias ____ la ayuda.", answer: "por", explanation: "Gratitude" },
  { sentence: "Estudio ____ aprender.", answer: "para", explanation: "Purpose/Goal" },
  { sentence: "Este regalo es ____ ti.", answer: "para", explanation: "Recipient" },
  { sentence: "Camino ____ el parque.", answer: "por", explanation: "Movement through" },
  { sentence: "Trabajo ____ Apple.", answer: "para", explanation: "Employment" },
  { sentence: "Lo compré ____ 10 euros.", answer: "por", explanation: "Exchange/Price" },
  { sentence: "Tengo que terminar ____ el lunes.", answer: "para", explanation: "Deadline" },
  { sentence: "Hablo ____ teléfono.", answer: "por", explanation: "Means/Communication" },
  { sentence: "Fuimos a España ____ avión.", answer: "por", explanation: "Means of transport" },
  { sentence: "Leo ____ mi abuela.", answer: "para", explanation: "For someone's benefit" },
  { sentence: "____ mí, esto es difícil.", answer: "para", explanation: "Opinion" },
  { sentence: "Lo hizo ____ miedo.", answer: "por", explanation: "Cause/Reason" },
  { sentence: "Voy ____ Madrid.", answer: "para", explanation: "Destination" },
  { sentence: "Duermo ____ ocho horas.", answer: "por", explanation: "Duration" },
  { sentence: "Te cambio mi libro ____ el tuyo.", answer: "por", explanation: "Exchange" }
];

export const SENTENCE_ORDER_DATA: SentenceOrderQuestion[] = [
  { armenian: "Ես սովորում եմ իսպաներեն:", correctWords: ["Yo", "estudio", "español"], shuffledWords: ["español", "Yo", "estudio"] },
  { armenian: "Նա խմում է ջուր:", correctWords: ["Él", "bebe", "agua"], shuffledWords: ["agua", "bebe", "Él"] },
  { armenian: "Մենք ապրում ենք այստեղ:", correctWords: ["Nosotros", "vivimos", "aquí"], shuffledWords: ["aquí", "vivimos", "Nosotros"] },
  { armenian: "Դուք ունեք մեծ տուն:", correctWords: ["Ustedes", "tienen", "una", "casa", "grande"], shuffledWords: ["casa", "tienen", "grande", "una", "Ustedes"] },
  { armenian: "Ինձ դուր է գալիս երաժշտությունը:", correctWords: ["Me", "gusta", "la", "música"], shuffledWords: ["la", "gusta", "Me", "música"] },
  { armenian: "Նրանք ուտում են խնձոր:", correctWords: ["Ellos", "comen", "manzanas"], shuffledWords: ["comen", "Ellos", "manzanas"] },
  { armenian: "Ես չեմ հասկանում:", correctWords: ["Yo", "no", "comprendo"], shuffledWords: ["comprendo", "Yo", "no"] },
  { armenian: "Այսօր շատ շոգ է:", correctWords: ["Hoy", "hace", "mucho", "calor"], shuffledWords: ["calor", "mucho", "Hoy", "hace"] },
  { armenian: "Որտե՞ղ է կայարանը:", correctWords: ["¿Donde", "está", "la", "estación?"], shuffledWords: ["estación?", "la", "¿Donde", "está"] },
  { armenian: "Իմ անունը Մարիա է:", correctWords: ["Mi", "nombre", "es", "María"], shuffledWords: ["es", "Mi", "nombre", "María"] }
];

export const NEGATION_DATA: NegationQuestion[] = [
  { sentence: "Tengo un perro.", negative: "No tengo un perro.", explanation: "In Spanish, place 'no' before the verb." },
  { sentence: "Él habla inglés.", negative: "Él no habla inglés.", explanation: "The negative particle 'no' always goes before the conjugated verb." },
  { sentence: "Comemos carne.", negative: "No comemos carne.", explanation: "Simply add 'no' at the beginning if there's no subject, or after the subject." },
  { sentence: "Ellos van a la playa.", negative: "Ellos no van a la playa.", explanation: "Negative: Subject + no + Verb + complement." },
  { sentence: "Te amo.", negative: "No te amo.", explanation: "If there are pronouns (me, te, lo...), 'no' goes before them too." },
  { sentence: "Lo sé.", negative: "No lo sé.", explanation: "No + pronoun + verb." },
  { sentence: "Hay alguien.", negative: "No hay nadie.", explanation: "'Alguien' (someone) becomes 'nadie' (no one) in negative sentences." },
  { sentence: "Tengo algo.", negative: "No tengo nada.", explanation: "'Algo' (something) becomes 'nada' (nothing)." },
  { sentence: "Voy siempre.", negative: "No voy nunca.", explanation: "'Siempre' (always) changes to 'nunca' (never)." },
  { sentence: "También voy.", negative: "Tampoco voy.", explanation: "'También' (also) changes to 'tampoco' (neither/either)." }
];

export const TIME_DATA: TimeQuestion[] = [
  { timeStr: "08:00", options: ["Son las ocho", "Es la ocho", "Son las ocho y media"], correct: "Son las ocho" },
  { timeStr: "01:00", options: ["Es la una", "Son las una", "Son la una"], correct: "Es la una" },
  { timeStr: "10:15", options: ["Son las diez y cuarto", "Son las diez menos cuarto", "Son las diez y quince"], correct: "Son las diez y cuarto" },
  { timeStr: "05:30", options: ["Son las cinco y media", "Son las cinco y treinta", "Es las cinco y media"], correct: "Son las cinco y media" },
  { timeStr: "12:45", options: ["Es la una menos cuarto", "Son las doce y cuarenta y cinco", "Son las doce menos cuarto"], correct: "Es la una menos cuarto" },
  { timeStr: "07:10", options: ["Son las siete y diez", "Son las siete menos diez", "Es las siete y diez"], correct: "Son las siete y diez" },
  { timeStr: "03:40", options: ["Son las cuatro menos veinte", "Son las tres y cuarenta", "Son las tres menos veinte"], correct: "Son las cuatro menos veinte" },
  { timeStr: "09:05", options: ["Son las nueve y cinco", "Es las nueve y cinco", "Son las nueve menos cinco"], correct: "Son las nueve y cinco" },
  { timeStr: "02:50", options: ["Son las tres menos diez", "Son las dos y cincuenta", "Es las tres menos diez"], correct: "Son las tres menos diez" },
  { timeStr: "04:20", options: ["Son las cuatro y veinte", "Son las cuatro menos veinte", "Es las cuatro y veinte"], correct: "Son las cuatro y veinte" },
  { timeStr: "11:55", options: ["Son las doce menos cinco", "Son las once y cincuenta y cinco", "Es las doce menos cinco"], correct: "Son las doce menos cinco" },
  { timeStr: "06:15", options: ["Son las seis y cuarto", "Son las seis y quince", "Son las seis y media"], correct: "Son las seis y cuarto" },
  { timeStr: "01:30", options: ["Es la una y media", "Son las una y media", "Es la una y treinta"], correct: "Es la una y media" },
  { timeStr: "10:45", options: ["Son las once menos cuarto", "Son las diez y cuarenta y cinco", "Son las diez menos cuarto"], correct: "Son las once menos cuarto" },
  { timeStr: "08:20", options: ["Son las ocho y veinte", "Es las ocho y veinte", "Son las ocho menos veinte"], correct: "Son las ocho y veinte" }
];
