import { GameControlsModal } from '@/components/GameControlsModal.tsx';
import { Grid } from '@/components/Grid.tsx';
import { DarkModeToggle } from '@/components/DarkModeToggle.tsx';
import { Drawer } from '@/components/Drawer.tsx';
import { useState } from 'react';
import { TopBar } from '@/components/TopBar.tsx';
import { Confetti } from '@/components/Confetti.tsx';

function App() {
  const [controlsOpen, setControlsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className='flex size-full flex-col items-center justify-center gap-10 bg-primary-canvas dark:bg-primary-canvas-dark'>
      <Confetti />
      <Grid className='mt-20' />
      <Drawer open={drawerOpen} />
      <TopBar
        drawerOpen={drawerOpen}
        onToggleDrawer={() => setDrawerOpen((prev) => !prev)}
        onSettingsClick={() => setControlsOpen(true)}
      />
      <GameControlsModal
        open={controlsOpen}
        onClose={() => setControlsOpen(false)}
      />
      <DarkModeToggle className='fixed bottom-2 right-2' />
    </div>
  );
}

export default App;
