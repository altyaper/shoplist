import { useState } from 'react';
import { Container, Typography, Stack, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";
import { Task } from "./Task";
import { Task as TaskModel } from '../../models';
import { palette } from '../../themes/colors';
import { PopularItems } from '../PopularItems';

const GroupWrapper = styled.div`
  margin-bottom: 0.5em;
`

const TasksWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding-bottom: 100px;
`;

const Empty = styled.div`
  text-align: center;
  color: ${palette['charcoal']};
  padding: 2em;
  font-size: 1.2em;
  border-radius: 15px;
`;

interface TasksProps {
  tasks: TaskModel[],
  onMarkDone: (task: TaskModel) => void;
  onEdit: (task: TaskModel) => void;
  onDelete: (task: TaskModel) => void;
}

const Tasks = ({ tasks, onMarkDone, onEdit, onDelete }: TasksProps) => {
  const { t } = useTranslation();
  const completeTasks = tasks.filter(task => task.done);
  const incompleteTasks = tasks.filter(task => !task.done);

  const [completedSectionCollapsed, setCompletedSectionCollapsed] = useState<boolean>(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategoryCollapse = (category: string) => {
    setCollapsedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const groupedTasks = incompleteTasks.reduce((acc, task) => {
    const category = task.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(task);
    return acc;
  }, {} as Record<string, TaskModel[]>);

  const completedSectionId = 'completed-section';

  return (
    <div>
      <TasksWrapper className="list">
        {Object.keys(groupedTasks).sort().map(category => (
          <GroupWrapper key={category}>
            <Container style={{ backgroundColor: palette['gray-2'] }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant='h6' style={{ color: palette['charcoal'], fontSize: '0.8em' }}>
                  {category} ({groupedTasks[category].length})
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => toggleCategoryCollapse(category)}
                  style={{ color: palette['purpure-1'], marginLeft: 'auto' }}
                  aria-label={collapsedCategories[category] ? `Expand ${category} section` : `Collapse ${category} section`}
                  aria-expanded={!collapsedCategories[category]}
                  title={collapsedCategories[category] ? `Expand ${category} section` : `Collapse ${category} section`}
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {collapsedCategories[category] ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
              </Stack>
            </Container>
            <Container disableGutters>
              {!collapsedCategories[category] && groupedTasks[category].map((task) => (
                <Task
                  key={`incomplete-${task.idx}`}
                  task={task}
                  onMarkDone={onMarkDone}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </Container>
          </GroupWrapper>
        ))}

        {/* Completed Tasks */}
        {completeTasks.length > 0 && (
          <GroupWrapper>
            <Container style={{ backgroundColor: palette['gray-2'] }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant='h6' style={{ color: palette['purpure-1'], fontSize: '0.8em' }}>
                  Completed ({completeTasks.length})
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setCompletedSectionCollapsed(!completedSectionCollapsed)}
                  style={{ color: palette['purpure-1'], marginLeft: 'auto' }}
                  aria-label={completedSectionCollapsed ? 'Expand completed section' : 'Collapse completed section'}
                  aria-controls={completedSectionId}
                  aria-expanded={!completedSectionCollapsed}
                  title={completedSectionCollapsed ? 'Expand completed section' : 'Collapse completed section'}
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent", // disables the hover background
                    },
                  }}
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
                {!completedSectionCollapsed && completeTasks.map((task) => (
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
          </GroupWrapper>
        )}
        {!tasks.length && (
          <Container>
            <Empty>
              <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                {t('empty_tasks')}
              </Typography>
              <p>{t('empty_tasks_two')}</p>
            </Empty>
          </Container>
        )}
        <PopularItems />
      </TasksWrapper>
    </div>
  )
}

export default Tasks;