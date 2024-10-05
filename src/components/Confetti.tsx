import { useAppSelector } from '@/redux/hooks.ts';
import { confetti } from '@tsparticles/confetti';
import { useEffect } from 'react';
import { selectWonTheGame } from '@/redux/boardSlice.ts';

export function Confetti() {
  const showConfetti = useAppSelector(selectWonTheGame);

  useEffect(() => {
    const colors = ['#bb0000', '#ffffff'];
    let innerShowConfetti = showConfetti;
    if (innerShowConfetti) {
      // noinspection JSIgnoredPromiseFromCall
      frame();
    }

    return () => {
      innerShowConfetti = false;
    };

    async function frame() {
      await Promise.all([
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        }),
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        }),
      ]);

      if (innerShowConfetti) {
        requestAnimationFrame(frame);
      }
    }
  }, [showConfetti]);

  return null;
}
