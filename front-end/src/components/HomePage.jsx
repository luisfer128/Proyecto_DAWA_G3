import React from 'react';
import { Container, Grid, Box, Typography, Paper } from '@mui/material';
// import Navbar from './NavBar';

const Post = ({ title, content }) => (
    <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{content}</Typography>
    </Paper>
);



const HomePage = () => {
    return (
        <Container maxWidth="lg">
            {/* <Navbar /> */}
            <Grid container spacing={3} sx={{ marginTop: '16px' }}>
                <Grid item xs={12} md={3}>
                    
                </Grid>
                <Grid item xs={12} md={6}>
                    <Post title="Post 1" content="This is the content of the first post." />
                    <Post title="Post 2" content="This is the content of the second post." />
                    <Post title="Post 3" content="This is the content of the third post." />
                </Grid>
                <Grid item xs={12} md={3}>
                    
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
