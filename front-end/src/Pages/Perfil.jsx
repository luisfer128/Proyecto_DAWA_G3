import React, { useState } from 'react';
import { Box, Container, Avatar, Typography, Tabs, Tab, List, ListItem, ListItemText } from '@mui/material';
import PrimarySearchAppBar from '../components/Navbar'; 
import VerAmigos from '../components/VerAmigos';
import EliminarFollow from '../components/EliminarFollow';
import PublicacionUsuario from '../components/PublicacionUsuario';
import ModalAviso from '../components/ModalAviso';  
import ModalError from '../components/ModalError';  
import axios from 'axios';

const Perfil = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [friends, setFriends] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); 
  const [selectedFriend, setSelectedFriend] = useState(null); 
  const [selectedFriendName, setSelectedFriendName] = useState('');  
  const [errorMessage, setErrorMessage] = useState('');


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleUnfollow = (friendId, friendName) => {
    setSelectedFriend(friendId);
    setSelectedFriendName(friendName);
    setModalOpen(true); 
  };

  const confirmUnfollow = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.delete('http://26.127.175.34:5000/user/unfriend', {
        headers: {
          'tokenapp': token
        },
        data: {
          Id_user: user.user_id,
          Id_amigo: selectedFriend
        }
      });
  
      if (response.data.result) {
        setFriends(prev => prev.filter(friend => friend.Id_user !== selectedFriend));
        setModalOpen(false); 
      } else {
        setErrorMessage(response.data.message || 'Error al eliminar amigo');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error al eliminar amigo');
    } finally {
      setModalOpen(false);  
    }
  };
  

  const handleCloseModal = () => {
    setModalOpen(false);
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
            user={user.user_id} 
            setFriends={setFriends}
            renderFriendActions={(friend) => (
              <EliminarFollow 
                userId={user.user_id} 
                friendId={friend.Id_user} 
                onUnfollow={() => handleUnfollow(friend.Id_user, friend.nombres)} 
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

        <ModalAviso
          open={modalOpen}
          handleClose={handleCloseModal}
          errorMessage={`Dejaste de seguir a ${selectedFriendName}`}
          onConfirm={confirmUnfollow}
        />
        <ModalError
          open={!!errorMessage}
          handleClose={() => setErrorMessage('')}
          errorMessage={errorMessage}
        />
      </Container>
    </>
  );
};

export default Perfil;
