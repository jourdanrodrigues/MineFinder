import { Controls } from '@/components/GameControls.tsx';
import { Grid } from '@/components/Grid.tsx';
import { DarkModeToggle } from '@/components/DarkModeToggle.tsx';

function App() {
  return (
    <div className='flex size-full flex-col items-center justify-center gap-10 bg-primary-canvas dark:bg-primary-canvas-dark'>
      <Controls />
      <Grid />
      <DarkModeToggle className='fixed bottom-2 right-2' />
    </div>
  );
}

export default App;
