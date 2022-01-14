import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useNavigateSearch } from '@/hooks/useRouterDom';
import type { menuListProps } from '@mine/containers/WrapperAside/menuList';

import Styles from './Sidebar.module.less';

interface SidebarProps {
  menuList: menuListProps[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuList }) => {
  const navigateSearch = useNavigateSearch();
  const [searchParams] = useSearchParams();

  const curSource = searchParams.get('source');

  return (
    <ul className={Styles['sidebar-ul']}>
      {menuList.map((menuItem) => {
        return (
          <li
            key={menuItem.name}
            className={
              menuItem.name === curSource || (menuItem.name === '' && !curSource)
                ? Styles.selected
                : ''
            }
            onClick={() => {
              navigateSearch(
                '/mine',
                menuItem.name === ''
                  ? {}
                  : {
                      source: menuItem.name,
                    },
              );
            }}
          >
            <span>{menuItem.icon}</span>
            <span style={{ verticalAlign: '2px' }}>{menuItem.desc}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
