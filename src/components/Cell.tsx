import { cn, getMouseButtonClicked } from '@/utils';
import React, { useMemo, useState } from 'react';
import { BombFlag } from '@/components/BombFlag.tsx';

export function Cell({
  isBomb,
  isRevealed,
  isFlagged,
  bombsCount,
  onReveal,
  onFlag,
}: {
  isRevealed: boolean;
  isFlagged: boolean;
  isBomb: boolean;
  bombsCount: number;
  onReveal: () => void;
  onFlag: () => void;
}) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const isTouchOnlyDevice = useMemo(
    () => window.matchMedia('(hover: none)').matches,
    [],
  );

  const absoluteCenterClassName =
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-[opacity]';
  return (
    <div
      className={cn(
        'flex relative justify-center items-center transition-all bg-primary-canvas dark:bg-primary-canvas-dark size-full',
        !isRevealed ? 'cursor-pointer' : 'cursor-default',
        {
          'hover:bg-gray-200 dark:hover:bg-neutral-600':
            !isRevealed && !isFlagged && !isTouchOnlyDevice,
          'bg-rose-300 dark:bg-[#B14C21]': isRevealed && isBomb,
          'bg-green-200 dark:bg-[#0b3e3c]': isRevealed && !isBomb,
          'bg-yellow-100 dark:bg-yellow-800': isFlagged,
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
          'block size-[80%] rounded-[50%] border-2 border-contrast dark:border-[#732200] transition-all will-change-[border-color]',
          !isFlagged && isBomb && isRevealed ? 'opacity-100' : 'opacity-0',
          absoluteCenterClassName,
        )}
      />
      <BombFlag
        className={cn(
          'transition-opacity size-5',
          isFlagged ? 'opacity-100' : 'opacity-0',
          absoluteCenterClassName,
        )}
      />
      <span
        className={cn(
          'block transition-opacity text-center text-xl dark:text-contrast-dark leading-[100%]',
          !isFlagged && !isBomb && isRevealed ? 'opacity-100' : 'opacity-0',
          absoluteCenterClassName,
        )}
      >
        {bombsCount > 0 ? bombsCount : ''}
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
    }, 200);

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
}
