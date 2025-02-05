import { GraphNode, NODE_LOCAL_SAVE_KEY } from '@/class/types';
import { del, get, set } from 'idb-keyval';
import Button from './Button';
import FocusedNode from './FocusedNode';
import { useGraphNode } from './GraphNodeContext';

function ControlPanel() {
  const { graphNode, addGraphNode, clearGraphNodes } = useGraphNode();

  const saveNodes = () => {
    set(NODE_LOCAL_SAVE_KEY, graphNode).then(() => {
      console.log('saved');
    });
  };

  const loadNodes = () => {
    get(NODE_LOCAL_SAVE_KEY).then(value => {
      if (value) {
        clearGraphNodes(value as GraphNode[]);
      } else {
        alert('저장된 데이터가 없습니다.');
      }
    });
  };

  return (
    <div className="bg-amber-50 w-1/4 max-w-[300px] max-h-[100%] overflow-y-auto text-sm gap-5 flex flex-col">
      <div className="">
        선택된 노드
        <FocusedNode></FocusedNode>
      </div>
      <div className="">
        생성하기
        <div className="flex flex-col w-full p-2 gap-1">
          <Button
            onClick={() => {
              addGraphNode('mesh');
            }}
          >
            메시 생성
          </Button>
          <Button
            onClick={() => {
              addGraphNode('option');
            }}
          >
            옵션 생성
          </Button>
          <Button
            onClick={() => {
              addGraphNode('optiongroup');
            }}
          >
            옵션 그룹 생성
          </Button>
          <Button
            onClick={() => {
              addGraphNode('rule');
            }}
          >
            룰 생성
          </Button>
        </div>
      </div>
      <div className="">
        관리
        <div className="flex flex-col w-full p-2 gap-1">
          <Button
            onClick={() => {
              clearGraphNodes();
            }}
          >
            노드 전체삭제
          </Button>
          <Button onClick={saveNodes}>저장</Button>
          <Button
            onClick={() => {
              // save as json : graphNode
              const json = JSON.stringify(graphNode);
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');

              a.href = url;
              a.download = 'graphNode.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            파일로 저장
          </Button>
          <Button onClick={loadNodes}>불러오기</Button>
          <Button
            onClick={() => {
              del(NODE_LOCAL_SAVE_KEY);
            }}
          >
            저장된 데이터 지우기
          </Button>
        </div>
      </div>
      <div>
        {graphNode.map((gn, index) => {
          return (
            <div key={`node-detail-${gn.id}`}>
              이름:{gn.name}
              <br></br>
              타입:{gn.type}
              <br></br>
              x:{gn.x} y:{gn.y}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ControlPanel;
