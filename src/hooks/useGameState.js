import { useState, useEffect, useCallback } from 'react';
import { getRandomWord, WORDS } from '../utils/words';

export const useGameState = () => {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState([]); // Array of strings
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    setSolution(getRandomWord());
  }, []);

  const onKeyPress = useCallback((key) => {
    if (isGameOver) return;

    if (key === 'Enter') {
      if (currentGuess.length !== 5) return;
      
      const newGuesses = [...guesses, currentGuess.toUpperCase()];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess.toUpperCase() === solution) {
        setIsWon(true);
        setIsGameOver(true);
      } else if (newGuesses.length >= 6) {
        setIsGameOver(true);
      }
    } else if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => (prev + key).toUpperCase());
    }
  }, [currentGuess, guesses, isGameOver, solution]);

  const getLetterStatus = (guess, index) => {
    const char = guess[index];
    if (solution[index] === char) return 'correct';
    if (solution.includes(char)) return 'present';
    return 'absent';
  };

  const getKeyboardStatus = () => {
    const statusMap = {};
    guesses.forEach((guess) => {
      guess.split('').forEach((char, index) => {
        const status = getLetterStatus(guess, index);
        if (status === 'correct') {
          statusMap[char] = 'correct';
        } else if (status === 'present' && statusMap[char] !== 'correct') {
          statusMap[char] = 'present';
        } else if (status === 'absent' && !statusMap[char]) {
          statusMap[char] = 'absent';
        }
      });
    });
    return statusMap;
  };

  return {
    solution,
    guesses,
    currentGuess,
    onKeyPress,
    getLetterStatus,
    getKeyboardStatus,
    isGameOver,
    isWon,
  };
};
