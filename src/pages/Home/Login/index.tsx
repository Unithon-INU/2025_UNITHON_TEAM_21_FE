import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useLogin} from '@/hook/api/useLogin';
import KakoLogin from './components/KakaoLogin';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default function IDLogin() {
    const navigation = useNavigation() as any;
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (key: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };
    const {loading, login} = useLogin(form);

    return (
        <View className="flex flex-col h-full gap-12 p-5">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <EvilIcons size={32} name="close" color="#484848" />
            </TouchableOpacity>
            <View className="flex items-center justify-center">
                <Image className="w-32 h-12" source={require('@/assets/logo.png')} />
                <Text className="text-2xl font-semibold tracking-[-2px] text-font-black">나눔의 일상을 만나다</Text>
            </View>

            <View className="flex px-5">
                <TextInput
                    className="p-3 text-base border border-gray-300 rounded-t-lg"
                    placeholder="이메일을 입력해 주세요"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    value={form.email}
                    onChangeText={text => handleChange('email', text)}
                    editable={!loading}
                />
                <TextInput
                    className="p-3 mb-4 text-base border border-t-0 border-gray-300 rounded-b-lg"
                    placeholder="비밀번호를 입력해 주세요"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={form.password}
                    onChangeText={text => handleChange('password', text)}
                    editable={!loading}
                />
                <TouchableOpacity
                    className={`flex items-center justify-center mb-4 py-3.5 rounded-lg ${loading ? 'bg-main-gray' : 'bg-main-color'}`}
                    onPress={() => login()}
                    disabled={loading}>
                    <Text className="text-base font-semibold text-white">{loading ? '로그인 중...' : '로그인'}</Text>
                </TouchableOpacity>
                <View className="flex flex-row items-center my-4">
                    <View className="flex-1 h-px bg-main-gray" />
                    <Text className="px-4 font-semibold text-main-gray">간편로그인</Text>
                    <View className="flex-1 h-px bg-main-gray" />
                </View>
                <View className="flex items-center mb-4">
                    <KakoLogin />
                </View>
                <TouchableOpacity
                    className="flex items-center justify-center py-3.5 mt-4 border border-gray-300 rounded-lg"
                    onPress={() => navigation.navigate('signup')}>
                    <Text className="font-bold text-main-color">회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
