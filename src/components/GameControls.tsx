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
    <div className='flex max-w-60 flex-col items-center justify-between gap-1'>
      <NumberInput label='Bombs' onChange={setBombs} value={bombs} />
      <NumberInput label='Columns' onChange={setColumns} value={columns} />
      <NumberInput label='Rows' onChange={setRows} value={rows} />
      <button
        className='rounded-lg bg-contrast px-4 py-2 text-primary dark:bg-contrast-dark dark:text-primary-dark'
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
