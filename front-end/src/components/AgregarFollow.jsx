import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, Typography } from '@mui/material';

const AgregarFollow = ({ userId, friendId, onFollow }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFollow = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post('http://26.127.175.34:5000/user/add_friend', 
        {
          Id_user: userId,
          Id_amigo: friendId
        },
        {
          headers: {
            'tokenapp': token
          }
        }
      );

      if (response.data.result) {
        setSuccessMessage('Amigo agregado con éxito');
        onFollow(friendId); // Llama a la función onFollow para actualizar la lista de amigos
      } else {
        setError(response.data.message || 'Error al agregar amigo');
      }
    } catch (error) {
      setError(error.message || 'Error al agregar amigo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button variant="outlined" color="primary" onClick={handleFollow}>
          Follow
        </Button>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
      )}
      {successMessage && (
        <Typography color="primary" sx={{ mt: 2 }}>{successMessage}</Typography>
      )}
    </>
  );
};

export default AgregarFollow;
