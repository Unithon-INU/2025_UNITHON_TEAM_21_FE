import React from 'react';
import {FlatList, Text, View} from 'react-native';

import {useCenterTotalDonation, useInquiryDonation} from '@/hook/api/useDonation';
import {DonationInquiry} from '@/types/DonationType';
import {formatDonationDate, today} from '@/utils/formatDate';

import Loading from '@/components/Loading';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import AnimatedNumber from '@/components/animation/AnimatedNumber';
import {useRoute} from '@react-navigation/native';

function Item(item: DonationInquiry) {
    return (
        <View className="p-4 bg-white border-b border-main-gray" key={item.donationId}>
            <View className="flex-row items-center">
                <View className="flex-1">
                    <Text className="text-base font-bold text-font-black">
                        {item.donorNickName} 님 |{' '}
                        {item.status === 'PENDING' ? <Text className="text-main-color">승인 대기중</Text> : <Text className="text-[#9E9E9E]">승인됨</Text>}
                    </Text>
                    <Text className="mt-1 text-base text-font-black">
                        기부금액 : <Text className="font-semibold text-main-color"> {item.amount.toLocaleString()}원</Text>
                    </Text>
                    <Text className="mt-1 text-xs text-font-gray">기부일 : {formatDonationDate(item.donatedAt)}</Text>
                </View>
            </View>
        </View>
    );
}
export default function CenterDonationAll() {
    const route = useRoute();
    const {id} = route.params as {id: number};
    const {items, loading} = useInquiryDonation(id);
    const {total, loading: TotalLoading} = useCenterTotalDonation(id);

    if (loading || TotalLoading) return <Loading />;
    return (
        <>
            <HeaderBackButton px={true}>전체 기부목록</HeaderBackButton>
            <View className="px-5 py-3 mb-6">
                <Text className="mb-5 text-xl font-semibold text-left text-font-black">누적 기부금</Text>
                <View className="flex-row justify-center items-end mb-2.5">
                    <AnimatedNumber className="text-4xl font-semibold text-center text-main-color" value={total.totalAmount} />
                    <Text className="mb-1 ml-1 text-base font-semibold text-main-color">원</Text>
                </View>
                <Text className="ml-32 text-xs font-normal text-center text-font-gray">{today()} 기준</Text>
            </View>
            <FlatList
                className="px-5"
                contentContainerStyle={{paddingBottom: 60}}
                data={items}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({item}) => Item(item)}
                ListEmptyComponent={<Text className="text-base font-semibold text-center text-font-gray">기부 정보가 없습니다.</Text>}
            />
        </>
    );
}
