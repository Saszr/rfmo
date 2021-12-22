import React from 'react';
import { useSearchParams } from 'react-router-dom';

import mainMap from './mainMap';

import Styles from './WrapperMain.module.less';

const WrapperMain = () => {
  const [searchParams] = useSearchParams();

  const curSource = searchParams.get('source');

  return (
    <main className={Styles.main}>
      <div style={{ width: '100%' }}>
        <React.Suspense fallback={<></>}>{mainMap.get(curSource)}</React.Suspense>
      </div>
    </main>
  );
};

export default WrapperMain;
