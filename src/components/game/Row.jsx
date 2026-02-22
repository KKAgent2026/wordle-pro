import React from 'react';
import Cell from './Cell';

const Row = ({ guess, solution, isCurrent, getLetterStatus }) => {
  const cells = Array(5).fill('');

  return (
    <div className="flex gap-1.5 mb-1.5 justify-center">
      {cells.map((_, i) => {
        let value = '';
        let status = '';

        if (isCurrent) {
          value = guess[i] || '';
        } else if (guess) {
          value = guess[i];
          status = getLetterStatus(guess, i);
        }

        return <Cell key={i} value={value} status={status} delay={i * 100} />;
      })}
    </div>
  );
};

export default Row;
