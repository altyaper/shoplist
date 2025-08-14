import React from 'react';
import { Paper, Checkbox, Grid, Typography } from '@mui/material';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { TaskProps, FlagProps } from '../../models';
import { useTranslation } from 'react-i18next';

const TaskWrapper = styled(Paper)<FlagProps>`
  border: 1px solid #E3E4E8;
  padding: 0.8em;
  border-radius: 15px;
  margin-bottom: 20px;

  .MuiSvgIcon-root {
    font-size: 2rem;
  }

  ${({ done }) => done && (
    css`
      background-color: #A362EA !important;
      color: white !important;

      .Mui-checked {
        color: white !important;
      }
    `
  )}
`;

const TaskText = styled.p`
  margin: 0;
  margin-bottom: 0.8em;
`;

const TaskDate = styled.span`
  font-weigth: 400;
`;

const DoneLabel = styled.span<FlagProps>`
  text-transform: uppercase;
  transform: translateY(0px);
  color: ${({ done }) => !!done ? 'white' : 'black'};
  opacity: ${({ done }) => !!done ? '1' : '0'};
`;

export const Task = ({
  onMarkDone,
  task
}: TaskProps) => {
  const { t } = useTranslation();
  const formatedDate = dayjs(task.createdAt).format('DD MMM YYYY');

  return (
    <TaskWrapper done={task.done} variant="outlined">
      <Grid container spacing={2} >
        <Grid item xs={10}>
          <TaskText>
            <Typography variant='body1'>
              {task.text}
            </Typography>
          </TaskText>
        </Grid>
        <Grid item xs={2} style={{textAlign: 'right'}}>
          <Grid container justifyContent="flex-end">
            <Checkbox
              onChange={() => onMarkDone(task)}
              checked={task.done}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <TaskDate>{formatedDate}</TaskDate>
        </Grid>
        <Grid item xs={5}>
          <Grid container justifyContent="flex-end">
            <Typography variant='body1'>
              <DoneLabel done={task.done}>{String(t('completed_task'))}</DoneLabel>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </TaskWrapper>
  );
}

export default Task;