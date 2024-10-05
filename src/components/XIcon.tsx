import { cn } from '@/utils.ts';

export function XIcon({ onClick }: { onClick: () => void }) {
  const strawClass = 'h-0.5 w-full absolute bg-contrast dark:bg-contrast-dark';
  return (
    <div
      className='relative flex w-6 cursor-pointer flex-col items-center justify-center gap-2'
      onClick={onClick}
    >
      <div className={cn('rotate-45', strawClass)} />
      <div className={cn('-rotate-45', strawClass)} />
    </div>
  );
}
