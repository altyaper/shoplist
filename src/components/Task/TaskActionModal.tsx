import React, { useEffect, useState } from 'react';
import {
  Dialog,
  IconButton,
  Button,
  TextField,
  Box,
  Typography,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Close, Save, DeleteOutline, EditOutlined, CheckOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import { TransitionProps } from '@mui/material/transitions';
import { Task } from '../../models';
import { useTranslation } from 'react-i18next';

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

const SaveButton = styled(Button)`
  && {
    background: none;
    border: none;
    box-shadow: none;
    color: #A362EA;
    padding: 8px 16px;
    min-width: auto;
    text-transform: none;
    font-size: 14px;
    font-weight: bold;
  }
`;

const DeleteButton = styled(Button)`
  && {
    background: none;
    border: none;
    box-shadow: none;
    color: #A362EA;
    padding: 8px 16px;
    min-width: auto;
    text-transform: none;
    font-size: 14px;
    font-weight: boldS;
    margin-right: auto;
  }
`;

const ActionButtonsContainer = styled(Box)`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  justify-content: flex-start;
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isEditing, setIsEditing] = useState(isMobile);
  const [editText, setEditText] = useState(task.text);
  const { t } = useTranslation();

  // Reset edit state when modal opens/closes or task changes
  useEffect(() => {
    if (open) {
      setIsEditing(isMobile);
      setEditText(task.text);
    }
  }, [open, task.text, isMobile]);

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
    // Always close the modal after saving
    onClose();
  };

  const handleCancel = () => {
    setEditText(task.text);
    // Always close the modal after canceling
    onClose();
  };

  const handleDelete = () => {
    onDelete(task);
    onClose();
  };

  const handleClose = () => {
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
          {isMobile ? 'Edit Task' : 'Task Actions'}
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
        {isMobile ? (
          // Mobile: Show TextField immediately
          <>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              variant="outlined"
              placeholder="Enter task text..."
              autoFocus
            />
            <ActionButtonsContainer>
              <DeleteButton
                onClick={handleDelete}
                startIcon={<DeleteOutline />}
              >
                {t('delete')}
              </DeleteButton>
              <SaveButton
                onClick={handleSave}
                startIcon={<CheckOutlined />}
                disabled={!editText.trim() || editText === task.text}
              >
                {t('save')}
              </SaveButton>
            </ActionButtonsContainer>
          </>
        ) : (
          // Desktop: Show action buttons first
          <>
            {!isEditing ? (
              <>
                <ActionButton
                  variant="outlined"
                  startIcon={<DeleteOutline />}
                  onClick={handleDelete}
                  color="error"
                >
                  {t('delete_item')}
                </ActionButton>
                <ActionButton
                  variant="outlined"
                  startIcon={<EditOutlined />}
                  onClick={handleEditClick}
                  color="primary"
                >
                  {t('edit_item')}
                </ActionButton>

              </>
            ) : (
              <EditSection>
                <Typography variant="subtitle1" gutterBottom>
                  {t('edit_item')}
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
                    {t('cancel')}
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    fullWidth
                    disabled={!editText.trim() || editText === task.text}
                  >
                    {t('save')}
                  </Button>
                </Box>
              </EditSection>
            )}
          </>
        )}
      </ModalContent>
    </MobileModalWrapper>
  );
};
