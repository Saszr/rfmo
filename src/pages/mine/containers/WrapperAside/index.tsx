import React from 'react';
import { useSize } from 'ahooks';

import MineStoreContainer from '@/store/MineStoreContainer';
import Drawer from '@/components/Drawer';
import AsideContent from './AsideContent';

import Styles from './WrapperAside.module.less';

const AsideBasic = () => {
  return (
    <aside className={Styles.aside}>
      <AsideContent />
    </aside>
  );
};

const AsideDrawer = () => {
  const { asideDrawerVisible, setAsideDrawerVisible } = MineStoreContainer.usePicker([
    'asideDrawerVisible',
    'setAsideDrawerVisible',
  ]);

  const [normalAsideWidth, setNormalAsideWidth] = React.useState('300px');

  const bodySize = useSize(document.querySelector('body'));

  React.useEffect(() => {
    if (bodySize) {
      const { width: bodyWidth } = bodySize;
      if (bodyWidth <= 375) {
        setNormalAsideWidth('80%');
      } else {
        setNormalAsideWidth('300px');
      }
    }
  }, [bodySize]);

  return (
    <Drawer
      visible={asideDrawerVisible}
      width={normalAsideWidth}
      onClose={() => {
        setAsideDrawerVisible(false);
      }}
    >
      <div style={{ padding: '0 10px' }}>
        <AsideContent />
      </div>
    </Drawer>
  );
};

const WrapperAside = () => {
  const { asideDrawerIs } = MineStoreContainer.usePicker(['asideDrawerIs']);

  return (
    <>
      {asideDrawerIs === true && <AsideDrawer />}
      {asideDrawerIs === false && <AsideBasic />}
    </>
  );
};

export default WrapperAside;
