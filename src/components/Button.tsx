import React from 'react';
import { buttonClassName } from '@/classNames';

export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
}
