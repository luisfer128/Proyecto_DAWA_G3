import React, { useState, useEffect } from "react";
import { IconButton, Typography, Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

function LikePost({ publicationId, userId, initialLikes, initialLiked, onLikeUpdated }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(initialLiked);

    useEffect(() => {
        setLikes(initialLikes);
        setLiked(initialLiked);
    }, [initialLikes, initialLiked]);

    const handleLike = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            let response;
            
            if (liked) {
                response = await axios.delete(`http://26.127.175.34:5000/user/remove_like`, {
                    headers: {
                        'tokenapp': token
                    },
                    data: {
                        publication_id: publicationId,
                        user_id: userId
                    }
                });
            } else {
                response = await axios.post('http://26.127.175.34:5000/user/add_like', {
                    publication_id: publicationId,
                    user_id: userId
                }, {
                    headers: {
                        'tokenapp': token
                    }
                });
            }

            if (response.data.result) {
                const updatedLikes = liked ? likes - 1 : likes + 1;
                setLiked(!liked);
                setLikes(updatedLikes);
                onLikeUpdated(publicationId, updatedLikes, !liked);
            } else {
                console.error(response.data.message || 'Error al actualizar el estado del like');
            }
        } catch (error) {
            console.error('Error al actualizar el estado del like:', error);
        }
    };


    return (
        <Box display="flex" alignItems="center">
            <IconButton onClick={handleLike}>
                {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2" sx={{ marginLeft: '8px' }}>
                {likes} Like{likes !== 1 ? 's' : ''}
            </Typography>
        </Box>
    );
}

export default LikePost;