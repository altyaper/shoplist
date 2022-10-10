import { Paper, Checkbox, Grid } from '@mui/material';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';

const TaskWrapper = styled(Paper)`
  border: 1px solid #E3E4E8;
  padding: 0.8em;
  border-radius: 15px;
  margin-bottom: 20px;

  .MuiSvgIcon-root {
    font-size: 2rem;
  }

  ${(props) => props.done && (
    css`
      background-color: #A362EA;
      color: white;

      .Mui-checked {
        color: white;
      }
    `
  )}

`;

const TaskText = styled.p`
  font-size: 1.2em;
  line-height: 1.6em;
  font-weight: 600;
  margin: 0;
  margin-bottom: 0.8em;
`;

const TaskDate = styled.span`
  font-weigth: 400;
`;

const DoneLabel = styled.span`
  font-weight: 600;
`

export const Task = ({
  onMarkDone,
  onRemove,
  task
}) => {

  const formatedDate = dayjs(task.createdAt).format('DD/MM/YYYY');

  return (
    <TaskWrapper done={task.done} variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TaskText>{task.text}</TaskText>
        </Grid>
        <Grid item xs={2}>
          <Checkbox
            onChange={() => onMarkDone(task.idx)}
            checked={task.done}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TaskDate>{formatedDate}</TaskDate>
        </Grid>
        <Grid item xs={4}>
          {task.done && <DoneLabel>COMPLETED!</DoneLabel>}
        </Grid>
      </Grid>
    </TaskWrapper>
  );
}

export default Task;