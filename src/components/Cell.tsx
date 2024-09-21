import { cn, getMouseButtonClicked } from '@/utils';
import React, { useState } from 'react';
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

  const absoluteCenterClassName =
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-[opacity]';
  return (
    <div
      className={cn(
        'flex relative justify-center items-center transition-all bg-white aspect-square size-full',
        !isRevealed ? 'cursor-pointer' : 'cursor-default',
        {
          'hover:bg-gray-200': !isRevealed && !isFlagged,
          'bg-red-100': isRevealed && isBomb,
          'bg-green-100': isRevealed && !isBomb,
          'bg-yellow-100': isFlagged,
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
          'block size-[80%] rounded-[50%] border-2 border-black transition-all',
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
          'block transition-opacity text-center text-xl leading-[100%]',
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
    }, 300);

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
