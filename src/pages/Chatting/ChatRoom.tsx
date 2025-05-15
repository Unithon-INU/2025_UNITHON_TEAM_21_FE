import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, Alert} from 'react-native';
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
        {id: '1', text: '개인정보 이용내역 안내', isMe: false, time: '오후 1:53'},
        {id: '2', text: '오케 내정보확인', isMe: true, time: '오후 2:10'},
    ],
    '1': [
        {id: '1', text: '내일 봉사일정 확인 부탁드립니다', isMe: false, time: '14:00'},
        {id: '2', text: '네 확인했습니다', isMe: true, time: '14:01'},
    ],
};
function getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours >= 12 ? '오전' : '오후'} ${(hours % 12) + 9 - 12 || 12}:${minutes}`;
}

function getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 `; // 예: 2025.04.26
}
function getCurrentDay(): string {
    const now = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const day = days[now.getDay()];
    return day; // 예: 토
}
export default function ChatRoomScreen() {
    const route = useRoute<RouteProp<ChatStackParamList, 'ChatRoom'>>();

    const {id, name} = route.params;

    const navigation = useNavigation<StackNavigationProp<ChatStackParamList, 'ChatRoom'>>();

    const [allMessages, setAllMessages] = useState(initialMessages);

    const messages = allMessages[id] || []; // 해당 방의 메시지를 가져옴

    const [currentDate, setCurrentDate] = useState(getCurrentDate());
    const [currentDay, setCurrentDay] = useState(getCurrentDay());
    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    const handleSend = (message: string) => {
        const newMessage = {
            id: Date.now().toString(),
            text: message,
            isMe: true,
            time: currentTime, // 시간 자동 추가
            date: currentDate,
            day: currentDay,
        };
        setAllMessages(prevMessages => ({
            ...prevMessages,
            [id]: [...(prevMessages[id] || []), newMessage], // 해당 방의 메시지에 추가
        }));

        setCurrentTime(getCurrentTime()); // 현재 시간 업데이트
        setCurrentDate(getCurrentDate()); // 현재 날짜 업데이트
        setCurrentDay(getCurrentDay()); // 현재 요일 업데이트
        Alert.alert('메시지 전송', `메시지: ${message}`, [{text: '확인'}]); // 메시지 전송 알림
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
            <View className="flex-row items-center justify-between px-4 py-5 pb-7">
                <View className="flex-row items-center space-x-2">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                    </TouchableOpacity>
                    <Text className="text-black font-bold text-[16px]">{name}</Text>
                </View>
                <TouchableOpacity>
                    <Image source={require('@/assets/chatmenu.png')} className="w-8 h-8" resizeMode="contain" />
                </TouchableOpacity>
            </View>
            <View className="items-center my-2">
                <Text className="text-[12px] font-text-gray-500 bg-gray-100 px-3 py-1 mb-5 rounded-full">
                    {' '}
                    {currentDate} {currentDay}요일{' '}
                </Text>
            </View>
            <FlatList data={messages} renderItem={renderItem} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} />
            <ChatInputBar onSend={handleSend} />
        </KeyboardAvoidingView>
    );
}
