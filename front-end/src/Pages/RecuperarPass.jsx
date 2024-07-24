import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModalAviso from '../components/ModalAviso';
import '../styles/RecuperarPass.css';

function RecuperarPass() {
    const navigate = useNavigate();
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleRecover = () => {
        if (!usernameOrEmail) {
            setError('Por favor, ingresa tu correo electrónico o username.');
            setModalOpen(true);
            return;
        }

        setLoading(true);
        setError('');
        setTimeout(() => {
            setLoading(false);
            setModalOpen(true);
        }, 1500);
    };

    const handleBackLogin = () => {
        navigate('/login');
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Box className="body-form-recover"
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
                    Ingresa tu correo electrónico o tu username
                </Typography>
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <TextField
                        label="Correo Electrónico o Username"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRecover}
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
            <ModalAviso open={modalOpen} handleClose={handleCloseModal} errorMessage={error || "Si tus datos son correctos, alguien de soporte se contactará contigo para verificar tus datos."} />
        </Box>
    );
}

export default RecuperarPass;
