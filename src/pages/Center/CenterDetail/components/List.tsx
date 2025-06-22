import {View, Text, TouchableOpacity} from 'react-native';
import {ColWrapper} from '@/components/layout/ContentWrapper';

const donationItems = [
    {
        id: '1',
        name: '두루마리 휴지',
        current: 30,
        required: 50,
    },
    {
        id: '2',
        name: '스케치북',
        current: 8,
        required: 20,
    },
    {
        id: '3',
        name: '유아용 기저귀 (L)',
        current: 15,
        required: 40,
    },
];

interface DonationItem {
    item: {
        id: string;
        name: string;
        current: number;
        required: number;
    };
    isLast: boolean;
}
function DonationItemCard({item, isLast}: DonationItem) {
    const progress = item.required > 0 ? (item.current / item.required) * 100 : 0;
    const containerClassName = `p-2 ${isLast ? '' : 'border-b-2 border-bg-gray'}`;
    return (
        <View className={containerClassName}>
            <View className="flex-row justify-between mb-2">
                <Text className="text-base font-semibold text-font-black">{item.name}</Text>
                <Text className="text-base font-semibold text-main-color">{progress}%</Text>
            </View>
            <View className="h-1 overflow-hidden rounded-full bg-bg-gray">
                <View className="h-full bg-main-color" style={[{width: `${progress}%`}]} />
            </View>
            <View className="flex-row items-center justify-between mt-2">
                <Text className="text-font-gray">
                    현재 {item.current}개 / 필요 {item.required}개
                </Text>
                <TouchableOpacity className="px-3 py-1.5 rounded-full bg-main-color" onPress={() => {}}>
                    <Text className="font-bold text-white">기부하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function List() {
    return (
        <ColWrapper title="필요 기부물품">
            {donationItems.length > 0 ? (
                donationItems.map((item, index) => <DonationItemCard key={item.id} item={item} isLast={index === donationItems.length - 1} />)
            ) : (
                <Text className="text-base font-semibold text-font-gray">센터에서 아직 필요한 기부품목이 없어요!</Text>
            )}
        </ColWrapper>
    );
}
