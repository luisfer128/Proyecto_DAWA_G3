import React from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

function CrearPost() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
            }}
        >
            <Paper sx={{ padding: '16px', p: 2, maxWidth: '580px', width: '100%' }}>
                <Typography variant="h6">¿En qué estás pensando?</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Escribe algo..."
                    multiline
                    rows={2}
                    // value={newPostText}
                    // onChange={handleNewPostTextChange}
                    sx={{ mt: 2 }}
                />
                <Button variant="contained" color="primary" sx={{ m: 1 }}>Publicar</Button>
            </Paper>
        </Box>
    );
}

export default CrearPost;
