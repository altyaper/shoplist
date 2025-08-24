import { useState } from 'react';
import { Checkbox, Grid, Typography, IconButton, useMediaQuery, useTheme, Stack } from '@mui/material';
import { EditOutlined, MoreVert, DeleteOutline } from '@mui/icons-material';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TaskProps, FlagProps } from '../../models';
import { TaskActionModal } from './TaskActionModal';

dayjs.extend(relativeTime);

const ActionIcon = styled(IconButton)`
  &:hover {
    background-color: transparent !important;
  }
  svg {
    width: 25px;
    height: 25px;
  }
`

const TaskWrapper = styled('div')<FlagProps>`
  border: none;
  padding: 0.2em;
  border-radius: 15px;
  margin-bottom: 5px;
  transition: all 0.3s ease-in-out;
  opacity: 1;
  transform: translateY(0);
  box-shadow: none;

  .MuiSvgIcon-root {
    font-size: 2rem;
  }
`;

const TaskText = styled.p<FlagProps>`
  margin: 0;
  margin-bottom: 0.8em;
  text-decoration: ${({ done }) => done ? 'line-through' : 'none'};
  color: ${({ done }) => done ? '#9e9e9e' : 'inherit'};
`;

const FadingTaskWrapper = styled(TaskWrapper)<{ isFading: boolean }>`
  ${({ isFading }) => isFading && css`
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease-in-out;
  `}
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
`;

const RelativeTimeLabel = styled.span<FlagProps>`
  font-size: 0.75rem;
  font-family: 'Montserrat', sans-serif;
  color: ${({ done }) => done ? '#9e9e9e' : '#9e9e9e'};
  font-weight: 400;
  display: block;
  margin-top: 0.3em;
`;

const StaticCheckbox = styled(Checkbox)({
  "&:hover": {
    backgroundColor: "transparent !important",
  }
});

export const Task = ({
  onMarkDone,
  onEdit,
  onDelete,
  task
}: TaskProps) => {
  const [isFading, setIsFading] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCheckboxChange = () => {
    if (!task.done) {
      setIsFading(true);
      setTimeout(() => {
        onMarkDone(task);
      }, 50);
    } else {
      onMarkDone(task);
    }
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task);
  };

  const handleMobileMenuOpen = () => {
    setShowMobileModal(true);
  };

  const handleMobileMenuClose = () => {
    setShowMobileModal(false);
  };

  return (
    <>
      <FadingTaskWrapper done={task.done} isFading={isFading}>
        <Grid container alignItems="center">
          <Grid item xs={10}>
          <Stack direction="row" spacing={2}>
            <StaticCheckbox
                disableFocusRipple
                onChange={handleCheckboxChange}
                checked={task.done}
              />
            <TaskText done={task.done}>
              <Typography variant='body1'>
                {task.text}
              </Typography>
              <RelativeTimeLabel done={task.done}>
                Added {dayjs(task.createdAt).fromNow()}
              </RelativeTimeLabel>
            </TaskText>
          </Stack>
          </Grid>
          <Grid item xs={2} justifyContent="flex-end" sx={{ textAlign: 'center'}}>
            {isMobile ? (
              <ActionIcon
                size="small"
                onClick={handleMobileMenuOpen}
                aria-label="Task actions menu"
                title="Task actions menu"
              >
                <MoreVert fontSize="small" />
              </ActionIcon>
            ) : (
              <ActionButtons>
                <ActionIcon
                  size="small"
                  onClick={handleEdit}
                  aria-label="Edit task"
                  title="Edit task"
                  sx={{ color: '#A362EA', ml: 'auto' }}
                >
                  <EditOutlined sx={{ fontSize: '16px' }} />
                </ActionIcon>
                <ActionIcon
                  size="small"
                  onClick={handleDelete}
                  aria-label="Delete task"
                  title="Delete task"
                  sx={{ color: '#A362EA' }}
                >
                  <DeleteOutline sx={{ fontSize: '16px' }} />
                </ActionIcon>
              </ActionButtons>
            )}
          </Grid>
        </Grid>
      </FadingTaskWrapper>
      
      {isMobile && (
        <TaskActionModal
          open={showMobileModal}
          onClose={handleMobileMenuClose}
          task={task}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default Task;