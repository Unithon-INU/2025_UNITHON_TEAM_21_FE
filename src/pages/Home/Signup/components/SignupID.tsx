import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';

export default function KakaoSignup() {
    const navigation = useNavigation() as any;
    return (
        <TouchableOpacity onPress={() => navigation.navigate('idSignup')} className="flex items-center justify-center py-4 bg-main-gray rounded-xl">
            <Text className="text-base font-semibold text-font-black">아이디로 회원가입</Text>
        </TouchableOpacity>
    );
}