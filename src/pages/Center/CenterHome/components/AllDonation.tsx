import React from 'react';
import {Text, View} from 'react-native';
import {ColWrapper} from '@/components/layout/ContentWrapper';
import {DonationInquiry} from '@/types/DonationType';
import {formatDonationDate} from '@/utils/formatDate';

export default function Waiting({items, id}: {items: DonationInquiry[]; id: number}) {
    if (!items || items.length === 0) {
        return (
            <ColWrapper title="전체 기부목록">
                <View className="mb-10">
                    <Text className="text-base font-semibold text-font-gray">{'아직 기부하신 분이 안 계시네요...\n저희가 열심히 찾고있어요!'}</Text>
                </View>
            </ColWrapper>
        );
    }

    return (
        <ColWrapper title="전체 기부목록" href="CenterDonationAll" param={{id}}>
            {items.slice(0, 3).map((item, idx) => (
                <View className={`py-4 bg-white ${idx === 2 ? '' : 'border-b border-main-gray'}`} key={item.donationId}>
                    <View className="flex-row items-center">
                        <View className="flex-1">
                            <Text className="text-base font-bold text-font-black">
                                {item.donorNickName} 님 |{' '}
                                {item.status === 'PENDING' ? (
                                    <Text className="text-main-color">승인 대기중</Text>
                                ) : (
                                    <Text className="text-[#9E9E9E]">승인됨</Text>
                                )}
                            </Text>
                            <Text className="mt-1 text-base text-font-black">
                                기부금액 : <Text className="font-semibold text-main-color"> {item.amount.toLocaleString()}원</Text>
                            </Text>
                            <Text className="mt-1 text-xs text-font-gray">기부일 : {formatDonationDate(item.donatedAt)}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </ColWrapper>
    );
}
