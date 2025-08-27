import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { SHOPLIST_CONFIG } from '../../constants';

const WelcomeModal: React.FC = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const configStr = localStorage.getItem(SHOPLIST_CONFIG);
        const config = configStr ? JSON.parse(configStr) : {};
        if (!config.hasVisited) {
            setOpen(true);
        }
    }, []);

    const handleClose = () => {
        const config = { hasVisited: true };
        localStorage.setItem(SHOPLIST_CONFIG, JSON.stringify(config));
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="welcome-modal-title"
            aria-describedby="welcome-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="welcome-modal-title" variant="h6" component="h2">
                    Welcome to ShopList!
                </Typography>
                <Typography id="welcome-modal-description" sx={{ mt: 2 }}>
                    This is a simple shopping list application. We are happy to see you here.
                </Typography>
                <Button onClick={handleClose} sx={{ mt: 2 }}>
                    Get Started
                </Button>
            </Box>
        </Modal>
    );
};

export default WelcomeModal;
