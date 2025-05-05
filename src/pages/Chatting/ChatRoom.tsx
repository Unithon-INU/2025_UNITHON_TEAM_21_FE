import React from 'react';
import {View, Text, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../Layout';
import useChattingNavigation from '@/hook/useChattingNavigation';


export default function ChatRoomScreen() {
    const scnavigation = useChattingNavigation(); // 채팅탭 내비게이션 훅

    const messages = [
        {id: '1', text: '안녕하세요!', time: '13:53', isMe: false},
    ];

    const renderItem = ({item}: any) => (
        <View className={`flex-row items-end mb-2 ${item.isMe ? 'justify-end' : ''}`}>
            {!item.isMe && <View className="w-6 h-6 bg-[#eee] rounded-full mr-2" />}
            <View className={`${item.isMe ? 'bg-main-color' : 'bg-[#f0f0f0]'} px-3 py-2 rounded-xl max-w-[70%]`}>
                <Text className={`${item.isMe ? 'text-white' : 'text-black'}`}>{item.text}</Text>
            </View>
            <Text className="text-[10px] text-gray-500 ml-1">{item.time}</Text>
            {item.isMe && <View className="w-6 h-6 bg-[#eee] rounded-full ml-2" />}
        </View>
    );

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-white">
            <Layout>
                <View className="flex-row items-center justify-between pb-5">
                    {/* 왼쪽: 뒤로가기 + 타이틀 */}
                    <View className="flex-row items-center space-x-2">
                        <TouchableOpacity onPress={() => scnavigation.navigate('ChatList')}>
                            <Image source={require('@/assets/navi.png')} className="w-7 h-7" />
                        </TouchableOpacity>
                    </View>

                    {/* 오른쪽: 메뉴 버튼 */}
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-vertical" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* 메시지 목록 */}
                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{paddingBottom: 16}}
                    showsVerticalScrollIndicator={false}
                />
            </Layout>
        </KeyboardAvoidingView>
    );
}
