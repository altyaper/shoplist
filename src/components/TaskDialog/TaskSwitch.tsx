import React, { ChangeEvent } from 'react';
import { Grid, Switch } from '@mui/material';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskOptionWrapper = styled.div`
  border: 1px solid #E3E4E8;
  padding: 0.8em;
  border-radius: 15px;
  margin-bottom: 20px;
  margin-top: 2em;
`;

const IconWrapper = styled.div`
  background: #fbe8e8;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.4em;
  color: #c76666;
  width: 4.2em;
`;

interface TaskSwitchProps {
  onChange?: (e: ChangeEvent) => void;
  name: string;
  label: string;
  value: boolean;
}

export const TaskSwitch = ({
  onChange,
  name,
  label
}: TaskSwitchProps) => {
  return (
    <TaskOptionWrapper>
      <Grid alignItems="center" container spacing={2}>
        <Grid item xs={3}>
          <IconWrapper>
            <DeleteIcon />
          </IconWrapper>
        </Grid>
        <Grid item xs={6}>
          {label}
        </Grid>
        <Grid item xs={3}>
          <Switch
            onChange={onChange}
            name={name}
            defaultChecked
          />
        </Grid>
      </Grid>
    </TaskOptionWrapper>
  )
}

export default TaskSwitch;