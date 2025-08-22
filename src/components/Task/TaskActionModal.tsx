import React, { useState } from 'react';
import { 
  Dialog, 
  IconButton, 
  Button, 
  TextField, 
  Box,
  Typography,
  Slide
} from '@mui/material';
import { Close, Edit, Delete, Save } from '@mui/icons-material';
import styled from 'styled-components';
import { TransitionProps } from '@mui/material/transitions';
import { Task } from '../../models';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<HTMLElement>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MobileModalWrapper = styled(Dialog)`
  .MuiDialog-paper {
    margin: 0;
    border-radius: 20px 20px 0 0;
    max-height: 80vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const ActionButton = styled(Button)`
  width: 100%;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 12px;
  text-transform: none;
  font-size: 16px;
  font-weight: 500;
`;

const EditSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
`;

interface TaskActionModalProps {
  open: boolean;
  onClose: () => void;
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export const TaskActionModal = ({
  open,
  onClose,
  task,
  onEdit,
  onDelete
}: TaskActionModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit({
        ...task,
        text: editText.trim()
      });
    }
    setIsEditing(false);
    onClose();
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task);
    onClose();
  };

  const handleClose = () => {
    if (isEditing) {
      handleCancel();
    }
    onClose();
  };

  return (
    <MobileModalWrapper
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
    >
      <ModalHeader>
        <Typography variant="h6" component="div">
          Task Actions
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <Close />
        </IconButton>
      </ModalHeader>
      
      <ModalContent>
        {!isEditing ? (
          <>
            <ActionButton
              variant="outlined"
              startIcon={<Edit />}
              onClick={handleEditClick}
              color="primary"
            >
              Edit Task
            </ActionButton>
            
            <ActionButton
              variant="outlined"
              startIcon={<Delete />}
              onClick={handleDelete}
              color="error"
            >
              Delete Task
            </ActionButton>
          </>
        ) : (
          <EditSection>
            <Typography variant="subtitle1" gutterBottom>
              Edit Task
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              variant="outlined"
              placeholder="Enter task text..."
              sx={{ marginBottom: 2 }}
            />
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                fullWidth
                disabled={!editText.trim() || editText === task.text}
              >
                Save
              </Button>
            </Box>
          </EditSection>
        )}
      </ModalContent>
    </MobileModalWrapper>
  );
};
