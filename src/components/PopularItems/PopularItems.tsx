import { useState } from 'react';
import {
    Container,
    Typography,
    Stack,
    IconButton,
    Button,
    Grid,
    Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { popularItems } from '../../data/popularItems';
import { palette } from '../../themes/colors';
import useSession from '../../app/hooks/sessionHook';

const ChipStyled = styled(Chip)`
    background-color: transparent !important;
    border: 1px solid #e4e4e4 !important;
    svg {
        width: 15px;
        height: 15px;
    }
`;

const PopularItemsWrapper = styled.div`
  margin-top: 2rem;
`;

const ShowMoreButton = styled(Button)`
  margin-top: 1rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export const PopularItems = () => {
    const { t } = useTranslation();
    const { onAdd } = useSession();
    const [collapsed, setCollapsed] = useState(false);
    const [visibleCount, setVisibleCount] = useState(10);

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };

    const handleItemClick = (item: string) => {
        onAdd({
            text: item,
            deleteOnComplete: true,
            idx: 0,
            createdAt: '',
            done: false
        });
    };

    return (
        <PopularItemsWrapper>
            <Container style={{ backgroundColor: palette['gray-3'] }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    style={{ marginTop: '2rem', marginBottom: '1rem' }}
                >
                    <Typography
                        variant="h6"
                        style={{ color: palette['charcoal'], fontSize: '1em' }}
                    >
                        {t('popular_items')}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ color: palette['purpure-1'], marginLeft: 'auto' }}
                        aria-label={
                            collapsed ? 'Expand popular items' : 'Collapse popular items'
                        }
                        sx={{
                            "&:hover": {
                                backgroundColor: "transparent", // disables the hover background
                            },
                        }}
                        aria-expanded={!collapsed}
                        title={
                            collapsed ? 'Expand popular items' : 'Collapse popular items'
                        }
                    >
                        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton>
                </Stack>
            </Container>
            {!collapsed && (
                <Container>
                    <Grid container spacing={1.2} style={{ marginTop: '1rem' }}>
                        {popularItems.slice(0, visibleCount).map((item, index) => (
                            <Grid item key={index}>
                                <ChipStyled label={item} onClick={() => handleItemClick(item)} icon={<AddIcon />} />
                            </Grid>
                        ))}
                    </Grid>
                    {visibleCount < popularItems.length && (
                        <div style={{ textAlign: 'center', marginTop: '0.7em' }}>
                            <ShowMoreButton variant="text" onClick={handleShowMore}>
                                {t('show_more')}
                            </ShowMoreButton>
                        </div>
                    )}
                </Container>
            )}
        </PopularItemsWrapper>
    );
};

export default PopularItems;
