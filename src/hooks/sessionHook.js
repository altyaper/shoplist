import { useEffect, useState } from "react"

const useSession = (task) => {

  const [tasks, setTasks] = useState(JSON.parse(window.localStorage.getItem('tasks')) || []);

  useEffect(() => {
    console.log(tasks);
  });


  return tasks;

}