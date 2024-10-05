import React from 'react';

export function Button({
  children,
  onClick,
  suffix,
  onSuffixClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  suffix?: React.ReactNode;
  onSuffixClick?: () => void;
}) {
  return (
    <div className='flex divide-x-2 divide-contrast-dark rounded-lg border-2 border-contrast dark:border-contrast-dark dark:text-contrast-dark'>
      <button className='px-4 py-2' onClick={onClick}>
        {children}
      </button>
      {suffix && (
        <button className='px-4 py-2' onClick={onSuffixClick}>
          {suffix}
        </button>
      )}
    </div>
  );
}
