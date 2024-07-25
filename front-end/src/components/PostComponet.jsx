import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Paper, CircularProgress, Box, Avatar, Divider } from '@mui/material';
import LikePost from './LikePost';
import axios from 'axios';

const Post = ({ userName, content, comments, avatarUrl }) => (
    <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px', borderRadius: '10px' }}>
        <Box display="flex" alignItems="center" marginBottom="8px">
            <Avatar src={avatarUrl} alt={userName} sx={{ marginRight: '8px' }} />
            <Typography variant="h6">{userName}</Typography>
        </Box>
        
        <Typography variant="body1" sx={{ marginBottom: '16px' }}>{content || "No hay texto en la publicación"}</Typography>
        
        <LikePost/>
        
        <Box sx={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '8px' }}>
            <Typography variant="body1">Comentarios:</Typography>
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <Box key={index} display="flex" alignItems="center" marginTop="8px">
                        <Avatar sx={{ width: 24, height: 24, marginRight: '8px' }} />
                        <Typography variant="body2">
                            <strong>{comment.comentario_user_name}:</strong> {comment.comentario}
                        </Typography>
                    </Box>
                ))
            ) : (
                <Typography variant="body2" sx={{ marginTop: '8px', fontStyle: 'italic' }}>
                    Aún no se han hecho comentarios, sé el primero.
                </Typography>
            )}
        </Box>
    </Paper>
);

function PostComponent({ user_id }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
                //console.log("User ID:", user_id); // Log para verificar el ID de usuario

                const response = await axios.post('http://26.127.175.34:5000/api/publications', {
                    user_id,
                }, {
                    headers: {
                        'tokenapp': token
                    }
                });

                //console.log('Publicaciones Response:', response.data);

                if (response.data.result) {
                    setPosts(response.data.data);
                } else {
                    setError(response.data.message || 'Error, no se encontraron posts');
                }
            } catch (err) {
                console.error(err);
                setError(err.message || 'Error, no se encontraron posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [user_id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
        
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} sx={{ marginTop: '16px' }}>
                <Grid item xs={12} md={3}></Grid>
                <Grid item xs={12} md={6}>
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <Post
                                key={index}
                                userName={post.publicacion_user_name}
                                content={post.texto}
                                comments={post.comentarios}
                                avatarUrl={post.avatarUrl} // Assuming you have avatarUrl field
                            />
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ marginTop: '16px', textAlign: 'center' }}>
                            No se encontraron publicaciones.
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );

}

export default PostComponent;
