import {configureStore} from '@reduxjs/toolkit';

import userReducer from './slice/userSlice';
import recentReducer from './slice/recentSearch';
import likedCenterReducer from './slice/likedCenterSlice';
import likedReducer from './slice/likedSlice';
import locationReducer from './slice/locationSlice';
import chatReducer from './slice/chatSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        search: recentReducer,
        likedCenter: likedCenterReducer,
        liked: likedReducer,
        location: locationReducer,
        chat: chatReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
