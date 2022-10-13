import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Container } from '@mui/material';
import useSession from '../../hooks/sessionHook';
import Tasks from '../Task/Tasks';
import TaskDialog, { ColorButton, FooterWrapper } from '../TaskDialog/TaskDialog';
import { Task } from '../../models';


const MainFooterWrapper = styled(FooterWrapper)`
  padding: 2em 0;
`;

const PurpleButton = styled(ColorButton)`
  text-transform: uppercase;
  &.MuiButtonBase-root {
    background-color: #A362EA;
  }
`;

const TaskPageWrapper = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;`
;

export const TaskPage = () => {
  const {tasks, onAdd, onDone, onDelete} = useSession();
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation();
  
  const handleOnSubmit = (task: Task) => onAdd(task);
  
  const handleMarkDone = (task: Task) => {
    onDone(task);
    setTimeout(() => {
      onDelete(task);
    }, 1000);
  };

  const handleCloseModal = () => setOpenDialog(false);

  const handleOpenModal = () => setOpenDialog(true);

  return (
    <TaskPageWrapper>
      <Tasks
        onMarkDone={handleMarkDone}
        tasks={tasks}
      />
      <MainFooterWrapper>
        <Container>
          <PurpleButton
            size='large'
            disableElevation
            type="submit"
            onClick={handleOpenModal}
          >
            {t('add_task')}
          </PurpleButton>
        </Container>
      </MainFooterWrapper>
      <TaskDialog
        onSubmit={handleOnSubmit}
        open={openDialog}
        onCloseModal={handleCloseModal}
      />
    </TaskPageWrapper>
  )
}

export default TaskPage;