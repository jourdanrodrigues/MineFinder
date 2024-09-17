import React, { forwardRef } from 'react';
import { Cell } from '@/components/Cell.tsx';
import { range } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { boardSlice, selectBoardSets } from '@/redux/boardSlice.ts';

export const Grid = forwardRef<
  HTMLDivElement | null,
  { className?: string; style?: React.CSSProperties }
>(({ style }, ref) => {
  const dispatch = useAppDispatch();
  const { flagged, bombs, revealed } = useAppSelector(selectBoardSets);
  const { isGameOver, rowCount, columnCount, cellNeighborBombs } =
    useAppSelector((state) => state.board);

  return (
    <div className='w-fit' ref={ref} style={style}>
      {range(rowCount).map((row) => (
        <div className='flex' key={row.toString()}>
          {range(columnCount).map((column) => {
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
          })}
        </div>
      ))}
    </div>
  );
});
