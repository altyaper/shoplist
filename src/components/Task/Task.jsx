import { Paper } from '@mui/material';
import styled from 'styled-components';

const TaskWrapper = styled(Paper)`
  border: 1px solid #E3E4E8;
  padding: 0 0.8em;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const TaskText = styled.p`
  font-size: 1.2em;
  line-height: 1.6em;
`;


export const Task = ({
  onMarkDone,
  onRemove,
  task
}) => {
  return (
    <TaskWrapper variant="outlined">
      <TaskText>{task.text}</TaskText>
    </TaskWrapper>
  );
}

export default Task;