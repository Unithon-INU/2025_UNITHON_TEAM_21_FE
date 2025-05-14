import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Layout from '../Layout';
import NotificationItem from '@/pages/Notification/components/NotificationItem';

export default function NotificationScreen() {
    const navigation = useNavigation();

    // 알림 데이터를 상태로 관리합니다.
    // 실제 앱에서는 서버에서 데이터를 가져오거나 로컬 스토리지에서 불러오는 방식으로 구현할 수 있습니다.
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            type: '추천봉사',
            message: '이번주 인기 봉사활동을 확인해보세요!',
            time: '3일 전',
        },
        {
            id: '2',
            type: '기부전달',
            message: '당신의 첫 기부가 전달되었습니다! 감사합니다💛',
            time: '3일 전',
        },
        {
            id: '3',
            type: '봉사일정',
            message: '다가오는 봉사일정에 참여해보세요!',
            time: '5일 전',
        },
        {
            id: '4',
            type: '기부등록',
            message: '기부가 성공적으로 등록되었습니다!',
            time: '7일 전',
        },
    ]);

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <Layout>
            {/* 헤더 */}
            <View className="flex-row justify-between h-[45px] items-center">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" resizeMode="contain" />
                </TouchableOpacity>
                <View className="items-left justify-center flex-1 ml-2">
                    <Text className="font-inter font-bold text-[24px]">알림</Text>
                </View>
                <TouchableOpacity onPress={clearNotifications}>
                    <Image source={require('@/assets/delete.png')} className="w-8 h-8" resizeMode="contain" />
                </TouchableOpacity>
            </View>

            {/* 알림 목록 */}
            <ScrollView className="mt-5">
                {notifications.length === 0 ? (
                    <Text className="text-center text-gray-400">알림이 없습니다.</Text>
                ) : (
                    notifications.map(item => <NotificationItem key={item.id} type={item.type} message={item.message} time={item.time} />)
                )}
            </ScrollView>
        </Layout>
    );
}
