import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TokenProp {
    accessToken: string;
    refreshToken: string;
}
interface ProfileProp {
    id: number;
    nickname: string;
    userRole: 0 | 1;
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
            if (state.profile.userRole === null) {
                state.profile.userRole = 0;
            }
        },
        clearUser(state) {
            state.token = null;
            state.profile = null;
        },
        setProfileName: (state, action) => {
            if (state.profile) {
                state.profile.nickname = action.payload;
            }
        },
    },
});

export const {setUser, clearUser, setProfileName} = userSlice.actions;
export default userSlice.reducer;
