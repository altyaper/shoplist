import { useState } from 'react';
import { HamburgerButton } from '../Buttons';
import styled from 'styled-components';
import useSession from '../../hooks/sessionHook';
import { Delete, Add } from '@mui/icons-material';
import { DeleteButton, AddButton } from '../Buttons';

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