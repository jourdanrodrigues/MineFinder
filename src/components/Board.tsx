import React, { useRef, useState } from 'react';
import { cn, getMouseButtonClicked } from '@/utils';
import { Grid } from '@/components/Grid';

export const DraggingContext = React.createContext(false);

export function Board() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const contentRect = contentRef.current?.getBoundingClientRect();
  const containerRect = containerRef.current?.getBoundingClientRect();

  const shadowConfig = '1rem -1rem rgba(0, 0, 0, 0.5)';
  const boxShadows = [];

  if (contentRect?.top !== containerRect?.top) {
    boxShadows.push(`inset 0 1rem ${shadowConfig}`);
  }
  if (contentRect?.left !== containerRect?.left) {
    boxShadows.push(`inset 1rem 0 ${shadowConfig}`);
  }
  if (contentRect?.right !== containerRect?.right) {
    boxShadows.push(`inset -1rem 0 ${shadowConfig}`);
  }
  if (contentRect?.bottom !== containerRect?.bottom) {
    boxShadows.push(`inset 0 -1rem ${shadowConfig}`);
  }

  return (
    <DraggingContext.Provider value={isDragging}>
      <div className='flex w-full items-center justify-center p-8'>
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          className={cn(
            'max-w-full relative w-fit max-h-[45rem] flex justify-center overflow-hidden items-center',
            isDragging && 'cursor-all-scroll',
          )}
        >
          <Grid
            ref={contentRef}
            className='transition-[translate]'
            style={{ translate: `${translate.x}px ${translate.y}px` }}
          />
          <div
            className='pointer-events-none absolute inset-0 transition-[box-shadow]'
            style={{ boxShadow: boxShadows.join(', ') }}
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
