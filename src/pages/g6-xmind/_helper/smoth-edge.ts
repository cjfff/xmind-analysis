import { TYPE_G6 } from './type';

export default (G6: TYPE_G6) => {
  G6.registerEdge('smooth', {
    draw(cfg, group) {
      const { startPoint, endPoint } = cfg;
      const hgap = Math.abs(endPoint.x - startPoint.x);

      const path = [
        ['M', startPoint.x, startPoint.y],
        [
          'C',
          startPoint.x + hgap / 4,
          startPoint.y,
          endPoint.x - hgap / 2,
          endPoint.y,
          endPoint.x,
          endPoint.y,
        ],
      ];

      const shape = group.addShape('path', {
        attrs: {
          stroke: '#AAB7C4',
          path,
        },
        name: 'smooth-path-shape',
      });
      return shape;
    },
  });
};
