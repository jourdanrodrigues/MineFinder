import {createUUID, SuperSet} from 'utils'
import {GridType} from 'types'

export default class Cell {
  private readonly nonBombs: SuperSet<Cell>
  private readonly bombs: SuperSet<Cell>
  column: number
  row: number
  isBomb: boolean
  id: string

  constructor(row: number, column: number) {
    this.id = createUUID()
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

  hasBombs(): boolean {
    return this.bombs.size > 0
  }

  getNeighbors(): Cell[] {
    return [...Array.from(this.nonBombs), ...Array.from(this.bombs)]
  }

  getNeighborsIds(): SuperSet<string> {
    return new SuperSet(this.getNeighbors().map(({id}) => id))
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
