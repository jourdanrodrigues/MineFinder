import React from 'react'
import styled from 'styled-components'
import {useBooleanState} from 'hooks'

interface CellProps {
  isBomb: boolean
  x: number
  y: number
}

interface CellWrapperProps {
  showBomb: boolean
  isRevealed: boolean
  exposeNeighbors: boolean
}

const CellWrapper = styled.span<CellWrapperProps>`
  display: block;
  width: 3rem;
  height: 3rem;
  border-style: solid;
  border-color: black;
  cursor: ${(props: CellWrapperProps) => props.isRevealed ? 'initial' : 'pointer'};
  background-color: ${(props: CellWrapperProps) => props.exposeNeighbors ? 'lightgrey' : 'initial'};
  transition: background-color .1s ease-in-out;
  
  &:after {
    display: block;
    content: '';
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    position: relative;
    width: ${(props: CellWrapperProps) => props.showBomb ? '2rem' : 0};
    height: ${(props: CellWrapperProps) => props.showBomb ? '2rem' : 0};
    border-style: ${(props: CellWrapperProps) => props.showBomb ? 'solid' : 'hidden'};
    border-width: ${(props: CellWrapperProps) => props.showBomb ? 'medium' : 0};
    border-color: black;
    border-radius: 50%;
    transition: all .1s ease-in-out;
    transition-property: height, width, border-style;
  }
`

export default function Cell({isBomb}: CellProps): JSX.Element  {
  const [isRevealed, reveal] = useBooleanState()
  return (
    <CellWrapper
      isRevealed={isRevealed}
      showBomb={isBomb && isRevealed}
      exposeNeighbors={!isBomb && isRevealed}
      onClick={reveal}
    />
  )
}