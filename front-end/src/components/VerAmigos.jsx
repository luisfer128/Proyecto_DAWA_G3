import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Paper, Typography, CircularProgress, Avatar } from '@mui/material';

const VerAmigos = ({ user, renderFriendActions }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      setError('');
      setSuccessMessage('');
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.post('http://26.127.175.34:5000/user/get_friends', 
          { user_id: user.user_id }, 
          {
            headers: {
              'tokenapp': token
            }
          }
        );

        console.log('Respuesta del servidor:', response.data);

        if (response.data.result) {
          setFriends(response.data.data);
        } else {
          setError(response.data.message || 'Error al obtener los amigos');
        }
      } catch (error) {
        console.error('Error al obtener los amigos:', error);
        setError(error.message || 'Error al obtener los amigos');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFriends();
    }
  }, [user]);

  return (
    <Box>
      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        <Grid container spacing={2}>
          {friends.map((friend) => (
            <Grid item xs={12} sm={6} key={friend.Id_user}>
              <Paper sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ width: 24, height: 24, margin: '8px' }} />
                  <Typography variant="body1">
                    <strong>{friend.nombres}</strong>
                  </Typography>
                </Box>
                {renderFriendActions(friend)}
              </Paper>
            </Grid>
          ))}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
          )}
          {successMessage && (
            <Typography color="primary" sx={{ mt: 2 }}>{successMessage}</Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default VerAmigos;
