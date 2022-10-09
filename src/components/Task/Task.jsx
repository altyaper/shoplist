import { Paper } from '@mui/material';
import styled from 'styled-components';

const TaskWrapper = styled.li`
  border: 1px solid #E3E4E8;
  padding: 1.2em;
  border-radius: 20px;
`;

export const Task = ({
  onMarkDone,
  onRemove,
  task
}) => {
  return (
    <Paper variant="outlined">
      <span>{task.text}</span>
    </Paper>
  );
}

export default Task;