import {useCallback, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

import BottomSheet from '@/components/layout/BottomSheet';

import {useLogin} from '@/hook/api/useKakaoInfo';
export default function Signup() {
    const navigation = useNavigation() as any;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isCenterModalVisible, setIsCenterModalVisible] = useState(false);

    const {kakaoLogin} = useLogin();
    useFocusEffect(
        useCallback(() => {
            return () => {
                setModalVisible(false);
                setIsCenterModalVisible(false);
            };
        }, []),
    );
    return (
        <View className="flex flex-col gap-3 p-5 h-full">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <EvilIcons size={32} name="close" color="#484848" />
            </TouchableOpacity>

            <View className="flex flex-1 justify-center items-center">
                <Image className="w-52 h-20" source={require('@/assets/logo.png')} />
                <Text className="text-2xl font-semibold tracking-[-2px] text-font-black">나눔의 일상을 만나다</Text>
            </View>

            <View className="flex gap-3 py-10">
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="flex flex-row justify-between items-center py-1 pr-5 pl-10 w-full rounded-3xl bg-main-color">
                    <Text className="text-xl font-bold text-white">회원으로 시작</Text>
                    <Image className="w-[60px] h-[60px]" source={require('@/assets/signup/customer.png')} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setIsCenterModalVisible(true)}
                    className="flex flex-row justify-between items-center py-1 pr-5 pl-10 w-full rounded-3xl bg-main-color">
                    <Text className="text-xl font-bold text-white">아동센터로 시작</Text>
                    <Image className="w-[60px] h-[60px]" source={require('@/assets/signup/childecenter.png')} />
                </TouchableOpacity>
            </View>

            <BottomSheet className="gap-3" isVisible={isModalVisible} setIsVisible={setModalVisible}>
                <TouchableOpacity onPress={kakaoLogin} className="flex justify-center items-center py-4 bg-yellow-300 rounded-xl">
                    <Text className="text-base font-semibold text-font-black">카카오로 회원가입</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('idSignup')} className="flex justify-center items-center py-4 rounded-xl bg-main-gray">
                    <Text className="text-base font-semibold text-font-black">아이디로 회원가입</Text>
                </TouchableOpacity>
            </BottomSheet>
            <BottomSheet className="gap-3" isVisible={isCenterModalVisible} setIsVisible={setIsCenterModalVisible}>
                <TouchableOpacity onPress={() => navigation.navigate('centerSignup')} className="flex justify-center items-center py-4 rounded-xl bg-main-gray">
                    <Text className="text-base font-semibold text-font-black">아이디로 회원가입</Text>
                </TouchableOpacity>
            </BottomSheet>
        </View>
    );
}
