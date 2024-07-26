import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RecuperarPass from './Pages/RecuperarPass';
import HomePage from './Pages/HomePage';
import Register from './Pages/RegisterForm';
import Perfil from './Pages/Perfil';
import PerfilAmigo from './Pages/PerfilAmigo'; // Importar el componente PerfilAmigo

function App() {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const savedUser = sessionStorage.getItem('user');
        const savedRoles = sessionStorage.getItem('roles');
        const token = sessionStorage.getItem('token');

        if (savedUser && savedRoles && token) {
            setUser(JSON.parse(savedUser));
            setRoles(JSON.parse(savedRoles));
        }
    }, []);

    const handleLoginSuccess = (token, userData) => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('roles', JSON.stringify(userData.roles));

        setUser(userData);
        setRoles(userData.roles);
    };

    return (
        <Router>
            <Routes>
                <Route path="/recuperar-pass" element={<RecuperarPass />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/perfil" element={user ? <Perfil user={user} /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/home" element={user ? <HomePage user={user} roles={roles} /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/amigo/:friendId" element={<PerfilAmigo user={user} />} /> {/* Nueva ruta para PerfilAmigo */}
                <Route path="*" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} /> {/* Default to LoginPage */}
            </Routes>
        </Router>
    );
}

export default App;
