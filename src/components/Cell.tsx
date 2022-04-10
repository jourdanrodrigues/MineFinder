import React from 'react'
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

export default function Cell({isBomb}: CellProps): JSX.Element  {
  const [isRevealed, reveal] = useBooleanState()
  return <CellWrapper isBomb={isBomb} isRevealed={isRevealed} onClick={reveal}/>
}