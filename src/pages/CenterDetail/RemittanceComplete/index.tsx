import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export default function Commit() {
    const navigation = useNavigation();
    const route = useRoute();
    const {name, value} = route.params as {name: string; value: string};

    const handleExit = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'main'}],
            }),
        );
    };

    return (
        <View className="flex flex-col h-full gap-3 px-5">
            <View className="flex flex-row items-center py-4">
                <TouchableOpacity onPress={handleExit}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
            </View>
            <View className="flex flex-col items-center justify-center flex-1 gap-1">
                <Text className="text-3xl font-semibold text-font-black">
                    <Text className="text-3xl font-semibold text-main-color">{name}</Text>
                    으로
                </Text>
                <Text className="text-3xl font-semibold text-font-black">{Number(value).toLocaleString()}원을 기부했어요</Text>
                <Text className="text-3xl font-semibold text-font-black">감사합니다!</Text>
                <TouchableOpacity className="px-3 py-2 mt-4 rounded-lg bg-bg-gray">
                    <Text className="text-font-black">기부증서 받기</Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-col mb-16">
                <TouchableOpacity className="flex flex-row items-center justify-center w-full py-4 mt-6 rounded-xl bg-main-color" onPress={handleExit}>
                    <Text className="text-xl font-semibold text-white">확인</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
