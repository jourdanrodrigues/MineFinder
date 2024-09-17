import { NumberInput } from '@/components/Input.tsx';
import { useAppDispatch } from '@/redux/hooks.ts';
import {
  boardSlice,
  DEFAULT_BOMBS,
  DEFAULT_COLUMNS,
  DEFAULT_ROWS,
} from '@/redux/boardSlice.ts';
import { useState } from 'react';

export function Controls() {
  const [bombs, setBombs] = useState(DEFAULT_BOMBS);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [rows, setRows] = useState(DEFAULT_ROWS);
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
