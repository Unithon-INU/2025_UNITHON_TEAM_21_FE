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
            text: "Hi, I'm your chatbot!\nCurious about volunteering?\nFeel free to ask anything!\nWe're cheering for your kind heart 💛",
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
    return `${isPM ? 'PM' : 'AM'} ${hour12}:${minutes}`;
}

function getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekday = days[now.getDay()];
    return `${year}.${month}.${day} (${weekday})`;
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
        console.error('API call error:', error);
        return 'An error occurred while fetching the chatbot response.\nPlease try again later.';
    }
};

export default function ChatRoomScreen() {
    const route = useRoute<RouteProp<ChatStackParamList, 'ChatRoom'>>();
    const {id} = route.params;
    const navigation = useNavigation<StackNavigationProp<ChatStackParamList, 'ChatRoom'>>();
    const [allMessages, setAllMessages] = useState(initialMessages);

    const messages = allMessages[id] || [];

    const handleSend = async (message: string) => {
        if (!message.trim()) return;

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
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} className="flex-1 bg-white">
            <View className="flex-row items-center justify-between px-4 py-4">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-black">Chatbot</Text>
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
