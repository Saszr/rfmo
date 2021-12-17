import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MineStoreContainer from '@/store/MineStoreContainer';

import Mine from '@/pages/mine';
import Login from '@/pages/login';

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/mine" />} />
      <Route
        path="/mine"
        element={
          <MineStoreContainer.Provider>
            <Mine />
          </MineStoreContainer.Provider>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/mine" />} />
    </Routes>
  );
}

export default Index;
