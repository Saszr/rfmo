import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Memo = React.lazy(() => import('./components/Memo'));
const Notify = React.lazy(() => import('./components/Notify'));

const Main = () => {
  const [searchParams] = useSearchParams();

  const curSource = searchParams.get('source');

  const mainMap = new Map([
    [null, <Memo />],
    ['notify', <Notify />],
  ]);

  return (
    <div style={{ width: '100%' }}>
      <React.Suspense fallback={<></>}>{mainMap.get(curSource)}</React.Suspense>
    </div>
  );
};

export default Main;
