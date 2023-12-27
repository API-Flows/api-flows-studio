import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './home/Home.js';
import WorkflowViewer from './home/WorkflowViewer.js';

function App() {
  return (
    <Router>
         <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/viewer" element={<WorkflowViewer />} />
         </Routes>
    </Router>
  );
}

export default App;
