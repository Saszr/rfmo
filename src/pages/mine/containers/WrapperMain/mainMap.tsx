import React from 'react';

const Memo = React.lazy(() => import('@/pages/mine/view/Memo'));
const Notify = React.lazy(() => import('@/pages/mine/view/Notify'));
const Lucky = React.lazy(() => import('@/pages/mine/view/Lucky'));
const Settings = React.lazy(() => import('@/pages/mine/view/Settings'));

const mainMap = new Map([
  [null, <Memo />],
  ['notify', <Notify />],
  ['lucky', <Lucky />],
  ['settings', <Settings />],
]);

export default mainMap;
