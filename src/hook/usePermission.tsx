import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

export default function usePermission() {
    const [isLoading, setIsLoading] = useState(true);
    const [initialRouteName, setInitialRouteName] = useState<string>('permission');
    useEffect(() => {
        const checkPermissions = async () => {
            if (Platform.OS === 'android') {
                try {
                    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
                    if (hasPermission) {
                        setInitialRouteName('main');
                    }
                } catch (e) {
                    console.error('Failed to check permissions', e);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setInitialRouteName('main');
                setIsLoading(false);
            }
        };

        checkPermissions();
    }, []);
    return {isLoading, initialRouteName};
}
