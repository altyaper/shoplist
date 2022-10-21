import { configureStore, ThunkDispatch, Action } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import tasksSlice from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;

export const useDispatch = (): AppDispatch => useReduxDispatch<typeof store.dispatch>();