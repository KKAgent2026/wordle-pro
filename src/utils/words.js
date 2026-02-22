export const WORDS = [
  'REACT',
  'WORLD',
  'SMART',
  'BRAIN',
  'THINK',
  'GHOST',
  'POWER',
  'SOUND',
  'LIGHT',
  'SPACE',
  'PLANT',
  'DREAM',
  'FLAME',
  'NIGHT',
  'CLOCK',
];

export const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
};

export const isValidWord = (word) => {
  // For now, any 5-letter word is fine if we want a loose game, 
  // but usually we check against a dictionary.
  // Given the requirement "validation against a basic word list",
  // I'll check if it's in our list or just 5 letters for simplicity if the list is small.
  return word.length === 5 && WORDS.includes(word.toUpperCase());
};
