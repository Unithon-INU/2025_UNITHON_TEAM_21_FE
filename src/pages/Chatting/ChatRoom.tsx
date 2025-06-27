// File: src/pages/Chatting/ChatRoom.tsx
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Keyboard} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ChatInputBar from '@/components/input/ChatInputBar';
import {useChatSocket} from '@/hook/useChatSocket';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@/store/store';
import {increaseUnreadCount, resetUnreadCount, updateLastMessage} from '@/store/slice/chatSlice';
type ChatStackParamList = {
    ChatList: undefined;
    ChatRoom: { chatRoomId: string; targetName: string }; // ✅ 통일
    Notification: undefined;
};

type Message = {
    id: string;
    text: string;
    isMe: boolean;
    time: string;
    date?: string;
    day?: string;
};

function getCurrentTime(): string {
    const now = new Date();
    const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9

    const hours = koreaTime.getHours();
    const minutes = koreaTime.getMinutes().toString().padStart(2, '0');
    const isPM = hours >= 12;
    const hour12 = hours % 12 || 12;
    return `${isPM ? '오후' : '오전'} ${hour12}:${minutes}`;
}
function formatAMPM(isoString: string): string {
    const date = new Date(isoString);
    const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9

    const hours = koreaTime.getHours();
    const minutes = koreaTime.getMinutes().toString().padStart(2, '0');
    const isPM = hours >= 12;
    const hour12 = hours % 12 || 12;

    return `${isPM ? '오후' : '오전'} ${hour12}:${minutes}`;
}

function getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
}

function getCurrentDay(): string {
    const now = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[now.getDay()];
}

export default function ChatRoomScreen() {
    const route = useRoute<RouteProp<ChatStackParamList, 'ChatRoom'>>();
    const { chatRoomId, targetName } = route.params;
    const navigation = useNavigation<StackNavigationProp<ChatStackParamList>>();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const socket = useChatSocket();
    const userId = user.profile?.id; // 사용자 ID
    const token = user.token?.accessToken ?? null;
    const userRole = user.profile?.userRole ?? 0; // 기본값은 일반 사용자
    const senderUserId = userRole === 0 ? userId : null; // 일반 사용자의 경우 userId, 센터 관리자의 경우 null
    const senderOrgId = userRole === 1 ? userId : null;
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentDate, setCurrentDate] = useState(getCurrentDate());
    const [currentDay, setCurrentDay] = useState(getCurrentDay());
    // 채팅방 ID를 상태로 관리
    const [currentChatRoomId, setCurrentChatRoomId] = useState<string | null>(chatRoomId) || null;

     useEffect(() => {
        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({animated: true});
            }
        }, 100);
    }, [messages.length]);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            if (flatListRef.current) {
                setTimeout(() => {
                    flatListRef.current?.scrollToEnd({animated: true});
                }, 50);
            }
        });

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        if (chatRoomId) {
            setCurrentChatRoomId(chatRoomId); // 또는 String(chatRoomId);)
        }
    }, [chatRoomId]);

    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        // 채팅방에 입장
        if (!socket) {
            console.error('❌ WebSocket 연결 실패: 소켓이 없습니다.');
            return;
        }
        if (!socket || !currentChatRoomId || !token) return;
        socket.emit('join', {chatRoomId: currentChatRoomId});
        console.log('✅ 채팅방 참여 완료:', currentChatRoomId);

          //✅ join 후 chat-list 요청 직접 호출
          socket.emit('chat-list', {
              token,
              chatRoomId: currentChatRoomId,
          });
    }, [socket, currentChatRoomId, token]);

    useEffect(() => {
        if (!socket || !token  || !currentChatRoomId)
            return;


        const requestChatList = () => {
            console.log('🔗 채팅 리스트 요청');
            // 채팅 리스트 요청
             socket.emit('chat-list', {
                 token,
                 chatRoomId: currentChatRoomId,
             });
        };
        const handleChatList = (data: any) => {
            const chatList = data?.data?.chatList ?? [];

            if (!Array.isArray(chatList)) {
                console.error('❌ chatList가 배열이 아닙니다:', chatList);
                return;
            }
            const formatted = chatList.map((msg: any) => ({
                id: msg.id || Date.now().toString(),
                text: msg.content,
                isMe: (userRole === 0 && msg.senderUserId === userId) || (userRole === 1 && msg.senderOrgId === userId),
                time:  formatAMPM(msg.timestamp),
            }));
            setMessages(formatted);
        };

        const handleMessage = (data: any) => {
            // 메시지 받고 상태 업데이트
            const isMe = (user.profile?.userRole === 0 && data.senderUserId === userId) || (user.profile?.userRole === 1 && data.senderOrgId === userId);
            const now = new Date(); // 지금 시각을 한 번만 생성
            const newMessage: Message = {
                id: Date.now().toString(),
                text: data.message,
                isMe,
                time: getCurrentTime(),
                date: getCurrentDate(),
                day: getCurrentDay(),
            };
            setMessages(prev => [...prev, newMessage]);//
            if (!isMe) {
                console.log('🔔 unread 증가', data.chatRoomId);
                dispatch(increaseUnreadCount(data.chatRoomId));
            }
            dispatch(
                updateLastMessage({
                    // 채팅방의 마지막 메시지 업데이트
                    id: data.chatRoomId,
                    message: data.message,
                    time: now.toISOString(),
                    timeText: getCurrentTime(), // 표시용 문자열
                }),
            );
        };

        console.log('🔗 WebSocket 연결 준비됨');

        // 소켓 이벤트 핸들러 등록
        socket.on('connect', requestChatList);
        socket.on('reconnect', requestChatList);
        socket.off('chat-list').on('chat-list', handleChatList);
        socket.off('message').on('message', handleMessage);

        return () => {
            socket.off('connect', requestChatList);
            socket.off('reconnect', requestChatList);
            socket.off('chat-list', handleChatList);
            socket.off('message', handleMessage);
        };
    }, [socket, token, currentChatRoomId, dispatch]);

    const handleSend = (message: string) => {
        // 메시지 전송 함수
        if (!socket || !token || !currentChatRoomId) return;
        const now = new Date();
        const timeText = getCurrentTime();
        const newMessage: Message = {
            id: Date.now().toString(),
            text: message,
            isMe: true,
            time: timeText,
            date: getCurrentDate(),
            day: getCurrentDay(),
        };
        socket.emit('message', {
            chatRoomId: currentChatRoomId,
            message,
            senderUserId,
            senderOrgId,
        });
        console.log('📤 메시지 전송:', {...newMessage, senderOrgId, senderUserId});
        // 채팅 리스트용 업데이트
        dispatch(
            updateLastMessage({
                id: currentChatRoomId,
                message,
                time: now.toISOString(), // 정렬용
                timeText, // 표시용
            }),
        );

        setCurrentDate(getCurrentDate());
        setCurrentDay(getCurrentDay());
    };

    useEffect(() => {
        flatListRef.current?.scrollToEnd({animated: true});
    }, [messages]);

    useEffect(() => {
        if (currentChatRoomId) {
            dispatch(resetUnreadCount(currentChatRoomId));
        }
    }, [currentChatRoomId, dispatch]);

    const renderItem = ({item}: {item: Message}) => (
        <View className={`flex-row items-end px-4 mb-3 ${item.isMe ? 'justify-end' : ''}`}>
            {!item.isMe && <View className="w-8 h-8 bg-[#eee] rounded-full mr-2" />}
            {item.isMe && <Text className="text-[10px] text-gray-500 mr-1">{item.time}</Text>}
            <View className={`${item.isMe ? 'bg-main-color' : 'bg-[#f0f0f0]'} px-3 py-2 rounded-xl max-w-[70%]`}>
                <Text className={`${item.isMe ? 'text-white' : 'text-black'}`}>{item.text}</Text>
            </View>
            {!item.isMe && <Text className="text-[10px] text-gray-500 ml-1">{item.time}</Text>}
            {item.isMe && <View className="w-8 h-8 bg-[#eee] rounded-full ml-2" />}
        </View>
    );

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} style={{flex: 1}}>
            <View className="flex-1 bg-white">
                <View className="flex-row items-center justify-between px-4 py-5 pb-7">
                    <View className="flex-row items-center space-x-2">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                        </TouchableOpacity>
                        <Text className="text-black font-bold text-[16px]">{targetName}</Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={require('@/assets/chatmenu.png')} className="w-8 h-8" resizeMode="contain" />
                    </TouchableOpacity>
                </View>

                <View className="items-center my-2">
                    <Text className="text-[12px] text-gray-500 bg-gray-100 px-3 py-1 mb-5 rounded-full">
                        {getCurrentDate()} {getCurrentDay()}요일
                    </Text>
                </View>

                <View className="flex-1" style={{paddingBottom: 20}}>
                    <FlatList
                        className="flex-1"
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 8}}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View className="px-4 pb-4 bg-white">
                    <ChatInputBar onSend={handleSend} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
