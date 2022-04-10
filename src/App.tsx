import React, {useMemo} from 'react'
import styled from 'styled-components'
import {useBooleanState} from 'hooks'

interface CellProps {
  isBomb: boolean
  x: number
  y: number
}

interface CellWrapperProps {
  isBomb: boolean
  isRevealed: boolean
}

interface CellType {
  isBomb: boolean
}

type RowType = CellType[]
type GridType = RowType[]

const COLS = 5;
const ROWS = COLS;

const CellRow = styled.div`
  display: flex;
`

const CellWrapper = styled.span<CellWrapperProps>`
  display: block;
  width: 3rem;
  height: 3rem;
  border-style: solid;
  border-color: black;
  
  &:after {
    display: ${(props: CellWrapperProps) => props.isBomb && props.isRevealed ? 'block' : 'none'};
    content: '';
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    position: relative;
    width: 2rem;
    height: 2rem;
    border-style: solid;
    border-width: medium;
    border-color: black;
    border-radius: 50%;
  }
`

function App() {
  const grid: GridType = useMemo(() => {
    return range(ROWS).map(() => range(COLS).map(() => {
      const isBomb = Math.floor(Math.random() * 10) % 2 === 0
      return {isBomb}
    }))
  }, [])

  const rows = grid.map((row, y) => (
    <CellRow>
      {row.map((cell, x) =>  <Cell isBomb={cell.isBomb} x={x} y={y}/>)}
    </CellRow>
  ))

  return <div>{rows}</div>
}

export default App;

function Cell({isBomb}: CellProps): JSX.Element  {
  const [isRevealed, reveal] = useBooleanState()
  return <CellWrapper isBomb={isBomb} isRevealed={isRevealed} onClick={reveal}/>
}

function range(number: number): number[] {
  return Array.from(new Array(number).keys())
}
