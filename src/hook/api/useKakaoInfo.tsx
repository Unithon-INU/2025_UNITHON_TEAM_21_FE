import {useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login, getProfile} from '@react-native-seoul/kakao-login';

import {useDispatch} from 'react-redux';
import {setUser} from '@/store/slice/userSlice';

const tokenName = 'token';
const profileName = 'profile';

export function useUserRestore() {
    const dispatch = useDispatch();

    useEffect(() => {
        const restore = async () => {
            const t = await AsyncStorage.getItem(tokenName);
            const p = await AsyncStorage.getItem(profileName);
            if (t && p) {
                dispatch(setUser({token: JSON.parse(t), profile: JSON.parse(p)}));
            }
        };
        restore();
    }, [dispatch]);
}

export function useLogin() {
    const dispatch = useDispatch();
    const navigation = useNavigation() as any;

    const kakaoLogin = useCallback(async () => {
        try {
            const token = await login();
            const profile = await getProfile();
            await AsyncStorage.setItem(tokenName, JSON.stringify(token));
            await AsyncStorage.setItem(profileName, JSON.stringify(profile));
            dispatch(setUser({token, profile}));
            navigation.reset({
                index: 0,
                routes: [{name: 'main'}],
            });
        } catch (e: any) {
            console.error('Login failed:', e);
        }
    }, [dispatch, navigation]);

    return {kakaoLogin};
}
