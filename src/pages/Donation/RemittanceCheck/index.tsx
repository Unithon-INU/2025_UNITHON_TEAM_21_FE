import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function Commit() {
    const navigation = useNavigation() as any;
    const route = useRoute();
    const {name, value, id} = route.params as {name: string; value: string; id: number};
    const {profile} = useSelector((state: any) => state.user);

    const handleExit = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'main'}, {name: 'remittanceComplete', params: {name, value, id}}],
            }),
        );
    };

    return (
        <View className="flex flex-col gap-3 px-5 h-full">
            <View className="flex flex-row items-center py-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
            </View>
            <View className="flex flex-col flex-1 gap-1 justify-center items-center">
                <Text className="text-3xl font-semibold text-font-black">
                    <Text className="text-3xl font-semibold text-main-color">{name}</Text>
                    으로
                </Text>
                <Text className="text-3xl font-semibold text-font-black">{Number(value).toLocaleString()}원을</Text>
                <Text className="text-3xl font-semibold text-font-black">
                    <Text className="text-main-color">기부</Text> 할까요?
                </Text>
            </View>
            <View className="flex flex-col mb-16">
                <View className="flex flex-row justify-between py-2">
                    <Text className="text-base font-semibold text-font-gray">받는 분에게 표시</Text>
                    <Text className="text-base font-semibold text-font-black">{profile.nickname}</Text>
                </View>
                <View className="flex flex-row justify-between py-2">
                    <Text className="text-base font-semibold text-font-gray">출금 계좌</Text>
                    <Text className="text-base font-semibold text-font-black">기부용 계좌</Text>
                </View>
                <TouchableOpacity className="flex flex-row justify-center items-center py-4 mt-6 w-full rounded-xl bg-main-color" onPress={handleExit}>
                    <Text className="text-xl font-semibold text-white">기부하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
