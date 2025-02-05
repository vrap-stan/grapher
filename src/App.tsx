import { get } from 'idb-keyval';
import { useEffect } from 'react';
import Modal from 'react-modal';
import { GraphNode, NODE_LOCAL_SAVE_KEY } from './class/types';
import ControlPanel from './components/ControlPanel';
import { GraphNodeProvider, useGraphNode } from './components/GraphNodeContext';
import TheGraph from './components/TheGraph';
Modal.setAppElement('#root');

function GraphLoader() {
  const { clearGraphNodes } = useGraphNode();
  useEffect(() => {
    get(NODE_LOCAL_SAVE_KEY).then(value => {
      if (value) {
        clearGraphNodes(value as GraphNode[]);
      }
    });
  }, []);

  return null;
}

function App() {
  return (
    <GraphNodeProvider>
      <div className="h-dvh w-dvw relative flex">
        <div className="flex-1 relative">
          <TheGraph></TheGraph>
        </div>
        <ControlPanel></ControlPanel>
        <GraphLoader></GraphLoader>
      </div>
    </GraphNodeProvider>
  );
}

export default App;
