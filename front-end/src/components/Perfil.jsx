import React, { useState } from 'react';
import { Box, Container, Avatar, Typography, Tabs, Tab, Grid, Paper, List, ListItem, ListItemText, Button, IconButton, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [newPostText, setNewPostText] = useState('');

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
                <Typography variant="body1">16 de julio a las 6:29 p.m. - Esta es una publicación de ejemplo.</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button variant="outlined" color="error">Borrar Publicación</Button>
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
                  <Button variant="contained" color="primary" sx={{ mt: 1 }}>Comentar</Button>
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
                <ListItemText primary="Facultad" secondary="Ingeniería" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Carrera" secondary="Ingeniería Informática" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Semestre" secondary="6to Semestre" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Correo Institucional" secondary="alexis.yagual@universidad.edu" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Donde vivo" secondary="Guayaquil, Ecuador" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Edad" secondary="22 años" />
              </ListItem>
            </List>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="body1">Amigo 1</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="body1">Amigo 2</Typography>
                </Paper>
              </Grid>
              {/* Añade más amigos aquí */}
            </Grid>
            <Button variant="outlined" color="error" sx={{ mt: 2 }}>Eliminar Amigo</Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ bgcolor: 'white', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
        <Avatar 
          alt="Profile Picture" 
          src="/path/to/your/profile/picture.jpg" 
          sx={{ width: 120, height: 120, mr: 3 }}
        />
        <Typography variant="h4">Alexis Yagual</Typography>
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
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleNewPost}>Publicar</Button>
          </Paper>
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        {renderTabContent()}
      </Box>
    </Container>
  );
};

export default ProfilePage;
