import React, { useState, useMemo, useRef } from 'react';
import { SuperSet } from '@/utils';

interface SetState<T> {
  has: (item: T) => boolean;
  add: (items: T[] | SuperSet<T>) => void;
  remove: (items: T[] | SuperSet<T>) => void;
  clear: () => void;
  getCopy: () => SuperSet<T>;
}

export function useSetState<T>(): SetState<T> {
  const [object, setObject] = useState<SuperSet<T>>(new SuperSet());
  return useMemo(
    () => ({
      getCopy: () => new SuperSet(object),
      has: (item) => object.has(item),
      add: (items) => setObject((state) => new SuperSet([...state, ...items])),
      remove: (items) => {
        const setItems = new SuperSet(items);
        setObject(
          (state) =>
            new SuperSet([...state].filter((item) => !setItems.has(item))),
        );
      },
      clear: () => setObject(new SuperSet()),
    }),
    [object],
  );
}

export function useInput(
  initialState?: string | number,
): [string, React.ChangeEventHandler<HTMLInputElement>] {
  const [value, setValue] = useState<string>('' + (initialState ?? ''));
  return [
    value,
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
  ];
}

export function useFocusableContent() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [{ x, y }, setTranslate] = useState({ x: 0, y: 0 });

  const hoverProps = useMemo((): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > => {
    function handleMouseMove(e: MouseEvent) {
      if (!containerRef.current || !contentRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      const maxX = (containerRect.width - contentRect.width) / 2;
      const maxY = (containerRect.height - contentRect.height) / 2;

      const toTopLeftX = e.clientX - containerRect.x;
      const toTopLeftY = e.clientY - containerRect.y;

      const toMiddleX = containerRect.width / 2 - toTopLeftX;
      const toMiddleY = containerRect.height / 2 - toTopLeftY;

      const newX = Math.min(Math.max(toMiddleX * 1.5, maxX), -maxX);
      const newY = Math.min(Math.max(toMiddleY * 1.5, maxY), -maxY);

      const canGoX = contentRect.width > containerRect.width;
      const canGoY = contentRect.height > containerRect.height;

      setTranslate({ x: canGoX ? newX : 0, y: canGoY ? newY : 0 });
    }

    return {
      onMouseEnter: () => {
        if (!containerRef.current) return;
        containerRef.current.addEventListener('mousemove', handleMouseMove);
      },
      onMouseLeave: () => {
        if (!containerRef.current) return;
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      },
    };
  }, []);

  return {
    containerProps: { ref: containerRef, ...hoverProps },
    contentProps: { ref: contentRef, style: { translate: `${x}px ${y}px` } },
  } as const;
}
