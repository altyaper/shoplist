import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useSession from '../../app/hooks/sessionHook';
import Tasks from '../Task/Tasks';
import TaskDialog, { FooterWrapper } from '../TaskDialog/TaskDialog';
import { Task } from '../../models';
import { Container, Button } from '@mui/material';
import { useSelector } from '../../app/store';
import { getTasksSelector } from '../../app/selectors/tasksSelectors';

const MainFooterWrapper = styled(FooterWrapper)`
  padding: 2em 0;
`;

const TaskPageWrapper = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;`
;

export const TaskPage = () => {
  const tasks = useSelector(getTasksSelector);
  const {onAdd, onUpdate, onDone, onDelete} = useSession();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { t } = useTranslation();
  
  const handleOnSubmit = (task: Task) => {
    if (editingTask) {
      onUpdate(task);
    } else {
      onAdd(task);
    }
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setOpenDialog(true);
  };

  const handleDelete = (task: Task) => {
    onDelete(task);
  };
  
  const handleMarkDone = (task: Task) => {
    onDone(task);
  };

  const handleCloseModal = () => {
    setOpenDialog(false);
    setEditingTask(null);
  };

  const handleOpenModal = () => {
    setEditingTask(null);
    setOpenDialog(true);
  };

  return (
    <TaskPageWrapper>
      <Tasks
        onMarkDone={handleMarkDone}
        onEdit={handleEdit}
        onDelete={handleDelete}
        tasks={tasks}
      />
      <MainFooterWrapper>
        <Container>
          <Button
            size='large'
            disableElevation
            variant='contained'
            fullWidth
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
        task={editingTask}
      />
    </TaskPageWrapper>
  )
}

export default TaskPage;