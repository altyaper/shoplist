import dayjs from "dayjs";
import { useDispatch, useSelector } from "../store";
import {
  addTask,
  addTasks,
  deleteAll,
  markAsDone,
  removeTask,
  updateTask,
} from "../slices/taskSlice.js";
import { getTasksSelector } from "../selectors/tasksSelectors";
import { Task } from "../../models";
import {
  AnalyzedShoppingItem,
  createImportedTasks,
} from "../../features/photoImport/photoImport";

const useSession = () => {
  const tasks = useSelector(getTasksSelector);
  const dispatch = useDispatch();

  const onAdd = ({ text, deleteOnComplete, category }: Task) => {
    const newTask = {
      idx: tasks.length,
      done: false,
      text,
      deleteOnComplete,
      category,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
    };
    dispatch(addTask(newTask));
  };

  const onAddMany = (items: AnalyzedShoppingItem[]) => {
    const importedTasks = createImportedTasks(items, tasks, dayjs().format());
    dispatch(addTasks(importedTasks));
  };

  const onUpdate = (task: Task) => {
    const updatedTask = {
      ...task,
      updatedAt: dayjs().format(),
    };
    dispatch(updateTask(updatedTask));
  };

  const onDeleteAll = () => {
    dispatch(deleteAll());
  };

  const onDone = (task: Task) => {
    dispatch(markAsDone(task));
  };

  const onDelete = (task: Task) => {
    dispatch(removeTask(task));
  };

  return {
    tasks,
    onAdd,
    onAddMany,
    onUpdate,
    onDone,
    onDelete,
    onDeleteAll,
  };
};

export default useSession;
