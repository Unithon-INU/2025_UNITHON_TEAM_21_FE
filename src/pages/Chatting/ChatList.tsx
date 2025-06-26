// src/pages/Chatting/ChatList.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '@env';
import type {ChatRoom} from '@/store/slice/chatSlice';
import {resetUnreadCount, setChatRooms} from '@/store/slice/chatSlice';
type ChatStackParamList = {
    ChatList: undefined;
    ChatRoom: {CenterID: string; name: string};
    Notification: undefined;
};

export default function ChatListScreen() {
    const navigation = useNavigation<StackNavigationProp<ChatStackParamList>>();
    const dispatch = useDispatch();
    const {token, profile} = useSelector((state: any) => state.user);
    const chatRooms = useSelector((state: any) => state.chat.chatRooms);
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

    useEffect(() => {
        const fetchChatRoom = async () => {
            try {
                const targetUserIds = ['2', '3']; // 테스트용

                if (!token?.accessToken || !profile?.email) return;

                const allUserRes = await fetch(`${API_URL}/api/users/all`, {
                    headers: {Authorization: `Bearer ${token.accessToken}`},
                });
                const allUsers = await allUserRes.json();

                const newRooms: ChatRoom[] = [];

                for (const targetUserId of targetUserIds) {
                    const params = new URLSearchParams({
                        senderEmail: profile.email,
                        targetUserId,
                    });

                    const response = await fetch(`${API_URL}/api/chatroom/get-or-create?${params}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                    });

                    if (!response.ok) continue;

                    const chatRoomId = await response.json();
                    const targetUser = allUsers.find((u: any) => u.id === parseInt(targetUserId));
                    const nickname = targetUser?.nickname || `user${targetUserId}`;

                    const alreadyExists = chatRooms.some((r: ChatRoom) => r.id === chatRoomId.toString());
                    if (!alreadyExists) {
                        newRooms.push({
                            id: chatRoomId.toString(),
                            name: nickname,
                            message: '',
                            time: '',
                            timeText: '',
                            unread: 0,
                        });
                    }
                }

                if (newRooms.length > 0) {
                    dispatch(setChatRooms([...chatRooms, ...newRooms]));
                }
            } catch (err: any) {
                console.error('❌ 채팅방 요청 에러:', err.message || err);
            }
        };

        fetchChatRoom();
    }, [chatRooms, dispatch, profile?.email, token?.accessToken]);

    const filteredRooms = chatRooms
        .filter((room: {unread: number}) => (activeTab === 'unread' ? room.unread > 0 : true))
        .sort((a: ChatRoom, b: ChatRoom) => new Date(b.time).getTime() - new Date(a.time).getTime()); // 최신순 정렬

    const handleEnterRoom = (id: string, name: string) => {
        dispatch(resetUnreadCount(id));
        navigation.navigate('ChatRoom', {CenterID: id, name});
    };

    return (
        <View className="flex-1 bg-white px-5 pt-5">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-2xl font-bold">채팅</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                    <Image source={require('@/assets/ring.png')} className="w-7 h-7" resizeMode="contain" />
                </TouchableOpacity>
            </View>

            <View className="flex-row gap-2 mb-4">
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

            <FlatList
                data={filteredRooms}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity className="flex-row py-4" onPress={() => handleEnterRoom(item.id, item.name)}>
                        <View className="w-14 h-14 rounded-full bg-[#ccc] mr-3" />
                        <View className="flex-1 justify-center">
                            <View className="flex-row justify-between">
                                <Text className="text-[16px] font-bold">{item.name}</Text>
                                <Text className="text-[12px] text-gray-500">{item.timeText}</Text>
                            </View>

                            <View className="flex-row justify-between mt-1">
                                <Text className="text-[12px] text-gray-700 flex-1" numberOfLines={1}>
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
