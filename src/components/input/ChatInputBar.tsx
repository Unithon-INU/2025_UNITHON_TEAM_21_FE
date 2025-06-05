import {useState} from 'react';
import {Image, View, TextInput, TouchableOpacity, Keyboard} from 'react-native';

export default function ChatInputBar({onSend}: {onSend: (message: string) => void}) {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim().length === 0) {
            return; // 빈 메시지 전송 방지
        }
        onSend(text);
        setText('');
        Keyboard.dismiss();
    };

    return (
        <View className="flex-row items-center gap-3 px-5 py-3">
            <TextInput
                className="flex-1 px-3 py-2 text-base rounded-full bg-bg-gray"
                placeholder="Send a Message"
                value={text}
                onChangeText={setText}
                placeholderTextColor={'#9A9A9A'}
                returnKeyType="send"
                onSubmitEditing={handleSend}
            />
            <TouchableOpacity onPress={handleSend}>
                <Image source={require('@/assets/send.png')} className="w-8 h-8" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
}
