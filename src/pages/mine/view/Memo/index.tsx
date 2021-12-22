import React from 'react';

import MainViewMenu from '@/pages/mine/components/MainViewMenu';
import Editor from '../../components/RichEditor';

import Styles from '../view.module.less';

const Memo = () => {
  return (
    <div>
      <div className={Styles.topBar}>
        <div className={Styles.left}>
          <MainViewMenu />
          <span>MEMO</span>
        </div>

        <span>🔍</span>
      </div>
      <div className={Styles.input}>
        <Editor />
      </div>
    </div>
  );
};

export default Memo;
