import { Controls } from '@/components/GameControls.tsx';
import { Grid } from '@/components/Grid.tsx';
import { DarkModeToggle } from '@/components/DarkModeToggle.tsx';
import { Drawer } from '@/components/Drawer.tsx';
import { useState } from 'react';
import { TopBar } from '@/components/TopBar.tsx';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className='flex size-full flex-col items-center justify-center gap-10 bg-primary-canvas dark:bg-primary-canvas-dark'>
      <Grid className='mt-20' />
      <DarkModeToggle className='fixed bottom-2 right-2' />
      <Drawer open={drawerOpen}>
        <Controls />
      </Drawer>
      <TopBar
        drawerOpen={drawerOpen}
        onToggleDrawer={() => setDrawerOpen((prev) => !prev)}
      />
    </div>
  );
}

export default App;
