import React from 'react';
import { Grid } from '@mui/material';
import PostComponet from '../components/PostComponet';
import Prueba from '../components/Pruebas';
import Navbar from '../components/Navbar';

const HomePage = ({user, roles}) => {
    return (
        <div>
            <Navbar></Navbar>
            <Grid container spacing={8} sx={{ marginTop: '28px' }}>
                
                {/* <h1>Bienvenido, {user.nombres}</h1> */}
                <PostComponet user_id={user.user_id} />
            </Grid>
        </div>
    );
};

export default HomePage;
