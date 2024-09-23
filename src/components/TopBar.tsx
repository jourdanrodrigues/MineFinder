import { cn } from '@/utils.ts';
import { useAppSelector } from '@/redux/hooks.ts';
import { selectBombMinusFlagCount } from '@/redux/boardSlice.ts';

export function TopBar({
  drawerOpen,
  onToggleDrawer,
}: {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
}) {
  const missingBombs = useAppSelector(selectBombMinusFlagCount);

  const hamburgerLineClass = 'h-0.5 w-8 bg-contrast dark:bg-contrast-dark';

  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b border-contrast bg-primary-canvas px-6 dark:border-contrast-dark dark:bg-primary-canvas-dark transition-[left]',
        drawerOpen && 'left-48',
      )}
    >
      <div
        className='flex cursor-pointer flex-col gap-2'
        onClick={onToggleDrawer}
      >
        <div
          className={cn(
            'translate-transform',
            drawerOpen && 'rotate-45 translate-y-[10px]',
            hamburgerLineClass,
          )}
        />
        <div
          className={cn(
            'translate-transform',
            drawerOpen && '-rotate-45',
            hamburgerLineClass,
          )}
        />
        <div
          className={cn(
            'opacity-100 transition-opacity',
            drawerOpen && 'opacity-0',
            hamburgerLineClass,
          )}
        />
      </div>
      <span className='text-2xl dark:text-contrast-dark'>
        {missingBombs} 💣
      </span>
    </div>
  );
}
