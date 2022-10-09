import { useState } from 'react';
import Tasks from '../Task/Tasks';
import TaskDialog, { ColorButton, FooterWrapper } from '../TaskDialog/TaskDialog';
import { ModalButton } from '../ModalButton';
import styled from 'styled-components';

const MainFooterWrapper = styled(FooterWrapper)`
`;

const PurpleButton = styled(ColorButton)`
  background-color: red;
`;


const App = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState('');
  const [titleValue, setTitleValue] = useState(JSON.parse(window.localStorage.getItem('header_title')) || 'Retos de hoy');
  const [tasks, setTasks] = useState(JSON.parse(window.localStorage.getItem('tasks')) || []);
  
  const handleTitleValue = event => {
    const newTitleValue = event.target.value;
    setTitleValue(newTitleValue);
    window.localStorage.setItem("header_title", JSON.stringify(newTitleValue));
  }
  
  const handleOnSubmit = ({ task }) => {
    const newTasks = [...tasks, { idx: tasks.length, done: false, text: task }];
    setTasks(newTasks);
    updateLocalStorage(newTasks);
  }

  const updateLocalStorage = (sessionTasks) => {
    window.localStorage.setItem("tasks", JSON.stringify(sessionTasks));
  }
  
  const handleRemoveTask = idx => {
    const newTasks = tasks.filter(ch => {
      if (idx === ch.idx) return false;
      return true;
    });
    setTasks(newTasks);
    updateLocalStorage(newTasks);
  }
  
  const handleMarkDone = idx => {
    const newTasks = tasks.map(ch => {
      if (idx === ch.idx) {
        ch.done = !ch.done;
      }
      return ch;
    });
    setTasks(newTasks);
    updateLocalStorage(newTasks);
  }


  const handleCloseModal = () => {
    setOpenDialog(false);
  }

  const handleOpenModal = () => {
    setOpenDialog(true);
  }
  
  return (
    <>
      <TaskDialog
        onSubmit={handleOnSubmit}
        open={openDialog}
        onCloseModal={handleCloseModal}
      />
      <Tasks
        onRemove={handleRemoveTask}
        onMarkDone={handleMarkDone}
        tasks={tasks} />
      <MainFooterWrapper>
        <PurpleButton
          size='large'
          disableElevation
          type="submit"
          onClick={handleOpenModal}
        >
          ADD NEW TASK
        </PurpleButton>
      </MainFooterWrapper>
    </>
  );
}

export default App;
