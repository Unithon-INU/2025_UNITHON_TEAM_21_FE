import {Text, View} from 'react-native';

export default function DonationStatus() {
    const target = (Math.floor(Math.random() * 201) + 100) * 10000; // 1,000,000~3,000,000 KRW
    const current = (Math.floor(Math.random() * 491) + 10) * 10000; // 100,000~5,000,000 KRW
    const percent = Math.min(Math.floor((current / target) * 100), 999);
    return (
        <View className="flex flex-col gap-1">
            <Text className="font-semibold text-font-gray ">Amount Raised</Text>
            <View className="flex flex-row justify-between">
                <Text className="text-base font-semibold text-font-black">{current.toLocaleString()} KRW</Text>
                <Text className="text-base font-semibold text-main-color">{percent}%</Text>
            </View>
            <View className="w-full h-1 overflow-hidden rounded-full bg-bg-gray">
                <View className="h-full bg-main-color" style={{width: `${Math.min(percent, 100)}%`}} />
            </View>
            <Text className="text-base font-semibold">
                Target Amount: <Text className="text-main-color">{target.toLocaleString()} KRW</Text>
            </Text>
        </View>
    );
}
