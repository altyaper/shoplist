import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteAll, markAsDone, removeTask } from "../app/taskSlice";

const useSession = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const onAdd = ({
    text,
    deleteOnComplete,
  }) => {
    const newTask = {
      idx: tasks.length,
      done: false,
      text,
      deleteOnComplete,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format()
    };
    dispatch(addTask(newTask));
  }

  const onDeleteAll = () => {
    dispatch(deleteAll())
  }
  
  const onDone = (task) => {
    dispatch(markAsDone(task));
  }

  const onDelete = (task) => {
    dispatch(removeTask(task));
  }

  return {
    tasks,
    onAdd,
    onDone,
    onDelete,
    onDeleteAll,
  };

}

export default useSession;