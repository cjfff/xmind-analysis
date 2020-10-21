import React, { useEffect } from 'react';
import G6 from '@antv/g6/lib';

const initData = {
  // 点集
  nodes: [
    {
      id: 'node1', // 节点的唯一标识
      x: 100, // 节点横坐标
      y: 200, // 节点纵坐标
      label: '起始点', // 节点文本
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
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

const Page = () => {
  useEffect(() => {
    const request = async () => {
      const data = {
        nodes: [
          {
            id: 'root',
          },
        ],
        edges: [],
      };
      const grid = new G6.Grid();
      const minimap = new G6.Minimap({
        size: [100, 100],
        className: 'minimap',
        type: 'delegate',
      });
      const graph = new G6.Graph({
        container: 'mountNode', // 指定挂载容器
        width: 800, // 图的宽度
        height: 500, // 图的高度
        plugins: [minimap, grid],
        // fitView: true,
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            'drag-node',
            // {
            //   type: 'tooltip', // 提示框
            //   formatText(model) {
            //     // 提示框文本内容
            //     const text =
            //       'label: ' + model.label + '<br/> class: ' + model.class;
            //     return text;
            //   },
            // },
          ],
          edit: [],
        },

        fitViewPadding: [20, 40, 50, 20],
        layout: {
          type: 'mindmap',
          // linkDistance: 100, // 设置边长为 100
          preventOverlap: true, // 防止节点重叠
        },
        defaultNode: {
          type: 'rect',
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
          style: {
            fill: '#C6E5FF',
            stroke: '#5B8FF9',
          },
          linkPoints: {
            top: true,
            bottom: true,
            left: true,
            right: true,
            size: 3,
            stroke: '#fa8c16',
            fill: '#ffd591',
          },
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            stroke: '#A3B1BF',
          },
        },
      });

      // 鼠标进入节点
      graph.on('node:mouseenter', e => {
        const nodeItem = e.item; // 获取鼠标进入的节点元素对象
        graph.setItemState(nodeItem, 'hover', true); // 设置当前节点的 hover 状态为 true
      });

      // 鼠标离开节点
      graph.on('node:mouseleave', e => {
        const nodeItem = e.item; // 获取鼠标离开的节点元素对象
        graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
      });

      // 点击节点
      graph.on('node:click', e => {
        // 先将所有当前是 click 状态的节点置为非 click 状态
        const clickNodes = graph.findAllByState('node', 'click');
        clickNodes.forEach(cn => {
          graph.setItemState(cn, 'click', false);
        });
        const nodeItem = e.item; // 获取被点击的节点元素对象
        graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
      });

      // 点击边
      graph.on('edge:click', e => {
        // 先将所有当前是 click 状态的边置为非 click 状态
        const clickEdges = graph.findAllByState('edge', 'click');
        clickEdges.forEach(ce => {
          graph.setItemState(ce, 'click', false);
        });
        const edgeItem = e.item; // 获取被点击的边元素对象
        graph.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
      });
      // ...
      graph.data({
        nodes: [
          {
            id: 'root',
            label: '前端技能树',
            x: 200,
            y: 200,
            // anchorPoints: [
            //   [0, 1],
            //   [0.5, 1],
            // ],
          },
          {
            id: 'basic',
            label: '基础',
            x: 400,
            y: 300,
            // anchorPoints: [
            //   [0, 1],
            //   [0.5, 1],
            // ],
          },
          {
            id: 'frame',
            label: '框架',
            x: 400,
            y: 100,
            // anchorPoints: [
            //   [0, 1],
            //   [0.5, 1],
            // ],
          },
        ],
        edges: [
          {
            source: 'root',
            target: 'basic',
            label: '链接1',
            style: {
              endArrow: true,
            },
          },
          {
            source: 'root',
            target: 'frame',
            label: '链接2',
            style: {
              endArrow: true,
            },
          },
        ],
      }); // 加载远程数据

      graph.render(); // 渲染
    };

    request();
  }, []);

  // useEffect(() => {
  //   const graph = new G6.Graph({
  //     container: 'mountNode', // 指定挂载容器
  //     width: 800, // 图的宽度
  //     height: 500, // 图的高度
  //     fitView: true,
  //   });

  //   graph.data(initData);

  //   graph.render();
  // }, []);

  return (
    <div id="mountNode" style={{ height: 1000, width: 800 }}>
      Page
    </div>
  );
};

export default Page;
