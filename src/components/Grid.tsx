import React, {useEffect, useState} from 'react'
import BombCell from 'components/BombCell'
import SafeCell from 'components/SafeCell'
import Cell from 'Cell'
import styled from 'styled-components'
import {useBooleanState, useSetstate} from 'hooks'
import {GridType} from 'types'
import {range} from 'utils'
import {NeighborFinder} from 'NeighborFinder'

interface GridProps {
  grid: GridType
  bombs: number
}

const CellRow = styled.div`
  display: flex;
`

export default function Grid({grid: gridProp, bombs}: GridProps) {
  const [isGameOver, finishTheGame, restartGame] = useBooleanState(false)
  const [isFirstMove, setFirstMove] = useState(true)
  const markedCells = useSetstate<string>()
  const revealedCells = useSetstate<string>()
  const [grid, setGrid] = useState(gridProp)

  useEffect(() => {
    markedCells.clear()
    revealedCells.clear()
    restartGame()
    setFirstMove(true)
    setGrid(gridProp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridProp])

  return (
    <div>
      {grid.map((row, i) => (
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
    if (isFirstMove) {
      fillGamePieces(cell, grid, bombs)
      setFirstMove(false)
    }
    if (markedCells.has(cell.id)) return
    const neighborFinder = new NeighborFinder(markedCells.getCopy())
    const neighbors = neighborFinder.getNeighborsToReveal(cell)
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
    if (isGameOver) return
    if (markedCells.has(cell.id)) {
      markedCells.remove([cell.id])
    } else if (!revealedCells.has(cell.id)) {
      markedCells.add([cell.id])
    }
  }

  function fillGamePieces(origin: Cell, grid: GridType, bombs: number): void {
    const bombOptions = grid.reduce(
      (options, row) => [...options, ...row.filter((cell) => !cell.isNeighborOf(origin))],
      []
    )
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
    setGrid(grid)
  }
}