import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleLike } from '@/store/slice/likedSlice';
import Layout from '../../components/Layout';
import { formatDate } from '@/utils/formatDate';

function getDaysLeft(dateNumber: number) {
  const dateStr = String(dateNumber);
  const endDate = new Date(`${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`);
  const today = new Date();
  endDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function VolunteerItem({ item }: { item: any }) {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const likedList = useSelector((state: RootState) => state.liked.likedList);
  const isLiked = likedList.some(v => v.progrmRegistNo === item.progrmRegistNo);

  const deadline = getDaysLeft(item.noticeEndde);

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
          onPress={() => dispatch(toggleLike(item))}
        />
      </View>

      {/* 모집 상태 */}
      <Text className="font-semibold text-[#FFB257]">
        모집중
        {deadline === 0 ? ' | 오늘 마감' : deadline > 0 ? ` | ${deadline}일 남음` : ''}
      </Text>

      {/* 상세정보 */}
      <Text className="font-semibold text-font-gray">봉사장소 {item.nanmmbyNm}</Text>
      <Text className="font-semibold text-font-gray">모집기간 {formatDate(item.noticeBgnde)} ~ {formatDate(item.noticeEndde)}</Text>
      <Text className="font-semibold text-font-gray">봉사일시 {formatDate(item.progrmBgnde)} ~ {formatDate(item.progrmEndde)}</Text>
      <Text className="font-semibold text-font-gray">
        소요시간 {item.actBeginTm}:00 ~ {item.actEndTm}:00 ({item.actEndTm - item.actBeginTm}시간)
      </Text>
    </TouchableOpacity>
  );
}

export default function UserLikedVolunteerList() {
  const navigation = useNavigation<any>();
  const likedList = useSelector((state: RootState) => state.liked.likedList);

  return (
    <Layout>
      {/* 상단바 */}
      <View className="flex-row items-center pb-4 space-x-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
        </TouchableOpacity>
        <Text className="font-inter font-bold text-[20px]">관심 봉사활동</Text>
      </View>

      {/* 전체 건수 */}
      <Text className="px-2 mb-3 text-sm text-font-black">전체 {likedList.length}건</Text>

      {/* 리스트 */}
      <ScrollView className="px-2">
        {likedList.length === 0 ? (
          <Text className="mt-10 text-center text-font-black">좋아요한 봉사활동이 없습니다.</Text>
        ) : (
          likedList.map((item: any) => <VolunteerItem key={item.progrmRegistNo} item={item} />)
        )}
      </ScrollView>
    </Layout>
  );
}
