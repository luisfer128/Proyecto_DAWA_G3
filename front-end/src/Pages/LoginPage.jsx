import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Grid } from '@mui/material';
import ModalError from '../components/ModalError';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginStyle.css';

function LoginPage({ onLoginSuccess }) {
    const [login_user, setlogin_user] = useState('');
    const [login_password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://26.127.175.34:5000/segu/login', {
                login_user,
                login_password,
            });
            //console.log('Login Response:', response.data); // Agrega esta línea para verificar la respuesta

            if (!response.data.result) {
                throw new Error(response.data.message);
            }
            
            // Almacena el token en sessionStorage
            onLoginSuccess(response.data.data.token, response.data.data.user_data);
            navigate('/home');
        } catch (error) {
            setError('Usuario o contraseña incorrectos');
            setModalOpen(true);
            
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    }
    const handleRegister = () => {
        navigate('/registro');
    };

    const handleRecuperarPass = () => {
        navigate('/recuperar-pass');
    };
    return (
        <Box className="body-form-login"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 64px)', 
                padding: '16px',
            }}
        >
                <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} sm={5}>
                        <Box className="content-box" sx={{ color: 'white', textAlign: 'center', ml:10 }}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#868fcd' }}>
                                Social UG
                            </Typography>
                            <Typography variant="body1">
                                Social UG te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.
                            </Typography>
                        </Box>
                    </Grid>
                <Grid item xs={12} sm={7} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box className="container_primary" sx={{ padding: '16px', maxWidth: 400 }}>
                        <Typography component="h1" variant="h4" sx={{ color: 'white', textAlign: 'center' }}>
                            Iniciar Sesión
                        </Typography>
                        <Box>
                            <TextField
                                label="Nombre de Usuario"
                                value={login_user}
                                onChange={(e) => setlogin_user(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{ style: { color: 'white' } }}
                            />
                            <TextField
                                label="Contraseña"
                                type="password"
                                value={login_password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{ style: { color: 'white' } }}
                            />
                            <Typography
                                onClick={handleRecuperarPass}
                                sx={{
                                    display: 'block',
                                    marginTop: 2,
                                    color: 'white',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                ¿Olvidaste tu contraseña?
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleLogin}
                                    disabled={loading}
                                    fullWidth
                                    sx={{ mr: 1 }}
                                >
                                    {loading ? <CircularProgress size={24} sx={{ color: 'white', ml: 4 }} /> : 'Iniciar Sesión'}
                                    {loading ? 'Cargando...' : ''}
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleRegister}
                                    disabled={loading}
                                    fullWidth
                                    sx={{ ml: 1 }}
                                >
                                    Crear cuenta
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <ModalError open={modalOpen} handleClose={handleCloseModal} errorMessage={error} />
        </Box>
    );
}

export default LoginPage;