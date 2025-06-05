import { configureStore } from '@reduxjs/toolkit';
import likedReducer from './slice/likedSlice';
import userReducer from './slice/userSlice';
import likedCenterReducer from './slice/likedCenterSlice';

export const store = configureStore({
  reducer: {
    liked: likedReducer,
    user: userReducer,
    likedCenter: likedCenterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;