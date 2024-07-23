import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Paper, CircularProgress } from '@mui/material';

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

function PostComponent() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://26.127.175.34:5000/api/publications', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPosts(data.data);
                } else {
                    setError('Error no se encontaron posts');
                }
            } catch (err) {
                setError('Error, no existen posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

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
                <Grid item xs={12} md={3}></Grid>
            </Grid>
        </Container>
    );
}

export default PostComponent;
