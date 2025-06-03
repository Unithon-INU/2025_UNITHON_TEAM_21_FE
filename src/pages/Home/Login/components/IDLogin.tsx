import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Text} from 'react-native';

export default function IDLogin() {
    const navigation = useNavigation() as any;

    return (
        <TouchableOpacity onPress={() => navigation.navigate('idlogin')} className="flex items-center justify-center py-4 bg-main-gray rounded-xl">
            <Text className="text-base font-semibold text-font-black">아이디로 로그인</Text>
        </TouchableOpacity>
    );
}
