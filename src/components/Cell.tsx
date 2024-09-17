import { cn, getMouseButtonClicked } from '@/utils';
import { useContext } from 'react';
import { DraggingContext } from '@/components/Board';

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
  const isDragging = useContext(DraggingContext);
  return (
    <span
      className={cn(
        'flex justify-center items-center size-12 border-black border-2 transition-all',
        !isRevealed && !isDragging && 'cursor-pointer',
        !isRevealed && !isFlagged && 'hover:bg-gray-200',
        isRevealed && !isBomb && 'bg-green-100',
      )}
      onContextMenu={(e) => e.preventDefault()}
      // TODO: Implement touch events
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
    </span>
  );
}

function Content({
  isBomb,
  bombsCount,
}: {
  isBomb: boolean;
  bombsCount: number;
}) {
  const isDragging = useContext(DraggingContext);
  if (isBomb) {
    return (
      <span className='relative block size-8 rounded-[50%] border-2 border-black transition-all' />
    );
  }
  return (
    <span
      className={cn(
        'text-center leading-[100%] text-3xl size-8 select-none',
        !isDragging && 'cursor-default',
      )}
    >
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
