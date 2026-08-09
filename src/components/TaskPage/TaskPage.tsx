import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useSession from '../../app/hooks/sessionHook';
import Tasks from '../Task/Tasks';
import TaskDialog, { FooterWrapper } from '../TaskDialog/TaskDialog';
import { Task } from '../../models';
import { Container, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useSelector } from '../../app/store';
import { getTasksSelector } from '../../app/selectors/tasksSelectors';
import PhotoImportDialog from '../../features/photoImport/PhotoImportDialog';

const MainFooterWrapper = styled(FooterWrapper)`
  padding: 2em 0;
`;

const TaskPageWrapper = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  padding-bottom: 100px;
;`

export const TaskPage = () => {
  const tasks = useSelector(getTasksSelector);
  const { onAdd, onAddMany, onUpdate, onDone, onDelete } = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openDialog, setOpenDialog] = useState(false);
  const [openPhotoImport, setOpenPhotoImport] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { t, i18n } = useTranslation();

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
    if (isMobile) onUpdate(task);
    if (!isMobile) setOpenDialog(true);
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
          <Stack spacing={1}>
            <Button
              size='large'
              disableElevation
              variant='outlined'
              fullWidth
              type="button"
              startIcon={<PhotoCamera />}
              onClick={() => setOpenPhotoImport(true)}
            >
              {t('scan_photo_ai', { defaultValue: 'Scan photo with AI' })}
            </Button>
            <Button
              size='large'
              disableElevation
              variant='contained'
              fullWidth
              type="button"
              onClick={handleOpenModal}
            >
              {t('add_task')}
            </Button>
          </Stack>
        </Container>
      </MainFooterWrapper>
      <TaskDialog
        onSubmit={handleOnSubmit}
        open={openDialog}
        onCloseModal={handleCloseModal}
        task={editingTask}
      />
      <PhotoImportDialog
        open={openPhotoImport}
        language={i18n.resolvedLanguage || i18n.language || 'en-US'}
        onClose={() => setOpenPhotoImport(false)}
        onAddItems={onAddMany}
      />
    </TaskPageWrapper>
  )
}

export default TaskPage;