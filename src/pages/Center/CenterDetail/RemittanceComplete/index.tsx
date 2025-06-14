import {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';

import Loading from './components/Loading';

export default function Commit() {
    const navigation = useNavigation();
    const route = useRoute();
    const {name, value} = route.params as {name: string; value: string};
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleExit = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'main'}],
            }),
        );
    };
    if (loading) return <Loading name={name} value={value} />;
    return (
        <View className="flex flex-col h-full gap-3 px-5">
            <View className="flex flex-row items-center py-4">
                <TouchableOpacity onPress={handleExit}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
            </View>
            <View className="flex flex-col items-center justify-center flex-1 gap-1">
                <Octicons className="pb-6" name="check-circle-fill" size={60} color="#FFB257" />
                <Text className="text-3xl font-semibold text-font-black">
                    <Text className="text-3xl font-semibold text-main-color">{name}</Text>
                    으로
                </Text>
                <Text className="text-3xl font-semibold text-font-black">{Number(value).toLocaleString()}원을</Text>
                <Text className="text-3xl font-semibold text-font-black">기부했어요</Text>
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
