import React, {useMemo} from 'react'
import styled from 'styled-components'
import Cell from 'components/Cell'
import {fillCellNeighborsAndBombs, range} from 'utils'
import BombCell from 'components/BombCell'
import {useBooleanState, useSetstate} from 'hooks'
import {GridType, CellType} from 'types'

const COLS = 10
const ROWS = COLS
const MAX_BOMBS = 10

const CellRow = styled.div`
  display: flex;
`

function App() {
  const [isGameOver, finishTheGame] = useBooleanState(false)
  const grid: GridType = useMemo(initializeGrid, [])
  const revealed = useSetstate()

  const rows = grid.map((row, i) => (
    <CellRow key={i}>
      {row.map((cell) => {
        if (cell.isBomb) {
          return <BombCell key={cell.id} isRevealed={isGameOver} onClick={finishTheGame}/>
        }
        const isRevealed = isGameOver || revealed.data.has(cell.id)
        return <Cell key={cell.id} isRevealed={isRevealed} cell={cell} onClick={() => reveal(cell)}/>
      })}
    </CellRow>
  ))

  return <div>{rows}</div>

  function reveal(cell: CellType): void {
    if (cell.bombsAround !== 0) {
      revealed.add(cell.id)
    } else {
      revealed.addMany([cell.id, ...cell.neighbors.map((neighbor) => neighbor.id)])
    }
  }
}

export default App

function initializeGrid(): GridType {
  let bombsCount = 0
  const grid: GridType = range(ROWS).map((row) => range(COLS).map((column) => {
    const isBomb = bombsCount < MAX_BOMBS ? Math.floor(Math.random() * 10) % 4 === 0 : false
    if (isBomb) bombsCount += 1
    return {isBomb, row, column, neighbors: [], bombsAround: 0, id: crypto.randomUUID()} as CellType
  }))

  grid.forEach((row) => {
    row.forEach((cell) => {
      fillCellNeighborsAndBombs(grid, cell)
    })
  })
  return grid
}

