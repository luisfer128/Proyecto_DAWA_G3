import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import SuggestFriend from '../components/SuggesFriend';
import PrimarySearchAppBar from '../components/Navbar';

const SuggestedFriendsPage = ({ user }) => {
  const [followedFriends, setFollowedFriends] = useState([]);



  const handleUnfollow = (friendId) => {
    setFollowedFriends(prev => prev.filter(id => id !== friendId));
  };

  if (!user) {
    return <Typography variant="body1">Por favor, inicie sesión para ver las sugerencias de amigos.</Typography>;
  }

  return (
    <>
      <PrimarySearchAppBar />
      <Container
        sx={{
          width: '100%',
          maxWidth: 520,
          borderRadius: '8px',
          p: 2,
          position: 'relative',
        }}
      >
        <SuggestFriend
          user_id={user.user_id}
          followedFriends={followedFriends}
          
          onUnfollow={handleUnfollow}
        />
      </Container>
    </>
  );
};

export default SuggestedFriendsPage;
