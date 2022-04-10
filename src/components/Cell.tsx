import React from 'react'
import styled from 'styled-components'
import {useBooleanState} from 'hooks'

interface CellProps {
  bombsAround: number
  isGameOver: boolean
}

interface WrapperProps {
  bombsAround: number
  isRevealed: boolean
}

const Wrapper = styled.span<WrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-style: solid;
  border-color: black;
  cursor: ${(props: WrapperProps) => props.isRevealed ? 'initial' : 'pointer'};
  background-color: ${(props: WrapperProps) => props.isRevealed ? 'lightgrey' : 'initial'};
  transition: background-color .1s ease-in-out;

  &:after {
    display: block;
    content: '${(props: WrapperProps) => props.isRevealed ? props.bombsAround : ''}';
    text-align: center;
    line-height: 80%;
    font-size: ${(props: WrapperProps) => props.isRevealed ? '2rem' : 0};
    width: 2rem;
    height: 2rem;
    transition: font-size .1s ease-in-out;
  }
`

export default function Cell({bombsAround, isGameOver}: CellProps): JSX.Element {
  const [isRevealed, reveal] = useBooleanState()
  return (
    <Wrapper isRevealed={isGameOver || isRevealed} bombsAround={bombsAround} onClick={reveal}/>
  )
}