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

  addNeighbor(neighbor: Cell): void {
    this.neighbors.add(neighbor)
  }

  addBomb(bomb: Cell): void {
    this.bombs.add(bomb)
  }

  getBombsCount(): number {
    return this.bombs.size
  }

  getSafeNeighborsIds(): string[] {
    return Array.from(this.neighbors.values()).map((neighbor) => neighbor.id)
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
          this.addBomb(neighbor)
        } else {
          this.addNeighbor(neighbor)
        }
      }
    }
  }
}