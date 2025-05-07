import React, { useState } from 'react';
import { Image, View, TextInput, TouchableOpacity } from 'react-native';

export default function ChatInputBar({ onSend }: { onSend: (message: string) => void }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim().length === 0) {
      return; // 빈 메시지 전송 방지
    }
    onSend(text);
    setText('');
  };

  return (
    <View className="flex-row items-center bottom px-4 py-2 border-t border-gray-300 bg-white">
      <TouchableOpacity>
        <Image source={require('@/assets/add.png')} className="w-8 h-8" resizeMode="contain" />
      </TouchableOpacity>
      <TextInput
        className="flex-1 ml-2 text-[14px]"
        placeholder="메시지 보내기"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity onPress={handleSend}>
        <Image source={require('@/assets/send.png')} className="w-8 h-8" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}
