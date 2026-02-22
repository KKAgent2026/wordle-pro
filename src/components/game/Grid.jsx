import React from 'react';
import Row from './Row';

const Grid = ({ guesses, currentGuess, solution, getLetterStatus }) => {
  const empties = 6 - guesses.length - 1;

  return (
    <div className="flex flex-col items-center my-8">
      {guesses.map((guess, i) => (
        <Row key={i} guess={guess} solution={solution} getLetterStatus={getLetterStatus} />
      ))}
      
      {guesses.length < 6 && (
        <Row isCurrent guess={currentGuess} solution={solution} />
      )}

      {empties > 0 && Array(empties).fill('').map((_, i) => (
        <Row key={i} guess="" solution={solution} />
      ))}
    </div>
  );
};

export default Grid;
