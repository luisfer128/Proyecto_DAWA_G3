import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ModalSuccess = ({ open, handleClose, successMessage }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="error-modal-title"
            aria-describedby="error-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 320,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius:'10px'
            }}>
                <IconButton>
                    <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />
                    <Typography id="error-modal-title" variant="h5" component="h3">
                    Publicación Exitosa
                    </Typography>
                </IconButton>
                
                <Typography sx={{ mt: 2 }}>
                    {successMessage}
                </Typography>
                <Button onClick={handleClose} sx={{ mt: 2 }} variant="outlined" color="primary">
                    Cerrar
                </Button>
            </Box>
        </Modal>
    );
}

export default ModalSuccess;
