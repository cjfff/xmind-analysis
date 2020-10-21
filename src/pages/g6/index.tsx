import React, { useEffect, useRef } from 'react';
import G6 from '@antv/g6/lib';
import { Graph } from '@antv/g6';
import registerShape from './_helper/shape';
import registerBehavior from './_helper/behavior';
registerShape(G6);
registerBehavior(G6);

const Page = () => {
  const graph = useRef<Graph>();
  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!graphDiv.current) return;

    graph.current = new G6.Graph({
      plugins: [],
      container: graphDiv.current,
      height: 800,
      width: 1000,
      modes: {
        default: ['drag-canvas', 'clickSelected', 'dragNode', 'dragEdge'],
        view: [],
        edit: [
          'drag-canvas',
          'hoverNodeActived',
          'hoverAnchorActived',
          'dragNode',
          'dragEdge',
          'dragPanelItemAddNode',
          'clickSelected',
          'deleteItem',
          'itemAlign',
          'dragPoint',
          'brush-select',
        ],
      },
      defaultEdge: {
        type: 'flow-polyline-round',
      },
    });

    const data = {
      nodes: [
        { id: 'startNode1', x: 50, y: 200, label: '', clazz: 'start' },
        { id: 'startNode2', x: 50, y: 320, label: '', clazz: 'timerStart' },
        {
          id: 'taskNode1',
          x: 200,
          y: 200,
          label: '主任审批',
          clazz: 'userTask',
        },
        {
          id: 'taskNode2',
          x: 400,
          y: 200,
          label: '经理审批',
          clazz: 'scriptTask',
        },
        {
          id: 'gatewayNode',
          x: 400,
          y: 320,
          label: '金额大于1000',
          clazz: 'inclusiveGateway',
        },
        {
          id: 'taskNode3',
          x: 400,
          y: 450,
          label: '董事长审批',
          clazz: 'receiveTask',
        },
        {
          id: 'catchNode1',
          x: 600,
          y: 200,
          label: '等待结束',
          clazz: 'signalCatch',
        },
        { id: 'endNode', x: 600, y: 320, label: '', clazz: 'end' },
      ],
      edges: [
        {
          source: 'startNode1',
          target: 'taskNode1',
          sourceAnchor: 1,
          targetAnchor: 3,
          clazz: 'flow',
        },
        {
          source: 'startNode2',
          target: 'gatewayNode',
          sourceAnchor: 1,
          targetAnchor: 3,
          clazz: 'flow',
        },
        {
          source: 'taskNode1',
          target: 'catchNode1',
          sourceAnchor: 0,
          targetAnchor: 0,
          clazz: 'flow',
        },
        {
          source: 'taskNode1',
          target: 'taskNode2',
          sourceAnchor: 1,
          targetAnchor: 3,
          clazz: 'flow',
        },
        {
          source: 'taskNode2',
          target: 'gatewayNode',
          sourceAnchor: 1,
          targetAnchor: 0,
          clazz: 'flow',
        },
        {
          source: 'taskNode2',
          target: 'taskNode1',
          sourceAnchor: 2,
          targetAnchor: 2,
          clazz: 'flow',
        },
        {
          source: 'gatewayNode',
          target: 'taskNode3',
          sourceAnchor: 2,
          targetAnchor: 0,
          clazz: 'flow',
        },
        {
          source: 'gatewayNode',
          target: 'endNode',
          sourceAnchor: 1,
          targetAnchor: 2,
          clazz: 'flow',
        },
        {
          source: 'taskNode3',
          target: 'endNode',
          sourceAnchor: 1,
          targetAnchor: 1,
          clazz: 'flow',
        },
        {
          source: 'catchNode1',
          target: 'endNode',
          sourceAnchor: 1,
          targetAnchor: 0,
          clazz: 'flow',
        },
      ],
    };

    graph.current.data(data);

    graph.current.fitView(5);

    graph.current.render();

    // 鼠标进入节点
    graph.current.on('node:mouseenter', e => {
      console.log('hell world');
      const nodeItem = e.item; // 获取鼠标进入的节点元素对象
      graph.current.setItemState(nodeItem, 'hover-node', true);
      // graph.current.setItemState(nodeItem, 'hover', true); // 设置当前节点的 hover 状态为 true
    });

    // 鼠标离开节点
    graph.current.on('node:mouseleave', e => {
      const nodeItem = e.item; // 获取鼠标离开的节点元素对象
      graph.current.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
    });
  }, [graphDiv.current]);

  return (
    <div
      id="g6-container"
      style={{ height: 800, width: 1000 }}
      ref={graphDiv}
    ></div>
  );
};

export default Page;
