import { Cell } from '@/components/Cell.tsx';
import { range } from '@/utils';
import { useAppSelector } from '@/redux/hooks.ts';
import { selectGridCounts } from '@/redux/boardSlice.ts';

export const Grid = () => {
  const { rowCount, columnCount } = useAppSelector(selectGridCounts);

  return (
    <div
      className='grid max-h-full max-w-full select-none overflow-auto overscroll-none border-[1px] border-contrast dark:border-contrast-dark'
      style={{
        gridTemplateRows: `repeat(${rowCount}, 2rem)`,
        gridTemplateColumns: `repeat(${columnCount}, 2rem)`,
      }}
    >
      {range(rowCount).map((row) =>
        range(columnCount).map((column) => (
          <Cell key={`${row}-${column}`} row={row} column={column} />
        )),
      )}
    </div>
  );
};
