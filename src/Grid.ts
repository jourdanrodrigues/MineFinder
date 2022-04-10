import {range} from './utils'
import Cell from 'Cell'

type RowType = Cell[]

export default class Grid extends Array<RowType> {
  constructor(rows: number, columns: number, bombs: number) {
    super()

    const cells: Cell[] = []
    range(rows).forEach((rowIndex) => {
      this.push(range(columns).map((columnIndex) => {
        const cell = new Cell(rowIndex, columnIndex)
        cells.push(cell)
        return cell
      }))
    })

    const bombOptions = cells.concat()
    range(bombs).forEach(() => {
      const i = Math.floor(Math.random() * bombOptions.length)
      bombOptions[i].isBomb = true
      bombOptions.splice(i, 1)
    })

    this.forEach((row) => {
      row.forEach((cell) => {
        cell.fillNeighbors(this)
      })
    })
  }
}