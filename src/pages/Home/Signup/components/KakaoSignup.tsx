import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {useLogin} from '@/hook/api/useKakaoInfo';

export default function KakaoSignup() {
    const {kakaoLogin} = useLogin();
    return (
        <TouchableOpacity onPress={kakaoLogin} className="flex items-center justify-center py-4 bg-yellow-300 rounded-xl">
            <Text className="text-base font-semibold">카카오로 회원가입</Text>
        </TouchableOpacity>
    );
}
