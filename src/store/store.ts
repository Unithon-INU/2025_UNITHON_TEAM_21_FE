import {configureStore} from '@reduxjs/toolkit';

import userReducer from './slice/userSlice';
import recentReducer from './slice/recentSearch';
import likedCenterReducer from './slice/likedCenterSlice';
import likedReducer from './slice/likedSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        search: recentReducer,
        likedCenter: likedCenterReducer,
        liked: likedReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
