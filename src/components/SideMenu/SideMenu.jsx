/* eslint-disable no-unused-vars */
import { useState, memo } from 'react';
import { HamburgerButton } from '../Buttons';
import { Button } from '@mui/material';
import styled from 'styled-components';
import useSession from '../../hooks/sessionHook';
import DeleteIcon from '@mui/icons-material/Delete';

const BlackSide = styled.div`
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

const SideMenuButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F43E32 !important',
  height: '2.3em',
  width: '85%',
  borderRadius: '15px !important',
  color: 'white !important',
  fontSize: '2em !important',
  position: 'relative',
  zIndex: 2,
  boxShadow: '0px 3px 0px #000',
}));

const SideMenuWrapper = styled.div``;

export const SideMenu = () => {

  const { onDeleteAll } = useSession();
  const [sideOpen, setSideOpen] = useState(false);

  const handleToggleSideBar = () => {
    setSideOpen(prev => !prev);
  }

  const handleCleanSession = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this session?')) {
      onDeleteAll();
      setSideOpen(false);
    }
  }

  return (
    <SideMenuWrapper>
      <HamburgerButton open={sideOpen} onClick={handleToggleSideBar} />
      <BlackSide sideOpen={sideOpen}>
        <SideMenuButton onClick={handleCleanSession}><DeleteIcon /></SideMenuButton>
      </BlackSide>
    </SideMenuWrapper>
  )
};

export default SideMenu;