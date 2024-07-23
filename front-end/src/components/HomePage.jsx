import React from 'react';
import { Container, Grid } from '@mui/material';
import PostComponet from './PostComponet';
import Prueba from './Pruebas';
import Navbar from './Navbar';

const HomePage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Grid container spacing={8} sx={{ marginTop: '28px' }}>
                <Prueba></Prueba>
                <PostComponet/>
            </Grid>
        </div>
    );
};

export default HomePage;
