import styled from 'styled-components';

interface BombCellProps {
  isRevealed: boolean
  isMarked: boolean
}

const BombCell = styled.span<BombCellProps>`
  display: block;
  width: 3rem;
  height: 3rem;
  border-style: solid;
  border-color: black;
  cursor: ${(props: BombCellProps) => props.isRevealed ? 'initial' : 'pointer'};
  background-color: ${(props: BombCellProps) => props.isMarked ? 'lightcoral' : 'initial'};

  &:after {
    display: block;
    content: '';
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: relative;
    width: ${(props: BombCellProps) => props.isRevealed ? '2rem' : 0};
    height: ${(props: BombCellProps) => props.isRevealed ? '2rem' : 0};
    border-style: ${(props: BombCellProps) => props.isRevealed ? 'solid' : 'hidden'};
    border-width: ${(props: BombCellProps) => props.isRevealed ? 'medium' : 0};
    border-color: black;
    border-radius: 50%;
    transition: all .1s ease-in-out;
    transition-property: height, width, border-width;
  }
`;

export default BombCell;
