// src/pages/Chatting/ChatList.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '@env';
import type {ChatRoom} from '@/store/slice/chatSlice';
import {resetUnreadCount, setChatRooms} from '@/store/slice/chatSlice';
import {RootState} from '@/store/store';
type ChatStackParamList = {
    ChatList: undefined;
    ChatRoom: {chatRoomId: string; targetName: string};
    Notification: undefined;
};
function formatTime(isoString: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9
    const hours = koreaTime.getHours();
    const minutes = koreaTime.getMinutes().toString().padStart(2, '0');
    const isPM = hours >= 12;
    const hour12 = hours % 12 || 12;
    return `${isPM ? '오후' : '오전'} ${hour12}:${minutes}`;
}

export default function ChatListScreen() {
    const navigation = useNavigation<StackNavigationProp<ChatStackParamList>>();
    const dispatch = useDispatch();
    const {token,profile} = useSelector((state: RootState) => state.user);
    const chatRooms = useSelector((state: RootState) => state.chat.chatRooms);
    //console.log('chat', chatRooms);
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

    useEffect(() => {
        const fetchChatRoom = async () => {
            try {
                if (!token?.accessToken) return;

                if (profile?.userRole === 0) {

                    const response = await fetch(`${API_URL}/api/chatroom`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) throw new Error('채팅방 목록 가져오기 실패');

                    const rooms = await response.json(); // [{ chatRoomId, orgName, lastMessage, updatedAt }]
                    console.log('room', rooms);

                    const mappedRooms: ChatRoom[] = rooms.map((room: any) => ({
                        id: String(room.id),
                        name: room.targetName ?? '기관 이름 없음',
                        message: room.lastMessage ?? '',
                        time: room.updatedAt ?? '',
                        timeText: formatTime(room.updatedAt),
                        unread: 1,
                    }));

                    dispatch(setChatRooms(mappedRooms));
                }
                else {
                    const response = await fetch(`${API_URL}/api/chatroom/org?organizationId=${profile?.id}`, {
                        method: 'GET',
                        headers: {
                            //Authorization: `Bearer ${token.accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    });


                    if (!response.ok) throw new Error('채팅방 목록 가져오기 실패');

                    const rooms = await response.json(); // [{ chatRoomId, orgName, lastMessage, updatedAt }]
                    console.log('room', rooms);

                    const mappedRooms: ChatRoom[] = rooms.map((room: any) => ({
                        id: String(room.id),
                        name: room.targetName ?? '유저 이름 없음',
                        message: room.lastMessage ?? '',
                        time: room.updatedAt ?? '',
                        timeText: formatTime(room.updatedAt),
                        unread: 0,
                    }));

                    dispatch(setChatRooms(mappedRooms));
                }
            }

             catch (err: any) {
                console.error('❌ 채팅방 요청 에러:', err.message || err);
            }
        };

        fetchChatRoom();
    }, [token?.accessToken, dispatch]);

     const filteredRooms = chatRooms
         .filter((room: {unread: number}) => (activeTab === 'unread' ? room.unread > 0 : true))
         .sort((a: ChatRoom, b: ChatRoom) => new Date(b.time).getTime() - new Date(a.time).getTime()); // 최신순 정렬


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
                keyExtractor={(item, index) => `${item.id}-${index}`} // ← 중복 방지
                renderItem={({item}) => (
                    <TouchableOpacity className="flex-row py-4" onPress={() => navigation.navigate('ChatRoom',{ chatRoomId:item.id, targetName:item.name})}>
                        <View className="w-14 h-14 rounded-full bg-[#ccc] mr-3" />
                        <View className="flex-1 justify-center">
                            <View className="flex-row justify-between">
                                <Text className="text-[16px] font-bold">{item.name}</Text>
                                <Text className="text-[12px] text-gray-500">{item.timeText}</Text>
                            </View>

                            <View className="flex-row justify-between mt-1">
                                <Text className="text-[12px] text-gray-700 flex-1" numberOfLines={1}>
                                    {item.name} 에서 보낸 메시지입니다.
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
