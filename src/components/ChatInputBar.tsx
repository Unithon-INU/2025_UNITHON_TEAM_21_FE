import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChatInputBar({ onSend }: { onSend: (message: string) => void }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim().length === 0) return; // 빈 메시지 전송 방지
    onSend(text);
    setText('');
  };

  return (
    <View className="flex-row items-center px-4 py-2 border-t border-gray-300 bg-white">
      <TouchableOpacity>
        <Ionicons name="add" size={24} color="#ccc" />
      </TouchableOpacity>
      <TextInput
        className="flex-1 ml-2 text-[14px]"
        placeholder="메시지 보내기"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity onPress={handleSend}>
        <Ionicons name="send" size={22} color="#FFB257" />
      </TouchableOpacity>
    </View>
  );
}
