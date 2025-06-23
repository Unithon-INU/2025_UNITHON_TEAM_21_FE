import {ChildrenCenterList} from '@/types/ChildrenCenter';
import {useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export default function Button({data}: {data: ChildrenCenterList}) {
    const navigation = useNavigation() as any;
    return (
        <View className="flex flex-row justify-between px-8 py-6 border-t border-bg-gray">
            <TouchableOpacity
                className="w-[150px] bg-main-color py-3 rounded-xl flex flex-row items-center justify-center gap-2"
                onPress={() => navigation.navigate('remittance', {name: data.centerName, id: data.id})}>
                <Image className="w-6 h-6" source={require('@/assets/getCash.png')} />
                <Text className="text-base font-bold text-center text-white">기부하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="w-[150px] bg-font-black py-3 rounded-xl flex flex-row items-center justify-center gap-2"
                onPress={() => navigation.goBack()}>
                <Image className="w-6 h-6" source={require('@/assets/chatIcon.png')} />
                <Text className="text-base font-bold text-center text-white">채팅하기</Text>
            </TouchableOpacity>
        </View>
    );
}
