
export type GraphNodeType = 'mesh' | 'option' | 'optiongroup' | 'rule';

export interface GraphNodeContent { }

export interface GraphNode {
  type: GraphNodeType;
  id: string;
  name?: string;
  content?: GraphNodeContent;
  x?: number;
  y?: number;
};