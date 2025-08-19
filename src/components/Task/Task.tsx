import React, { useState } from 'react';
import { Paper, Checkbox, Grid, Typography } from '@mui/material';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TaskProps, FlagProps } from '../../models';
import { useTranslation } from 'react-i18next';

dayjs.extend(relativeTime);

const TaskWrapper = styled(Paper)<FlagProps>`
  border: 1px solid #E3E4E8;
  padding: 0.8em;
  border-radius: 15px;
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;
  opacity: 1;
  transform: translateY(0);

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



const RelativeTimeLabel = styled.span<FlagProps>`
  font-size: 0.75rem;
  font-family: 'Montserrat', sans-serif;
  color: ${({ done }) => done ? '#9e9e9e' : '#9e9e9e'};
  font-weight: 400;
  display: block;
  margin-top: 0.3em;
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
  const [isFading, setIsFading] = useState(false);
  const formatedDate = dayjs(task.createdAt).format('DD MMM YYYY');

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

  return (
    <FadingTaskWrapper done={task.done} isFading={isFading} variant="outlined">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2} md={1}>
          <Checkbox
            onChange={handleCheckboxChange}
            checked={task.done}
          />
        </Grid>
        <Grid item xs={10} md={11}>
          <TaskText done={task.done}>
            <Typography variant='body1'>
              {task.text}
            </Typography>
            <RelativeTimeLabel done={task.done}>
              Added {dayjs(task.createdAt).fromNow()}
            </RelativeTimeLabel>
          </TaskText>
        </Grid>
      </Grid>
    </FadingTaskWrapper>
  );
}

export default Task;