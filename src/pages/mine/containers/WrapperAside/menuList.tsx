import React from 'react';

import { CgToday } from 'react-icons/cg';
import { MdToday } from 'react-icons/md';
import { BsFillSignpost2Fill } from 'react-icons/bs';

const menuList = [
  {
    name: '',
    desc: 'MEMO',
    icon: <CgToday />,
  },
  {
    name: 'notify',
    desc: '每日回顾',
    icon: <MdToday />,
  },
  {
    name: 'lucky',
    desc: '随机漫步',
    icon: <BsFillSignpost2Fill />,
  },
];

export default menuList;
