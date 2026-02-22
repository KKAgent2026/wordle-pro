import { useState, useEffect, useCallback } from 'react';
import { getRandomWord, WORDS } from '../utils/words';

export const useGameState = () => {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState([]); // Array of strings
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // Load game state from LocalStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('wordle-pro-state');
    if (savedState) {
      const { solution: savedSolution, guesses: savedGuesses, isGameOver: savedGameOver, isWon: savedWon } = JSON.parse(savedState);
      setSolution(savedSolution);
      setGuesses(savedGuesses);
      setIsGameOver(savedGameOver);
      setIsWon(savedWon);
    } else {
      setSolution(getRandomWord());
    }
  }, []);

  // Save game state to LocalStorage whenever it changes
  useEffect(() => {
    if (solution) {
      const stateToSave = { solution, guesses, isGameOver, isWon };
      localStorage.setItem('wordle-pro-state', JSON.stringify(stateToSave));
    }
  }, [solution, guesses, isGameOver, isWon]);

  const onKeyPress = useCallback((key) => {
    if (isGameOver) return;

    if (key === 'Enter' || key === 'ENTER') {
      if (currentGuess.length !== 5) return;
      
      const upperGuess = currentGuess.toUpperCase();
      const newGuesses = [...guesses, upperGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (upperGuess === solution) {
        setIsWon(true);
        setIsGameOver(true);
        updateStats(true, newGuesses.length);
      } else if (newGuesses.length >= 6) {
        setIsGameOver(true);
        updateStats(false);
      }
    } else if (key === 'Backspace' || key === 'BACKSPACE' || key === 'DEL') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => (prev + key).toUpperCase());
    }
  }, [currentGuess, guesses, isGameOver, solution]);

  const updateStats = (won, guessCount) => {
    const stats = JSON.parse(localStorage.getItem('wordle-pro-stats')) || {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
    };

    stats.gamesPlayed += 1;
    if (won) {
      stats.gamesWon += 1;
      stats.currentStreak += 1;
      stats.maxStreak = Math.max(stats.currentStreak, stats.maxStreak);
      stats.guessDistribution[guessCount] += 1;
    } else {
      stats.currentStreak = 0;
    }

    localStorage.setItem('wordle-pro-stats', JSON.stringify(stats));
  };

  const resetGame = () => {
    setSolution(getRandomWord());
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
    setIsWon(false);
    localStorage.removeItem('wordle-pro-state');
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
    resetGame,
  };
};
