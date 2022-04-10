import React, {useMemo} from 'react'
import styled from 'styled-components'
import SafeCell from 'components/SafeCell'
import {range} from 'utils'
import BombCell from 'components/BombCell'
import {useBooleanState, useSetstate} from 'hooks'
import {GridType} from 'types'
import Cell from 'Cell'

const COLS = 10
const ROWS = COLS

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
        return <SafeCell key={cell.id} isRevealed={isRevealed} cell={cell} onClick={() => reveal(cell)}/>
      })}
    </CellRow>
  ))

  return <div>{rows}</div>

  function reveal(cell: Cell): void {
    if (cell.getBombsCount() !== 0) {
      revealed.add(cell.id)
    } else {
      revealed.addMany([cell.id, ...cell.getSafeNeighborsIds()])
    }
  }
}

export default App

function initializeGrid(): GridType {
  const grid: GridType = range(ROWS).map((row) => range(COLS).map((column) => {
    const cell = new Cell(row, column)
    cell.isBomb = Math.floor(Math.random() * 10) % 4 === 0
    return cell
  }))

  grid.forEach((row) => {
    row.forEach((cell) => {
      cell.fillNeighbors(grid)
    })
  })
  return grid
}

