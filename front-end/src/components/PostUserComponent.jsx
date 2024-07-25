import React from 'react';
import { Container, Grid, Typography, Paper, Box, Avatar } from '@mui/material';
import LikePost from './LikePost';
import AddComentario from './AddComentario';

const Post = ({ publicationId, userId, userName, content, comments, avatarUrl, onCommentAdded, currentUserName }) => {
    const handleCommentAdded = (newComment) => {
        const updatedPost = {
            Id_publicacion: publicationId,
            user_id: userId,
            publicacion_user_name: userName,
            texto: content,
            comentarios: [...comments, newComment]
        };
        onCommentAdded(updatedPost);
    };

    return (
        <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px', borderRadius: '10px', width: '100%' }}>
            <Box display="flex" alignItems="center" marginBottom="8px">
                <Avatar src={avatarUrl} alt={userName} sx={{ marginRight: '8px' }} />
                <Typography variant="h6">{userName}</Typography>
            </Box>
            
            <Typography variant="body1" sx={{ marginBottom: '16px' }}>{content || "No hay texto en la publicación"}</Typography>
            
            <LikePost publicationId={publicationId} userId={userId} />
            
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
                userName={currentUserName} 
                onCommentAdded={handleCommentAdded}
            />
        </Paper>
    );
};

function PostUserComponent({ posts, user_id, user_name, onCommentAdded }) {
    if (!posts) return <Typography variant="body1">No se encontraron publicaciones.</Typography>;

    if (posts.length === 0) {
        return <Typography variant="body1" sx={{ marginTop: '16px', textAlign: 'center' }}>
            No se encontraron publicaciones.
        </Typography>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {posts.map((post, index) => (
                        <Post
                            publicationId={post.Id_publicacion}
                            userId={user_id}
                            userName={post.publicacion_user_name}
                            content={post.texto}
                            comments={post.comentarios}
                            // Agregar un avatar con avatar.io luego
                            //avatarUrl={post.avatarUrl} 
                            currentUserName={user_name} // Pasar el nombre del usuario actual a cada Post
                            onCommentAdded={onCommentAdded}
                        />
                ))}
            </Box>
        </Container>
    );
}

export default PostUserComponent;
