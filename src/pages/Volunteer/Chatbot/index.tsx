import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, KeyboardAvoidingView, Platform, Keyboard} from 'react-native';

import ChatInputBar from '../../../components/input/ChatInputBar';
import MessageItem from './components/MessageItem';
import HeaderBackButton from '@/components/button/HeaderBackButton';

type MessageType = {
    id: string;
    text: string;
    isMe: boolean;
    time: string;
};

function getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const isPM = hours >= 12;
    const hour12 = hours % 12 || 12;
    return `${isPM ? 'PM' : 'AM'} ${hour12}:${minutes}`;
}

const sendMessageToAPI = async (message: string) => {
    try {
        const response = await fetch('https://chatbot-server-cyan.vercel.app/api/chatbot/message', {
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
    const flatListRef = useRef<FlatList>(null);
    const [messages, setMessages] = useState<MessageType[]>([
        {
            id: '1',
            text: '안녕하세요, 챗봇입니다.\n봉사활동에 대해 궁금하신가요?\n무엇이든 편하게 물어보세요!\n당신의 따뜻한 마음을 응원합니다',
            isMe: false,
            time: getCurrentTime(),
        },
    ]);

    useEffect(() => {
        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({animated: true});
            }
        }, 100); // 초기 메시지 로드 후 스크롤을 아래로 이동
    }, [messages.length]);
    // --- 새로운 "편법" 로직 ---
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            if (flatListRef.current) {
                // KeyboardAvoidingView가 레이아웃을 조정한 후 스크롤하기 위해
                // 아주 짧은 지연을 줄 수 있습니다. (선택 사항 및 값 조절 필요)
                setTimeout(() => {
                    flatListRef.current?.scrollToEnd({animated: true});
                }, 50); // 50ms 지연, 필요에 따라 조절하거나 제거
            }
        });

        // 컴포넌트 언마운트 시 리스너 제거 (메모리 누수 방지)
        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleSend = async (message: string) => {
        const userMessage: MessageType = {
            id: Date.now().toString(),
            text: message,
            isMe: true,
            time: getCurrentTime(),
        };
        setMessages(prev => [...prev, userMessage]);

        const botResponse = await sendMessageToAPI(message);
        const botMessage: MessageType = {
            id: (Date.now() + 1).toString(),
            text: botResponse,
            isMe: false,
            time: getCurrentTime(),
        };
        setMessages(prev => [...prev, botMessage]);
    };

    return (
        <KeyboardAvoidingView
            behavior="padding" // iOS와 Android 모두 "padding"으로 시도
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
            className="flex-1 bg-white">
            <HeaderBackButton px={true}>챗봇</HeaderBackButton>
            <FlatList
                className="flex-1"
                ref={flatListRef}
                data={messages}
                renderItem={MessageItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
            <ChatInputBar onSend={handleSend} />
        </KeyboardAvoidingView>
    );
}
