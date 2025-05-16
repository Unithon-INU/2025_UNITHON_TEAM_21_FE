import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Layout from '../Layout';
import NotificationItem from '@/pages/Notification/components/NotificationItem';

export default function NotificationScreen() {
    const navigation = useNavigation();

    // Manage notification data in state.
    // In a real app, you might fetch this from a server or local storage.
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            type: 'Recommended Volunteer',
            message: 'Check out this week’s most popular volunteer activities!',
            time: '3 days ago',
        },
        {
            id: '2',
            type: 'Donation Delivered',
            message: 'Your first donation has been delivered! Thank you 💛',
            time: '3 days ago',
        },
        {
            id: '3',
            type: 'Volunteer Schedule',
            message: 'Join the upcoming volunteer schedule!',
            time: '5 days ago',
        },
        {
            id: '4',
            type: 'Donation Registered',
            message: 'Your donation has been successfully registered!',
            time: '7 days ago',
        },
    ]);

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <Layout>
            {/* Header */}
            <View className="flex-row justify-between h-[45px] items-center">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" resizeMode="contain" />
                </TouchableOpacity>
                <View className="justify-center flex-1 ml-2 items-left">
                    <Text className="font-inter font-bold text-[24px]">Notifications</Text>
                </View>
                <TouchableOpacity onPress={clearNotifications}>
                    <Image source={require('@/assets/delete.png')} className="w-8 h-8" resizeMode="contain" />
                </TouchableOpacity>
            </View>

            {/* Notification List */}
            <ScrollView className="mt-5">
                {notifications.length === 0 ? (
                    <Text className="text-center text-gray-400">No notifications.</Text>
                ) : (
                    notifications.map(item => <NotificationItem key={item.id} type={item.type} message={item.message} time={item.time} />)
                )}
            </ScrollView>
        </Layout>
    );
}
