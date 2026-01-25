import { useState, useCallback, useRef } from 'react';

export const useHanoi = (initialCount = 3) => {
  const [diskCount, setDiskCount] = useState(initialCount);
  const [gameState, setGameState] = useState({
    pegs: {
      A: Array.from({ length: initialCount }, (_, i) => initialCount - i),
      B: [],
      C: [],
    },
    moves: 0,
    history: [],
  });
  const [isSolving, setIsSolving] = useState(false);
  
  // Use a ref to track solving state to prevent race conditions during the async loop
  const solvingRef = useRef(false);

  const moveDisk = useCallback((from, to) => {
    let success = false;
    setGameState((prev) => {
      const source = prev.pegs[from];
      const target = prev.pegs[to];
      
      if (!source || source.length === 0) return prev;
      
      const disk = source[source.length - 1];
      if (target.length > 0 && disk > target[target.length - 1]) {
        return prev;
      }

      success = true;
      return {
        pegs: {
          ...prev.pegs,
          [from]: source.slice(0, -1),
          [to]: [...target, disk],
        },
        moves: prev.moves + 1,
        history: [...prev.history, { from, to, disk }],
      };
    });
    return success;
  }, []);

  const resetGame = useCallback((count = diskCount) => {
    solvingRef.current = false;
    setDiskCount(count);
    setGameState({
      pegs: {
        A: Array.from({ length: count }, (_, i) => count - i),
        B: [],
        C: [],
      },
      moves: 0,
      history: [],
    });
    setIsSolving(false);
  }, [diskCount]);

  const solve = useCallback(async () => {
    if (isSolving || solvingRef.current) return;
    
    // Reset to start position for a clean auto-solve
    resetGame(diskCount);
    
    setIsSolving(true);
    solvingRef.current = true;
    
    const steps = [];
    const computeSteps = (n, src, tgt, aux) => {
      if (n === 0) return;
      computeSteps(n - 1, src, aux, tgt);
      steps.push({ from: src, to: tgt });
      computeSteps(n - 1, aux, tgt, src);
    };

    computeSteps(diskCount, 'A', 'C', 'B');

    for (const step of steps) {
      if (!solvingRef.current) break; // Allow stopping if reset is clicked
      await new Promise(resolve => setTimeout(resolve, 600));
      moveDisk(step.from, step.to);
    }

    setIsSolving(false);
    solvingRef.current = false;
  }, [diskCount, isSolving, moveDisk, resetGame]);

  const minMoves = Math.pow(2, diskCount) - 1;

  const { pegs, moves, history } = gameState;

  return { pegs, moveDisk, moves, resetGame, solve, isSolving, diskCount, history, minMoves };
};