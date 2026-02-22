import React from 'react';

const StatsModal = ({ isOpen, onClose, stats, solution, isWon, onReset }) => {
  if (!isOpen) return null;

  const winPercentage = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;
  const maxDistribution = Math.max(...Object.values(stats.guessDistribution), 1);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-white tracking-widest uppercase">Statistics</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-8 text-center">
          <div>
            <div className="text-3xl font-black text-white">{stats.gamesPlayed}</div>
            <div className="text-[10px] uppercase text-slate-400 font-bold tracking-tighter leading-none mt-1">Played</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">{winPercentage}</div>
            <div className="text-[10px] uppercase text-slate-400 font-bold tracking-tighter leading-none mt-1">Win %</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">{stats.currentStreak}</div>
            <div className="text-[10px] uppercase text-slate-400 font-bold tracking-tighter leading-none mt-1">Streak</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">{stats.maxStreak}</div>
            <div className="text-[10px] uppercase text-slate-400 font-bold tracking-tighter leading-none mt-1">Max</div>
          </div>
        </div>

        <h3 className="text-xs uppercase font-black text-slate-400 tracking-widest mb-4">Guess Distribution</h3>
        <div className="flex flex-col gap-2 mb-8">
          {Object.entries(stats.guessDistribution).map(([guess, count]) => (
            <div key={guess} className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 w-2">{guess}</span>
              <div className="flex-1 h-5 bg-slate-800 rounded-sm overflow-hidden">
                <div 
                  className={`h-full flex items-center justify-end px-2 text-[10px] font-bold text-white transition-all duration-1000 ${count > 0 ? 'bg-correct' : 'bg-slate-700'}`}
                  style={{ width: `${Math.max((count / maxDistribution) * 100, 5)}%` }}
                >
                  {count}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onReset}
            className="flex-1 bg-correct hover:brightness-110 text-white font-black py-3 rounded-lg uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-correct/20"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
