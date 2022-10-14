import React from 'react';
import { Dialog, DialogContent, Container } from '@mui/material';
import { Button } from '@mui/material';
import { TUTextField, TUButton } from '../MUITheme';
import { styled as MUIStyled } from '@mui/material/styles';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ArrowBack } from '@mui/icons-material';
import { TaskSwitch } from './TaskSwitch';
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

export const ColorButton = MUIStyled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: '#23242A',
  textAlign: 'center',
  width: '100%',
  borderRadius: '10px',
  fontSize: '1.2em',
  '&:hover': {
    backgroundColor: '#23242A'
  },
  ':disabled': {
    backgroundColor: '#E3E4E8'
  }
}));

interface TitleProps {
  marginTop?: boolean;
}

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

export const TitleModal = styled.h2<TitleProps>`
  font-size: 3em;
  font-weight: bold;
  line-height: 1.2em;
  margin-top: ${({ marginTop }) => marginTop ? '1.4em' : '0em'};
  margin-bottom: ${({ marginTop }) => marginTop ? '1.4em' : '0em'};;
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
  onSubmit: (task: Task) => void;
  onCloseModal: () => void;
}

export const TaskDialog = ({
  open,
  onSubmit,
  onCloseModal
}: TaskDialogProps) => {
  const { t } = useTranslation();
  return (
    <DialogWrapper
      fullScreen
      fullWidth
      open={open}>
      <DialogContentWrapper>
        <Container>
          <Formik
            initialValues={{
              idx: 0,
              text: '',
              createdAt: '',
              done: false,
              deleteOnComplete: true
            }}
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
            return (
              <form onSubmit={handleSubmit}>
                <HeaderModal>
                  <TitleModal marginTop>
                    {t('create_task_title')}
                  </TitleModal>
                  <CloseSection>
                    <TUButton size="large" onClick={onCloseModal}>
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
                  />
                  <TaskSwitch
                    label={t('delete_on_complete_label')}
                    name='deleteOnComplete'
                    value={values.deleteOnComplete}
                    onChange={handleChange}
                  />
                </ContentModal>
                <FooterWrapper>
                  <ColorButton
                    size='large'
                    disableElevation
                    type="submit"
                    disabled={isSubmitting}
                  >
                    CREATE TASK
                  </ColorButton>
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