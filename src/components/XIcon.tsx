import { cn } from '@/utils';

export function XIcon({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  const strawClass = 'h-0.5 w-full absolute bg-contrast dark:bg-contrast-dark';
  return (
    <div
      className={cn(
        'relative flex w-6 cursor-pointer flex-col items-center justify-center gap-2',
        className,
      )}
      onClick={onClick}
    >
      <div className={cn('rotate-45', strawClass)} />
      <div className={cn('-rotate-45', strawClass)} />
    </div>
  );
}
