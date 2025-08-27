import styled from 'styled-components';
import { TaskPage } from '../TaskPage';
import { SideMenu } from '../SideMenu';
import WelcomeModal from '../WelcomeModal';

const AppWrapper = styled.div`
`;

const App = () => {
  return (
    <AppWrapper>
      <SideMenu />
      <TaskPage />
      <WelcomeModal />
    </AppWrapper>
  );
}

export default App;
