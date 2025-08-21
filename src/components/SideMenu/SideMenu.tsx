import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useSession from '../../app/hooks/sessionHook';
import { Delete } from '@mui/icons-material';
import { DeleteButton, HamburgerButton } from '../Buttons';
import { useTranslation } from 'react-i18next';
import { BlackSideProps } from '../../models';
import { Box, Container, Grid } from '@mui/material';

const BlackSide = styled.div<BlackSideProps>`
  border-left: 1px solid #efefef;
  background-color: #fdfdfd;
  width: 100px;
  text-align: center;
  position: fixed;
  right: ${({ sideOpen }) => sideOpen ? '0' : '-100px' };
  height: 100%;
  z-index: 1;
  top: 0;
  padding: ${({ sideOpen }) => sideOpen ? '100px 5px 0 5px' : '100px 0 0 0'};
  transition: all 0.5s ease;

  button {
    margin-bottom: 0.8em;
  }
`;

const SideMenuWrapper = styled.div`
  padding: 1.2em 0;
`;

export const SideMenu = () => {
  const { t } = useTranslation();
  const { onDeleteAll } = useSession();
  const [sideOpen, setSideOpen] = useState(false);
  const sideMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node)) {
        setSideOpen(false);
      }
    };

    if (sideOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sideOpen]);

  const handleToggleSideBar = () => {
    setSideOpen(prev => !prev);
  }

  const handleCleanSession = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(t('delete_confirm_message'))) {
      onDeleteAll();
      setSideOpen(false);
    }
  }

  return (
    <SideMenuWrapper>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <HamburgerButton open={sideOpen} onClick={handleToggleSideBar} />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <BlackSide ref={sideMenuRef} id="side-menu" sideOpen={sideOpen}>
        <DeleteButton
          onClick={handleCleanSession}
          aria-label={t('delete_all_aria') || 'Delete all tasks'}
          title={t('delete_all_aria') || 'Delete all tasks'}
        >
          <Delete />
        </DeleteButton>
      </BlackSide>
    </SideMenuWrapper>
  )
};

export default SideMenu;