import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface TokenProp {
    accessToken: string;
    refreshToken: string;
}
interface ProfileProp {
    id: number;
    nickname: string;
    email: string;
}

type UserState = {
    token: TokenProp | null;
    profile: ProfileProp | null;
};

const initialState: UserState = {
    token: null,
    profile: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{token: TokenProp; profile: ProfileProp}>) {
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
