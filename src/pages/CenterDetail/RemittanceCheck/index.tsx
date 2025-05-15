import {useNavigation, useRoute} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export default function Commit() {
    const navigation = useNavigation() as any;
    const route = useRoute();
    const {name, value} = route.params as {name: string; value: string};

    return (
        <View className="flex flex-col h-full gap-3 px-5">
            <View className="flex flex-row items-center py-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
            </View>
            <View className="flex flex-col items-center justify-center flex-1 gap-1">
                <Text className="text-3xl font-semibold text-font-black">
                    <Text className="text-main-color">{name}</Text>
                    으로
                </Text>
                <Text className="text-3xl font-semibold text-font-black">{Number(value).toLocaleString()}원을</Text>
                <Text className="text-3xl font-semibold text-font-black">
                    <Text className="text-main-color">후원</Text>할까요?
                </Text>
            </View>
            <View className="flex flex-col mb-16">
                <View className="flex flex-row justify-between py-2">
                    <Text className="text-base font-semibold text-font-gray">받는 분에게 표시</Text>
                    <Text className="text-base font-semibold text-font-black">기부왕</Text>
                </View>
                <View className="flex flex-row justify-between py-2">
                    <Text className="text-base font-semibold text-font-gray">출금 계좌</Text>
                    <Text className="text-base font-semibold text-font-black">기부용 통장</Text>
                </View>
                <TouchableOpacity
                    className="flex flex-row items-center justify-center w-full py-4 mt-6 rounded-xl bg-main-color"
                    onPress={() => navigation.navigate('remittanceComplete', {name, value})}>
                    <Text className="text-xl font-semibold text-white">후원하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
