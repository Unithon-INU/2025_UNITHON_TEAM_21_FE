import React from 'react';
import {ScrollView} from 'react-native';
import NotificationItem from '@/components/NotificationItem';

export default function NotificationScreen() {
  return (
    <ScrollView className="p-5 bg-white flex-1">
      <NotificationItem
        icon={require('@/assets/recommend.png')}
        title="이번주 인기 봉사활동을 확인해보세요!"
        timeAgo="3일 전"
      />
      <NotificationItem
        icon={require('@/assets/callender.png')}
        title="다가오는 봉사활동 일정에 참여여해보세요!"
        timeAgo="3일 전"
        boldText="3건 더보기"
      />
    </ScrollView>
  );
}
