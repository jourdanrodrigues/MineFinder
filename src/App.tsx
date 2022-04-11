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
  const marked = useSetstate()
  const revealed = useSetstate()

  const rows = grid.map((row, i) => (
    <CellRow key={i}>
      {row.map((cell) => {
        const isMarked = marked.has(cell.id)
        if (cell.isBomb) {
          return (
            <BombCell
              key={cell.id}
              isRevealed={isGameOver}
              onClick={() => revealBomb(cell)}
              isMarked={isMarked}
              onContextMenu={(e) => mark(e, cell)}
            />
          )
        }
        return (
          <SafeCell
            key={cell.id}
            bombsCount={cell.getBombsCount()}
            isRevealed={!isMarked && (isGameOver || revealed.has(cell.id))}
            onClick={() => reveal(cell)}
            isMarked={isMarked}
            onContextMenu={(e) => mark(e, cell)}
          />
        )
      })}
    </CellRow>
  ))

  return <div>{rows}</div>

  function reveal(cell: Cell): void {
    if (marked.has(cell.id)) return
    revealed.add([cell.id, ...cell.getSafeNeighbors().map(({id}) => id)])
  }

  function revealBomb(bomb: Cell): void {
    if (!marked.has(bomb.id)) {
      marked.clear()
      finishTheGame()
    }
  }

  function mark(e: React.MouseEvent<HTMLSpanElement>, cell: Cell): void {
    e.preventDefault()
    if (marked.has(cell.id)) {
      marked.remove([cell.id])
    } else if (!revealed.has(cell.id)) {
      marked.add([cell.id])
    }
  }
}

export default App

