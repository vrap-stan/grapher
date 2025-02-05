import { get, set } from 'idb-keyval';
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

function Container({ children }: { children: React.ReactNode }) {
  const { graphNode, clearGraphNodes } = useGraphNode();

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const result = JSON.parse(e.target?.result as string);
          if (Array.isArray(result)) {
            clearGraphNodes(result);
          }
        } catch (error) {
          console.error('Invalid JSON file', error);
        }
      };
      reader.readAsText(file);
    } else {
      console.error('Please upload a valid JSON file');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      set(NODE_LOCAL_SAVE_KEY, graphNode).then(() => {
        console.log('saved', graphNode);
      });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [graphNode]);

  return (
    <div
      className="h-dvh w-dvw relative flex"
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
    >
      {children}
    </div>
  );
}

function App() {
  return (
    <GraphNodeProvider>
      <Container>
        <div className="flex-1 relative">
          <TheGraph></TheGraph>
        </div>
        <ControlPanel></ControlPanel>
        <GraphLoader></GraphLoader>
      </Container>
    </GraphNodeProvider>
  );
}

export default App;
