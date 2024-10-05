import { cn } from '@/utils.ts';

type Theme = 'dark' | 'light' | 'system';

export function DarkModeToggle({ className }: { className?: string }) {
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
      <span className={cn(contentClassName, isDark && 'opacity-100')}>☀️</span>
    </button>
  );

  function toggleDarkMode(): void {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}

function isCurrentlyDark(): boolean {
  const theme = getStorageTheme();
  if (theme === 'dark') return true;
  return theme !== 'light' && getDarkThemeMediaQuery().matches;
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
