import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './home/Home.js';
import Raw from './home/Raw.js';
import Viewer from './home/viewer/Viewer.js';

function App() {
  return (
    <Router>
         <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/raw" element={<Raw />} />
          <Route exact path="/viewer" element={<Viewer />} />
         </Routes>
    </Router>
  );
}

export default App;
