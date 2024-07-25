import React, { useState } from 'react';
import { Box, Container, Avatar, Typography, Tabs, Tab, List, ListItem, ListItemText, Button, IconButton, TextField } from '@mui/material';
import PrimarySearchAppBar from '../components/Navbar'; // Asegúrate de ajustar la ruta de importación según corresponda
import VerAmigos from '../components/VerAmigos';
import EliminarFollow from '../components/EliminarFollow';
import PublicacionUsuario from '../components/PublicacionUsuario';

const Perfil = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleUnfollow = (friendId) => {
    console.log('Amigo eliminado:', friendId);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <Box sx={{ width: '100%' }}>
            <PublicacionUsuario user={user} />
          </Box>
        );
      case 1:
        return (
          <Box>
            <List>
              <ListItem>
                <ListItemText primary={<strong>Usuario:</strong>} secondary={user.usuario} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<strong>Nombres:</strong>} secondary={user.nombres} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<strong>Correo Institucional:</strong>} secondary={user.mail} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<strong>Carrera:</strong>} secondary={user.carrera} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<strong>Facultad:</strong>} secondary={user.facultad} />
              </ListItem>
            </List>
          </Box>
        );
      case 2:
        return (
          <VerAmigos 
            user={user} 
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

  return (
    <>
      <PrimarySearchAppBar />
      <Container maxWidth="md" sx={{ background: "white", borderRadius: "10px", mt: 4, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt="Profile Picture"
            src="/path/to/your/profile/picture.jpg"
            sx={{ width: 120, height: 120, mr: 3 }}
          />
          <Typography variant="h4">{user.nombres}</Typography>
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

export default Perfil;
