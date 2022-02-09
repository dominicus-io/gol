import { useState, useRef, useCallback, useEffect } from "react";

import { Grid, nextPerm } from "../../GameOfLife";

export function useGameOfLife(initialState: Grid, ms: number = 1000) {
  const [grid, setGrid] = useState(initialState);
  const [isPlaying, setIsPlaying] = useState(false);
  const refIdInterval = useRef<number>();
  const next = useCallback(() => {
    setGrid((currentState) => {
      return { ...currentState, alive: nextPerm(currentState) };
    });
  }, []);
  const start = useCallback(() => {
    refIdInterval.current && clearInterval(refIdInterval.current);
    refIdInterval.current = window.setInterval(next, ms);
    setIsPlaying(true);
  }, [ms, next]);
  const stop = useCallback(() => {
    clearInterval(refIdInterval.current);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    setGrid(initialState);
  }, [initialState]);

  return {
    grid,
    start,
    stop,
    next,
    isPlaying,
  };
}
