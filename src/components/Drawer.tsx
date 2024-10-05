import React from 'react';
import { cn } from '@/utils.ts';

export function Drawer({
  children,
  open,
}: {
  children?: React.ReactNode;
  open: boolean;
}) {
  return (
    <aside
      className={cn(
        'flex flex-col justify-start items-center gap-6 fixed left-0 top-0 h-full w-48 border-r border-contrast bg-primary-canvas dark:border-contrast-dark dark:bg-primary-canvas-dark transition-transform duration-600',
        open ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      {children}
    </aside>
  );
}
