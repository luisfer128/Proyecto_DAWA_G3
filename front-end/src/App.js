import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RecuperarPass from './components/RecuperarPass';
import HomePage from './components/HomePage';

function App() {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  const handleLoginSuccess = (data) => {
    setUser(data.user);
    setRoles(data.rols);
  };

  return (
    <Router>
      <Routes>
        <Route path="/recuperar-pass" element={<RecuperarPass />} />
        <Route path="*" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} /> {/* Default to LoginPage */}
        <Route
          path="/home"
          element={!user ? <LoginPage onLoginSuccess={handleLoginSuccess} /> : <HomePage user={user} roles={roles} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
