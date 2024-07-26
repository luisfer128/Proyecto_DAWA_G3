import React from 'react';
import { Container, Typography } from '@mui/material';
import SuggestFriend from '../components/SuggesFriend';
import PrimarySearchAppBar from '../components/Navbar';

const SuggestedFriendsPage = ({ user }) => {
    if (!user) {
        return <Typography variant="body1">Por favor, inicie sesión para ver las sugerencias de amigos.</Typography>;
    }

    return (
        <>
            <PrimarySearchAppBar />        
            <Container
                sx={{ 
                    width: '100%', 
                    maxWidth: 400, 
                    
                    borderRadius: '8px', 
                    p: 2 
                }}>
                <SuggestFriend user_id={user.user_id} />
            </Container>
        </>
    );
};

export default SuggestedFriendsPage;
