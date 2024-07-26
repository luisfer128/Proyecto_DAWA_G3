import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Avatar, CircularProgress, Button } from "@mui/material";
import AgregarFollow from "./AgregarFollow";
import EliminarFollow from "./EliminarFollow";
import ModalAviso from "./ModalAviso";

function SuggestFriend({ user_id }) {
    const [suggestedFriends, setSuggestedFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [followedFriends, setFollowedFriends] = useState(new Set());
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [selectedFriendName, setSelectedFriendName] = useState('');

    useEffect(() => {
        const fetchSuggestedFriends = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.post('http://26.127.175.34:5000/user/suggested_friends', {
                    user_id,
                }, { 
                    headers: {
                        'tokenapp': token 
                    }
                });

                if (response.data.result) {
                    setSuggestedFriends(response.data.data);
                } else {
                    throw new Error(response.data.message || 'Error al sugerir amigos');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchFollowedFriends = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('http://26.127.175.34:5000/user/followed_friends', {
                    headers: {
                        'tokenapp': token 
                    }
                });

                if (response.data.result) {
                    setFollowedFriends(new Set(response.data.data.map(friend => friend.Id_user)));
                } else {
                    throw new Error(response.data.message || 'Error al obtener amigos seguidos');
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        if (user_id) {
            fetchSuggestedFriends();
            fetchFollowedFriends();
        }
    }, [user_id]);

    const handleFollow = (friendId) => {
        setFollowedFriends(prev => new Set(prev.add(friendId)));
    };

    const handleUnfollow = (friendId, friendName) => {
        setSelectedFriend(friendId);
        setSelectedFriendName(friendName);
        setModalOpen(true);
    };

    const confirmUnfollow = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.delete('http://26.127.175.34:5000/user/unfriend', {
                headers: {
                    'tokenapp': token
                },
                data: {
                    Id_user: user_id,
                    Id_amigo: selectedFriend
                }
            });

            if (response.data.result) {
                setFollowedFriends(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(selectedFriend);
                    return newSet;
                });
                setSuggestedFriends(prev => [
                    ...prev, 
                ]);
            } else {
                console.error(response.data.message || 'Error al eliminar amigo');
            }
        } catch (err) {
            console.error(err.message || 'Error al eliminar amigo');
        } finally {
            setModalOpen(false);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
    }

    return (
        <>
            <Box 
                sx={{ 
                    bgcolor: 'background.paper', 
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Quizás Conozcas
                </Typography>
                {suggestedFriends.length === 0 ? (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        No se encontraron amigos sugeridos.
                    </Typography>
                ) : (
                    suggestedFriends.map(friend => (
                        <Box 
                            key={friend.Id_user} 
                            display="flex" 
                            alignItems="center" 
                            padding="12px"
                            sx={{
                                borderRadius: '8px',
                                mb: 1,
                                transition: 'background-color 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <Avatar 
                                sx={{ 
                                    width: 40, 
                                    height: 40, 
                                    fontSize: '1.2rem', 
                                    bgcolor: '#1DA1F2', 
                                    color: '#fff',
                                    border: '2px solid #fff'
                                }}
                            >
                                {friend.nombres.charAt(0)}
                            </Avatar>
                            <Box sx={{ ml: 2, flexGrow: 1 }}>
                                <Typography variant="body1" 
                                    sx={{ 
                                        fontWeight: '500',
                                        color: 'text.primary'
                                    }}>
                                    {friend.nombres}
                                </Typography>
                            </Box>
                            {followedFriends.has(friend.Id_user) ? (
                                <EliminarFollow
                                    userId={user_id}
                                    friendId={friend.Id_user}
                                    onUnfollow={() => handleUnfollow(friend.Id_user, friend.nombres)}
                                />
                            ) : (
                                <AgregarFollow
                                    userId={user_id}
                                    friendId={friend.Id_user}
                                    onFollow={handleFollow}
                                />
                            )}
                        </Box>
                    ))
                )}
            </Box>

            <ModalAviso
                open={modalOpen}
                handleClose={handleCloseModal}
                errorMessage={`Dejaste de seguir a ${selectedFriendName}`}
                onConfirm={confirmUnfollow}
            />
        </>
    );
}

export default SuggestFriend;
