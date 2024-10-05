import { cn } from '@/utils.ts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { selectFlagCount, startNewGame } from '@/redux/boardSlice.ts';
import { Button } from '@/components/Button.tsx';

export function TopBar({ onSettingsClick }: { onSettingsClick: () => void }) {
  const bombCount = useAppSelector((state) => state.board.bombCount);
  const flagCount = useAppSelector(selectFlagCount);

  const dispatch = useAppDispatch();

  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b border-contrast bg-primary-canvas px-6 dark:border-contrast-dark dark:bg-primary-canvas-dark',
      )}
    >
      <Button
        suffix='⚙️'
        onClick={() => dispatch(startNewGame())}
        onSuffixClick={onSettingsClick}
      >
        New Game
      </Button>
      <span className='flex min-w-32 justify-end gap-2 text-2xl dark:text-contrast-dark'>
        <span>{flagCount} ⛳️</span>
        <span>{bombCount} 💣</span>
      </span>
    </div>
  );
}
