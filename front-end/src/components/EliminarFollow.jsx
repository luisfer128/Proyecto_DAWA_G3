import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, Typography } from '@mui/material';
import AgregarFollow from './AgregarFollow';

const EliminarFollow = ({ userId, friendId, onUnfollow }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUnfollowed, setIsUnfollowed] = useState(false);

  const handleUnfollow = async () => {
    setLoading(true);
    setError('');
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      console.log("id_usuario:", userId);
      console.log("id_amigo:", friendId);

      const response = await axios.delete('http://26.127.175.34:5000/user/unfriend', {
        headers: {
          'tokenapp': token
        },
        data: {
          Id_user: userId,
          Id_amigo: friendId
        }
      });

      if (response.data.result) {
        setIsUnfollowed(true);
        onUnfollow(friendId); // Llama a la función onUnfollow para actualizar la lista de amigos
      } else {
        setError(response.data.message || 'Error al eliminar amigo');
      }
    } catch (error) {
      setError(error.message || 'Error al eliminar amigo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isUnfollowed ? (
        <AgregarFollow userId={userId} friendId={friendId} onFollow={() => setIsUnfollowed(false)} />
      ) : (
        <>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button variant="outlined" color="error" onClick={handleUnfollow}>
              Unfollow
            </Button>
          )}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
          )}
        </>
      )}
    </>
  );
};

export default EliminarFollow;
