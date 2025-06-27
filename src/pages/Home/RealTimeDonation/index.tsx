import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import {KakaoMapAddress} from '@/components/KakaoMap';
import {useNavigation} from '@react-navigation/native';
import {ChildrenCenterList} from '@/types/ChildrenCenter';
import {useCenter, useInquiryCenter} from '@/hook/api/useCenter';

import Loading from '@/components/Loading';
import {daysLeft} from '@/utils/formatDate';

function Item({data}: {data: ChildrenCenterList}) {
    const {item, loading: TotalLoading} = useInquiryCenter(Number(data.id));
    const percent = Math.floor((item.totalReceivedAmount / item.donationGoalAmount) * 100);
    const navigation = useNavigation() as any;
    if (TotalLoading) return null;

    return (
        <View className="flex flex-col gap-2 pb-4 mb-4 border-b border-gray-200">
            <View className="flex flex-row gap-2">
                <KakaoMapAddress className="relative w-[120px] h-[120px] bg-bg-gray rounded-xl" location={data.address} name={data.centerName} />
                <TouchableOpacity className="flex flex-1 justify-between" onPress={() => navigation.navigate('centerDetail', {id: data.id})}>
                    <View className="flex gap-1 py-2">
                        <Text className="text-base font-semibold text-font-black">{data.centerName}</Text>
                        <Text className="text-sm font-semibold text-font-gray">{data.address}</Text>
                    </View>
                    <View className="flex gap-2">
                        <View className="flex flex-row gap-1 justify-between items-baseline">
                            <View className="flex flex-row gap-1 items-baseline">
                                <Text className="text-lg font-semibold text-main-color">{percent}%</Text>
                                <Text className="text-sm font-semibold text-font-gray">{item.donationGoalAmount.toLocaleString()}원</Text>
                            </View>
                            <Text className="text-sm font-semibold text-font-black">{daysLeft()}일 남음</Text>
                        </View>
                        <View className="overflow-hidden w-full h-1 rounded-full bg-bg-gray">
                            <View className="h-full bg-main-color" style={{width: `${Math.min(percent, 100)}%`}} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default function RealTimeDonation() {
    const {centerData, loading, fetchMore, isFetchingMore, hasMore} = useCenter(5);
    if (loading) return <Loading />;
    return (
        <>
            <HeaderBackButton px={true}>실시간 기부현황</HeaderBackButton>
            <FlatList
                data={centerData}
                renderItem={({item}) => <Item data={item} />}
                keyExtractor={item => item.id.toString()}
                onEndReached={() => {
                    if (hasMore && !isFetchingMore) fetchMore();
                }}
                contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 20}}
            />
        </>
    );
}
