import {configureStore} from '@reduxjs/toolkit';

import userReducer from './slice/userSlice';
import recentReducer from './slice/recentSearch';
import likedCenterReducer from './slice/likedCenterSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        search: recentReducer,
        likedCenter: likedCenterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
