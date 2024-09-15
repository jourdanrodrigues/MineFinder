import { SuperSet } from '@/utils';
import Cell from '@/Cell';

export class NeighborFinder {
  idCache: Set<string>;
  markedCells: SuperSet<string>;

  constructor(markedCells: SuperSet<string>) {
    this.idCache = new Set();
    this.markedCells = markedCells;
  }

  getNeighborsToReveal(cell: Cell): Cell[] {
    if (this.idCache.has(cell.id) || this.hasUnmarkedBombs(cell)) return [];
    this.idCache.add(cell.id);
    return cell.getNeighbors().reduce((output, neighbor) => {
      const innerNeighbors =
        neighbor.getBombsCount() > 0 ? [] : this.getNeighborsToReveal(neighbor);
      return [...output, neighbor, ...innerNeighbors];
    }, [] as Cell[]);
  }

  hasUnmarkedBombs(cell: Cell): boolean {
    if (cell.isBomb) return true;
    const bombsCount = cell.getBombsCount();
    if (bombsCount === 0) return false;
    const markedNeighborsCount = this.markedCells.intersection(
      cell.getNeighbors().map(({ id }) => id),
    ).size;
    return markedNeighborsCount !== bombsCount;
  }
}
