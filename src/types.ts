export interface CellType {
  id: string
  isBomb: boolean
  row: number
  column: number
  neighbors: CellType[]
  bombs: CellType[]
}

export type RowType = CellType[]
export type GridType = RowType[]