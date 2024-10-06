import { GameControlsModal } from '@/components/GameControlsModal';
import { Grid } from '@/components/Grid';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { Confetti } from '@/components/Confetti';

function App() {
  const [controlsOpen, setControlsOpen] = useState(false);

  return (
    <div className='flex size-full flex-col items-center justify-center gap-10 bg-primary-canvas dark:bg-primary-canvas-dark'>
      <Confetti />
      <Grid className='mb-6 mt-28' />
      <TopBar onSettingsClick={() => setControlsOpen(true)} />
      <GameControlsModal
        open={controlsOpen}
        onClose={() => setControlsOpen(false)}
      />
      <DarkModeToggle className='fixed bottom-2 right-2' />
    </div>
  );
}

export default App;
