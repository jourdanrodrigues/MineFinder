import { useAppSelector } from '@/redux/hooks';
import { confetti } from '@tsparticles/confetti';
import { useEffect } from 'react';
import { selectIsGameWon } from '@/redux/boardSlice';
import { isDarkMode } from '@/hooks/useIsDarkMode';

export function Confetti() {
  const isGameWon = useAppSelector(selectIsGameWon);

  useEffect(() => {
    let showConfetti = isGameWon;
    if (!showConfetti) return;

    fireConfetti();

    const timeoutId = setTimeout(() => {
      showConfetti = false;
    }, 2500);

    return () => {
      showConfetti = false;
      clearTimeout(timeoutId);
    };

    function fireConfetti() {
      const colors = isDarkMode()
        ? ['#007330', '#cc9e00', '#231b61', '#d8d8d8']
        : ['#009b3a', '#ffdf00', '#002776', '#ffffff']; // 🇧🇷
      const props = { count: 2, spread: 30, shapes: ['circle'], colors };

      Promise.all([
        // Bottom-left
        confetti({ angle: 60, position: { x: 0, y: 100 }, ...props }),
        // Bottom-middle
        confetti({ angle: 90, position: { x: 50, y: 100 }, ...props }),
        // Bottom-right
        confetti({ angle: 120, position: { x: 100, y: 100 }, ...props }),
      ]).then(() => {
        if (!showConfetti) return;
        requestAnimationFrame(fireConfetti);
      });
    }
  }, [isGameWon]);

  return null;
}
