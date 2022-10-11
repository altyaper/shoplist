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

  const onAdd = (text) => {
    const newTasks = [
      {
        idx: tasks.length,
        done: false,
        text,
        createdAt: dayjs().format(),
        updatedAt: dayjs().format()
      }, ...tasks];
    updateTasks(newTasks);
  }

  const onDelete = (idx) => {
    const newTasks = tasks.filter(ch => {
      if (idx === ch.idx) return false;
      return true;
    });
    updateTasks(newTasks);
  }

  const onDeleteAll = () => {
    window.localStorage.removeItem('tasks');
  }

  const onDone = (idx) => {
    const newTasks = tasks.map(ch => {
      if (idx === ch.idx) {
        ch.done = !ch.done;
      }
      return ch;
    });
    updateTasks(newTasks);
  }

  return [
    tasks,
    onAdd,
    onDelete,
    onDone,
    onDeleteAll,
  ];

}

export default useSession;