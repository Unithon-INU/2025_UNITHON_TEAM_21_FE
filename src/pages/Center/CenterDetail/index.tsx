import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleCenterLike} from '@/store/slice/likedCenterSlice';

import {ChildrenCenterList} from '@/types/ChildrenCenter';
import {useCenter} from '@/hook/api/useCenter';
import {useVolunteerCenterName} from '@/hook/api/useVolunteerData';
import {RootState} from '@/store/store';

import {KakaoMapAddress} from '@/components/KakaoMap';
import {ColWrapper} from '@/components/layout/ContentWrapper';
import Layout from '@/components/Layout';
import DonationStatus from './components/DonationStatus';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '@/components/Loading';
import List from './components/List';
import Activity from './components/Activity';
import Button from './components/Button';
import Error from '@/components/Error';
import {useCenterTotalDonation} from '@/hook/api/useDonation';
import {useGetItemDonation} from '@/hook/api/useItemDonation';

export default function CenterDetail() {
    const route = useRoute();
    const {id} = route.params as {id: string};
    const dispatch = useDispatch();
    const likedList = useSelector((state: RootState) => state.likedCenter.likedList);
    const {centerData, loading} = useCenter(180);

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
    const {total, loading: TotalLoading} = useCenterTotalDonation(Number(id));
    const {items: itemDonation, loading: itemsLoading} = useGetItemDonation(Number(id));
    if (loading || activityLoading || TotalLoading || itemsLoading) return <Loading />;

    if (!data) return <Error text="센터 정보를 찾을 수 없습니다." />;

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
                {data && <KakaoMapAddress className="w-full h-[240px]" location={data.address} name={data.centerName} />}
                <ColWrapper title="오시는 길">
                    <Text className="text-base font-semibold text-font-black">
                        {data?.address}
                        {data?.distance !== Infinity && data?.distance
                            ? ` (${data.distance >= 1000 ? `${(data.distance / 1000).toFixed(1)}km` : `${data.distance.toFixed(0)}m`})`
                            : ''}
                    </Text>
                </ColWrapper>

                <DonationStatus data={total} />
                <Activity items={items} />
                <List items={itemDonation} />
            </Layout>
            <Button data={data} />
        </>
    );
}
