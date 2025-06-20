import {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {setUser} from '@/store/slice/userSlice';

import {API_URL} from '@env';

interface LoginForm {
    email: string;
    password: string;
}

const tokenName = 'token';
const profileName = 'profile';

export function useLogin({email, password}: LoginForm) {
    const navigation = useNavigation() as any;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const login = async () => {
        if (!email || !password) {
            Alert.alert('오류', '이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });
            if (!response.ok) {
                const errorData = await response.json();
                Alert.alert('로그인 실패', errorData.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
            } else {
                const data = await response.json();
                await AsyncStorage.setItem(tokenName, JSON.stringify({accessToken: data.accessToken, refreshToken: data.refreshToken}));
                await AsyncStorage.setItem(profileName, JSON.stringify({email: data.email, nickname: data.nickname}));
                dispatch(
                    setUser({
                        token: {
                            accessToken: data.accessToken,
                            refreshToken: data.refreshToken,
                        },
                        profile: {
                            id: data.id, // 서버에서 내려주는 유저 ID로 변경 필요 원래는 1000으로 하드코딩
                            nickname: data.nickname,
                        },
                    }),
                );
                navigation.reset({
                    index: 0,
                    routes: [{name: 'main'}],
                });
            }
        } catch (error) {
            Alert.alert('네트워크 오류', '로그인 요청 중 문제가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return {loading, login};
}
