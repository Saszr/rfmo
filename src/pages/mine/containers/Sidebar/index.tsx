import React from 'react';

import { Message, EventDetail, Random } from '@rsuite/icons';

import Styles from './Sidebar.module.less';

const Sidebar = () => {
  return (
    <ul className={Styles['sidebar-ul']}>
      <li className={Styles.selected}>
        <Message style={{ marginBottom: '3px' }} />
        MEMO
      </li>
      <li>
        <EventDetail style={{ marginBottom: '3px' }} />
        每日回顾
      </li>
      <li>
        <Random style={{ marginBottom: '3px' }} />
        随机漫步
      </li>
    </ul>
  );
};

export default Sidebar;
