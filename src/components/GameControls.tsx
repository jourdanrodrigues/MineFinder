import { NumberInput } from '@/components/Input.tsx';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { boardSlice } from '@/redux/boardSlice.ts';

export function Controls() {
  const { bombCount, columnCount, rowCount } = useAppSelector(
    (state) => state.board,
  );
  const dispatch = useAppDispatch();

  return (
    <div className='my-12 flex h-28 w-60 flex-col justify-between'>
      <NumberInput
        label='Bombs'
        onChange={(e) =>
          dispatch(boardSlice.actions.setBombCount(+e.target.value))
        }
        value={bombCount}
      />
      <NumberInput
        label='Columns'
        onChange={(e) =>
          dispatch(boardSlice.actions.setColumnCount(+e.target.value))
        }
        value={columnCount}
      />
      <NumberInput
        label='Rows'
        onChange={(e) =>
          dispatch(boardSlice.actions.setRowCount(+e.target.value))
        }
        value={rowCount}
      />
      <button
        onClick={() => dispatch(boardSlice.actions.startNewGame())}
        type='button'
      >
        Start a new game
      </button>
    </div>
  );
}
