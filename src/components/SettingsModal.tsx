import { useAppDispatch } from '@/redux/hooks';
import { DIFFICULTIES, startNewGame } from '@/redux/boardSlice';
import { useState } from 'react';
import { Modal } from '@/components/Modal';

type Difficulty = keyof typeof DIFFICULTIES;

export function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const dispatch = useAppDispatch();

  return (
    <Modal
      title='Game Settings'
      actionText='Start New Game'
      open={open}
      onAction={() => {
        dispatch(startNewGame(DIFFICULTIES[difficulty]));
        onClose();
      }}
      onCancel={onClose}
    >
      <select
        className='w-full rounded-lg border border-contrast bg-transparent px-2 dark:border-contrast-dark dark:text-contrast-dark'
        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        value={difficulty}
      >
        {Object.keys(DIFFICULTIES).map((key) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>
    </Modal>
  );
}
