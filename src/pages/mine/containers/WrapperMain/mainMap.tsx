import React from 'react';

const Memo = React.lazy(() => import('@/pages/mine/view/Memo'));
const Notify = React.lazy(() => import('@/pages/mine/view/Notify'));
const Lucky = React.lazy(() => import('@/pages/mine/view/Lucky'));

const mainMap = new Map([
  [null, <Memo />],
  ['notify', <Notify />],
  ['lucky', <Lucky />],
]);

export default mainMap;
