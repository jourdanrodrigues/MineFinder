import React, {useMemo} from 'react'
import styled from 'styled-components'
import Cell from 'components/Cell'
import {range} from 'utils'
import BombCell from 'components/BombCell'
import {useBooleanState} from './hooks'

interface CellType {
  isBomb: boolean
}

type RowType = CellType[]
type GridType = RowType[]

const COLS = 10
const ROWS = COLS
const MAX_BOMBS = 10

const CellRow = styled.div`
  display: flex;
`

function App() {
  const [isGameOver, finishTheGame] = useBooleanState(false)
  const grid: GridType = useMemo(() => {
    let bombsCount = 0
    return range(ROWS).map(() => range(COLS).map(() => {
      const isBomb = bombsCount < MAX_BOMBS ? Math.floor(Math.random() * 10) % 4 === 0 : false
      if (isBomb) bombsCount += 1
      return {isBomb}
    }))
  }, [])

  const rows = grid.map((row, rowIndex) => (
    <CellRow>
      {row.map((cell, columnIndex) => {
        return cell.isBomb
          ? <BombCell isGameOver={isGameOver} onClick={finishTheGame}/>
          : <Cell isGameOver={isGameOver} bombsAround={countBombsAround(grid, columnIndex, rowIndex)}/>
      })}
    </CellRow>
  ))

  return <div>{rows}</div>
}

export default App

function countBombsAround(grid: GridType, columnIndex: number, rowIndex: number): number {
  let bombsAround = 0
  for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
    if (i < 0) continue
    if (i === grid.length) break
    const row = grid[i]
    for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
      if (j < 0 || (i === rowIndex && j === columnIndex)) continue
      if (j === row.length) break
      if (row[j].isBomb) bombsAround += 1
    }
  }
  return bombsAround
}
