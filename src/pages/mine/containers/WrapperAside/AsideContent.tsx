import React from 'react';
import { RiSettings6Line } from 'react-icons/ri';
import { useNavigateSearch } from '@/hooks/useRouterDom';

import Stat from '@/pages/mine/components/Stat';
import Sidebar from '@/pages/mine/components/Sidebar';

import Styles from './WrapperAside.module.less';

const HeaderUser = () => {
  const navigateSearch = useNavigateSearch();

  return (
    <div className={Styles['header-user']}>
      <span>Workspace</span>
      <div className={Styles.icons}>
        <span
          onClick={() => {
            navigateSearch('/mine', {
              source: 'settings',
            });
          }}
        >
          <RiSettings6Line style={{ fontSize: '18px', color: '#9e9e9e' }} />
        </span>
      </div>
    </div>
  );
};

const AsideContent = () => {
  return (
    <>
      <HeaderUser />
      <Stat />
      <Sidebar />
    </>
  );
};

export default React.memo(AsideContent);
