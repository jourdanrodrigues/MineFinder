import { cn } from '@/utils.ts';

type SafeCellProps = {
  isRevealed: boolean;
  isMarked: boolean;
  isBomb: boolean;
  bombsCount: number;
  onReveal: () => void;
  onMarkBomb: () => void;
};

export default function PresentationCell({
  isBomb,
  isRevealed,
  isMarked,
  bombsCount,
  onReveal,
  onMarkBomb,
}: SafeCellProps) {
  const content = isBomb ? (
    <span
      className={cn(
        'block relative rounded-[50%] transition-all',
        isRevealed && 'size-8 border-black border-2',
      )}
    />
  ) : (
    <span className='text-center leading-[100%] text-3xl size-8 select-none cursor-default'>
      {isRevealed && bombsCount > 0 ? bombsCount : ''}
    </span>
  );

  return (
    <span
      className={cn(
        'flex justify-center items-center size-12 border-black border-2 transition-all will-change-[background-color]',
        !isRevealed && 'cursor-pointer',
        (isMarked && 'bg-red-400') || (isRevealed && !isBomb && 'bg-gray-400'),
      )}
      onClick={onReveal}
      onContextMenu={(e) => {
        e.preventDefault();
        onMarkBomb();
      }}
    >
      {isRevealed && content}
    </span>
  );
}
