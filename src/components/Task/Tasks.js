import { Task } from "./Task";
import styled from 'styled-components';

const TasksWrapper = styled.ul`
  list-style: none;
  padding: 0;
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