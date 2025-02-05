import { focusedNodeAtom } from '@/class/atoms';
import { useAtomValue } from 'jotai';
import { useGraphNode } from './GraphNodeContext';

function FocusedNode() {
  const focused = useAtomValue(focusedNodeAtom);
  const { graphNode } = useGraphNode();

  if (!focused) {
    return null;
  }

  const focusedNode = graphNode.find(n => n.id === focused);
  if (!focusedNode) {
    console.warn('Focused node not found');
    return null;
  }

  const { x, y, id, name, type } = focusedNode;

  return (
    <div>
      {/* <div>{focusedNode.id}</div>
      <div>{focusedNode.name}</div> */}
      <div>
        x:{x} y:{y}
      </div>
    </div>
  );
}

export default FocusedNode;
