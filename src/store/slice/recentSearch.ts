import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type RecentState = {
    keywords: string[];
};

const initialState: RecentState = {
    keywords: [],
};

const recentSlice = createSlice({
    name: 'recent',
    initialState,
    reducers: {
        addKeyword(state, action: PayloadAction<string>) {
            if (!state.keywords.includes(action.payload)) {
                state.keywords.unshift(action.payload);
            }
        },
        removeKeyword(state, action: PayloadAction<string>) {
            state.keywords = state.keywords.filter(keyword => keyword !== action.payload);
        },
        clearKeywords(state) {
            state.keywords = [];
        },
    },
});

export const {addKeyword, removeKeyword, clearKeywords} = recentSlice.actions;
export default recentSlice.reducer;
