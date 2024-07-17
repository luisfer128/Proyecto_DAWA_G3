import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RecuperarPass from './components/RecuperarPass';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recuperar-pass" element={<RecuperarPass />} />
        <Route path="*" element={<LoginPage />} /> {/* Default to LoginPage */}
      </Routes>
    </Router>
  );
}

export default App;
