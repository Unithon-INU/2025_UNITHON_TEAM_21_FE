// src/components/NotificationItem.tsx
import React from 'react';
import {View, Text, Image} from 'react-native';

interface NotificationItemProps {
  icon: any;
  title: string;
  timeAgo: string;
  boldText?: string;
}

export default function NotificationItem({icon, title, timeAgo, boldText}: NotificationItemProps) {
  return (
    <View className="flex-row items-center justify-between mb-2">
      <View className="flex-row items-center">
        <Image source={icon} className="w-6 h-6 mr-2" />
        <View>
          <Text className="text-gray-400 text-xs"></Text>
          <Text className="text-black text-sm">{title}</Text>
          {boldText && <Text className="text-xs font-bold text-black">{boldText}</Text>}
        </View>
      </View>
      <Text className="text-xs text-gray-400">{timeAgo}</Text>
    </View>
  );
}
