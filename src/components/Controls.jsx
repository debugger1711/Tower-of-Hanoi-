export default function Controls({ moves, onReset, diskCount, onDiskCountChange, onSolve, isSolving, onOpenLog }) {
  return (
    <div className="mt-8 sm:mt-10 md:mt-12 w-full max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between p-4 bg-slate-800/60 rounded-2xl border border-slate-700 shadow-[0_6px_24px_rgba(2,6,23,0.6)]">
        <div className="flex items-center gap-3">
          <span className="text-slate-300 text-sm">Disks:</span>
          <div className="flex items-center gap-2">
            <button onClick={() => onDiskCountChange(Math.max(3, diskCount - 1))} className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center">▾</button>
            <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center font-bold">{diskCount}</div>
            <button onClick={() => onDiskCountChange(Math.min(8, diskCount + 1))} className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center">▴</button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-slate-400 text-xs uppercase tracking-tighter">Moves</p>
            <p className="text-lg sm:text-2xl font-mono text-cyan-400 font-bold">{moves}</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onReset} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">Restart</button>
            <button onClick={onOpenLog} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">Log</button>
            <button onClick={onSolve} disabled={isSolving} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold disabled:opacity-50">{isSolving ? 'Solving...' : 'Solve!'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}