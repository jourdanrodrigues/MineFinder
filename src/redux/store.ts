import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from '@/redux/boardSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
  },
});
