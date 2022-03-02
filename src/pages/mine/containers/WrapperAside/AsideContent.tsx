import React from 'react';
import { RiSettings6Line } from 'react-icons/ri';
import { VscGithubInverted } from 'react-icons/vsc';

import { useNavigateSearch } from '@/hooks/useRouterDom';
import Stats from '@mine/containers/Stats';
import Sidebar from '@mine/containers/WrapperAside/Sidebar';
import menuList from './menuList';
import TagsMenu from './TagsMenu';

import Styles from './WrapperAside.module.less';

const HeaderUser = () => {
  const navigateSearch = useNavigateSearch();

  return (
    <div className={Styles['header-user']}>
      <span>Workspace</span>
      <div className={Styles.icons}>
        <span
          onClick={() => {
            window.open('https://github.com/Saszr/rfmo', '_blank');
          }}
        >
          <VscGithubInverted style={{ fontSize: '18px', color: '#9e9e9e' }} />
        </span>
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
      <Stats />
      <Sidebar menuList={menuList} />
      {/* <TagsMenu /> */}
    </>
  );
};

export default React.memo(AsideContent);
