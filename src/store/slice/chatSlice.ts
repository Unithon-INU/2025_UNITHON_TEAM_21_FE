// store/slices/chatSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
type ChatRoom = {
    id: string;
    name: string;
    message: string;
    time: string; // ISO 문자열 또는 timestamp (정렬용)
    timeText: string; // "오전 3:21" 등 사용자에게 보이는 포맷 (표시용)
    unread: number;
};

interface ChatState {
    chatRooms: ChatRoom[];
}

const initialState: ChatState = {
    chatRooms: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatRooms: (state, action: PayloadAction<ChatRoom[]>) => {
      state.chatRooms = action.payload;
    },
    increaseUnreadCount: (state, action: PayloadAction<string>) => {
      const room = state.chatRooms.find(r => r.id === action.payload);
      if (room) room.unread += 1;
    },
    resetUnreadCount: (state, action: PayloadAction<string>) => {
      const room = state.chatRooms.find(r => r.id === action.payload);
      if (room) room.unread = 0;
    },
    updateLastMessage: (state, action: PayloadAction<{ id: string; message: string; time: string; timeText: string }>) => {
      const room = state.chatRooms.find(r => r.id === action.payload.id);
      if (room) {
        room.message = action.payload.message;
        room.time = action.payload.time;  // 시간 업데이트 정렬용 (ISO 문자열 또는 timestamp)
        // timeText가 payload에 명시되어 있으면 사용, 없으면 포맷팅해서 생성
        if (action.payload.timeText) {
          room.timeText = action.payload.timeText;
        } else {
          const time = new Date(action.payload.time);
          const hour = time.getHours();
          const minute = time.getMinutes().toString().padStart(2, '0');
          const isPM = hour >= 12;
          const hour12 = hour % 12 || 12;
          room.timeText = `${isPM ? '오후' : '오전'} ${hour12}:${minute}`;
        }
      }
    },
  },
});

export const {setChatRooms, increaseUnreadCount, resetUnreadCount, updateLastMessage} = chatSlice.actions;
export default chatSlice.reducer;
export type {ChatRoom};
