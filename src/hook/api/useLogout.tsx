import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {clearUser} from '@/store/slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tokenName = 'token';
const profileName = 'profile';

export function useLogout() {
    const dispatch = useDispatch();
    const navigation = useNavigation() as any;
    const logout = useCallback(async () => {
        try {
            await AsyncStorage.removeItem(tokenName);
            await AsyncStorage.removeItem(profileName);
            dispatch(clearUser());
            navigation.replace('main');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, [dispatch, navigation]);
    return {logout};
}
