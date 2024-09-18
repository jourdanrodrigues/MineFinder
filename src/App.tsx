import { Controls } from '@/components/GameControls.tsx';
import { Grid } from '@/components/Grid.tsx';

function App() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Controls />
      <Grid className='h-fit w-full max-w-full' />
    </div>
  );
}

export default App;
