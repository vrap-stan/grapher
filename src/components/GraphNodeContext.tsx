import { GraphNode, GraphNodeType } from '@/class/types';
import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface GraphNodeContextType {
  graphNode: GraphNode[];
  setGraphNodes: (nodes: GraphNode[]) => void;

  addGraphNode(type: GraphNodeType): void;
  addGraphNode(node: GraphNode): void;
  addGraphNode(nodes: GraphNode[]): void;
  removeGraphNode(node: { id?: string }): void;
  removeGraphNode(nodes: { id?: string }[]): void;
  removeGraphNode(id: string): void;
  removeGraphNode(ids: string[]): void;

  updateGraphNode(node: { id: string } & Partial<GraphNode>): void;

  updateGraphNode(from: { id: string }, to: Partial<GraphNode>): void;
  updateGraphNode(id: string, to: Partial<GraphNode>): void;

  clearGraphNodes(initValues?: GraphNode[]): void;
}

export const GraphNodeContext = createContext<GraphNodeContextType | undefined>(
  undefined,
);

export const GraphNodeProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [graphNode, setGraphNodes] = useState<GraphNode[]>([]);

  // console.log(graphNode.map(n => n.name));

  const addGraphNode: GraphNodeContextType['addGraphNode'] = (
    node: GraphNode | GraphNodeType | GraphNode[],
  ) => {
    if (typeof node === 'string') {
      setGraphNodes(prev => [
        ...prev,
        {
          type: node,
          id: uuidv4(),
        },
      ]);
    } else if (Array.isArray(node)) {
      setGraphNodes(prev => [...prev, ...node]);
    } else {
      setGraphNodes(prev => [...prev, node]);
    }
  };

  const removeGraphNode: GraphNodeContextType['removeGraphNode'] = (
    node: { id?: string } | { id?: string }[] | string | string[],
  ) => {
    if (Array.isArray(node)) {
      if (node.length > 0 && typeof node[0] === 'string') {
        const nodes = node as string[];
        setGraphNodes(prev =>
          prev.filter(n => (n.id ? !nodes.includes(n.id) : true)),
        );
      } else {
        const nodes = (node as { id?: string }[]).filter(n => Boolean(n.id));
        setGraphNodes(prev =>
          prev.filter(n =>
            n.id ? !nodes.map(n => n.id).includes(n.id) : true,
          ),
        );
      }
    } else {
      if (typeof node === 'string') {
        setGraphNodes(prev => prev.filter(n => (n.id ? n.id !== node : true)));
      } else {
        setGraphNodes(prev =>
          prev.filter(n => (n.id ? n.id !== node.id : true)),
        );
      }
    }
  };

  const updateGraphNode: GraphNodeContextType['updateGraphNode'] = (
    from: string | { id: string },
    to?,
  ) => {
    if (typeof from === 'string') {
      setGraphNodes(prev =>
        prev.map(n =>
          n.id === from ? { ...n, ...(to as Partial<GraphNode>) } : n,
        ),
      );
    } else if (to === undefined) {
      setGraphNodes(prev =>
        prev.map(n => (n.id === from.id ? { ...n, ...from } : n)),
      );
    } else {
      setGraphNodes(prev =>
        prev.map(n => (n.id === from.id ? { ...n, ...to } : n)),
      );
    }
  };

  const clearGraphNodes = (initValue: GraphNode[] = []) => {
    setGraphNodes(initValue);
  };

  return (
    <GraphNodeContext.Provider
      value={{
        graphNode,
        setGraphNodes,
        addGraphNode,
        removeGraphNode,
        updateGraphNode,
        clearGraphNodes,
      }}
    >
      {children}
    </GraphNodeContext.Provider>
  );
};

export const useGraphNode = (): GraphNodeContextType => {
  const context = useContext(GraphNodeContext);
  if (!context) {
    throw new Error('GraphNodeProvider안에서 사용할 것');
  }
  return context;
};
