import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { TaskAlt } from '@mui/icons-material';

export const ModalButton = ({
  onOpen
}) => {

  const actions = [
    { id: 'add-task', icon: <TaskAlt  />, name: "Add task" },
  ];

  const handleClick = (id) => {
    onOpen();
  }

  return (
    <>
      <SpeedDial
        ariaLabel="Add task"
        sx={{ 
          position: "absolute", 
          bottom: 16, 
          right: 16 
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClick(action.id)}
          />
        ))}
      </SpeedDial>
    </>
  )
}

export default ModalButton;