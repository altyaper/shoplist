import { Dialog, DialogContent, Switch, Container, Grid } from '@mui/material';
import { Button } from '@mui/material';
import { TUTextField, TUButton } from '../MUITheme';
import { styled as MUIStyled } from '@mui/material/styles';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ArrowBack } from '@mui/icons-material';
import { TaskSwitch } from './TaskSwitch';

const newTaskSchema = Yup.object().shape({
  task: Yup.string()
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

export const FooterWrapper = styled.div`
  position: absolute;
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

export const TitleModal = styled.h2`
  font-size: 3em;
  font-weight: bold;
  line-height: 1.2em;
  margin-top: 1.4em;
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
`

export const TaskDialog = ({
  open,
  onSubmit,
  onCloseModal
}) => {
  return (
    <DialogWrapper
      fullScreen
      fullWidth
      open={open}>
      <DialogContentWrapper>
        <Container>
          <Formik
            initialValues={{ task: '' }}
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
                  <TitleModal>
                    <div>Create</div>
                    <div>New Task</div>
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
                    label="Task"
                    name="task"
                    multiline
                    value={values.task}
                    onChange={handleChange}
                  />
                  <TaskSwitch
                    label='Delete on complete'
                    name='deleteOnComplete'
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