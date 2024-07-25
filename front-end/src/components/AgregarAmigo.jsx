import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const AgregarAmigo = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((u) =>
        u.nombres.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/user/list`);
      if (response.data.result) {
        setUsers(response.data.data.filter(u => u.Id_user !== user.user_id));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      const response = await axios.post(`/user/add_friend`, { Id_user: user.user_id, Id_amigo: friendId });
      if (response.data.result) {
        console.log('Amigo agregado exitosamente');
        setUsers(users.filter(u => u.Id_user !== friendId));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return (
    <>
      <PrimarySearchAppBar />
      <Container maxWidth="md" sx={{ background: "white", borderRadius: "10px", mt: 4, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Agregar Amigo</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
        />
        <List>
          {filteredUsers.map((user) => (
            <ListItem key={user.Id_user}>
              <ListItemText primary={user.nombres} />
              <ListItemSecondaryAction>
                <IconButton edge="end" color="primary" onClick={() => handleAddFriend(user.Id_user)}>
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default AgregarAmigo;
