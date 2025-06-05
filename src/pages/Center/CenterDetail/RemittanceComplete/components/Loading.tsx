import {CommonActions, useNavigation} from '@react-navigation/native';
import {ActivityIndicator, Image, Text, TouchableOpacity, View} from 'react-native';

export default function Loading({name, value}: {name: string; value: string}) {
    const navigation = useNavigation() as any;
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
                <ActivityIndicator size={60} className="pb-6 text-main-color" />
                <Text className="text-3xl font-semibold text-font-black">
                    <Text className="text-3xl font-semibold text-main-color">{name}</Text>
                    으로
                </Text>
                <Text className="text-3xl font-semibold text-font-black">{Number(value).toLocaleString()}원을</Text>
                <Text className="text-3xl font-semibold text-font-black">기부할게요</Text>
                <TouchableOpacity className="px-3 py-2 mt-4 rounded-lg">
                    <Text className="text-font-black"> </Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-col mb-16">
                <TouchableOpacity className="flex flex-row items-center justify-center w-full py-4 mt-6 rounded-xl " onPress={handleExit}>
                    <Text className="text-xl font-semibold text-white"> </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
