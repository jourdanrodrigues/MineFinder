import {CellType, GridType} from 'types'

export function range(number: number): number[] {
  return Array.from(new Array(number).keys())
}

export function chainCall(...args: Array<() => void>): () => void {
  return () => args.forEach(func => func())
}

export function fillCellNeighborsAndBombs(grid: GridType, cell: CellType): number {
  let bombsAround = 0
  for (let rowIndex = cell.row - 1; rowIndex <= cell.row + 1; rowIndex++) {
    if (rowIndex < 0) continue
    if (rowIndex === grid.length) break
    const row = grid[rowIndex]
    for (let columnIndex = cell.column - 1; columnIndex <= cell.column + 1; columnIndex++) {
      if (columnIndex < 0 || (rowIndex === cell.row && columnIndex === cell.column)) continue
      if (columnIndex === row.length) break
      const neighbor = row[columnIndex]
      if (neighbor.isBomb) bombsAround += 1
      cell.neighbors.push(neighbor)
    }
  }
  cell.bombsAround = bombsAround
  return bombsAround
}