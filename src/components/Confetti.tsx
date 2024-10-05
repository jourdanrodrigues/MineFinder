import { useAppSelector } from '@/redux/hooks.ts';
import { confetti } from '@tsparticles/confetti';
import { useEffect } from 'react';
import { selectIsGameWon } from '@/redux/boardSlice.ts';

export function Confetti() {
  const isGameWon = useAppSelector(selectIsGameWon);

  useEffect(() => {
    const colors = ['#257f00', '#aa9d00'];
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
  }, [isGameWon]);

  return null;
}
