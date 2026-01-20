import { useState, useCallback } from 'react';

export const useHanoi = (initialCount = 3) => {
  const [diskCount, setDiskCount] = useState(initialCount);
  const [pegs, setPegs] = useState({
    A: Array.from({ length: initialCount }, (_, i) => initialCount - i),
    B: [],
    C: [],
  });
  const [moves, setMoves] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [history, setHistory] = useState([]);

  const moveDisk = useCallback((from, to) => {
    const source = [...pegs[from]];
    const target = [...pegs[to]];
    const disk = source[source.length - 1];

    if (!disk) return false;
    if (target.length > 0 && disk > target[target.length - 1]) return false;

    target.push(source.pop());
    setPegs(prev => ({ ...prev, [from]: source, [to]: target }));
    setMoves(m => m + 1);
    setHistory(h => [...h, { from, to, disk }]);
    return true;
  }, [pegs]);

  const resetGame = useCallback((count = diskCount) => {
    setDiskCount(count);
    setPegs({
      A: Array.from({ length: count }, (_, i) => count - i),
      B: [],
      C: [],
    });
    setMoves(0);
    setIsSolving(false);
    setHistory([]);
  }, [diskCount]);

  const solve = useCallback(async () => {
    if (isSolving) return;
    setIsSolving(true);
    const steps = [];

    const computeSteps = (n, source, target, aux) => {
      if (n === 1) {
        steps.push({ from: source, to: target });
        return;
      }
      computeSteps(n - 1, source, aux, target);
      steps.push({ from: source, to: target });
      computeSteps(n - 1, aux, target, source);
    };

    computeSteps(diskCount, 'A', 'C', 'B');

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      await new Promise(resolve => setTimeout(resolve, 700));
      moveDisk(step.from, step.to);
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    setIsSolving(false);
  }, [diskCount, isSolving, moveDisk]);

  const minMoves = Math.pow(2, diskCount) - 1;

  return { pegs, moveDisk, moves, resetGame, solve, isSolving, diskCount, setDiskCount, history, minMoves };
};