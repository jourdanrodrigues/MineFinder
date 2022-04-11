import {SuperSet} from 'utils'
import {GridType} from 'types'

interface CachesType {
  ids: SuperSet<string>
  markedBombs: SuperSet<string>

}

export default class Cell {
  private readonly nonBombs: SuperSet<Cell>
  private readonly bombs: SuperSet<Cell>
  column: number
  row: number
  isBomb: boolean
  id: string

  constructor(row: number, column: number) {
    this.id = crypto.randomUUID()
    this.isBomb = false
    this.row = row
    this.column = column
    this.nonBombs = new SuperSet()
    this.bombs = new SuperSet()
  }

  isNeighborOf(cell: Cell): boolean {
    return (
      this.row >= cell.row - 1 &&
      this.row <= cell.row + 1 &&
      this.column >= cell.column - 1 &&
      this.column <= cell.column + 1
    )
  }

  getBombsCount(): number {
    return this.bombs.size
  }

  getNeighbors(): Cell[] {
    return [...Array.from(this.nonBombs), ...Array.from(this.bombs)]
  }

  getNeighborsIds(): SuperSet<string> {
    return new SuperSet(this.getNeighbors().map(({id}) => id))
  }

  hasUnmarkedBombs(markedBombs: SuperSet<string>): boolean {
    if (this.isBomb) return true
    const bombsCount = this.getBombsCount()
    return bombsCount > 0 && this.getNeighborsIds().intersection(markedBombs).size !== bombsCount
  }

  getNeighborsToReveal(markedBombs: SuperSet<string>): Cell[] {
    return Cell.findNeighbors(this, {markedBombs, ids: new SuperSet()})
  }

  private static findNeighbors(cell: Cell, caches: CachesType): Cell[] {
    const {ids, markedBombs} = caches
    if (ids.has(cell.id) || cell.hasUnmarkedBombs(markedBombs)) return []
    ids.add(cell.id)
    const neighbors = cell.getNeighbors()
    return neighbors.reduce(
      (output, neighbor) => [...output, neighbor, ...this.findNeighbors(neighbor, caches)],
      [] as Cell[]
    )
  }

  fillNeighbors(grid: GridType): void {
    for (let rowIndex = this.row - 1; rowIndex <= this.row + 1; rowIndex++) {
      if (rowIndex < 0) continue
      if (rowIndex === grid.length) break
      const row = grid[rowIndex]
      for (let columnIndex = this.column - 1; columnIndex <= this.column + 1; columnIndex++) {
        if (columnIndex < 0 || (rowIndex === this.row && columnIndex === this.column)) continue
        if (columnIndex === row.length) break
        const neighbor = row[columnIndex]
        if (neighbor.isBomb) {
          this.bombs.add(neighbor)
        } else {
          this.nonBombs.add(neighbor)
        }
      }
    }
  }
}