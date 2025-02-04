import Draggable, { DraggableProps } from 'react-draggable';

export type GraphNodeType = 'mesh' | 'option' | 'optiongroup' | 'rule';

export interface GraphNodeProps {
  draggable?: Partial<DraggableProps>;
  children?: React.ReactNode;
  type: GraphNodeType;
}

const colorMap: { [key in GraphNodeType]: string } = {
  mesh: '#CD4F41',
  option: '#1C404C',
  optiongroup: '#2D8077',
  rule: '#DE9E46',
};

const nameMap: { [key in GraphNodeType]: string } = {
  mesh: '메시',
  option: '옵션',
  optiongroup: '옵션그룹',
  rule: '룰',
};

function GraphNode(props: GraphNodeProps) {
  const { type, children, draggable = {}, ...rest } = props;
  return (
    <Draggable {...draggable}>
      <div
        style={{
          display: 'inline-block',
          backgroundColor: colorMap[type],
          padding: '6px 12px',
          borderRadius: 8,
          color: 'white',
        }}
        {...rest}
      >
        <div style={{ fontSize: 12, marginBottom: 6 }}>{nameMap[type]}</div>
        <div>{children}</div>
      </div>
    </Draggable>
  );
}

export default GraphNode;
