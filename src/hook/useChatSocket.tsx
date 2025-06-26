// 파일명: useChatSocket.tsx

import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setProfileEmail } from '@/store/slice/userSlice';

export const WebSocketContext = createContext<Socket | null>(null);

export const useChatSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = user.token?.accessToken;
    if (!token) return;

    const newSocket = io('http://43.203.198.154:8080/chat', {
      transports: ['websocket'],
      auth: { token },
    });

    newSocket.on('connect', () => {
      console.log('✅ WebSocket connected');
    });

    newSocket.on('error', (object) => {
      const { data, url, accessToken: newToken } = object;
      dispatch(setProfileEmail(newToken)); // ❗ 실제로는 setUser 등 전체 토큰 갱신이 더 적절할 수도 있음
      newSocket.emit(url, { ...data, token: newToken });
    });

    newSocket.on('disconnect', () => {
      console.log('🛑 WebSocket disconnected');
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user.token?.accessToken]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
