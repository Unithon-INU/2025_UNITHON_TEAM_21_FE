import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLogin} from '@/hook/api/useKakaoInfo';
import {useSelector} from 'react-redux';

export default function SignupButton() {
    const navigation = useNavigation() as any;
    const {kakaoLogout} = useLogin();
    const {profile} = useSelector((state: any) => state.user);

    return (
        <>
            {profile ? (
                <View className="flex-row items-center gap-2">
                    <Text className="text-base font-semibold text-font-black">{profile.nickname} 님</Text>
                    <TouchableOpacity onPress={kakaoLogout} className="flex-row items-center px-3 py-1 bg-gray-100 rounded-xl">
                        <Text className="text-base font-bold text-gray-500">로그아웃</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-row items-center gap-2">
                    <TouchableOpacity onPress={() => navigation.navigate('login')} className="px-3 py-1 bg-gray-100 rounded-xl">
                        <Text className="text-base font-bold text-gray-500">로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('signup')} className="px-3 py-1 rounded-xl bg-main-color">
                        <Text className="text-base font-bold text-white">회원가입</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
}
