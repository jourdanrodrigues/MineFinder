import { NumberInput } from '@/components/Input.tsx';
import { useAppDispatch } from '@/redux/hooks.ts';
import { boardSlice } from '@/redux/boardSlice.ts';
import { useState } from 'react';

export function Controls() {
  const [bombs, setBombs] = useState(20);
  const [columns, setColumns] = useState(10);
  const [rows, setRows] = useState(10);
  const dispatch = useAppDispatch();

  return (
    <div className='my-12 flex h-28 w-60 flex-col justify-between'>
      <NumberInput
        label='Bombs'
        onChange={(e) => setBombs(+e.target.value)}
        value={bombs}
      />
      <NumberInput
        label='Columns'
        onChange={(e) => setColumns(+e.target.value)}
        value={columns}
      />
      <NumberInput
        label='Rows'
        onChange={(e) => setRows(+e.target.value)}
        value={rows}
      />
      <button
        onClick={() =>
          dispatch(boardSlice.actions.startNewGame({ bombs, columns, rows }))
        }
        type='button'
      >
        Start a new game
      </button>
    </div>
  );
}
