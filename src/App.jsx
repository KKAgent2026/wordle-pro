import React, { useEffect } from 'react';
import Grid from './components/game/Grid';
import Keyboard from './components/game/Keyboard';
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
  } = useGameState();

  useEffect(() => {
    const handleKeyDown = (e) => {
      onKeyPress(e.key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <header className="w-full border-b border-slate-800 py-4 mb-4">
        <h1 className="text-4xl font-black text-white text-center tracking-tighter">
          WORDLE <span className="text-correct">PRO</span>
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center w-full max-w-lg">
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          solution={solution}
          getLetterStatus={getLetterStatus}
        />

        {isGameOver && (
          <div className="mb-8 animate-bounce">
            <p className="text-2xl font-bold text-white">
              {isWon ? '🎉 Brilliant!' : `Game Over! Word: ${solution}`}
            </p>
          </div>
        )}

        <Keyboard onKeyPress={onKeyPress} statusMap={getKeyboardStatus()} />
      </main>
    </div>
  );
}

export default App;
