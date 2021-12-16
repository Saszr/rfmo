import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Mine from '@/pages/mine';

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/mine" />} />
      <Route path="/mine" element={<Mine />} />
      <Route path="*" element={<Navigate to="/mine" />} />
    </Routes>
  );
}

export default Index;
