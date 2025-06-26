import {useState} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {clearUser, setUser} from '@/store/slice/userSlice';
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

    const login = async (showAlert: (title: string, message: string) => void) => {
        if (!email || !password) {
            showAlert('오류', '이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });
            if (!response.ok) {
                const errorData = await response.json();
                showAlert('로그인 실패', errorData.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
            } else {
                const data = await response.json();
                await AsyncStorage.setItem(tokenName, JSON.stringify({accessToken: data.accessToken, refreshToken: data.refreshToken}));
                await AsyncStorage.setItem(profileName, JSON.stringify({email: data.email, nickname: data.nickname, userRole: data.userRole}));
                dispatch(
                    setUser({
                        token: {accessToken: data.accessToken, refreshToken: data.refreshToken},
                        profile: {id: data.id, nickname: data.nickname, email:data.email,userRole: data.userRole},
                    }),
                );
                navigation.reset({
                    index: 0,
                    routes: [{name: 'main'}],
                });
            }
        } catch (error) {
            showAlert('네트워크 오류', '로그인 요청 중 문제가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return {loading, login};
}
export function useLogout() {
    const dispatch = useDispatch();
    const navigation = useNavigation() as any;
    const logout = async () => {
        try {
            await AsyncStorage.removeItem(tokenName);
            await AsyncStorage.removeItem(profileName);
            dispatch(clearUser());
            navigation.reset({
                index: 0,
                routes: [{name: 'main'}],
            });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return {logout};
}

export function useCenterLogin({email, password}: LoginForm) {
    const navigation = useNavigation() as any;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const login = async (showAlert: (title: string, message: string) => void) => {
        if (!email || !password) {
            showAlert('오류', '이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/org/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });
            if (!response.ok) {
                const errorData = await response.json();
                showAlert('로그인 실패', errorData.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
            } else {
                const data = await response.json();
                await AsyncStorage.setItem(tokenName, JSON.stringify({accessToken: data.accessToken, refreshToken: data.refreshToken}));
                await AsyncStorage.setItem(profileName, JSON.stringify({email: data.email, nickname: data.nickname, userRole: data.userRole, id: data.id}));
                dispatch(
                    setUser({
                        token: {accessToken: data.accessToken, refreshToken: data.refreshToken},
                        profile: {id: data.org_id, nickname: data.nickname, userRole: data.userRole},
                    }),
                );
                navigation.reset({
                    index: 0,
                    routes: [{name: 'main'}],
                });
            }
        } catch (error) {
            showAlert('네트워크 오류', '로그인 요청 중 문제가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return {loading, login};
}
