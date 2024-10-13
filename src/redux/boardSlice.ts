import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { range } from '@/utils';

type Cell = { x: number; y: number };

export const DIFFICULTIES = {
  beginner: { bombs: 10, columns: 10, rows: 10 },
  easy: { bombs: 20, columns: 10, rows: 10 },
  medium: { bombs: 40, columns: 16, rows: 16 },
  hard: { bombs: 100, columns: 20, rows: 20 },
};

export const selectGridCounts = createSelector(
  [
    (state: RootState) => state.board.rowCount,
    (state: RootState) => state.board.columnCount,
  ],
  (rowCount, columnCount) => ({ rowCount, columnCount }),
);

export const selectFlagCount = createSelector(
  [
    (state: RootState) => state.board.cells,
    (state: RootState) => state.board.revealedBomb,
  ],
  (cells, revealedBomb) => {
    if (revealedBomb) return 0;
    return Object.values(cells).filter((cell) => cell?.isFlagged).length;
  },
);

export const selectCellState = createSelector(
  [
    (state: RootState, cellId: string) => state.board.cells[cellId],
    (state: RootState, cellId: string) => state.board.cellNeighborBombs[cellId],
  ],
  (cell, cellNeighborBombs) => {
    const { isFlagged, isBomb, isRevealed } = cell || {};
    return {
      isFlagged,
      isBomb,
      isRevealed,
      neighborBombs: (cellNeighborBombs || []).length,
    };
  },
);

export const selectIsGameWon = createSelector(
  [
    (state: Pick<RootState, 'board'>) => state.board.revealedBomb,
    (state: Pick<RootState, 'board'>) => state.board.cells,
  ],
  (revealedBomb, cells) => {
    if (revealedBomb) return false;
    const nonBombs = Object.values(cells).filter((cell) => !cell?.isBomb);
    return nonBombs.length > 0 && nonBombs.every((cell) => cell?.isRevealed);
  },
);

const initialState: {
  revealedBomb: string | null; // Setting this ends the game
  bombCount: number;
  columnCount: number;
  rowCount: number;
  cellNeighborBombs: Record<string, string[] | undefined>;
  cells: Record<
    string,
    undefined | { isRevealed: boolean; isBomb: boolean; isFlagged: boolean }
  >;
} = {
  revealedBomb: null,
  bombCount: DIFFICULTIES.easy.bombs,
  columnCount: DIFFICULTIES.easy.columns,
  rowCount: DIFFICULTIES.easy.rows,
  cellNeighborBombs: {},
  cells: {},
};

export const boardSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    startNewGame: (
      state,
      action: PayloadAction<
        { bombs: number; rows: number; columns: number } | undefined
      >,
    ) => {
      state.cells = {};
      state.cellNeighborBombs = {};
      state.revealedBomb = null;
      if (action.payload) {
        state.bombCount = action.payload.bombs;
        state.rowCount = action.payload.rows;
        state.columnCount = action.payload.columns;
      }
    },
    flag: (state, { payload: cellId }: PayloadAction<string>): void => {
      if (state.revealedBomb || selectIsGameWon({ board: state })) return;

      const cell = state.cells[cellId]!;
      if (cell.isRevealed) return;
      cell.isFlagged = !cell.isFlagged;
    },
    reveal: (state, { payload: cellId }: PayloadAction<string>) => {
      if (state.revealedBomb || selectIsGameWon({ board: state })) return;
      const [x, y] = cellId.split('-').map(Number);
      const isFirstReveal = Object.keys(state.cells).length === 0;

      if (isFirstReveal) {
        fillBoard({ x, y });
      }

      const cell = state.cells[cellId]!;

      if (cell.isFlagged) return;
      if (cell.isBomb) {
        state.revealedBomb = cellId;
        return;
      }

      const neighborBombs = state.cellNeighborBombs[cellId]?.length || 0;
      if (!isFirstReveal && !cell.isRevealed && neighborBombs > 0) {
        cell.isRevealed = true;
        return;
      }

      const newRevealed = [
        cellId,
        ...findNeighborsToReveal(new Set(), { x, y }),
      ].filter((cellId) => !state.cells[cellId]?.isFlagged);

      for (const cellId of newRevealed) {
        const cell = state.cells[cellId]!;
        if (cell.isBomb) {
          state.revealedBomb = cellId;
        } else {
          cell.isRevealed = true;
        }
      }

      function findNeighborsToReveal(
        output: Set<string>,
        { x, y }: Cell,
      ): Set<string> {
        const cellId = `${x}-${y}`;
        if (output.has(cellId)) return output;

        const neighbors = getNeighbors({ x, y }).filter(
          // Walking over neighbors already revealed can impact performance.
          ({ x, y }) => !state.cells[`${x}-${y}`]!.isRevealed,
        );
        if (hasUnmarkedBombs(cellId, neighbors)) return output;

        return neighbors.reduce(
          (output, neighbor) => {
            const neighborId = `${neighbor.x}-${neighbor.y}`;
            const hasBombsAround =
              (state.cellNeighborBombs[neighborId] || []).length > 0;
            const furtherNeighborIds: Set<string> = hasBombsAround
              ? new Set()
              : findNeighborsToReveal(output, neighbor);

            return new Set([...output, neighborId, ...furtherNeighborIds]);
          },
          new Set([...output, cellId]),
        );
      }

      function hasUnmarkedBombs(cellId: string, neighbors: Cell[]): boolean {
        if (state.cells[cellId]!.isBomb) return true;

        const neighborBombs = (state.cellNeighborBombs[cellId] || []).length;
        let neighborsFlagged = 0;
        neighbors.forEach(({ x, y }) => {
          const neighborId = `${x}-${y}`;
          if (!state.cells[neighborId]!.isFlagged) return;
          neighborsFlagged += 1;
        });

        return neighborBombs > 0 && neighborBombs !== neighborsFlagged;
      }

      function fillBoard(origin: Cell): void {
        const bombOptions = range(state.rowCount).reduce((output, row) => {
          return range(state.columnCount).reduce((output, column) => {
            state.cells[`${row}-${column}`] = getNewCell();
            const isSame = row === origin.x && column === origin.y;
            const isNeighbor = areNeighbors(origin, { x: row, y: column });
            return isSame || isNeighbor
              ? output
              : [...output, `${row}-${column}`];
          }, output);
        }, [] as string[]);

        range(state.bombCount).forEach(() => {
          const i = Math.floor(Math.random() * bombOptions.length);
          const bombId = bombOptions[i];
          const [x, y] = bombId.split('-').map(Number);
          state.cells[bombId]!.isBomb = true;
          bombOptions.splice(i, 1);

          getNeighbors({ x, y }).forEach(({ x, y }) => {
            const cellId = `${x}-${y}`;
            const currentBombs = state.cellNeighborBombs[cellId] || [];
            state.cellNeighborBombs[cellId] = [...currentBombs, bombId];
          });
        });
      }

      function getNeighbors(cell: Cell): Cell[] {
        return [
          { x: cell.x - 1, y: cell.y - 1 }, // top left
          { x: cell.x - 1, y: cell.y }, // top
          { x: cell.x - 1, y: cell.y + 1 }, // top right
          { x: cell.x, y: cell.y - 1 }, // left
          { x: cell.x, y: cell.y + 1 }, // right
          { x: cell.x + 1, y: cell.y - 1 }, // bottom left
          { x: cell.x + 1, y: cell.y }, // bottom
          { x: cell.x + 1, y: cell.y + 1 }, // bottom right
        ].filter(
          ({ x, y }) =>
            isBetween(x, 0, state.rowCount - 1) &&
            isBetween(y, 0, state.columnCount - 1),
        );
      }
    },
  },
});

export const { flag, reveal, startNewGame } = boardSlice.actions;

export function areNeighbors(
  cellA: { x: number; y: number },
  cellB: { x: number; y: number },
): boolean {
  return (
    cellA.x >= cellB.x - 1 &&
    cellA.x <= cellB.x + 1 &&
    cellA.y >= cellB.y - 1 &&
    cellA.y <= cellB.y + 1
  );
}

function isBetween(value: number, begin: number, end: number): boolean {
  return value >= begin && value <= end;
}

function getNewCell(): {
  isBomb: boolean;
  isFlagged: boolean;
  isRevealed: boolean;
} {
  return { isBomb: false, isFlagged: false, isRevealed: false };
}
