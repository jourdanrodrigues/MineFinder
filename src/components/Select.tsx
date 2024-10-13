import React from 'react';
import { cn } from '@/utils';
import { buttonClassName } from '@/classNames';

type Option<T> = { value: T; label: React.ReactNode };

export function Select<T extends string | number>({
  onChange,
  value,
  options,
  className,
}: {
  onChange: (value: T) => void;
  value: T;
  options: Option<T>[];
  className?: string;
}) {
  return (
    <select
      className={cn(
        'cursor-pointer appearance-none',
        buttonClassName,
        className,
      )}
      defaultValue={value}
      onChange={(e) => onChange(castNewValue(e.target.value))}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );

  function castNewValue(newValue: string): T {
    return (typeof value === 'number' ? +newValue : newValue) as T;
  }
}
