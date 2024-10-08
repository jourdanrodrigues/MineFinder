import { useAppDispatch } from '@/redux/hooks';
import {
  DEFAULT_BOMBS,
  DEFAULT_COLUMNS,
  DEFAULT_ROWS,
  startNewGame,
} from '@/redux/boardSlice';
import { useState } from 'react';
import { Modal } from '@/components/Modal';

export function GameControlsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [bombs, setBombs] = useState(DEFAULT_BOMBS);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const dispatch = useAppDispatch();

  return (
    <Modal
      title='Game Settings'
      actionText='Start New Game'
      open={open}
      onAction={() => {
        dispatch(startNewGame({ bombs, columns, rows }));
        onClose();
      }}
      onCancel={onClose}
    >
      <div className='m-2 flex flex-col items-center justify-between gap-2'>
        <div className='grid grid-cols-2 gap-y-2'>
          <span className='w-full dark:text-contrast-dark'>Bombs:</span>
          <NumberInput value={bombs} onChange={setBombs} />
          <span className='w-full dark:text-contrast-dark'>Columns:</span>
          <NumberInput value={columns} onChange={setColumns} />
          <span className='w-full dark:text-contrast-dark'>Rows:</span>
          <NumberInput value={rows} onChange={setRows} />
        </div>
      </div>
    </Modal>
  );
}

function NumberInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <input
      className='w-full rounded-lg border border-contrast bg-transparent px-2 dark:border-contrast-dark dark:text-contrast-dark'
      onChange={(e) => {
        const newValue = +e.target.value.replace(/\D/g, '');
        onChange(Number.isNaN(newValue) ? 0 : newValue);
      }}
      value={value}
    />
  );
}
