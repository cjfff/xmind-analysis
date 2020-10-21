import React, { useEffect, useRef } from 'react';
// import G6 from '@antv/g6/lib/index';
import G6 from '@antv/g6/lib';
import initG6 from './_helper';
import { Graph } from '@antv/g6';
import { registerEdge } from './_helper/shape/index';

initG6(G6);

const initData = {
  // 点集
  nodes: [
    {
      id: 'node1', // 节点的唯一标识
      x: 100, // 节点横坐标
      y: 200, // 节点纵坐标
      label: '起始点', // 节点文本,
      type: 'rect-node',
      // labelCfg: {
      //   fill: '#c96164',
      //   width: 200,
      //   height: 60,
      //   fontSize: 20,
      //   fontWeight: '700',
      // },
      anchorHotsoptStyles: {
        r: 11,
        fill: 'green',
      },
      anchorPointStyles: {
        r: 4,
        fill: '#fff',
        stroke: '#1890FF',
        lineWidth: 2,
      },
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
      type: 'rect-node',
      label: '目标点',
    },
  ],
  // 边集
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      source: 'node1', // 起始点 id
      target: 'node2', // 目标点 id
      label: '我是连线', // 边的文本
    },
  ],
};

const G6Xmind = () => {
  const graph = useRef<Graph>();

  useEffect(() => {
    const menu = new G6.Menu({
      offsetX: -20,
      offsetY: -50,
      itemTypes: ['node'],
      getContent(e) {
        const outDiv = document.createElement('div');

        outDiv.style.width = '80px';
        outDiv.style.cursor = 'pointer';
        outDiv.innerHTML = '<p id="deleteNode">删除节点</p>';
        return outDiv;
      },
      handleMenuClick(target, item) {
        const { id } = target;

        if (id) {
          vm[id](item);
        }
      },
    });

    const minimap = new G6.Minimap({
      size: [200, 100],
    });

    graph.current = new G6.Graph({
      container: 'g6-xmind', // 指定挂载容器
      width: 1000, // 图的宽度
      height: 1000, // 图的高度
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'select-node',
          'hover-node',
          'drag-node',
          'active-edge',
        ],
      },
      defaultNode: {
        type: 'rect-node',
        style: {
          radius: 10,
        },
        labelCfg: {
          fontSize: 20,
        },
      },
      // 覆盖全局样式
      nodeStateStyles: {
        'nodeState:default': {
          opacity: 1,
        },
        'nodeState:hover': {
          opacity: 0.8,
        },
        'nodeState:selected': {
          opacity: 0.9,
        },
      },
      // 默认边不同状态下的样式集合
      edgeStateStyles: {
        'edgeState:default': {
          stroke: '#aab7c3',
        },
        'edgeState:selected': {
          stroke: '#1890FF',
        },
        'edgeState:hover': {
          // animate: true,
          // animationType: 'dash',
          stroke: '#1890FF',
        },
      },
      plugins: [menu, minimap],
    });

    graph.current.data(initData);

    graph.current.render();

    // 监听鼠标进入节点事件
    graph.current.on('node:mouseenter', evt => {
      const node = evt.item;
      // 激活该节点的 hover 状态
      graph.current.setItemState(node, 'hover', true);
    });
    // 监听鼠标离开节点事件
    graph.current.on('node:mouseleave', evt => {
      const node = evt.item;
      // 关闭该节点的 hover 状态
      graph.current.setItemState(node, 'hover', false);
    });

    graph.current.on(
      'before-edge-add',
      ({ source, target, sourceAnchor, targetAnchor }) => {
        setTimeout(() => {
          graph.current.addItem('edge', {
            source: source.get('id'),
            target: target.get('id'),
            sourceAnchor,
            targetAnchor,
            // label:  'edge label',
          });
        }, 100);
      },
    );

    // @ts-ignore
    registerEdge(G6, !graph);
  }, []);

  return (
    <div style={{ height: 1000, width: 1000 }}>
      <div id="g6-xmind"></div>
    </div>
  );
};

export default G6Xmind;
