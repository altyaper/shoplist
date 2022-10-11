import dayjs from 'dayjs'
import { useEffect, useState } from "react"

const useSession = () => {

  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const currentTasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
    setTasks(currentTasks);
  }, []);

  const updateTasks = (newTasks) => {
    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  }

  // const findTask = (idx) => {
  //   return tasks.find((task) => idx === task.idx);
  // }

  const onAdd = ({
    text,
    deleteOnComplete,
  }) => {
    const newTasks = [
      {
        idx: tasks.length,
        done: false,
        text,
        deleteOnComplete,
        createdAt: dayjs().format(),
        updatedAt: dayjs().format()
      }, ...tasks];
    updateTasks(newTasks);
  }

  const onDelete = (idx) => {
    return tasks.filter(ch => {
      if (idx === ch.idx) return false;
      return true;
    });
  }

  const onDeleteAll = () => {
    window.localStorage.removeItem('tasks');
    setTasks([]);
  }

  const markAsDone = (idx) => {
    return tasks.map(task => {
      if (idx === task.idx) {
        task.done = !task.done;
      }
      return task;
    });
  }

  const onDone = (task) => {
    let newTasks = [];
    if (task.deleteOnComplete) {
      newTasks = onDelete(task.idx);
    } else {
      newTasks = markAsDone(task.idx);
    }
    updateTasks(newTasks);
  }

  return {
    tasks,
    onAdd,
    onDelete,
    onDone,
    onDeleteAll,
  };

}

export default useSession;