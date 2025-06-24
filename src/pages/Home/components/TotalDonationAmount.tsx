import AnimatedNumber from '@/components/animation/AnimatedNumber';
import {View, Text} from 'react-native';

export default function TotalDonationAmount() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    return (
        <View className="mb-6">
            <Text className="mb-5 text-xl font-semibold text-left text-font-black">기봉사로 모은 총 기부금</Text>
            <View className="flex-row justify-center items-end py-6">
                <AnimatedNumber className="text-4xl font-semibold text-center text-main-color" value={28923200} />
                <Text className="mb-1 ml-1 text-base font-semibold text-main-color">원</Text>
            </View>
            <Text className="ml-32 text-xs font-normal text-center text-font-gray">{formattedDate} 기준</Text>
        </View>
    );
}
