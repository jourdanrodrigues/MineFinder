import React from 'react';
import { cn } from '@/utils.ts';
import { Button } from '@/components/Button.tsx';
import { XIcon } from '@/components/XIcon.tsx';

export function Modal({
  open,
  title,
  children,
  actionText,
  onAction,
  cancelText,
  onCancel,
}: {
  open: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
  cancelText?: React.ReactNode;
  actionText?: React.ReactNode;
  onAction?: () => void;
  onCancel?: () => void;
}) {
  const hasActions = !!(onCancel || actionText || onAction);
  return (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity',
        open ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
    >
      <div className='flex -translate-y-[10vh] flex-col gap-6 rounded-lg border-[1px] border-contrast bg-primary-canvas p-4 dark:border-contrast-dark dark:bg-primary-canvas-dark'>
        <div className='flex justify-between'>
          <h1 className='text-2xl dark:text-contrast-dark'>{title}</h1>
          {onCancel && <XIcon onClick={onCancel} />}
        </div>
        {children}
        {hasActions && (
          <div className='flex justify-end gap-2'>
            {onCancel && (
              <Button onClick={onCancel}>{cancelText || 'Cancel'}</Button>
            )}
            {actionText && onAction && (
              <Button onClick={onAction}>{actionText}</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
