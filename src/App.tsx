import { useState } from 'react';
import Cell from '@/Cell';
import { range } from '@/utils';
import { GridType } from '@/types';
import Grid from '@/components/Grid';
import { useInput } from '@/hooks';
import NumberInput from '@/components/Input';

function App() {
  const [grid, setGrid] = useState<GridType | null>(null);
  const [bombs, setBombs] = useInput(20);
  const [columns, setColumns] = useInput(10);
  const [rows, setRows] = useInput(10);

  return (
    <div className='flex flex-col items-center'>
      <div className='w-60 h-28 flex flex-col justify-between my-12'>
        <NumberInput label='Bombs' onChange={setBombs} value={bombs} />
        <NumberInput label='Columns' onChange={setColumns} value={columns} />
        <NumberInput label='Rows' onChange={setRows} value={rows} />
        <button onClick={loadNewGame} type='button'>
          Start a new game
        </button>
      </div>
      {grid && <Grid bombs={+bombs} grid={grid} />}
    </div>
  );

  function loadNewGame() {
    const newGrid = range(+rows).map((x) => {
      const cells = range(+columns).map((y) => new Cell(x, y));
      return { id: x.toString(), cells };
    });
    setGrid(newGrid);
  }
}

export default App;
