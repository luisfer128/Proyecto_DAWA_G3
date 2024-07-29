import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';

const SearchUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      setError('');
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://26.127.175.34:5000/user/list', {
          headers: {
            'tokenapp': token
          }
        });

        console.log('Respuesta del servidor:', response.data);

        if (response.data.result) {
          setUsuarios(response.data.message);
        } else {
          setError(response.data.message || 'Error al obtener los usuarios');
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setError(error.message || 'Error al obtener los usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleResultClick = (userId) => {
    const userLog = sessionStorage.getItem('user');
    const userLogJson = JSON.parse(userLog);
    const IdUserLog = userLogJson.user_id;
    if (userId === IdUserLog) {
      window.location.href = `/perfil`; // Recargar completamente para el perfil del usuario actual
    } else {
      window.location.href = `/amigo/${userId}`; // Recargar completamente para el perfil del amigo
    }
  };

  return (
    <Box>
      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        <List>
          {usuarios.map((usuario) => (
            <ListItem key={usuario.Id_user} button onClick={() => handleResultClick(usuario.Id_user)}>
              <ListItemText primary={usuario.nombres || usuario.usuario} />
            </ListItem>
          ))}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
          )}
        </List>
      )}
    </Box>
  );
};

export default SearchUsuario;
