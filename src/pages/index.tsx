import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Mine = React.lazy(() => import('@/pages/mine'));

const style = { height: '100%' };

function Index() {
  return (
    <React.Suspense
      fallback={() => {
        console.log('Suspense');
      }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/mine" />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="*" element={<Navigate to="/mine" />} />
      </Routes>
    </React.Suspense>
  );
}

export default Index;
