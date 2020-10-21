/**
 * @param {string} shapeType 支持 rect/circel/path 等内置节点
 * @param {string} getShapeStyle 用于覆盖 base-node 默认样式
 * @param {string} icon 图片 url
 * @param {string} labelCfg 文本节点样式
 */
import defaultStyles from '../../defaultStyles';

const {
  iconStyles,
  nodeStyles,
  anchorPointStyles,
  nodeLabelStyles,
} = defaultStyles;

function getStyle(options, cfg) {
  return {
    ...cfg,
    // 自定义默认样式
    ...nodeStyles,
    ...options,
    // 当前节点样式
    ...cfg.style,
    // 文本配置
    labelCfg: {
      ...nodeLabelStyles,
      ...cfg.labelCfg,
    },
    // 图标样式
    iconStyles: {
      ...iconStyles,
      ...cfg.iconStyles,
    },
    // 锚点样式
    anchorPointStyles: {
      ...anchorPointStyles,
      ...cfg.anchorPointStyles,
    },
    ...cfg.nodeStateStyles,
    // 锚点高亮样式
    anchorHotsoptStyles: cfg.anchorHotsoptStyles,
  };
}

export default G6 => {
  // 从 base-node 中扩展方形节点
  G6.registerNode(
    'rect-node',
    {
      shapeType: 'rect',
      // 当前节点的样式集合
      getShapeStyle(cfg) {
        const width = cfg.style.width || 80;
        const height = cfg.style.height || 40;

        return getStyle.call(
          this,
          {
            width,
            height,
            radius: 5,
            // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
            x: -width / 2,
            y: -height / 2,
          },
          cfg,
        );
      },
    },
    'base-node',
  );
};
