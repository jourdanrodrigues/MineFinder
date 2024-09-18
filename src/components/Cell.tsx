import { cn, getMouseButtonClicked } from '@/utils';
import { useState } from 'react';

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

  return (
    <div
      className={cn(
        'flex justify-center items-center transition-all bg-white aspect-square size-full',
        !isRevealed && 'cursor-pointer',
        !isRevealed && !isFlagged && 'hover:bg-gray-200',
        isRevealed && !isBomb && 'bg-green-100',
      )}
      onContextMenu={(e) => e.preventDefault()}
      onTouchStart={(e) => {
        e.preventDefault();
        const timeoutId = setTimeout(() => {
          onFlag();
          setTimeoutId(null);
        }, 300);

        setTimeoutId(timeoutId);
      }}
      onTouchMove={() => {
        if (!timeoutId) return;
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        if (!timeoutId) return;
        onReveal();
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }}
      onMouseDown={(e) => {
        const button = getMouseButtonClicked(e);
        if (button !== 'left' && button !== 'right') return;

        e.stopPropagation();
        if (button === 'left') {
          onReveal();
        } else if (button === 'right') {
          onFlag();
        }
      }}
    >
      <BombFlag
        className={cn('absolute transition-opacity opacity-100', {
          'opacity-0': !isFlagged,
        })}
      />
      {!isFlagged && isRevealed && (
        <Content isBomb={isBomb} bombsCount={bombsCount} />
      )}
    </div>
  );
}

function Content({
  isBomb,
  bombsCount,
}: {
  isBomb: boolean;
  bombsCount: number;
}) {
  if (isBomb) {
    return (
      <span className='relative block size-[80%] rounded-[50%] border-2 border-black transition-all' />
    );
  }
  return (
    <span className='cursor-default select-none text-center text-3xl leading-[100%]'>
      {bombsCount > 0 ? bombsCount : ''}
    </span>
  );
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
