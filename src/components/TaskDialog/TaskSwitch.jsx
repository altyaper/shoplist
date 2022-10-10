import { Grid, Switch } from '@mui/material';
import styled from 'styled-components';

const TaskOptionWrapper = styled.div`
  border: 1px solid #E3E4E8;
  padding: 0.8em;
  border-radius: 15px;
  margin-bottom: 20px;
  margin-top: 2em;
`;

export const TaskSwitch = ({
  onChange,
  name,
  label
}) => {
  return (
    <TaskOptionWrapper>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          Icon
        </Grid>
        <Grid item xs={6}>
          {label}
        </Grid>
        <Grid style={{alignItems: 'right'}} item xs={4}>
          <Switch
            onChange={onChange}
            name={name}
          />
        </Grid>
      </Grid>
    </TaskOptionWrapper>
  )
}

export default TaskSwitch;