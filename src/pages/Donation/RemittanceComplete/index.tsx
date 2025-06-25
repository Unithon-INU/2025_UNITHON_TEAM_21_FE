import {useEffect} from 'react';
import {ActivityIndicator, Image, Text, TouchableOpacity, View} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';

import {useDonation} from '@/hook/api/useDonation';

import Error from '@/components/Error';

export default function Commit() {
    const navigation = useNavigation();
    const route = useRoute();
    const {name, value, id} = route.params as {name: string; value: string; id: number};
    const {donation, loading, error} = useDonation();

    useEffect(() => {
        const fetchData = async () => {
            await donation(id, Number(value.replace(/,/g, '')));
        };
        fetchData();
    }, []);

    const handleExit = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'main'}],
            }),
        );
    };
    if (error) return <Error text={error} />;

    if (loading)
        return (
            <View className="flex flex-col gap-3 px-5 h-full">
                <View className="flex flex-col flex-1 gap-1 justify-center items-center pb-20">
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
            </View>
        );

    return (
        <View className="flex flex-col gap-3 px-5 h-full">
            <View className="flex flex-row items-center py-4">
                <TouchableOpacity onPress={handleExit}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
            </View>
            <View className="flex flex-col flex-1 gap-1 justify-center items-center">
                <Octicons className="pb-6" name="check-circle-fill" size={60} color="#FFB257" />
                <Text className="text-3xl font-semibold text-font-black">
                    <Text className="text-3xl font-semibold text-main-color">{name}</Text>
                    으로
                </Text>
                <Text className="text-3xl font-semibold text-font-black">{Number(value).toLocaleString()}원을</Text>
                <Text className="text-3xl font-semibold text-font-black">기부했어요</Text>
                <Text className="mt-2 text-lg font-semibold text-font-gray">아동센터가 확인할 때까지 시간이 걸릴 수 있어요</Text>
                <TouchableOpacity className="px-3 py-2 mt-4 rounded-lg bg-bg-gray">
                    <Text className="text-font-black">기부증서 받기</Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-col mb-16">
                <TouchableOpacity className="flex flex-row justify-center items-center py-4 mt-6 w-full rounded-xl bg-main-color" onPress={handleExit}>
                    <Text className="text-xl font-semibold text-white">확인</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
