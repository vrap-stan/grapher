import Button from './Button';
import { useGraphNode } from './GraphNodeContext';

function ControlPanel() {
  const { addGraphNode } = useGraphNode();

  return (
    <div className="bg-amber-50 w-1/4 max-w-[300px] max-h-[100%] overflow-y-auto">
      Content
      <div className="flex flex-col w-full p-2">
        <Button
          onClick={() => {
            addGraphNode('mesh');
          }}
        >
          메시 생성
        </Button>
      </div>
    </div>
  );
}

export default ControlPanel;
