import React, {useState} from 'react'
import Cell from 'Cell'
import {range} from 'utils'
import {GridType} from 'types'
import Grid from 'components/Grid'
import {useInput} from 'hooks'
import styled from 'styled-components'
import NumberInput from './components/Input'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Controls = styled.div`
  width: 15rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 3rem;
  margin-bottom: 3rem;
`

function App() {
  const [grid, setGrid] = useState<GridType | null>(null)
  const [bombs, setBombs] = useInput(20)
  const [columns, setColumns] = useInput(10)
  const [rows, setRows] = useInput(10)

  return (
    <Wrapper>
      <Controls>
        <NumberInput label="Bombs" onChange={setBombs} value={bombs}/>
        <NumberInput label="Columns" onChange={setColumns} value={columns}/>
        <NumberInput label="Rows" onChange={setRows} value={rows}/>
        <button onClick={loadNewGame}>Start a new game</button>
      </Controls>
      {grid && <Grid grid={grid} bombs={+bombs}/>}
    </Wrapper>
  )

  function loadNewGame() {
    setGrid(buildGrid(+rows, +columns))
  }
}

export default App


function buildGrid(rows: number, columns: number): GridType {
  return range(rows).map((rowIndex) => range(columns).map((columnIndex) => new Cell(rowIndex, columnIndex)))
}
