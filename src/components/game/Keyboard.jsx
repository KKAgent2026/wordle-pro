import React from 'react';

const Keyboard = ({ onKeyPress, statusMap }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
  ];

  const getStatusClass = (key) => {
    const status = statusMap[key];
    if (status === 'correct') return 'bg-correct text-white';
    if (status === 'present') return 'bg-present text-white';
    if (status === 'absent') return 'bg-absent text-white opacity-50';
    return 'bg-slate-700 text-white';
  };

  return (
    <div className="flex flex-col gap-2 items-center mt-auto pb-8 w-full max-w-2xl px-2">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-1.5 w-full justify-center keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`
                h-14 flex items-center justify-center font-bold rounded uppercase transition-all
                ${key === 'Enter' || key === 'Backspace' ? 'px-4 text-xs' : 'flex-1'}
                ${getStatusClass(key)}
                hover:brightness-110 active:scale-95
              `}
            >
              {key === 'Backspace' ? 'DEL' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
