import { GraphNode, GraphNodeType } from '@/class/types';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useGraphNode } from './GraphNodeContext';

export interface GraphNodeProps {
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

const withDefaultOffset = (length: number, x?: number, y?: number) => {
  // 나머지
  const remainder = length % 20;
  x = x ?? remainder * 30;
  y = y ?? remainder * 15;
  return { x, y };
};

function GraphNodeComponent(props: GraphNodeProps) {
  const {
    graphNode: graphNodes,
    updateGraphNode,
    removeGraphNode,
  } = useGraphNode();
  const nodeRef = useRef(null);

  const { graphNode, children, ...rest } = props;

  const { type, id, name, x, y } = graphNode;
  // const [pos, setPos] = useState({ x: x ?? 0, y: y ?? 0 });

  const [modalOpen, setModalOpen] = useState(false);

  const [namechange, setNameChange] = useState<string>(name ?? '');
  const [typechange, setTypeChange] = useState<GraphNodeType>(type);

  const closeModal = () => {
    setModalOpen(false);
  };

  const pos = withDefaultOffset(graphNodes.length, x, y);

  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const handleMouseDown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      // 버튼 클릭하면 무시
      return;
    }

    setIsDragging(true);
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const setPos = (pos: { x: number; y: number }) => {
    updateGraphNode({ id, x: pos.x, y: pos.y });
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging) return;
    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
    setIsDragging(false);
  };

  useEffect(() => {
    if (x === undefined || y === undefined) {
      updateGraphNode({ id, x: pos.x, y: pos.y });
    }
  }, [x, y]);

  const [isEditing, setIsEditing] = useState(false);

  const handleChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateGraphNode({
      id,
      name: namechange,
      type: typechange,
    });
    setIsEditing(false);
  };
  return (
    <>
      {isDragging && (
        <div
          className="absolute w-full h-full top-0 left-0 z-10"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></div>
      )}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={nodeRef}
        className={`inline-block ${colorClassMap[type]} rounded-md text-white px-3 py-1.5 min-w-13 border-white border-1`}
        style={{
          position: 'absolute',
          transform: `translate(${pos.x}px, ${pos.y}px)`,
        }}
        {...rest}
      >
        <div className="text-xs mb-0.5 border-b-1 border-[#fff4] flex justify-between">
          {isEditing ? (
            <select
              onChange={e => {
                setTypeChange(e.target.value as GraphNodeType);
              }}
              value={typechange}
            >
              {Object.entries(nameMap).map(([key, value]) => (
                <option
                  className="text-black"
                  key={`edit-option-${key}`}
                  value={key}
                >
                  {value}
                </option>
              ))}
            </select>
          ) : (
            <div>{nameMap[type]}</div>
          )}
          <div className="ml-3">
            <button
              className="text-xs text-[#fffd] hover:bg-amber-50 hover:cursor-pointer hover:text-black"
              onClick={e => {
                e.stopPropagation();
                // setModalOpen(true);
                // console.log('Here');
                setIsEditing(true);
              }}
              disabled={isEditing}
            >
              수정
            </button>
            <button
              className="text-xs text-[#fffd] hover:bg-amber-50 hover:cursor-pointer hover:text-black ml-1.5"
              onClick={e => {
                e.stopPropagation();
                removeGraphNode(id);
              }}
            >
              삭제
            </button>
          </div>
        </div>
        {isEditing ? (
          <form onSubmit={handleChangeSubmit}>
            <input
              className="bg-white w-30 text-xs text-black p-0.5 rounded-md"
              type="text"
              value={namechange}
              onChange={e => {
                setNameChange(e.target.value);
              }}
              placeholder="이름"
            ></input>
            <button
              type="button"
              className="text-xs hover:cursor-pointer ml-1 bg-amber-600 rounded-md p-0.5"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              취소
            </button>
            <button
              className="text-xs hover:cursor-pointer ml-1 bg-amber-600 rounded-md p-0.5"
              type="submit"
            >
              확인
            </button>
          </form>
        ) : (
          <div className="text-sm">{Boolean(name) ? name : '<이름없음>'}</div>
        )}
      </div>
    </>
  );
}

export default GraphNodeComponent;
