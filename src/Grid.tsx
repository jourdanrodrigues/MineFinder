import React, {useEffect} from 'react'
import BombCell from 'components/BombCell'
import SafeCell from 'components/SafeCell'
import Cell from 'Cell'
import styled from 'styled-components'
import {useBooleanState, useSetstate} from './hooks'
import {GridType} from 'types'

interface GridProps {
  grid: GridType
}

const CellRow = styled.div`
  display: flex;
`

export default function Grid({grid}: GridProps) {
  const [isGameOver, finishTheGame, restartGame] = useBooleanState(false)
  const markedCells = useSetstate<string>()
  const revealedCells = useSetstate<string>()

  useEffect(() => {
    markedCells.clear()
    revealedCells.clear()
    restartGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid])

  return (
    <div>
      {(grid || []).map((row, i) => (
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
      ))}
    </div>
  )

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