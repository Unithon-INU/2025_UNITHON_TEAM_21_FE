import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import {useLogin} from '@/hook/api/useKakaoInfo';

export default function KakoLogin() {
    const {kakaoLogin} = useLogin();
    return (
        <TouchableOpacity onPress={kakaoLogin} className="flex items-center justify-center w-10 h-10 py-4 bg-yellow-300 rounded-full">
            <Image source={require('@/assets/kakao.png')} className="w-5 h-5" resizeMode="contain" />
        </TouchableOpacity>
    );
}
