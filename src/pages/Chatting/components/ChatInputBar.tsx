import React, {useState} from 'react';
import {Image, View, TextInput, TouchableOpacity} from 'react-native';

export default function ChatInputBar({onSend}: {onSend: (message: string) => void}) {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim().length === 0) {
            return; // 빈 메시지 전송 방지
        }
        onSend(text);
        setText('');
    };

    return (
        <View className="flex-row items-center pl-2 pr-2 mb-3">
            <TextInput className="flex-1 text-[14px] bg-[#eee] mx-5 px-2 pl-2 rounded-full" placeholder="  메시지 보내기" value={text} onChangeText={setText} />
            <TouchableOpacity onPress={handleSend}>
                <Image source={require('@/assets/send.png')} className="w-8 h-8" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
}
