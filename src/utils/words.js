export const WORDS = [
  'REACT', 'WORLD', 'SMART', 'BRAIN', 'THINK', 'GHOST', 'POWER', 'SOUND', 'LIGHT', 'SPACE',
  'PLANT', 'DREAM', 'FLAME', 'NIGHT', 'CLOCK', 'STONE', 'WATER', 'EARTH', 'RIVER', 'MOUNT',
  'CLOUD', 'STORM', 'SHARP', 'BLADE', 'HEART', 'STEEL', 'BRICK', 'GLASS', 'PAPER', 'MUSIC',
  'DANCE', 'STAGE', 'VOICE', 'WORDS', 'BOOKS', 'IMAGE', 'VIDEO', 'PHONE', 'TABLE', 'CHAIR',
  'FLOOR', 'HOUSE', 'CANDY', 'FRUIT', 'BREAD', 'COFEE', 'DRINK', 'SMILE', 'LAUGH', 'HAPPY',
  'CLEAN', 'FRESH', 'WHITE', 'BLACK', 'GREEN', 'BROWN', 'SMALL', 'LARGE', 'SHORT', 'CLEAR',
  'QUIET', 'LUCKY', 'MAGIC', 'CRAZY', 'SUPER', 'READY', 'START', 'FINISH', 'BLOCK', 'TRACK',
];

export const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
};

export const isValidWord = (word) => {
  return word.length === 5 && WORDS.includes(word.toUpperCase());
};
