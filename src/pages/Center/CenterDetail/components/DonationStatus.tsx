import {ColWrapper} from '@/components/layout/ContentWrapper';
import {Text, View} from 'react-native';
import AnimatedNumber from '@/components/animation/AnimatedNumber';
export default function DonationStatus() {
    const target = (Math.floor(Math.random() * 201) + 100) * 10000; // 1,000,000~3,000,000원
    const current = (Math.floor(Math.random() * 491) + 10) * 10000; // 100,000~5,000,000원
    const percent = Math.min(Math.floor((current / target) * 100), 999);
    return (
        <ColWrapper title="기부 현황">
            <View className="flex flex-col gap-1">
                <Text className="font-semibold text-font-gray ">모인금액</Text>
                <View className="flex flex-row justify-between">
                    <Text className="text-base font-semibold text-font-black">{current.toLocaleString()}원</Text>
                    <Text className="text-base font-semibold text-main-color">{percent}%</Text>
                </View>
                <View className="w-full h-1 overflow-hidden rounded-full bg-bg-gray">
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
