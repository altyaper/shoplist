import { useState } from 'react';
import { Container, Typography, Stack, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
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
  const [pendingSectionCollapsed, setPendingSectionCollapsed] = useState<boolean>(false);

  const completedSectionId = 'completed-section';
  const pendingSectionId = 'pending-section';

  return (
    <div>
      <TasksWrapper className="list">
        {/* Incomplete Tasks */}
        {incomplete > 0 && (
          <>
            <Container style={{backgroundColor: palette['gray-3']}}>
              <Stack direction="row" alignItems="center" spacing={1} style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                <Typography variant='h6' style={{ color: palette['charcoal'], fontSize: '1em' }}>
                  {t("tasks_title")} ({incomplete})
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setPendingSectionCollapsed(!pendingSectionCollapsed)}
                  style={{ color: palette['purpure-1'], marginLeft: 'auto' }}
                  aria-label={pendingSectionCollapsed ? 'Expand pending section' : 'Collapse pending section'}
                  aria-controls={pendingSectionId}
                  aria-expanded={!pendingSectionCollapsed}
                  title={pendingSectionCollapsed ? 'Expand pending section' : 'Collapse pending section'}
                >
                  {pendingSectionCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
              </Stack>
            </Container>
            <Container disableGutters>
            {!pendingSectionCollapsed && tasks.filter(task => !task.done).map((task) => (
              <Task 
              key={`incomplete-${task.idx}`} 
              task={task}
              onMarkDone={onMarkDone}
              onEdit={onEdit}
              onDelete={onDelete}
              />
            ))}
            </Container>
          </>
        )}
        
        {/* Completed Tasks */}
        {complete > 0 && (
          <>
            <Container style={{backgroundColor: palette['gray-3']}}>
              <Stack direction="row" alignItems="center" spacing={1} style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                <Typography variant='h6' style={{ color: palette['purpure-1'], fontSize: '1em' }}>
                  Completed ({complete})
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setCompletedSectionCollapsed(!completedSectionCollapsed)}
                  style={{ color: palette['purpure-1'], marginLeft: 'auto' }}
                  aria-label={completedSectionCollapsed ? 'Expand completed section' : 'Collapse completed section'}
                  aria-controls={completedSectionId}
                  aria-expanded={!completedSectionCollapsed}
                  title={completedSectionCollapsed ? 'Expand completed section' : 'Collapse completed section'}
                >
                  {completedSectionCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
              </Stack>
            </Container>
            <Container disableGutters>
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
            </Container>
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
    </div>
  )
}

export default Tasks;