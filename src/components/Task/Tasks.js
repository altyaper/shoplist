import { Task } from "./Task";
import styled from 'styled-components';

const TasksWrapper = styled.ul`
  list-style: none;
  padding: 1.2em;
  position: absolute;
  width: 100%;
  margin: 0;
  left: 0;
  height: 100%;
  overflow: scroll;
  padding-bottom: 10em;
`

const Tasks = props => {
  const { tasks } = props;
  return (
    <TasksWrapper className="list">
      { tasks && tasks.map((task, idx) => (
        <Task key={idx} {...props} task={task} />
      ))}
    </TasksWrapper>
  )
}

export default Tasks;