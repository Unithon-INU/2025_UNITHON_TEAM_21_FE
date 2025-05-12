import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../Layout';

export default function ChatListScreen() {
    const chatRooms = [
        {
            id: '0',
            name: '기봉사',
            message: '개인정보 이용내역 안내~~~',
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

    return (
        <Layout>
            {/* 휴대폰헤더 */}
            {/* 상단 헤더 */}
            <View className="flex-row justify-between h-[60px] pt-[20px] pr-[1px] pb-[10px] pl-[1px]">
                <Text className="font-black text-[24px] leading-[24px] font-inter font-bold">채팅</Text>
                <Ionicons name="notifications-outline" size={29} color="black" />
            </View>

            <View className="flex-row space-x-2 mb-3 pt-[20px] pb-[px] pl-[1px] gap-[8px]">
                {/* 전체 탭 */}
                <TouchableOpacity className="px-2 py-1 rounded-full bg-main-color">
                    <Text className="font-bold text-white font-inter">전체</Text>
                </TouchableOpacity>

                {/* 안 읽은 채팅방 탭 */}
                <TouchableOpacity className="border border-[#D5D5D5] px-2 py-1 rounded-full">
                    <Text className="font-bold text-black font-inter">안 읽은 채팅방</Text>
                </TouchableOpacity>
            </View>

            {/* 채팅 리스트 */}
            <FlatList
                data={chatRooms}
                keyExtractor={item => item.id}
                contentContainerStyle={{paddingBottom: 80}}
                renderItem={({item}) => (
                    <TouchableOpacity className="flex-row pt-2 pb-4">
                        <View className="w-12 h-12 rounded-full bg-[#ccc] mr-3" /> {/* 프로필 사진 */}
                        <View className="justify-center flex-1">
                            <View className="flex-row justify-between">
                                <Text className="text-black font-bold text-[15px]">{item.name}</Text>
                                <Text className="text-[12px] font-grey">{item.time}</Text>
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
