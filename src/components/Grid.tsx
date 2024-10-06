import { Cell } from '@/components/Cell';
import { cn, range } from '@/utils';
import { useAppSelector } from '@/redux/hooks';
import { selectGridCounts } from '@/redux/boardSlice';

export const Grid = ({ className }: { className?: string }) => {
  const { rowCount, columnCount } = useAppSelector(selectGridCounts);

  return (
    <div
      className={cn(
        'grid max-h-full max-w-full select-none overflow-auto overscroll-none border-b border-r border-contrast dark:border-contrast-dark',
        className,
      )}
      style={{
        gridTemplateRows: `repeat(${rowCount}, 2rem)`,
        gridTemplateColumns: `repeat(${columnCount}, 2rem)`,
      }}
    >
      {range(rowCount).map((row) =>
        range(columnCount).map((column) => {
          const cellId = `${row}-${column}`;
          return (
            <Cell
              key={cellId}
              cellId={cellId}
              className='border-l border-t border-contrast dark:border-contrast-dark'
            />
          );
        }),
      )}
    </div>
  );
};
