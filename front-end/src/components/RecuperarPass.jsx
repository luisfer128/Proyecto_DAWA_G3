import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/RecuperarPass.css';

function RecuperarPass() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError('');
    };

    const handleBackLogin = () => {
        navigate('/login');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 64px)',
                padding: '16px',
            }}
        >
            <Grid className="container">
                <Typography component="h2" variant="h5" color="text.primary"
                    sx={{
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2 
                    }}>
                    Recuperar Contraseña
                </Typography>
                <Typography component="body2" color="white">
                    Ingresa tu correo electrónico
                </Typography>
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <TextField
                        label="Correo Electrónico"
                        //buscar por correo y enviar este luego
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            style: { color: 'white' },
                            sx: {
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.4)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.6)',
                                    },
                                },
                            },
                        }}
                    />
                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        disabled={loading}
                        fullWidth
                        sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: 'white', mr: -11 }} /> : 'Buscar'}
                        {loading ? 'Cargando...' : ''}
                    </Button>
                    <hr />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                        <Typography sx={{ whiteSpace: 'nowrap' }}>
                            ¿Recordaste tu contraseña?
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={handleBackLogin}
                            disabled={loading}
                            sx={{
                                backgroundColor: '#1e154b',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#342d71',
                                },
                                ml: 2,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
}

export default RecuperarPass;
