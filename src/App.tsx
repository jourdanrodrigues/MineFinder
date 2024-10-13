import { SettingsModal } from '@/components/SettingsModal';
import { Grid } from '@/components/Grid';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { Confetti } from '@/components/Confetti';

function App() {
  const [controlsOpen, setSettingsOpen] = useState(false);

  return (
    <div className='flex size-full flex-col items-center justify-start gap-10 bg-primary-canvas dark:bg-primary-canvas-dark'>
      <TopBar onSettingsClick={() => setSettingsOpen(true)} />
      <Grid className='max-w-full overflow-x-auto overscroll-none' />
      {/* The below are either absolutely or fixed positioned */}
      <Confetti />
      <DarkModeToggle className='fixed bottom-2 right-2' />
      <SettingsModal
        open={controlsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}

export default App;
