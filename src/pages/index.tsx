import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Mine from '@/pages/mine';
import Login from '@/pages/login';

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/mine" />} />
      <Route path="/mine" element={<Mine />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/mine" />} />
    </Routes>
  );
}

export default Index;
