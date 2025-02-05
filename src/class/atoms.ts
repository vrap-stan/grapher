import { atom, createStore, getDefaultStore, PrimitiveAtom } from "jotai";
import { GraphNode } from "./types";

type AtomArgType<T> = T | ((prev: T) => T);
export type Store = ReturnType<typeof createStore>;
// export const defaultStore = createStore();
export const defaultStore = getDefaultStore();

export function getAtomValue<T = any>(atom: PrimitiveAtom<T>): T {
  const store = getDefaultStore();
  return store.get(atom);
}

export function setAtomValue<T = any>(
  atom: PrimitiveAtom<T>,
  value: T | ((prev: T) => T),
) {
  const store = getDefaultStore();
  store.set(atom, value);
}

export const graphNodesAtom = atom<GraphNode[]>([]);

export const focusedNodeAtom = atom<string | null>(null);

export const setFocusedNode = (node: { id: string } | string) => {
  if (typeof node === 'string') {
    setAtomValue(focusedNodeAtom, node);
  } else {
    setAtomValue(focusedNodeAtom, node.id);
  }
} 