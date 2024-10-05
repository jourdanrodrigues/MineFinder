import React from 'react';

export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className='rounded-lg border-[1px] border-contrast px-4 py-2 dark:border-contrast-dark dark:text-contrast-dark'
      onClick={onClick}
    >
      {children}
    </button>
  );
}
