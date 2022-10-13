import React from 'react';
import styled from 'styled-components';
import { TaskPage } from '../TaskPage';
import { SideMenu } from '../SideMenu';

const AppWrapper = styled.div`
`;

const App = () => {
  return (
    <AppWrapper>
      <SideMenu />
      <TaskPage />
    </AppWrapper>
  );
}

export default App;
