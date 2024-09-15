import { cn, getMouseButtonClicked } from '@/utils.ts';

export default function PresentationCell({
  isBomb,
  isRevealed,
  isMarkedBomb,
  bombsCount,
  onReveal,
  onMarkBomb,
}: {
  isRevealed: boolean;
  isMarkedBomb: boolean;
  isBomb: boolean;
  bombsCount: number;
  onReveal: () => void;
  onMarkBomb: () => void;
}) {
  return (
    <span
      className={cn(
        'flex justify-center items-center size-12 border-black border-2 transition-all',
        !isRevealed && 'cursor-pointer',
        isRevealed ? !isBomb && 'bg-gray-400' : 'hover:bg-gray-300',
      )}
      onContextMenu={(e) => e.preventDefault()}
      // TODO: Implement touch events
      onMouseDown={(e) => {
        const button = getMouseButtonClicked(e);
        if (button === 'left' || button === 'middle') {
          onReveal();
        } else if (button === 'right') {
          onMarkBomb();
        }
      }}
    >
      <BombFlag
        className={cn('absolute transition-opacity opacity-100', {
          'opacity-0': !isMarkedBomb,
        })}
      />
      {!isMarkedBomb && isRevealed && (
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
  if (isBomb) {
    return (
      <span
        className={
          'block relative rounded-[50%] transition-all size-8 border-black border-2'
        }
      />
    );
  }
  return (
    <span className='text-center leading-[100%] text-3xl size-8 select-none cursor-default'>
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
        className='absolute top-0 size-0 border-r-red-500 border-r-[1rem]'
        style={{
          right: 'calc(50% - 0.125rem)',
          borderBlock: '0.4rem solid transparent',
          translate: '0 -2px',
        }}
      />
      <div
        className='relative w-6 h-1 bg-black'
        style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)' }}
      />
    </div>
  );
}
