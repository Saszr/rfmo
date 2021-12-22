import React from 'react';
import MineStoreContainer from '@/store/MineStoreContainer';
import MenuIcon from '@rsuite/icons/Menu';

import Editor from './Editor';

import Styles from './Memo.module.less';

const Memo = () => {
  const { asideDrawerIs, setAsideDrawerVisible } = MineStoreContainer.usePicker([
    'asideDrawerIs',
    'setAsideDrawerVisible',
  ]);

  return (
    <div>
      <div className={Styles.topBar}>
        <div className={Styles.left}>
          {asideDrawerIs ? (
            <span
              style={{ fontSize: '14px', cursor: 'pointer' }}
              onClick={() => {
                setAsideDrawerVisible(true);
              }}
            >
              <MenuIcon style={{ marginBottom: '6px', marginRight: '6px' }} />
            </span>
          ) : (
            ''
          )}

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
