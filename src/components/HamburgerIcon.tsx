import { cn } from '@/utils.ts';

export function HamburgerIcon({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  const className = 'h-0.5 w-8 bg-contrast dark:bg-contrast-dark';
  return (
    <div className='flex cursor-pointer flex-col gap-2' onClick={onClick}>
      <div
        className={cn(
          'translate-transform',
          active && 'rotate-45 translate-y-[10px]',
          className,
        )}
      />
      <div
        className={cn('translate-transform', active && '-rotate-45', className)}
      />
      <div
        className={cn(
          'opacity-100 transition-opacity',
          active && 'opacity-0',
          className,
        )}
      />
    </div>
  );
}
