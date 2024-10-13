import { useAppDispatch } from '@/redux/hooks';
import { DIFFICULTIES, startNewGame } from '@/redux/boardSlice';
import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { Select } from '@/components/Select';

type Difficulty = keyof typeof DIFFICULTIES;

const DIFFICULTY_OPTIONS = Object.keys(DIFFICULTIES).map((option) => ({
  value: option as Difficulty,
  label: option.charAt(0).toUpperCase() + option.slice(1),
}));

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
      <Select
        className='w-full'
        onChange={setDifficulty}
        options={DIFFICULTY_OPTIONS}
        value={difficulty}
      />
    </Modal>
  );
}
