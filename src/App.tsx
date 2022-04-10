import React, {useMemo} from 'react'
import styled from 'styled-components'
import Cell from 'components/Cell'
import {range} from 'utils'

interface CellType {
  isBomb: boolean
}

type RowType = CellType[]
type GridType = RowType[]

const COLS = 5;
const ROWS = COLS;

const CellRow = styled.div`
  display: flex;
`

function App() {
  const grid: GridType = useMemo(() => {
    return range(ROWS).map(() => range(COLS).map(() => {
      const isBomb = Math.floor(Math.random() * 10) % 2 === 0
      return {isBomb}
    }))
  }, [])

  const rows = grid.map((row, y) => (
    <CellRow>
      {row.map((cell, x) =>  <Cell isBomb={cell.isBomb} x={x} y={y}/>)}
    </CellRow>
  ))

  return <div>{rows}</div>
}

export default App;
