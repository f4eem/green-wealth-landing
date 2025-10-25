import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Women from './pages/Home';
import Men from './pages/Men';
import Skin from './pages/Skin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/skin" element={<Skin />} />
      </Routes>
    </Router>
  );
}

export default App;