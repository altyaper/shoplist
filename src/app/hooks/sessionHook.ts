import dayjs from 'dayjs'
import { useDispatch, useSelector } from '../store';
import { addTask, deleteAll, markAsDone, removeTask, updateTask } from "../slices/taskSlice.js";
import { getTasksSelector } from '../selectors/tasksSelectors';
import { Task } from '../../models';

const useSession = () => {
  const tasks = useSelector(getTasksSelector);
  const dispatch = useDispatch();

  const onAdd = ({
    text,
    deleteOnComplete,
  }: Task) => {
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

  const onUpdate = (task: Task) => {
    const updatedTask = {
      ...task,
      updatedAt: dayjs().format()
    };
    dispatch(updateTask(updatedTask));
  }

  const onDeleteAll = () => {
    dispatch(deleteAll())
  }
  
  const onDone = (task: Task) => {
    dispatch(markAsDone(task));
  }

  const onDelete = (task: Task) => {
    dispatch(removeTask(task));
  }

  return {
    tasks,
    onAdd,
    onUpdate,
    onDone,
    onDelete,
    onDeleteAll,
  };

}

export default useSession;