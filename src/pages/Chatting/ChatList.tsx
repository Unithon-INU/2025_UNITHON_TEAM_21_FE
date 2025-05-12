import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import Layout from '../Layout';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const chatRooms = [
    {
        id: '0',
        name: '기봉사',
        message: '개인정보 이용내역 안내',
        time: '13:53',
        unread: 0,
    },
    {
        id: '1',
        name: '하이지역아동센터',
        message: '내일 봉사 일정 확인 부탁드립니다.',
        time: '어제',
        unread: 0,
    },
    {
        id: '2',
        name: '우리동네 봉사킹',
        message: '같이 봉사하러 가실래요?',
        time: '4월 20일(화)',
        unread: 1,
    },
    {
        id: '3',
        name: '이름을 뭐로할까',
        message: '네 감사합니다~',
        time: '2024.08.27',
        unread: 0,
    },
];

type ChatStackParamList = {
    ChatList: undefined;
    ChatRoom: {id: string, name: string};
    Notification: undefined;
};

export default function ChatListScreen() {
    const filteredRooms = chatRooms.filter(room => (activeTab === 'unread' ? room.unread > 0 : true));
    const [activeTab, setActiveTab] = useState('all');
    type ChatStackNavigationProp = StackNavigationProp<ChatStackParamList, 'ChatList' | 'ChatRoom' | 'Notification'>; // 채팅탭 내비게이션 스택 파라미터 리스트
    const navigation = useNavigation<ChatStackNavigationProp>(); // 채팅탭 내비게이션 훅
    return (
        <Layout>
            <View className="flex-row justify-between h-[60px] pt-[5px] pb-[10px] pl-[2px] px-[5px]">
                <Text className="font-inter font-bold text-[24px] leading-[24px]">채팅</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                    <Image source={require('@/assets/ring.png')} className="w-8 h-8" resizeMode="contain" />
                </TouchableOpacity>
            </View>

            <View className="flex-row gap-[8px] px-[5px] py-[12px] pl-[2px]">
                <TouchableOpacity
                    onPress={() => setActiveTab('all')}
                    className={`px-3 py-1 rounded-full ${activeTab === 'all' ? 'bg-main-color' : 'border border-[#D5D5D5]'}`}>
                    <Text className={`${activeTab === 'all' ? 'text-white' : 'text-black'} font-bold`}>전체</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('unread')}
                    className={`px-3 py-1 rounded-full ${activeTab === 'unread' ? 'bg-main-color' : 'border border-[#D5D5D5]'}`}>
                    <Text className={`${activeTab === 'unread' ? 'text-white' : 'text-black'} font-bold`}>안 읽은 채팅방</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredRooms}
                keyExtractor={item => item.id}
                contentContainerStyle={{}}
                renderItem={({item}) => (
                    <TouchableOpacity className="flex-row pt-2 pb-4 px-[1px] " onPress={() => navigation.navigate('ChatRoom', {id: item.id ,name:item.name})}>
                        <View className="w-14 h-14 rounded-full bg-[#ccc] mr-2" />
                        <View className="flex-1 justify-center mb-4">
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
        </Layout>
    );
}
