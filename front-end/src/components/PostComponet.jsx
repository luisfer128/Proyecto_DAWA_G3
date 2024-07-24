import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

const Post = ({ title, content, comments }) => (
    <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{content}</Typography>
        {comments && comments.length > 0 && (
            <div style={{ marginTop: '16px' }}>
                <Typography variant="subtitle1">Comentarios:</Typography>
                {comments.map((comment, index) => (
                    <Typography key={index} variant="body2" sx={{ marginTop: '8px' }}>
                        {comment.comentario_user_name}: {comment.comentario}
                    </Typography>
                ))}
            </div>
        )}
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
                    throw new Error('Token no encontrado');
                }

                const response = await axios.post('http://26.127.175.34:5000/api/publications', {
                    user_id,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Publicaciones Response:', response.data);

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
                    {posts.map((post, index) => (
                        <Post
                            key={index}
                            title={`Post by ${post.publicacion_user_name}`}
                            content={post.texto}
                            comments={post.comentarios}
                        />
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
}

export default PostComponent;
