import { useState, useEffect, useCallback, useRef } from 'react';
import { useHanoi } from './hooks/useHanoi';
import Peg from './components/Peg';
import Controls from './components/Controls';
import BackgroundElements from './components/BackgroundElements';

export default function App() {
  const { pegs, moveDisk, moves, resetGame, solve, isSolving, diskCount, history, minMoves } = useHanoi(4);
  const [selectedPeg, setSelectedPeg] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [draggedFromPeg, setDraggedFromPeg] = useState(null);
  const isMovingRef = useRef(false);

  useEffect(() => {
    if (pegs['C'].length === diskCount && diskCount > 0) {
      setIsSolved(true);
      isMovingRef.current = false;
      setDraggedFromPeg(null);
    } else {
      setIsSolved(false);
    }
  }, [pegs, diskCount]);

  const handleDragStart = useCallback((pegId) => {
    if (isMovingRef.current) return;
    setDraggedFromPeg(pegId);
  }, []);

  const handleDrop = useCallback((e, targetPegId) => {
    e.preventDefault();
    if (isMovingRef.current || !draggedFromPeg || draggedFromPeg === targetPegId) {
      setDraggedFromPeg(null);
      return;
    }

    isMovingRef.current = true;
    const moveSuccessful = moveDisk(draggedFromPeg, targetPegId);
    
    setTimeout(() => {
      setDraggedFromPeg(null);
      isMovingRef.current = false;
    }, moveSuccessful ? 200 : 100);
  }, [draggedFromPeg, moveDisk]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault(); // Allow drop
  }, []);

  const [logOpen, setLogOpen] = useState(false);
  const openLog = useCallback(() => setLogOpen(true), []);
  const closeLog = useCallback(() => setLogOpen(false), []);

  const handlePegClick = useCallback((id) => {
    if (isMovingRef.current) return;
    if (selectedPeg === null) {
      if (pegs[id].length > 0) {
        setSelectedPeg(id);
      }
    } else if (selectedPeg !== id) {
      isMovingRef.current = true;
      const moveSuccessful = moveDisk(selectedPeg, id);
      
      setTimeout(() => {
        setSelectedPeg(null);
        isMovingRef.current = false;
      }, moveSuccessful ? 200 : 100);
    } else {
      setSelectedPeg(null);
    }
  }, [selectedPeg, pegs, moveDisk]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans relative overflow-hidden">
      <BackgroundElements />

      {/* Enhanced background with more creative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-cyan-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-purple-400/30 rotate-45 animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 border-2 border-slate-400/30 rounded-full animate-spin-slow"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Sidebar with Game Description */}
        <div className="lg:w-1/4 p-6 lg:p-8 flex flex-col justify-center items-center lg:items-start">
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
            <h2 className="text-lg sm:text-xl font-bold text-cyan-400 mb-4 text-center lg:text-left">🎯 Game Rules</h2>
            <div className="text-sm text-slate-300 space-y-3">
              <p className="leading-relaxed">
                <span className="text-cyan-400 font-semibold">Objective:</span> Move all disks over to Tower 3 (drag and drop).
              </p>
              <p className="leading-relaxed">
                <span className="text-purple-400 font-semibold">Rule:</span> You cannot place a larger disk onto a smaller disk.
              </p>
              <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                <p className="text-xs text-slate-400">
                  💡 <strong>Pro Tip:</strong> Use Tower 2 as auxiliary space to solve efficiently!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent italic text-center animate-pulse">
            TOWER OF HANOI
          </h1>

          <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative h-48 sm:h-56 md:h-64 lg:h-72 mb-8">
            {['A', 'B', 'C'].map(id => (
              <div key={id} className="flex flex-col items-center">
                <div className="w-2 sm:w-3 h-12 sm:h-16 md:h-20 bg-gradient-to-b from-cyan-400 to-slate-700 rounded-t-full mb-2 sm:mb-3 md:mb-4 shadow-[0_0_10px_rgba(34,211,238,0.3)]"></div>
                <Peg
                  id={id}
                  disks={pegs[id]}
                  isSelected={selectedPeg === id}
                  isMoving={isMovingRef.current}
                  onClick={() => handlePegClick(id)}
                  onDrop={(e) => handleDrop(e, id)}
                  onDragOver={handleDragOver}
                  onDiskDragStart={handleDragStart}
                />
              </div>
            ))}
          </div>

          <Controls moves={moves} onReset={() => { resetGame(); setSelectedPeg(null); isMovingRef.current = false; setDraggedFromPeg(null); }} diskCount={diskCount} onDiskCountChange={(count) => { resetGame(count); setSelectedPeg(null); isMovingRef.current = false; setDraggedFromPeg(null); }} onSolve={() => solve()} isSolving={isSolving} onOpenLog={openLog} />

          {isSolved && (
            <div className="mt-4 sm:mt-6 md:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-green-400 animate-bounce text-center px-4">
              🎉 SOLVED! 🎉
            </div>
          )}

          <div className="w-full max-w-4xl mx-auto mt-4 px-4">
            <div className="text-right text-slate-300">Minimum Moves: <span className="font-bold text-slate-100">{minMoves}</span></div>
          </div>

          <p className="mt-4 sm:mt-6 md:mt-8 text-slate-500 text-xs sm:text-sm text-center px-4">Click a peg to select top disk, then click target peg.</p>
        </div>
      </div>

      {logOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 text-white rounded-lg p-6 w-full max-w-2xl border border-slate-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Move Log</h3>
              <button onClick={closeLog} className="px-3 py-1 bg-slate-700 rounded">Close</button>
            </div>
            <div className="max-h-96 overflow-auto text-sm">
              {history.length === 0 ? (
                <p className="text-slate-400">No moves yet.</p>
              ) : (
                <ol className="list-decimal list-inside space-y-1">
                  {history.map((h, i) => (
                    <li key={i} className="text-slate-200">{i + 1}. {h.from} → {h.to} (disk {h.disk})</li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}