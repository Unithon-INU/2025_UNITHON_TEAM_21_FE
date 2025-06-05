import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store'; // store 타입 경로에 맞게 수정
import axios from 'axios';

type ChatStackParamList = {
    ChatList: undefined;
    ChatRoom: { id: string; name: string };
    Notification: undefined;
};

type ChatRoomData = {
    id: string;
    name: string;
    message: string;
    time: string;
    unread: number;
};

export default function ChatListScreen() {
    const [chatRooms, setChatRooms] = useState<ChatRoomData[]>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
    const navigation = useNavigation<StackNavigationProp<ChatStackParamList>>();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        // 실제 API 주소와 토큰 헤더는 프로젝트에 맞게 수정
        if (!user.profile?.email) return;
        axios
            .get('/api/chatroom', {
                headers: { Authorization: `Bearer ${user.token?.accessToken}` },
            })
            .then(res => setChatRooms(res.data))
            .catch(err => console.error(err));
    }, [user]);

    const filteredRooms = chatRooms.filter(room => (activeTab === 'unread' ? room.unread > 0 : true));

    const handleEnterRoom = (id: string, name: string) => {
        setChatRooms(prev => prev.map(room => (room.id === id ? { ...room, unread: 0 } : room)));
        navigation.navigate('ChatRoom', { id, name });
    };

    return (
        <View className="flex flex-col gap-3 px-5">
            {/* Top Bar */}
            <View className="flex-row justify-between h-[60px] py-5 pb-[10px] pl-[2px] px-[5px]">
                <Text className="font-inter font-bold text-[24px] leading-[24px]">채팅</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                    <Image source={require('@/assets/ring.png')} className="w-8 h-8" resizeMode="contain" />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View className="flex-row gap-[8px] px-[5px] py-[12px] pl-[2px]">
                <TouchableOpacity
                    onPress={() => setActiveTab('all')}
                    className={`px-3 py-1 rounded-full ${activeTab === 'all' ? 'bg-main-color' : 'border border-[#D5D5D5]'}`}>
                    <Text className={`${activeTab === 'all' ? 'text-white' : 'text-black'} font-bold`}>전체</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('unread')}
                    className={`px-3 py-1 rounded-full ${activeTab === 'unread' ? 'bg-main-color' : 'border border-[#D5D5D5]'}`}>
                    <Text className={`${activeTab === 'unread' ? 'text-white' : 'text-black'} font-bold`}>읽지 않은 채팅방</Text>
                </TouchableOpacity>
            </View>

            {/* Chat Room List */}
            <FlatList
                data={filteredRooms}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity className="flex-row pt-2 pb-4 px-[1px]" onPress={() => handleEnterRoom(item.id, item.name)}>
                        <View className="w-14 h-14 rounded-full bg-[#ccc] mr-2" />
                        <View className="justify-center flex-1 mb-4">
                            <View className="flex-row justify-between">
                                <Text className="text-black font-bold text-[16px]">{item.name}</Text>
                                <Text className="text-[12px] text-[#999]">{item.time}</Text>
                            </View>
                            <View className="flex-row justify-between mt-1">
                                <Text className="text-[12px] text-[#666]" numberOfLines={1}>
                                    {item.message}
                                </Text>
                                {item.unread > 0 && (
                                    <View className="bg-[#FFB257] rounded-full px-2 ml-2 items-center justify-center">
                                        <Text className="text-[11px] text-white font-bold">{item.unread}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
