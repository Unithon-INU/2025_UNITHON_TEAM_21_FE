import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import ChatInputBar from '../../../components/input/ChatInputBar';
import MessageItem from './components/MessageItem';

type ChatStackParamList = {
    ChatList: undefined;
    ChatRoom: {id: string; name: string};
    Notification: undefined;
};

type MessageType = {
    id: string;
    text: string;
    isMe: boolean;
    time: string;
};

const initialMessages: Record<string, MessageType[]> = {
    '0': [
        {
            id: '1',
            text: '안녕하세요 챗봇입니다.\n봉사활동에 대해 궁금하신가요?\n무엇이든 편하게 물어보세요!\n당신의 따뜻한 마음을 응원합니다 ',
            isMe: false,
            time: getCurrentTime(),
        },
    ],
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
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = days[now.getDay()];
    return `${year}년 ${month}월 ${day}일 ${weekday}요일`;
}

const sendMessageToAPI = async (message: string) => {
    try {
        const response = await fetch('https://chatbot-server-cyan.vercel.app/api/chatbot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message}),
        });
        const json = await response.json();
        return json.response;
    } catch (error) {
        console.error('API 호출 에러:', error);
        return '챗봇 응답을 불러오는 중 오류가 발생했습니다.\n나중에 다시 시도해주세요.';
    }
};

export default function ChatRoomScreen() {
    const route = useRoute<RouteProp<ChatStackParamList, 'ChatRoom'>>();
    const {id} = route.params;
    const navigation = useNavigation<StackNavigationProp<ChatStackParamList, 'ChatRoom'>>();
    const [allMessages, setAllMessages] = useState(initialMessages);

    const messages = allMessages[id] || [];

    const handleSend = async (message: string) => {
        if (!message.trim()) {
            return;
        }

        const userMessage: MessageType = {
            id: Date.now().toString(),
            text: message,
            isMe: true,
            time: getCurrentTime(),
        };
        setAllMessages(prev => ({
            ...prev,
            [id]: [...(prev[id] || []), userMessage],
        }));
        const botResponse = await sendMessageToAPI(message);
        const botMessage: MessageType = {
            id: (Date.now() + 1).toString(),
            text: botResponse,
            isMe: false,
            time: getCurrentTime(),
        };
        setAllMessages(prev => ({
            ...prev,
            [id]: [...(prev[id] || []), botMessage],
        }));
    };

    return (
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={30} className="flex-1 bg-white">
            <View className="flex-row items-center justify-between px-4 py-4">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-black">{'챗봇'}</Text>
                </View>
                <TouchableOpacity>
                    <Image source={require('@/assets/chatmenu.png')} className="w-8 h-8" resizeMode="contain" />
                </TouchableOpacity>
            </View>
            <View className="items-center py-2">
                <Text className="text-[12px] text-font-black bg-bg-gray px-2 py-1 mb-3 rounded-xl">{getCurrentDate()}</Text>
            </View>
            <FlatList data={messages} renderItem={MessageItem} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} />
            <ChatInputBar onSend={handleSend} />
        </KeyboardAvoidingView>
    );
}
