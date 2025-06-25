import React, {useState} from 'react';
import {View, Text, PermissionsAndroid, Platform, TouchableOpacity} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomModal from '@/components/layout/CustomModal';

type RootStackParamList = {
    main: undefined;
    permission: undefined;
};

type PermissionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'permission'>;

export default function PermissionScreen() {
    const navigation = useNavigation<PermissionScreenNavigationProp>();
    const [isModalVisible, setModalVisible] = useState(false);

    const handleRequestPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    // 필요한 다른 권한이 있다면 여기에 추가
                ]);

                const allPermissionsGranted = Object.values(granted).every(status => status === PermissionsAndroid.RESULTS.GRANTED);

                if (allPermissionsGranted) {
                    navigation.dispatch(StackActions.replace('main'));
                } else {
                    setModalVisible(true);
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            navigation.dispatch(StackActions.replace('main'));
        }
    };

    return (
        <View className="flex-1 justify-center items-center p-5 bg-white">
            <Text className="mt-2 text-xl font-semibold text-font-black">앱 접근 권한 안내</Text>
            <Text className="mt-4 text-base text-center text-font-gray">'기봉사' 앱의 원활한 서비스 이용을 위해 다음 접근 권한 허용이 필요합니다.</Text>
            <View className="justify-start mb-4 w-full">
                <Text className="text-base font-bold text-font-black">[필수] 위치 정보</Text>
                <Text className="mt-1 text-base text-font-black">- 주변 봉사활동 및 기관 정보 제공</Text>
            </View>
            <TouchableOpacity className="px-4 py-3 rounded-lg bg-main-color" onPress={handleRequestPermission}>
                <Text className="text-base font-semibold text-white">확인하고 계속하기</Text>
            </TouchableOpacity>
            <CustomModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                title="권한 필요"
                action="none" // 버튼을 직접 커스텀하기 위해 none으로 설정
            >
                <View className="items-center w-full">
                    <Text className="my-4 text-center text-font-gray">앱의 핵심 기능을 사용하기 위해 권한 허용이 반드시 필요합니다.</Text>
                    <TouchableOpacity className="justify-center items-center py-3 mt-2 w-full rounded-lg bg-main-color" onPress={() => setModalVisible(false)}>
                        <Text className="font-bold text-white">확인</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        </View>
    );
}
