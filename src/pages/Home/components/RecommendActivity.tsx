import {useState} from 'react';
import {Text, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function RecommendActivity() {
    const [like, setLike] = useState(false);
    return (
        <View className="flex gap-0.5x">
            <View className="flex flex-row justify-between ">
                <Text className="flex-1 text-xl font-semibold text-font-black" numberOfLines={2}>
                    [제주도서관 4월 주말 오후] 본관 도서정리 및 안--------내
                </Text>
                {like ? (
                    <Ionicons name="heart" size={30} color={'#FFB257'} onPress={() => setLike(false)} />
                ) : (
                    <Ionicons name="heart-outline" size={30} color={'#FFB257'} onPress={() => setLike(true)} />
                )}
            </View>
            <Text className="font-semibold text-main-color">마감 4일 남음</Text>
            <Text className="font-semibold text-font-gray">봉사장소 제주도서관 1층</Text>
            <Text className="font-semibold text-font-gray">모집기간 2025.03.29 ~ 2025.04.25</Text>
            <Text className="font-semibold text-font-gray">봉사일시 2025.03.29 ~ 2025.04.25</Text>
            <Text className="font-semibold text-font-gray">소요시간 09:00 ~ 14:00 (5시간)</Text>
        </View>
    );
}
