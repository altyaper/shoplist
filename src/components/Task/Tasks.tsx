import React from 'react';
import { Container, Typography } from "@mui/material";
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from "react-i18next";
import { Task } from "./Task";
import { Task as TaskModel } from '../../models';
import { palette } from '../../themes/colors';

ChartJS.register(ArcElement, Tooltip, Legend);

const TasksWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Empty = styled.div`
  text-align: center;
  color: ${palette['charcoal']};
  background-color: ${palette['gray-3']};
  padding: 2em;
  font-size: 1.4em;
  border-radius: 15px;
  font-weight: bold;
`;

const ChartWrapper = styled.div`
  width: 5em;
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2em;
  h2 {
    margin-right: auto;
  }
`;

interface TasksProps {
  tasks: TaskModel[],
  onMarkDone: (task: TaskModel) => void;
}

const Tasks = (props: TasksProps) => {
  const { tasks } = props;
  const { t } = useTranslation();
  const complete = tasks.filter(task => task.done === true).length;
  const incomplete = tasks.length - complete;
  
  
  const data = {
    datasets: [
      {
        data: [complete, incomplete],
        backgroundColor: [palette['purpure-1'], palette['amber-1']],
        borderColor: [palette['purpure-2'], palette['amber-2']],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <TopWrapper>
        <Typography variant='h2'>
          {t("tasks_title")}
        </Typography>
        <ChartWrapper>
          {tasks && tasks.length > 0 && <Doughnut data={data} />}
        </ChartWrapper>
      </TopWrapper>
      <TasksWrapper className="list">
        { tasks && tasks.map((task, idx) => (
          <Task key={idx} {...props} task={task} />
        ))}
        {!tasks.length && (
          <Empty>
            <Typography variant='h5'>
              {t('empty_tasks')}
            </Typography>
          </Empty>
        )}
      </TasksWrapper>
    </Container>
  )
}

export default Tasks;