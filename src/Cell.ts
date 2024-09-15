import { SuperSet } from '@/utils';
import { GridType } from '@/types';

export function areNeighbors(cellA: Cell, cellB: Cell): boolean {
  return (
    cellA.x >= cellB.x - 1 &&
    cellA.x <= cellB.x + 1 &&
    cellA.y >= cellB.y - 1 &&
    cellA.y <= cellB.y + 1
  );
}

export default class Cell {
  private readonly nonBombs: SuperSet<Cell>;
  private readonly bombs: SuperSet<Cell>;
  y: number;
  x: number;
  isBomb: boolean;
  id: string;

  constructor(x: number, y: number) {
    this.id = `${x}-${y}`;
    this.isBomb = false;
    this.x = x;
    this.y = y;
    this.nonBombs = new SuperSet();
    this.bombs = new SuperSet();
  }

  getBombsCount(): number {
    return this.bombs.size;
  }

  getNeighbors(): Cell[] {
    return [...this.nonBombs, ...this.bombs];
  }

  fillNeighbors(grid: GridType): void {
    const neighbors = [
      { x: this.x - 1, y: this.y - 1 }, // top left
      { x: this.x - 1, y: this.y }, // top
      { x: this.x - 1, y: this.y + 1 }, // top right
      { x: this.x, y: this.y - 1 }, // left
      { x: this.x, y: this.y + 1 }, // right
      { x: this.x + 1, y: this.y - 1 }, // bottom left
      { x: this.x + 1, y: this.y }, // bottom
      { x: this.x + 1, y: this.y + 1 }, // bottom right
    ];

    neighbors.forEach(({ x, y }) => {
      const neighbor = grid[x]?.cells[y];
      if (!neighbor) return;
      if (neighbor.isBomb) {
        this.bombs.add(neighbor);
      } else {
        this.nonBombs.add(neighbor);
      }
    });
  }
}
