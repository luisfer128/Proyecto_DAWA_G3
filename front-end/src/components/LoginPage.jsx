import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import '../styles/LoginStyle.css';

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://100.113.27.1:3200/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const { username } = data;
                onLogin(username); 
            } else {
                setError('Credenciales incorrectas o no existentes');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        setIsRegistering(true);
    };

    const handleBackToLogin = () => {
        setIsRegistering(false);
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
            {!isRegistering ? (
                <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center'}}>
                    <Grid item xs={4}>
                        <Box className="content-box" sx={{ color: 'white', padding: '16px', mr:'2' }}>
                            <Typography variant="h4" gutterBottom 
                                sx={{
                                    color:' #868fcd', 
                                    display: 'flex', 
                                    justifyContent: 'center'
                                }}>
                                Social UG</Typography>
                            <Typography variant="body1">Social UG te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box className="container_primary">
                            <Typography component="h1" variant="h4" color="text.primary"
                            sx={{ 
                                color: 'white', 
                                display: 'flex', 
                                justifyContent: 'center'
                            }}>
                                Iniciar Sesión
                            </Typography>
                            <Box sx={{ width: '100%', maxWidth: 400 }}>
                                <TextField
                                    label="Nombre de Usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    InputProps={{ style: { color: 'white' } }}
                                />
                                <TextField
                                    label="Contraseña"
                                    type="password"
                                    value={password}
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
                                        alignContent:'center',
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
                                {error && (
                                    <Typography color="error" sx={{ mt: 2 }}>
                                        {error}
                                    </Typography>
                                )}
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleLogin}
                                        disabled={loading}
                                        fullWidth
                                        sx={{ mt: 2, mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        {loading ? <CircularProgress size={24} sx={{ color: 'white', mr: -11 }} /> : 'Iniciar Sesión'}
                                        {loading ? 'Cargando...' : ''}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleRegister}
                                        disabled={loading}
                                        fullWidth
                                        sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        Crear cuenta
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            ) : (
                <Grid className="body-form-register" container spacing={2} sx={{ display: 'flex', alignItems: 'center'}}>
                    <Grid item xs={8}>
                        <Box className="container_primary">
                            <Typography component="h1" variant="h4" color="text.primary" 
                                sx={{ 
                                    color: 'white', 
                                    display: 'flex', 
                                    justifyContent: 'center'
                                }}>
                                Registrarse
                            </Typography>
                            <Box sx={{ width: '100%', maxWidth: 400 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Correo Electrónico"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: { color: 'white' } }}
                                            InputProps={{ style: { color: 'white' } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Nombre"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: { color: 'white' } }}
                                            InputProps={{ style: { color: 'white' } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Apellido"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: { color: 'white' } }}
                                            InputProps={{ style: { color: 'white' } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel style={{ color: 'white' }}>Fecha de Nacimiento</InputLabel>
                                        <FormControl fullWidth margin="normal">    
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <Select
                                                        value={day}
                                                        onChange={(e) => setDay(e.target.value)}
                                                        fullWidth
                                                    >
                                                        <MenuItem value="" disabled>Día</MenuItem>
                                                        {[...Array(31).keys()].map((day) => (
                                                            <MenuItem key={day + 1} value={day + 1}>{day + 1}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Select
                                                        value={month}
                                                        onChange={(e) => setMonth(e.target.value)}
                                                        fullWidth
                                                    >
                                                        <MenuItem value="" disabled>Mes</MenuItem>
                                                        {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month, index) => (
                                                            <MenuItem key={index} value={index + 1}>{month}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Select
                                                        value={year}
                                                        onChange={(e) => setYear(e.target.value)}
                                                        fullWidth
                                                    >
                                                        <MenuItem value="" disabled>Año</MenuItem>
                                                        {[...Array(100).keys()].map((year) => (
                                                            <MenuItem key={year} value={2024 - year}>{2024 - year}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </Grid>
                                            </Grid>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Contraseña"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: { color: 'white' } }}
                                            InputProps={{ style: { color: 'white' } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel style={{ color: 'white' }}>Sexo</InputLabel>
                                        <FormControl fullWidth margin="normal">
                                            <Select
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                fullWidth
                                            >
                                                <MenuItem value="Masculino">Masculino</MenuItem>
                                                <MenuItem value="Femenino">Femenino</MenuItem>
                                                <MenuItem value="Otro">39 tipos de gay</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                {error && (
                                    <Typography color="error" sx={{ mt: 2 }}>
                                        {error}
                                    </Typography>
                                )}
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        // onClick={handleRegisterSubmit}
                                        disabled={loading}
                                        fullWidth
                                        sx={{ mt: 2, mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        {loading ? <CircularProgress size={24} sx={{ color: 'white', mr: 2 }} /> : 'Registrarse'}
                                        {loading ? 'Cargando...' : ''}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleBackToLogin}
                                        disabled={loading}
                                        fullWidth
                                        sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        ¿Ya tienes cuenta?
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box className="content-box" sx={{ color: 'white', padding: '16px' }}>
                            <Typography variant="h4" gutterBottom>¡Bienvenido!</Typography>
                            <Typography variant="body1">Gracias por preferirnos. Estamos encantados de tenerte con nosotros.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}

export default LoginPage;

