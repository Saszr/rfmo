import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import Index from './pages';

const App = () => {
  return (
    <Router>
      <Index />
    </Router>
  );
};

export default App;
