import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, CircularProgress } from "@mui/material";
import ModalSuccess from "./ModalSuccess";
import axios from "axios";

function CrearPost({ user_id, onPostCreated }) {
    const [newPostText, setNewPostText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const handleNewPostTextChange = (e) => {
        setNewPostText(e.target.value);
    };

    const handlePostSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            //console.log("User ID:", user_id); // Log para verificar el ID de usuario

            const response = await axios.post('http://26.127.175.34:5000/user/create_publication', {
                user_id,
                text: newPostText,
                photo: null 
            }, {
                headers: {
                    'tokenapp': token
                }
            });
            //console.log('Publicaciones Response:', response.data); // Log para verificar la respuesta
            if (response.data.result) {
                setSuccessMessage(response.data.message);
                setNewPostText('');
                setModalOpen(true);
                onPostCreated(); 
            } else {
                setError(response.data.message || 'Error al crear la publicación');
            }
            
        } catch (err) {
            setError(err.message || 'Error al crear la publicación');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Paper sx={{ padding: '16px', p: 2, maxWidth: '580px', width: '100%' }}>
                <Typography variant="h6">¿En qué estás pensando?</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Escribe algo..."
                    multiline
                    rows={2}
                    value={newPostText}
                    onChange={handleNewPostTextChange}
                    sx={{ mt: 2 }}
                />
                {loading ? (
                    <CircularProgress sx={{ mt: 2 }} />
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handlePostSubmit}
                        disabled={!newPostText.trim()}
                    >
                        Publicar
                    </Button>
                )}
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
                )}
            </Paper>
            <ModalSuccess 
                open={modalOpen} 
                handleClose={handleCloseModal} 
                successMessage={successMessage} 
            />
        </Box>
    );
}

export default CrearPost;
