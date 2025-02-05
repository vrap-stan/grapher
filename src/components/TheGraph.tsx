import GraphNode from './GraphNodeComponent';
import { GraphNodeProvider, useGraphNode } from './GraphNodeContext';

function TheGraph() {
  const { graphNode } = useGraphNode();
  return (
    <GraphNodeProvider>
      <section className="w-full h-full">
        {graphNode.map((gn, index) => (
          <GraphNode
            key={`node-${index}`}
            draggable={{
              defaultPosition: { x: 0, y: 0 },
            }}
            graphNode={gn}
          >
            {gn.name ?? '<이름없음>'}
          </GraphNode>
        ))}
      </section>
    </GraphNodeProvider>
  );
}

export default TheGraph;
