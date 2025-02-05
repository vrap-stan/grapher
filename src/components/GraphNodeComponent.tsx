import { GraphNode, GraphNodeType } from '@/class/types';
import Draggable, { DraggableProps } from 'react-draggable';

export interface GraphNodeProps {
  draggable?: Partial<DraggableProps>;
  children?: React.ReactNode;
  graphNode: GraphNode;
}

const nameMap: { [key in GraphNodeType]: string } = {
  mesh: '메시',
  option: '옵션',
  optiongroup: '옵션그룹',
  rule: '룰',
};

const colorClassMap: { [key in GraphNodeType]: string } = {
  mesh: 'bg-mesh',
  option: 'bg-option',
  optiongroup: 'bg-optiongroup',
  rule: 'bg-rule',
};

function GraphNodeComponent(props: GraphNodeProps) {
  const { graphNode, children, draggable = {}, ...rest } = props;

  const { type, id, name, x, y } = graphNode;
  return (
    <Draggable {...draggable}>
      <div
        className={`inline-block ${colorClassMap[type]} rounded-md text-white px-3 py-1.5 min-w-13 border-white border-1`}
        {...rest}
      >
        <div className="text-xs mb-0.5 border-b-1 border-[#fff4] flex justify-between">
          <div>{nameMap[type]}</div>
          <div>
            <button className="text-xs hover:bg-amber-50 hover:cursor-pointer hover:text-black">
              수정
            </button>
          </div>
        </div>
        <div className="text-sm">{children}</div>
      </div>
    </Draggable>
  );
}

export default GraphNodeComponent;
