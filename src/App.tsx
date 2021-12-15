import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { CustomProvider } from 'rsuite';
import zhCN from 'rsuite/locales/zh_CN';

import Index from './pages';

const App = () => {
  return (
    <Router>
      <CustomProvider locale={zhCN}>
        <Index />
      </CustomProvider>
    </Router>
  );
};

export default App;
