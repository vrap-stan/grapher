import ControlPanel from './components/ControlPanel';
import GraphNode from './components/GraphNode';

function App() {
  const vals = ['dd', 'ff', 'gg'];

  return (
    <div
      style={{
        width: '100dvw',
        height: '100dvh',
        position: 'relative',
        display: 'flex',
      }}
    >
      <div
        style={{
          flex: 1,
          position: 'relative',
        }}
      >
        {vals.map((val, index) => (
          <GraphNode
            key={`node-${index}`}
            draggable={{
              defaultPosition: { x: 0, y: 0 },
            }}
            type="rule"
          >
            {val}
          </GraphNode>
        ))}
      </div>
      <ControlPanel></ControlPanel>
    </div>
  );
}

export default App;
