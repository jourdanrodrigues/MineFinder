import { cn } from '@/utils.ts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { selectBombMinusFlagCount, startNewGame } from '@/redux/boardSlice.ts';
import { Button } from '@/components/Button.tsx';
import { HamburgerIcon } from '@/components/HamburgerIcon.tsx';

export function TopBar({
  drawerOpen,
  onToggleDrawer,
  onSettingsClick,
}: {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  onSettingsClick: () => void;
}) {
  const missingBombs = useAppSelector(selectBombMinusFlagCount);

  const dispatch = useAppDispatch();

  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b border-contrast bg-primary-canvas px-6 dark:border-contrast-dark dark:bg-primary-canvas-dark transition-[left]',
        drawerOpen && 'left-48',
      )}
    >
      <HamburgerIcon active={drawerOpen} onClick={onToggleDrawer} />
      <Button
        suffix='⚙️'
        onClick={() => dispatch(startNewGame())}
        onSuffixClick={onSettingsClick}
      >
        New Game
      </Button>
      <span className='text-2xl dark:text-contrast-dark'>
        {missingBombs} 💣
      </span>
    </div>
  );
}
