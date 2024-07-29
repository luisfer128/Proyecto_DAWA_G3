import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';

function AddComentario({ publicationId, userId, userName, onCommentAdded }) { 
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [charactersLeft, setCharactersLeft] = useState(250);

    const handleTextChange = (e) => {
        const text = e.target.value;
        setCommentText(text);
        setCharactersLeft(250 - text.length);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axios.post('http://26.127.175.34:5000/user/add_comment', {
                publication_id: publicationId,
                user_id: userId,
                comment_text: commentText
            }, {
                headers: {
                    'tokenapp': token
                }
            });

            if (response.data.result) {
                const newComment = {
                    comentario_user_name: userName, // Usar el nombre de usuario recibido en las props
                    comentario: commentText
                };
                setCommentText('');
                setCharactersLeft(250);
                onCommentAdded(newComment); 
            } else {
                setError(response.data.message || 'Error al agregar el comentario');
            }
        } catch (err) {
            setError(err.message || 'Error al agregar el comentario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ marginTop: '16px' }}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Escribe tu comentario..."
                multiline
                rows={3}
                value={commentText}
                onChange={handleTextChange}
                inputProps={{ maxLength: 250 }}
                sx={{ marginBottom: '8px' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                    <CircularProgress
                        variant="determinate"
                        value={(250 - charactersLeft) / 2.5} 
                        size={40} 
                        
                    />
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        {charactersLeft}
                    </Typography>
                </Box>
                <Typography variant="caption" color="textSecondary">
                    caracteres restantes
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading || charactersLeft === 250}
                >
                    {loading ? <CircularProgress size={24} /> : <SendIcon />}
                    Enviar
                </Button>
                {error && <Typography color="error" sx={{ marginLeft: '8px' }}>{error}</Typography>}
            </Box>
        </Box>
    );
}

export default AddComentario;
