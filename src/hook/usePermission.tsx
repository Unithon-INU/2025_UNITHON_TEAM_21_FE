import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

export default function usePermission() {
    const [loading, setLoading] = useState(true);
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
                    setLoading(false);
                }
            } else {
                setInitialRouteName('main');
                setLoading(false);
            }
        };

        checkPermissions();
    }, []);
    return {loading, initialRouteName};
}
