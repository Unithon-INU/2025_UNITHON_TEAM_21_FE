import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

import KakoLogin from './components/KakoLogin';
import BottomSheet from '@/components/layout/BottomSheet';

export default function Signup() {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View className="flex flex-col h-full gap-3 p-5">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <EvilIcons size={32} name="close" color="#484848" />
            </TouchableOpacity>

            <View className="flex items-center justify-center flex-1">
                <Image className="h-20 w-52" source={require('@/assets/logo.png')} />
                <Text className="text-2xl font-semibold tracking-[-2px]">Experience a life of sharing</Text>
            </View>

            <View className="flex gap-3 py-10">
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="flex flex-row items-center justify-between w-full py-1 pl-10 pr-5 rounded-3xl bg-main-color">
                    <Text className="text-xl font-bold text-white">Continue as a Customer</Text>
                    <Image className="w-[60px] h-[60px]" source={require('@/assets/signup/customer.png')} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="flex flex-row items-center justify-between w-full py-1 pl-10 pr-5 rounded-3xl bg-main-color">
                    <Text className="text-xl font-bold text-white">Continue as a Childcare Center</Text>
                    <Image className="w-[60px] h-[60px]" source={require('@/assets/signup/childecenter.png')} />
                </TouchableOpacity>
            </View>

            <BottomSheet isVisible={isModalVisible} setIsVisible={setModalVisible}>
                <KakoLogin />
            </BottomSheet>
        </View>
    );
}
