import { useEffect, useState } from "react"

const useSession = (task) => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const currentTasks = JSON.parse(window.localStorage.getItem('tasks'));
    setTasks(currentTasks);
  }, []);

  const updateLocalStorage = (sessionTasks) => {
    window.localStorage.setItem("tasks", JSON.stringify(sessionTasks));
  }

  const onAdd = (text) => {
    const newTasks = [...tasks, { idx: tasks.length, done: false, text }];
    setTasks(newTasks);
    updateLocalStorage(newTasks);
  }


  const onDelete = (idx) => {
    const newTasks = tasks.filter(ch => {
      if (idx === ch.idx) return false;
      return true;
    });
    setTasks(newTasks);
    updateLocalStorage(newTasks);
  }

  const onDone = (idx) => {
    const newTasks = tasks.map(ch => {
      if (idx === ch.idx) {
        ch.done = !ch.done;
      }
      return ch;
    });
    setTasks(newTasks);
    updateLocalStorage(newTasks);
  }

  return [
    tasks,
    onAdd,
    onDelete,
    onDone,
  ];

}

export default useSession;