import React from 'react';

import MainViewMenu from '@/pages/mine/components/MainViewMenu';
import Loading from '../Loading';

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

      <Loading />
    </div>
  );
};

export default Notify;
