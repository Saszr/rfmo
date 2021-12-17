import React from 'react';
import ReactDOM from 'react-dom';

import Styles from './Drawer.module.less';

/**
 * Drawer 抽屉组件
 * @param {visible} bool 抽屉是否可见
 * @param {closable} bool 是否显示右上角的关闭按钮
 * @param {destroyOnClose} bool 关闭时销毁里面的子元素
 * @param {mask} bool 是否展示遮罩
 * @param {maskClosable} bool 点击蒙层是否允许关闭抽屉
 * @param {drawerStyle} object 用来设置抽屉弹出层样式
 * @param {width} number|string 弹出层宽度
 * @param {zIndex} number 弹出层层级
 * @param {placement} string 抽屉方向
 * *@param {getContainer} HTMLElement 指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom
 * @param {onClose} void 点击关闭时的回调
 */
interface DrawerProps {
  visible: boolean;
  destroyOnClose?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  drawerStyle?: Record<string, any>;
  width?: string;
  zIndex?: number;
  placement?: string;
  getContainer?: HTMLElement | false;
  onClose?: () => void;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const {
    visible,
    destroyOnClose = false,
    mask = true,
    maskClosable = true,
    drawerStyle,
    width = '80%',
    zIndex = 1060,
    placement = 'left',
    getContainer = document.body,
    onClose,
  } = props;

  // 控制关闭弹框清空弹框里面的元素
  const [clearContentDom, setClearContentDom] = React.useState(false);

  // 控制drawer 的显示隐藏
  const [drawerVisible, setDrawerVisible] = React.useState(visible);
  React.useEffect(() => {
    setDrawerVisible(() => {
      if (getContainer !== false && visible) {
        getContainer.style.overflow = 'hidden';
      }
      return visible;
    });
    if (visible) {
      setClearContentDom(false);
    }
  }, [visible, getContainer]);

  // 点击弹框关闭
  const handleClose = () => {
    setDrawerVisible((prev) => {
      if (getContainer !== false && prev) {
        getContainer.style.overflow = 'auto';
      }
      return false;
    });

    if (onClose) onClose();

    if (destroyOnClose) {
      setClearContentDom(true);
    }
  };

  const drawerDom = (
    <>
      <div
        className={Styles.drawerWarp}
        style={{
          width: '100%',
          zIndex,
          position: getContainer === false ? 'absolute' : 'fixed',
          transform: drawerVisible ? 'translateX(0%)' : 'translateX(-100%)',
        }}
      >
        {mask && (
          <div className={Styles.drawerMask} onClick={maskClosable ? handleClose : undefined} />
        )}

        <div
          className={Styles.drawerContent}
          style={{
            width,
            [placement]: 0,
            ...drawerStyle,
          }}
        >
          {clearContentDom ? null : props.children}
        </div>
      </div>

      {mask && (
        <div
          style={{
            width: '100%',
            zIndex: drawerVisible ? zIndex - 1 : -1,
            opacity: drawerVisible ? 0.5 : 0,
          }}
          className={Styles.drawerBackgroundMask}
        />
      )}
    </>
  );

  return getContainer === false && !getContainer
    ? drawerDom
    : ReactDOM.createPortal(drawerDom, getContainer);
};

export default Drawer;
