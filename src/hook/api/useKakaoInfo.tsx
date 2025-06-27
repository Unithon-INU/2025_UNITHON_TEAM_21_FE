import {useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login, getProfile, unlink} from '@react-native-seoul/kakao-login';

import {useDispatch} from 'react-redux';
import {clearUser, setUser} from '@/store/slice/userSlice';
import {API_URL} from '@env';

const tokenName = 'token';
const profileName = 'profile';

export function useUserRestore() {
    const dispatch = useDispatch();

    useEffect(() => {
        const restore = async () => {
            const t = await AsyncStorage.getItem(tokenName);
            const p = await AsyncStorage.getItem(profileName);
            console.log('Restoring user data:', t, p);
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
            await login();
            const profile = await getProfile();

            const response = await fetch(`${API_URL}/api/login/kakao`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: profile.email,
                    nickname: profile.nickname,
                }),
            });
            const data = await response.json();
            const tokens = {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            };
            const profileData = {
                id: data.id,
                nickname: data.nickname,
                userRole: data.userRole,
            };
            console.log('Login response:', tokens, profileData);
            await AsyncStorage.setItem(tokenName, JSON.stringify(tokens));
            await AsyncStorage.setItem(profileName, JSON.stringify(profileData));
            dispatch(
                setUser({
                    token: tokens,
                    profile: {
                        id: profile.id,
                        nickname: profile.nickname,
                        userRole: 0,
                    },
                }),
            );
            navigation.reset({
                index: 0,
                routes: [{name: 'main'}],
            });
        } catch (e) {
            console.error('Login failed:', e);
        }
    }, [dispatch, navigation]);

    return {kakaoLogin};
}
export function useUnlink() {
    const dispatch = useDispatch();
    const navigation = useNavigation() as any;

    const kakaoUnlink = async () => {
        try {
            await unlink();

            await AsyncStorage.removeItem(tokenName);
            await AsyncStorage.removeItem(profileName);

            dispatch(clearUser());

            navigation.reset({
                index: 0,
                routes: [{name: 'main'}],
            });
        } catch (e) {
            console.error('Unlink failed:', e);
        }
    };
    return {kakaoUnlink};
}
