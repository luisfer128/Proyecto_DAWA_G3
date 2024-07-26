import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Avatar, Typography, Tabs, Tab, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import PrimarySearchAppBar from '../components/Navbar';
import axios from 'axios';
import VerAmigos from '../components/VerAmigos';
import PublicacionAmigo from '../components/PublicacionAmigo';
import AgregarFollow from '../components/AgregarFollow';
import EliminarFollow from '../components/EliminarFollow';

const PerfilAmigo = ({ user }) => {
  const { friendId } = useParams();
  const [friendData, setFriendData] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.post('http://26.127.175.34:5000/user/info', 
          { user_id: friendId }, 
          {
            headers: {
              'tokenapp': token
            }
          }
        );

        if (response.data.result) {
          setFriendData(response.data);
          setIsFriend(response.data.isFriend); // Actualiza el estado isFriend
        } else {
          console.error('Error al obtener los datos del amigo:', response.data.message);
          setError(response.data.message);
        }
      } catch (error) {
        console.error('Error al obtener los datos del amigo:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendData();
  }, [friendId]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleFollow = () => {
    setIsFriend(true); // Actualiza el estado isFriend
    console.log('Amigo agregado:', friendId);
  };

  const handleUnfollow = () => {
    setIsFriend(false); // Actualiza el estado isFriend
    console.log('Amigo eliminado:', friendId);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <Box sx={{ width: '100%' }}>
            <PublicacionAmigo user={friendData} />
          </Box>
        );
      case 1:
        return (
          <Box>
            <List>
              <ListItem>
                <ListItemText primary={<strong>Usuario:</strong>} secondary={friendData.message.user.usuario} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<strong>Nombres:</strong>} secondary={friendData.message.user.nombres} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<strong>Correo Institucional:</strong>} secondary={friendData.message.user.mail} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<strong>Carrera:</strong>} secondary={friendData.message.user.nombre_carrera} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<strong>Facultad:</strong>} secondary={friendData.message.user.nombre_facultad} />
              </ListItem>
            </List>
          </Box>
        );
      case 2:
        return (
          <VerAmigos 
            user={friendData.message.user.Id_user} 
            renderFriendActions={(friend) => (
              <EliminarFollow 
                userId={user.user_id} 
                friendId={friend.Id_user} 
                onUnfollow={handleUnfollow} 
              />
            )}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ padding: 2 }}>{error}</Typography>
    );
  }

  return (
    <>
      <PrimarySearchAppBar user={user} />
      <Container maxWidth="md" sx={{ background: "white", borderRadius: "10px", mt: 4, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt="Profile Picture"
            src="/path/to/your/profile/picture.jpg"
            sx={{ width: 120, height: 120, mr: 3 }}
          />
          <Typography variant="h4">{friendData.message.user.nombres}</Typography>
          <Box sx={{ ml: 'auto' }}>
            {isFriend ? (
              <EliminarFollow userId={user.user_id} friendId={friendId} onUnfollow={handleUnfollow} />
            ) : (
              <AgregarFollow userId={user.user_id} friendId={friendId} onFollow={handleFollow} />
            )}
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="profile tabs">
            <Tab label="Publicaciones" />
            <Tab label="Información" />
            <Tab label="Amigos" />
          </Tabs>
        </Box>

        <Box sx={{ mt: 4 }}>
          {renderTabContent()}
        </Box>
      </Container>
    </>
  );
};

export default PerfilAmigo;
