export interface CellType {
  id: string
  isBomb: boolean
  row: number
  column: number
  neighbors: CellType[]
  bombsAround: number
}

export type RowType = CellType[]
export type GridType = RowType[]