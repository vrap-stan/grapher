import { setFocusedNode } from '@/class/atoms';
import { GraphNode, GraphNodeType } from '@/class/types';
import { useRef, useState } from 'react';
import Draggable, { DraggableProps } from 'react-draggable';
import Modal from 'react-modal';
import Button from './Button';
import { useGraphNode } from './GraphNodeContext';

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
  const nodeRef = useRef(null);

  const { graphNode, children, draggable = {}, ...rest } = props;

  const { type, id, name, x, y } = graphNode;

  const [modalOpen, setModalOpen] = useState(false);

  const { updateGraphNode, removeGraphNode } = useGraphNode();

  const [namechange, setNameChange] = useState<string>(name ?? '');
  const [typechange, setTypeChange] = useState<GraphNodeType>(type);

  const closeModal = () => {
    setModalOpen(false);
  };

  const position =
    typeof x === 'number' && typeof y === 'number' ? { x, y } : undefined;

  return (
    <>
      <Draggable
        nodeRef={nodeRef}
        position={position}
        onStart={e => {
          setFocusedNode(id);
        }}
        onStop={(e, data) => {
          const { x, y } = data;
          updateGraphNode(id, {
            x,
            y,
          });
        }}
        {...draggable}
      >
        <div
          ref={nodeRef}
          className={`inline-block ${colorClassMap[type]} rounded-md text-white px-3 py-1.5 min-w-13 border-white border-1`}
          {...rest}
        >
          <div className="text-xs mb-0.5 border-b-1 border-[#fff4] flex justify-between">
            <div>{nameMap[type]}</div>
            <div className="ml-3">
              <button
                className="text-xs text-[#fffd] hover:bg-amber-50 hover:cursor-pointer hover:text-black"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                수정
              </button>
              <button
                className="text-xs text-[#fffd] hover:bg-amber-50 hover:cursor-pointer hover:text-black ml-1"
                onClick={() => {
                  removeGraphNode(id);
                }}
              >
                삭제
              </button>
            </div>
          </div>
          <div className="text-sm">{Boolean(name) ? name : '<이름없음>'}</div>
        </div>
      </Draggable>
      <Modal
        className="bg-white rounded-2xl border-1 border-[#0002] w-1/2 h-1/2 translate-x-1/2 translate-y-1/2"
        isOpen={modalOpen}
        onRequestClose={closeModal}
      >
        <div className="p-4 w-full h-full flex flex-col">
          <div className="flex-1 min-h-0">
            <label>타입 변경: </label>
            <select
              onChange={e => {
                setTypeChange(e.target.value as GraphNodeType);
              }}
              value={typechange}
            >
              {Object.entries(nameMap).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <br></br>
            <label>이름 변경: </label>
            <input
              type="text"
              placeholder="이름"
              value={namechange}
              onChange={e => {
                setNameChange(e.target.value);
              }}
            ></input>
          </div>
          <div className="h-8 flex justify-end">
            <Button
              onClick={() => {
                closeModal();
              }}
            >
              취소
            </Button>
            <Button
              onClick={() => {
                updateGraphNode({
                  id,
                  name: namechange,
                  type: typechange,
                });
                closeModal();
              }}
              type="submit"
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default GraphNodeComponent;
