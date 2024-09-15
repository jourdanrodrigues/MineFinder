import React, { forwardRef, useEffect, useState } from 'react';
import PresentationCell from '@/components/PresentationCell.tsx';
import Cell, { areNeighbors } from '@/Cell';
import { useSetState } from '@/hooks';
import { GridType } from '@/types';
import { range, SuperSet } from '@/utils';
import { NeighborFinder } from '@/NeighborFinder';

export default forwardRef<
  HTMLDivElement | null,
  {
    grid: GridType;
    bombs: number;
    className?: string;
    style?: React.CSSProperties;
  }
>(function Grid({ grid: gridProp, bombs, style }, ref) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const markedCells = useSetState<string>();
  const revealedCells = useSetState<string>();
  const [grid, setGrid] = useState(gridProp);

  const finishTheGame = (): void => {
    markedCells.clear();
    revealedCells.clear();
    setIsGameOver(true);
  };

  useEffect(() => {
    markedCells.clear();
    revealedCells.clear();
    setIsGameOver(false);
    setIsFirstMove(true);
    setGrid(gridProp);
  }, [gridProp]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='w-fit' ref={ref} style={style}>
      {grid.map((row) => (
        <div className='flex' key={row.id}>
          {row.cells.map((cell) => {
            const isMarked = markedCells.has(cell.id);
            return (
              <PresentationCell
                key={cell.id}
                isBomb={cell.isBomb}
                bombsCount={cell.getBombsCount()}
                isMarkedBomb={isMarked}
                isRevealed={
                  isGameOver || (!isMarked && revealedCells.has(cell.id))
                }
                onMarkBomb={() => mark(cell)}
                onReveal={() => {
                  if (markedCells.has(cell.id)) return;
                  if (cell.isBomb) {
                    finishTheGame();
                  } else {
                    reveal(cell);
                  }
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );

  function reveal(cell: Cell): void {
    if (isFirstMove) {
      fillGamePieces(cell, grid, bombs);
      setIsFirstMove(false);
    }
    const markedCellSet = markedCells.getCopy();
    const neighbors = new NeighborFinder(markedCellSet).getNeighborsToReveal(
      cell,
    );
    const newRevealedCells = [cell, ...neighbors];
    const hasRevealedBomb = newRevealedCells.some(
      (cell) => !markedCells.has(cell.id) && cell.isBomb,
    );
    if (hasRevealedBomb) {
      finishTheGame();
    } else {
      const revealedCellsIds = new SuperSet(
        newRevealedCells.map(({ id }) => id),
      );
      revealedCells.add(revealedCellsIds.difference(markedCellSet));
    }
  }

  function mark(cell: Cell): void {
    if (isGameOver) return;
    if (markedCells.has(cell.id)) {
      markedCells.remove([cell.id]);
    } else if (!revealedCells.has(cell.id)) {
      markedCells.add([cell.id]);
    }
  }

  function fillGamePieces(origin: Cell, grid: GridType, bombs: number): void {
    const bombOptions = grid.reduce(
      (output, row) => [
        ...output,
        ...row.cells.filter((cell) => !areNeighbors(cell, origin)),
      ],
      [] as Cell[],
    );
    range(bombs).forEach(() => {
      const i = Math.floor(Math.random() * bombOptions.length);
      bombOptions[i].isBomb = true;
      bombOptions.splice(i, 1);
    });

    grid.forEach((row) => {
      row.cells.forEach((cell) => {
        cell.fillNeighbors(grid);
      });
    });
    setGrid(grid);
  }
});
