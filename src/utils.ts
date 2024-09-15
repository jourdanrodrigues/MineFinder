import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';

export function range(number: number): number[] {
  return Array.from(new Array(number).keys());
}

export class SuperSet<T> extends Set<T> {
  difference(other: Set<T> | SuperSet<T> | T[]): SuperSet<T> {
    return new SuperSet([
      ...Array.from(this).filter((item) => !new Set(other).has(item)),
    ]);
  }

  union(other: Set<T> | SuperSet<T> | T[]): SuperSet<T> {
    return new SuperSet([...Array.from(this), ...Array.from(other)]);
  }

  intersection(other: Set<T> | SuperSet<T> | T[]): SuperSet<T> {
    return new SuperSet([
      ...Array.from(this).filter((item) => new Set(other).has(item)),
    ]);
  }
}

export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}

export function getMouseButtonClicked(
  e: React.MouseEvent,
): 'left' | 'middle' | 'right' {
  // event.button === 0  left, event.button === 1 middle, event.button === 2  right
  if (e.button === 0) return 'left';
  if (e.button === 1) return 'middle';
  if (e.button === 2) return 'right';
  return 'left';
}
