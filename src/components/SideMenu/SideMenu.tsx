import React, { useState } from 'react';
import styled from 'styled-components';
import useSession from '../../hooks/sessionHook';
import { Delete, Add } from '@mui/icons-material';
import { DeleteButton, AddButton, HamburgerButton } from '../Buttons';
import { useTranslation } from 'react-i18next';
import { BlackSideProps } from '../../models';

const BlackSide = styled.div<BlackSideProps>`
  background-color: #23242A;
  width: 100px;
  text-align: center;
  position: fixed;
  right: ${({ sideOpen }) => sideOpen ? '0' : '-100px' };
  height: 100%;
  z-index: 1;
  top: 0;
  padding: ${({ sideOpen }) => sideOpen ? '100px 5px 0 5px' : '100px 0 0 0'};
  transition: all 0.5s ease;
`;

const SideMenuWrapper = styled.div``;

export const SideMenu = () => {
  const { t } = useTranslation();
  const { onDeleteAll } = useSession();
  const [sideOpen, setSideOpen] = useState(false);

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
      <HamburgerButton open={sideOpen} onClick={handleToggleSideBar} />
      <BlackSide sideOpen={sideOpen}>
        <AddButton onClick={handleCleanSession}>
          <Add />
        </AddButton>
        <DeleteButton onClick={handleCleanSession}>
          <Delete />
        </DeleteButton>
      </BlackSide>
    </SideMenuWrapper>
  )
};

export default SideMenu;