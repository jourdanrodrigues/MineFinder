import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React, { useCallback, useState } from 'react';

export function range(number: number): number[] {
  return Array.from(new Array(number).keys());
}

export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}

export function getMouseButtonClicked(
  e: React.MouseEvent,
): 'left' | 'middle' | 'right' {
  if (e.button === 0 && e.metaKey) return 'middle'; // Cmd + left
  if (e.button === 0) return 'left';
  if (e.button === 1) return 'middle';
  if (e.button === 2) return 'right';
  return 'left';
}

export function areNeighbors(
  cellA: { x: number; y: number },
  cellB: { x: number; y: number },
): boolean {
  return (
    cellA.x >= cellB.x - 1 &&
    cellA.x <= cellB.x + 1 &&
    cellA.y >= cellB.y - 1 &&
    cellA.y <= cellB.y + 1
  );
}

export function useForceRerender() {
  const [value, setValue] = useState(false);
  // We want to have this function cause a rerender if used as a dependency
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(() => setValue((value) => !value), [value]);
}
