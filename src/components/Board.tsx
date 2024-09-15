import React, { useRef, useState } from 'react';
import { cn, getMouseButtonClicked } from '@/utils';
import { GridType } from '@/types';
import Grid from '@/components/Grid';

export const DraggingContext = React.createContext(false);

export function Board({ grid, bombs }: { grid: GridType; bombs: number }) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  return (
    <DraggingContext.Provider value={isDragging}>
      <div className='w-full flex justify-center items-center p-8'>
        <div
          className={cn(
            'max-w-full w-fit max-h-[45rem] flex justify-center border-black border-4 overflow-hidden items-center',
            isDragging && 'cursor-all-scroll',
          )}
          ref={containerRef}
          onMouseDown={handleMouseDown}
        >
          <Grid
            ref={contentRef}
            bombs={bombs}
            grid={grid}
            className='transition-[translate]'
            style={{ translate: `${translate.x}px ${translate.y}px` }}
          />
        </div>
      </div>
    </DraggingContext.Provider>
  );

  function handleMouseDown(e: React.MouseEvent) {
    const buttonClicked = getMouseButtonClicked(e);
    if (buttonClicked !== 'middle') return;

    setIsDragging(true);

    const startX = e.clientX - translate.x;
    const startY = e.clientY - translate.y;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    function handleMouseUp() {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    function handleMouseMove(e: MouseEvent) {
      if (!containerRef.current || !contentRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      const maxX = (containerRect.width - contentRect.width) / 2;
      const maxY = (containerRect.height - contentRect.height) / 2;

      const newX = Math.min(Math.max(e.clientX - startX, maxX), -maxX);
      const newY = Math.min(Math.max(e.clientY - startY, maxY), -maxY);

      const canGoX = contentRect.width > containerRect.width;
      const canGoY = contentRect.height > containerRect.height;

      setTranslate({ x: canGoX ? newX : 0, y: canGoY ? newY : 0 });
    }
  }
}
