import { createSlice } from '@reduxjs/toolkit';
import LocalStorageDB from 'local-storage-db';
const db = new LocalStorageDB('todo');

const initialState = {
  tasks: db.get('tasks') || [],
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { payload } = action;
      const current = db.get('tasks');
      if (typeof current === "object") {
        db.create('tasks', payload);
      } else {
        db.create('tasks', [payload]);
      }
      state.tasks.push(payload);
    },
    deleteAll: (state) => {
      db.remove('tasks');
      state.tasks = [];
    },
    markAsDone: (state, action) => {
      const task = action.payload;
      if (task.deleteOnComplete) {
        state.tasks = state.tasks.filter(t => {
          return t.idx !== task.idx;
        });
      } else {
        state.tasks = state.tasks.map(t => {
          if (t.idx === task.idx) {
            t.done = !t.done;
          }
          return t;
        });
      }
      db.update(state.tasks, 'tasks');
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTask, deleteAll, markAsDone } = tasksSlice.actions;

export default tasksSlice.reducer