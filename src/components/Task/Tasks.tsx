import { useState } from 'react';
import { Container, Typography, Stack, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
  display: none;
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
  onEdit: (task: TaskModel) => void;
  onDelete: (task: TaskModel) => void;
}

const Tasks = (props: TasksProps) => {
  const { tasks, onMarkDone, onEdit, onDelete } = props;
  const { t } = useTranslation();
  const complete = tasks.filter(task => task.done === true).length;
  const incomplete = tasks.length - complete;
  const [completedSectionCollapsed, setCompletedSectionCollapsed] = useState<boolean>(false);
  
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

  const completedSectionId = 'completed-section';

  return (
    <Container>
      <TopWrapper>
       
        <ChartWrapper>
          {tasks && tasks.length > 0 && <Doughnut data={data} />}
        </ChartWrapper>
      </TopWrapper>
      <TasksWrapper className="list">
        {/* Incomplete Tasks */}
        {incomplete > 0 && (
          <>
            <Typography variant='h6' style={{ marginBottom: '1rem', color: palette['charcoal'] }}>
              {t("tasks_title")} ({incomplete})
            </Typography>
            {tasks.filter(task => !task.done).map((task) => (
              <Task 
                key={`incomplete-${task.idx}`} 
                task={task}
                onMarkDone={onMarkDone}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </>
        )}
        
        {/* Completed Tasks */}
        {complete > 0 && (
          <>
            <Stack direction="row" alignItems="center" spacing={1} style={{ marginTop: '2rem', marginBottom: '1rem' }}>
              <Typography variant='h6' style={{ color: palette['purpure-1'] }}>
                Completed ({complete})
              </Typography>
              <IconButton
                size="small"
                onClick={() => setCompletedSectionCollapsed(!completedSectionCollapsed)}
                style={{ color: palette['purpure-1'] }}
                aria-label={completedSectionCollapsed ? 'Expand completed section' : 'Collapse completed section'}
                aria-controls={completedSectionId}
                aria-expanded={!completedSectionCollapsed}
                title={completedSectionCollapsed ? 'Expand completed section' : 'Collapse completed section'}
              >
                {completedSectionCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            </Stack>
            <div
              id={completedSectionId}
              role="region"
              aria-hidden={completedSectionCollapsed}
            >
              {!completedSectionCollapsed && tasks.filter(task => task.done).map((task) => (
                <Task 
                  key={`complete-${task.idx}`} 
                  task={task}
                  onMarkDone={onMarkDone}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </>
        )}
        
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