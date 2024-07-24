import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, CircularProgress,
  Grid, Select, MenuItem, InputLabel, FormControl,} from "@mui/material";
import ModalError from '../components/ModalError';

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginStyle.css";

function RegisterForm() {
    const [usuario, setUsuario] = useState('');
    const [nombres, setNombres] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedCarrera, setSelectedCarrera] = useState('');
    const [carreras, setCarreras] = useState([]); // Inicializa como array vacío

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleRegisterSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://26.127.175.34:5000/user/register', {
                usuario, nombres, password, carrera: selectedCarrera
            });

            if (!response.data.result) {
                throw new Error(response.data.message);
            }

            navigate('/home');
        } catch (error) {
            setError('Error al registrar usuario');
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    // Fetch de carreras para seleccionar
    useEffect(() => {
        const fetchCarreras = async () => {
            try {
                const response = await axios.get('http://26.127.175.34:5000/api/carreras');
                if (response.data.result) {
                    // Verifica que response.data.data sea un array
                    if (Array.isArray(response.data.data)) {
                        setCarreras(response.data.data);
                    } else {
                        throw new Error('Datos de carreras no son un array');
                    }
                } else {
                    throw new Error(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching carreras:', error);
                setError('Error al obtener las carreras');
                setModalOpen(true);
            }
        };

        fetchCarreras();
    }, []);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleBackToLogin = () => {
        navigate('../');
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
            <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                <Grid
                    item
                    xs={12}
                    sm={7}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <Box className="container_primary">
                        <Typography
                            component="h1"
                            variant="h4"
                            color="text.primary"
                            sx={{
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            }}
                        >
                            Registrarse
                        </Typography>
                    <Box sx={{ width: "100%", maxWidth: 400 }}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <TextField
                                label="Correo Electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ style: { color: "white" } }}
                                InputProps={{ style: { color: "white" } }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                label="Nombres"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ style: { color: "white" } }}
                                InputProps={{ style: { color: "white" } }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                label="Username"
                                value={nombres}
                                onChange={(e) => setNombres(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ style: { color: "white" } }}
                                InputProps={{ style: { color: "white" } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                label="Contraseña"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ style: { color: "white" } }}
                                InputProps={{ style: { color: "white" } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ color: "white" }}>Carrera</InputLabel>
                                <FormControl fullWidth margin="normal">
                                    <Select style={{ color: "white" }}
                                        value={selectedCarrera}
                                        onChange={(e) => setSelectedCarrera(e.target.value)}
                                        fullWidth
                                    >
                                        {carreras.map((carrera) => (
                                            <MenuItem key={carrera.Id_carrera} value={carrera.Id_carrera}>
                                                {carrera.nombre_carrera}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                        )} */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleRegisterSubmit}
                                disabled={loading}
                                fullWidth
                                sx={{
                                mt: 2,
                                mr: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                }}
                            >
                                {loading ? (
                                <CircularProgress size={24} sx={{ color: "white", mr: 2 }} />
                                ) : (
                                "Registrarse"
                                )}
                                {loading ? "Cargando..." : ""}
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleBackToLogin}
                                fullWidth
                                sx={{
                                mt: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                }}
                            >
                                ¿Ya tienes cuenta?
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Grid>
                <Grid item xs={4}>
                    <Box className="content-box" sx={{ color: "white", padding: "16px" }}>
                        <Typography variant="h4" gutterBottom>
                            ¡Bienvenido!
                        </Typography>
                        <Typography variant="body1">
                            Gracias por preferirnos. Estamos encantados de tenerte con nosotros.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* <ModalError open={modalOpen} onClose={handleCloseModal} errorMessage={error} /> */}
        </Box>
    );
}
export default RegisterForm;
