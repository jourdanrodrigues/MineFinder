import { Cell } from '@/components/Cell.tsx';
import { range } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { boardSlice, selectBoardSets } from '@/redux/boardSlice.ts';

export const Grid = () => {
  const dispatch = useAppDispatch();
  const { flagged, bombs, revealed } = useAppSelector(selectBoardSets);
  const { isGameOver, rowCount, columnCount, cellNeighborBombs } =
    useAppSelector((state) => state.board);

  return (
    <div
      className='grid size-fit select-none gap-[2px] border-[2px] border-black bg-contrast dark:border-contrast-dark dark:bg-contrast-dark'
      onContextMenu={(e) => e.preventDefault()}
      style={{
        gridTemplateRows: `repeat(${rowCount}, 2rem)`,
        gridTemplateColumns: `repeat(${columnCount}, 2rem)`,
      }}
    >
      {range(rowCount).map((row) =>
        range(columnCount).map((column) => {
          const cell = { x: row, y: column };
          const cellId = `${row}-${column}`;
          const isFlagged = flagged.has(cellId);
          const isBomb = bombs.has(cellId);
          const isRevealed = revealed.has(cellId);
          return (
            <Cell
              key={cellId}
              isBomb={isBomb}
              bombsCount={cellNeighborBombs[cellId]?.length || 0}
              isFlagged={isFlagged}
              isRevealed={isGameOver || (!isFlagged && isRevealed)}
              onFlag={() => dispatch(boardSlice.actions.mark(cell))}
              onReveal={() => {
                if (isFlagged) return;
                if (isBomb) {
                  dispatch(boardSlice.actions.finishGame());
                } else {
                  dispatch(boardSlice.actions.reveal(cell));
                }
              }}
            />
          );
        }),
      )}
    </div>
  );
};
