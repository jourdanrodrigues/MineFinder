import React from 'react'
import styled from 'styled-components'
import {useBooleanState} from 'hooks'
import {chainCall} from 'utils'

interface BombCellProps {
  onClick: () => void
  isGameOver: boolean
}

interface WrapperProps {
  isRevealed: boolean
}

const Wrapper = styled.span<WrapperProps>`
  display: block;
  width: 3rem;
  height: 3rem;
  border-style: solid;
  border-color: black;
  cursor: ${(props: WrapperProps) => props.isRevealed ? 'initial' : 'pointer'};
  
  &:after {
    display: block;
    content: '';
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: relative;
    width: ${(props: WrapperProps) => props.isRevealed ? '2rem' : 0};
    height: ${(props: WrapperProps) => props.isRevealed ? '2rem' : 0};
    border-style: ${(props: WrapperProps) => props.isRevealed ? 'solid' : 'hidden'};
    border-width: ${(props: WrapperProps) => props.isRevealed ? 'medium' : 0};
    border-color: black;
    border-radius: 50%;
    transition: all .1s ease-in-out;
    transition-property: height, width, border-width;
  }
`

export default function BombCell({onClick, isGameOver}: BombCellProps) {
  const [isRevealed, reveal] = useBooleanState()
  return <Wrapper isRevealed={isGameOver || isRevealed} onClick={chainCall(onClick, reveal)}/>
}