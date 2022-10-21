import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useSession from '../../app/hooks/sessionHook';
import Tasks from '../Task/Tasks';
import TaskDialog, { FooterWrapper } from '../TaskDialog/TaskDialog';
import { Task } from '../../models';
import { Container, Button } from '@mui/material';
import { useSelector } from '../../app/store';

const MainFooterWrapper = styled(FooterWrapper)`
  padding: 2em 0;
`;

const TaskPageWrapper = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;`
;

export const TaskPage = () => {
  const tasks = useSelector(state => state.tasks.tasksList);
  const {onAdd, onDone, onDelete} = useSession();
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation();
  
  const handleOnSubmit = (task: Task) => onAdd(task);
  
  const handleMarkDone = (task: Task) => {
    onDone(task);
    setTimeout(() => {
      onDelete(task);
    }, 500);
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
          <Button
            size='large'
            variant='contained'
            disableElevation
            type="submit"
            onClick={handleOpenModal}
          >
            {t('add_task')}
          </Button>
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