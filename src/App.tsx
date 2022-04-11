import React, {useState} from 'react'
import Cell from 'Cell'
import {range} from 'utils'
import {GridType} from 'types'
import Grid from 'Grid'
import {useInput} from 'hooks'

function App() {
  const [grid, setGrid] = useState<GridType>()
  const [bombs, setBombs] = useInput()
  const [columns, setColumns] = useInput()
  const [rows, setRows] = useInput()

  return (
    <div>
      <button onClick={loadNewGame}>Start a new game</button>
      <label>Bombs: <input type="number" onChange={setBombs} value={bombs}/></label>
      <label>Columns: <input type="number" onChange={setColumns} value={columns}/></label>
      <label>Rows: <input type="number" onChange={setRows} value={rows}/></label>
      {!!grid ? <Grid grid={grid} bombs={+bombs}/> : 'Loading grid'}
    </div>
  )

  function loadNewGame() {
    setGrid(buildGrid(+rows, +columns))
  }
}

export default App


function buildGrid(rows: number, columns: number): GridType {
  return range(rows).map((rowIndex) => range(columns).map((columnIndex) => new Cell(rowIndex, columnIndex)))
}
