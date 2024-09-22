import { cn, getMouseButtonClicked } from '@/utils';
import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { boardSlice, selectCellState } from '@/redux/boardSlice.ts';

export function Cell({ row, column }: { row: number; column: number }) {
  const cellId = `${row}-${column}`;
  const { isFlagged, isBomb, isRevealed, neighborBombs } = useAppSelector(
    (state) => selectCellState(state, cellId),
  );
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const isTouchOnlyDevice = useMemo(
    () => window.matchMedia('(hover: none)').matches,
    [],
  );
  const dispatch = useAppDispatch();

  const contentClassName =
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-[opacity] transition-opacity';
  return (
    <div
      className={cn(
        'flex relative justify-center items-center transition-all bg-primary-canvas dark:bg-primary-canvas-dark size-full border-contrast border-[1px] dark:border-contrast-dark',
        !isRevealed ? 'cursor-pointer' : 'cursor-default',
        {
          'hover:bg-gray-200 dark:hover:bg-neutral-600':
            !isRevealed && !isFlagged && !isTouchOnlyDevice,
          'bg-rose-300 dark:bg-[#B14C21]': isRevealed && isBomb,
          'bg-green-200 dark:bg-[#0b3e3c]': isRevealed && !isBomb,
        },
      )}
      onContextMenu={(e) => e.preventDefault()}
      onTouchStart={startTouching}
      onTouchMove={cancelTimeout}
      onTouchEnd={stopTouching}
      onMouseDown={handleClick}
    >
      <span
        className={cn(
          !isFlagged && isBomb && isRevealed ? 'opacity-100' : 'opacity-0',
          contentClassName,
        )}
      >
        💣
      </span>
      <span
        className={cn(
          isFlagged ? 'opacity-100' : 'opacity-0',
          contentClassName,
        )}
      >
        🚩
      </span>
      <span
        className={cn(
          'text-center text-xl dark:text-contrast-dark leading-[100%]',
          !isFlagged && !isBomb && isRevealed ? 'opacity-100' : 'opacity-0',
          contentClassName,
        )}
      >
        {neighborBombs > 0 ? neighborBombs : ''}
      </span>
    </div>
  );

  function handleClick(e: React.MouseEvent) {
    const button = getMouseButtonClicked(e);
    if (button !== 'left' && button !== 'right') return;

    e.stopPropagation();
    if (button === 'left') {
      onReveal();
    } else if (button === 'right') {
      onFlag();
    }
  }

  function startTouching(e: React.TouchEvent) {
    e.preventDefault();
    const timeoutId = setTimeout(() => {
      onFlag();
      setTimeoutId(null);
    }, 140);

    setTimeoutId(timeoutId);
  }

  function stopTouching(e: React.TouchEvent) {
    e.preventDefault();
    if (!timeoutId) return;
    onReveal();
    cancelTimeout();
  }

  function cancelTimeout() {
    if (!timeoutId) return;
    clearTimeout(timeoutId);
    setTimeoutId(null);
  }

  function onFlag() {
    dispatch(boardSlice.actions.mark({ x: row, y: column }));
  }

  function onReveal() {
    if (isFlagged) return;
    if (isBomb) {
      dispatch(boardSlice.actions.finishGame());
    } else {
      dispatch(boardSlice.actions.reveal({ x: row, y: column }));
    }
  }
}
