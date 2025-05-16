import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import SockJS from 'sockjs-client';
import {CompatClient, Stomp} from '@stomp/stompjs';
import ChatInputBar from '@/components/input/ChatInputBar';

type ChatStackParamList = {
    ChatList: undefined;
    ChatRoom: {id: string; name: string};
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
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const isPM = hours >= 12;
    const hour12 = hours % 12 || 12;
    return `${isPM ? '오후' : '오전'} ${hour12}:${minutes}`;
}

function getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 `;
}

function getCurrentDay(): string {
    const now = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[now.getDay()];
}

export default function ChatRoomScreen() {
    const route = useRoute<RouteProp<ChatStackParamList, 'ChatRoom'>>();
    const {id, name} = route.params;
    const navigation = useNavigation<StackNavigationProp<ChatStackParamList>>();

    const [messages, setMessages] = useState<Message[]>([]);
    const [currentDate, setCurrentDate] = useState(getCurrentDate());
    const [currentDay, setCurrentDay] = useState(getCurrentDay());
    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    const stompClientRef = useRef<CompatClient | null>(null);
    const senderEmail = 'test1user@example.com'; // 하드코딩 (HTML 백엔드 기준)
    const targetUserId = 3; //테스트용은 3번으로 지정
    const chatRoomId = Number(id); //id값으로 받음 test에서 2번으로 지정했으므로 chatlist에서 id 2번하이으로 들어감

    // ✅ WebSocket 연결 및 메시지 수신
    useEffect(() => {
        const stompClient = Stomp.over(() => new SockJS('https://8d7a-124-195-248-39.ngrok-free.app/')); // ✅ 수정된 부분
        stompClient.reconnectDelay = 5000; // ✅ 재연결 설정 (선택사항)

        // // 디버깅 활성화
        // stompClient.debug = str => {
        //     console.log('STOMP DEBUG:', str);
        // };

        stompClient.connect(
            {},
            () => {
                console.log('🟢 Connected');
            },
            (error:any) => {
                console.error('❌ STOMP 연결 실패:', error);

                stompClientRef.current = stompClient;
                stompClient.subscribe(`/topic/chatroom/${chatRoomId}`, message => {
                    const data = JSON.parse(message.body);
                    const isMe = data.senderEmail === senderEmail;

                    const newMessage: Message = {
                        id: Date.now().toString(),
                        text: data.content,
                        isMe: isMe,
                        time: getCurrentTime(),
                        date: getCurrentDate(),
                        day: getCurrentDay(),
                    };

                    setMessages(prev => [...prev, newMessage]);
                });
                (error2: any) => {
                    console.error('❌ STOMP 연결 실패:', error2); // <-- 여기 로그 꼭 확인
                };

                console.log('📡 stompClient 상태:', stompClientRef.current);
                console.log('✅ 연결 상태:', stompClientRef.current?.connected);
            },
        );

        return () => {
            stompClient.disconnect(() => console.log('🔴 WebSocket Disconnected'));
        };
    }, [chatRoomId]);

    // ✅ 메시지 전송
    const handleSend = (message: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text: message,
            isMe: true,
            time: getCurrentTime(),
            date: getCurrentDate(),
            day: getCurrentDay(),
        };

        setMessages(prev => [...prev, newMessage]);

        const payload = {
            chatRoomId,
            senderEmail,
            targetUserId,
            targetOrganizationId: null,
            content: message,
            fromUser: true,
            sentAt: new Date().toISOString(),
        };

        if (stompClientRef.current?.connected) {
            console.log('🟢 stompClient 연결됨, 메시지 보냄!');
            stompClientRef.current.send('/app/chat.send', {'content-type': 'application/json; charset=UTF-8'}, JSON.stringify(payload));
        } else {
            (error: any) => {
                console.error('❗ STOMP 연결 안 됨: 메시지를 보낼 수 없습니다.:', error); // <-- 여기 로그 꼭 확인
            };
        }

        setCurrentTime(getCurrentTime());
        setCurrentDate(getCurrentDate());
        setCurrentDay(getCurrentDay());
    };

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
        <KeyboardAvoidingView behavior="padding" className="flex-1 bg-white">
            <View className="flex-row items-center justify-between px-4 py-5 pb-7">
                <View className="flex-row items-center space-x-2">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                    </TouchableOpacity>
                    <Text className="text-black font-bold text-[16px]">{name}</Text>
                </View>
                <TouchableOpacity>
                    <Image source={require('@/assets/chatmenu.png')} className="w-8 h-8" resizeMode="contain" />
                </TouchableOpacity>
            </View>

            <View className="items-center my-2">
                <Text className="text-[12px] text-gray-500 bg-gray-100 px-3 py-1 mb-5 rounded-full">
                    {currentDate}
                    {currentDay}요일
                </Text>
            </View>

            <FlatList data={messages} renderItem={renderItem} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} />

            <ChatInputBar onSend={handleSend} />
        </KeyboardAvoidingView>
    );
}
