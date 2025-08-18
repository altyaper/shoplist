import React, { useRef, useState } from 'react';
import { Container, Typography, Button, Stack, Chip, Menu, MenuItem, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadFileIcon from '@mui/icons-material/UploadFile';
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

const SnapButton = styled(Button)`
  font-weight: 700;
  font-size: 1rem;
  padding: 12px 16px;
  border-radius: 12px;
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
  const [detectedItems, setDetectedItems] = useState<string[]>([]);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [completedSectionCollapsed, setCompletedSectionCollapsed] = useState<boolean>(false);
  const isMenuOpen = Boolean(menuAnchorEl);
  
  
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

  const handleOpenCamera = () => {
    cameraInputRef.current?.click();
  };

  const handleOpenGallery = () => {
    galleryInputRef.current?.click();
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('http://localhost:9000', {
        method: 'POST',
        body: formData,
      });
      const json = await response.json();
      const items = Array.isArray(json) ? json : (Array.isArray(json?.items) ? json.items : []);
      setDetectedItems(items.map((it: any) => String(it)));
    } catch (err) {
      setDetectedItems([]);
    } finally {
      event.target.value = '';
    }
  };

  return (
    <Container>
      <TopWrapper>
       
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {/* <Stack direction="row" spacing={1} alignItems="center">
          <SnapButton
            variant="contained"
            size="large"
            onClick={handleOpenMenu}
            endIcon={<ExpandMoreIcon />}
            aria-controls={isMenuOpen ? 'snap-add-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? 'true' : undefined}
          >
            Snap & Add
          </SnapButton>
          <Menu
            id="snap-add-menu"
            anchorEl={menuAnchorEl}
            open={isMenuOpen}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => { handleCloseMenu(); handleOpenCamera(); }}>
              <CameraAltIcon fontSize="small" style={{ marginRight: 8 }} /> Camera
            </MenuItem>
            <MenuItem onClick={() => { handleCloseMenu(); handleOpenGallery(); }}>
              <UploadFileIcon fontSize="small" style={{ marginRight: 8 }} /> Upload
            </MenuItem>
          </Menu>
          {detectedItems.length > 0 && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              {detectedItems.map((item, idx) => (
                <Chip key={idx} size="small" label={item} />
              ))}
            </Stack>
          )}
        </Stack> */}
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
            {tasks.filter(task => !task.done).map((task, idx) => (
              <Task key={`incomplete-${idx}`} {...props} task={task} />
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
              >
                {completedSectionCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            </Stack>
            {!completedSectionCollapsed && tasks.filter(task => task.done).map((task, idx) => (
              <Task key={`complete-${idx}`} {...props} task={task} />
            ))}
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