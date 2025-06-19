import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Platform} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ChatInputBar from '@/components/input/ChatInputBar';
import useChatSocket from '@/hook/useChatSocket';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import axios from 'axios';

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

    // Redux에서 유저 정보 가져오기
    const user = useSelector((state: RootState) => state.user);
    const senderEmail = user.profile?.id ?? '';
    const senderId = user.profile?.id ?? ''; // 카카오 id 등 고유값
    // 상대방 id는 서버에서 내려주는 메시지/채팅방 정보로 받아와야 함
    const targetUserId = null; // 필요 시 채팅방 정보에서 추출

    const chatRoomId = Number(id);

    const [messages, setMessages] = useState<Message[]>([]);
    const [currentDate, setCurrentDate] = useState(getCurrentDate());
    const [currentDay, setCurrentDay] = useState(getCurrentDay());

    // 메시지 수신 콜백
    const handleReceive = useCallback(
        (data: any) => {
            const isMe = data.senderEmail === senderEmail;
            const newMessage: Message = {
                id: Date.now().toString(),
                text: data.content,
                isMe,
                time: getCurrentTime(),
                date: getCurrentDate(),
                day: getCurrentDay(),
            };
            setMessages(prev => [...prev, newMessage]);
        },
        [senderEmail],
    );

    // useChatSocket 훅 사용
    const {sendMessage} = useChatSocket({
        chatRoomId: String(chatRoomId),
        onMessage: handleReceive,
    });

    // 메시지 전송
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
            senderId,
            targetUserId,
            targetOrganizationId: null, // 기관 채팅이면 값 할당
            content: message,
            fromUser: true,
            sentAt: new Date().toISOString(),
        };
        sendMessage(payload);

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

    useEffect(() => {
        axios
            .get(`/api/chatroom/${chatRoomId}/messages`, {
                headers: {Authorization: `Bearer ${user.token?.accessToken}`},
            })
            .then(res => setMessages(res.data));
    }, [chatRoomId, user.token?.accessToken]);

    return (
        <View className="flex-1 bg-white">
            {/* 상단 네비게이션 바 */}
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
            <View className="flex-1" style={{paddingBottom: 20}}>
                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{paddingHorizontal: 16, paddingTop: 8}}
                    showsVerticalScrollIndicator={false}
                    inverted
                />
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
                <View className="px-4 pb-4 bg-white">
                    <ChatInputBar onSend={handleSend} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
