import { G6 } from '../type.d';
import registerBaseNode from './items/base-node/base-node';
import registerNode from './items/node';
import _registerEdge from './edges/base-edge';
import { Graph } from '@antv/g6';

export default (G6: G6) => {
  registerBaseNode(G6);
  registerNode(G6);
};

export const registerEdge = (G6: G6, graph: Graph) => {
  _registerEdge(G6, graph);
};
