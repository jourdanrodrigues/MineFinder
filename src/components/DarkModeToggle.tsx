import { useEffect } from 'react';
import { cn, useForceRerender } from '@/utils.ts';

type Theme = 'dark' | 'light' | 'system';

export function DarkModeToggle({ className }: { className?: string }) {
  const forceRerender = useForceRerender();

  useEffect(() => {
    const theme = getStorageTheme();
    const query = getDarkThemeMediaQuery();
    if (theme === 'dark' || (theme === 'system' && query.matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    query.addEventListener('change', clearDarkModeFlag);
    return () => query.removeEventListener('change', clearDarkModeFlag);

    function clearDarkModeFlag(): void {
      localStorage.removeItem('theme');
      forceRerender();
    }
  }, [forceRerender]);

  const isDark = isCurrentlyDark();

  const contentClassName =
    'absolute opacity-0 transition-opacity will-change-[opacity]';
  return (
    <button
      className={cn(
        'size-8 rounded-full bg-gray-500 flex items-center justify-center',
        className,
      )}
      onClick={toggleDarkMode}
    >
      <span className={cn(contentClassName, !isDark && 'opacity-100')}>🌙</span>
      <span className={cn(contentClassName, isDark && 'opacity-100')}>🌞</span>
    </button>
  );

  function toggleDarkMode(): void {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    forceRerender();
  }
}

function isCurrentlyDark(): boolean {
  const theme = getStorageTheme();
  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  return getDarkThemeMediaQuery().matches;
}

function getStorageTheme(): Theme {
  const value = localStorage.getItem('theme') || 'system';
  if (isTheme(value)) return value;
  throw new Error('Invalid theme value');
}

function getDarkThemeMediaQuery(): MediaQueryList {
  return window.matchMedia('(prefers-color-scheme: dark)');
}

function isTheme(value: string): value is Theme {
  return ['dark', 'light', 'system'].includes(value);
}
