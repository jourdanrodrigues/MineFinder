import { useEffect, useState } from 'react';
import PresentationCell from '@/components/PresentationCell.tsx';
import Cell from '@/Cell';
import { useSetState } from '@/hooks';
import { GridType } from '@/types';
import { range } from '@/utils';
import { NeighborFinder } from '@/NeighborFinder';

type GridProps = { readonly grid: GridType; readonly bombs: number };

export default function Grid({ grid: gridProp, bombs }: GridProps) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridProp]);

  return (
    <div className='w-fit border-black border-2'>
      {grid.map((row) => (
        <div className='flex' key={row.id}>
          {row.cells.map((cell) => {
            const isMarked = markedCells.has(cell.id);
            return (
              <PresentationCell
                key={cell.id}
                isBomb={cell.isBomb}
                bombsCount={cell.getBombsCount()}
                isMarked={isMarked}
                isRevealed={
                  isGameOver || (!isMarked && revealedCells.has(cell.id))
                }
                onMarkBomb={() => mark(cell)}
                onReveal={() => {
                  if (cell.isBomb) {
                    if (markedCells.has(cell.id)) return;
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
    if (markedCells.has(cell.id)) return;
    const neighborFinder = new NeighborFinder(markedCells.getCopy());
    const neighbors = neighborFinder.getNeighborsToReveal(cell);
    const newRevealedCells = [cell, ...neighbors];
    const hasRevealedBomb = newRevealedCells.some(
      (cell) => !markedCells.has(cell.id) && cell.isBomb,
    );
    if (hasRevealedBomb) {
      finishTheGame();
    } else {
      revealedCells.add(newRevealedCells.map(({ id }) => id));
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
        ...row.cells.filter((cell) => !cell.isNeighborOf(origin)),
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
}
