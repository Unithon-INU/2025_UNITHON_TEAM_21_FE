import {RowWrapper} from '@/components/layout/ContentWrapper';
import {Text, View} from 'react-native';

function Item() {
    return (
        <View className="flex flex-row">
            <View className="flex flex-col gap-1 px-2 py-3 bg-main-color rounded-2xl">
                <Text className="text-base font-semibold text-white">검단지역아동센터</Text>
                <Text className="text-xs font-semibold text-white">인천 서구 검단로501번길 69</Text>
                <Text className="text-xs font-semibold text-white">#꿈나무 #쉼터</Text>
                <Text className="text-xs font-semibold text-white">083)722-1234-5679</Text>
            </View>
        </View>
    );
}
export default function CenterItem() {
    return (
        <RowWrapper title="인천지역아동센터">
            <Item />
            <Item />
            <Item />
        </RowWrapper>
    );
}
