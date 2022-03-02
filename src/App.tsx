import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import PageRoutes from './router';

const App = () => {
  return (
    <Router>
      <PageRoutes />
    </Router>
  );
};

export default App;
