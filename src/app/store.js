import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './taskSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksSlice
  },
});