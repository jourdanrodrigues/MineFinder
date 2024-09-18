import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { areNeighbors, range } from '@/utils.ts';

type Cell = { x: number; y: number };

export const DEFAULT_BOMBS = 20;
export const DEFAULT_COLUMNS = 10;
export const DEFAULT_ROWS = 10;

export const selectBoardSets = createSelector(
  [
    (state: RootState) => state.board.flagged,
    (state: RootState) => state.board.bombs,
    (state: RootState) => state.board.revealed,
  ],
  (flagged, bombs, revealed) => ({
    flagged: new Set(flagged),
    bombs: new Set(bombs),
    revealed: new Set(revealed),
  }),
);

const initialState: {
  isGameOver: boolean;
  bombCount: number;
  columnCount: number;
  rowCount: number;
  flagged: string[];
  bombs: string[];
  revealed: string[];
  cellNeighborBombs: Record<string, string[] | undefined>;
} = {
  isGameOver: false,
  bombCount: DEFAULT_BOMBS,
  columnCount: DEFAULT_COLUMNS,
  rowCount: DEFAULT_ROWS,
  flagged: [],
  bombs: [],
  revealed: [],
  cellNeighborBombs: {},
};

export const boardSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    startNewGame: (
      state,
      action: PayloadAction<{ bombs: number; rows: number; columns: number }>,
    ) => {
      state.flagged = [];
      state.revealed = [];
      state.bombs = [];
      state.cellNeighborBombs = {};
      state.bombCount = action.payload.bombs;
      state.rowCount = action.payload.rows;
      state.columnCount = action.payload.columns;
      state.isGameOver = false;
    },
    finishGame: (state) => {
      state.flagged = [];
      state.revealed = [];
      state.isGameOver = true;
    },
    mark: (state, { payload: { x, y } }: PayloadAction<Cell>): void => {
      if (state.isGameOver) return;
      const cellId = `${x}-${y}`;

      const index = state.flagged.indexOf(cellId);
      if (index !== -1) {
        state.flagged.splice(index, 1);
      } else if (!state.revealed.includes(cellId)) {
        state.flagged.push(cellId);
      }
    },
    reveal: (state, { payload: cell }: PayloadAction<Cell>) => {
      if (state.bombs.length === 0) {
        fillBombs(cell);
      }

      const cellId = `${cell.x}-${cell.y}`;
      const flagged = new Set(state.flagged);
      if (flagged.has(cellId)) return;

      const bombs = new Set(state.bombs);
      const revealed = new Set(state.revealed);

      const now = Date.now();
      const newRevealed = state.revealed
        .concat([cellId, ...findNeighborsToReveal(new Set(), cell)])
        .filter((cellId) => !flagged.has(cellId));
      console.log('reveal', Date.now() - now);

      if (newRevealed.some((cellId) => bombs.has(cellId))) {
        state.flagged = [];
        state.revealed = [];
        state.isGameOver = true;
        return;
      }

      state.revealed = newRevealed;

      function findNeighborsToReveal(
        output: Set<string>,
        { x, y }: Cell,
      ): Set<string> {
        const cellId = `${x}-${y}`;
        if (output.has(cellId)) return output;

        const neighbors = getNeighbors({ x, y }).filter(
          // Walking over neighbors already revealed can impact performance.
          ({ x, y }) => !revealed.has(`${x}-${y}`),
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
        if (bombs.has(cellId)) return true;

        const neighborBombs = (state.cellNeighborBombs[cellId] || []).length;
        let neighborsFlagged = 0;
        neighbors.forEach(({ x, y }) => {
          const neighborId = `${x}-${y}`;
          if (!flagged.has(neighborId)) return;
          neighborsFlagged += 1;
        });

        return neighborBombs > 0 && neighborBombs !== neighborsFlagged;
      }

      function fillBombs(origin: Cell): void {
        const bombOptions = range(state.rowCount).reduce((output, row) => {
          return range(state.columnCount).reduce((output, column) => {
            const isSame = row === origin.x && column === origin.y;
            const isNeighbor = areNeighbors(origin, { x: row, y: column });
            return isSame || isNeighbor
              ? output
              : [...output, `${row}-${column}`];
          }, output);
        }, [] as string[]);

        range(state.bombCount).forEach(() => {
          const i = Math.floor(Math.random() * bombOptions.length);
          state.bombs.push(bombOptions[i]);
          bombOptions.splice(i, 1);
        });

        state.cellNeighborBombs = state.bombs.reduce(
          (output, bomb) => {
            const [x, y] = bomb.split('-').map(Number);
            return getNeighbors({ x, y }).reduce((output, { x, y }) => {
              const cellId = `${x}-${y}`;
              const currentBombs = output[cellId] || [];
              return { ...output, [cellId]: [...currentBombs, bomb] };
            }, output);
          },
          {} as Record<string, string[]>,
        );
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

function isBetween(value: number, begin: number, end: number): boolean {
  return value >= begin && value <= end;
}
