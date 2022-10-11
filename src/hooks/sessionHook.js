import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import LocalStorageDB from 'local-storage-db';

const useSession = () => {
  const db = new LocalStorageDB('todo');
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const currentTasksDB = db.get('tasks') || [];
    setTasks(currentTasksDB);
  }, []);

  const updateTasks = () => {
    const currentTasks = db.get('tasks');
    setTasks(currentTasks);
  }

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
    const current = db.get('tasks');
    if (typeof current === "object") {
      db.create('tasks', newTask);
    } else {
      db.create('tasks', [newTask]);
    }
    updateTasks();
  }

  const onDelete = (idx) => {
    return tasks.filter(ch => {
      if (idx === ch.idx) return false;
      return true;
    });
  }

  const onDeleteAll = () => {
    db.remove('tasks');
    updateTasks();
  }

  const onDone = (task) => {
    const idx = db.get('tasks').findIndex(t => t.idx === task.idx);
    if (task.deleteOnComplete) {
      db.remove('tasks', idx);
    } else {
      const updated = {...task, done: !task.done};
      db.update(updated, 'tasks', idx);
    }
    updateTasks();
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