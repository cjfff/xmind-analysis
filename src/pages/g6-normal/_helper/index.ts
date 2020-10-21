import { G6 } from './type.d';
import registerBehaviors from './behavior';
import registerNodes from './shape';

export default (G6: G6) => {
  registerBehaviors(G6);
  registerNodes(G6);
};

export const registerFactory = (graph: G6) => {
  this.graph.on('after-node-selected', e => {
    // this.configVisible = !!e;

    if (e && e.item) {
      const model = e.item.get('model');

      this.config = model;
      this.label = model.label;
      this.labelCfg = {
        fill: model.labelCfg.fill,
        fontSize: model.labelCfg.fontSize,
      };
      this.node = {
        fill: model.style.fill,
        borderColor: model.style.stroke,
        lineDash: model.style.lineDash || 'none',
        width: model.style.width,
        height: model.style.height,
        shape: model.type,
      };

      // model.label = e.item.get('id');
      /* this.graph.updateItem(e.item, {
            x: 100,
            y: 100,
          }); */
    }
  });

  this.graph.on('after-edge-selected', e => {
    this.configVisible = !!e;

    if (e && e.item) {
      this.config = e.item.get('model').id;

      this.graph.updateItem(e.item, {
        // shape: 'line-edge',
        style: {
          radius: 10,
          lineWidth: 2,
        },
      });
    }
  });

  this.graph.on('on-edge-mousemove', e => {
    if (e && e.item) {
      this.tooltip = e.item.get('model').label;
      this.left = e.clientX + 40;
      this.top = e.clientY - 20;
    }
  });

  this.graph.on('on-node-mousemove', e => {
    if (e && e.item) {
      this.tooltip = e.item.get('model').id;
      this.left = e.clientX + 40;
      this.top = e.clientY - 20;
    }
  });

  this.graph.on('on-node-mouseleave', e => {
    if (e && e.item) {
      this.tooltip = '';
    }
  });

  this.graph.on('on-edge-mouseleave', e => {
    if (e && e.item) {
      this.tooltip = '';
    }
  });
};
