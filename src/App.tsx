import ControlPanel from './components/ControlPanel';
import { GraphNodeProvider } from './components/GraphNodeContext';
import TheGraph from './components/TheGraph';

function App() {
  return (
    <GraphNodeProvider>
      <div className="h-dvh w-dvw relative flex">
        <div className="flex-1 relative">
          <TheGraph></TheGraph>
        </div>
        <ControlPanel></ControlPanel>
      </div>
    </GraphNodeProvider>
  );
}

export default App;
