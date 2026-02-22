import React from 'react';

const Cell = ({ value, status, delay = 0 }) => {
  const statusClasses = {
    correct: 'bg-correct border-correct text-white',
    present: 'bg-present border-present text-white',
    absent: 'bg-absent border-absent text-white',
    empty: 'border-slate-700 text-white',
    active: 'border-slate-500 text-white scale-105',
  };

  const currentStatus = status || (value ? 'active' : 'empty');

  return (
    <div
      className={`
        w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded-sm
        transition-all duration-500 transform
        ${statusClasses[currentStatus]}
        ${status ? 'animate-flip' : value ? 'animate-bounce-short' : ''}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {value}
    </div>
  );
};

export default Cell;
