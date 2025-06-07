import {KakaoMapAddress} from '@/components/KakaoMap';
import {ChildrenCenterList} from '@/types/ChildrenCenter';
import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';

export default function CenterItem({item}: {item: ChildrenCenterList}) {
    const navigate = useNavigation() as any;

    return (
        <View className="flex flex-row gap-2 pb-4 mb-4 border-b border-main-gray">
            <KakaoMapAddress className="w-[120px] h-[120px]" location={item.address} name={item.centerName} />
            <TouchableOpacity className="flex flex-1 gap-1 " onPress={() => navigate.navigate('centerDetail', {id: item.id})}>
                <Text className="text-base font-bold text-font-black">
                    <Text className="text-main-color">{item.city} </Text>| {item.centerName}
                </Text>
                <Text className="text-sm font-semibold text-font-gray" numberOfLines={1}>
                    {item.address}
                </Text>
                <Text className="text-sm font-semibold text-font-gray">{item.phoneNumber}</Text>
                <Text className="text-sm font-semibold text-font-gray">아동수 : {item.chidrenNumber}명</Text>
                <Text className="text-sm font-semibold text-font-gray">봉사자 : {item.volunter}명</Text>
            </TouchableOpacity>
        </View>
    );
}
