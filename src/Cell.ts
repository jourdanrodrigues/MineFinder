import { createUUID, SuperSet } from '@/utils';
import { GridType } from '@/types';

export default class Cell {
  private readonly nonBombs: SuperSet<Cell>;
  private readonly bombs: SuperSet<Cell>;
  column: number;
  row: number;
  isBomb: boolean;
  id: string;

  constructor(row: number, column: number) {
    this.id = createUUID();
    this.isBomb = false;
    this.row = row;
    this.column = column;
    this.nonBombs = new SuperSet();
    this.bombs = new SuperSet();
  }

  isNeighborOf(cell: Cell): boolean {
    return (
      this.row >= cell.row - 1 &&
      this.row <= cell.row + 1 &&
      this.column >= cell.column - 1 &&
      this.column <= cell.column + 1
    );
  }

  getBombsCount(): number {
    return this.bombs.size;
  }

  hasBombs(): boolean {
    return this.bombs.size > 0;
  }

  getNeighbors(): Cell[] {
    return [...Array.from(this.nonBombs), ...Array.from(this.bombs)];
  }

  getNeighborsIds(): SuperSet<string> {
    return new SuperSet(this.getNeighbors().map(({ id }) => id));
  }

  fillNeighbors(grid: GridType): void {
    const neighbors = [
      { row: this.row - 1, column: this.column - 1 }, // top left
      { row: this.row - 1, column: this.column }, // top
      { row: this.row - 1, column: this.column + 1 }, // top right
      { row: this.row, column: this.column - 1 }, // left
      { row: this.row, column: this.column + 1 }, // right
      { row: this.row + 1, column: this.column - 1 }, // bottom left
      { row: this.row + 1, column: this.column }, // bottom
      { row: this.row + 1, column: this.column + 1 }, // bottom right
    ];

    neighbors.forEach(({ row: i, column: j }) => {
      const neighbor = grid[i]?.cells[j];
      if (!neighbor) return;
      if (neighbor.isBomb) {
        this.bombs.add(neighbor);
      } else {
        this.nonBombs.add(neighbor);
      }
    });
  }
}
