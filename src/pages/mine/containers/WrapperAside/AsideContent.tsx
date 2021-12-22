import React from 'react';

import Stat from '@/pages/mine/components/Stat';
import Sidebar from '@/pages/mine/components/Sidebar';

const AsideContent = () => {
  return (
    <>
      <h3>Sheng</h3>
      <Stat />
      <Sidebar />
    </>
  );
};

export default React.memo(AsideContent);
