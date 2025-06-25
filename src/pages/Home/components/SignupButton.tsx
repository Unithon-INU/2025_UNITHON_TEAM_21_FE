import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useLogout} from '@/hook/api/useLogin';

export default function SignupButton() {
    const navigation = useNavigation() as any;
    const {logout} = useLogout();
    const {profile} = useSelector((state: any) => state.user);

    return (
        <>
            {profile ? (
                <View className="flex-row gap-2 items-center">
                    <Text className="text-base font-semibold text-font-black">{profile.nickname} 님</Text>
                    <TouchableOpacity onPress={logout} className="flex-row items-center px-3 py-1 bg-gray-100 rounded-xl">
                        <Text className="text-base font-bold text-gray-500">로그아웃</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-row gap-2 items-center">
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
