import React, {useEffect, useState} from 'react'
import Cell from 'Cell'
import {range} from 'utils'
import {GridType} from 'types'
import Grid from './Grid'

const COLS = 10
const ROWS = COLS
const MAX_BOMBS = 20

function App() {
  const [grid, setGrid] = useState<GridType>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadNewGame, [])



  return (
    <div>
      <button onClick={loadNewGame}>Start a new game</button>
      {!!grid ? <Grid grid={grid}/> : 'Loading grid'}
    </div>
  )

  function loadNewGame() {
    setGrid(buildGrid(ROWS, COLS, MAX_BOMBS))
  }
}

export default App



function buildGrid(rows: number, columns: number, bombs: number): GridType {
  const grid: GridType = []
  const cells: Cell[] = []
  range(rows).forEach((rowIndex) => {
    grid.push(range(columns).map((columnIndex) => {
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

  grid.forEach((row) => {
    row.forEach((cell) => {
      cell.fillNeighbors(grid)
    })
  })
  return grid
}
