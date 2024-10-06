import { useEffect } from 'react';
import { useForceRerender } from '@/utils';

let subscribers: (() => void)[] = [];
let observer: MutationObserver | null = null;

const element = document.documentElement;

function createDarkModeObserver(): void {
  if (observer) return;
  observer = new MutationObserver(() => {
    subscribers.forEach((callback) => callback());
  });

  observer.observe(element, { attributes: true, attributeFilter: ['class'] });
}

export function useIsDarkMode(): boolean {
  const forceRerender = useForceRerender();

  useEffect(() => {
    subscribers.push(forceRerender);
    createDarkModeObserver();

    return () => {
      subscribers = subscribers.filter((cb) => cb !== forceRerender);
    };
  }, [forceRerender]);

  return element.classList.contains('dark');
}
