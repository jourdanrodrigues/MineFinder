import React, {useMemo} from 'react'
import styled from 'styled-components'
import SafeCell from 'components/SafeCell'
import BombCell from 'components/BombCell'
import {useBooleanState, useSetstate} from 'hooks'
import Cell from 'Cell'
import Grid from 'Grid'

const COLS = 10
const ROWS = COLS
const MAX_BOMBS = 20

const CellRow = styled.div`
  display: flex;
`

function App() {
  const [isGameOver, finishTheGame] = useBooleanState(false)
  const grid = useMemo(() => new Grid(ROWS, COLS, MAX_BOMBS), [])
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

