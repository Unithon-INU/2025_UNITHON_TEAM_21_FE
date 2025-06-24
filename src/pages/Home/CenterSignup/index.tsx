import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useCenterSignup} from '@/hook/api/useSignup';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import Layout from '@/components/Layout';
import CustomModal from '@/components/layout/CustomModal';

export default function CenterSignup() {
    const navigation = useNavigation() as any;
    const [form, setForm] = useState({organizationname: '', adminname: '', email: '', password: ''});
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const removeKorean = (text: string) => text.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
    const handleChange = (key: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };
    const [isResultModalVisible, setResultModalVisible] = useState(false);
    const [resultModalInfo, setResultModalInfo] = useState({title: '', message: ''});

    const {signup, loading} = useCenterSignup();

    const handleSignup = () => {
        if (form.password !== passwordConfirm) {
            setResultModalInfo({title: '오류', message: '비밀번호가 일치하지 않습니다.'});
            setResultModalVisible(true);
            return;
        }

        signup(form, {
            onSuccess: () => {
                setResultModalInfo({title: '회원가입 성공', message: '회원가입이 완료되었습니다!'});
                setResultModalVisible(true);
            },
            onError: errorMessage => {
                setResultModalInfo({title: '회원가입 실패', message: errorMessage});
                setResultModalVisible(true);
            },
        });
    };

    const handleCloseResultModal = () => {
        setResultModalVisible(false);
        if (resultModalInfo.title === '회원가입 성공') {
            navigation.reset({
                index: 0,
                routes: [{name: 'main'}],
            });
        }
    };

    return (
        <Layout>
            <HeaderBackButton />
            <View className="flex justify-center items-center">
                <Image className="w-40 h-16" source={require('@/assets/logo.png')} />
                <Text className="text-2xl font-semibold tracking-[-2px]">나눔의 일상을 만나다</Text>
            </View>
            <View className="p-5">
                <View className="flex-row gap-4 mb-4">
                    <TextInput
                        className="flex-1 p-3 text-base rounded-lg border border-gray-300"
                        placeholder="지역아동센터 이름"
                        value={form.organizationname}
                        onChangeText={text => handleChange('organizationname', text)}
                        editable={!loading}
                    />
                    <TextInput
                        className="flex-1 p-3 text-base rounded-lg border border-gray-300"
                        placeholder="관리자 명"
                        value={form.adminname}
                        onChangeText={text => handleChange('adminname', text)}
                        editable={!loading}
                    />
                </View>
                <TextInput
                    className="p-3 mb-4 text-base rounded-lg border border-gray-300"
                    placeholder="이메일을 입력해 주세요"
                    value={form.email}
                    onChangeText={text => handleChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />
                <TextInput
                    className="p-3 mb-4 text-base rounded-lg border border-gray-300"
                    placeholder="비밀번호를 입력해 주세요"
                    value={form.password}
                    onChangeText={text => handleChange('password', removeKorean(text))}
                    secureTextEntry
                    editable={!loading}
                />
                <TextInput
                    className="p-3 mb-4 text-base rounded-lg border border-gray-300"
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

            <CustomModal visible={isResultModalVisible} onClose={handleCloseResultModal} title={resultModalInfo.title} action="none">
                <View className="items-center w-full">
                    <Text className="my-4 text-center text-font-gray">{resultModalInfo.message}</Text>
                    <TouchableOpacity className="justify-center items-center py-3 mt-2 w-full rounded-lg bg-main-color" onPress={handleCloseResultModal}>
                        <Text className="font-bold text-white">확인</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        </Layout>
    );
}
