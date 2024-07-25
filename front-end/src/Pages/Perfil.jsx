import React, { useState, useEffect } from 'react';
import { Box, Container, Avatar, Typography, Tabs, Tab, Grid, Paper, List, ListItem, ListItemText, Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import PrimarySearchAppBar from '../components/Navbar';
import axios from 'axios';

const Perfil = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [newPostText, setNewPostText] = useState('');
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFriends();
    }
  }, [user]);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`/user/get_friends`, { params: { user_id: user.user_id } });
      if (response.data.result) {
        setFriends(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const handleDeleteFriend = async () => {
    try {
      const response = await axios.post(`/user/unfriend`, { Id_user: user.user_id, Id_amigo: selectedFriend });
      if (response.data.result) {
        setFriends(friends.filter(friend => friend.Id_user !== selectedFriend));
        setOpenDialog(false);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting friend:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleNewPostTextChange = (event) => {
    setNewPostText(event.target.value);
  };

  const handleNewPost = () => {
    // Lógica para manejar la nueva publicación
    console.log('Nuevo estado:', newPostText);
    setNewPostText('');
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 1 }}>
                  <Typography variant="body1" sx={{ alignContent: 'center' }}>16 de julio a las 6:29 p.m. - Esta es una publicación de ejemplo.</Typography>
                  <Box>
                    <IconButton color="primary">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <CommentIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Escribe un comentario..."
                    multiline
                    rows={2}
                  />
                  <Button variant="contained" color="primary" sx={{ m: 1 }}>Comentar</Button>
                  <Button variant="outlined" color="error" sx={{ m: 1 }}>Borrar Publicación</Button>
                </Box>
              </Paper>
            </Grid>
            {/* Añade más publicaciones aquí */}
          </Grid>
        );
      case 1:
        return (
          <Box>
            <List>
              <ListItem>
                <ListItemText primary="Usuario" secondary={user.usuario} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Nombres" secondary={user.nombres} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Correo Institucional" secondary={user.mail} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Carrera" secondary={user.carrera} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Facultad" secondary={user.facultad} />
              </ListItem>
            </List>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Grid container spacing={2}>
              {friends.map(friend => (
                <Grid item xs={12} sm={6} key={friend.Id_user}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="body1">{friend.nombres}</Typography>
                    <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={() => { setSelectedFriend(friend.Id_user); setOpenDialog(true); }}>
                      Eliminar Amigo
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
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

        {selectedTab === 0 && (
          <Box sx={{ mt: 4 }}>
            <Paper sx={{ p: 2 }}>
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
              <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={handleNewPost}>Publicar</Button>
            </Paper>
          </Box>
        )}

        <Box sx={{ mt: 4 }}>
          {renderTabContent()}
        </Box>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Eliminar Amigo</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar a este amigo?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteFriend} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Perfil;
