import styled from 'styled-components'

interface SafeCellProps {
  isRevealed: boolean
  isMarked: boolean
  bombsCount: number
}

const SafeCell = styled.span<SafeCellProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-style: solid;
  border-color: black;
  cursor: ${(props: SafeCellProps) => props.isRevealed ? 'initial' : 'pointer'};
  background-color: ${
    (props: SafeCellProps) => {
      if (props.isMarked) return 'lightcoral'
      if (props.isRevealed) return 'lightgrey'
      return 'initial'
    }
  };
  transition: background-color .1s ease-in-out;

  &:after {
    display: block;
    content: '${(props: SafeCellProps) => props.isRevealed ? props.bombsCount : ''}';
    text-align: center;
    line-height: 80%;
    font-size: ${(props: SafeCellProps) => props.isRevealed ? '2rem' : 0};
    width: 2rem;
    height: 2rem;
    transition: font-size .1s ease-in-out;
  }
`

export default SafeCell