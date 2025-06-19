import HeaderBackButton from '@/components/button/HeaderBackButton';
import Layout from '@/components/Layout';
import {useSignup} from '@/hook/api/useSignup';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native';

export default function IDSignup() {
    const removeKorean = (text: string) => text.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
    const [form, setForm] = useState({
        nickname: '',
        email: '',
        password: '',
    });
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleChange = (key: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const {signup, loading} = useSignup(form);

    const handleSignup = () => {
        if (form.password !== passwordConfirm) {
            Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
            return;
        }
        signup();
    };

    return (
        <Layout>
            <HeaderBackButton />
            <View className="flex items-center justify-center">
                <Image className="w-40 h-16" source={require('@/assets/logo.png')} />
                <Text className="text-2xl font-semibold tracking-[-2px]">나눔의 일상을 만나다</Text>
            </View>
            <View className="p-5">
                <TextInput
                    className="p-3 mb-4 text-base border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="닉네임"
                    value={form.nickname}
                    onChangeText={text => handleChange('nickname', text)}
                    editable={!loading}
                />
                <TextInput
                    className="p-3 mb-4 text-base border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="이메일"
                    value={form.email}
                    onChangeText={text => handleChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />
                <TextInput
                    className="p-3 mb-4 text-base border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="비밀번호"
                    value={form.password}
                    onChangeText={text => handleChange('password', removeKorean(text))}
                    secureTextEntry
                    editable={!loading}
                />
                <TextInput
                    className="p-3 mb-4 text-base border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="비밀번호 확인"
                    value={passwordConfirm}
                    onChangeText={text => setPasswordConfirm(removeKorean(text))}
                    secureTextEntry
                    editable={!loading}
                />
                <TouchableOpacity
                    className={`items-center p-4 mt-4 rounded-lg ${loading ? 'bg-main-gray' : 'bg-main-color'}`}
                    onPress={handleSignup}
                    disabled={loading}>
                    <Text className="text-lg font-bold text-white">{loading ? '가입 중...' : '회원가입'}</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    );
}
