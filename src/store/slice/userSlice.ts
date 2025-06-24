import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TokenProp {
    accessToken: string;
    refreshToken: string;
}
interface ProfileProp {
    id: string; //원래는 number였으나, 서버에서 내려주는 값이 string으로 변경되어 수정
    nickname: string;
    email?: string; // 이메일은 선택 사항으로 변경
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
        setProfileName: (state, action) => {
            if (state.profile) {
                state.profile.nickname = action.payload;
            }
        },
        setProfileEmail: (state, action) => {
            if (state.profile) {
                state.profile.email = action.payload;
            }
        },

    },
});

export const {setUser, clearUser, setProfileName, setProfileEmail} = userSlice.actions;
export default userSlice.reducer;
