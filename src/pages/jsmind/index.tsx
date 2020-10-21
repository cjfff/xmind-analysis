import React, { useEffect, useRef } from 'react';
import 'jsmind/style/jsmind.css';
import jsMxind from 'jsmind';
import 'jsmind/js/jsmind.js';
// import 'jsmind/js/jsmind.draggable.js';
// import 'jsmind/js/jsmind.screenshot.js';

import { useJsMindDraggable } from './_helper/index';

useJsMindDraggable(jsMxind);

const JsXmindPage = () => {
  const xmindDivRef = useRef<HTMLDivElement>(null);
  const xmind = useRef();

  useEffect(() => {
    if (!xmindDivRef.current) return;

    var mind = {
      /* 元数据，定义思维导图的名称、作者、版本等信息 */
      meta: {
        name: 'example',
        author: 'hizzgdev@163.com',
        version: '0.2',
      },
      /* 数据格式声明 */
      format: 'node_array',
      /* 数据内容 */
      data: [
        { id: 'root', isroot: true, topic: '前端技能树' },

        // 基础
        {
          id: 'basic',
          parentid: 'root',
          topic: '基础技能',
          direction: 'right',
        },
        { id: 'html', parentid: 'basic', topic: 'html' },
        { id: 'css', parentid: 'basic', topic: 'css' },
        { id: 'js', parentid: 'basic', topic: 'js' },
        { id: 'typescript', parentid: 'basic', topic: 'typescript' },

        // 框架
        { id: 'frame', parentid: 'root', topic: '框架', direction: 'right' },

        { id: 'vue', parentid: 'frame', topic: 'vue' },
        { id: 'react', parentid: 'frame', topic: 'react' },

        { id: 'antd', parentid: 'react', topic: 'antd' },
        { id: 'umi', parentid: 'react', topic: 'umi' },
        { id: 'antv', parentid: 'react', topic: 'antv' },

        { id: 'angular', parentid: 'frame', topic: 'angular' },
      ],
    };

    var options = {
      // options 将在下一章中详细介绍
      container: xmindDivRef.current, // [必选] 容器的ID，或者为容器的对象
      editable: true, // [可选] 是否启用编辑
      mode: 'full',
      // theme: 'orange', // [可选] 主题
    };

    xmind.current = new jsMxind(options);

    xmind.current.show(mind);
  }, [xmindDivRef]);

  return (
    <div
      ref={xmindDivRef}
      id="js-xmind"
      style={{ height: '100vh', width: '100%' }}
    ></div>
  );
};

export default JsXmindPage;
