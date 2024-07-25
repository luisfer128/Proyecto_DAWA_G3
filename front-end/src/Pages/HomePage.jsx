import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import PostComponent from '../components/PostComponent';
import Navbar from '../components/Navbar';
import CrearPost from '../components/CrearPost';
import axios from 'axios';

const HomePage = ({ user }) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axios.post('http://26.127.175.34:5000/api/publications', {
                user_id: user.user_id,
            }, {
                headers: {
                    'tokenapp': token
                }
            });
            if (response.data.result) {
                setPosts(response.data.data);
            } else {
                console.error(response.data.message || 'Error, no se encontraron posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts(); 
    }, [user.user_id]);

    const handlePostCreated = () => {
        fetchPosts(); 
    };

    const handleCommentAdded = (updatedPost) => {
        setPosts(prevPosts => 
            prevPosts.map(post => 
                post.Id_publicacion === updatedPost.Id_publicacion ? updatedPost : post
            )
        );
    };

    return (
        <div>
            <Navbar user={user.roles}/>
            <Container maxWidth="md" sx={{ mt: 5, backgroundColor: '#F5F5F5', borderRadius: "10px", p: 3 }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CrearPost user_id={user.user_id} onPostCreated={handlePostCreated} />
                    <Box sx={{ width: '100%', mt: 3 }}>
                        <PostComponent 
                            posts={posts} 
                            user_id={user.user_id} 
                            user_name={user.user_name} 
                            onCommentAdded={handleCommentAdded} 
                        />
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default HomePage;
