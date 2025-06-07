import React from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {toggleLike} from '@/store/slice/likedSlice';
import Layout from '../../components/Layout';
import {formatDate} from '@/utils/formatDate';
import HeaderBackButton from '@/components/button/HeaderBackButton';

function getDaysLeft(dateNumber: number) {
    const dateStr = String(dateNumber);
    const endDate = new Date(`${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`);
    const today = new Date();
    endDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function VolunteerItem({item}: {item: any}) {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const likedList = useSelector((state: any) => state.liked.likedList);
    const isLiked = likedList.some((v: any) => v.progrmRegistNo === item.progrmRegistNo);

    const deadline = getDaysLeft(item.noticeEndde);

    return (
        <TouchableOpacity className="flex gap-0.5 mb-4" onPress={() => navigation.navigate('volunteerDetail', {progrmRegistNo: item.progrmRegistNo})}>
            {/* 제목 + 하트 */}
            <View className="flex flex-row justify-between">
                <Text className="flex-1 text-xl font-semibold text-font-black" numberOfLines={2}>
                    {item.progrmSj}
                </Text>
                <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color="#FFB257" onPress={() => dispatch(toggleLike(item))} />
            </View>

            {/* 모집 상태 */}
            <Text className="font-semibold text-[#FFB257]">
                모집중
                {deadline === 0 ? ' | 오늘 마감' : deadline > 0 ? ` | ${deadline}일 남음` : ''}
            </Text>

            {/* 상세정보 */}
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

export default function UserLikedVolunteerList() {
    const likedList = useSelector((state: any) => state.liked.likedList);

    return (
        <Layout>
            <HeaderBackButton>관심 봉사활동</HeaderBackButton>
            <Text className="mb-2 text-xl font-bold text-font-black">
                총 <Text className="text-main-color">{likedList.length}</Text>건
            </Text>

            {/* 리스트 */}
            <ScrollView>
                {likedList.length === 0 ? (
                    <Text className="mt-10 text-lg font-semibold text-center text-font-black">
                        좋아요 한 <Text className="text-main-color">봉사활동</Text>이 없습니다.
                    </Text>
                ) : (
                    likedList.map((item: any) => <VolunteerItem key={item.progrmRegistNo} item={item} />)
                )}
            </ScrollView>
        </Layout>
    );
}
