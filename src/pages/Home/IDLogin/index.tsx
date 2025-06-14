import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import {useLogin} from '@/hook/api/useLogin';

export default function IDLogin() {
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
        <View className="flex flex-col h-full gap-12 px-5">
            <HeaderBackButton />
            <View className="flex items-center justify-center">
                <Image className="w-40 h-16" source={require('@/assets/logo.png')} />
                <Text className="text-2xl font-semibold tracking-[-2px]">나눔의 일상을 만나다</Text>
            </View>

            <View className="flex px-5">
                <TextInput
                    className="p-3 mb-4 text-base border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="이메일을 입력하세요"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    value={form.email}
                    onChangeText={text => handleChange('email', text)}
                    editable={!loading}
                />
                <TextInput
                    className="p-3 mb-4 text-base border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="비밀번호를 입력하세요"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={form.password}
                    onChangeText={text => handleChange('password', text)}
                    editable={!loading}
                />
                <TouchableOpacity
                    className={`flex items-center justify-center py-4 rounded-lg ${loading ? 'bg-main-gray' : 'bg-main-color'}`}
                    onPress={() => login()}
                    disabled={loading}>
                    <Text className="text-base font-semibold text-white">{loading ? '로그인 중...' : '로그인'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
