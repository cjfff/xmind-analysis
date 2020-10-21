import React, { useEffect, useRef } from 'react';
import MindElixir, { E } from 'mind-elixir';
import painter from 'mind-elixir/dist/painter';

interface MindNode {
  /**
   * label
   */
  topic: string;

  /**
   * 唯一标志
   */
  id: string | number;

  /**
   * 是否是根结点
   */
  root?: boolean;

  /**
   * 默认是否展开
   */
  expanded?: boolean;

  /**
   * 额外的样式定义
   */
  style?: {
    [key: string]: string;
  };

  tag?: string[];

  icons?: string[];

  children?: MindNode[];
}

const Page = () => {
  const ME = useRef(null);

  useEffect(() => {
    ME.current = new MindElixir({
      el: '#map',
      direction: MindElixir.SIDE,
      // data: MindElixir.new('new topic'),
      data: {
        nodeData: {
          id: 'root',
          topic: '前端技能树',
          root: true,
          tags: ['Tag'],
          icons: ['😀'],
          children: [
            {
              topic: '基础技能',
              id: 'basic',
              children: [
                { topic: 'html', id: 'html', style: { fontSize: '32' } },
                {
                  topic: 'css',
                  id: 'css',
                  style: { fontWeight: 'bold', fontSize: '24' },
                },
                { topic: 'js', id: 'js' },
                { topic: 'typescript', id: 'typescript' },
              ],
              style: { color: '#9b59b6' },
            },
            {
              topic: '框架',
              id: 'frame',
              children: [
                { topic: 'vue', id: 'vue' },
                {
                  topic: 'react',
                  id: 'react',
                  children: [
                    { topic: 'antd', id: 'antd' },
                    { topic: 'umi', id: 'umi' },
                    { topic: 'antv', id: 'antv' },
                  ],
                },
                { topic: 'angular', id: 'angular' },
              ],
              style: { color: '#3298db' },
            },
          ],
          expanded: true,
        } as MindNode,
        linkData: {},
      },
      draggable: true, // default true
      contextMenu: true, // default true
      toolBar: true, // default true
      nodeMenu: true, // default true
      keypress: true, // default true，
      locale: 'zh_CN',
    });
    if (ME.current) {
      ME.current?.init?.();
      window.ME = ME;
    }
  }, []);
  return (
    <>
      <button onClick={() => console.log(ME.current?.getAllDataString())}>
        get Data
      </button>
      <button onClick={() => painter.exportPng()}>get png</button>
      <div id="map" style={{ height: 800, width: '100%' }}></div>
    </>
  );
};

export default Page;
