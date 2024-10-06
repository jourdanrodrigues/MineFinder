import { cn } from '@/utils';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';

export function DarkModeToggle({ className }: { className?: string }) {
  const isDark = useIsDarkMode();

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
