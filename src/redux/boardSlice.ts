import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { range } from '@/utils';

type Cell = {
  isRevealed: boolean;
  isBomb: boolean;
  isFlagged: boolean;
  neighborBombs: string[];
};

export const DIFFICULTIES = {
  beginner: { bombs: 10, columns: 10, rows: 10 },
  easy: { bombs: 20, columns: 10, rows: 10 },
  medium: { bombs: 40, columns: 16, rows: 16 },
  hard: { bombs: 100, columns: 20, rows: 20 },
} as const;

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
  [(state: RootState, cellId: string) => state.board.cells[cellId]],
  (cell) => {
    const { isFlagged, isBomb, isRevealed, neighborBombs } = cell || {};
    return {
      isFlagged,
      isBomb,
      isRevealed,
      neighborBombs: (neighborBombs || []).length,
    };
  },
);

export const selectIsGameWon = createSelector(
  [
    (state: Pick<RootState, 'board'>) => state.board.revealedBomb,
    (state: Pick<RootState, 'board'>) => state.board.cells,
  ],
  (revealedBomb, cellsMap) => {
    if (revealedBomb) return false;
    const cells = Object.values(cellsMap);
    return (
      cells.length > 0 &&
      cells.every((cell) => cell?.isBomb || cell?.isRevealed)
    );
  },
);

const initialState: {
  revealedBomb: string | null; // Setting this ends the game
  bombCount: number;
  columnCount: number;
  rowCount: number;
  cells: Record<string, undefined | Cell>;
} = {
  revealedBomb: null,
  bombCount: DIFFICULTIES.easy.bombs,
  columnCount: DIFFICULTIES.easy.columns,
  rowCount: DIFFICULTIES.easy.rows,
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

      const neighborBombs = cell.neighborBombs.length || 0;
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
        { x, y }: { x: number; y: number },
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
              (state.cells[neighborId]?.neighborBombs || []).length > 0;
            const furtherNeighborIds: Set<string> = hasBombsAround
              ? new Set()
              : findNeighborsToReveal(output, neighbor);

            return new Set([...output, neighborId, ...furtherNeighborIds]);
          },
          new Set([...output, cellId]),
        );
      }

      function hasUnmarkedBombs(
        cellId: string,
        neighbors: { x: number; y: number }[],
      ): boolean {
        if (state.cells[cellId]!.isBomb) return true;

        const neighborBombs = (state.cells[cellId]?.neighborBombs || []).length;
        let neighborsFlagged = 0;
        neighbors.forEach(({ x, y }) => {
          const neighborId = `${x}-${y}`;
          if (!state.cells[neighborId]!.isFlagged) return;
          neighborsFlagged += 1;
        });

        return neighborBombs > 0 && neighborBombs !== neighborsFlagged;
      }

      function fillBoard(origin: { x: number; y: number }): void {
        const bombOptions = range(state.rowCount).reduce((output, row) => {
          return range(state.columnCount).reduce((output, column) => {
            state.cells[`${row}-${column}`] = getNewCell();
            const isSame = row === origin.x && column === origin.y;
            return isSame || areNeighbors(origin, { x: row, y: column })
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
            const cell = state.cells[`${x}-${y}`]!;
            cell.neighborBombs.push(bombId);
          });
        });
      }

      function getNeighbors(cell: {
        x: number;
        y: number;
      }): { x: number; y: number }[] {
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

function getNewCell(): Cell {
  return {
    isBomb: false,
    isFlagged: false,
    isRevealed: false,
    neighborBombs: [],
  };
}
