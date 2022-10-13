import { useState } from 'react';
import useSession from '../../hooks/sessionHook';
import Tasks from '../Task/Tasks';
import styled from 'styled-components';
import TaskDialog, { ColorButton, FooterWrapper } from '../TaskDialog/TaskDialog';

const MainFooterWrapper = styled(FooterWrapper)`
  padding: 2em 1.2em;
`;

const PurpleButton = styled(ColorButton)`
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
  
  const handleOnSubmit = (task) => onAdd(task);
  
  const handleMarkDone = task => {
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
        <PurpleButton
          size='large'
          disableElevation
          type="submit"
          onClick={handleOpenModal}
        >
          ADD NEW TASK
        </PurpleButton>
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