import { cn } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectFlagCount,
  selectIsGameWon,
  startNewGame,
} from '@/redux/boardSlice';
import { Button } from '@/components/Button';

export function TopBar({ onSettingsClick }: { onSettingsClick: () => void }) {
  const isGameWon = useAppSelector(selectIsGameWon);
  const bombCount = useAppSelector((state) => state.board.bombCount);
  const flagCount = useAppSelector(selectFlagCount);

  const dispatch = useAppDispatch();

  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b border-contrast bg-primary-canvas px-6 dark:border-contrast-dark dark:bg-primary-canvas-dark',
      )}
    >
      <div className='flex justify-center gap-2'>
        <Button onClick={onSettingsClick}>⚙️</Button>
        <Button onClick={() => dispatch(startNewGame())}>New Game</Button>
      </div>
      <span className='flex min-w-32 justify-end gap-2 text-2xl dark:text-contrast-dark'>
        <span>{isGameWon ? 0 : flagCount} ⛳️</span>
        <span>{bombCount} 💣</span>
      </span>
    </div>
  );
}
