import { useAppSelector } from '@/redux/hooks.ts';
import { confetti } from '@tsparticles/confetti';
import { useEffect, useMemo } from 'react';
import { selectIsGameWon } from '@/redux/boardSlice.ts';
import { useIsDarkMode } from '@/useIsDarkMode.ts';

export function Confetti() {
  const isGameWon = useAppSelector(selectIsGameWon);
  const isDarkMode = useIsDarkMode();
  const colors = useMemo(
    // TODO: Get some real colors here
    () => (isDarkMode ? ['#257f00', '#aa9d00'] : ['#0000ff', '#ff0000']),
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
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 1 },
          colors,
        }),
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 1 },
          colors,
        }),
        confetti({
          particleCount: 2,
          angle: 90,
          spread: 55,
          origin: { x: 0.5, y: 1 },
          colors,
        }),
      ]).then(() => {
        if (!showConfetti) return;
        requestAnimationFrame(frame);
      });
    }
  }, [isGameWon, colors]);

  return null;
}
