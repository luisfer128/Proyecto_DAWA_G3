import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Importar el icono de advertencia


function ModalAviso({ open, handleClose, errorMessage }) {
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
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius:'10px'
            }}>
                <IconButton color="warning">
                    <WarningAmberIcon sx={{ fontSize: 40 }} />
                    <Typography id="error-modal-title" variant="h5" component="h3">
                        Aviso
                    </Typography>
                </IconButton>
                
                <Typography id="error-modal-description" sx={{ mt: 2 }}>
                    {errorMessage}
                </Typography>
                <Button onClick={handleClose} sx={{ mt: 2 }}>Cerrar</Button>
            </Box>
        </Modal>
    );
}

export default ModalAviso;
