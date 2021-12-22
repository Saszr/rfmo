import React from 'react';
import { useTransition, animated, config } from 'react-spring';
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

  const transitions = useTransition(asideDrawerIs, {
    config: config.stiff,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transitions(({ opacity }, item) =>
        item === null ? (
          ''
        ) : item ? (
          <animated.div
            style={{
              opacity,
            }}
          >
            <AsideDrawer />
          </animated.div>
        ) : (
          <animated.div
            style={{
              opacity,
            }}
          >
            <AsideBasic />
          </animated.div>
        ),
      )}
    </>
  );
};

export default WrapperAside;
