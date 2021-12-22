import React from 'react';

import MainViewMenu from '@/pages/mine/components/MainViewMenu';

import Styles from '../view.module.less';

const Notify = () => {
  return (
    <div>
      <div className={Styles.topBar}>
        <div className={Styles.left}>
          <MainViewMenu />
          <span>Notify</span>
        </div>

        <span>🔍</span>
      </div>
    </div>
  );
};

export default Notify;
