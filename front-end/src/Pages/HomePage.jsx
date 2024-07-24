import React from 'react';
import { Grid } from '@mui/material';
import PostComponet from '../components/PostComponet';
import Prueba from '../components/Pruebas';
import Navbar from '../components/Navbar';
import CrearPost from '../components/CrearPost';

const HomePage = ({user, roles}) => {
    return (
        <div>
            <Navbar />
            <Grid  sx={{ marginTop: '28px' }}>
                <CrearPost />
                {/* <h1>Bienvenido, {user.nombres}</h1> */}
                <PostComponet user_id={user.user_id} />
            </Grid>
        </div>
    );
};

export default HomePage;
