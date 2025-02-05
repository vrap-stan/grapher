import GraphNode from './GraphNodeComponent';
import { useGraphNode } from './GraphNodeContext';

function TheGraph() {
  const { graphNode } = useGraphNode();
  return (
    <section className="w-full h-full relative">
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
  );
}

export default TheGraph;
