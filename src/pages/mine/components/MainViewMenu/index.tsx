import React from 'react';
import MineStoreContainer from '@/store/MineStoreContainer';
import { MdMenu } from 'react-icons/md';

const MainViewMenu = () => {
  const { asideDrawerIs, setAsideDrawerVisible } = MineStoreContainer.usePicker([
    'asideDrawerIs',
    'setAsideDrawerVisible',
  ]);

  return (
    <>
      {asideDrawerIs ? (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginRight: '6px',
          }}
          onClick={() => {
            setAsideDrawerVisible(true);
          }}
        >
          <MdMenu style={{ fontSize: '18px' }} />
        </span>
      ) : (
        ''
      )}
    </>
  );
};

export default MainViewMenu;
