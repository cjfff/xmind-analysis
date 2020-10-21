/**
 * @author claude
 * @date 2020/3/15
 * @description 注册基础edge, 其他edge都在此基础上继承和扩展
 */

import animation from './edge-animations';
import itemEvents from '../items/base-node/item-event';
import hvh_h from './hvh-h';
import hvh from './hvh';

/*
 * flow:
 * 继承 edge => 绘制edge => 设置edge状态
 */

function drawShape(cfg, group) {
  // 当前配置覆盖全局配置
  const shapeStyle = Object.assign({}, this.getShapeStyle(cfg), {
    ...cfg.edgeStateStyles,
  });

  const keyShape = group.addShape('path', {
    className: 'edge-shape',
    name: 'edge-shape',
    attrs: shapeStyle,
  });

  return keyShape;
}

function setState(name, value, item) {
  const buildInEvents = [
    'edgeState',
    'edgeState:default',
    'edgeState:selected',
    'edgeState:hover',
  ];
  const group = item.getContainer();

  if (buildInEvents.includes(name)) {
    // 内部this绑定到了当前item实例
    itemEvents[name].call(this, value, group);
  } else {
    console.warn(`warning: edge ${name} 事件回调未注册!`);
  }
}

function runAnimate(group, animationType) {
  if (this.running) return;
  this.running = true;
  animation[animationType].run.call(this, group);
}

// 停止动画并删除动画元素
function stopAnimate(group, animationType) {
  animation[animationType].stop.call(this, group);
}

// 继承方法
function inheritEdge(G6, graph, name) {
  G6.registerEdge(
    `${name}-edge`,
    {
      running: false,
      runners: [],
      drawShape,
      setState,
      runAnimate,
      stopAnimate,
    },
    name,
  );
}

export default (G6, graph) => {
  const edgeArray = ['line', 'polyline', 'quadratic', 'cubic', 'arc'];

  edgeArray.forEach(edge => {
    inheritEdge(G6, graph, edge);
  });

  hvh(G6, graph, {
    running: false,
    runners: [],
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  });
  hvh_h(G6, graph, {
    running: false,
    runners: [],
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  });
};
