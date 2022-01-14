import React from 'react';
import { FcSearch } from 'react-icons/fc';

import MainViewMenu from '@/pages/mine/components/MainViewMenu';
import Styles from './ViewTopBar.module.less';

interface ViewTopBarProps {
  title: string;
  search?: boolean;
}

const ViewTopBar: React.FC<ViewTopBarProps> = ({ title, search = false }) => {
  return (
    <div className={Styles['top-bar']}>
      <div className={Styles.left}>
        <MainViewMenu />
        <span>{title}</span>
      </div>

      {search && (
        <div className={Styles['search-bar-container']}>
          <div className={Styles['search-bar-inputer']}>
            <FcSearch style={{ marginRight: '3px' }} />
            <input type="text" placeholder="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTopBar;
