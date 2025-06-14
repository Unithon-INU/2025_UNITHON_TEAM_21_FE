import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface VolunteerItem {
    progrmRegistNo: number;
    [key: string]: any;
}

interface LikedState {
    likedList: VolunteerItem[];
}

const initialState: LikedState = {
    likedList: [],
};

const likedSlice = createSlice({
    name: 'liked',
    initialState,
    reducers: {
        toggleLike(state, action: PayloadAction<VolunteerItem>) {
            const exists = state.likedList.some(item => item.progrmRegistNo === action.payload.progrmRegistNo);
            state.likedList = exists
                ? state.likedList.filter(item => item.progrmRegistNo !== action.payload.progrmRegistNo)
                : [...state.likedList, action.payload];
        },
    },
});

export const {toggleLike} = likedSlice.actions;
export default likedSlice.reducer;
