import React from 'react';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import { Message, EventDetail, Random } from '@rsuite/icons';

import Styles from './Sidebar.module.less';

const menu = [
  {
    name: '',
    desc: 'MEMO',
    icon: <Message style={{ marginBottom: '3px' }} />,
  },
  {
    name: 'notify',
    desc: '每日回顾',
    icon: <EventDetail style={{ marginBottom: '3px' }} />,
  },
  {
    name: 'lucky',
    desc: '随机漫步',
    icon: <Random style={{ marginBottom: '3px' }} />,
  },
];

const useNavigateSearch = () => {
  const navigate = useNavigate();
  return (pathname: string, params: Record<string, any>) =>
    navigate(`${pathname}?${createSearchParams(params)}`);
};

const Sidebar = () => {
  const navigateSearch = useNavigateSearch();
  const [searchParams] = useSearchParams();

  const curSource = searchParams.get('source');

  return (
    <ul className={Styles['sidebar-ul']}>
      {menu.map((menuItem) => {
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
            {menuItem.icon}
            {menuItem.desc}
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
