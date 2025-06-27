import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleCenterLike} from '@/store/slice/likedCenterSlice';
import {RootState} from '@/store/store';
import {ChildrenCenterList} from '@/types/ChildrenCenter';
import {useCenter, useInquiryCenter, useIsRegister} from '@/hook/api/useCenter';

import {useVolunteerCenterName} from '@/hook/api/useVolunteerData';
import {useGetItemDonation} from '@/hook/api/useItemDonation';

import {KakaoMapAddress} from '@/components/KakaoMap';
import {ColWrapper} from '@/components/layout/ContentWrapper';
import Layout from '@/components/Layout';
import DonationStatus from './components/DonationStatus';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '@/components/Loading';
import List from './components/List';
import Activity from './components/Activity';
import Error from '@/components/Error';
import {API_URL} from '@env';

export default function CenterDetail() {
    const route = useRoute();
    const {id} = route.params as {id: number};
    const navigation = useNavigation() as any;
    const dispatch = useDispatch();
    const likedList = useSelector((state: RootState) => state.likedCenter.likedList);
    const {centerData, loading} = useCenter(180);

    // Retrieve user from Redux store (adjust selector as needed)
    const user = useSelector((state: RootState) => state.user);

    const data = centerData.find((item: ChildrenCenterList) => item.id === id);
    const {items, loading: activityLoading} = useVolunteerCenterName(data?.centerName);

    const isLiked = data ? likedList.some((item: ChildrenCenterList) => data.centerName === item.centerName) : false;
    const handleLikeToggle = () => {
        if (data) {
            dispatch(
                toggleCenterLike({
                    ...data,
                }),
            );
        }
    };

    const {item: centerItem, loading: centerLoading} = useInquiryCenter(id);
    const {items: itemDonation, loading: itemsLoading} = useGetItemDonation(id);
    const {item: isRegister, loading: registerLoading} = useIsRegister(id);

    if (loading || activityLoading || itemsLoading || registerLoading || centerLoading) return <Loading />;
    if (!data) return <Error text="센터 정보를 찾을 수 없습니다." />;

    const handleChatStart = async () => {
        const senderId = user.profile?.id;
        const targetId = data.id; // 센터의 id
        // console.log(senderId, targetId);
        try {
            const res = await fetch(`${API_URL}/api/chatroom/get-or-create?userId=${senderId}&organizationId=${targetId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.token?.accessToken}`,
                },
            });
            console.log(res);
            console.log('📥 status:', res.status);
            const { chatRoomId } = await res.json();
            console.log(chatRoomId);
            navigation.navigate('ChatRoom', {
                chatRoomId,
                targetName: data.centerName,
            });
            console.log(chatRoomId);
        } catch (error) {
            console.error('❌ 채팅방 생성 실패:', error);
        }
    };
    return (
        <>
            <View className="flex flex-row justify-between items-center px-4">
                <HeaderBackButton className="flex-1">{data.centerName}</HeaderBackButton>
                <TouchableOpacity
                    className={`flex flex-row items-center px-2 py-1 rounded-2xl ${isLiked ? 'bg-main-color' : 'border border-main-color'}`}
                    onPress={handleLikeToggle}>
                    <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={20} color={isLiked ? '#FFFFFF' : '#FFB257'} />
                    <Text className={`ml-1 font-semibold ${isLiked ? 'text-white' : 'text-main-color'}`}>팔로우</Text>
                </TouchableOpacity>
            </View>

            <Layout>
                {!isRegister && (
                    <View className="p-5 bg-gray-100 rounded-lg">
                        <Text className="mb-4 text-lg font-bold text-main-color">아직 기봉사에 등록되지 않은 센터에요!</Text>
                        <Text className="mb-1 text-base font-bold text-font-black">아래의 기능을 사용할 수 없어요</Text>
                        <Text className="text-sm leading-5 text-font-gray">기부하기, 채팅하기를 사용할 수 없어요.</Text>
                        <Text className="text-sm leading-5 text-font-gray">모인금액을 확인할 수 없어요.</Text>
                    </View>
                )}
                {data && <KakaoMapAddress className="w-full h-[240px]" location={data.address} name={data.centerName} />}
                <ColWrapper title="오시는 길">
                    <Text className="text-base font-semibold text-font-black">
                        {data?.address}
                        {data?.distance !== Infinity && data?.distance
                            ? ` (${data.distance >= 1000 ? `${(data.distance / 1000).toFixed(1)}km` : `${data.distance.toFixed(0)}m`})`
                            : ''}
                    </Text>
                </ColWrapper>
                <DonationStatus data={centerItem} />
                <Activity items={items} />
                <List items={itemDonation} />
            </Layout>
            <View className="flex flex-row justify-between px-8 py-6 border-t border-bg-gray">
                <TouchableOpacity
                    className={`w-[150px] py-3 rounded-xl flex flex-row items-center justify-center gap-2 ${isRegister ? 'bg-main-color' : 'bg-main-gray'}`}
                    onPress={() => navigation.navigate('donationCheck', {name: data.centerName, id})}>
                    <Image className="w-6 h-6" source={require('@/assets/getCash.png')} />
                    <Text className="text-base font-bold text-center text-white">기부하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex flex-row gap-2 justify-center items-center py-3 rounded-xl w-[150px] bg-font-black ${
                        isRegister ? 'bg-font-black' : 'bg-main-gray'
                    }`}
                    onPress={handleChatStart}
                >
                    <Image className="w-6 h-6" source={require('@/assets/chatIcon.png')} />
                    <Text className="text-base font-bold text-center text-white">채팅하기</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
