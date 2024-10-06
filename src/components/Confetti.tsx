import { useAppSelector } from '@/redux/hooks';
import { confetti } from '@tsparticles/confetti';
import { useEffect, useMemo } from 'react';
import { selectIsGameWon } from '@/redux/boardSlice';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';

export function Confetti() {
  const isGameWon = useAppSelector(selectIsGameWon);
  const isDarkMode = useIsDarkMode();
  const props = useMemo(
    (): Parameters<typeof confetti>[0] => ({
      count: 2,
      spread: 30,
      shapes: ['circle'],
      colors: isDarkMode
        ? ['#007330', '#cc9e00', '#231b61', '#d8d8d8']
        : ['#009b3a', '#ffdf00', '#002776', '#ffffff'], // 🇧🇷
    }),
    [isDarkMode],
  );

  useEffect(() => {
    let showConfetti = isGameWon;
    if (!showConfetti) return;

    frame();
    return () => {
      showConfetti = false;
    };

    function frame() {
      Promise.all([
        // Bottom-left
        confetti(
          Object.assign({ angle: 60, position: { x: 0, y: 100 } }, props),
        ),
        // Bottom-middle
        confetti(
          Object.assign({ angle: 90, position: { x: 50, y: 100 } }, props),
        ),
        // Bottom-right
        confetti(
          Object.assign({ angle: 120, position: { x: 100, y: 100 } }, props),
        ),
      ]).then(() => {
        if (!showConfetti) return;
        requestAnimationFrame(frame);
      });
    }
  }, [isGameWon, props]);

  return null;
}
