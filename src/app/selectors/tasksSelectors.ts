import { createSelector } from '@reduxjs/toolkit';
import { Task } from '../../models';
import { RootState } from '../store';

export const getTasksSelector = createSelector([
  (state: RootState) => state.tasks.tasksList
], (tasks) => {
  const sortedTasks = [...tasks].sort((a: Task, b: Task) => {
    return (a.done === b.done)? 0 : a.done? -1 : 1;
  });
  return sortedTasks;
});