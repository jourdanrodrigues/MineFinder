import Grid from 'Grid'

export default class Cell {
  private neighbors: Set<Cell>
  private bombs: Set<Cell>
  column: number
  row: number
  isBomb: boolean
  id: string

  constructor(row: number, column: number) {
    this.id = crypto.randomUUID()
    this.isBomb = false
    this.row = row
    this.column = column
    this.neighbors = new Set()
    this.bombs = new Set()
  }

  getBombsCount(): number {
    return this.bombs.size
  }

  hasBombs(): boolean {
    return this.bombs.size > 0
  }

  getSafeNeighbors(): Cell[] {
    return Cell.findSafeNeighbors(this, new Set())
  }

  private static findSafeNeighbors(cell: Cell, idsCache: Set<string>): Cell[] {
    if (idsCache.has(cell.id) || cell.isBomb || cell.hasBombs()) return []
    idsCache.add(cell.id)
    const neighbors = Array.from(cell.neighbors)
    return neighbors.reduce(
      (output, neighbor) => [...output, neighbor, ...this.findSafeNeighbors(neighbor, idsCache)],
      [] as Cell[]
    )
  }

  fillNeighbors(grid: Grid): void {
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
          this.neighbors.add(neighbor)
        }
      }
    }
  }
}