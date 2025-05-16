import React from 'react';
import {View, Text, Image} from 'react-native';

interface NotificationItemProps {
    type: string;
    message: string;
    time: string;
    subtext?: string;
}

const ICON_MAP: Record<string, any> = {
    'Recommended Volunteer': require('@/assets/recommend.png'),
    'Volunteer Schedule': require('@/assets/calender.png'),
    'Donation Delivered': require('@/assets/thanksdonate.png'),
    'Donation Registered': require('@/assets/confirmdonate.png'),
};

export default function NotificationItem({type, message, time, subtext}: NotificationItemProps) {
    return (
        <View className="flex-row items-start mb-6">
            {/* Icon */}
            <Image source={ICON_MAP[type]} className="w-8 h-8 mr-3" />

            {/* Message */}
            <View className="flex-1">
                <View className="flex-row items-start justify-between">
                    <Text className="text-[13px] text-gray-400">{type}</Text>
                    <Text className="text-[12px] text-gray-400">{time}</Text>
                </View>
                <Text className="text-[14px] mt-1">{message}</Text>
                {subtext && <Text className="text-[12px] font-bold mt-1">{subtext}</Text>}
            </View>
        </View>
    );
}
