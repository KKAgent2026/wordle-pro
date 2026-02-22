import React, { useState, useEffect } from 'react';
import Grid from './components/game/Grid';
import Keyboard from './components/game/Keyboard';
import StatsModal from './components/game/StatsModal';
import { useGameState } from './hooks/useGameState';

function App() {
  const {
    solution,
    guesses,
    currentGuess,
    onKeyPress,
    getLetterStatus,
    getKeyboardStatus,
    isGameOver,
    isWon,
    resetGame,
  } = useGameState();

  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (isGameOver) {
      const timer = setTimeout(() => setShowStats(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isGameOver]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      onKeyPress(e.key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress]);

  const getStats = () => {
    return JSON.parse(localStorage.getItem('wordle-pro-stats')) || {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
    };
  };

  const handleNewGame = () => {
    resetGame();
    setShowStats(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <header className="w-full border-b border-slate-800 py-4 mb-4 flex justify-between items-center px-4 max-w-lg">
        <div className="w-10"></div>
        <h1 className="text-4xl font-black text-white text-center tracking-tighter">
          WORDLE <span className="text-correct">PRO</span>
        </h1>
        <button 
          onClick={() => setShowStats(true)}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center w-full max-w-lg px-2">
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          solution={solution}
          getLetterStatus={getLetterStatus}
        />

        <Keyboard onKeyPress={onKeyPress} statusMap={getKeyboardStatus()} />
        
        <StatsModal 
          isOpen={showStats} 
          onClose={() => setShowStats(false)} 
          stats={getStats()}
          solution={solution}
          isWon={isWon}
          onReset={handleNewGame}
        />
      </main>
    </div>
  );
}

export default App;
