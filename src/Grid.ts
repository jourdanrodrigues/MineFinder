import {range} from './utils'
import Cell from 'Cell'

type RowType = Cell[]

export default class Grid extends Array<RowType> {
  constructor(rows: number, columns: number) {
    super()

    range(rows).forEach((rowIndex) => {
      const row: RowType = range(columns).map((columnIndex) => {
        const cell = new Cell(rowIndex, columnIndex)
        cell.isBomb = Math.floor(Math.random() * 10) % 4 === 0
        return cell
      })
      this.push(row)
    })

    this.forEach((row) => {
      row.forEach((cell) => {
        cell.fillNeighbors(this)
      })
    })
  }
}