import {ColWrapper} from '@/components/layout/ContentWrapper';
import {useState} from 'react';
import {Text, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

function Item() {
    const percentage = 210;
    const [like, setLike] = useState(false);
    return (
        <View className="flex flex-col gap-2">
            <View className="flex flex-row gap-2">
                <View className="relative w-[120px] h-[120px] bg-bg-gray rounded-xl">
                    {like ? (
                        <Ionicons name="heart" size={30} className="absolute bottom-2 right-2" color={'#FFB257'} onPress={() => setLike(false)} />
                    ) : (
                        <Ionicons name="heart-outline" size={30} className="absolute bottom-2 right-2" color={'#FFB257'} onPress={() => setLike(true)} />
                    )}
                </View>
                <View className="flex justify-between flex-1">
                    <View className="flex gap-1 py-2">
                        <Text className="text-xl font-semibold text-font-black">검단지역아동센터</Text>
                        <Text className="text-sm font-semibold text-font-gray">인천 서구 검단로501번길 69</Text>
                    </View>
                    <View className="flex gap-2">
                        <View className="flex flex-row items-baseline justify-between gap-1">
                            <View className="flex flex-row items-baseline gap-1">
                                <Text className="text-xl font-semibold text-main-color">{percentage}%</Text>
                                <Text className="text-sm font-semibold text-font-gray">210,000원</Text>
                            </View>
                            <Text className="font-semibold text-font-black">4일 남음</Text>
                        </View>
                        <View className="w-full h-1 overflow-hidden bg-gray-200 rounded-full">
                            <View className="h-full bg-main-color" style={{width: `${Math.min(percentage, 100)}%`}} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default function DonationItem() {
    return (
        <ColWrapper title="실시간 기부현황">
            <Item />
            <Item />
        </ColWrapper>
    );
}
