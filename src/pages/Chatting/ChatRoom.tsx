import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ChatInputBar from './components/ChatInputBar';

type ChatStackParamList = {
    ChatList: undefined;
    ChatRoom: {id: string; name: string};
    Notification: undefined;
};

const initialMessages: Record<string, {id: string; text: string; isMe: boolean; time: string}[]> = {
    '0': [
        {id: '1', text: '개인정보 이용내역 안내임', isMe: false, time: '오후 1:53'},
        {id: '2', text: '오케 내정보확인', isMe: true, time: '오후 2:10'},
    ],
    '1': [
        {id: '1', text: '내일 봉사일정 확인 부탁드립니다', isMe: false, time: '14:00'},
        {id: '2', text: '네 확인했습니다', isMe: true, time: '14:01'},
    ],
};

export default function ChatRoomScreen() {
    const route = useRoute<RouteProp<ChatStackParamList, 'ChatRoom'>>();

    const {id, name} = route.params;

    const navigation = useNavigation<StackNavigationProp<ChatStackParamList, 'ChatRoom'>>();
    const [allMessages, setAllMessages] = useState(initialMessages);

    const messages = allMessages[id] || []; // 해당 방의 메시지를 가져옴
    const roomname = name; // 방 이름이 없을 경우 기본값 설정
    const handleSend = (message: string) => {
        const newMessage = {
            id: Date.now().toString(),
            text: message,
            isMe: true,
            time: '지금',
        };
        setAllMessages(prev => ({
            ...prev,
            [id]: [...(prev[id] || []), newMessage],
        }));
    };

    const renderItem = ({item}: any) => (
        <View className={`flex-row items-end px-4 mb-3  ${item.isMe ? 'justify-end' : ''}`}>
            {!item.isMe && <View className="w-8 h-8 bg-[#eee] rounded-full mr-2" />}
            {item.isMe && (
                <Text className="text-[10px] text-gray-500 mr-1">{item.time}</Text> //시간 먼저 내메시지
            )}
            <View className={`${item.isMe ? 'bg-main-color' : 'bg-[#f0f0f0]'} px-3 py-2 rounded-xl max-w-[70%]`}>
                <Text className={`${item.isMe ? 'text-white' : 'text-black'}`}>{item.text}</Text>
            </View>
            {!item.isMe && (
                <Text className="text-[10px] text-gray-500 ml-1">{item.time}</Text> //시간 나중 상대메시지
            )}
            {item.isMe && <View className="w-8 h-8 bg-[#eee] rounded-full ml-2" />}
        </View>
    );

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} className="flex-1 bg-white">
            <View className="flex-row items-center justify-between px-4 pb-7">
                <View className="flex-row items-center space-x-2">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                    </TouchableOpacity>
                    <Text className="text-black font-bold text-[16px]">{roomname}</Text>
                </View>
                <TouchableOpacity>
                    <Image source={require('@/assets/chatmenu.png')} className="w-8 h-8" resizeMode="contain" />
                </TouchableOpacity>
            </View>
            <View className="items-center my-2">
                <Text className="text-[12px] text-gray-500 bg-gray-100 px-3 py-1 mb-5  rounded-full">2025년 4월 26일 토요일</Text>
            </View>
            <FlatList data={messages} renderItem={renderItem} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} />
            <ChatInputBar onSend={handleSend} />
        </KeyboardAvoidingView>
    );
}
