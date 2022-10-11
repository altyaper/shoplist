/* eslint-disable no-unused-vars */
import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { TaskPage } from '../TaskPage';
import { HamburgerButton } from '../Buttons';
import useSession from '../../hooks/sessionHook';

const AppWrapper = styled.div`
`;

const BlackSide = styled.div`
  background-color: #23242A;
  width: ${({ sideOpen }) => sideOpen? '100px' : '0px'};
  text-align: center;
  position: absolute;
  right: 0;
  height: 100%;
  z-index: 1;
  top: 0;
  padding: ${({ sideOpen }) => sideOpen ? '100px 5px 0 5px' : '100px 0 0 0'};
  transition: all 0.5s ease;
`;

const SideMenuButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F43E32',
  height: '2.3em',
  width: '85%',
  borderRadius: '15px',
  color: 'white',
  fontSize: '2em',
  position: 'relative',
  zIndex: 2,
  boxShadow: '0px 3px 0px #000',
}));

const App = () => {
  const [
    tasks,
    onAdd,
    onDelete,
    onDone,
    deleteAll
  ] = useSession();
  const [sideOpen, setSideOpen] = useState(true);

  const handleToggleSideBar = () => {
    setSideOpen(prev => !prev);
  }

  const handleCleanSession = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this session?')) {
      deleteAll();
      setSideOpen(false);
    }
  }

  return (
    <AppWrapper>
      <div>
        <HamburgerButton open={sideOpen} onClick={handleToggleSideBar} />
        <BlackSide sideOpen={sideOpen}>
          <SideMenuButton onClick={handleCleanSession}>D</SideMenuButton>
        </BlackSide>
      </div>
      <TaskPage />
    </AppWrapper>
  );
}

export default App;
