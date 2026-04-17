import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import Analytics from './pages/Analytics';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard onPageChange={setCurrentPage} />} />
          <Route path="/activity" element={<Activity onPageChange={setCurrentPage} />} />
          <Route path="/analytics" element={<Analytics onPageChange={setCurrentPage} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
