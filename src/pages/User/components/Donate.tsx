import {View, Text, ScrollView} from 'react-native';

import {formatDonationDate, today} from '@/utils/formatDate';
import {useUserBill, useUserTotalDonation} from '@/hook/api/useDonation';

import Layout from '@/components/Layout';
import AnimatedNumber from '@/components/animation/AnimatedNumber';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import Loading from '@/components/Loading';

export default function UserDonate() {
    const {items, loading: billLoading} = useUserBill();
    const {item: totalDonation, loading: totalLoading} = useUserTotalDonation();

    if (billLoading || totalLoading) return <Loading />;

    return (
        <Layout>
            <HeaderBackButton>기부내역</HeaderBackButton>
            <ScrollView className="flex-1">
                <View className="items-center px-3 w-full">
                    <View className="py-3 w-full">
                        <Text className="text-[20px] font-bold text-font-black mb-2 text-left">기봉사와 함께하신 기부금</Text>
                        <View className="flex-row justify-center items-end py-5 bg-white">
                            <AnimatedNumber className="text-4xl font-bold text-main-color" value={totalDonation.totalDonation} />
                            <Text className="ml-1 mb-[2px] text-[20px] font-semibold text-main-color">원</Text>
                        </View>
                        <Text className="ml-32 text-xs font-normal text-center text-font-gray">{today()} 기준</Text>
                    </View>

                    <Text className="text-[20px] text-font-black font-bold py-3">기부금 영수증</Text>

                    <View className="h-[1px] bg-main-gray w-full mb-4" />

                    {items ? (
                        items.map(item => (
                            <View className="flex-col pb-1 mx-3 mb-3 w-full bg-white border-b border-main-gray" key={item.donationId}>
                                <View key={item.donationId} className="flex-row justify-between items-center py-3">
                                    <Text className="flex-1 text-lg font-bold truncate text-font-black" numberOfLines={1}>
                                        {item.status === 'PENDING' ? (
                                            <Text className="text-[#9E9E9E]">승인 대기중</Text>
                                        ) : (
                                            <Text className="text-main-color">승인됨</Text>
                                        )}{' '}
                                        | {item.organization}
                                    </Text>
                                    <Text className="text-lg font-bold text-font-black">{item.amount.toLocaleString()}원</Text>
                                </View>
                                <Text className="text-xs text-end text-font-gray">기부일 : {formatDonationDate(item.donatedAt)}</Text>
                            </View>
                        ))
                    ) : (
                        <View className="flex-1 justify-center items-center py-10">
                            <Text className="text-base font-semibold text-font-gray">아직 기부 내역이 없습니다.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </Layout>
    );
}
