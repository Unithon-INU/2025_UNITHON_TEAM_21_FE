import {Image, Text, TouchableOpacity, View} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import Error from '@/components/Error';

export default function Commit() {
    const navigation = useNavigation() as any;
    const route = useRoute();
    const {name, value, id} = route.params as {name: string; value: string; id: number};
    const {profile} = useSelector((state: RootState) => state.user);

    const handleExit = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'main'}, {name: 'remittanceComplete', params: {name, value, id}}],
            }),
        );
    };
    if (!profile) {
        return <Error text="로그인 후 이용해주세요." />;
    }
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
                <TouchableOpacity className="flex flex-row justify-center items-center py-4 mt-6 w-full rounded-xl bg-main-color" onPress={handleExit}>
                    <Text className="text-xl font-semibold text-white">기부하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
