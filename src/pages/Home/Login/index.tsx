import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

import KakoLogin from '../Signup/components/KakaoSignup';
import IDLogin from './components/IDLogin';

export default function Login() {
    const navigation = useNavigation();

    return (
        <View className="flex flex-col h-full gap-3 p-5">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <EvilIcons size={32} name="close" color="#484848" />
            </TouchableOpacity>

            <View className="flex items-center justify-center flex-1">
                <Image className="h-20 w-52" source={require('@/assets/logo.png')} />
                <Text className="text-2xl font-semibold tracking-[-2px]">나눔의 일상을 만나다</Text>
            </View>

            <View className="flex gap-3 py-10">
                <KakoLogin />
                <IDLogin />
            </View>
        </View>
    );
}
