import {Text, View} from 'react-native';

import {CenterTotalDonation} from '@/types/DonationType';

import {ColWrapper} from '@/components/layout/ContentWrapper';
import AnimatedNumber from '@/components/animation/AnimatedNumber';

export default function DonationStatus({data}: {data: CenterTotalDonation}) {
    const target = 100000;
    const percent = Math.floor((data.totalAmount / target) * 100);

    return (
        <ColWrapper title="기부 현황">
            <View className="flex flex-col gap-1">
                <Text className="font-semibold text-font-gray">모인금액</Text>
                <View className="flex flex-row justify-between">
                    <Text className="text-base font-semibold text-font-black">{data.totalAmount.toLocaleString()}원</Text>
                    <Text className="text-base font-semibold text-main-color">{percent}%</Text>
                </View>
                <View className="overflow-hidden w-full h-1 rounded-full bg-bg-gray">
                    <View className="h-full bg-main-color" style={{width: `${Math.min(percent, 100)}%`}} />
                </View>
                <Text className="text-base font-semibold text-font-black">
                    목표 기부금 : <AnimatedNumber className="text-main-color" value={target} duration={1500} />
                    <Text className="text-main-color">원</Text>
                </Text>
            </View>
        </ColWrapper>
    );
}
