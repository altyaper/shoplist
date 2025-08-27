import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Box, Typography, Button } from '@mui/material';
import { SHOPLIST_CONFIG } from '../../constants';

const WelcomeModal: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(i18n.language);

    useEffect(() => {
        const configStr = localStorage.getItem(SHOPLIST_CONFIG);
        const config = configStr ? JSON.parse(configStr) : {};
        if (!config.hasVisited) {
            setOpen(true);
        }
    }, []);

    const handleLanguageChange = (lang: string) => {
        setSelectedLang(lang);
    };

    const handleClose = () => {
        const config = { hasVisited: true, language: selectedLang };
        localStorage.setItem(SHOPLIST_CONFIG, JSON.stringify(config));
        i18n.changeLanguage(selectedLang);
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
                    {t('welcome_title')}
                </Typography>
                <Typography id="welcome-modal-description" sx={{ mt: 2 }}>
                    {t('welcome_message')}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant={selectedLang === 'en-US' ? 'contained' : 'outlined'}
                        onClick={() => handleLanguageChange('en-US')}
                    >
                        🇺🇸
                    </Button>
                    <Button
                        variant={selectedLang === 'es-MX' ? 'contained' : 'outlined'}
                        onClick={() => handleLanguageChange('es-MX')}
                    >
                        🇪🇸
                    </Button>
                </Box>
                <Button onClick={handleClose} sx={{ mt: 2 }}>
                    {t('get_started')}
                </Button>
            </Box>
        </Modal>
    );
};

export default WelcomeModal;
