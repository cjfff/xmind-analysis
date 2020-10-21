import { TYPE_G6 } from './type';
import registerSmoothEdge from './smoth-edge';
import reggisterTreeNode from './tree-node';

export default (G6: TYPE_G6) => {
  const registers = [registerSmoothEdge, reggisterTreeNode];

  registers.forEach(register => {
    register(G6);
  });
};
