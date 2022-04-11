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
  const markedCells = useSetstate<string>()
  const revealedCells = useSetstate<string>()

  const rows = grid.map((row, i) => (
    <CellRow key={i}>
      {row.map((cell) => {
        const isMarked = markedCells.has(cell.id)
        const isRevealed = revealedCells.has(cell.id)
        if (cell.isBomb) {
          if (isRevealed) {
            revealBomb(cell)
          }
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
            isRevealed={isGameOver || (!isMarked && revealedCells.has(cell.id))}
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
    if (markedCells.has(cell.id)) return
    const neighbors = cell.getNeighborsToReveal(markedCells.getCopy())
    revealedCells.add([cell.id, ...neighbors.map(({id}) => id)])
  }

  function revealBomb(bomb: Cell, force: boolean = false): void {
    if (markedCells.has(bomb.id) && !force) return
    markedCells.clear()
    revealedCells.clear()
    finishTheGame()
  }

  function mark(e: React.MouseEvent<HTMLSpanElement>, cell: Cell): void {
    e.preventDefault()
    if (markedCells.has(cell.id)) {
      markedCells.remove([cell.id])
    } else if (!revealedCells.has(cell.id)) {
      markedCells.add([cell.id])
    }
  }
}

export default App

