import React from 'react';
import ReactDOM from 'react-dom';

export interface DrawerProps {
  visible: boolean;
  destroyOnClose?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  drawerStyle?: Record<string, any>;
  width?: string;
  zIndex?: number;
  placement?: string;
  getContainer?: HTMLElement;
  onClose?: () => void;
}

const BaseDrawer: React.FC<DrawerProps> = (props) => {
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
    children,
  } = props;

  const [drawerVisible, setDrawerVisible] = React.useState(visible);
  const [clearContentDom, setClearContentDom] = React.useState(false);

  React.useEffect(() => {
    setDrawerVisible(visible);
    if (visible) {
      setClearContentDom(false);
    }
  }, [visible]);

  const handleClose = () => {
    setDrawerVisible(false);

    if (onClose) onClose();

    if (destroyOnClose) {
      setClearContentDom(true);
    }
  };

  const dom = (
    <div
      className={`drawer-root ${drawerVisible ? 'drawer-root-open' : ''}`}
      style={{
        zIndex,
      }}
    >
      {mask && <div className={'drawer-mask'} onClick={maskClosable ? handleClose : undefined} />}
      <div
        className={'drawer-container'}
        style={{
          transform: drawerVisible ? '' : 'translateX(-100%)',
          width,
          [placement]: 0,
          ...drawerStyle,
        }}
      >
        {clearContentDom ? null : children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(dom, getContainer);
};

const Drawer: React.FC<DrawerProps> = ({ children, ...restProps }) => {
  return <BaseDrawer {...restProps}>{children}</BaseDrawer>;
};

export default Drawer;
