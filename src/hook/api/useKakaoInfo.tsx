import {useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {login, getProfile} from '@react-native-seoul/kakao-login';
import {useDispatch} from 'react-redux';
import {setUser, clearUser} from '@/store/slice/userSlice';

const kakaoTokenName = 'kakaoToken';
const kakaoProfileName = 'kakaoProfile';

export function useUserRestore() {
    const dispatch = useDispatch(); // Redux dispatch to set user state

    useEffect(() => {
        const restore = async () => {
            const t = await AsyncStorage.getItem(kakaoTokenName);
            const p = await AsyncStorage.getItem(kakaoProfileName);
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
            await AsyncStorage.setItem(kakaoTokenName, JSON.stringify(token));
            await AsyncStorage.setItem(kakaoProfileName, JSON.stringify(profile));
            dispatch(setUser({token, profile}));
            navigation.replace('main');
        } catch (error) {
            console.error('Login failed:', error);
        }
    }, [dispatch, navigation]);

    const kakaoLogout = useCallback(async () => {
        try {
            await AsyncStorage.removeItem(kakaoTokenName);
            await AsyncStorage.removeItem(kakaoProfileName);
            dispatch(clearUser());
            navigation.replace('main');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, [dispatch, navigation]);

    return {kakaoLogin, kakaoLogout};
}
