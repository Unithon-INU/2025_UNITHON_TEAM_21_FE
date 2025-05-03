import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import Layout from '../Layout';

export default function ChatListScreen() {
  const chatRooms = [
    {
      id: '1',
      name: '하이지역아동센터',
      message: '내일 봉사 일정 확인 부탁드립니다.',
      time: '오전 10:45',
      unread: 2,
    },
    {
      id: '2',
      name: '우리동네 봉사킹',
      message: '같이 봉사하러 가실래요?',
      time: '4월 20일',
      unread: 0,
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
      {/* 상단 헤더 */}
      <View className="flex-393 justify-between items-center h-[60px]">
        <Text className="text-[24px] font-inter">채팅</Text>
        <Ionicons name="notifications-outline" size={24} color="#FFB257" />
      </View>

      {/* 탭 */}
      <View className="flex-row space-x-4 mb-3">
        <TouchableOpacity>
          <Text className="text-[#FFB257] font-bold bg-main-color">전체</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-[#aaa]">안 읽은 채팅방</Text>
        </TouchableOpacity>
      </View>

      {/* 채팅 리스트 */}
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row py-3 border-b border-[#f2f2f2]">
            <View className="w-11 h-11 rounded-full bg-[#ccc] mr-3" />
            <View className="flex-1 justify-center">
              <View className="flex-row justify-between">
                <Text className="font-bold text-[15px]">{item.name}</Text>
                <Text className="text-[12px] text-[#999]">{item.time}</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-[13px] text-[#666]" numberOfLines={1}>
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
