import { Button, Dialog, DialogContent, Container, Typography } from '@mui/material';
import { TUTextField, TUButton } from '../MUITheme';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Task } from '../../models';


const newTaskSchema = Yup.object().shape({
  text: Yup.string()
    .max(50, 'Too long!')
    .required('Required')
});

const DialogWrapper = styled(Dialog)`
  .MuiDialog-container {
    background: #F6F6F6;
    position: relative;
  }
`;

export const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 1.2em;
`;

const HeaderModal = styled.div`
  width: 100%;
`;

const ContentModal = styled.div`
  display: block;
`;

const TitleModal = styled(Typography)`
  padding-top: 1.4em;
  padding-bottom: 1.4em;
`;

const CloseSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.2em;
  padding-left: 0;
`;

const DialogContentWrapper = styled(DialogContent)`
  padding: 1.2em;
`;

interface TaskDialogProps {
  open: boolean;
  task?: Task | null;
  onSubmit: (task: Task) => void;
  onCloseModal: () => void;
}

export const TaskDialog = ({
  open,
  task,
  onSubmit,
  onCloseModal
}: TaskDialogProps) => {
  const { t } = useTranslation();
  const isEditing = !!task;
  
  const initialValues = task ? {
    idx: task.idx,
    text: task.text,
    createdAt: task.createdAt,
    done: task.done,
    deleteOnComplete: task.deleteOnComplete
  } : {
    idx: 0,
    text: '',
    createdAt: '',
    done: false,
    deleteOnComplete: true
  };

  return (
    <DialogWrapper
      fullScreen
      fullWidth
      open={open}>
      <DialogContentWrapper>
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={newTaskSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                onSubmit(values);
                onCloseModal()
              }, 500);
            }}
          >{({
            values,
            errors,
            handleSubmit,
            handleChange,
            isSubmitting,
          }) => {
            const errorValues = Object.values(errors);
            const hasError = errorValues.length > 0;
            const firstError = (hasError && errorValues[0]) || null;

            const handleKeyDown = (event: React.KeyboardEvent) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                if (!hasError && values.text.trim()) {
                  handleSubmit();
                }
              }
            };

            return (
              <form onSubmit={handleSubmit}>
                <HeaderModal>
                  <TitleModal variant='h4'>
                    {isEditing ? t('edit_task_title') || 'Edit Task' : t('create_task_title')}
                  </TitleModal>
                  <CloseSection>
                    <TUButton size="small" onClick={onCloseModal}>
                      <ArrowBack />
                    </TUButton>
                  </CloseSection>
                </HeaderModal>
                <ContentModal>
                  <TUTextField
                    error={hasError}
                    helperText={firstError}
                    label={t('task_label')}
                    name="text"
                    multiline
                    value={values.text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                </ContentModal>
                <FooterWrapper>
                  <Container>
                    <Button
                      size='large'
                      disableElevation
                      variant='contained'
                      fullWidth
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isEditing ? (t('save_task') || 'Save') : t('create_task')}
                    </Button>

                  </Container>
                </FooterWrapper>
              </form>
            )
          }}
          </ Formik>
        </Container>
      </DialogContentWrapper>
    </DialogWrapper>
  )
}

export default TaskDialog;