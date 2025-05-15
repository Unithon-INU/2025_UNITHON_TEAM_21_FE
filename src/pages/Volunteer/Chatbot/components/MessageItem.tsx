import React from 'react';
import {View, Text, Image} from 'react-native';

type MessageItemProps = {
    item: {
        id: string;
        text: string;
        isMe: boolean;
        time: string;
    };
};

export default function MessageItem({item}: MessageItemProps) {
    return (
        <View className={`flex-row items-end px-4 mb-3 ${item.isMe ? 'justify-end' : ''}`}>
            {!item.isMe && (
                <View className="w-8 h-8 bg-[#eee] rounded-full mr-2 items-center justify-center overflow-hidden">
                    <Image source={require('@/assets/chatbot.png')} className="w-8 h-8" resizeMode="contain" />
                </View>
            )}
            {item.isMe && <Text className="text-[10px] text-gray-500 mr-1">{item.time}</Text>}
            <View className={`${item.isMe ? 'bg-main-color' : 'bg-[#f0f0f0]'} px-3 py-2 rounded-xl max-w-[70%]`}>
                <Text className={`${item.isMe ? 'text-white' : 'text-font-black'}`}>{item.text}</Text>
            </View>
            {!item.isMe && <Text className="text-[10px] text-gray-500 ml-1">{item.time}</Text>}
            {item.isMe && <View className="w-8 h-8 bg-[#eee] rounded-full ml-2" />}
        </View>
    );
}
