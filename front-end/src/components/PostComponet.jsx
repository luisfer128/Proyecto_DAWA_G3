import React from 'react';
import { Container, Grid, Typography, Paper, Box, Avatar } from '@mui/material';
import LikePost from './LikePost';
import AddComentario from './AddComentario';

const Post = ({ publicationId, userId, userName, content, comments, avatarUrl, onCommentAdded }) => {
    const handleCommentAdded = (newComment) => {
        const updatedPost = {
            id: publicationId,
            user_id: userId,
            publicacion_user_name: userName,
            texto: content,
            comentarios: [...comments, newComment]
        };
        onCommentAdded(updatedPost);
    };
    //console.log("Publicacion", publicationId);

    return (
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
            <AddComentario 
                publicationId={publicationId} 
                userId={userId} 
                onCommentAdded={handleCommentAdded} // Pasar la función para actualizar los comentarios
            />
        </Paper>
    );
};

function PostComponent({ posts, user_id, onCommentAdded }) {
    if (!posts) return <Typography variant="body1">No se encontraron publicaciones.</Typography>;

    if (posts.length === 0) {
        return <Typography variant="body1" sx={{ marginTop: '16px', textAlign: 'center' }}>
            No se encontraron publicaciones.
        </Typography>;
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} sx={{ marginTop: '16px' }}>
                <Grid item xs={12} md={3}></Grid>
                <Grid item xs={12} md={6}>
                    {posts.map((post, index) => (
                        <Post
                            key={index}
                            publicationId={post.Id_publicacion}
                            userId={user_id}
                            userName={post.publicacion_user_name}
                            content={post.texto}
                            comments={post.comentarios}
                            // Agregar un avatar con avatar.io luego
                            //avatarUrl={post.avatarUrl} 
                            onCommentAdded={onCommentAdded}
                        />
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
}

export default PostComponent;
