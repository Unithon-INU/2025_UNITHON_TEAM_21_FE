import { ChildrenCenterList } from '@/types/ChildrenCenter';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface LikedCenterState {
  likedList: ChildrenCenterList[];
}

const initialState: LikedCenterState = {
  likedList: [],
};

const likedCenterSlice = createSlice({
  name: 'likedCenter',
  initialState,
  reducers: {
    toggleCenterLike(state, action: PayloadAction<ChildrenCenterList>) {
      const exists = state.likedList.some(item => item.centerName === action.payload.centerName);
      if (exists) {
        state.likedList = state.likedList.filter(item => item.centerName !== action.payload.centerName);
      } else {
        state.likedList.push(action.payload);
      }
    },
  },
});

export const { toggleCenterLike } = likedCenterSlice.actions;
export default likedCenterSlice.reducer;
