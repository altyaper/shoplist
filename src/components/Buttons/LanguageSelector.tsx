import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';

export const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            <Button
                variant={i18n.language === 'en-US' ? 'contained' : 'outlined'}
                onClick={() => handleLanguageChange('en-US')}
                size="small"
            >
                🇺🇸
            </Button>
            <Button
                variant={i18n.language === 'es-MX' ? 'contained' : 'outlined'}
                onClick={() => handleLanguageChange('es-MX')}
                size="small"
            >
                🇪🇸
            </Button>
        </Box>
    );
};
