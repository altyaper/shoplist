import { Container } from "@mui/material";
import { Task } from "./Task";
import styled from 'styled-components';
import { TitleModal } from '../TaskDialog/TaskDialog';

const TasksWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Empty = styled.div`
  text-align: center;
  color: #31343E;
  background-color: #E3E4E8;
  padding: 2em;
  font-size: 1.4em;
  border-radius: 15px;
  font-weight: bold;
`;

const Tasks = props => {
  const { tasks } = props;
  return (
    <Container>
      <TitleModal>
        Tasks
      </TitleModal>
      <TasksWrapper className="list">
        { tasks && tasks.map((task, idx) => (
          <Task key={idx} {...props} task={task} />
        ))}
        {!tasks.length && (
          <Empty>NO TASKS YET</Empty>
        )}
      </TasksWrapper>
    </Container>
  )
}

export default Tasks;