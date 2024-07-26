// src/components/FriendsList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Avatar, Typography, Divider, IconButton, Card, CardContent, CardActions, Button } from '@mui/material';
import { styled } from '@mui/system';
import AgregarFollow from './AgregarFollow';
import EliminarFollow from './EliminarFollow';

const Root = styled('div')({
  display: 'flex',
});

const Sidebar = styled('div')({
  width: '20%',
  padding: '10px',
  borderRight: '1px solid #ddd',
});

const Content = styled('div')({
  width: '80%',
  padding: '10px',
});

const FriendsListContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
});

const FriendCard = styled(Card)({
  width: 'calc(33.333% - 10px)',
  marginBottom: '10px',
});

const Media = styled(Avatar)({
  height: 140,
});

const StyledButton = styled(Button)({
  width: '100%',
  textAlign: 'left',
  justifyContent: 'flex-start',
  paddingLeft: '10px',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const FriendsList = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [error, setError] = useState(null);
  const [showSuggested, setShowSuggested] = useState(false);

  const fetchFriends = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post("http://26.127.175.34:5000/user/get_friends", { user_id: userId }, {
        headers: { 'tokenapp': token },
      });
      if (response.data.result) {
        setFriends(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error al obtener los amigos');
    }
  }, [userId]);

  const fetchSuggestedFriends = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post("http://26.127.175.34:5000/user/suggested_friends", { user_id: userId }, {
        headers: { 'tokenapp': token },
      });
      if (response.data.result) {
        setSuggestedFriends(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error al obtener los amigos sugeridos');
    }
  }, [userId]);

  useEffect(() => {
    if (showSuggested) {
      fetchSuggestedFriends();
    } else {
      fetchFriends();
    }
  }, [fetchFriends, fetchSuggestedFriends, showSuggested]);

  const handleUnfriend = async (friendId) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.delete('http://26.127.175.34:5000/user/unfriend', {
        headers: { 'tokenapp': token },
        data: { Id_user: userId, Id_amigo: friendId },
      });
      if (response.data.result) {
        setFriends(friends.filter(friend => friend.Id_user !== friendId));
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error al eliminar el amigo');
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('http://26.127.175.34:5000/user/add_friend', {
        Id_user: userId,
        Id_amigo: friendId,
      }, {
        headers: { 'tokenapp': token },
      });
      if (response.data.result) {
        setSuggestedFriends(suggestedFriends.filter(friend => friend.Id_user !== friendId));
        fetchFriends();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error al agregar el amigo');
    }
  };

  return (
    <Root>
      <Sidebar>
        <Typography variant="h6" gutterBottom>
          Amigos
        </Typography>
        <StyledButton
          startIcon={<Avatar />}
          variant="text"
          onClick={() => setShowSuggested(false)}
          style={{ backgroundColor: !showSuggested ? '#f5f5f5' : 'transparent' }}
        >
          Todos los amigos
        </StyledButton>
        <StyledButton
          startIcon={<Avatar />}
          variant="text"
          onClick={() => setShowSuggested(true)}
          style={{ backgroundColor: showSuggested ? '#f5f5f5' : 'transparent' }}
        >
          Amigos sugeridos
        </StyledButton>
      </Sidebar>
      <Content>
        {showSuggested ? (
          <>
            <Typography variant="h5" gutterBottom>
              Amigos sugeridos
            </Typography>
            <Divider />
            <FriendsListContainer>
              {suggestedFriends.length > 0 ? (
                suggestedFriends.map((friend) => (
                  <FriendCard key={friend.Id_user}>
                    <Media
                      alt={friend.nombres}
                      
                    />
                    <CardContent>
                      <Typography variant="h6">{friend.nombres}</Typography>
                    </CardContent>
                    <CardActions>
                      <AgregarFollow userId={userId} friendId={friend.Id_user} onFollow={fetchFriends} />
                    </CardActions>
                  </FriendCard>
                ))
              ) : (
                <Typography variant="body1" color="textSecondary">
                  {error || 'No hay amigos sugeridos.'}
                </Typography>
              )}
            </FriendsListContainer>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Todos mis amigos
            </Typography>
            <Divider />
            <FriendsListContainer>
              {friends.length > 0 ? (
                friends.map((friend) => (
                  <FriendCard key={friend.Id_user}>
                    <Media
                      alt={friend.nombres}
                      
                    />
                    <CardContent>
                      <Typography variant="h6">{friend.nombres}</Typography>
                    </CardContent>
                    <CardActions>
                      <EliminarFollow userId={userId} friendId={friend.Id_user} onUnfollow={fetchFriends} />
                    </CardActions>
                  </FriendCard>
                ))
              ) : (
                <Typography variant="body1" color="textSecondary">
                  {error || 'No tienes amigos agregados.'}
                </Typography>
              )}
            </FriendsListContainer>
          </>
        )}
      </Content>
    </Root>
  );
};

export default FriendsList;