import React, { useEffect, useRef } from 'react';
import G6, { Graph } from '@antv/g6';
import registerFactory from './_helper/index';

import { data } from './_data';
import config from './_helper/const';

registerFactory(G6);

const Page = () => {
  const ref = useRef<Graph>(null);
  let graph: Graph | null = null;

  useEffect(() => {
    if (!graph) {
      graph = new G6.TreeGraph({
        container: 'g6-demo',
        width: 1200,
        height: 1200,
        modes: {
          default: [
            {
              type: 'collapse-expand',
            },
            'drag-canvas',
            'zoom-canvas',
          ],
        },
        defaultNode: {
          type: 'treeNode',
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
        },
        defaultEdge: {
          type: 'smooth',
        },
        fitView: true,
        layout: {
          type: 'compactBox',
          direction: 'LR',
          getId: function getId(d) {
            return d.id;
          },
          getHeight: function getHeight() {
            return 16;
          },
          getWidth: function getWidth(d) {
            const labelWidth = G6.Util.getTextSize(
              d.label,
              config.baseConfig.nameFontSize,
            )[0];
            const width =
              config.baseConfig.itemPadding +
              config.baseConfig.nameMarginLeft +
              labelWidth +
              config.baseConfig.rootPadding +
              config.baseConfig.childCountWidth;
            return width;
          },
          getVGap: function getVGap() {
            return 15;
          },
          getHGap: function getHGap() {
            return 30;
          },
        },
      });

      graph.data(data);

      graph.render();
    }
  }, []);
  return <div id="g6-demo" style={{ height: 1200, width: '100%' }}></div>;
};

export default Page;
