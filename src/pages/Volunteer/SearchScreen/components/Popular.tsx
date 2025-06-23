import {Text, TouchableOpacity, View} from 'react-native';
import {getVltrSearchWordListItem} from '@/types/volunteerTyps';

interface PopularProps {
    items: getVltrSearchWordListItem[] | null;
    onPress: (keyword: string) => void;
}
export default function Popular({items, onPress}: PopularProps) {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    return (
        <View className="py-4">
            <View className="flex flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-font-black">인기 봉사활동</Text>
                <Text className="text-font-gray">{formattedDate} 기준</Text>
            </View>
            <View className="flex overflow-hidden flex-row flex-wrap gap-3 items-center mt-2">
                {items?.slice(0, 5).map((item: getVltrSearchWordListItem, idx: number) => {
                    return (
                        <TouchableOpacity className="flex flex-row items-center mt-1" key={item.progrmSj} onPress={() => onPress(item.progrmSj)}>
                            {idx < 3 ? (
                                <Text className="mr-2 text-base font-semibold text-main-color">{idx + 1}</Text>
                            ) : (
                                <Text className="mr-2 text-base font-semibold text-font-gray">{idx + 1}</Text>
                            )}
                            <Text className="overflow-hidden flex-1 text-base text-font-black" numberOfLines={1}>
                                {item.progrmSj}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
