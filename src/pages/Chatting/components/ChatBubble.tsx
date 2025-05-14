// src/components/ChatBubble.tsx
import React from 'react';
import {View, Text} from 'react-native';

interface ChatBubbleProps {
    message: string;
    time: string;
    isMe?: boolean;
}

export default function ChatBubble({message, time, isMe = false}: ChatBubbleProps) {
    return (
        <View className={`flex-row items-end mb-2 ${isMe ? 'justify-end' : ''}`}>
            {!isMe && <View className="w-6 h-6 bg-gray-300 rounded-full mr-2" />}
            <View className={`bg-${isMe ? '[#FFB257]' : 'gray-100'} px-3 py-2 rounded-xl`}>
                <Text className="text-sm">{message}</Text>
            </View>
            <Text className="text-[10px] text-gray-400 ml-2">{time}</Text>
            {isMe && <View className="w-6 h-6 bg-gray-300 rounded-full ml-2" />}
        </View>
    );
}
