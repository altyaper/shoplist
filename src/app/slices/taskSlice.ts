import { createSlice } from '@reduxjs/toolkit';
import LocalStorageDB from 'local-storage-db';
const db = new LocalStorageDB('todo');

const initialState = {
  tasksList: db.get('tasks') || [],
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
      state.tasksList.push(payload);
    },
    updateTask: (state, action) => {
      const { payload } = action;
      state.tasksList = state.tasksList.map((t: { idx: any; }) => {
        if (t.idx === payload.idx) {
          return { ...t, ...payload };
        }
        return t;
      });
      db.update(state.tasksList, 'tasks');
    },
    deleteAll: (state) => {
      db.remove('tasks');
      state.tasksList = [];
    },
    markAsDone: (state, action) => {
      const task = action.payload;
      state.tasksList = state.tasksList.map((t: { idx: any; done: boolean; }) => {
        if (t.idx === task.idx) {
          t.done = !t.done;
        }
        return t;
      });
      db.update(state.tasksList, 'tasks');
    },
    removeTask: (state, action) => {
      const task = action.payload;
      state.tasksList = state.tasksList.filter((t: { idx: any; }) => {
        return t.idx !== task.idx;
      });
      db.update(state.tasksList, 'tasks');
    }
  },
});

// Action creators are generated for each case reducer function
export const { addTask, updateTask, deleteAll, markAsDone, removeTask } = tasksSlice.actions;

export default tasksSlice.reducer