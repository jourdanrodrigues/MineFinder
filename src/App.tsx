import React, {useEffect, useState} from 'react'
import Cell from 'Cell'
import {range} from 'utils'
import {GridType} from 'types'
import Grid from './Grid'

const COLS = 20
const ROWS = COLS
const MAX_BOMBS = 40

function App() {
  const [grid, setGrid] = useState<GridType>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadNewGame, [])

  return (
    <div>
      <button onClick={loadNewGame}>Start a new game</button>
      {!!grid ? <Grid grid={grid} bombs={MAX_BOMBS}/> : 'Loading grid'}
    </div>
  )

  function loadNewGame() {
    setGrid(buildGrid(ROWS, COLS))
  }
}

export default App


function buildGrid(rows: number, columns: number): GridType {
  return range(rows).map((rowIndex) => range(columns).map((columnIndex) => new Cell(rowIndex, columnIndex)))
}
