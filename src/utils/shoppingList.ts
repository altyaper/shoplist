import { Task } from '../models';

type ListItem = Pick<Task, 'text' | 'done'>;

export const formatShoppingList = (tasks: ListItem[]): string => {
  const pendingTasks = tasks.filter((task) => !task.done);

  if (pendingTasks.length === 0) {
    return '';
  }

  const items = pendingTasks
    .map((task, index) => `${index + 1}. ${task.text}`)
    .join('\n');

  return items;
};
