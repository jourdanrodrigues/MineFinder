import { cn, getMouseButtonClicked, useIsTouchOnly } from '@/utils';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import {
  flag,
  reveal,
  selectCellState,
  selectIsGameWon,
} from '@/redux/boardSlice.ts';

export function Cell({ row, column }: { row: number; column: number }) {
  const cellId = `${row}-${column}`;
  const { isFlagged, isBomb, isRevealed, neighborBombs } = useAppSelector(
    (state) => selectCellState(state, cellId),
  );
  const isGameWon = useAppSelector(selectIsGameWon);
  const revealedBomb = useAppSelector((state) => state.board.revealedBomb);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const isTouchOnly = useIsTouchOnly();
  const dispatch = useAppDispatch();

  const isGameOver = isGameWon || revealedBomb;
  const shouldReveal = isRevealed || isGameOver;

  const contentClassName =
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-[opacity] transition-opacity';
  return (
    <div
      className={cn(
        'flex justify-center items-center transition-all bg-primary-canvas dark:bg-primary-canvas-dark size-full border-contrast border-[1px] dark:border-contrast-dark',
        isRevealed || isGameOver ? 'cursor-default' : 'cursor-pointer',
        {
          'hover:bg-gray-200 dark:hover:bg-neutral-600':
            !isTouchOnly && !isGameOver && !isRevealed,
          'bg-rose-300 dark:bg-[#B14C21]': revealedBomb && isBomb,
          'bg-green-200 dark:bg-[#0b3e3c]': shouldReveal && !isBomb,
        },
      )}
      onContextMenu={(e) => e.preventDefault()}
      onTouchStart={startTouching}
      onTouchMove={cancelTimeout}
      onTouchEnd={stopTouching}
      onMouseDown={handleClick}
    >
      <div className='relative'>
        <span
          className={cn(
            isBomb && shouldReveal ? 'opacity-100' : 'opacity-0',
            contentClassName,
          )}
        >
          {cellId === revealedBomb ? '💥' : '💣'}
        </span>
        <span
          className={cn(
            isFlagged && !isGameOver ? 'opacity-100' : 'opacity-0',
            contentClassName,
          )}
        >
          ⛳️
        </span>
        <span
          className={cn(
            'text-center text-xl dark:text-contrast-dark leading-[100%]',
            !isFlagged && !isBomb && shouldReveal ? 'opacity-100' : 'opacity-0',
            contentClassName,
          )}
        >
          {neighborBombs > 0 ? neighborBombs : ''}
        </span>
      </div>
    </div>
  );

  function handleClick(e: React.MouseEvent) {
    const button = getMouseButtonClicked(e);
    if (button !== 'left' && button !== 'right') return;

    e.stopPropagation();
    if (button === 'left') {
      dispatch(reveal(cellId));
    } else if (button === 'right') {
      dispatch(flag(cellId));
    }
  }

  function startTouching(e: React.TouchEvent) {
    e.preventDefault();
    const timeoutId = setTimeout(() => {
      dispatch(flag(cellId));
      setTimeoutId(null);
    }, 140);

    setTimeoutId(timeoutId);
  }

  function stopTouching(e: React.TouchEvent) {
    e.preventDefault();
    if (!timeoutId) return;
    dispatch(reveal(cellId));
    cancelTimeout();
  }

  function cancelTimeout() {
    if (!timeoutId) return;
    clearTimeout(timeoutId);
    setTimeoutId(null);
  }
}
