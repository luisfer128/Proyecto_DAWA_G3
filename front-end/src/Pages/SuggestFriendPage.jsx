import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import SuggestFriend from '../components/SuggesFriend';
import VerAmigos from '../components/VerAmigos';
import PrimarySearchAppBar from '../components/Navbar';

const SuggestedFriendsPage = ({ user }) => {
  const [followedFriends, setFollowedFriends] = useState([]);
  const [setLoadingFriends] = useState(true);
  const [showVerAmigos, setShowVerAmigos] = useState(false);

  const handleFriendsLoaded = (friends) => {
    setFollowedFriends(friends.map(friend => friend.Id_user));
    setLoadingFriends(false);
  };

  const handleFollow = (friendId) => {
    setFollowedFriends(prev => [...prev, friendId]);
  };

  const handleUnfollow = (friendId) => {
    setFollowedFriends(prev => prev.filter(id => id !== friendId));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVerAmigos(true);
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []);

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
        {showVerAmigos && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', visibility: 'hidden' }}>
            <VerAmigos
              user={user.user_id}
              setFriends={handleFriendsLoaded}
              renderFriendActions={() => null} 
            />
          </div>
        )}
        <SuggestFriend
          user_id={user.user_id}
          followedFriends={followedFriends}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
        />
        
      </Container>
    </>
  );
};

export default SuggestedFriendsPage;
