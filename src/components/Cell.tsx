import { cn, getMouseButtonClicked } from '@/utils';
import React, { useState } from 'react';

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
        !isRevealed && !isFlagged ? 'cursor-pointer' : 'cursor-default',
        !isRevealed && !isFlagged && 'hover:bg-gray-200',
        isRevealed && !isBomb && 'bg-green-100',
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
          'transition-opacity',
          isFlagged ? 'opacity-100' : 'opacity-0',
          absoluteCenterClassName,
        )}
      />
      <span
        className={cn(
          'block transition-opacity text-center text-3xl leading-[100%]',
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

function BombFlag({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex relative flex-col justify-center items-center',
        className,
      )}
      style={{ translate: '0 1px' }}
    >
      <div className='h-4 w-1 bg-black' />
      <div
        className='absolute top-0 size-0 border-r-[1rem] border-r-red-500'
        style={{
          right: 'calc(50% - 0.125rem)',
          borderBlock: '0.4rem solid transparent',
          translate: '0 -2px',
        }}
      />
      <div
        className='relative h-1 w-6 bg-black'
        style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)' }}
      />
    </div>
  );
}
