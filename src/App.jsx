import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lessons from './pages/Lessons';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lessons" element={<Lessons />} />
    </Routes>
  </Router>
);

export default App;