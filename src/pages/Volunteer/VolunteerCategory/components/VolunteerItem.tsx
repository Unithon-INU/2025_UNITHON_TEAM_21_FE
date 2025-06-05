import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getVltrSearchWordListItem } from '@/types/volunteerTyps';
import { formatDate } from '@/utils/formatDate';
import { useLikedVolunteer } from '../../../User/Likedvol'; 

const STATUS_TEXT: Record<number, string> = {
  1: '모집대기',
  2: '모집중',
  3: '모집완료',
};

const STATUS_COLOR: Record<number, string> = {
  1: '#E0E0E0',
  2: '#FFB257',
  3: '#9E9E9E',
};

function getDaysLeft(dateNumber: number) {
  const dateStr = String(dateNumber);
  const endDate = new Date(`${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`);
  const today = new Date();
  endDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function VolunteerItem({ item }: { item: getVltrSearchWordListItem }) {
  const navigation = useNavigation<any>();
  const deadline = getDaysLeft(item.noticeEndde);

  const { likedList, toggleLike } = useLikedVolunteer();
  const isLiked = likedList.some(v => v.progrmRegistNo === item.progrmRegistNo);

  return (
    <TouchableOpacity
      className="flex gap-0.5 mb-4"
      onPress={() => navigation.navigate('volunteerDetail', { progrmRegistNo: item.progrmRegistNo })}
    >
      {/* 제목 + 하트 */}
      <View className="flex flex-row justify-between">
        <Text className="flex-1 text-xl font-semibold text-font-black" numberOfLines={2}>
          {item.progrmSj}
        </Text>
        <Ionicons
          name={isLiked ? 'heart' : 'heart-outline'}
          size={24}
          color="#FFB257"
          onPress={() => toggleLike(item)}
        />
      </View>

      {/* 모집 상태 */}
      <Text className="font-semibold" style={{ color: STATUS_COLOR[item.progrmSttusSe] || '#000' }}>
        {STATUS_TEXT[item.progrmSttusSe] || ''}
        {item.progrmSttusSe === 2
          ? deadline === 0
            ? ' | 오늘 마감'
            : deadline > 0
            ? ` | ${deadline}일 남음`
            : ''
          : ''}
      </Text>

      {/* 상세 정보 */}
      <Text className="font-semibold text-font-gray">봉사장소 {item.nanmmbyNm}</Text>
      <Text className="font-semibold text-font-gray">
        모집기간 {formatDate(item.noticeBgnde)} ~ {formatDate(item.noticeEndde)}
      </Text>
      <Text className="font-semibold text-font-gray">
        봉사일시 {formatDate(item.progrmBgnde)} ~ {formatDate(item.progrmEndde)}
      </Text>
      <Text className="font-semibold text-font-gray">
        소요시간 {item.actBeginTm}:00 ~ {item.actEndTm}:00 ({item.actEndTm - item.actBeginTm}시간)
      </Text>
    </TouchableOpacity>
  );
}
