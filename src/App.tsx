import { Board } from '@/components/Board.tsx';
import { Controls } from '@/components/GameControls.tsx';

function App() {
  return (
    <div className='flex flex-col items-center'>
      <Controls />
      <Board />
    </div>
  );
}

export default App;
