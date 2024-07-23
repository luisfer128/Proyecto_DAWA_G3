import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RecuperarPass from './Pages/RecuperarPass';
import HomePage from './Pages/HomePage';
import Register from './Pages/RegisterForm';

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
                <Route path="/registro" element={<Register />} />
                <Route path="*" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} /> {/* Default to LoginPage */}
                <Route 
                    path="/home" 
                    element={user ? <HomePage user={user} roles={roles} /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
