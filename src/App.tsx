import { useState } from 'react';
import Cell from '@/Cell';
import { range } from '@/utils';
import { GridType } from '@/types';
import Grid from '@/components/Grid';
import { useInput } from '@/hooks';
import NumberInput from '@/components/Input';

const DEFAULT_COLUMNS = 10;
const DEFAULT_ROWS = 10;
const DEFAULT_BOMBS = 20;
const DEFAULT_GRID = getNewGrid({
  rows: DEFAULT_ROWS,
  columns: DEFAULT_COLUMNS,
});

function App() {
  const [grid, setGrid] = useState<GridType>(DEFAULT_GRID);
  const [bombs, setBombs] = useInput(DEFAULT_BOMBS);
  const [columns, setColumns] = useInput(DEFAULT_COLUMNS);
  const [rows, setRows] = useInput(DEFAULT_ROWS);

  return (
    <div className='flex flex-col items-center'>
      <div className='w-60 h-28 flex flex-col justify-between my-12'>
        <NumberInput label='Bombs' onChange={setBombs} value={bombs} />
        <NumberInput label='Columns' onChange={setColumns} value={columns} />
        <NumberInput label='Rows' onChange={setRows} value={rows} />
        <button
          onClick={() => setGrid(getNewGrid({ rows, columns }))}
          type='button'
        >
          Start a new game
        </button>
      </div>
      <Grid bombs={+bombs} grid={grid} />
    </div>
  );
}

export default App;

function getNewGrid({
  rows,
  columns,
}: {
  rows: string | number;
  columns: string | number;
}) {
  return range(+rows).map((x) => {
    const cells = range(+columns).map((y) => new Cell(x, y));
    return { id: x.toString(), cells };
  });
}
