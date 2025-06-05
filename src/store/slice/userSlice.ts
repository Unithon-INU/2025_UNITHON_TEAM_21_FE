import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {KakaoOAuthToken, KakaoProfile} from '@react-native-seoul/kakao-login';

type UserState = {
    token: KakaoOAuthToken | null;
    profile: KakaoProfile | null;
};

const initialState: UserState = {
    token: null,
    profile: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{token: KakaoOAuthToken; profile: KakaoProfile}>) {
            state.token = action.payload.token;
            state.profile = action.payload.profile;
        },
        clearUser(state) {
            state.token = null;
            state.profile = null;
        },
    },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
